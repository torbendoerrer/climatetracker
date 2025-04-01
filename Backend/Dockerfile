FROM maven:3.9.9-eclipse-temurin-23-alpine AS builder

LABEL version="1.0.0"
LABEL description="climate tracker backend"

WORKDIR /app

COPY . .

RUN mvn package -DskipTests


FROM eclipse-temurin:23-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
