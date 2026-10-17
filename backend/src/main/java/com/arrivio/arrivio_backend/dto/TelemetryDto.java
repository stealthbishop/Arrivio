package com.arrivio.arrivio_backend.dto;

public class TelemetryDto {
    private String activeMesh;
    private double corridorEfficiencyPercentage;
    private double avgMatchDelayMinutes;
    private double networkCo2SavedKgPerHour;
    private int activeCarpoolsMatching;
    private String hovSpeedAdvantage;

    public TelemetryDto() {}

    public TelemetryDto(String activeMesh, double corridorEfficiencyPercentage, double avgMatchDelayMinutes, double networkCo2SavedKgPerHour, int activeCarpoolsMatching, String hovSpeedAdvantage) {
        this.activeMesh = activeMesh;
        this.corridorEfficiencyPercentage = corridorEfficiencyPercentage;
        this.avgMatchDelayMinutes = avgMatchDelayMinutes;
        this.networkCo2SavedKgPerHour = networkCo2SavedKgPerHour;
        this.activeCarpoolsMatching = activeCarpoolsMatching;
        this.hovSpeedAdvantage = hovSpeedAdvantage;
    }

    public String getActiveMesh() { return activeMesh; }
    public void setActiveMesh(String activeMesh) { this.activeMesh = activeMesh; }

    public double getCorridorEfficiencyPercentage() { return corridorEfficiencyPercentage; }
    public void setCorridorEfficiencyPercentage(double corridorEfficiencyPercentage) { this.corridorEfficiencyPercentage = corridorEfficiencyPercentage; }

    public double getAvgMatchDelayMinutes() { return avgMatchDelayMinutes; }
    public void setAvgMatchDelayMinutes(double avgMatchDelayMinutes) { this.avgMatchDelayMinutes = avgMatchDelayMinutes; }

    public double getNetworkCo2SavedKgPerHour() { return networkCo2SavedKgPerHour; }
    public void setNetworkCo2SavedKgPerHour(double networkCo2SavedKgPerHour) { this.networkCo2SavedKgPerHour = networkCo2SavedKgPerHour; }

    public int getActiveCarpoolsMatching() { return activeCarpoolsMatching; }
    public void setActiveCarpoolsMatching(int activeCarpoolsMatching) { this.activeCarpoolsMatching = activeCarpoolsMatching; }

    public String getHovSpeedAdvantage() { return hovSpeedAdvantage; }
    public void setHovSpeedAdvantage(String hovSpeedAdvantage) { this.hovSpeedAdvantage = hovSpeedAdvantage; }
}
