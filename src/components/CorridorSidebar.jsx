import React, { useState, useEffect } from 'react';
import { 
  Crosshair, 
  Building2, 
  Clock, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  VolumeX, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { fetchMatchesFromBackend } from '../utils/apiClient';

export default function CorridorSidebar({
  origin,
  setOrigin,
  destination,
  setDestination,
  onReviewMatch,
  activeMatchId,
  setActiveMatchId
}) {
  const [arrivalWindow, setArrivalWindow] = useState('08:45 AM – 09:00 AM');
  const [sliderVal, setSliderVal] = useState(55);
  const [filters, setFilters] = useState({
    maxDetour: true,
    evOnly: true,
    quietRide: false,
    verifiedNetwork: true
  });
  const [sortBy, setSortBy] = useState('Optimal ETA');

  const handleSwapRoute = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const [matches, setMatches] = useState([
    {
      id: 'match-1',
      score: '98% ROUTE MATCH',
      detour: '4 min detour (NH-48 Corridor)',
      driver: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        car: 'Tata Nexon EV • 4.97 ★ (184 rides)',
        isVerified: true,
        badge: 'Aadhaar & Google Gurgaon Verified'
      },
      seatsTotal: 4,
      seatsAvailable: 2,
      pickupTime: '08:20 AM',
      pickupLocation: 'Pickup (CP Gate 4)',
      dropoffTime: '08:52 AM',
      dropoffLocation: 'Cyber Hub Gate 2',
      price: '₹120',
      soloPrice: '₹520 solo cab',
      co2Offset: '-2.8 kg CO₂ offset',
      fastagShare: '₹25 FASTag split included'
    },
    {
      id: 'match-2',
      score: '94% ROUTE MATCH',
      detour: 'Direct expressway HOV lane',
      driver: {
        name: 'Marcus Thorne',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        car: 'Hyundai Ioniq 5 (EV) • 4.95 ★ (240 rides)',
        isVerified: true,
        badge: 'Aadhaar & Microsoft Verified'
      },
      seatsTotal: 3,
      seatsAvailable: 1,
      pickupTime: '08:30 AM',
      pickupLocation: 'Dhaula Kuan Interchange',
      dropoffTime: '08:58 AM',
      dropoffLocation: 'Cyber City DLF Phase 2',
      price: '₹140',
      soloPrice: '₹580 solo cab',
      co2Offset: '-3.1 kg CO₂ offset',
      fastagShare: '₹25 FASTag split included'
    },
    {
      id: 'match-3',
      score: '92% ROUTE MATCH',
      detour: 'Women-only safe pool (महिला विशेष)',
      driver: {
        name: 'Aisha Robinson',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        car: 'Honda City e:HEV Hybrid • 4.98 ★ (312 rides)',
        isVerified: true,
        badge: 'Delhi Police & Corporate Verified'
      },
      seatsTotal: 3,
      seatsAvailable: 2,
      pickupTime: '08:15 AM',
      pickupLocation: 'Hauz Khas Metro Stn',
      dropoffTime: '08:48 AM',
      dropoffLocation: 'Cyber Hub Building 10',
      price: '₹130',
      soloPrice: '₹540 solo cab',
      co2Offset: '-2.6 kg CO₂ offset',
      fastagShare: '₹25 FASTag split included'
    },
    {
      id: 'match-4',
      score: '90% ROUTE MATCH',
      detour: 'DND & Ring Rd express',
      driver: {
        name: 'Vikram Sethi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        car: 'Maruti Grand Vitara Hybrid • 4.92 ★ (195 rides)',
        isVerified: true,
        badge: 'Aadhaar & Deloitte Verified'
      },
      seatsTotal: 4,
      seatsAvailable: 3,
      pickupTime: '08:25 AM',
      pickupLocation: 'IGI Airport T3 Pillar 14',
      dropoffTime: '09:05 AM',
      dropoffLocation: 'Noida Sector 62 IT Park',
      price: '₹190',
      soloPrice: '₹820 solo cab',
      co2Offset: '-3.8 kg CO₂ offset',
      fastagShare: 'Toll-free elevated flyway'
    }
  ]);

  // Fetch live matches from Spring Boot backend if available
  useEffect(() => {
    let active = true;
    fetchMatchesFromBackend({
      origin,
      destination,
      arrivalTimeWindow: arrivalWindow,
      maxDetourMinutes: filters.maxDetour ? 7 : 20,
      evOnly: filters.evOnly,
      quietRide: filters.quietRide,
      womenOnly: false,
    }).then(liveMatches => {
      if (active && liveMatches && liveMatches.length > 0) {
        setMatches(liveMatches.map(m => ({
          id: m.id,
          score: m.score,
          detour: m.detour,
          driver: {
            name: m.driverName,
            avatar: m.driverAvatar,
            car: m.driverCar,
            isVerified: m.verified
          },
          seatsTotal: m.seatsTotal,
          seatsAvailable: m.seatsAvailable,
          pickupTime: m.pickupTime,
          pickupLocation: m.pickupLocation,
          dropoffTime: m.dropoffTime,
          dropoffLocation: m.dropoffLocation,
          price: m.price.startsWith('₹') ? m.price : `₹${Math.round(parseFloat(m.price.replace('$', '')) * 15 || 120)}`,
          soloPrice: m.soloPrice.startsWith('₹') ? m.soloPrice : `₹${Math.round(parseFloat(m.soloPrice.replace('$', '')) * 18 || 520)} solo`,
          co2Offset: m.co2Offset
        })));
      }
    });
    return () => { active = false; };
  }, [origin, destination, arrivalWindow, filters]);

  return (
    <aside className="corridor-sidebar">
      {/* Engine & Concurrency Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div className="engine-badge">
            <Sparkles size={14} color="#00F5D4" />
            <span>ALGORITHMIC CORRIDOR ENGINE</span>
          </div>
          <span className="grid-tag">● High Concurrency Grid</span>
        </div>

        <h1 className="sidebar-title">Smart Corridor Matching</h1>
        <p className="sidebar-subtitle">
          Connect with co-commuters across synchronized multi-stop trajectories.
        </p>
      </div>

      {/* Origin & Destination Selector Box */}
      <div className="route-selector-box">
        {/* Origin */}
        <div className="route-input-group">
          <label className="route-label">ORIGIN • PICKUP RADIUS 200M</label>
          <div className="route-input-wrapper">
            <input 
              id="corridor-origin-input"
              type="text" 
              className="route-input"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <Crosshair size={16} color="#00F5D4" />
          </div>
        </div>

        {/* Swap Button */}
        <button 
          id="corridor-swap-btn"
          className="swap-route-btn" 
          onClick={handleSwapRoute} 
          title="Swap Origin and Destination"
        >
          <ArrowUpDown size={15} />
        </button>

        {/* Destination */}
        <div className="route-input-group">
          <label className="route-label">DESTINATION • ड्रॉप लोकेशन</label>
          <div className="route-input-wrapper">
            <input 
              id="corridor-dest-input"
              type="text" 
              className="route-input"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Building2 size={16} color="#94A3B8" />
          </div>
        </div>
      </div>

      {/* Delhi-NCR Quick Corridor Presets */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          POPULAR DELHI-NCR CORRIDORS • लोकप्रिय रूट
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { label: 'CP ➔ Cyber Hub', from: 'Connaught Place (Inner Circle Gate 4)', to: 'DLF Cyber Hub, Gurugram' },
            { label: 'IGI T3 ➔ Noida 62', from: 'IGI Airport T3 Arrivals (Pillar 14)', to: 'Noida Sector 62 IT Park' },
            { label: 'Hauz Khas ➔ Cyber City', from: 'Hauz Khas Metro Station Gate 2', to: 'Cyber Hub Building 10, Gurugram' },
            { label: 'Dhaula Kuan ➔ DLF Ph 3', from: 'Dhaula Kuan Metro Interchange', to: 'DLF Phase 3 Rapid Metro, Gurugram' }
          ].map((corridor, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setOrigin(corridor.from);
                setDestination(corridor.to);
              }}
              style={{
                background: origin === corridor.from ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: origin === corridor.from ? '1px solid #00F5D4' : '1px solid rgba(255, 255, 255, 0.08)',
                color: origin === corridor.from ? '#00F5D4' : '#94A3B8',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              📍 {corridor.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target Arrival Window Card */}
      <div className="arrival-window-card">
        <div className="arrival-header">
          <div className="arrival-label">
            <Clock size={13} color="#00F5D4" />
            <span>TARGET ARRIVAL WINDOW</span>
          </div>
          <span className="tolerance-badge">± 10 mins tolerance</span>
        </div>

        <div className="arrival-time-display">
          <span className="time-range-text">{arrivalWindow}</span>
          <span className="surge-tag">Peak Morning Surge</span>
        </div>

        {/* Dual Slider */}
        <div className="slider-container">
          <input 
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => {
              setSliderVal(Number(e.target.value));
              if (Number(e.target.value) < 33) {
                setArrivalWindow('08:00 AM – 08:30 AM');
              } else if (Number(e.target.value) < 66) {
                setArrivalWindow('08:45 AM – 09:00 AM');
              } else {
                setArrivalWindow('09:00 AM – 09:30 AM');
              }
            }}
            className="dual-slider"
          />
        </div>

        <div className="slider-ticks">
          <span>08:00 AM</span>
          <span>08:30 AM</span>
          <span>09:00 AM</span>
          <span>09:30 AM</span>
        </div>
      </div>

      {/* Route Filters & Rider Comfort */}
      <div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          ROUTE FILTERS & RIDER COMFORT
        </div>

        <div className="filters-grid">
          {/* Filter 1 */}
          <div 
            id="filter-max-detour"
            className={`filter-card ${filters.maxDetour ? 'checked' : ''}`}
            onClick={() => setFilters(f => ({ ...f, maxDetour: !f.maxDetour }))}
          >
            <div className="filter-checkbox">
              {filters.maxDetour && <Check size={12} strokeWidth={3} />}
            </div>
            <div className="filter-content">
              <span className="filter-title">Max 1 Detour</span>
              <span className="filter-desc">&lt; 7 min penalty</span>
            </div>
          </div>

          {/* Filter 2 */}
          <div 
            id="filter-ev-only"
            className={`filter-card ${filters.evOnly ? 'checked' : ''}`}
            onClick={() => setFilters(f => ({ ...f, evOnly: !f.evOnly }))}
          >
            <div className="filter-checkbox">
              {filters.evOnly && <Check size={12} strokeWidth={3} />}
            </div>
            <div className="filter-content">
              <span className="filter-title">EV Only</span>
              <span className="filter-desc">Zero tailpipe</span>
            </div>
          </div>

          {/* Filter 3 */}
          <div 
            id="filter-quiet-ride"
            className={`filter-card ${filters.quietRide ? 'checked' : ''}`}
            onClick={() => setFilters(f => ({ ...f, quietRide: !f.quietRide }))}
          >
            <div className="filter-checkbox">
              {filters.quietRide && <Check size={12} strokeWidth={3} />}
            </div>
            <div className="filter-content">
              <span className="filter-title">Quiet Ride</span>
              <span className="filter-desc">Focus / Ambient</span>
            </div>
          </div>

          {/* Filter 4 */}
          <div 
            id="filter-verified-net"
            className={`filter-card ${filters.verifiedNetwork ? 'checked' : ''}`}
            onClick={() => setFilters(f => ({ ...f, verifiedNetwork: !f.verifiedNetwork }))}
          >
            <div className="filter-checkbox">
              {filters.verifiedNetwork && <Check size={12} strokeWidth={3} />}
            </div>
            <div className="filter-content">
              <span className="filter-title">Verified Network</span>
              <span className="filter-desc">Company ID match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="results-header">
        <div className="results-count">
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00F5D4', boxShadow: '0 0 6px #00F5D4' }} />
          <span>14 Carpools Matching Route</span>
        </div>

        <select 
          className="results-sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Optimal ETA">Sort: Optimal ETA ▾</option>
          <option value="Lowest Fare">Sort: Lowest Fare ▾</option>
          <option value="Max CO2 Saved">Sort: Max CO2 Saved ▾</option>
        </select>
      </div>

      {/* Match Cards List */}
      <div className="match-cards-list">
        {matches.map((item) => (
          <div 
            key={item.id}
            id={`corridor-card-${item.id}`}
            className={`match-card ${activeMatchId === item.id ? 'active-selected' : ''}`}
            onClick={() => setActiveMatchId(item.id)}
          >
            {/* Top Row: Pill and Detour */}
            <div className="match-card-top">
              <span className="match-pill-pct">
                <Sparkles size={11} /> {item.score}
              </span>
              <span className="detour-pill">{item.detour}</span>
            </div>

            {/* Driver Row */}
            <div className="driver-row">
              <div className="driver-info">
                <img 
                  src={item.driver.avatar} 
                  alt={item.driver.name} 
                  className="driver-avatar"
                />
                <div>
                  <div className="driver-name">
                    <span>{item.driver.name}</span>
                    {item.driver.isVerified && (
                      <CheckCircle2 size={13} color="#00F5D4" />
                    )}
                  </div>
                  <div className="driver-sub">{item.driver.car}</div>
                  {item.driver.badge && (
                    <div style={{ fontSize: '0.68rem', color: '#00F5D4', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                      <ShieldCheck size={11} />
                      <span>{item.driver.badge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Seats Left Dots */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginBottom: '3px' }}>
                  {item.seatsAvailable} of {item.seatsTotal} left
                </div>
                <div className="seats-dots">
                  {Array.from({ length: item.seatsTotal }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`seat-dot ${idx < item.seatsAvailable ? 'available' : 'occupied'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Trajectory Strip */}
            <div className="trajectory-strip">
              <div>
                <span className="trajectory-time">{item.pickupTime}</span>
                <span style={{ marginLeft: '6px', color: '#64748B' }}>{item.pickupLocation}</span>
              </div>

              <div className="trajectory-divider">
                <div className="trajectory-line" />
                <span className="trajectory-icon">⚡</span>
              </div>

              <div>
                <span className="trajectory-time">{item.dropoffTime}</span>
                <span style={{ marginLeft: '6px', color: '#64748B' }}>{item.dropoffLocation}</span>
              </div>
            </div>

            {/* Card Price & CTA */}
            <div className="match-card-bottom">
              <div className="price-box">
                <div className="price-main">
                  <span className="price-val">{item.price}</span>
                  <span className="price-solo">{item.soloPrice}</span>
                </div>
                <span className="co2-offset-label">{item.co2Offset}</span>
              </div>

              <button 
                id={`btn-review-match-${item.id}`}
                className="btn-match-cta"
                onClick={(e) => {
                  e.stopPropagation();
                  onReviewMatch(item);
                }}
              >
                <span>Review Route & Match</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
