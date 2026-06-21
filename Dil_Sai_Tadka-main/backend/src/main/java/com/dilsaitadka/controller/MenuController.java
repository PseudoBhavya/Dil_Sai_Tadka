package com.dilsaitadka.controller;

import com.dilsaitadka.entity.MenuItem;
import com.dilsaitadka.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuItemRepository menuItemRepository;

    @GetMapping
    public List<MenuItem> getAll(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return menuItemRepository.findByCategory(category);
        }
        return menuItemRepository.findByActiveTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getById(@PathVariable Long id) {
        return menuItemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<MenuItem> search(@RequestParam String q) {
        return menuItemRepository.findByNameContainingIgnoreCase(q);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return menuItemRepository.findByActiveTrue().stream()
                .map(MenuItem::getCategory)
                .distinct()
                .collect(Collectors.toList());
    }

    @PostMapping
    public MenuItem create(@RequestBody MenuItem item) {
        return menuItemRepository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> update(@PathVariable Long id, @RequestBody MenuItem item) {
        return menuItemRepository.findById(id)
                .map(existing -> {
                    existing.setName(item.getName());
                    existing.setDescription(item.getDescription());
                    existing.setPrice(item.getPrice());
                    existing.setCategory(item.getCategory());
                    existing.setTag(item.getTag());
                    existing.setImage(item.getImage());
                    existing.setActive(item.getActive());
                    return ResponseEntity.ok(menuItemRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        menuItemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
