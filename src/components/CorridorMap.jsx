import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Bus, 
  Layers, 
  Maximize2, 
  Navigation, 
  Zap, 
  TrendingUp, 
  CheckCircle2,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function CorridorMap({ 
  activeRide,
  origin = 'Financial District, Market St',
  destination = 'Tech Campus, Silicon Ave'
}) {
  const [vehicleOffset, setVehicleOffset] = useState(0.42);
  const [secondVehicleOffset, setSecondVehicleOffset] = useState(0.68);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showTransit, setShowTransit] = useState(true);

  // Smooth animation of vehicles moving down the corridor
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleOffset(prev => (prev >= 0.95 ? 0.15 : prev + 0.003));
      setSecondVehicleOffset(prev => (prev >= 0.95 ? 0.25 : prev + 0.0025));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Compute (x, y) along the cubic bezier curve:
  // P0 = (220, 80), P1 = (440, 200), P2 = (600, 480), P3 = (900, 560)
  const getCubicBezierPoint = (t) => {
    const p0 = { x: 260, y: 90 };
    const p1 = { x: 420, y: 220 };
    const p2 = { x: 620, y: 440 };
    const p3 = { x: 920, y: 550 };

    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const xt = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const yt = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

    return { x: xt, y: yt };
  };

  const car1Pos = getCubicBezierPoint(vehicleOffset);
  const car2Pos = getCubicBezierPoint(secondVehicleOffset);
  const stopTransitPos = getCubicBezierPoint(0.58);

  return (
    <div className="corridor-map-area">
      {/* Top Floating Badges */}
      <div className="map-floating-top">
        <div className="floating-pill">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F5D4', boxShadow: '0 0 10px #00F5D4' }} />
          <span>ACTIVE MESH: I-280 & US-101 CORRIDOR</span>
        </div>

        <div className="floating-pill" style={{ color: '#94A3B8' }}>
          <TrendingUp size={14} color="#00F5D4" />
          <span>HOV Speed +18mph over solo</span>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="map-floating-controls">
        <button 
          className="map-control-btn"
          onClick={() => setShowTraffic(!showTraffic)}
          title="Toggle Traffic Layer"
          style={{ color: showTraffic ? '#00F5D4' : '#64748B' }}
        >
          <Sliders size={16} />
        </button>

        <button 
          className="map-control-btn"
          onClick={() => setShowTransit(!showTransit)}
          title="Toggle Multi-Modal Transit"
          style={{ color: showTransit ? '#00F5D4' : '#64748B' }}
        >
          <Layers size={16} />
        </button>

        <button 
          className="map-control-btn"
          title="Full Screen View"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* High-Tech Vector Canvas SVG */}
      <svg 
        style={{ width: '100%', height: '100%', display: 'block' }}
        viewBox="0 0 1000 650" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="meshGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1" />
          </pattern>

          {/* Glowing linear gradient for highway ribbon */}
          <linearGradient id="corridorGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5D4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#05D5A6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#00E599" stopOpacity="0.9" />
          </linearGradient>

          {/* Ambient wide halo glow */}
          <filter id="ambientHalo" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#meshGrid)" />

        {/* Alternate dashed solo taxi corridor (slower detour) */}
        <path
          d="M 260 90 C 360 140, 560 320, 750 420 C 820 460, 910 520, 920 550"
          fill="none"
          stroke="rgba(100, 116, 139, 0.35)"
          strokeWidth="2.5"
          strokeDasharray="6 8"
        />

        {/* Wide ambient glow for main highway corridor */}
        <path
          d="M 260 90 C 420 220, 620 440, 920 550"
          fill="none"
          stroke="#00F5D4"
          strokeWidth="26"
          strokeOpacity="0.18"
          strokeLinecap="round"
          filter="url(#ambientHalo)"
        />

        {/* Mid-tier soft glow */}
        <path
          d="M 260 90 C 420 220, 620 440, 920 550"
          fill="none"
          stroke="#00F5D4"
          strokeWidth="14"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        {/* Core vibrant neon line */}
        <path
          d="M 260 90 C 420 220, 620 440, 920 550"
          fill="none"
          stroke="url(#corridorGlowGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Inner white dashes for HOV carpool lane effect */}
        <path
          d="M 260 90 C 420 220, 620 440, 920 550"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="10 14"
          strokeOpacity="0.75"
        />

        {/* Origin Pickup Zone: 200m radius ring */}
        <g transform="translate(260, 90)">
          <circle r="44" fill="rgba(0, 245, 212, 0.06)" stroke="#00F5D4" strokeWidth="1" strokeDasharray="3 4" />
          <circle r="6" fill="#00F5D4" filter="url(#nodeGlow)" />
          <circle r="3" fill="#FFFFFF" />

          {/* Origin Pill Badge */}
          <foreignObject x="-75" y="-46" width="160" height="34">
            <div style={{
              background: 'rgba(11, 16, 23, 0.92)',
              border: '1px solid rgba(0, 245, 212, 0.4)',
              borderRadius: '9999px',
              padding: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 14px rgba(0, 245, 212, 0.3)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00F5D4' }} />
              <span>Market St Origin</span>
            </div>
          </foreignObject>
        </g>

        {/* Transfer Waypoint: Stop SoMa Transit */}
        {showTransit && (
          <g transform={`translate(${stopTransitPos.x}, ${stopTransitPos.y})`}>
            {/* Outer halo */}
            <circle r="14" fill="rgba(11, 16, 23, 0.9)" stroke="#00F5D4" strokeWidth="2" filter="url(#nodeGlow)" />
            <circle r="6" fill="#00F5D4" />

            {/* Waypoint Pill */}
            <foreignObject x="-95" y="18" width="200" height="34">
              <div style={{
                background: 'rgba(11, 16, 23, 0.88)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '9999px',
                padding: '3px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#94A3B8',
                fontSize: '11px',
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
              }}>
                <span style={{ color: '#00F5D4', fontSize: '10px' }}>⚓</span>
                <span>Stop: SoMa Transit (4 min)</span>
              </div>
            </foreignObject>
          </g>
        )}

        {/* Moving Vehicle 1 (Elena's Rivian R1S) */}
        <g transform={`translate(${car1Pos.x}, ${car1Pos.y})`}>
          <circle r="18" fill="#070B11" stroke="#00F5D4" strokeWidth="2.5" filter="url(#nodeGlow)" />
          <circle r="12" fill="rgba(0, 245, 212, 0.2)" />
          {/* Car icon */}
          <foreignObject x="-10" y="-10" width="20" height="20">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              <Car size={13} color="#00F5D4" />
            </div>
          </foreignObject>
        </g>

        {/* Moving Vehicle 2 (Following carpool node) */}
        <g transform={`translate(${car2Pos.x}, ${car2Pos.y})`}>
          <circle r="16" fill="#070B11" stroke="#38BDF8" strokeWidth="2" filter="url(#nodeGlow)" />
          <circle r="10" fill="rgba(56, 189, 248, 0.2)" />
          <foreignObject x="-8" y="-8" width="16" height="16">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              <Bus size={11} color="#38BDF8" />
            </div>
          </foreignObject>
        </g>

        {/* Destination: Silicon Ave Campus Gateway */}
        <g transform="translate(920, 550)">
          {/* Beacon wave pulses */}
          <circle r="60" fill="rgba(0, 229, 153, 0.04)" stroke="#00E599" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle r="22" fill="rgba(0, 229, 153, 0.2)" stroke="#00E599" strokeWidth="2" filter="url(#nodeGlow)" />

          {/* Polygon / flag marker */}
          <polygon points="0,-12 10,0 0,12 -10,0" fill="#00E599" />

          {/* Destination Badge */}
          <foreignObject x="-140" y="-45" width="160" height="42">
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 229, 153, 0.25) 0%, rgba(11, 16, 23, 0.95) 100%)',
              border: '1.5px solid #00E599',
              borderRadius: '8px',
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(0, 229, 153, 0.4)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              lineHeight: 1.2
            }}>
              <span>🚩</span>
              <span>SILICON AVE<br/><span style={{ fontSize: '9px', color: '#00E599', fontWeight: 500 }}>CAMPUS GATEWAY</span></span>
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* Bottom Right Floating Telemetry Card */}
      <div className="map-floating-telemetry">
        <div className="telemetry-header">
          <span style={{ color: 'var(--text-muted)' }}>CORRIDOR EFFICIENCY</span>
          <span style={{ color: 'var(--neon-mint)', fontWeight: 700 }}>96.4% Synced</span>
        </div>

        <div className="telemetry-progress-bg">
          <div className="telemetry-progress-fill" />
        </div>

        <div className="telemetry-metrics">
          <div>
            <div className="telemetry-stat-label">Avg Match Delay</div>
            <div className="telemetry-stat-val">2.8 mins</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="telemetry-stat-label">Network CO2 Saved</div>
            <div className="telemetry-stat-val" style={{ color: 'var(--neon-green)' }}>412 kg / hr</div>
          </div>
        </div>
      </div>
    </div>
  );
}
