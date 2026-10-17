package com.arrivio.arrivio_backend.service;

import com.arrivio.arrivio_backend.model.Booking;
import com.arrivio.arrivio_backend.model.Ride;
import com.arrivio.arrivio_backend.repository.BookingRepository;
import com.arrivio.arrivio_backend.repository.RideRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final Random random = new Random();

    public BookingService(BookingRepository bookingRepository, RideRepository rideRepository) {
        this.bookingRepository = bookingRepository;
        this.rideRepository = rideRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    @Transactional
    public Booking createBooking(Booking booking) {
        if (booking.getId() == null || booking.getId().isEmpty()) {
            booking.setId("AR-" + (100000 + random.nextInt(900000)));
        }
        if (booking.getPinCode() == 0) {
            booking.setPinCode(1000 + random.nextInt(9000));
        }
        if (booking.getStatus() == null) {
            booking.setStatus("Confirmed • En Route");
        }

        // Increment booked seat count in ride
        if (booking.getRideId() != null) {
            rideRepository.findById(booking.getRideId()).ifPresent(ride -> {
                if (ride.getAvailableSeats() > 0) {
                    ride.setBookedSeats(ride.getBookedSeats() + 1);
                    rideRepository.save(ride);
                }
            });
        }

        return bookingRepository.save(booking);
    }

    @Transactional
    public boolean cancelBooking(String id) {
        Optional<Booking> opt = bookingRepository.findById(id);
        if (opt.isPresent()) {
            Booking booking = opt.get();
            if (booking.getRideId() != null) {
                rideRepository.findById(booking.getRideId()).ifPresent(ride -> {
                    ride.setBookedSeats(Math.max(0, ride.getBookedSeats() - 1));
                    rideRepository.save(ride);
                });
            }
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean verifyPin(String bookingId, int pin) {
        Optional<Booking> opt = bookingRepository.findById(bookingId);
        if (opt.isPresent()) {
            Booking b = opt.get();
            if (b.getPinCode() == pin) {
                b.setStatus("Boarded • In Transit");
                bookingRepository.save(b);
                return true;
            }
        }
        return false;
    }
}
