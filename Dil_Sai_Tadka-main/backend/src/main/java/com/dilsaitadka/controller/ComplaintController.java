package com.dilsaitadka.controller;

import com.dilsaitadka.entity.Complaint;
import com.dilsaitadka.entity.User;
import com.dilsaitadka.repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    @GetMapping
    public List<Complaint> getAll() { return complaintRepository.findAllByOrderByCreatedAtDesc(); }

    @GetMapping("/my")
    public List<Complaint> getMy(@AuthenticationPrincipal User user) {
        return complaintRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @PostMapping
    public Complaint create(@AuthenticationPrincipal User user, @RequestBody Complaint complaint) {
        complaint.setUser(user);
        return complaintRepository.save(complaint);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return complaintRepository.findById(id).map(c -> {
            c.setStatus(Complaint.ComplaintStatus.valueOf(body.get("status")));
            return ResponseEntity.ok(complaintRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }
}
