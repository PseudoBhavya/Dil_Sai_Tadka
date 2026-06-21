# Dil Sai Tadka — Code Snippets & Response Payloads Reference

This reference catalog provides concrete code implementations, cURL executions, and typical JSON response structures for the upgraded **Hospitality SaaS Platform Gateway**.

---

## 💻 1. Core Backend Security Implementation

Below is a snippet of the Spring Boot servlet filter handling partner key validation, rate-limiting, and metric logging.

```java
package com.dilsaitadka.security;

import com.dilsaitadka.partner.entity.PartnerIntegration;
import com.dilsaitadka.analytics.entity.ApiUsageLog;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PartnerAuthFilter extends OncePerRequestFilter {

    private final PartnerIntegrationRepository partnerIntegrationRepository;
    private final ApiUsageLogRepository apiUsageLogRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String apiKey = request.getHeader("X-Partner-Key");
        long startTime = System.currentTimeMillis();
        String endpoint = request.getRequestURI();
        String method = request.getMethod();

        if (apiKey == null) {
            sendErrorResponse(response, 401, "Unauthorized: X-Partner-Key header is missing");
            saveLogToDb("Anonymous", endpoint, method, 401, startTime, "Missing Key");
            return;
        }

        PartnerIntegration partner = partnerIntegrationRepository.findByApiKey(apiKey).orElse(null);
        if (partner == null || partner.getStatus() != PartnerIntegration.Status.ACTIVE) {
            sendErrorResponse(response, 401, "Unauthorized: Invalid or inactive API key");
            saveLogToDb("Anonymous", endpoint, method, 401, startTime, "Invalid Key");
            return;
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            saveLogToDb(partner.getName(), endpoint, method, response.getStatus(), startTime, null);
        }
    }
}
```

---

## 📡 2. Client Integration cURL Commands

Use the following cURL calls to communicate with the Gateway:

```bash
# 1. Fetch Menu items using Swiggy API key
curl -X GET http://localhost:8080/api/partner/menu \
  -H "X-Partner-Key: swiggy-partner-key-2026"

# 2. Place order from Swiggy
curl -X POST http://localhost:8080/api/partner/orders \
  -H "X-Partner-Key: swiggy-partner-key-2026" \
  -H "Content-Type: application/json" \
  -d '{
        "userEmail": "customer@dilsaitadka.com",
        "items": [
          {"menuItemId": 2, "quantity": 1, "price": 680.0},
          {"menuItemId": 6, "quantity": 2, "price": 420.0}
        ]
      }'

# 3. Create room booking from Airbnb
curl -X POST http://localhost:8080/api/partner/bookings \
  -H "X-Partner-Key: booking-provider-key-2026" \
  -H "Content-Type: application/json" \
  -d '{
        "userEmail": "customer@dilsaitadka.com",
        "roomId": 1,
        "checkIn": "2026-06-01",
        "checkOut": "2026-06-05",
        "guests": 2
      }'
```

---

## 📊 3. JSON Payloads & Schema Formats

### A. List Restaurants (`GET /api/partner/restaurants`)
```json
[
  {
    "id": 1,
    "name": "Dil Sai Tadka - Signature",
    "cuisineType": "Indian Gourmet Fusion",
    "address": "12 Palace Road, Jaipur",
    "rating": 4.9,
    "active": true
  },
  {
    "id": 2,
    "name": "Sai Palace Gourmet",
    "cuisineType": "Royal Awadhi",
    "address": "Ground Floor Court, Mumbai",
    "rating": 4.8,
    "active": true
  }
]
```

### B. Place Order Response (`POST /api/partner/orders`)
- **Status**: `201 Created`
```json
{
  "id": 8,
  "userEmail": "customer@dilsaitadka.com",
  "totalAmount": 1520.0,
  "status": "PENDING",
  "items": [
    {
      "menuItemId": 2,
      "menuItemName": "Royal Saffron Biryani",
      "quantity": 1,
      "price": 680.0
    },
    {
      "menuItemId": 6,
      "menuItemName": "Smoked Clay Tikka",
      "quantity": 2,
      "price": 420.0
    }
  ]
}
```

### C. Create Booking Response (`POST /api/partner/bookings`)
- **Status**: `201 Created`
```json
{
  "id": 12,
  "userEmail": "customer@dilsaitadka.com",
  "roomId": 1,
  "roomName": "Azure Garden Suite",
  "checkIn": "2026-06-01",
  "checkOut": "2026-06-05",
  "guests": 2,
  "totalAmount": 720.0,
  "status": "CONFIRMED"
}
```

### D. Cancel Order Response (`PATCH /api/partner/orders/8/cancel`)
- **Status**: `200 OK`
```json
{
  "message": "Order cancelled successfully"
}
```

### E. Rate Limit Rejection Payload (HTTP 429)
```json
{
  "error": "Too Many Requests: Rate limit of 60 req/min exceeded",
  "status": 429
}
```
