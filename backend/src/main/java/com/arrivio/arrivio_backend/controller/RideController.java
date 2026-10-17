package com.arrivio.arrivio_backend.controller;

import com.arrivio.arrivio_backend.dto.MatchRequest;
import com.arrivio.arrivio_backend.dto.MatchResultDto;
import com.arrivio.arrivio_backend.model.Ride;
import com.arrivio.arrivio_backend.service.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "*")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @GetMapping
    public List<Ride> getAllRides(@RequestParam(required = false) String hubId) {
        if (hubId != null && !hubId.isEmpty()) {
            return rideService.getRidesByHub(hubId);
        }
        return rideService.getAllRides();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ride> getRideById(@PathVariable String id) {
        return rideService.getRideById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ride> createRide(@RequestBody Ride ride) {
        return ResponseEntity.ok(rideService.createRide(ride));
    }

    @PostMapping("/match")
    public ResponseEntity<List<MatchResultDto>> matchRides(@RequestBody MatchRequest request) {
        List<MatchResultDto> results = rideService.findMatches(request);
        return ResponseEntity.ok(results);
    }
}
