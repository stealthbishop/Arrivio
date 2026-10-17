// Intelligent Route and Arrival-Time Matching Engine for Arrivio

/**
 * Calculates Haversine distance between two [lat, lng] coordinates in kilometers.
 */
export function calculateDistanceKm(coord1, coord2) {
  if (!coord1 || !coord2) return 0;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

/**
 * Parses "HH:MM" into minutes from start of day.
 */
export function timeStringToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

/**
 * Calculates time difference in minutes between two "HH:MM" strings.
 */
export function getTimeDifferenceMinutes(timeA, timeB) {
  const minA = timeStringToMinutes(timeA);
  const minB = timeStringToMinutes(timeB);
  return Math.abs(minA - minB);
}

/**
 * Calculates detour metrics for a driver picking up or dropping off an extra passenger.
 * @param {Array} originCoords [lat, lng]
 * @param {Array} driverDestCoords [lat, lng]
 * @param {Array} passengerDestCoords [lat, lng]
 */
export function calculateDetour(originCoords, driverDestCoords, passengerDestCoords) {
  const directDist = calculateDistanceKm(originCoords, driverDestCoords);
  const leg1 = calculateDistanceKm(originCoords, passengerDestCoords);
  const leg2 = calculateDistanceKm(passengerDestCoords, driverDestCoords);
  const sharedDist = leg1 + leg2;

  const detourKm = Math.max(0, sharedDist - directDist);
  // Average urban commute speed: 32 km/h => ~1.875 mins per km
  const detourMinutes = Math.round(detourKm * 1.85);

  return {
    directDistKm: parseFloat(directDist.toFixed(1)),
    sharedDistKm: parseFloat(sharedDist.toFixed(1)),
    detourKm: parseFloat(detourKm.toFixed(1)),
    detourMinutes: Math.max(2, detourMinutes),
  };
}

/**
 * Matches candidate rides against passenger request criteria.
 */
export function matchRides({
  rides,
  hubId,
  passengerDestinationCoords,
  passengerArrivalTime,
  maxDetourMinutes = 15,
  filters = {},
}) {
  return rides
    .filter((ride) => {
      // Must match hub
      if (ride.hubId !== hubId) return false;
      // Must have at least 1 open seat
      const availableSeats = ride.totalSeats - ride.bookedSeats;
      if (availableSeats <= 0) return false;

      // Filter: Women Only
      if (filters.womenOnly && !ride.preferences.womenOnly) return false;
      // Filter: Electric Vehicle Only
      if (filters.electricOnly && !ride.vehicle.electric) return false;
      // Filter: Silent Ride
      if (filters.silentRide && !ride.preferences.silentRide) return false;

      return true;
    })
    .map((ride) => {
      // 1. Time Alignment Score (0 - 100)
      const timeDiffMins = getTimeDifferenceMinutes(
        passengerArrivalTime,
        ride.arrivalTimeWindow
      );
      let timeScore = 100;
      if (timeDiffMins > 0) {
        timeScore = Math.max(20, 100 - timeDiffMins * 2.8);
      }

      // 2. Detour Score
      const detour = calculateDetour(
        ride.origin.coords,
        ride.primaryDestination.coords,
        passengerDestinationCoords || ride.primaryDestination.coords
      );

      let detourScore = 100;
      if (detour.detourMinutes > ride.maxDetourToleranceMins) {
        detourScore = Math.max(10, 100 - (detour.detourMinutes - ride.maxDetourToleranceMins) * 8);
      } else {
        detourScore = Math.max(50, 100 - detour.detourMinutes * 3.5);
      }

      // 3. Proximity of Destination to Primary Destination
      const destProximityKm = calculateDistanceKm(
        ride.primaryDestination.coords,
        passengerDestinationCoords || ride.primaryDestination.coords
      );
      const proximityScore = Math.max(20, 100 - destProximityKm * 4);

      // Composite Weighted Match Score
      const matchScore = Math.round(
        timeScore * 0.40 + detourScore * 0.40 + proximityScore * 0.20
      );

      const availableSeats = ride.totalSeats - ride.bookedSeats;

      return {
        ...ride,
        availableSeats,
        timeDiffMins,
        detour,
        destProximityKm,
        matchScore: Math.min(99, Math.max(45, matchScore)),
        isDetourAcceptable: detour.detourMinutes <= ride.maxDetourToleranceMins,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
