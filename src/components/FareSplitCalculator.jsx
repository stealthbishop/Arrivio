import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  Leaf, 
  HelpCircle, 
  Zap, 
  Car, 
  ShieldCheck, 
  Flame, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { calculateFareBreakdown } from '../utils/fareCalculator';

export default function FareSplitCalculator({ selectedHub }) {
  const [distanceKm, setDistanceKm] = useState(28);
  const [coRiderCount, setCoRiderCount] = useState(3);
  const [tollAmount, setTollAmount] = useState(6.50);
  const [isElectric, setIsElectric] = useState(true);
  const [fuelPrice, setFuelPrice] = useState(1.35);

  const breakdown = useMemo(() => {
    return calculateFareBreakdown({
      distanceKm,
      passengerCount: coRiderCount,
      fuelPricePerLiter: fuelPrice,
      tollAmount,
      isElectric,
    });
  }, [distanceKm, coRiderCount, fuelPrice, tollAmount, isElectric]);

  // Comparative tiers for 1, 2, 3, 4 passengers
  const comparisonTiers = useMemo(() => {
    return [1, 2, 3, 4].map(count => {
      const calc = calculateFareBreakdown({
        distanceKm,
        passengerCount: count,
        fuelPricePerLiter: fuelPrice,
        tollAmount,
        isElectric,
      });
      return {
        count,
        fare: calc.passengerFare,
        savingsPercent: calc.savingsPercent,
      };
    });
  }, [distanceKm, fuelPrice, tollAmount, isElectric]);

  return (
    <div className="fare-calculator-container animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-teal">
            <Calculator size={13} /> 100% TRANSPARENT PRICING
          </span>
          <span className="badge badge-emerald">
            <Leaf size={13} /> ECO BENEFIT ENGINE
          </span>
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
          How Fare Splitting Works on Arrivio
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '750px' }}>
          No hidden surge multipliers or algorithmic gouging. Fares are calculated directly from verified trip costs, shared tolls, and equitable driver commute compensation.
        </p>
      </div>

      {/* Preset Delhi NCR Commute Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Delhi-NCR Route Presets:</span>
        <button
          id="preset-cp-cyberhub"
          className="btn btn-secondary"
          onClick={() => { setDistanceKm(32); setTollAmount(100.0); setIsElectric(true); }}
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
        >
          📍 CP → Cyber Hub (32 km)
        </button>
        <button
          id="preset-igi-noida"
          className="btn btn-secondary"
          onClick={() => { setDistanceKm(38); setTollAmount(100.0); setIsElectric(true); }}
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
        >
          📍 IGI T3 → Noida 62 (38 km)
        </button>
        <button
          id="preset-hauzkhas-cybercity"
          className="btn btn-secondary"
          onClick={() => { setDistanceKm(24); setTollAmount(100.0); setIsElectric(false); }}
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
        >
          📍 Hauz Khas → Cyber City (24 km)
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 420px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Controls Column */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Adjust Variables</h3>

          {/* Commute Distance */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Commute Distance
              </label>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                {distanceKm} km ({Math.round(distanceKm * 0.621)} miles)
              </span>
            </div>
            <input
              id="calc-distance-slider"
              type="range"
              min="5"
              max="70"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Co-riders Count */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Number of Matched Passengers Sharing the Car
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  id={`calc-passengers-btn-${num}`}
                  onClick={() => setCoRiderCount(num)}
                  style={{
                    background: coRiderCount === num ? 'linear-gradient(135deg, var(--teal-primary) 0%, var(--emerald) 100%)' : 'rgba(255, 255, 255, 0.05)',
                    color: coRiderCount === num ? '#07090E' : 'var(--text-secondary)',
                    border: coRiderCount === num ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {num} {num === 1 ? 'Rider' : 'Riders'}
                </button>
              ))}
            </div>
          </div>

          {/* Tolls Input */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Highway & Bridge Tolls ($)
              </label>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#A5B4FC' }}>
                ${tollAmount.toFixed(2)}
              </span>
            </div>
            <input
              id="calc-tolls-slider"
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={tollAmount}
              onChange={(e) => setTollAmount(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Electric Vehicle Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color={isElectric ? '#00F5D4' : '#94A3B8'} />
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#fff' }}>Electric Vehicle (EV)</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Lower fuel cost & zero tailpipe emissions</div>
              </div>
            </div>
            <input
              id="calc-electric-toggle"
              type="checkbox"
              checked={isElectric}
              onChange={(e) => setIsElectric(e.target.checked)}
              style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#00F5D4' }}
            />
          </div>

          {/* Fuel Price slider if not electric */}
          {!isElectric && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fuel Price per Liter</span>
                <span style={{ fontSize: '0.85rem', color: '#fff' }}>${fuelPrice.toFixed(2)}</span>
              </div>
              <input
                id="calc-fuel-price-slider"
                type="range"
                min="0.9"
                max="2.5"
                step="0.05"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="range-slider"
              />
            </div>
          )}
        </div>

        {/* Results & Visual Breakdown Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Price Comparison Card */}
          <div className="glass-panel" style={{
            padding: '28px',
            background: 'linear-gradient(135deg, rgba(16, 25, 42, 0.95) 0%, rgba(20, 32, 54, 0.9) 100%)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--shadow-teal)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Transparent Arrivio Shared Fare (सब मिलाकर शेयर)
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                    ₹{breakdown.passengerFare}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ person</span>
                </div>
              </div>

              {/* Comparison Callout */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solo Cab (Ola/Uber) Estimate</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#EF4444', textDecoration: 'line-through' }}>
                  ₹{breakdown.soloEstimatedCost}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#06D6A0', marginTop: '2px' }}>
                  You Save ₹{breakdown.individualSavings} ({breakdown.savingsPercent}%)
                </div>
              </div>
            </div>

            {/* Eco Benefit Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '20px',
              padding: '12px 16px',
              background: 'rgba(6, 214, 160, 0.1)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(6, 214, 160, 0.25)'
            }}>
              <Leaf size={20} color="#06D6A0" />
              <div>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#06D6A0' }}>
                  {breakdown.co2SavedKg} kg CO₂ emissions prevented
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                  (Eliminating {coRiderCount - 1} separate single-occupancy vehicles from the corridor)
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Tier Multi-bar Comparison */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>
              Scale of Savings by Carpool Capacity
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {comparisonTiers.map((tier) => {
                const isCurrent = tier.count === coRiderCount;
                const widthPercent = Math.max(25, Math.round((tier.fare / breakdown.soloEstimatedCost) * 100));

                return (
                  <div key={tier.count} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '100px', fontSize: '0.84rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--teal-primary)' : 'var(--text-secondary)' }}>
                      {tier.count} {tier.count === 1 ? 'Solo Rider' : 'Carpoolers'}
                    </div>

                    <div style={{ flex: 1, height: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        width: `${widthPercent}%`,
                        height: '100%',
                        background: isCurrent 
                          ? 'linear-gradient(90deg, #00F5D4, #06D6A0)' 
                          : 'rgba(99, 102, 241, 0.55)',
                        borderRadius: 'var(--radius-pill)',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>

                    <div style={{ width: '80px', textAlign: 'right', fontWeight: 700, fontSize: '0.92rem', color: isCurrent ? 'var(--teal-primary)' : '#FFFFFF' }}>
                      ₹{tier.fare}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Itemized Ledger: Where does your money go? */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="var(--teal-primary)" />
              <span>Transparent Itemized Breakdown (किराये का पूरा हिसाब)</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {breakdown.lineItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>{item.label}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{item.explanation}</div>
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                    ₹{item.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Driver Take-Home Contribution:
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06D6A0' }}>
                ~₹{breakdown.driverEarningsOffset.toFixed(2)} (Direct commute offset)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
