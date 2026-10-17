package com.arrivio.arrivio_backend.repository;

import com.arrivio.arrivio_backend.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, String> {
    List<Ride> findByHubId(String hubId);
}
