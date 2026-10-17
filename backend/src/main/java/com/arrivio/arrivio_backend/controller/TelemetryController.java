package com.arrivio.arrivio_backend.controller;

import com.arrivio.arrivio_backend.dto.TelemetryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/telemetry")
@CrossOrigin(origins = "*")
public class TelemetryController {

    @GetMapping
    public ResponseEntity<TelemetryDto> getTelemetry() {
        TelemetryDto telemetry = new TelemetryDto(
                "DELHI-NCR: NH-48 & DND CORRIDOR",
                96.4,
                2.8,
                412.0,
                14,
                "+22 km/h over solo cab in rush hour"
        );
        return ResponseEntity.ok(telemetry);
    }
}
