package com.dilsaitadka.llm.service;

import com.dilsaitadka.repository.ReviewRepository;
import com.dilsaitadka.repository.ComplaintRepository;
import com.dilsaitadka.llm.entity.AiInsight;
import com.dilsaitadka.llm.repository.AiInsightRepository;
import com.dilsaitadka.llm.utils.PromptTemplates;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIInsightsService {

    private final ReviewRepository reviewRepository;
    private final ComplaintRepository complaintRepository;
    private final AiInsightRepository aiInsightRepository;
    private final GroqService groqService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiInsight generateAndSaveFeedbackSummary() {
        log.info("Generating real-time AI feedback summary from reviews & complaints...");

        // Load all reviews and complaints
        var reviews = reviewRepository.findAll();
        var complaints = complaintRepository.findAll();

        // Map to structured list for LLM context
        List<Map<String, Object>> reviewsData = reviews.stream()
                .map(r -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("type", "Review");
                    map.put("rating", r.getRating());
                    map.put("text", r.getText() != null ? r.getText() : "");
                    return map;
                })
                .collect(Collectors.toList());

        List<Map<String, Object>> complaintsData = complaints.stream()
                .map(c -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("type", "Complaint");
                    map.put("subject", c.getSubject() != null ? c.getSubject() : "");
                    map.put("description", c.getDescription() != null ? c.getDescription() : "");
                    map.put("status", c.getStatus() != null ? c.getStatus().name() : "");
                    return map;
                })
                .collect(Collectors.toList());

        Map<String, Object> inputData = new HashMap<>();
        inputData.put("reviews", reviewsData);
        inputData.put("complaints", complaintsData);

        String jsonContext;
        try {
            jsonContext = objectMapper.writeValueAsString(inputData);
        } catch (Exception e) {
            log.error("Failed to map review data to JSON context: {}", e.getMessage());
            jsonContext = "[]";
        }

        // Call Groq
        String prompt = PromptTemplates.getReviewSummaryPrompt(jsonContext);
        String response = groqService.callGroq(prompt);

        // Parse response to extract fields
        double sentimentScore = 0.85; // Default/Fallback
        try {
            // Attempt to clean markdown wrapper if LLM mistakenly returned it
            String cleanedResponse = response.trim();
            if (cleanedResponse.startsWith("```json")) {
                cleanedResponse = cleanedResponse.substring(7);
            } else if (cleanedResponse.startsWith("```")) {
                cleanedResponse = cleanedResponse.substring(3);
            }
            if (cleanedResponse.endsWith("```")) {
                cleanedResponse = cleanedResponse.substring(0, cleanedResponse.length() - 3);
            }
            cleanedResponse = cleanedResponse.trim();

            Map<String, Object> responseMap = objectMapper.readValue(cleanedResponse, Map.class);
            if (responseMap.containsKey("sentimentScore")) {
                sentimentScore = Double.parseDouble(responseMap.get("sentimentScore").toString());
            }
            response = cleanedResponse; // Save cleaned response
        } catch (Exception e) {
            log.warn("Failed to parse Groq response sentiment score: {}. Using default.", e.getMessage());
        }

        // Save to Database
        AiInsight insight = AiInsight.builder()
                .insightType(AiInsight.InsightType.FEEDBACK_SUMMARY)
                .content(response)
                .sentimentScore(sentimentScore)
                .build();

        return aiInsightRepository.save(insight);
    }

    public AiInsight getLatestFeedbackSummary() {
        return aiInsightRepository
                .findFirstByInsightTypeOrderByCreatedAtDesc(AiInsight.InsightType.FEEDBACK_SUMMARY)
                .orElseGet(this::generateAndSaveFeedbackSummary); // Auto-generate if none exist
    }
}
