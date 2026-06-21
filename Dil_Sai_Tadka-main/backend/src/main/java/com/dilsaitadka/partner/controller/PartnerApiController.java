package com.dilsaitadka.partner.controller;

import com.dilsaitadka.entity.*;
import com.dilsaitadka.repository.*;
import com.dilsaitadka.partner.entity.PartnerRestaurant;
import com.dilsaitadka.partner.repository.PartnerRestaurantRepository;
import com.dilsaitadka.partner.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/partner")
@RequiredArgsConstructor
@Slf4j
public class PartnerApiController {

    private final PartnerRestaurantRepository partnerRestaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // ==========================================
    // 1. LISTING APIs
    // ==========================================

    @GetMapping("/restaurants")
    public ResponseEntity<List<PartnerRestaurantDTO>> getRestaurants() {
        log.info("Partner API: Listing all restaurants");
        List<PartnerRestaurantDTO> list = partnerRestaurantRepository.findAll().stream()
                .map(r -> PartnerRestaurantDTO.builder()
                        .id(r.getId())
                        .name(r.getName())
                        .cuisineType(r.getCuisineType())
                        .address(r.getAddress())
                        .rating(r.getRating())
                        .active(r.getActive())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/menu")
    public ResponseEntity<List<PartnerMenuDTO>> getMenu() {
        log.info("Partner API: Listing menu items");
        List<PartnerMenuDTO> list = menuItemRepository.findAll().stream()
                .map(m -> PartnerMenuDTO.builder()
                        .id(m.getId())
                        .name(m.getName())
                        .description(m.getDescription())
                        .price(m.getPrice())
                        .category(m.getCategory())
                        .tag(m.getTag())
                        .active(m.getActive())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<PartnerOrderDTO>> getOrders() {
        log.info("Partner API: Listing all orders");
        List<PartnerOrderDTO> list = orderRepository.findAll().stream()
                .map(o -> PartnerOrderDTO.builder()
                        .id(o.getId())
                        .userEmail(o.getUser() != null ? o.getUser().getEmail() : "anonymous@dilsaitadka.com")
                        .totalAmount(o.getTotalAmount())
                        .status(o.getStatus().name())
                        .items(o.getItems() != null ? o.getItems().stream()
                                .map(item -> PartnerOrderDTO.OrderItemDTO.builder()
                                        .menuItemId(item.getMenuItem() != null ? item.getMenuItem().getId() : null)
                                        .menuItemName(item.getMenuItem() != null ? item.getMenuItem().getName() : "Unknown")
                                        .quantity(item.getQuantity())
                                        .price(item.getPrice())
                                        .build())
                                .collect(Collectors.toList()) : new ArrayList<>())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<PartnerBookingDTO>> getBookings() {
        log.info("Partner API: Listing all bookings");
        List<PartnerBookingDTO> list = bookingRepository.findAll().stream()
                .map(b -> PartnerBookingDTO.builder()
                        .id(b.getId())
                        .userEmail(b.getUser() != null ? b.getUser().getEmail() : "anonymous@dilsaitadka.com")
                        .roomId(b.getRoom() != null ? b.getRoom().getId() : null)
                        .roomName(b.getRoom() != null ? b.getRoom().getName() : "Unknown")
                        .checkIn(b.getCheckIn())
                        .checkOut(b.getCheckOut())
                        .guests(b.getGuests())
                        .totalAmount(b.getTotalAmount())
                        .status(b.getStatus().name())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getRooms() {
        log.info("Partner API: Listing all rooms");
        return ResponseEntity.ok(roomRepository.findAll());
    }

    // ==========================================
    // 2. CREATE APIs
    // ==========================================

    @PostMapping("/restaurants")
    public ResponseEntity<?> createRestaurant(@RequestBody PartnerRestaurantDTO dto) {
        log.info("Partner API: Creating restaurant {}", dto.getName());
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(MapResponse("Restaurant name is required"));
        }
        PartnerRestaurant restaurant = PartnerRestaurant.builder()
                .name(dto.getName())
                .cuisineType(dto.getCuisineType())
                .address(dto.getAddress())
                .rating(dto.getRating() != null ? dto.getRating() : 4.5)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
        PartnerRestaurant saved = partnerRestaurantRepository.save(restaurant);
        dto.setId(saved.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody PartnerOrderDTO dto) {
        log.info("Partner API: Creating order for user {}", dto.getUserEmail());
        if (dto.getUserEmail() == null || dto.getItems() == null || dto.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body(MapResponse("User email and items list are required"));
        }

        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseGet(() -> userRepository.findByEmail("customer@dilsaitadka.com").orElseThrow());

        double total = 0.0;
        List<OrderItem> items = new ArrayList<>();
        Order order = Order.builder()
                .user(user)
                .status(Order.OrderStatus.PENDING)
                .build();

        for (PartnerOrderDTO.OrderItemDTO itemDto : dto.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemDto.getMenuItemId())
                    .orElseThrow(() -> new IllegalArgumentException("Menu item not found for ID: " + itemDto.getMenuItemId()));
            double price = itemDto.getPrice() != null ? itemDto.getPrice() : menuItem.getPrice();
            int qty = itemDto.getQuantity() != null ? itemDto.getQuantity() : 1;
            total += (price * qty);

            items.add(OrderItem.builder()
                    .order(order)
                    .menuItem(menuItem)
                    .quantity(qty)
                    .price(price)
                    .build());
        }

        order.setTotalAmount(total);
        order.setItems(items);

        Order saved = orderRepository.save(order);
        dto.setId(saved.getId());
        dto.setTotalAmount(saved.getTotalAmount());
        dto.setStatus(saved.getStatus().name());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody PartnerBookingDTO dto) {
        log.info("Partner API: Creating booking for room {}", dto.getRoomId());
        if (dto.getUserEmail() == null || dto.getRoomId() == null || dto.getCheckIn() == null || dto.getCheckOut() == null) {
            return ResponseEntity.badRequest().body(MapResponse("userEmail, roomId, checkIn, and checkOut are required"));
        }

        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseGet(() -> userRepository.findByEmail("customer@dilsaitadka.com").orElseThrow());

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room not found for ID: " + dto.getRoomId()));

        double totalAmount = dto.getTotalAmount() != null ? dto.getTotalAmount() : room.getPricePerNight() * 2; // Default to 2 nights pricing if not provided

        Booking booking = Booking.builder()
                .user(user)
                .room(room)
                .checkIn(dto.getCheckIn())
                .checkOut(dto.getCheckOut())
                .guests(dto.getGuests() != null ? dto.getGuests() : 1)
                .totalAmount(totalAmount)
                .status(Booking.BookingStatus.CONFIRMED)
                .build();

        Booking saved = bookingRepository.save(booking);
        dto.setId(saved.getId());
        dto.setRoomName(room.getName());
        dto.setStatus(saved.getStatus().name());
        dto.setTotalAmount(saved.getTotalAmount());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    // ==========================================
    // 3. UPDATE APIs
    // ==========================================

    @PutMapping("/orders/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody PartnerOrderDTO dto) {
        log.info("Partner API: Updating order ID {}", id);
        var opt = orderRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MapResponse("Order not found"));
        }
        Order o = opt.get();
        if (dto.getStatus() != null) {
            o.setStatus(Order.OrderStatus.valueOf(dto.getStatus().toUpperCase()));
        }
        if (dto.getTotalAmount() != null) {
            o.setTotalAmount(dto.getTotalAmount());
        }
        Order saved = orderRepository.save(o);
        dto.setId(saved.getId());
        dto.setStatus(saved.getStatus().name());
        dto.setTotalAmount(saved.getTotalAmount());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<?> updateBooking(@PathVariable Long id, @RequestBody PartnerBookingDTO dto) {
        log.info("Partner API: Updating booking ID {}", id);
        var opt = bookingRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MapResponse("Booking not found"));
        }
        Booking b = opt.get();
        if (dto.getStatus() != null) {
            b.setStatus(Booking.BookingStatus.valueOf(dto.getStatus().toUpperCase()));
        }
        if (dto.getCheckIn() != null) b.setCheckIn(dto.getCheckIn());
        if (dto.getCheckOut() != null) b.setCheckOut(dto.getCheckOut());
        if (dto.getGuests() != null) b.setGuests(dto.getGuests());
        if (dto.getTotalAmount() != null) b.setTotalAmount(dto.getTotalAmount());

        Booking saved = bookingRepository.save(b);
        dto.setId(saved.getId());
        dto.setStatus(saved.getStatus().name());
        dto.setTotalAmount(saved.getTotalAmount());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/menu/{id}")
    public ResponseEntity<?> updateMenu(@PathVariable Long id, @RequestBody PartnerMenuDTO dto) {
        log.info("Partner API: Updating menu item ID {}", id);
        var opt = menuItemRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MapResponse("Menu item not found"));
        }
        MenuItem m = opt.get();
        if (dto.getName() != null) m.setName(dto.getName());
        if (dto.getDescription() != null) m.setDescription(dto.getDescription());
        if (dto.getPrice() != null) m.setPrice(dto.getPrice());
        if (dto.getCategory() != null) m.setCategory(dto.getCategory());
        if (dto.getTag() != null) m.setTag(dto.getTag());
        if (dto.getActive() != null) m.setActive(dto.getActive());

        MenuItem saved = menuItemRepository.save(m);
        dto.setId(saved.getId());
        return ResponseEntity.ok(dto);
    }

    // ==========================================
    // 4. CANCEL APIs
    // ==========================================

    @PatchMapping("/orders/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        log.info("Partner API: Cancelling order ID {}", id);
        var opt = orderRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MapResponse("Order not found"));
        }
        Order o = opt.get();
        o.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(o);
        return ResponseEntity.ok(MapResponse("Order cancelled successfully"));
    }

    @PatchMapping("/bookings/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        log.info("Partner API: Cancelling booking ID {}", id);
        var opt = bookingRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(MapResponse("Booking not found"));
        }
        Booking b = opt.get();
        b.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(b);
        return ResponseEntity.ok(MapResponse("Booking cancelled successfully"));
    }

    private java.util.Map<String, String> MapResponse(String message) {
        return java.util.Map.of("message", message);
    }
}
