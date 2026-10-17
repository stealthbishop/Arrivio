import React from 'react';
import { 
  Car, 
  Leaf, 
  Bell, 
  Zap, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function SafarNavbar({ 
  activeTab, 
  setActiveTab, 
  activeBookingCount = 1,
  selectedCity = 'bengaluru',
  setSelectedCity
}) {
  return (
    <header style={{
      background: '#090C13',
      borderBottom: '1px solid #1A2333',
      padding: '12px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
      {/* Brand Logo - SafarSaathi */}
      <div 
        id="safar-brand-logo"
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => setActiveTab('find-rides')}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)'
        }}>
          <span style={{ fontSize: '20px' }}>🚗</span>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.28rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              SafarSaathi
            </span>
            <span style={{
              background: 'rgba(245, 158, 11, 0.16)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#F59E0B',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '4px',
              letterSpacing: '0.06em'
            }}>
              DESI TECH CORRIDOR
            </span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ROZ KA DESI CARPOOL
          </div>
        </div>
      </div>

      {/* Center Nav Pills */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          id="nav-tab-roz-ka-pool"
          onClick={() => setActiveTab('find-rides')}
          style={{
            background: activeTab === 'find-rides' ? '#E5A93C' : 'transparent',
            color: activeTab === 'find-rides' ? '#0C0F17' : '#94A3B8',
            border: activeTab === 'find-rides' ? 'none' : '1px solid transparent',
            fontWeight: 800,
            fontSize: '0.86rem',
            padding: '8px 18px',
            borderRadius: '24px',
            cursor: 'pointer',
            boxShadow: activeTab === 'find-rides' ? '0 0 16px rgba(229, 169, 60, 0.35)' : 'none',
            transition: 'all 0.15s'
          }}
        >
          Roz Ka Pool (Find Rides)
        </button>

        <button
          id="nav-tab-safar-match"
          onClick={() => setActiveTab('match-compare')}
          style={{
            background: activeTab === 'match-compare' ? '#E5A93C' : 'transparent',
            color: activeTab === 'match-compare' ? '#0C0F17' : '#94A3B8',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            padding: '8px 16px',
            borderRadius: '24px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          Safar Match & Compare
        </button>

        <button
          id="nav-tab-meri-bookings"
          onClick={() => setActiveTab('my-commutes')}
          style={{
            background: activeTab === 'my-commutes' ? '#E5A93C' : 'transparent',
            color: activeTab === 'my-commutes' ? '#0C0F17' : '#94A3B8',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            padding: '8px 16px',
            borderRadius: '24px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          Meri Bookings
        </button>

        <button
          id="nav-tab-khaata-wallet"
          onClick={() => setActiveTab('impact-tracker')}
          style={{
            background: activeTab === 'impact-tracker' ? '#E5A93C' : 'transparent',
            color: activeTab === 'impact-tracker' ? '#0C0F17' : '#94A3B8',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            padding: '8px 16px',
            borderRadius: '24px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          Khaata & UPI Wallet
        </button>

        <button
          id="nav-tab-office-network"
          onClick={() => setActiveTab('find-rides')}
          style={{
            background: 'transparent',
            color: '#94A3B8',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
            padding: '8px 16px',
            borderRadius: '24px',
            cursor: 'pointer'
          }}
        >
          Office Network
        </button>
      </nav>

      {/* Right Header Cluster */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        
        {/* City Switcher */}
        {setSelectedCity && (
          <button
            onClick={() => setSelectedCity(c => c === 'bengaluru' ? 'delhi' : 'bengaluru')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid #1E2838',
              borderRadius: '20px',
              padding: '5px 12px',
              color: '#38BDF8',
              fontSize: '0.74rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Click to toggle between Bengaluru ORR and Delhi-NCR corridors"
          >
            <MapPin size={12} color="#38BDF8" />
            <span>{selectedCity === 'bengaluru' ? 'Bengaluru ORR' : 'Delhi-NCR NH-48'}</span>
            <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>⇄</span>
          </button>
        )}

        {/* Bachat & Carbon Pill */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid #1E293B',
          borderRadius: '24px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.78rem'
        }}>
          <span style={{ color: '#F59E0B', fontWeight: 800 }}>₹14,280 Bachat</span>
          <span style={{ color: '#64748B' }}>•</span>
          <span style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Leaf size={12} /> 84 kg CO₂ Saved
          </span>
        </div>

        {/* Notification Bell */}
        <button 
          id="safar-notification-btn"
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
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
            background: '#EF4444',
            boxShadow: '0 0 6px #EF4444'
          }} />
        </button>

        {/* UPI Quick Tap */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid #1E2838',
          borderRadius: '8px',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.74rem',
          color: '#CBD5E1',
          cursor: 'pointer'
        }}>
          <Zap size={13} color="#F59E0B" />
          <span style={{ fontWeight: 700 }}>UPI Quick Tap</span>
        </div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
            alt="Ananya Sharma"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #E5A93C'
            }}
          />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF' }}>Ananya Sharma</div>
            <div style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 600 }}>
              Flipkart Bangalore
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
