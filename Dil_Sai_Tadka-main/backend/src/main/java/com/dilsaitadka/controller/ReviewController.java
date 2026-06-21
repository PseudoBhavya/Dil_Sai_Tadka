package com.dilsaitadka.controller;

import com.dilsaitadka.entity.Review;
import com.dilsaitadka.entity.User;
import com.dilsaitadka.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @GetMapping
    public List<Review> getAll() { return reviewRepository.findAllByOrderByCreatedAtDesc(); }

    @GetMapping("/my")
    public List<Review> getMyReviews(@AuthenticationPrincipal User user) {
        return reviewRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @PostMapping
    public Review create(@AuthenticationPrincipal User user, @RequestBody Review review) {
        review.setUser(user);
        return reviewRepository.save(review);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reviewRepository.deleteById(id); return ResponseEntity.noContent().build();
    }
}
