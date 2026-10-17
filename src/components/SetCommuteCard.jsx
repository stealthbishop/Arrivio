import React, { useState } from 'react';
import { 
  Crosshair, 
  ArrowUpDown, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Search,
  Sparkles,
  MapPin,
  Building2
} from 'lucide-react';

export default function SetCommuteCard({
  origin,
  setOrigin,
  destination,
  setDestination,
  onSearch,
  selectedCity = 'bengaluru'
}) {
  const isBengaluru = selectedCity === 'bengaluru';

  const [ladiesPoolOnly, setLadiesPoolOnly] = useState(true);
  const [selectedChips, setSelectedChips] = useState({
    chaiStop: true,
    chilledAC: true,
    lofiMusic: true,
    shantiMode: false,
    evSubsidy: true,
    corpColleagues: true
  });

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const toggleChip = (key) => {
    setSelectedChips(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setLadiesPoolOnly(false);
    setSelectedChips({
      chaiStop: false,
      chilledAC: false,
      lofiMusic: false,
      shantiMode: false,
      evSubsidy: false,
      corpColleagues: false
    });
  };

  return (
    <div className="safar-box">
      {/* Card Header */}
      <div className="commute-card-header">
        <div className="commute-card-title">
          <span style={{ color: '#E5A93C', fontSize: '18px' }}>⚡</span>
          <span>Set Today's Commute</span>
        </div>

        <div className="corp-verified-tag">
          <CheckCircle2 size={12} />
          <span>{isBengaluru ? 'Flipkart Commute' : 'Verified Corporate'}</span>
        </div>
      </div>

      {/* Origin Input */}
      <div className="safar-input-group">
        <label className="safar-input-label">
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F5D4' }} />
          <span>ORIGIN (LANDMARK / METRO)</span>
        </label>
        <div className="safar-input-wrapper">
          <input 
            type="text"
            className="safar-text-input"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <Crosshair size={16} color="#00F5D4" style={{ cursor: 'pointer' }} />
        </div>
        <div className="safar-sub-hint">
          <MapPin size={11} />
          <span>
            {isBengaluru 
              ? 'Near Silk Board Metro Pillar 84 (2 min walk)' 
              : 'Near Rajiv Chowk Metro Gate 4 (2 min walk)'}
          </span>
        </div>
      </div>

      {/* Swap Button */}
      <button 
        className="safar-swap-btn" 
        onClick={handleSwap}
        title="Swap Origin & Destination"
      >
        <ArrowUpDown size={14} />
      </button>

      {/* Destination Input */}
      <div className="safar-input-group">
        <label className="safar-input-label">
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
          <span>WORK TECH PARK</span>
        </label>
        <div className="safar-input-wrapper">
          <input 
            type="text"
            className="safar-text-input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <Building2 size={16} color="#94A3B8" />
        </div>
        <div className="safar-sub-hint" style={{ color: '#94A3B8' }}>
          <span>
            {isBengaluru ? 'Gate 2 Tech Park Drop Zone' : 'DLF Cyber City Building 10 Drop Zone'}
          </span>
        </div>
      </div>

      {/* Departure Window Box */}
      <div style={{ marginTop: '16px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.04em' }}>
            DEPARTURE WINDOW
          </span>
          <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 700 }}>
            Peak Pricing Post 9:00 AM
          </span>
        </div>

        <div style={{
          background: '#0B0E17',
          border: '1px solid #1E2738',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="#F59E0B" />
            <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#FFFFFF' }}>
              08:30 AM – 09:15 AM
            </span>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
            ±10 mins flex
          </span>
        </div>
      </div>

      {/* Desi Ride Preferences Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          DESI RIDE PREFERENCES
        </span>
        <button 
          onClick={handleReset}
          style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
        >
          RESET
        </button>
      </div>

      {/* Ladies Special Pink Pool Card */}
      <div 
        className="ladies-pink-card"
        onClick={() => setLadiesPoolOnly(!ladiesPoolOnly)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🌸</span>
          <div>
            <div className="ladies-pink-title">
              <span>Ladies Special Pink Pool</span>
            </div>
            <div className="ladies-pink-desc">
              Verified female drivers & women coworkers only
            </div>
          </div>
        </div>

        <input 
          type="checkbox"
          checked={ladiesPoolOnly}
          onChange={() => setLadiesPoolOnly(!ladiesPoolOnly)}
          style={{ width: '18px', height: '18px', accentColor: '#EC4899', cursor: 'pointer' }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Desi Preference Tags Grid (2x3) */}
      <div className="desi-chips-grid">
        <div 
          className={`desi-chip ${selectedChips.chaiStop ? 'selected' : ''}`}
          onClick={() => toggleChip('chaiStop')}
        >
          <span>☕ Chai / Filter Coffee Stop</span>
          {selectedChips.chaiStop && <span style={{ color: '#E5A93C' }}>●</span>}
        </div>

        <div 
          className={`desi-chip ${selectedChips.chilledAC ? 'selected' : ''}`}
          onClick={() => toggleChip('chilledAC')}
        >
          <span>❄️ Full Chilled AC</span>
        </div>

        <div 
          className={`desi-chip ${selectedChips.lofiMusic ? 'selected' : ''}`}
          onClick={() => toggleChip('lofiMusic')}
        >
          <span>🎵 Bollywood Lo-fi & Retro</span>
        </div>

        <div 
          className={`desi-chip ${selectedChips.shantiMode ? 'selected' : ''}`}
          onClick={() => toggleChip('shantiMode')}
        >
          <span>🤫 Shanti Mode (Quiet)</span>
        </div>

        <div 
          className={`desi-chip ${selectedChips.evSubsidy ? 'selected' : ''}`}
          onClick={() => toggleChip('evSubsidy')}
        >
          <span>⚡ EV Only (₹20 Subsidy)</span>
        </div>

        <div 
          className={`desi-chip ${selectedChips.corpColleagues ? 'selected' : ''}`}
          onClick={() => toggleChip('corpColleagues')}
        >
          <span>🏢 {isBengaluru ? 'Flipkart Colleagues' : 'Techpark Colleagues'}</span>
        </div>
      </div>

      {/* Main Search CTA */}
      <button 
        className="btn-search-safar"
        onClick={onSearch}
      >
        <Search size={18} />
        <span>Search 38 Matched Rides</span>
      </button>

      {/* 100% Corporate Verified Footer Box */}
      <div style={{
        marginTop: '20px',
        background: '#0B0E17',
        border: '1px solid #1E2738',
        borderRadius: '10px',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10B981',
          flexShrink: 0
        }}>
          <ShieldCheck size={18} />
        </div>

        <div>
          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
            100% Corporate Verified
          </div>
          <div style={{ fontSize: '0.73rem', color: '#94A3B8', lineHeight: 1.45 }}>
            Every rider and driver holds active official corporate work-email & Aadhaar verification. Zero commercial cabs.
          </div>
        </div>
      </div>

    </div>
  );
}
