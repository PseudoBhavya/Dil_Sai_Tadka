package com.dilsaitadka.llm.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_insights")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AiInsight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "insight_type", nullable = false)
    private InsightType insightType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "sentiment_score")
    private Double sentimentScore;

    @Column(name = "meta_json", columnDefinition = "TEXT")
    private String metaJson;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum InsightType {
        FEEDBACK_SUMMARY, MEAL_RECOMMENDATION
    }
}
