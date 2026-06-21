# Dil Sai Tadka — API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:8080`  
**Format:** JSON (`Content-Type: application/json`)  
**Authentication:** JWT Bearer Token (most endpoints) or `X-Partner-Key` header (partner endpoints)

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [User Management (Admin)](#2-user-management-admin)
3. [Partner API — Zomato / Swiggy Integration](#3-partner-api--zomato--swiggy-integration)
   - 3.1 [Listing](#31-listing-endpoints)
   - 3.2 [Creating](#32-creating-endpoints)
   - 3.3 [Updating](#33-updating-endpoints)
   - 3.4 [Cancelling](#34-cancelling-endpoints)
4. [Menu Management](#4-menu-management)
5. [Room Management](#5-room-management)
6. [Orders](#6-orders)
7. [Bookings](#7-bookings)
8. [Analytics & Dashboard](#8-analytics--dashboard)
9. [AI / Groq Integration](#9-ai--groq-integration)
10. [Error Handling](#10-error-handling)
11. [Glossary](#11-glossary)

---

## 1. Authentication

All authenticated requests must include the header:

```
Authorization: Bearer <JWT_TOKEN>
```

### POST /api/auth/register

Register a new customer account.

**Access:** Public

**Request Body:**
```json
{
  "name": "Bhavya Pandey",
  "email": "bhavya@example.com",
  "password": "securePassword123",
  "phone": "9876543210"
}
```

**Success Response — 201 Created:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Bhavya Pandey",
    "email": "bhavya@example.com",
    "role": "ROLE_CUSTOMER"
  }
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 400 | Email already registered |
| 400 | Missing required fields |

---

### POST /api/auth/login

Login and obtain a JWT token.

**Access:** Public

**Request Body:**
```json
{
  "email": "bhavya@example.com",
  "password": "securePassword123"
}
```

**Success Response — 200 OK:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Bhavya Pandey",
    "email": "bhavya@example.com",
    "role": "ROLE_CUSTOMER"
  }
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 401 | Invalid email or password |

---

## 2. User Management (Admin)

> **Security:** All endpoints require `ROLE_ADMIN` JWT token.

### GET /api/users

Retrieve all registered users.

**Headers:** `Authorization: Bearer <ADMIN_TOKEN>`

**Success Response — 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@dilsaitadka.com",
    "role": "ROLE_ADMIN",
    "createdAt": "2024-01-01T00:00:00"
  },
  {
    "id": 2,
    "name": "Customer",
    "email": "customer@dilsaitadka.com",
    "role": "ROLE_CUSTOMER",
    "createdAt": "2024-01-02T00:00:00"
  }
]
```

---

### GET /api/users/{id}

Retrieve a single user by ID.

**Headers:** `Authorization: Bearer <ADMIN_TOKEN>`

**Path Parameter:** `id` — User ID (Long)

**Success Response — 200 OK:**
```json
{
  "id": 2,
  "name": "Customer",
  "email": "customer@dilsaitadka.com",
  "role": "ROLE_CUSTOMER"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 404 | User not found |

---

### PUT /api/users/{id}/role

Update a user's role.

**Headers:** `Authorization: Bearer <ADMIN_TOKEN>`

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

**Success Response — 200 OK:**
```json
{
  "id": 2,
  "name": "Customer",
  "email": "customer@dilsaitadka.com",
  "role": "ROLE_ADMIN"
}
```

---

### DELETE /api/users/{id}

Delete a user account.

**Headers:** `Authorization: Bearer <ADMIN_TOKEN>`

**Success Response — 204 No Content**

---

## 3. Partner API — Zomato / Swiggy Integration

> **Security:** All `/api/partner/**` endpoints require the `X-Partner-Key` header.  
> Partner keys are managed by the admin from the API Dashboard.  
> Rate limit: **60 requests per minute** per partner key.  
> Exceeding the limit returns `429 Too Many Requests`.

**Required Header:**
```
X-Partner-Key: <YOUR_PARTNER_API_KEY>
```

---

### 3.1 Listing Endpoints

#### GET /api/partner/restaurants

List all registered partner restaurants.

**Success Response — 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Dil Sai Tadka Main Branch",
    "cuisineType": "North Indian",
    "address": "123 MG Road, Bangalore",
    "rating": 4.8,
    "active": true
  }
]
```

---

#### GET /api/partner/menu

List all active menu items available for ordering.

**Success Response — 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Dal Makhani",
    "description": "Creamy black lentils slow cooked overnight",
    "price": 320.0,
    "category": "Main Course",
    "tag": "VEG",
    "active": true
  },
  {
    "id": 2,
    "name": "Butter Chicken",
    "description": "Tender chicken in rich tomato-butter gravy",
    "price": 450.0,
    "category": "Main Course",
    "tag": "NON_VEG",
    "active": true
  }
]
```

---

#### GET /api/partner/orders

List all orders placed through the platform.

**Success Response — 200 OK:**
```json
[
  {
    "id": 101,
    "userEmail": "customer@dilsaitadka.com",
    "totalAmount": 770.0,
    "status": "CONFIRMED",
    "items": [
      {
        "menuItemId": 1,
        "menuItemName": "Dal Makhani",
        "quantity": 1,
        "price": 320.0
      },
      {
        "menuItemId": 2,
        "menuItemName": "Butter Chicken",
        "quantity": 1,
        "price": 450.0
      }
    ]
  }
]
```

---

#### GET /api/partner/bookings

List all lodging bookings.

**Success Response — 200 OK:**
```json
[
  {
    "id": 55,
    "userEmail": "customer@dilsaitadka.com",
    "roomId": 3,
    "roomName": "Deluxe Suite",
    "checkIn": "2024-06-01",
    "checkOut": "2024-06-05",
    "guests": 2,
    "totalAmount": 12000.0,
    "status": "CONFIRMED"
  }
]
```

---

#### GET /api/partner/rooms

List all available rooms / lodging units.

**Success Response — 200 OK:**
```json
[
  {
    "id": 3,
    "name": "Deluxe Suite",
    "description": "Spacious suite with city view",
    "pricePerNight": 3000.0,
    "capacity": 2,
    "available": true
  }
]
```

---

### 3.2 Creating Endpoints

#### POST /api/partner/restaurants

Register a new partner restaurant.

**Request Body:**
```json
{
  "name": "Swiggy Cloud Kitchen",
  "cuisineType": "Multi-Cuisine",
  "address": "456 Indiranagar, Bangalore",
  "rating": 4.5
}
```

**Success Response — 201 Created:**
```json
{
  "id": 10,
  "name": "Swiggy Cloud Kitchen",
  "cuisineType": "Multi-Cuisine",
  "address": "456 Indiranagar, Bangalore",
  "rating": 4.5,
  "active": true
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 400 | Restaurant name is required |

---

#### POST /api/partner/orders

Place a new food order via the partner platform.

**Request Body:**
```json
{
  "userEmail": "customer@zomato.com",
  "items": [
    { "menuItemId": 1, "quantity": 2, "price": 320.0 },
    { "menuItemId": 2, "quantity": 1, "price": 450.0 }
  ]
}
```

**Success Response — 201 Created:**
```json
{
  "id": 102,
  "userEmail": "customer@zomato.com",
  "totalAmount": 1090.0,
  "status": "PENDING",
  "items": [
    { "menuItemId": 1, "menuItemName": "Dal Makhani", "quantity": 2, "price": 320.0 },
    { "menuItemId": 2, "menuItemName": "Butter Chicken", "quantity": 1, "price": 450.0 }
  ]
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 400 | User email and items list are required |
| 500 | Menu item not found for ID: {id} |

---

#### POST /api/partner/bookings

Create a new room booking via the partner platform.

**Request Body:**
```json
{
  "userEmail": "guest@airbnb.com",
  "roomId": 3,
  "checkIn": "2024-07-01",
  "checkOut": "2024-07-05",
  "guests": 2,
  "totalAmount": 12000.0
}
```

**Success Response — 201 Created:**
```json
{
  "id": 56,
  "userEmail": "guest@airbnb.com",
  "roomId": 3,
  "roomName": "Deluxe Suite",
  "checkIn": "2024-07-01",
  "checkOut": "2024-07-05",
  "guests": 2,
  "totalAmount": 12000.0,
  "status": "CONFIRMED"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 400 | userEmail, roomId, checkIn, and checkOut are required |
| 500 | Room not found for ID: {id} |

---

### 3.3 Updating Endpoints

#### PUT /api/partner/orders/{id}

Update an existing order's status or total amount.

**Path Parameter:** `id` — Order ID (Long)

**Request Body:**
```json
{
  "status": "CONFIRMED",
  "totalAmount": 1090.0
}
```

**Success Response — 200 OK:**
```json
{
  "id": 102,
  "status": "CONFIRMED",
  "totalAmount": 1090.0
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 404 | Order not found |

---

#### PUT /api/partner/bookings/{id}

Update an existing booking's dates, guests, status or amount.

**Path Parameter:** `id` — Booking ID (Long)

**Request Body:**
```json
{
  "checkIn": "2024-07-02",
  "checkOut": "2024-07-06",
  "guests": 3,
  "status": "CONFIRMED",
  "totalAmount": 15000.0
}
```

**Success Response — 200 OK:**
```json
{
  "id": 56,
  "checkIn": "2024-07-02",
  "checkOut": "2024-07-06",
  "guests": 3,
  "totalAmount": 15000.0,
  "status": "CONFIRMED"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 404 | Booking not found |

---

#### PUT /api/partner/menu/{id}

Update a menu item's details (price, availability, description, etc.).

**Path Parameter:** `id` — Menu Item ID (Long)

**Request Body:**
```json
{
  "name": "Dal Makhani Special",
  "price": 350.0,
  "active": true
}
```

**Success Response — 200 OK:**
```json
{
  "id": 1,
  "name": "Dal Makhani Special",
  "price": 350.0,
  "active": true
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 404 | Menu item not found |

---

### 3.4 Cancelling Endpoints

#### PATCH /api/partner/orders/{id}/cancel

Cancel an existing order.

**Path Parameter:** `id` — Order ID (Long)

**Success Response — 200 OK:**
```json
{
  "message": "Order cancelled successfully"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 404 | Order not found |

---

#### PATCH /api/partner/bookings/{id}/cancel

Cancel an existing room booking.

**Path Parameter:** `id` — Booking ID (Long)

**Success Response — 200 OK:**
```json
{
  "message": "Booking cancelled successfully"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| 404 | Booking not found |

---

## 4. Menu Management

> **GET** endpoints are public. **POST/PUT/DELETE** require `ROLE_ADMIN`.

### GET /api/menu

Retrieve all menu items.

**Success Response — 200 OK:** Array of menu item objects (see Partner Menu schema above).

### GET /api/menu/search?query={term}

Search menu items by name or description.

### GET /api/menu/categories

Retrieve all distinct menu categories.

**Success Response — 200 OK:**
```json
["Starter", "Main Course", "Dessert", "Beverages"]
```

### POST /api/menu

Create a new menu item. *(Admin only)*

### PUT /api/menu/{id}

Update an existing menu item. *(Admin only)*

### DELETE /api/menu/{id}

Delete a menu item. *(Admin only)*

---

## 5. Room Management

> All GET endpoints are public.

### GET /api/rooms

Retrieve all rooms / lodging units.

### GET /api/rooms/{id}

Retrieve a specific room by ID.

---

## 6. Orders

> `GET /api/orders` and `GET /api/orders/{id}` require `ROLE_ADMIN`.  
> `GET /api/orders/my` returns only the authenticated user's orders.  
> `POST /api/orders` requires any authenticated user.

### GET /api/orders *(Admin)*

List all orders sorted by most recent.

### GET /api/orders/my *(Authenticated User)*

List orders placed by the currently logged-in user.

### POST /api/orders *(Authenticated User)*

Place a new food order.

**Request Body:**
```json
{
  "total": 770.0,
  "items": [
    { "id": 1, "quantity": 1, "price": 320.0 },
    { "id": 2, "quantity": 1, "price": 450.0 }
  ]
}
```

### PUT /api/orders/{id}/status *(Admin)*

Update the status of an order.

**Request Body:**
```json
{ "status": "CONFIRMED" }
```

**Valid Statuses:** `PENDING`, `CONFIRMED`, `PREPARING`, `DELIVERED`, `CANCELLED`

---

## 7. Bookings

> `GET /api/bookings` requires `ROLE_ADMIN`.  
> `GET /api/bookings/my` returns only the authenticated user's bookings.  
> `POST /api/bookings` requires any authenticated user.

### GET /api/bookings *(Admin)*

List all bookings sorted by most recent.

### GET /api/bookings/my *(Authenticated User)*

List bookings made by the currently logged-in user.

### POST /api/bookings *(Authenticated User)*

Create a new room booking.

**Request Body:**
```json
{
  "roomId": 3,
  "checkIn": "2024-07-01",
  "checkOut": "2024-07-05",
  "guests": 2,
  "total": 12000.0
}
```

### PUT /api/bookings/{id}/status *(Admin)*

Update the status of a booking.

**Request Body:**
```json
{ "status": "CONFIRMED" }
```

**Valid Statuses:** `PENDING`, `CONFIRMED`, `CANCELLED`

---

## 8. Analytics & Dashboard

> All dashboard endpoints require `ROLE_ADMIN`.  
> Analytics endpoints are accessible with a valid JWT token.

### GET /api/dashboard/stats

Returns key platform statistics.

**Success Response — 200 OK:**
```json
{
  "totalOrders": 245,
  "totalBookings": 89,
  "totalMenuItems": 42,
  "totalRooms": 15,
  "totalUsers": 312,
  "totalReviews": 178
}
```

---

### GET /api/dashboard/revenue

Returns monthly revenue aggregated from all orders.

**Success Response — 200 OK:**
```json
{
  "monthlyRevenue": {
    "2024-01": 45200.0,
    "2024-02": 52100.0,
    "2024-03": 61800.0,
    "2024-04": 70500.0,
    "2024-05": 83200.0
  }
}
```

---

### GET /api/dashboard/recent-orders

Returns the 10 most recent orders.

### GET /api/dashboard/recent-bookings

Returns the 10 most recent bookings.

---

### GET /api/analytics/metrics

Returns detailed API usage metrics per partner.

**Success Response — 200 OK:**
```json
{
  "totalRequests": 1523,
  "successfulRequests": 1489,
  "failedRequests": 34,
  "averageResponseTime": 142,
  "topEndpoints": [
    { "endpoint": "/api/partner/orders", "count": 520 },
    { "endpoint": "/api/partner/menu", "count": 412 },
    { "endpoint": "/api/partner/bookings", "count": 321 }
  ],
  "partnerActivity": [
    { "partnerName": "Zomato", "requestCount": 720 },
    { "partnerName": "Swiggy", "requestCount": 580 },
    { "partnerName": "Airbnb", "requestCount": 223 }
  ]
}
```

---

### GET /api/analytics/logs

Returns the last 100 raw API usage log entries.

**Success Response — 200 OK:**
```json
[
  {
    "id": 1,
    "partnerName": "Zomato",
    "endpoint": "/api/partner/orders",
    "method": "POST",
    "statusCode": 201,
    "responseTimeMs": 98,
    "timestamp": "2024-05-28T14:30:00"
  }
]
```

---

## 9. AI / Groq Integration

> Powered by **Groq's `llama3-8b-8192` model**.  
> If the Groq API key is not configured, cinematic local fallback responses are returned.

### GET /api/ai/feedback

Generates an AI-powered sentiment analysis summary from all customer reviews and complaints.

**Access:** Admin JWT required

**Success Response — 200 OK:**
```json
{
  "summary": "Customers are highly satisfied with the ambiance and food quality...",
  "satisfactionPercentage": 92,
  "strengths": ["Excellent food quality", "Responsive staff", "Clean rooms"],
  "complaints": ["Occasional delays during peak hours", "Parking availability"],
  "recommendations": "Focus on improving peak-hour order management.",
  "generatedAt": "2024-05-28T14:30:00"
}
```

---

### POST /api/ai/chat

Send a message to the AI Culinary Assistant.

**Access:** Any authenticated user

**Request Body:**
```json
{
  "message": "What would you recommend for a vegetarian dinner for two?"
}
```

**Success Response — 200 OK:**
```json
{
  "response": "For a romantic vegetarian dinner for two, I'd recommend starting with our **Paneer Tikka** (₹280) followed by the rich **Dal Makhani** (₹320) paired with **Butter Naan** (₹60)..."
}
```

---

## 10. Error Handling

All errors are returned as structured JSON:

```json
{
  "error": "Description of what went wrong",
  "status": 404
}
```

| Status Code | Meaning |
|------------|---------|
| 400 | Bad Request — Missing or invalid fields |
| 401 | Unauthorized — Invalid or missing JWT token |
| 403 | Forbidden — Insufficient role/permissions |
| 404 | Not Found — Resource does not exist |
| 429 | Too Many Requests — Partner rate limit exceeded (60/min) |
| 500 | Internal Server Error — Unexpected server error |

---

## 11. Glossary

| Term | Definition |
|------|-----------|
| **JWT** | JSON Web Token used for stateless authentication |
| **Partner Key** | UUID-based API key issued to third-party partners (Zomato, Swiggy, Airbnb) |
| **ROLE_ADMIN** | Superuser role with full platform access |
| **ROLE_CUSTOMER** | Standard user role for ordering and booking |
| **Order** | A food order placed by a customer through the platform |
| **Booking** | A lodging/room reservation placed by a customer |
| **PartnerRestaurant** | A restaurant entity registered and managed by a third-party partner |
| **AiInsight** | Stored result of a Groq LLM analysis run on platform reviews |
| **ApiUsageLog** | A database record capturing each API call made by a partner |

---

*© 2024 Dil Sai Tadka — Premium Lodgings & Restaurant Management System*  
*Version 1.0.0 | Developed with Spring Boot 3.2.4 + React 18 + PostgreSQL*
