package com.dilsaitadka.partner.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerMenuDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String tag;
    private Boolean active;
}
