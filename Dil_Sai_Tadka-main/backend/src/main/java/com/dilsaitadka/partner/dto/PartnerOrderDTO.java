package com.dilsaitadka.partner.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerOrderDTO {
    private Long id;
    private String userEmail;
    private Double totalAmount;
    private String status;
    private List<OrderItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDTO {
        private Long menuItemId;
        private String menuItemName;
        private Integer quantity;
        private Double price;
    }
}
