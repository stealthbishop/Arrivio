package com.arrivio.arrivio_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transit_hubs")
public class TransitHub {

    @Id
    private String id;
    private String name;
    private String city;
    private String code;
    private String terminal;
    private double latitude;
    private double longitude;

    public TransitHub() {}

    public TransitHub(String id, String name, String city, String code, String terminal, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.code = code;
        this.terminal = terminal;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTerminal() { return terminal; }
    public void setTerminal(String terminal) { this.terminal = terminal; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}
