package com.arrivio.arrivio_backend.service;

import com.arrivio.arrivio_backend.dto.MatchRequest;
import com.arrivio.arrivio_backend.dto.MatchResultDto;
import com.arrivio.arrivio_backend.model.Ride;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingEngineService {

    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Haversine formula to compute distance in km between two coordinate points
     */
    public double calculateDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    /**
     * Evaluates detour overhead for adding a waypoint
     */
    public int calculateDetourMinutes(double originLat, double originLng,
                                     double driverDestLat, double driverDestLng,
                                     double passDestLat, double passDestLng) {
        double directKm = calculateDistanceKm(originLat, originLng, driverDestLat, driverDestLng);
        double leg1Km = calculateDistanceKm(originLat, originLng, passDestLat, passDestLng);
        double leg2Km = calculateDistanceKm(passDestLat, passDestLng, driverDestLat, driverDestLng);
        double detourKm = Math.max(0.0, (leg1Km + leg2Km) - directKm);

        // Average corridor commute speed ~ 32 km/h => ~1.85 mins/km
        return (int) Math.max(2, Math.round(detourKm * 1.85));
    }

    /**
     * Matches and ranks rides according to corridor parameters
     */
    public List<MatchResultDto> matchRides(List<Ride> rides, MatchRequest req) {
        int maxDetour = (req.getMaxDetourMinutes() != null) ? req.getMaxDetourMinutes() : 15;
        double passDestLat = (req.getDestinationLat() != null) ? req.getDestinationLat() : 37.3861;
        double passDestLng = (req.getDestinationLng() != null) ? req.getDestinationLng() : -122.0839;

        return rides.stream()
                .filter(ride -> ride.getAvailableSeats() > 0)
                .filter(ride -> {
                    if (Boolean.TRUE.equals(req.getEvOnly()) && !ride.isElectric()) return false;
                    if (Boolean.TRUE.equals(req.getQuietRide()) && !ride.isSilentRide()) return false;
                    if (Boolean.TRUE.equals(req.getWomenOnly()) && !ride.isWomenOnly()) return false;
                    return true;
                })
                .map(ride -> {
                    int detourMins = calculateDetourMinutes(
                            ride.getOriginLat(), ride.getOriginLng(),
                            ride.getDestinationLat(), ride.getDestinationLng(),
                            passDestLat, passDestLng
                    );

                    // Composite Match Percentage
                    int detourPenalty = Math.min(40, detourMins * 2);
                    int scorePct = Math.max(65, 100 - detourPenalty);

                    MatchResultDto dto = new MatchResultDto();
                    dto.setId(ride.getId());
                    dto.setScore(scorePct + "% ROUTE MATCH");
                    dto.setScorePercentage(scorePct);
                    dto.setDetour(detourMins <= 5 ? "5 min detour only" : detourMins + " min detour");
                    dto.setDetourMinutes(detourMins);

                    dto.setDriverName(ride.getDriverName());
                    dto.setDriverAvatar(ride.getDriverAvatar());
                    dto.setDriverCar(ride.getVehicleModel() + " • " + ride.getDriverRating() + " ★ (" + ride.getDriverTotalRides() + " rides)");
                    dto.setDriverRating(ride.getDriverRating());
                    dto.setDriverTotalRides(ride.getDriverTotalRides());
                    dto.setVerified(ride.isVerified());

                    dto.setSeatsTotal(ride.getTotalSeats());
                    dto.setSeatsAvailable(ride.getAvailableSeats());

                    dto.setPickupTime(ride.getDepartureTime());
                    dto.setPickupLocation("Pickup (" + ride.getOriginName().split(",")[0] + ")");
                    dto.setDropoffTime("08:52 AM");
                    dto.setDropoffLocation("Gate B");

                    double sharedPrice = ride.getCurrentSharedFarePerSeat();
                    double soloPrice = ride.getBaseSoloCost();
                    dto.setNumericPrice(sharedPrice);
                    dto.setPrice(String.format("$%.2f", sharedPrice));
                    dto.setNumericSoloPrice(soloPrice);
                    dto.setSoloPrice(String.format("$%.2f solo", soloPrice));

                    double co2Saved = 2.8;
                    dto.setCo2SavedKg(co2Saved);
                    dto.setCo2Offset(String.format("-%.1f kg CO₂ offset", co2Saved));
                    dto.setCorridorJson(ride.getCorridorJson());

                    return dto;
                })
                .filter(dto -> dto.getDetourMinutes() <= maxDetour + 5)
                .sorted(Comparator.comparingInt(MatchResultDto::getScorePercentage).reversed())
                .collect(Collectors.toList());
    }
}
