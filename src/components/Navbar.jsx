import React from 'react';
import { 
  Car, 
  Leaf, 
  Bell, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab,
  activeBookingCount = 1
}) {
  return (
    <header className="top-navbar">
      {/* Brand Logo - Arrivio in PulsePool tech style */}
      <div 
        id="nav-brand-logo"
        className="brand-badge"
        onClick={() => setActiveTab('find-rides')}
      >
        <div className="brand-icon">
          {/* Cyber interlocking ring icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="12" r="6" stroke="#070B11" strokeWidth="2.5" />
            <circle cx="16" cy="12" r="6" stroke="#070B11" strokeWidth="2.5" />
            <path d="M12 9 C13 10.5 13 13.5 12 15" stroke="#070B11" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="brand-text">ARRIVIO</span>
          <span style={{ 
            fontSize: '0.62rem', 
            letterSpacing: '0.08em', 
            fontWeight: 800, 
            color: '#00F5D4',
            background: 'rgba(0, 245, 212, 0.12)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid rgba(0, 245, 212, 0.3)'
          }}>
            DELHI-NCR MESH
          </span>
        </div>
      </div>

      {/* Pill Navigation Tabs matching the screenshot */}
      <nav className="nav-pills">
        <button
          id="nav-tab-find-rides"
          className={`nav-pill-btn ${activeTab === 'find-rides' ? 'active' : ''}`}
          onClick={() => setActiveTab('find-rides')}
        >
          Find Rides
        </button>

        <button
          id="nav-tab-match-compare"
          className={`nav-pill-btn ${activeTab === 'match-compare' ? 'active' : ''}`}
          onClick={() => setActiveTab('match-compare')}
        >
          Match & Compare
        </button>

        <button
          id="nav-tab-confirm-booking"
          className={`nav-pill-btn ${activeTab === 'confirm-booking' ? 'active' : ''}`}
          onClick={() => setActiveTab('confirm-booking')}
        >
          Confirm Booking
        </button>

        <button
          id="nav-tab-my-commutes"
          className={`nav-pill-btn ${activeTab === 'my-commutes' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-commutes')}
        >
          My Commutes
        </button>

        <button
          id="nav-tab-impact-tracker"
          className={`nav-pill-btn ${activeTab === 'impact-tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact-tracker')}
        >
          Impact Tracker
        </button>
      </nav>

      {/* Right Header Cluster */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* CO2 Saved Pill */}
        <div className="status-pill status-pill-co2">
          <Leaf size={14} color="#00F5D4" />
          <span>-42.8 KG CO₂</span>
        </div>

        {/* Live Ride Active Pill */}
        <div className="status-pill status-pill-live">
          <span className="pulse-dot-cyan" />
          <span style={{ letterSpacing: '0.04em' }}>LIVE RIDE ACTIVE</span>
        </div>

        {/* Notification Bell */}
        <button 
          id="nav-notification-btn"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <Bell size={16} />
          <span style={{
            position: 'absolute',
            top: '7px',
            right: '7px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#00F5D4',
            boxShadow: '0 0 6px #00F5D4'
          }} />
        </button>

        {/* User Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
            alt="User profile" 
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid rgba(0, 245, 212, 0.35)'
            }}
          />
        </div>
      </div>
    </header>
  );
}
