package com.arrivio.arrivio_backend.dto;

public class MatchRequest {
    private String origin;
    private String destination;
    private Double originLat;
    private Double originLng;
    private Double destinationLat;
    private Double destinationLng;
    private String arrivalTimeWindow;
    private Integer maxDetourMinutes;
    private Boolean evOnly;
    private Boolean quietRide;
    private Boolean womenOnly;

    public MatchRequest() {}

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public Double getOriginLat() { return originLat; }
    public void setOriginLat(Double originLat) { this.originLat = originLat; }

    public Double getOriginLng() { return originLng; }
    public void setOriginLng(Double originLng) { this.originLng = originLng; }

    public Double getDestinationLat() { return destinationLat; }
    public void setDestinationLat(Double destinationLat) { this.destinationLat = destinationLat; }

    public Double getDestinationLng() { return destinationLng; }
    public void setDestinationLng(Double destinationLng) { this.destinationLng = destinationLng; }

    public String getArrivalTimeWindow() { return arrivalTimeWindow; }
    public void setArrivalTimeWindow(String arrivalTimeWindow) { this.arrivalTimeWindow = arrivalTimeWindow; }

    public Integer getMaxDetourMinutes() { return maxDetourMinutes; }
    public void setMaxDetourMinutes(Integer maxDetourMinutes) { this.maxDetourMinutes = maxDetourMinutes; }

    public Boolean getEvOnly() { return evOnly; }
    public void setEvOnly(Boolean evOnly) { this.evOnly = evOnly; }

    public Boolean getQuietRide() { return quietRide; }
    public void setQuietRide(Boolean quietRide) { this.quietRide = quietRide; }

    public Boolean getWomenOnly() { return womenOnly; }
    public void setWomenOnly(Boolean womenOnly) { this.womenOnly = womenOnly; }
}
