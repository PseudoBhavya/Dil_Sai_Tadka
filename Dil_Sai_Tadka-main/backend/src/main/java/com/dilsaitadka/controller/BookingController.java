package com.dilsaitadka.controller;

import com.dilsaitadka.entity.Booking;
import com.dilsaitadka.entity.User;
import com.dilsaitadka.repository.BookingRepository;
import com.dilsaitadka.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController { // Note: File name is BookingController.java, class name was wrong in my head

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    @GetMapping
    public List<Booking> getAll() {
        return bookingRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/my")
    public List<Booking> getMyBookings(@AuthenticationPrincipal User user) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Long roomId = Long.valueOf(body.get("roomId").toString());
        LocalDate checkIn = LocalDate.parse(body.get("checkIn").toString());
        LocalDate checkOut = LocalDate.parse(body.get("checkOut").toString());
        Integer guests = (Integer) body.get("guests");
        Double total = Double.valueOf(body.get("total").toString());

        var room = roomRepository.findById(roomId).orElseThrow();

        Booking booking = Booking.builder()
                .user(user)
                .room(room)
                .checkIn(checkIn)
                .checkOut(checkOut)
                .guests(guests)
                .totalAmount(total)
                .status(Booking.BookingStatus.PENDING)
                .build();

        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return bookingRepository.findById(id).map(b -> {
            b.setStatus(Booking.BookingStatus.valueOf(body.get("status")));
            return ResponseEntity.ok(bookingRepository.save(b));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        return bookingRepository.findById(id).map(b -> {
            b.setStatus(Booking.BookingStatus.CANCELLED);
            return ResponseEntity.ok(bookingRepository.save(b));
        }).orElse(ResponseEntity.notFound().build());
    }
}
