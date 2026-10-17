package com.arrivio.arrivio_backend.dto;

public class MatchResultDto {
    private String id;
    private String score;
    private int scorePercentage;
    private String detour;
    private int detourMinutes;

    private String driverName;
    private String driverAvatar;
    private String driverCar;
    private double driverRating;
    private int driverTotalRides;
    private boolean verified;

    private int seatsTotal;
    private int seatsAvailable;

    private String pickupTime;
    private String pickupLocation;
    private String dropoffTime;
    private String dropoffLocation;

    private String price;
    private double numericPrice;
    private String soloPrice;
    private double numericSoloPrice;
    private String co2Offset;
    private double co2SavedKg;

    private String corridorJson;

    public MatchResultDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getScore() { return score; }
    public void setScore(String score) { this.score = score; }

    public int getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(int scorePercentage) { this.scorePercentage = scorePercentage; }

    public String getDetour() { return detour; }
    public void setDetour(String detour) { this.detour = detour; }

    public int getDetourMinutes() { return detourMinutes; }
    public void setDetourMinutes(int detourMinutes) { this.detourMinutes = detourMinutes; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getDriverAvatar() { return driverAvatar; }
    public void setDriverAvatar(String driverAvatar) { this.driverAvatar = driverAvatar; }

    public String getDriverCar() { return driverCar; }
    public void setDriverCar(String driverCar) { this.driverCar = driverCar; }

    public double getDriverRating() { return driverRating; }
    public void setDriverRating(double driverRating) { this.driverRating = driverRating; }

    public int getDriverTotalRides() { return driverTotalRides; }
    public void setDriverTotalRides(int driverTotalRides) { this.driverTotalRides = driverTotalRides; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public int getSeatsTotal() { return seatsTotal; }
    public void setSeatsTotal(int seatsTotal) { this.seatsTotal = seatsTotal; }

    public int getSeatsAvailable() { return seatsAvailable; }
    public void setSeatsAvailable(int seatsAvailable) { this.seatsAvailable = seatsAvailable; }

    public String getPickupTime() { return pickupTime; }
    public void setPickupTime(String pickupTime) { this.pickupTime = pickupTime; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDropoffTime() { return dropoffTime; }
    public void setDropoffTime(String dropoffTime) { this.dropoffTime = dropoffTime; }

    public String getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(String dropoffLocation) { this.dropoffLocation = dropoffLocation; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public double getNumericPrice() { return numericPrice; }
    public void setNumericPrice(double numericPrice) { this.numericPrice = numericPrice; }

    public String getSoloPrice() { return soloPrice; }
    public void setSoloPrice(String soloPrice) { this.soloPrice = soloPrice; }

    public double getNumericSoloPrice() { return numericSoloPrice; }
    public void setNumericSoloPrice(double numericSoloPrice) { this.numericSoloPrice = numericSoloPrice; }

    public String getCo2Offset() { return co2Offset; }
    public void setCo2Offset(String co2Offset) { this.co2Offset = co2Offset; }

    public double getCo2SavedKg() { return co2SavedKg; }
    public void setCo2SavedKg(double co2SavedKg) { this.co2SavedKg = co2SavedKg; }

    public String getCorridorJson() { return corridorJson; }
    public void setCorridorJson(String corridorJson) { this.corridorJson = corridorJson; }
}
