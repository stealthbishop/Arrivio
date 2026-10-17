package com.arrivio.arrivio_backend.controller;

import com.arrivio.arrivio_backend.model.Booking;
import com.arrivio.arrivio_backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> cancelBooking(@PathVariable String id) {
        boolean success = bookingService.cancelBooking(id);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully", "id", id));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<Map<String, Object>> verifyPin(@PathVariable String id, @RequestBody Map<String, Integer> payload) {
        Integer pin = payload.get("pin");
        if (pin == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "PIN is required"));
        }
        boolean verified = bookingService.verifyPin(id, pin);
        if (verified) {
            return ResponseEntity.ok(Map.of("success", true, "message", "PIN verified! Passenger boarded."));
        }
        return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Invalid verification PIN"));
    }
}
