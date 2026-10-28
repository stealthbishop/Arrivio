# Arrivio Spring Boot Backend

Production-ready Spring Boot 3 REST API for **Arrivio**, the intelligent carpooling and transparent fare splitting platform.

---

## 🛠 Tech Stack
- **Framework**: Spring Boot 3.3.4 (Java 17)
- **Database**: H2 In-Memory Database with JPA / Hibernate ORM
- **Build Tool**: Apache Maven (via Maven Wrapper `mvnw.cmd` / `./mvnw`)
- **Architecture**: Domain Entity $\to$ JPA Repository $\to$ Business Service $\to$ REST Controller $\to$ DTO Mapping

---

## 🚀 Running the Backend

### Run from pre-packaged standalone JAR (Instant startup):
```bash
java -jar target/arrivio-backend-1.0.0.jar
```

### Build and Run with Maven Wrapper:
```bash
# Windows
.\mvnw.cmd clean package -DskipTests
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw clean package -DskipTests
./mvnw spring-boot:run
```

The server runs on **`http://localhost:8080`**.
The H2 Database web console is accessible at **`http://localhost:8080/h2-console`** (JDBC URL: `jdbc:h2:mem:arriviodb`, User: `sa`, Password: empty).

---

## 🤖 Optional Groq AI chat

The backend includes an optional server-side Groq chat endpoint. The API key is read only by Spring Boot; do not put it in React/Vite variables such as `VITE_*`.

### Configure locally

1. From the repository root, copy `backend/.env.example` to `backend/.env`.
2. Open `backend/.env` and replace `your_groq_api_key_here` with your Groq API key. Never commit this file.
3. Start Spring Boot from the `backend` directory so the local `.env` file is loaded:

**Windows PowerShell**
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**macOS / Linux**
```bash
cd backend
./mvnw spring-boot:run
```

You can instead configure `GROQ_API_KEY` and optionally `GROQ_MODEL` as real environment variables in your terminal or deployment dashboard. Environment variables override values loaded from the local file.

### Chat endpoint

```http
POST http://localhost:8080/api/ai/chat
Content-Type: application/json

{"message":"How can I plan a shared ride?"}
```

Example response:
```json
{"reply":"..."}
```

If the key is missing, the endpoint returns a service-unavailable response. Provider errors are returned as a generic error so provider details and secrets are not exposed. Keep your Groq key server-side and rotate it immediately if it is ever exposed.

---

## 📡 REST API Reference

### 1. Corridor Matching & Rides (`/api/rides`)
- **`GET /api/rides`**: Retrieve all active rides or filter by `?hubId=hub-sfo`.
- **`POST /api/rides/match`**: Algorithmic matching engine.
  ```json
  POST /api/rides/match
  {
    "origin": "Financial District, Market St",
    "destination": "Tech Campus, Silicon Ave",
    "arrivalTimeWindow": "08:45 AM – 09:00 AM",
    "maxDetourMinutes": 10,
    "evOnly": true,
    "quietRide": false,
    "womenOnly": false
  }
  ```
  **Response**: Ranked list of co-riders with `scorePercentage`, `detourMinutes`, `price`, `soloPrice`, and `co2Offset`.
- **`POST /api/rides`**: Driver lists a new corridor commute.
- **`GET /api/rides/{id}`**: Get specific ride corridor coordinates and driver details.

### 2. Booking & Verification Pass (`/api/bookings`)
- **`GET /api/bookings`**: List all passenger reservations.
- **`POST /api/bookings`**: Reserve a seat on a corridor.
  ```json
  POST /api/bookings
  {
    "rideId": "match-1",
    "passengerName": "Alex Morgan",
    "seat": "Rear Left",
    "pickupLocation": "Market St Zone A",
    "dropoffLocation": "Campus Gate B",
    "pickupTime": "08:20 AM",
    "dropoffTime": "08:52 AM",
    "fare": 7.50
  }
  ```
  **Response**: Returns booking token with unique 4-digit verification PIN (e.g. `7100`) and updates seat inventory.
- **`POST /api/bookings/{id}/verify`**: Driver verifies passenger PIN at curb pickup:
  ```json
  POST /api/bookings/AR-913061/verify
  { "pin": 7100 }
  ```
- **`DELETE /api/bookings/{id}`**: Cancel a booking and release the seat back to the corridor pool.

### 3. Transparent Fare Splitting (`/api/fares`)
- **`GET /api/fares/calculate?distanceKm=35&passengerCount=3&isElectric=true&tollAmount=6.50`**:
  Calculates transparent itemized ledger (fuel, tolls, wear, driver commute offset, trust fee) with solo comparison and CO₂ prevented.

### 4. Telemetry (`/api/telemetry`)
- **`GET /api/telemetry`**: Returns live corridor efficiency (96.4%), average match delay (2.8m), and network CO₂ savings (412 kg/hr).
