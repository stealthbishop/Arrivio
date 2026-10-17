# -----------------------------------------------------------
# Stage 1: Build the React (Vite) Frontend
# -----------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -----------------------------------------------------------
# Stage 2: Build the Spring Boot Backend with embedded Frontend
# -----------------------------------------------------------
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app

# Cache Maven dependencies
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy backend source code
COPY backend/src ./src

# Ensure static files from frontend build are in place
COPY --from=frontend-builder /app/backend/src/main/resources/static ./src/main/resources/static

# Package executable JAR
RUN mvn clean package -DskipTests

# -----------------------------------------------------------
# Stage 3: Lightweight Production JRE Runtime
# -----------------------------------------------------------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the compiled JAR
COPY --from=backend-builder /app/target/*.jar app.jar

# Render passes dynamic port in $PORT; default to 8080 if not set
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
