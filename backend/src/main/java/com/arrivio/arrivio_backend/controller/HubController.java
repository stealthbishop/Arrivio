package com.arrivio.arrivio_backend.controller;

import com.arrivio.arrivio_backend.model.TransitHub;
import com.arrivio.arrivio_backend.repository.TransitHubRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hubs")
@CrossOrigin(origins = "*")
public class HubController {

    private final TransitHubRepository transitHubRepository;

    public HubController(TransitHubRepository transitHubRepository) {
        this.transitHubRepository = transitHubRepository;
    }

    @GetMapping
    public List<TransitHub> getAllHubs() {
        return transitHubRepository.findAll();
    }
}
