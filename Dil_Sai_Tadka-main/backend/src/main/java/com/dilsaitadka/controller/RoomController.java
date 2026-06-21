package com.dilsaitadka.controller;

import com.dilsaitadka.entity.Room;
import com.dilsaitadka.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAll() { return roomRepository.findAll(); }

    @GetMapping("/available")
    public List<Room> getAvailable() { return roomRepository.findByAvailableTrue(); }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getById(@PathVariable Long id) {
        return roomRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Room create(@RequestBody Room room) { return roomRepository.save(room); }

    @PutMapping("/{id}")
    public ResponseEntity<Room> update(@PathVariable Long id, @RequestBody Room room) {
        return roomRepository.findById(id).map(existing -> {
            existing.setName(room.getName());
            existing.setDescription(room.getDescription());
            existing.setFloor(room.getFloor());
            existing.setFeature(room.getFeature());
            existing.setBedType(room.getBedType());
            existing.setViewType(room.getViewType());
            existing.setPricePerNight(room.getPricePerNight());
            existing.setImage(room.getImage());
            existing.setAvailable(room.getAvailable());
            return ResponseEntity.ok(roomRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roomRepository.deleteById(id); return ResponseEntity.noContent().build();
    }
}
