package com.dilsaitadka.partner.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerBookingDTO {
    private Long id;
    private String userEmail;
    private Long roomId;
    private String roomName;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private Double totalAmount;
    private String status;
}
