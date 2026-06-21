package com.dilsaitadka.security;

import com.dilsaitadka.partner.entity.PartnerIntegration;
import com.dilsaitadka.partner.repository.PartnerIntegrationRepository;
import com.dilsaitadka.analytics.entity.ApiUsageLog;
import com.dilsaitadka.analytics.repository.ApiUsageLogRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(1) // Execute early
public class PartnerAuthFilter extends OncePerRequestFilter {

    private final PartnerIntegrationRepository partnerIntegrationRepository;
    private final ApiUsageLogRepository apiUsageLogRepository;

    // In-memory rate limiting placeholder: Partner Name -> Minute-bucket count
    private final Map<String, AtomicLong> rateLimitCounter = new ConcurrentHashMap<>();
    private final long rateLimitMax = 60; // Max 60 requests per minute for demonstration

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.startsWith("/api/partner");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String apiKey = request.getHeader("X-Partner-Key");
        long startTime = System.currentTimeMillis();
        String endpoint = request.getRequestURI();
        String method = request.getMethod();

        if (apiKey == null || apiKey.trim().isEmpty()) {
            log.warn("Partner access denied: Missing X-Partner-Key header for endpoint {}", endpoint);
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: X-Partner-Key header is missing");
            saveLogToDb("Anonymous", endpoint, method, HttpServletResponse.SC_UNAUTHORIZED, startTime, "Unauthorized: Missing API Key");
            return;
        }

        PartnerIntegration partner = partnerIntegrationRepository.findByApiKey(apiKey).orElse(null);
        if (partner == null || partner.getStatus() != PartnerIntegration.Status.ACTIVE) {
            log.warn("Partner access denied: Invalid or Inactive X-Partner-Key: {}", apiKey);
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Invalid or inactive API key");
            saveLogToDb("Anonymous", endpoint, method, HttpServletResponse.SC_UNAUTHORIZED, startTime, "Unauthorized: Invalid API Key");
            return;
        }

        String partnerName = partner.getName();

        // --- Rate Limiting Simulation ---
        long minuteKey = System.currentTimeMillis() / 60000;
        String rateKey = partnerName + ":" + minuteKey;
        rateLimitCounter.putIfAbsent(rateKey, new AtomicLong(0));
        long currentRequests = rateLimitCounter.get(rateKey).incrementAndGet();

        if (currentRequests > rateLimitMax) {
            log.warn("Rate limit exceeded for partner {}: count={}", partnerName, currentRequests);
            sendErrorResponse(response, 429, "Too Many Requests: Rate limit of " + rateLimitMax + " req/min exceeded");
            saveLogToDb(partnerName, endpoint, method, 429, startTime, "Rate Limit Exceeded");
            return;
        }

        int statusCode = HttpServletResponse.SC_OK;
        String errorMessage = null;

        try {
            // Let the filter chain proceed
            filterChain.doFilter(request, response);
            statusCode = response.getStatus();
        } catch (Exception e) {
            statusCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
            errorMessage = e.getMessage();
            throw e;
        } finally {
            saveLogToDb(partnerName, endpoint, method, statusCode, startTime, errorMessage);
        }
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write(String.format("{\"error\": \"%s\", \"status\": %d}", message, status));
    }

    private void saveLogToDb(String partnerName, String endpoint, String method, int statusCode, long startTime, String error) {
        try {
            long latency = System.currentTimeMillis() - startTime;
            ApiUsageLog apiLog = ApiUsageLog.builder()
                    .partnerName(partnerName)
                    .endpoint(endpoint)
                    .method(method)
                    .statusCode(statusCode)
                    .responseTimeMs(latency)
                    .errorMessage(error != null && error.length() > 250 ? error.substring(0, 250) : error)
                    .timestamp(LocalDateTime.now())
                    .build();
            apiUsageLogRepository.save(apiLog);
        } catch (Exception ex) {
            log.error("Failed to save API usage log to database: {}", ex.getMessage());
        }
    }
}
