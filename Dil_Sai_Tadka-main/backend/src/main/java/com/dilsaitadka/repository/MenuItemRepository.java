package com.dilsaitadka.repository;

import com.dilsaitadka.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByActiveTrue();
    List<MenuItem> findByCategory(String category);
    List<MenuItem> findByNameContainingIgnoreCase(String name);
}
