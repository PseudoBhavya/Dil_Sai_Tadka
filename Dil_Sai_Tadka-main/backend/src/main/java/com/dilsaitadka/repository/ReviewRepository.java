package com.dilsaitadka.repository;

import com.dilsaitadka.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Review> findAllByOrderByCreatedAtDesc();
}
