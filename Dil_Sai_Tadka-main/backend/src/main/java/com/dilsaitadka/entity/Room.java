package com.dilsaitadka.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private String floor;
    private String feature;
    private String bedType;
    private String viewType;
    private Double pricePerNight;
    private Double rating;
    @Column(length = 2000)
    private String image;
    private Boolean available;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (available == null) available = true;
        if (rating == null) rating = 0.0;
    }
}
