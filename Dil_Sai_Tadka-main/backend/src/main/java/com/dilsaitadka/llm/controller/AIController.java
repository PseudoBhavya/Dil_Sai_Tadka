package com.dilsaitadka.llm.controller;

import com.dilsaitadka.llm.entity.AiInsight;
import com.dilsaitadka.llm.service.AIInsightsService;
import com.dilsaitadka.llm.service.GroqService;
import com.dilsaitadka.llm.utils.PromptTemplates;
import com.dilsaitadka.repository.MenuItemRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
public class AIController {

    private final AIInsightsService aiInsightsService;
    private final MenuItemRepository menuItemRepository;
    private final GroqService groqService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/reviews/summarize")
    public ResponseEntity<AiInsight> triggerFeedbackSummary() {
        log.info("Request to force-generate AI feedback summary received.");
        AiInsight insight = aiInsightsService.generateAndSaveFeedbackSummary();
        return ResponseEntity.ok(insight);
    }

    @GetMapping("/reviews/latest-insights")
    public ResponseEntity<AiInsight> getLatestInsights() {
        log.info("Request for latest AI feedback insights received.");
        return ResponseEntity.ok(aiInsightsService.getLatestFeedbackSummary());
    }

    @PostMapping("/recommendations")
    public ResponseEntity<Map<String, String>> getMenuRecommendations(@RequestBody Map<String, String> body) {
        String query = body.get("query");
        log.info("Request for culinary recommendations: query='{}'", query);

        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Query must not be empty"));
        }

        // Fetch all active menu items to feed into LLM prompt
        var menuItems = menuItemRepository.findAll();
        List<Map<String, Object>> menuSummary = menuItems.stream()
                .filter(m -> m.getActive() != null && m.getActive())
                .map(m -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", m.getName());
                    map.put("description", m.getDescription() != null ? m.getDescription() : "");
                    map.put("price", m.getPrice());
                    map.put("category", m.getCategory() != null ? m.getCategory() : "");
                    map.put("tag", m.getTag() != null ? m.getTag() : "");
                    return map;
                })
                .collect(Collectors.toList());

        String menuJson;
        try {
            menuJson = objectMapper.writeValueAsString(menuSummary);
        } catch (Exception e) {
            log.error("Failed to map menu items to JSON: {}", e.getMessage());
            menuJson = "[]";
        }

        String prompt = PromptTemplates.getFoodRecommendationPrompt(menuJson, query);
        String recommendation = groqService.callGroq(prompt);

        return ResponseEntity.ok(Map.of("recommendation", recommendation));
    }
}
