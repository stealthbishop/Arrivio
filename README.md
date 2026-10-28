<!-- Arrivio README | midnight navy · teal · white -->

<div align="center">

# 🚗 Arrivio

### Better journeys. Shared together.

**A smarter way to find a ride along your route.**

Arrivio is a carpooling project designed to connect people travelling along similar corridors, help them compare ride options, and make shared travel more affordable.

<br />

[Explore the repository](https://github.com/stealthbishop/Arrivio) · [Report a bug](https://github.com/stealthbishop/Arrivio/issues) · [Request a feature](https://github.com/stealthbishop/Arrivio/issues)

<br />

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Java 17](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![License](https://img.shields.io/badge/License-Not_yet_specified-lightgrey?style=flat-square)

</div>

---

## 🌌 About Arrivio

Finding a convenient ride should not mean paying for an entire journey alone. Arrivio explores a more connected commute: discover people heading in a similar direction, compare shared-ride options, and understand the fare before booking.

The repository currently contains a **React + Vite frontend** and a **Spring Boot REST backend**. Some interface content uses demonstration data, so sample riders, availability, savings, and activity indicators should not be treated as live service information.

## ✨ What you can explore

- **Find and compare rides** — browse carpool options and compare estimated shared fares with solo-ride costs.
- **Commute planning** — work with origin, destination, and city-specific commute examples.
- **Booking flow** — explore the booking interface, seat selection, and booking confirmation experience.
- **Fare split calculator** — estimate how trip costs could be shared.
- **Trip management UI** — view the My Trips / commute area.
- **Map and commute widgets** — explore the location-focused interface built with Leaflet.
- **Safety-focused UI concepts** — includes an SOS notice concept; it is not a guarantee that emergency services or contacts are actually notified.

> **Project status:** Active development. UI demonstrations and backend endpoints are present, but not every screen or workflow is necessarily connected end-to-end. Verify each feature before relying on it for real travel or payments.

## 🎨 Design direction

Arrivio's visual identity is built around a focused, modern palette:

| Token | Purpose |
| --- | --- |
| Midnight navy | Main background and depth |
| Teal | Primary actions and highlights |
| White | High-contrast content |
| Cool slate | Secondary text and supporting surfaces |

The interface aims to feel clear, calm, and practical on desktop and mobile.

## 🧰 Technology

### Frontend
- React
- Vite
- React Leaflet / Leaflet for map components
- Lucide React icons

### Backend
- Java 17
- Spring Boot 3
- Spring Web, Spring Data JPA, and Bean Validation
- H2 in-memory database for the current backend configuration
- Maven Wrapper

### Planned improvements
PostgreSQL/PostGIS and Python-based matching or fare/travel-time prediction are potential next steps. They are **not represented as currently configured production capabilities** in this repository.

## 🗂️ Repository layout

```text
Arrivio/
├── src/                 # React application, components, styles and utilities
├── public/              # Public frontend assets
├── backend/             # Spring Boot application and Maven Wrapper
├── Dockerfile           # Container build for frontend + backend
├── render.yaml          # Render deployment configuration
├── package.json         # Frontend scripts and dependencies
└── README.md
```

## 🚀 Run locally

### Requirements
- Node.js 20 or a compatible version for the Vite toolchain
- npm
- Java 17 for the backend

### 1. Start the frontend

From the repository root:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (usually `http://localhost:5173`).

### 2. Start the backend

Open a second terminal:

**Windows**
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**macOS / Linux**
```bash
cd backend
./mvnw spring-boot:run
```

The backend is configured to run on `http://localhost:8080`. Its current development database is H2 in memory; data may not persist after a restart.

### 3. Build the frontend

From the repository root:

```bash
npm run build
npm run preview
```

## 📡 Backend API overview

The backend README documents the following routes:

| Area | Endpoint | Purpose |
| --- | --- | --- |
| Rides | `GET /api/rides` | Retrieve available ride records |
| Matching | `POST /api/rides/match` | Request matching ride options |
| Rides | `POST /api/rides` | Create a ride corridor |
| Bookings | `GET /api/bookings` | List booking records |
| Bookings | `POST /api/bookings` | Create a booking |
| Verification | `POST /api/bookings/{id}/verify` | Verify a booking PIN |
| Bookings | `DELETE /api/bookings/{id}` | Cancel a booking |
| Fares | `GET /api/fares/calculate` | Calculate an itemized fare estimate |
| Telemetry | `GET /api/telemetry` | Read commute-efficiency telemetry |

See the [backend README](backend/README.md) for request examples and additional details. Treat sample values and telemetry as demo data unless they have been validated against a live deployment.

## 🗺️ Roadmap

- [ ] Connect the frontend ride search and booking flows to the backend API.
- [ ] Add automated tests for matching, booking, verification, and fare calculations.
- [ ] Introduce persistent database configuration for deployment.
- [ ] Improve input validation, error states, accessibility, and mobile layouts.
- [ ] Add clear environment-variable and deployment documentation.
- [ ] Evaluate PostGIS for geographic matching.
- [ ] Explore and evaluate ML-based matching and fare / travel-time estimates.

## 🤝 Contributing

Ideas, bug reports, and thoughtful improvements are welcome.

1. Open an [issue](https://github.com/stealthbishop/Arrivio/issues) describing the change.
2. Create a focused branch.
3. Keep changes small and test the affected part of the application.
4. Open a pull request with a clear summary.

## ⚠️ Important note

Arrivio is a development project, not a verified transport, emergency-response, or payment service. Do not rely on demonstration availability, sample profiles, displayed savings, SOS notices, or booking PINs for real-world safety or transactions.

---

<div align="center">

**Arrivio** · Shared routes, smarter commutes.

<sub>Built with React, Spring Boot, and a vision for more connected journeys.</sub>

</div>
