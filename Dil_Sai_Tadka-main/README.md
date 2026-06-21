# 🍛 Dil Se Tadka

**Premium Lodgings & Restaurant Management Platform**

A cinematic, modern full-stack web application for managing a boutique hospitality and restaurant experience.

---

## 🏗️ Tech Stack

### Frontend
- **React.js** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion** (cinematic animations)
- **React Router DOM** (SPA routing)
- **Axios** (API communication)
- **Recharts** (dashboard charts)

### Backend
- **Java 17** + **Spring Boot 3.2**
- **Spring Security** + **JWT Authentication**
- **Spring Data JPA** + **Hibernate**
- **PostgreSQL**
- **Maven**

---

## 📁 Project Structure

```
dilsaitadka/
├── frontend/          # React + Vite frontend
│   └── src/
│       ├── pages/          # All page components
│       ├── components/     # Reusable UI components
│       ├── layouts/        # MainLayout, AdminLayout
│       ├── context/        # Auth & Cart providers
│       ├── services/       # Axios API layer
│       └── animations/     # Framer Motion utilities
├── backend/           # Spring Boot backend
│   └── src/main/java/com/dilsaitadka/
│       ├── controller/     # REST API controllers
│       ├── entity/         # JPA entities
│       ├── repository/     # Spring Data repositories
│       ├── security/       # JWT token & filter
│       ├── config/         # Security & data seeding
│       └── dto/            # Data transfer objects
└── docs/              # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **Java** 17+
- **PostgreSQL** 14+
- **Maven** 3.8+

### 1. Database Setup
```sql
CREATE DATABASE dil_sai_tadka;
```

### 2. Backend Setup
```bash
cd backend
# Update database credentials in src/main/resources/application.properties
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`. The database tables will be auto-created and seeded with sample data.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173` with API proxy to the backend.

---

## 🔐 Default Accounts

| Role     | Email                    | Password     |
|----------|--------------------------|--------------|
| Admin    | admin@dilsaitadka.com    | Admin@123    |
| Customer | customer@dilsaitadka.com | Customer@123 |

---

## 🎯 Features

### Customer Features
- Register & Login (JWT)
- Browse Food Menu with category filters & search
- Add to Cart & Place Orders
- Track Order History
- Browse & Book Rooms
- View Bookings
- Submit Reviews
- Submit Complaints
- User Profile Management

### Admin Features
- Admin Dashboard with analytics
- Menu Management (CRUD)
- Room Management (CRUD)
- Order Management with status updates
- Booking Management
- Review Management
- Complaint Management
- User Management

---

## 🎨 Design System

- **Font:** Plus Jakarta Sans
- **Primary Color:** `#775932` (Warm Brown)
- **Background:** `#FFF8F1` (Warm Cream)
- **Glass Effects:** Frosted glassmorphism with backdrop blur
- **Animations:** Cinematic Framer Motion transitions
- **Shadows:** Warm ambient shadows with brown tinting
- **Border Radius:** 32px for cards, pill for buttons

---

## 📡 API Endpoints

| Method | Endpoint                  | Auth     | Description          |
|--------|---------------------------|----------|----------------------|
| POST   | `/api/auth/login`         | Public   | User login           |
| POST   | `/api/auth/register`      | Public   | User registration    |
| GET    | `/api/menu`               | Public   | List menu items      |
| GET    | `/api/rooms`              | Public   | List rooms           |
| GET    | `/api/reviews`            | Public   | List reviews         |
| POST   | `/api/orders`             | Auth     | Create order         |
| POST   | `/api/bookings`           | Auth     | Create booking       |
| POST   | `/api/complaints`         | Auth     | Submit complaint     |
| GET    | `/api/dashboard/stats`    | Admin    | Dashboard analytics  |
| POST   | `/api/menu`               | Admin    | Create menu item     |
| PUT    | `/api/menu/{id}`          | Admin    | Update menu item     |
| DELETE | `/api/menu/{id}`          | Admin    | Delete menu item     |

---

## 📄 License

This project is built for educational and portfolio purposes.

---

*Crafted with ❤️ by Dil Se Tadka Team*
