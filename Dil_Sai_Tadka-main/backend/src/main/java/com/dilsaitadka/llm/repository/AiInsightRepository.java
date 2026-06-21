package com.dilsaitadka.llm.repository;

import com.dilsaitadka.llm.entity.AiInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AiInsightRepository extends JpaRepository<AiInsight, Long> {
    Optional<AiInsight> findFirstByInsightTypeOrderByCreatedAtDesc(AiInsight.InsightType insightType);
    List<AiInsight> findByInsightTypeOrderByCreatedAtDesc(AiInsight.InsightType insightType);
}
