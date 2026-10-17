import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  ShieldCheck, 
  Leaf, 
  Zap, 
  Settings, 
  Coffee, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  MapPin,
  Flame,
  Radio
} from 'lucide-react';

// Custom DivIcons for Transit Map
const createSimplePinIcon = (label, color = '#00F5D4') => {
  return L.divIcon({
    className: 'transit-pin-icon',
    html: `
      <div style="
        background: #0B1017;
        border: 2px solid ${color};
        color: #FFFFFF;
        padding: 3px 8px;
        border-radius: 14px;
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 4px;
        box-shadow: 0 0 12px ${color}88;
        transform: translate(-50%, -50%);
      ">
        <span style="width: 6px; height: 6px; border-radius: 50%; background: ${color};"></span>
        <span>${label}</span>
      </div>
    `,
    iconSize: [110, 24],
    iconAnchor: [55, 12]
  });
};

const createCarMiniIcon = () => {
  return L.divIcon({
    className: 'transit-car-mini',
    html: `
      <div style="
        background: #F59E0B;
        color: #070B11;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        box-shadow: 0 0 16px #F59E0B;
        border: 2px solid #FFFFFF;
      ">
        🚘
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
};

export default function RightSidebarWidgets({ 
  selectedCity = 'bengaluru', 
  onTriggerSos,
  onOpenAutoPayModal
}) {
  const isBengaluru = selectedCity === 'bengaluru';

  // Bengaluru ORR Coordinates (HSR Layout to Bellandur Ecospace)
  const orrRoute = [
    [12.9116, 77.6389], // HSR Sector 2
    [12.9170, 77.6500], // Silk Board Flyover Ramp
    [12.9230, 77.6650], // Agara Flyover
    [12.9260, 77.6760], // Iblur Junction
    [12.9290, 77.6840], // Bellandur
    [12.9340, 77.6920]  // Bellandur Ecospace Gate 2
  ];

  const [carStep, setCarStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarStep(prev => (prev >= orrRoute.length - 1 ? 0 : prev + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const [sosTested, setSosTested] = useState(false);

  const handleTestSos = () => {
    setSosTested(true);
    if (onTriggerSos) onTriggerSos();
    setTimeout(() => setSosTested(false), 3500);
  };

  return (
    <div className="safar-right-col">
      
      {/* 1. ORR Transit Corridor Leaflet Map Card */}
      <div className="transit-corridor-card">
        <div className="transit-map-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#00F5D4', fontSize: '15px' }}>⚡</span>
            <strong style={{ fontSize: '0.94rem', color: '#FFFFFF' }}>
              {isBengaluru ? 'ORR Transit Corridor' : 'NH-48 Transit Corridor'}
            </strong>
          </div>

          <div className="gps-flow-pill">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
            <span>Live GPS Flow</span>
          </div>
        </div>

        {/* Embedded Leaflet Map */}
        <div className="transit-map-canvas">
          <MapContainer
            center={[12.9240, 77.6680]}
            zoom={12}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ width: '100%', height: '100%', background: '#080B12' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={19}
            />

            {/* Glowing route line */}
            <Polyline
              positions={orrRoute}
              pathOptions={{
                color: '#E5A93C',
                weight: 6,
                opacity: 0.4,
                lineCap: 'round'
              }}
            />
            <Polyline
              positions={orrRoute}
              pathOptions={{
                color: '#E5A93C',
                weight: 3,
                opacity: 0.95,
                dashArray: '6, 6'
              }}
            />

            {/* Origin Pin */}
            <Marker position={orrRoute[0]} icon={createSimplePinIcon('HSR Sector 2 (Pillar 84)', '#00F5D4')} />

            {/* Mid Flyover Bypassed Pin */}
            <Marker position={orrRoute[2]} icon={createSimplePinIcon('Silk Board (Bypassed)', '#38BDF8')} />

            {/* Destination Pin */}
            <Marker position={orrRoute[orrRoute.length - 1]} icon={createSimplePinIcon('Ecospace Gate 2', '#F59E0B')} />

            {/* Moving Car Marker */}
            <Marker position={orrRoute[carStep] || orrRoute[0]} icon={createCarMiniIcon()} />
          </MapContainer>
        </div>

        {/* Footer Telemetry */}
        <div className="transit-footer-telemetry">
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Est. Travel Time</div>
            <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.94rem' }}>
              28 mins <span style={{ color: '#10B981', fontSize: '0.76rem' }}>(-18m vs Cab)</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>FASTag Express</div>
            <div style={{ fontWeight: 800, color: '#00F5D4', fontSize: '0.94rem' }}>
              ₹0 Added Fee
            </div>
          </div>
        </div>
      </div>

      {/* 2. Monthly Bachat Meter Card */}
      <div className="bachat-meter-card">
        <div className="bachat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '18px' }}>🐷</span>
            <strong style={{ fontSize: '0.92rem', color: '#FFFFFF' }}>Monthly Bachat Meter</strong>
          </div>
          <span className="month-pill">November</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="bachat-big-stat">₹9,450</div>
            <div className="bachat-sub">Saved vs solo app cabs this month</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="streak-tag">
              14 Safars
            </div>
            <div style={{ fontSize: '0.72rem', color: '#F59E0B' }}>
              Streak record 🔥
            </div>
          </div>
        </div>

        {/* Progress Perk Bar */}
        <div className="perk-unlocked-box">
          <span style={{ fontSize: '18px' }}>☕</span>
          <div>
            <strong style={{ color: '#F59E0B' }}>Chaayos Chai & Bun Maska Unlocked</strong>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
              Claimable at Ecospace or HSR outlet
            </div>
          </div>
        </div>
      </div>

      {/* 3. UPI AutoPay & Khaata Card */}
      <div className="autopay-card">
        <div className="autopay-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} color="#F59E0B" />
            <strong style={{ fontSize: '0.92rem', color: '#FFFFFF' }}>UPI AutoPay & Khaata</strong>
          </div>
          <span className="linked-badge">Linked</span>
        </div>

        <p className="autopay-desc">
          Zero cash exchanges. Fare automatically settles seamlessly into the driver's UPI when you scan-in at pickup.
        </p>

        <div className="upi-brands-row">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} />
            <span>GPay UPI</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A855F7' }} />
            <span>PhonePe</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EC4899' }} />
            <span>CRED UPI</span>
          </span>
        </div>

        <button 
          className="btn-manage-autopay"
          onClick={onOpenAutoPayModal}
        >
          <Settings size={14} />
          <span>Manage AutoPay Mandate</span>
        </button>
      </div>

      {/* 4. Suraksha Shield Active */}
      <div className="suraksha-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444',
            flexShrink: 0
          }}>
            <ShieldCheck size={18} />
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              Suraksha Shield Active
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
              {isBengaluru ? 'Bengaluru City Police SOS & Real-time Live Share' : 'Delhi Police 112 SOS & Live WhatsApp Share'}
            </div>
          </div>
        </div>

        <button 
          className="btn-test-sos"
          onClick={handleTestSos}
        >
          {sosTested ? 'SOS Alert Sent ✓' : 'Test SOS'}
        </button>
      </div>

    </div>
  );
}
