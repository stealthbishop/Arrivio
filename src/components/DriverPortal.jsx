import React, { useState } from 'react';
import { 
  Car, 
  PlusCircle, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  UserCheck, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function DriverPortal({
  selectedHub,
  rides,
  onAddRide,
  onAcceptPassengerRequest
}) {
  const [formData, setFormData] = useState({
    destination: selectedHub.defaultDestinations[0]?.name || 'Midtown Manhattan',
    departureTime: '15:15',
    arrivalTimeWindow: '15:00',
    totalSeats: 3,
    vehicleModel: 'Tesla Model Y',
    vehiclePlate: 'NY • AR-9021',
    isElectric: true,
    maxDetourToleranceMins: 12,
    womenOnly: false,
    silentRide: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Incoming simulated passenger requests for driver
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'req-1',
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      flight: 'DL 402 from London (LHR)',
      landingTime: '14:55',
      destination: 'Long Island City (Queens Plaza)',
      detourMinutes: 4,
      offerFare: 19.50,
      luggage: '1 Carry-on',
      rating: 4.98
    },
    {
      id: 'req-2',
      name: 'Jordan Bell',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      flight: 'AA 198 from Los Angeles (LAX)',
      landingTime: '15:05',
      destination: 'Gramercy Park, Manhattan',
      detourMinutes: 6,
      offerFare: 22.00,
      luggage: '2 Checked Bags',
      rating: 4.92
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRide = {
      id: `ride-${Date.now()}`,
      hubId: selectedHub.id,
      driver: {
        name: 'Alex Morgan (You)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        rating: 5.0,
        totalRides: 48,
        isVerified: true,
        bio: 'Daily commuter offering seats along the airport corridor.',
        phone: '+1 (555) 441-9988',
      },
      vehicle: {
        model: formData.vehicleModel,
        color: 'Space Gray',
        plate: formData.vehiclePlate,
        electric: formData.isElectric,
        luggageCapacity: '3 Suitcases',
      },
      origin: {
        name: `${selectedHub.name} (Pick-up Hub)`,
        coords: selectedHub.coords,
      },
      primaryDestination: {
        name: formData.destination,
        coords: [selectedHub.coords[0] + 0.08, selectedHub.coords[1] - 0.14],
      },
      arrivalTimeWindow: formData.arrivalTimeWindow,
      departureTime: formData.departureTime,
      totalSeats: Number(formData.totalSeats),
      bookedSeats: 0,
      existingPassengers: [],
      baseSoloCost: 55.00,
      currentSharedFarePerSeat: 18.50,
      maxDetourToleranceMins: Number(formData.maxDetourToleranceMins),
      preferences: {
        womenOnly: formData.womenOnly,
        silentRide: formData.silentRide,
        petsAllowed: false,
        luggagePerPerson: 1,
      },
      corridor: [
        selectedHub.coords,
        [selectedHub.coords[0] + 0.04, selectedHub.coords[1] - 0.06],
        [selectedHub.coords[0] + 0.08, selectedHub.coords[1] - 0.14],
      ],
    };

    onAddRide(newRide);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const handleAcceptRequest = (reqId) => {
    const accepted = pendingRequests.find(r => r.id === reqId);
    if (!accepted) return;
    setPendingRequests(prev => prev.filter(r => r.id !== reqId));
    if (onAcceptPassengerRequest) {
      onAcceptPassengerRequest(accepted);
    }
  };

  return (
    <div className="driver-portal-container animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '30px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(20, 24, 44, 0.95) 0%, rgba(14, 20, 36, 0.9) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-indigo">
                <Car size={13} /> CAR OWNER & DRIVER PORTAL
              </span>
              <span className="badge badge-emerald">
                <ShieldCheck size={13} /> VERIFIED COMMUTER
              </span>
            </div>
            <h2 style={{ fontSize: '2.1rem', marginBottom: '8px' }}>
              Share Your Commute & Offset Fuel Costs
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '0.96rem' }}>
              Driving from <strong>{selectedHub.name}</strong> anyway? Offer available empty seats to verified travelers heading your direction and earn up to $45 per trip while reducing highway congestion.
            </p>
          </div>

          {/* Monthly Stats */}
          <div style={{
            display: 'flex',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Commute Offset Earned</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--teal-primary)' }}>$384.50</div>
              <div style={{ fontSize: '0.72rem', color: '#06D6A0' }}>+18 rides shared</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Community Rating</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFB703' }}>★ 5.0</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Top Rated Driver</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 480px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Post a Ride Form */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={18} color="var(--teal-primary)" />
            <span>List an Upcoming Commute</span>
          </h3>

          {formSubmitted && (
            <div style={{
              background: 'rgba(6, 214, 160, 0.15)',
              border: '1px solid rgba(6, 214, 160, 0.35)',
              color: '#06D6A0',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                Ride successfully listed! Matching with landing passengers now.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Origin Hub */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Pickup Transit Hub
              </label>
              <input
                type="text"
                disabled
                value={`${selectedHub.name} (${selectedHub.terminal})`}
                className="input-field"
                style={{ opacity: 0.7, cursor: 'not-allowed' }}
              />
            </div>

            {/* Destination */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Final Destination Corridor
              </label>
              <select
                id="driver-dest-select"
                value={formData.destination}
                onChange={(e) => setFormData(f => ({ ...f, destination: e.target.value }))}
                className="input-field"
                style={{ cursor: 'pointer' }}
              >
                {selectedHub.defaultDestinations.map((d, i) => (
                  <option key={i} value={d.name} style={{ background: '#0D1322' }}>
                    {d.name} ({d.distanceKm} km)
                  </option>
                ))}
              </select>
            </div>

            {/* Time windows */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Target Arrival at Hub
                </label>
                <input
                  id="driver-arrival-time"
                  type="time"
                  value={formData.arrivalTimeWindow}
                  onChange={(e) => setFormData(f => ({ ...f, arrivalTimeWindow: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Departure Time
                </label>
                <input
                  id="driver-departure-time"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => setFormData(f => ({ ...f, departureTime: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>

            {/* Vehicle & Seats */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Vehicle Make & Model
                </label>
                <input
                  id="driver-vehicle-input"
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData(f => ({ ...f, vehicleModel: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Empty Seats
                </label>
                <select
                  id="driver-seats-select"
                  value={formData.totalSeats}
                  onChange={(e) => setFormData(f => ({ ...f, totalSeats: e.target.value }))}
                  className="input-field"
                >
                  <option value="1">1 Seat</option>
                  <option value="2">2 Seats</option>
                  <option value="3">3 Seats</option>
                  <option value="4">4 Seats</option>
                </select>
              </div>
            </div>

            {/* Detour tolerance */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Maximum Detour Tolerance</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                  +{formData.maxDetourToleranceMins} mins
                </span>
              </div>
              <input
                id="driver-detour-slider"
                type="range"
                min="5"
                max="25"
                value={formData.maxDetourToleranceMins}
                onChange={(e) => setFormData(f => ({ ...f, maxDetourToleranceMins: e.target.value }))}
                className="range-slider"
              />
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
                <input
                  id="driver-women-only-toggle"
                  type="checkbox"
                  checked={formData.womenOnly}
                  onChange={(e) => setFormData(f => ({ ...f, womenOnly: e.target.checked }))}
                  style={{ accentColor: '#FF4D6D', cursor: 'pointer' }}
                />
                <span>Women-Only Carpool Group</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
                <input
                  id="driver-ev-toggle"
                  type="checkbox"
                  checked={formData.isElectric}
                  onChange={(e) => setFormData(f => ({ ...f, isElectric: e.target.checked }))}
                  style={{ accentColor: '#00F5D4', cursor: 'pointer' }}
                />
                <span>Electric / Hybrid Vehicle</span>
              </label>
            </div>

            <button
              id="submit-driver-ride-btn"
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px', padding: '12px' }}
            >
              <span>Publish Ride & Start Matching</span>
            </button>
          </form>
        </div>

        {/* Incoming Matched Passenger Requests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>
                Incoming Passenger Match Requests ({pendingRequests.length})
              </h3>
              <span className="badge badge-teal">Auto-Matched by Corridor</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Travelers arriving within your time window and heading to points along your driving path:
            </p>

            {pendingRequests.length === 0 ? (
              <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
                <UserCheck size={36} color="#06D6A0" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>All requests reviewed!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                  Your carpool schedule is active. We'll alert you as soon as new passengers request seats.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    id={`passenger-request-${req.id}`}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={req.avatar}
                        alt={req.name}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '1.05rem', margin: 0 }}>{req.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: '#FFB703' }}>★ {req.rating}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--teal-primary)', marginTop: '2px' }}>
                          {req.flight} • Lands at {req.landingTime}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Dropoff: <strong>{req.destination}</strong> ({req.luggage})
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                          +${req.offerFare.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#A5B4FC' }}>
                          +{req.detourMinutes} min detour
                        </div>
                      </div>

                      <button
                        id={`accept-passenger-btn-${req.id}`}
                        className="btn btn-primary"
                        onClick={() => handleAcceptRequest(req.id)}
                        style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                      >
                        <UserCheck size={16} />
                        <span>Accept & Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Corridor Rides currently hosted */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
              Your Active Listed Rides ({rides.filter(r => r.driver.name.includes('Alex')).length})
            </h4>

            {rides.filter(r => r.driver.name.includes('Alex')).length === 0 ? (
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                No active rides hosted by you yet. Fill out the form above to post your first commute!
              </div>
            ) : (
              rides.filter(r => r.driver.name.includes('Alex')).map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                      {r.origin.name} → {r.primaryDestination.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Departs {r.departureTime} • {r.vehicle.model} • {r.totalSeats - r.bookedSeats} seats open
                    </div>
                  </div>
                  <span className="badge badge-teal">LIVE ON HUB</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
