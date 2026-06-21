package com.dilsaitadka.controller;

import com.dilsaitadka.entity.Order;
import com.dilsaitadka.entity.OrderItem;
import com.dilsaitadka.entity.User;
import com.dilsaitadka.repository.MenuItemRepository;
import com.dilsaitadka.repository.OrderRepository;
import com.dilsaitadka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;

    @GetMapping
    public List<Order> getAll() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/my")
    public List<Order> getMyOrders(@AuthenticationPrincipal User user) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) body.get("items");
        Double total = Double.valueOf(body.get("total").toString());

        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .status(Order.OrderStatus.PENDING)
                .build();

        for (Map<String, Object> itemData : itemsData) {
            Long menuItemId = Long.valueOf(itemData.get("id").toString());
            Integer quantity = (Integer) itemData.get("quantity");
            Double price = Double.valueOf(itemData.get("price").toString());

            var menuItem = menuItemRepository.findById(menuItemId).orElseThrow();
            
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menuItem(menuItem)
                    .quantity(quantity)
                    .price(price)
                    .build();
            
            order.getItems().add(orderItem);
        }

        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return orderRepository.findById(id).map(o -> {
            o.setStatus(Order.OrderStatus.valueOf(body.get("status")));
            return ResponseEntity.ok(orderRepository.save(o));
        }).orElse(ResponseEntity.notFound().build());
    }
}
