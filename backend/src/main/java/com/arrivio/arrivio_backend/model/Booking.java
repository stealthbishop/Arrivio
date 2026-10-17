package com.arrivio.arrivio_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    private String id;

    private String rideId;
    private String passengerName;
    private String passengerAvatar;
    private String seat;
    private String pickupLocation;
    private String dropoffLocation;
    private String pickupTime;
    private String dropoffTime;
    private double fare;
    private int pinCode;
    private String status;
    private LocalDateTime createdAt;

    public Booking() {
        this.createdAt = LocalDateTime.now();
    }

    public Booking(String id, String rideId, String passengerName, String seat, String pickupLocation, String dropoffLocation, String pickupTime, String dropoffTime, double fare, int pinCode, String status) {
        this.id = id;
        this.rideId = rideId;
        this.passengerName = passengerName;
        this.seat = seat;
        this.pickupLocation = pickupLocation;
        this.dropoffLocation = dropoffLocation;
        this.pickupTime = pickupTime;
        this.dropoffTime = dropoffTime;
        this.fare = fare;
        this.pinCode = pinCode;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRideId() { return rideId; }
    public void setRideId(String rideId) { this.rideId = rideId; }

    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }

    public String getPassengerAvatar() { return passengerAvatar; }
    public void setPassengerAvatar(String passengerAvatar) { this.passengerAvatar = passengerAvatar; }

    public String getSeat() { return seat; }
    public void setSeat(String seat) { this.seat = seat; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(String dropoffLocation) { this.dropoffLocation = dropoffLocation; }

    public String getPickupTime() { return pickupTime; }
    public void setPickupTime(String pickupTime) { this.pickupTime = pickupTime; }

    public String getDropoffTime() { return dropoffTime; }
    public void setDropoffTime(String dropoffTime) { this.dropoffTime = dropoffTime; }

    public double getFare() { return fare; }
    public void setFare(double fare) { this.fare = fare; }

    public int getPinCode() { return pinCode; }
    public void setPinCode(int pinCode) { this.pinCode = pinCode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
