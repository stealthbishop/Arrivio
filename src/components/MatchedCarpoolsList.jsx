import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Zap, 
  Clock, 
  Coffee, 
  Snowflake, 
  Radio, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function MatchedCarpoolsList({ onSelectPool, onOpenChat }) {
  const pools = [
    {
      id: 'pool-1',
      type: 'pakka',
      badgeTitle: 'PAKKA SAATHI PICK',
      tagline: 'Zero Toll Delay',
      oldPrice: '₹380',
      savePct: 'Save 78%',
      driver: {
        name: 'Rahul Verma',
        role: 'Senior Architect',
        company: 'Wipro Bellandur',
        rating: 4.96,
        totalSafars: 540,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        carModel: 'TATA NEXON EV MAX',
        carPlate: 'KA 01 MJ 8820'
      },
      pickupTime: '08:45 AM',
      pickupLocation: 'HSR BDA (Metro Pillar 42)',
      durationText: '33 mins total',
      dropoffTime: '09:18 AM',
      dropoffLocation: 'Bellandur Ecospace',
      waypoints: ['HSR BDA (Metro Pillar 42)', 'Silk Board Flyover Ramp', 'Bellandur Ecospace'],
      perks: [
        { icon: '☕', text: 'Rameshwaram Filter Coffee Pause' },
        { icon: '❄️', text: 'Chilled AC' },
        { icon: '📻', text: '90s Retro Hindi Lo-fi' }
      ],
      price: '₹85',
      seatsAvailable: 2,
      seatsTotal: 4,
      btnStyle: 'btn-book-gold',
      btnText: 'Book Pakka Seat'
    },
    {
      id: 'pool-2',
      type: 'ladies',
      badgeTitle: 'LADIES ONLY POOL PASS',
      tagline: 'Flyover Express (Fastest)',
      subTag: 'Subsidized by Zepto',
      oldPrice: '₹150',
      savePct: null,
      driver: {
        name: 'Pooja Hegde',
        role: 'Product Lead',
        company: 'Zepto Kadubeesanahalli',
        rating: 4.99,
        totalSafars: 312,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        carModel: 'HYUNDAI CRETA 1.5',
        carPlate: 'KA 51 MB 4210'
      },
      pickupTime: '08:50 AM',
      pickupLocation: 'Sony Signal Koramangala',
      durationText: '25 mins (Flyover Pass)',
      dropoffTime: '09:15 AM',
      dropoffLocation: 'Kadubeesanahalli',
      waypoints: ['Sony Signal Koramangala', 'Agara Elevated Corridor', 'Kadubeesanahalli'],
      perks: [
        { icon: '🤫', text: 'Work In Silence' },
        { icon: '⚡', text: 'FASTag Express' },
        { icon: '🔋', text: 'Fast Phone Chargers' }
      ],
      price: '₹110',
      seatsAvailable: 3,
      seatsTotal: 4,
      btnStyle: 'btn-book-orange',
      btnText: 'Request Seat'
    },
    {
      id: 'pool-3',
      type: 'budget',
      badgeTitle: 'BUDGET FRIENDLY POOL',
      tagline: 'Smart Hybrid',
      subTag: 'Lowest Fare Guarantee',
      oldPrice: null,
      savePct: null,
      driver: {
        name: 'Vikram Sundaram',
        role: 'DevOps Lead',
        company: 'Amazon Bagmane Tech Park',
        rating: 4.88,
        totalSafars: 190,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        carModel: 'MARUTI BREZZA SMART HYBRID',
        carPlate: 'KA 03 NA 1928'
      },
      pickupTime: '08:30 AM',
      pickupLocation: 'HSR 27th Main',
      durationText: '42 mins',
      dropoffTime: '09:12 AM',
      dropoffLocation: 'Bellandur Ecospace',
      waypoints: ['HSR 27th Main', 'Iblur Junction Flyover', 'Bellandur Ecospace'],
      perks: [
        { icon: '🍃', text: 'Hybrid Eco Commute' },
        { icon: '❄️', text: 'Comfort AC' }
      ],
      price: '₹65',
      seatsAvailable: 1,
      seatsTotal: 4,
      btnStyle: 'btn-book-dark',
      btnText: 'Book Seat (₹65)'
    }
  ];

  return (
    <div>
      {/* Header Row */}
      <div className="matched-header-row">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="matched-title">Matched Carpools</span>
          <span className="matched-count-pill">38 Available</span>
        </div>

        <div style={{
          background: '#131824',
          border: '1px solid #1E2738',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '0.78rem',
          color: '#CBD5E1',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer'
        }}>
          <span>Sort: <strong>Pakka Match (Fastest)</strong></span>
          <ChevronDown size={14} color="#94A3B8" />
        </div>
      </div>

      {/* Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {pools.map((item) => (
          <div key={item.id} className="safar-match-card">
            
            {/* Top Badges */}
            <div className="card-top-badges">
              {item.type === 'pakka' && (
                <div className="pakka-pick-tag">
                  <span>🌟</span>
                  <span>{item.badgeTitle}</span>
                </div>
              )}

              {item.type === 'ladies' && (
                <div className="ladies-pass-tag">
                  <span>🌸</span>
                  <span>{item.badgeTitle}</span>
                </div>
              )}

              {item.type === 'budget' && (
                <div className="budget-pick-tag">
                  <span>💰 {item.badgeTitle}</span>
                </div>
              )}

              <div className="zero-toll-tag">
                <span>⚡ {item.tagline}</span>
              </div>

              {item.subTag && (
                <div style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '6px' }}>
                  {item.subTag}
                </div>
              )}

              {item.oldPrice && (
                <div className="save-percent-pill">
                  <span style={{ textDecoration: 'line-through', color: '#64748B', marginRight: '6px' }}>
                    Was {item.oldPrice}
                  </span>
                  <span>{item.savePct}</span>
                </div>
              )}
            </div>

            {/* Driver Profile */}
            <div className="driver-profile-row">
              <div className="driver-main-info">
                <div className="driver-img-wrapper">
                  <img 
                    src={item.driver.avatar} 
                    alt={item.driver.name} 
                    className="driver-img"
                  />
                  <div className="driver-verified-check">
                    <CheckCircle2 size={10} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span className="driver-name-text">{item.driver.name}</span>
                    <span className="driver-role-text">{item.driver.role}</span>
                  </div>

                  <div className="driver-metrics-sub">
                    <span style={{ color: '#F59E0B' }}>★ {item.driver.rating}</span>
                    <span style={{ color: '#64748B' }}> ({item.driver.totalSafars}+ Safars)</span>
                    <span style={{ color: '#64748B' }}> • </span>
                    <span style={{ color: '#38BDF8' }}>{item.driver.company}</span>
                  </div>
                </div>
              </div>

              <div className="driver-car-right">
                <div>{item.driver.carModel}</div>
                <div className="driver-car-plate">{item.driver.carPlate}</div>
              </div>
            </div>

            {/* Timeline Route Step */}
            <div className="safar-timeline-box">
              <div className="timeline-times-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F5D4' }} />
                  <span className="timeline-time-val">{item.pickupTime}</span>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Pickup</span>
                </div>

                <div className="timeline-duration-badge">
                  {item.durationText}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
                  <span className="timeline-time-val">{item.dropoffTime}</span>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Drop</span>
                </div>
              </div>

              {/* Waypoint text */}
              <div className="timeline-waypoints-row">
                <span>↗ {item.waypoints[0]}</span>
                <span>➔</span>
                <span>{item.waypoints[1]}</span>
                <span>➔</span>
                <span className="timeline-waypoint">{item.waypoints[2]}</span>
              </div>
            </div>

            {/* Perks Row */}
            <div className="perks-row">
              {item.perks.map((p, idx) => (
                <div key={idx} className="perks-chip">
                  <span>{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Price & Action Row */}
            <div className="card-action-row">
              <div className="price-display-group">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span className="price-main-val">{item.price}</span>
                  <span className="price-per-seat">/ seat</span>
                  {item.type === 'ladies' && (
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textDecoration: 'line-through' }}>
                      seat ₹150
                    </span>
                  )}
                </div>

                <div className="seats-dots-indicator">
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginRight: '4px' }}>Available:</span>
                  {Array.from({ length: item.seatsTotal }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`seat-mini-dot ${idx < (item.seatsTotal - item.seatsAvailable) ? 'filled' : ''}`} 
                    />
                  ))}
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginLeft: '6px' }}>
                    {item.seatsAvailable === 1 ? 'Only 1 seat left' : `${item.seatsAvailable} seats left`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  className="btn-chat-icon"
                  onClick={() => onOpenChat && onOpenChat(item)}
                  title="Chat with driver / co-riders"
                >
                  <MessageSquare size={16} />
                </button>

                <button 
                  className={item.btnStyle}
                  onClick={() => onSelectPool(item)}
                >
                  <span>{item.btnText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
