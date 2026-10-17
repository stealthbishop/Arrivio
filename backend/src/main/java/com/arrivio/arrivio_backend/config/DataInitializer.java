package com.arrivio.arrivio_backend.config;

import com.arrivio.arrivio_backend.model.Booking;
import com.arrivio.arrivio_backend.model.PassengerRequest;
import com.arrivio.arrivio_backend.model.Ride;
import com.arrivio.arrivio_backend.model.TransitHub;
import com.arrivio.arrivio_backend.repository.BookingRepository;
import com.arrivio.arrivio_backend.repository.PassengerRequestRepository;
import com.arrivio.arrivio_backend.repository.RideRepository;
import com.arrivio.arrivio_backend.repository.TransitHubRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TransitHubRepository transitHubRepository;
    private final RideRepository rideRepository;
    private final BookingRepository bookingRepository;
    private final PassengerRequestRepository passengerRequestRepository;

    public DataInitializer(TransitHubRepository transitHubRepository,
                           RideRepository rideRepository,
                           BookingRepository bookingRepository,
                           PassengerRequestRepository passengerRequestRepository) {
        this.transitHubRepository = transitHubRepository;
        this.rideRepository = rideRepository;
        this.bookingRepository = bookingRepository;
        this.passengerRequestRepository = passengerRequestRepository;
    }

    @Override
    public void run(String... args) {
        // Only seed if the database is empty (avoid duplicate-key errors on restart)
        if (transitHubRepository.count() > 0) {
            return;
        }

        // Seed Transit Hubs
        TransitHub cpHub = new TransitHub("hub-delhi-cp", "Connaught Place & Central Delhi", "Delhi NCR, India", "DEL-CP", "Inner Circle Gate 4", 28.6315, 77.2167);
        TransitHub cyberHub = new TransitHub("hub-delhi-cyber", "DLF Cyber City & Cyber Hub", "Gurugram, Haryana", "GGN-CYBER", "Building 10 / Gateway Tower", 28.4950, 77.0895);
        TransitHub igiHub = new TransitHub("hub-delhi-igi", "Indira Gandhi International Airport", "New Delhi, India", "DEL-T3", "Terminal 3 Pillar 14", 28.5562, 77.0999);
        TransitHub noidaHub = new TransitHub("hub-delhi-noida", "Noida Sector 62 IT Corridor", "Noida, UP", "NOIDA-62", "Electronic City Metro Gate 1", 28.6280, 77.3649);

        transitHubRepository.save(cpHub);
        transitHubRepository.save(cyberHub);
        transitHubRepository.save(igiHub);
        transitHubRepository.save(noidaHub);

        // Seed Elena Rostova's Ride (Tata Nexon EV on NH-48 Delhi-Gurgaon corridor)
        Ride ride1 = new Ride();
        ride1.setId("match-1");
        ride1.setHubId("hub-delhi-cp");
        ride1.setDriverName("Elena Rostova");
        ride1.setDriverAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80");
        ride1.setDriverRating(4.97);
        ride1.setDriverTotalRides(184);
        ride1.setVerified(true);
        ride1.setVehicleModel("Tata Nexon EV (Fleet #DEL-48)");
        ride1.setVehiclePlate("DL • 01 EV 9821");
        ride1.setElectric(true);
        ride1.setOriginName("Connaught Place (Inner Circle Gate 4)");
        ride1.setOriginLat(28.6315);
        ride1.setOriginLng(77.2167);
        ride1.setDestinationName("DLF Cyber Hub Gate 2, Gurugram");
        ride1.setDestinationLat(28.4950);
        ride1.setDestinationLng(77.0895);
        ride1.setDepartureTime("08:20 AM");
        ride1.setArrivalTimeWindow("08:45 AM – 09:00 AM");
        ride1.setTotalSeats(4);
        ride1.setBookedSeats(2);
        ride1.setBaseSoloCost(520.00);
        ride1.setCurrentSharedFarePerSeat(120.00);
        ride1.setMaxDetourToleranceMins(4);
        ride1.setWomenOnly(false);
        ride1.setSilentRide(true);
        ride1.setCorridorJson("[[28.6315, 77.2167], [28.5921, 77.1617], [28.5600, 77.1250], [28.4950, 77.0895]]");
        rideRepository.save(ride1);

        // Seed Marcus Thorne's Ride (Hyundai Ioniq 5)
        Ride ride2 = new Ride();
        ride2.setId("match-2");
        ride2.setHubId("hub-delhi-cp");
        ride2.setDriverName("Marcus Thorne");
        ride2.setDriverAvatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80");
        ride2.setDriverRating(4.95);
        ride2.setDriverTotalRides(240);
        ride2.setVerified(true);
        ride2.setVehicleModel("Hyundai Ioniq 5 (EV)");
        ride2.setVehiclePlate("DL • 03 EV 2210");
        ride2.setElectric(true);
        ride2.setOriginName("Dhaula Kuan Interchange");
        ride2.setOriginLat(28.5921);
        ride2.setOriginLng(77.1617);
        ride2.setDestinationName("Cyber City DLF Phase 2");
        ride2.setDestinationLat(28.4950);
        ride2.setDestinationLng(77.0895);
        ride2.setDepartureTime("08:30 AM");
        ride2.setArrivalTimeWindow("08:45 AM – 09:00 AM");
        ride2.setTotalSeats(3);
        ride2.setBookedSeats(2);
        ride2.setBaseSoloCost(580.00);
        ride2.setCurrentSharedFarePerSeat(140.00);
        ride2.setMaxDetourToleranceMins(5);
        ride2.setWomenOnly(false);
        ride2.setSilentRide(false);
        ride2.setCorridorJson("[[28.5921, 77.1617], [28.5350, 77.1000], [28.4950, 77.0895]]");
        rideRepository.save(ride2);

        // Seed Aisha Robinson's Ride (Women-Only Pool)
        Ride ride3 = new Ride();
        ride3.setId("match-3");
        ride3.setHubId("hub-delhi-cp");
        ride3.setDriverName("Aisha Robinson");
        ride3.setDriverAvatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80");
        ride3.setDriverRating(4.98);
        ride3.setDriverTotalRides(312);
        ride3.setVerified(true);
        ride3.setVehicleModel("Honda City e:HEV Hybrid");
        ride3.setVehiclePlate("DL • 08 AB 4911");
        ride3.setElectric(false);
        ride3.setOriginName("Hauz Khas Metro Station");
        ride3.setOriginLat(28.5494);
        ride3.setOriginLng(77.2001);
        ride3.setDestinationName("Cyber Hub Building 10");
        ride3.setDestinationLat(28.4950);
        ride3.setDestinationLng(77.0895);
        ride3.setDepartureTime("08:15 AM");
        ride3.setArrivalTimeWindow("08:45 AM – 09:00 AM");
        ride3.setTotalSeats(3);
        ride3.setBookedSeats(1);
        ride3.setBaseSoloCost(540.00);
        ride3.setCurrentSharedFarePerSeat(130.00);
        ride3.setMaxDetourToleranceMins(4);
        ride3.setWomenOnly(true);
        ride3.setSilentRide(true);
        ride3.setCorridorJson("[[28.5494, 77.2001], [28.5080, 77.0850], [28.4950, 77.0895]]");
        rideRepository.save(ride3);

        // Seed Active Booking in Delhi
        Booking initialBooking = new Booking(
                "AR-DEL-839102",
                "match-1",
                "Alex Morgan",
                "Rear Left",
                "Connaught Place Gate 4 Pickup Bay",
                "DLF Cyber Hub Gate 2, Gurugram",
                "08:20 AM",
                "08:52 AM",
                120.00,
                4892,
                "Active • Driver 3m Away (NH-48)"
        );
        bookingRepository.save(initialBooking);

        // Seed Passenger Match Requests
        passengerRequestRepository.save(new PassengerRequest(
                "req-101",
                "Priya Sharma",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120",
                "Commuter Batch #402 (Gurgaon Hub)",
                "08:15 AM",
                "Connaught Place Radial 3",
                4,
                120.00,
                "1 Laptop Bag",
                4.98,
                "PENDING"
        ));
    }
}
