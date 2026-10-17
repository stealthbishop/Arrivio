// Arrivio Spring Boot Backend API Client
// Use relative URLs so this works in both dev (Vite proxy) and production (Spring Boot static serving)
const API_BASE_URL = '/api';

export async function fetchMatchesFromBackend(requestPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/rides/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend match API offline or unreachable, using client mock engine:', err);
    return null;
  }
}

export async function createBookingOnBackend(bookingPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend booking API offline, saving to local store:', err);
    return null;
  }
}

export async function fetchTelemetryFromBackend() {
  try {
    const res = await fetch(`${API_BASE_URL}/telemetry`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function calculateFareOnBackend(distanceKm, passengerCount, isElectric, tollAmount = 6.50) {
  try {
    const url = `${API_BASE_URL}/fares/calculate?distanceKm=${distanceKm}&passengerCount=${passengerCount}&isElectric=${isElectric}&tollAmount=${tollAmount}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}
