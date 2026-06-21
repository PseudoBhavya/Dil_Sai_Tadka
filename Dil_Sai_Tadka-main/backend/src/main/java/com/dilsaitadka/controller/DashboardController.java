package com.dilsaitadka.controller;

import com.dilsaitadka.repository.*;
import com.dilsaitadka.entity.Order;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderRepository orderRepository;
    private final BookingRepository bookingRepository;
    private final MenuItemRepository menuItemRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return Map.of(
            "totalOrders", orderRepository.count(),
            "totalBookings", bookingRepository.count(),
            "totalMenuItems", menuItemRepository.count(),
            "totalRooms", roomRepository.count(),
            "totalUsers", userRepository.count(),
            "totalReviews", reviewRepository.count()
        );
    }

    @GetMapping("/recent-orders")
    public Object getRecentOrders() {
        var orders = orderRepository.findAllByOrderByCreatedAtDesc();
        return orders.size() > 10 ? orders.subList(0, 10) : orders;
    }

    @GetMapping("/recent-bookings")
    public Object getRecentBookings() {
        var bookings = bookingRepository.findAllByOrderByCreatedAtDesc();
        return bookings.size() > 10 ? bookings.subList(0, 10) : bookings;
    }

    @GetMapping("/revenue")
    public Map<String, Object> getRevenue() {
        List<Order> orders = orderRepository.findAll();
        Map<YearMonth, Double> revenueMap = new HashMap<>();
        for (Order o : orders) {
            if (o.getCreatedAt() != null && o.getTotalAmount() != null) {
                YearMonth ym = YearMonth.from(o.getCreatedAt());
                revenueMap.merge(ym, o.getTotalAmount(), Double::sum);
            }
        }
        Map<String, Double> formatted = revenueMap.entrySet().stream()
            .collect(Collectors.toMap(
                e -> e.getKey().toString(),
                Map.Entry::getValue));
        return Map.of("monthlyRevenue", formatted);
    }
}
