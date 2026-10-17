package com.arrivio.arrivio_backend.repository;

import com.arrivio.arrivio_backend.model.TransitHub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransitHubRepository extends JpaRepository<TransitHub, String> {
    Optional<TransitHub> findByCodeIgnoreCase(String code);
}
