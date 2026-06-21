package com.dilsaitadka.analytics.repository;

import com.dilsaitadka.analytics.entity.ApiUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface ApiUsageLogRepository extends JpaRepository<ApiUsageLog, Long> {
    List<ApiUsageLog> findAllByOrderByTimestampDesc();

    @Query("SELECT COUNT(l) FROM ApiUsageLog l WHERE l.statusCode >= 200 AND l.statusCode < 300")
    long countSuccessfulRequests();

    @Query("SELECT COUNT(l) FROM ApiUsageLog l WHERE l.statusCode >= 400")
    long countFailedRequests();

    @Query("SELECT AVG(l.responseTimeMs) FROM ApiUsageLog l")
    Double getAverageResponseTime();

    @Query("SELECT l.endpoint as endpoint, COUNT(l) as count FROM ApiUsageLog l GROUP BY l.endpoint ORDER BY count DESC")
    List<Map<String, Object>> getTopEndpoints();

    @Query("SELECT l.partnerName as partner, COUNT(l) as count FROM ApiUsageLog l GROUP BY l.partnerName ORDER BY count DESC")
    List<Map<String, Object>> getPartnerActivity();
}
