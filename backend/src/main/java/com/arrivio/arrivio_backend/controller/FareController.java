package com.arrivio.arrivio_backend.controller;

import com.arrivio.arrivio_backend.dto.FareBreakdownDto;
import com.arrivio.arrivio_backend.service.FareCalculatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fares")
@CrossOrigin(origins = "*")
public class FareController {

    private final FareCalculatorService fareCalculatorService;

    public FareController(FareCalculatorService fareCalculatorService) {
        this.fareCalculatorService = fareCalculatorService;
    }

    @GetMapping("/calculate")
    public ResponseEntity<FareBreakdownDto> calculateFare(
            @RequestParam(defaultValue = "28.0") double distanceKm,
            @RequestParam(defaultValue = "3") int passengerCount,
            @RequestParam(defaultValue = "1.35") double fuelPrice,
            @RequestParam(defaultValue = "6.50") double tollAmount,
            @RequestParam(defaultValue = "true") boolean isElectric
    ) {
        FareBreakdownDto breakdown = fareCalculatorService.calculateFare(
                distanceKm, passengerCount, fuelPrice, tollAmount, isElectric
        );
        return ResponseEntity.ok(breakdown);
    }
}
