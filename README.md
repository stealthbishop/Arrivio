# Arrivio 🚗

**Arrivio** is a planned ride-sharing platform that helps passengers arriving at airports or railway stations find other travellers heading to nearby destinations. The goal is to make onward travel more affordable by matching compatible passengers so they can share a cab and split the fare.

> **Project status:** In development. Features and architecture described here are planned unless they are already implemented in the codebase.

## ✨ Project goals

- Match passengers with similar arrival times and nearby destinations.
- Help travellers coordinate shared rides and divide cab costs.
- Explore location-aware matching and route-distance calculations.
- Add machine-learning support for passenger matching and fare/travel-time estimates as the project develops.

## 🧰 Planned technology stack

| Area | Technology |
| --- | --- |
| Frontend | React |
| Backend | Spring Boot |
| Database | PostgreSQL |
| Geospatial queries | PostGIS |
| Machine learning | Python |

## 🎨 Design direction

The intended interface uses **midnight navy, teal, and white**, with a clean, mobile-friendly layout.

## 🗺️ Intended user flow

1. A traveller enters their arrival details and destination.
2. Arrivio finds potentially compatible travellers based on timing and location.
3. Travellers review a suggested shared ride.
4. The group coordinates the ride and agrees on fare splitting.

This describes the intended experience; it does not imply that all steps are currently implemented.

## 🚀 Development

The frontend is planned with React and Vite. Backend, database, and machine-learning components can be developed and integrated incrementally.

When contributing or running the project locally, follow the setup instructions in the relevant frontend or backend directory once those instructions are available.

## 🔮 Roadmap

- [ ] Build the core passenger-facing UI.
- [ ] Implement passenger and trip APIs with Spring Boot.
- [ ] Design the PostgreSQL schema and add PostGIS-based location queries.
- [ ] Develop and evaluate passenger-matching logic.
- [ ] Explore fare and travel-time prediction.
- [ ] Add testing, deployment instructions, and complete setup documentation.

## 🤝 Contributions

Suggestions and improvements are welcome. Please open an issue to discuss a proposed change before starting substantial work.

---

*Arrivio — better journeys, shared together.*
