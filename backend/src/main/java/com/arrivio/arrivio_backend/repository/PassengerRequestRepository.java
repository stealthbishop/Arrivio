package com.arrivio.arrivio_backend.repository;

import com.arrivio.arrivio_backend.model.PassengerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassengerRequestRepository extends JpaRepository<PassengerRequest, String> {
    List<PassengerRequest> findByStatus(String status);
}
