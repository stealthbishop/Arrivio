import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Zap, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  TrendingDown,
  Car,
  Briefcase,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { matchRides } from '../utils/matchingEngine';
import { UPCOMING_TRANSIT_ARRIVALS } from '../data/mockData';

export default function SmartMatcher({
  selectedHub,
  rides,
  onSelectRideForBooking,
  onPreviewRideOnMap,
  onNavigateToTab
}) {
  const [destinationQuery, setDestinationQuery] = useState(selectedHub.defaultDestinations[0]?.name || '');
  const [targetArrivalTime, setTargetArrivalTime] = useState('14:30');
  const [maxDetourMinutes, setMaxDetourMinutes] = useState(15);
  const [filters, setFilters] = useState({
    womenOnly: false,
    electricOnly: false,
    silentRide: false,
  });

  // Active hub arrival status
  const hubArrivals = useMemo(() => {
    return UPCOMING_TRANSIT_ARRIVALS.filter(a => a.hubId === selectedHub.id);
  }, [selectedHub]);

  // Find coords for chosen destination
  const activeDestinationObj = useMemo(() => {
    return selectedHub.defaultDestinations.find(
      d => d.name.toLowerCase() === destinationQuery.toLowerCase()
    ) || {
      name: destinationQuery,
      coords: [selectedHub.coords[0] + 0.08, selectedHub.coords[1] - 0.15],
      distanceKm: 26
    };
  }, [selectedHub, destinationQuery]);

  // Perform smart matching
  const matchedRides = useMemo(() => {
    return matchRides({
      rides,
      hubId: selectedHub.id,
      passengerDestinationCoords: activeDestinationObj.coords,
      passengerArrivalTime: targetArrivalTime,
      maxDetourMinutes,
      filters,
    });
  }, [rides, selectedHub, activeDestinationObj, targetArrivalTime, maxDetourMinutes, filters]);

  return (
    <div className="matcher-container animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Hero Banner */}
      <div className="glass-panel" style={{
        padding: '32px 36px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(16, 24, 40, 0.95) 0%, rgba(13, 20, 36, 0.88) 100%)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(0, 245, 212, 0.15)'
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="badge badge-teal">
                <Sparkles size={13} /> AI MATCHING ENGINE ACTIVE
              </span>
              <span className="badge badge-indigo">
                <Clock size={13} /> ±15 MIN ARRIVAL SYNC
              </span>
            </div>
            <h1 style={{ fontSize: '2.4rem', lineHeight: 1.15, marginBottom: '14px' }}>
              Shared Rides Synchronized by <span style={{ color: 'var(--teal-primary)' }}>Arrival Time</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.5 }}>
              Arriving at <strong>{selectedHub.name}</strong>? Pair up with travelers landing at the same time and headed along your route corridor. Save up to 70% vs solo airport cabs.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div style={{
            display: 'flex',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Rider Saving</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--teal-primary)' }}>64%</div>
              <div style={{ fontSize: '0.72rem', color: '#06D6A0' }}>~$31 per trip</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carbon Prevented</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#A5B4FC' }}>8.6 kg</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>CO₂ per shared pool</div>
            </div>
          </div>
        </div>

        {/* Live Incoming Flights / Arrivals Ticker */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="live-pulse"></span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              LIVE ARRIVAL CLUSTERS AT {selectedHub.code}:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
            {hubArrivals.map((arrival, idx) => (
              <div 
                key={idx}
                onClick={() => setTargetArrivalTime(arrival.scheduledArrival)}
                style={{
                  minWidth: '240px',
                  background: targetArrivalTime === arrival.scheduledArrival ? 'rgba(0, 245, 212, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                  border: targetArrivalTime === arrival.scheduledArrival ? '1px solid var(--teal-primary)' : '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>{arrival.flightNumber}</span>
                  <span className="badge badge-teal" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>{arrival.scheduledArrival}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{arrival.originCity}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--teal-primary)' }}>{arrival.status}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>👥 {arrival.passengersLookingForPool} poolers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Search & Match Controls on Left, Ride Matches on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 380px) 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Controls Card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <SlidersHorizontal size={18} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.15rem' }}>Match Preferences</h3>
          </div>

          {/* Destination Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Where are you heading?
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} color="var(--teal-primary)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                id="search-destination-input"
                type="text"
                className="input-field"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                placeholder="Enter neighborhood or address"
                style={{ paddingLeft: '42px' }}
              />
            </div>

            {/* Quick Destination Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {selectedHub.defaultDestinations.slice(0, 4).map((dest, i) => (
                <button
                  key={i}
                  id={`quick-dest-${i}`}
                  onClick={() => setDestinationQuery(dest.name)}
                  style={{
                    background: destinationQuery === dest.name ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: destinationQuery === dest.name ? 'var(--teal-primary)' : 'var(--text-secondary)',
                    border: destinationQuery === dest.name ? '1px solid var(--teal-primary)' : '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {dest.name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Target Arrival Time Picker */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Target Arrival / Landing Time
              </label>
              <span className="badge badge-teal">{targetArrivalTime}</span>
            </div>
            <div style={{ position: 'relative' }}>
              <Clock size={18} color="var(--teal-primary)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                id="target-time-input"
                type="time"
                className="input-field"
                value={targetArrivalTime}
                onChange={(e) => setTargetArrivalTime(e.target.value)}
                style={{ paddingLeft: '42px' }}
              />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Matches rides departing within ±20 minutes of your arrival.
            </div>
          </div>

          {/* Max Detour Tolerance */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Max Detour Tolerance
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                +{maxDetourMinutes} mins
              </span>
            </div>
            <input
              id="detour-tolerance-slider"
              type="range"
              min="5"
              max="25"
              step="2"
              value={maxDetourMinutes}
              onChange={(e) => setMaxDetourMinutes(Number(e.target.value))}
              className="range-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>5m (Direct)</span>
              <span>15m (Balanced)</span>
              <span>25m (Max Savings)</span>
            </div>
          </div>

          {/* Filter Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: filters.womenOnly ? 'rgba(255, 77, 109, 0.1)' : 'transparent',
              border: filters.womenOnly ? '1px solid rgba(255, 77, 109, 0.3)' : '1px solid transparent'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                <ShieldCheck size={16} color="#FF4D6D" /> Women-Only Pool
              </span>
              <input
                id="filter-women-only"
                type="checkbox"
                checked={filters.womenOnly}
                onChange={(e) => setFilters(f => ({ ...f, womenOnly: e.target.checked }))}
                style={{ cursor: 'pointer', accentColor: '#FF4D6D' }}
              />
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: filters.electricOnly ? 'rgba(0, 245, 212, 0.1)' : 'transparent',
              border: filters.electricOnly ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid transparent'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                <Zap size={16} color="#00F5D4" /> Electric Vehicles Only
              </span>
              <input
                id="filter-electric-only"
                type="checkbox"
                checked={filters.electricOnly}
                onChange={(e) => setFilters(f => ({ ...f, electricOnly: e.target.checked }))}
                style={{ cursor: 'pointer', accentColor: '#00F5D4' }}
              />
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: filters.silentRide ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              border: filters.silentRide ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem' }}>
                <VolumeX size={16} color="#818CF8" /> Quiet / Work Commute
              </span>
              <input
                id="filter-silent-ride"
                type="checkbox"
                checked={filters.silentRide}
                onChange={(e) => setFilters(f => ({ ...f, silentRide: e.target.checked }))}
                style={{ cursor: 'pointer', accentColor: '#6366F1' }}
              />
            </label>
          </div>

          <button
            id="open-fare-calculator-btn"
            className="btn btn-secondary"
            onClick={() => onNavigateToTab('fares')}
            style={{ width: '100%', marginTop: '20px', fontSize: '0.85rem' }}
          >
            <span>Explore Transparent Fare Formulas</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Matched Ride List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>
                Available Smart Matches ({matchedRides.length})
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Clustered for {destinationQuery} around {targetArrivalTime}
              </p>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Sorted by Route Compatibility Score
            </div>
          </div>

          {matchedRides.length === 0 ? (
            <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <AlertCircle size={44} color="#FFB703" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No direct matches for these strict filters</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
                Try relaxing the detour tolerance slider or unchecking specific vehicle filters to see broader corridor pools.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMaxDetourMinutes(20);
                  setFilters({ womenOnly: false, electricOnly: false, silentRide: false });
                }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {matchedRides.map((ride, index) => {
                const soloPrice = ride.baseSoloCost;
                const sharedPrice = ride.currentSharedFarePerSeat;
                const savings = soloPrice - sharedPrice;
                const savingsPercent = Math.round((savings / soloPrice) * 100);

                return (
                  <div
                    key={ride.id}
                    id={`matched-ride-card-${ride.id}`}
                    className="glass-panel"
                    style={{
                      padding: '22px 24px',
                      borderLeft: index === 0 ? '4px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Top Row: Driver info & Match Score */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={ride.driver.avatar}
                          alt={ride.driver.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid rgba(0, 245, 212, 0.4)'
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{ride.driver.name}</h4>
                            {ride.driver.isVerified && (
                              <span className="badge badge-emerald" style={{ padding: '2px 7px', fontSize: '0.68rem' }}>
                                <CheckCircle2 size={11} /> Verified ID
                              </span>
                            )}
                            {ride.preferences.womenOnly && (
                              <span className="badge badge-coral" style={{ padding: '2px 7px', fontSize: '0.68rem' }}>
                                Women Only
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            ★ {ride.driver.rating} ({ride.driver.totalRides} rides) • {ride.vehicle.model}
                          </div>
                        </div>
                      </div>

                      {/* Match Compatibility Meter */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: ride.matchScore >= 85 ? 'rgba(0, 245, 212, 0.12)' : 'rgba(99, 102, 241, 0.12)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-pill)',
                          border: `1px solid ${ride.matchScore >= 85 ? 'rgba(0, 245, 212, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                        }}>
                          <Sparkles size={14} color={ride.matchScore >= 85 ? '#00F5D4' : '#818CF8'} />
                          <span style={{
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            color: ride.matchScore >= 85 ? '#00F5D4' : '#A5B4FC'
                          }}>
                            {ride.matchScore}% Match
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                          Corridor + Arrival Synchronized
                        </div>
                      </div>
                    </div>

                    {/* Middle Row: Route corridor details & Time Sync */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      background: 'rgba(255, 255, 255, 0.025)',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Departure & Arrival</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
                          Pickup at {ride.departureTime}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--teal-primary)' }}>
                          Matches within {ride.timeDiffMins}m of flight
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Route Corridor</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
                          {ride.primaryDestination.name.split('(')[0]}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#A5B4FC' }}>
                          +{ride.detour.detourMinutes} min detour for driver
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Available Seats</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF', marginTop: '2px' }}>
                          {ride.availableSeats} of {ride.totalSeats} seats open
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {ride.existingPassengers.length} co-rider already joined
                        </div>
                      </div>
                    </div>

                    {/* Co-riders pills if present */}
                    {ride.existingPassengers.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Matched Co-riders:</span>
                        {ride.existingPassengers.map(p => (
                          <div 
                            key={p.id}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-pill)',
                              fontSize: '0.75rem'
                            }}
                          >
                            <img src={p.avatar} alt={p.name} style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                            <span>{p.name}</span>
                            <span style={{ color: 'var(--text-muted)' }}>({p.destination.split(',')[0]})</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom Row: Transparent Price & Booking Actions */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px',
                      paddingTop: '14px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                            ${sharedPrice.toFixed(2)}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> / seat</span>
                        </div>
                        <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          ${soloPrice.toFixed(2)} solo cab
                        </div>
                        <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                          <TrendingDown size={12} /> Save {savingsPercent}% (${savings.toFixed(2)})
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          id={`preview-route-btn-${ride.id}`}
                          className="btn btn-secondary"
                          onClick={() => onPreviewRideOnMap(ride)}
                          style={{ fontSize: '0.84rem', padding: '8px 14px' }}
                        >
                          <MapPin size={15} />
                          <span>View Corridor</span>
                        </button>

                        <button
                          id={`book-seat-btn-${ride.id}`}
                          className="btn btn-primary"
                          onClick={() => onSelectRideForBooking(ride)}
                          style={{ fontSize: '0.88rem', padding: '9px 18px' }}
                        >
                          <span>Reserve Seat</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
