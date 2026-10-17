package com.arrivio.arrivio_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    private String id;

    private String hubId;

    // Driver details
    private String driverName;
    private String driverAvatar;
    private double driverRating;
    private int driverTotalRides;
    private boolean verified;

    // Vehicle details
    private String vehicleModel;
    private String vehiclePlate;
    private boolean electric;

    // Route endpoints
    private String originName;
    private double originLat;
    private double originLng;

    private String destinationName;
    private double destinationLat;
    private double destinationLng;

    // Time & Seats
    private String departureTime;
    private String arrivalTimeWindow;
    private int totalSeats;
    private int bookedSeats;

    // Fares
    private double baseSoloCost;
    private double currentSharedFarePerSeat;
    private int maxDetourToleranceMins;

    // Comfort preferences
    private boolean womenOnly;
    private boolean silentRide;

    @Column(length = 4000)
    private String corridorJson;

    public Ride() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getHubId() { return hubId; }
    public void setHubId(String hubId) { this.hubId = hubId; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getDriverAvatar() { return driverAvatar; }
    public void setDriverAvatar(String driverAvatar) { this.driverAvatar = driverAvatar; }

    public double getDriverRating() { return driverRating; }
    public void setDriverRating(double driverRating) { this.driverRating = driverRating; }

    public int getDriverTotalRides() { return driverTotalRides; }
    public void setDriverTotalRides(int driverTotalRides) { this.driverTotalRides = driverTotalRides; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public String getVehiclePlate() { return vehiclePlate; }
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    public boolean isElectric() { return electric; }
    public void setElectric(boolean electric) { this.electric = electric; }

    public String getOriginName() { return originName; }
    public void setOriginName(String originName) { this.originName = originName; }

    public double getOriginLat() { return originLat; }
    public void setOriginLat(double originLat) { this.originLat = originLat; }

    public double getOriginLng() { return originLng; }
    public void setOriginLng(double originLng) { this.originLng = originLng; }

    public String getDestinationName() { return destinationName; }
    public void setDestinationName(String destinationName) { this.destinationName = destinationName; }

    public double getDestinationLat() { return destinationLat; }
    public void setDestinationLat(double destinationLat) { this.destinationLat = destinationLat; }

    public double getDestinationLng() { return destinationLng; }
    public void setDestinationLng(double destinationLng) { this.destinationLng = destinationLng; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }

    public String getArrivalTimeWindow() { return arrivalTimeWindow; }
    public void setArrivalTimeWindow(String arrivalTimeWindow) { this.arrivalTimeWindow = arrivalTimeWindow; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public int getBookedSeats() { return bookedSeats; }
    public void setBookedSeats(int bookedSeats) { this.bookedSeats = bookedSeats; }

    public double getBaseSoloCost() { return baseSoloCost; }
    public void setBaseSoloCost(double baseSoloCost) { this.baseSoloCost = baseSoloCost; }

    public double getCurrentSharedFarePerSeat() { return currentSharedFarePerSeat; }
    public void setCurrentSharedFarePerSeat(double currentSharedFarePerSeat) { this.currentSharedFarePerSeat = currentSharedFarePerSeat; }

    public int getMaxDetourToleranceMins() { return maxDetourToleranceMins; }
    public void setMaxDetourToleranceMins(int maxDetourToleranceMins) { this.maxDetourToleranceMins = maxDetourToleranceMins; }

    public boolean isWomenOnly() { return womenOnly; }
    public void setWomenOnly(boolean womenOnly) { this.womenOnly = womenOnly; }

    public boolean isSilentRide() { return silentRide; }
    public void setSilentRide(boolean silentRide) { this.silentRide = silentRide; }

    public String getCorridorJson() { return corridorJson; }
    public void setCorridorJson(String corridorJson) { this.corridorJson = corridorJson; }

    public int getAvailableSeats() {
        return Math.max(0, this.totalSeats - this.bookedSeats);
    }
}
