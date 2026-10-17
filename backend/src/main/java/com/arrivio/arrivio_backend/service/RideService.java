package com.arrivio.arrivio_backend.service;

import com.arrivio.arrivio_backend.dto.MatchRequest;
import com.arrivio.arrivio_backend.dto.MatchResultDto;
import com.arrivio.arrivio_backend.model.Ride;
import com.arrivio.arrivio_backend.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final MatchingEngineService matchingEngineService;

    public RideService(RideRepository rideRepository, MatchingEngineService matchingEngineService) {
        this.rideRepository = rideRepository;
        this.matchingEngineService = matchingEngineService;
    }

    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }

    public List<Ride> getRidesByHub(String hubId) {
        return rideRepository.findByHubId(hubId);
    }

    public Optional<Ride> getRideById(String id) {
        return rideRepository.findById(id);
    }

    public Ride createRide(Ride ride) {
        if (ride.getId() == null || ride.getId().isEmpty()) {
            ride.setId("ride-" + System.currentTimeMillis());
        }
        return rideRepository.save(ride);
    }

    public List<MatchResultDto> findMatches(MatchRequest request) {
        List<Ride> rides = rideRepository.findAll();
        return matchingEngineService.matchRides(rides, request);
    }
}
