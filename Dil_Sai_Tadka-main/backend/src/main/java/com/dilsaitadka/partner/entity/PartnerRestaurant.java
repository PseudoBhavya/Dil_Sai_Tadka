package com.dilsaitadka.partner.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "partner_restaurants")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PartnerRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String cuisineType;
    private String address;
    private Double rating;
    private Boolean active;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (active == null) active = true;
        if (rating == null) rating = 4.5;
    }
}
