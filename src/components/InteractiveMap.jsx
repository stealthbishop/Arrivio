import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Car, 
  CheckCircle, 
  Users, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  TrendingDown
} from 'lucide-react';

// Custom Map center updater component
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom DivIcons
const createHubIcon = (code) => {
  return L.divIcon({
    className: 'custom-hub-icon',
    html: `
      <div style="
        background: linear-gradient(135deg, #00F5D4 0%, #06D6A0 100%);
        color: #07090E;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 11px;
        box-shadow: 0 0 20px rgba(0, 245, 212, 0.7);
        border: 2px solid #FFFFFF;
      ">
        ✈ ${code}
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
};

const createCarIcon = () => {
  return L.divIcon({
    className: 'custom-car-icon',
    html: `
      <div style="
        background: #6366F1;
        color: #FFFFFF;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 18px rgba(99, 102, 241, 0.8);
        border: 2px solid #FFFFFF;
      ">
        🚘
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const createWaypointIcon = (number, name) => {
  return L.divIcon({
    className: 'custom-waypoint-icon',
    html: `
      <div style="
        background: #0B0F19;
        color: #00F5D4;
        border: 2px solid #00F5D4;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 12px;
        box-shadow: 0 0 14px rgba(0, 245, 212, 0.5);
      ">
        ${number}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const createDestinationIcon = () => {
  return L.divIcon({
    className: 'custom-dest-icon',
    html: `
      <div style="
        background: #FFB703;
        color: #07090E;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 14px;
        box-shadow: 0 0 18px rgba(255, 183, 3, 0.7);
        border: 2px solid #FFFFFF;
      ">
        🏁
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
};

export default function InteractiveMap({
  selectedHub,
  rides,
  activeRide,
  setActiveRide,
  onBookRide
}) {
  const currentRide = activeRide || rides[0];
  const [isSimulating, setIsSimulating] = useState(false);
  const [carProgressIndex, setCarProgressIndex] = useState(0);

  const routeCorridor = currentRide?.corridor || [
    selectedHub.coords,
    [selectedHub.coords[0] + 0.05, selectedHub.coords[1] - 0.08],
    [selectedHub.coords[0] + 0.1, selectedHub.coords[1] - 0.15],
  ];

  // Animation loop for car moving along corridor
  useEffect(() => {
    let timer;
    if (isSimulating) {
      timer = setInterval(() => {
        setCarProgressIndex((prev) => {
          if (prev >= routeCorridor.length - 1) {
            setIsSimulating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isSimulating, routeCorridor.length]);

  const carCoords = routeCorridor[carProgressIndex] || routeCorridor[0];

  return (
    <div className="map-page-container animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-pulse"></span>
            <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Smart Shared Corridor Visualizer</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
            Visualizing multi-stop shared routes, passenger sequence, and detour overhead from <strong>{selectedHub.name}</strong>.
          </p>
        </div>

        {/* Ride Selector Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select Corridor:</span>
          {rides.slice(0, 3).map((r) => (
            <button
              key={r.id}
              id={`select-map-corridor-${r.id}`}
              onClick={() => {
                setActiveRide(r);
                setCarProgressIndex(0);
                setIsSimulating(false);
              }}
              style={{
                background: currentRide?.id === r.id ? 'rgba(0, 245, 212, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                color: currentRide?.id === r.id ? 'var(--teal-primary)' : 'var(--text-secondary)',
                border: currentRide?.id === r.id ? '1px solid var(--teal-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {r.driver.name.split(' ')[0]} → {r.primaryDestination.name.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Corridor Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '24px',
        minHeight: '620px',
        alignItems: 'stretch'
      }}>
        {/* Leaflet Map Box */}
        <div className="glass-panel" style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          minHeight: '560px'
        }}>
          <MapContainer
            center={selectedHub.coords}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '100%', minHeight: '560px', width: '100%' }}
          >
            <ChangeView center={selectedHub.coords} zoom={12} />

            {/* CartoDB Dark Matter Tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Hub Origin Marker */}
            <Marker position={selectedHub.coords} icon={createHubIcon(selectedHub.code)}>
              <Popup>
                <div style={{ padding: '6px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>{selectedHub.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '2px' }}>{selectedHub.terminal}</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>Departure Hub for all carpoolers</div>
                </div>
              </Popup>
            </Marker>

            {/* Hub Buffer Zone Circle */}
            <Circle
              center={selectedHub.coords}
              radius={1200}
              pathOptions={{ color: '#00F5D4', fillColor: '#00F5D4', fillOpacity: 0.1, weight: 1.5 }}
            />

            {/* Route Polyline (Main Shared Corridor) */}
            <Polyline
              positions={routeCorridor}
              pathOptions={{
                color: '#00F5D4',
                weight: 5,
                opacity: 0.85,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />

            {/* Polyline Outer Glow */}
            <Polyline
              positions={routeCorridor}
              pathOptions={{
                color: '#6366F1',
                weight: 12,
                opacity: 0.25,
                lineCap: 'round',
              }}
            />

            {/* Existing Co-rider Dropoff Markers */}
            {currentRide?.existingPassengers?.map((p, idx) => (
              <Marker
                key={p.id}
                position={p.coords}
                icon={createWaypointIcon(idx + 1, p.name)}
              >
                <Popup>
                  <div style={{ padding: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-teal" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>Stop #{idx + 1}</span>
                      <strong style={{ color: '#FFFFFF' }}>{p.name}</strong>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Dropoff: {p.destination}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#00F5D4', marginTop: '2px' }}>
                      Seat: {p.seat} • Shared Fare: ${p.shareAmount}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Final Destination Marker */}
            <Marker
              position={currentRide?.primaryDestination.coords || routeCorridor[routeCorridor.length - 1]}
              icon={createDestinationIcon()}
            >
              <Popup>
                <div style={{ padding: '6px' }}>
                  <div style={{ fontWeight: 700, color: '#FFB703' }}>Final Corridor Destination</div>
                  <div style={{ fontSize: '0.8rem', color: '#FFFFFF', marginTop: '2px' }}>
                    {currentRide?.primaryDestination.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                    Driver: {currentRide?.driver.name}
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Live Moving Car Marker */}
            <Marker position={carCoords} icon={createCarIcon()}>
              <Popup>
                <div style={{ padding: '6px' }}>
                  <div style={{ fontWeight: 700, color: '#818CF8' }}>{currentRide?.vehicle.model}</div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>Plate: {currentRide?.vehicle.plate}</div>
                  <div style={{ fontSize: '0.74rem', color: '#00F5D4', marginTop: '4px' }}>
                    Status: {isSimulating ? 'Moving along corridor...' : 'En route to Terminal Pickup'}
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Floating Map Simulation Controls */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'rgba(11, 15, 25, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <button
              id="map-simulate-play-btn"
              className="btn btn-primary"
              onClick={() => setIsSimulating(!isSimulating)}
              style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: 'var(--radius-pill)' }}
            >
              {isSimulating ? <Pause size={14} /> : <Play size={14} />}
              <span>{isSimulating ? 'Pause GPS' : 'Simulate Ride'}</span>
            </button>

            <button
              id="map-simulate-reset-btn"
              className="btn btn-ghost"
              onClick={() => {
                setIsSimulating(false);
                setCarProgressIndex(0);
              }}
              style={{ padding: '6px 10px', fontSize: '0.8rem' }}
            >
              <RotateCcw size={14} />
            </button>

            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Step {carProgressIndex + 1} of {routeCorridor.length}
            </div>
          </div>
        </div>

        {/* Corridor Details & Waypoint Sequence Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Driver Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <img
                src={currentRide?.driver.avatar}
                alt={currentRide?.driver.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>{currentRide?.driver.name}</h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  ★ {currentRide?.driver.rating} • {currentRide?.driver.totalRides} trips
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--teal-primary)' }}>
                  {currentRide?.vehicle.model}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated Time</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>36 mins</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Detour Added</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--teal-primary)' }}>+4 mins</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Seats Left</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#A5B4FC' }}>
                  {currentRide ? currentRide.totalSeats - currentRide.bookedSeats : 0} open
                </div>
              </div>
            </div>
          </div>

          {/* Multi-stop Corridor Sequence */}
          <div className="glass-panel" style={{ padding: '20px', flex: 1 }}>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={16} color="var(--teal-primary)" />
              <span>Smart Pickup & Dropoff Sequence</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
              {/* Vertical connector line */}
              <div style={{
                position: 'absolute',
                top: '18px',
                bottom: '18px',
                left: '14px',
                width: '2px',
                background: 'rgba(0, 245, 212, 0.25)',
                zIndex: 0
              }} />

              {/* Stop 0: Hub Pickup */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--teal-primary)',
                  color: '#07090E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)'
                }}>
                  0
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {selectedHub.name}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    {selectedHub.terminal} • Departs at {currentRide?.departureTime}
                  </div>
                </div>
              </div>

              {/* Stop 1..N: Existing Passengers */}
              {currentRide?.existingPassengers?.map((p, idx) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: '#0B0F19',
                    border: '2px solid var(--teal-primary)',
                    color: 'var(--teal-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                      Dropoff: {p.name}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                      {p.destination} • +3 min detour
                    </div>
                  </div>
                </div>
              ))}

              {/* Final Stop */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#FFB703',
                  color: '#07090E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  boxShadow: '0 0 10px rgba(255, 183, 3, 0.5)'
                }}>
                  🏁
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Final Dropoff: {currentRide?.primaryDestination.name}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    Driver destination corridor completed
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shared Fare per Seat</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                    ${currentRide?.currentSharedFarePerSeat.toFixed(2)}
                  </div>
                </div>
                <span className="badge badge-emerald">
                  <TrendingDown size={12} /> Save ~64%
                </span>
              </div>

              <button
                id="map-book-current-ride-btn"
                className="btn btn-primary"
                onClick={() => onBookRide(currentRide)}
                style={{ width: '100%', padding: '10px' }}
              >
                <span>Reserve Seat on this Corridor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
