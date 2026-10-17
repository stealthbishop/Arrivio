package com.arrivio.arrivio_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "passenger_requests")
public class PassengerRequest {

    @Id
    private String id;
    private String name;
    private String avatar;
    private String flight;
    private String landingTime;
    private String destination;
    private int detourMinutes;
    private double offerFare;
    private String luggage;
    private double rating;
    private String status;

    public PassengerRequest() {}

    public PassengerRequest(String id, String name, String avatar, String flight, String landingTime, String destination, int detourMinutes, double offerFare, String luggage, double rating, String status) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.flight = flight;
        this.landingTime = landingTime;
        this.destination = destination;
        this.detourMinutes = detourMinutes;
        this.offerFare = offerFare;
        this.luggage = luggage;
        this.rating = rating;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getFlight() { return flight; }
    public void setFlight(String flight) { this.flight = flight; }

    public String getLandingTime() { return landingTime; }
    public void setLandingTime(String landingTime) { this.landingTime = landingTime; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public int getDetourMinutes() { return detourMinutes; }
    public void setDetourMinutes(int detourMinutes) { this.detourMinutes = detourMinutes; }

    public double getOfferFare() { return offerFare; }
    public void setOfferFare(double offerFare) { this.offerFare = offerFare; }

    public String getLuggage() { return luggage; }
    public void setLuggage(String luggage) { this.luggage = luggage; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
