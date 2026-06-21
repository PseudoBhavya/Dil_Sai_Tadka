package com.dilsaitadka.partner.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerRestaurantDTO {
    private Long id;
    private String name;
    private String cuisineType;
    private String address;
    private Double rating;
    private Boolean active;
}
