import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Share2, 
  Clock, 
  MapPin, 
  Car,
  ArrowRight
} from 'lucide-react';

export default function SafarBookingModal({ pool, onClose, onConfirm }) {
  const [selectedSeat, setSelectedSeat] = useState('Rear Left');
  const [confirmed, setConfirmed] = useState(false);
  const [pinCode] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [token] = useState(() => `SAFAR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [paymentMode, setPaymentMode] = useState('UPI AutoPay');

  if (!pool) return null;

  const handleConfirm = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5A93C', '#F59E0B', '#10B981', '#FFFFFF']
    });

    setConfirmed(true);

    if (onConfirm) {
      onConfirm({
        bookingId: token,
        driver: pool.driver,
        seat: selectedSeat,
        pickup: pool.pickupLocation,
        dropoff: pool.dropoffLocation,
        pickupTime: pool.pickupTime,
        dropoffTime: pool.dropoffTime,
        price: pool.price,
        pinCode,
        status: 'Active • Pakka Seat Confirmed'
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 14, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#131824',
        border: '1.5px solid rgba(229, 169, 60, 0.35)',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(229, 169, 60, 0.15)',
        position: 'relative',
        color: '#FFFFFF'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!confirmed ? (
          <div>
            {/* Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pakka-pick-tag">
                <span>🌟</span> {pool.badgeTitle}
              </span>
              <span className="zero-toll-tag">
                <span>⚡</span> {pool.tagline}
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
              Lock in Your Pakka Seat
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '18px' }}>
              Office carpool with {pool.driver.name} ({pool.driver.role} at {pool.driver.company}).
            </p>

            {/* Driver Profile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#0B0F17',
              border: '1px solid #1E2738',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <img 
                src={pool.driver.avatar} 
                alt={pool.driver.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E5A93C' }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.96rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{pool.driver.name}</span>
                  <CheckCircle2 size={14} color="#10B981" />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  {pool.driver.carModel} • {pool.driver.carPlate}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#F59E0B', marginTop: '2px' }}>
                  ★ {pool.driver.rating} ({pool.driver.totalSafars}+ Safars) • Verified Corporate ID
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{
              background: '#0B0F17',
              border: '1px solid #1E2738',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#00F5D4' }}>
                  ● {pool.pickupLocation}
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {pool.pickupTime}
                </span>
              </div>
              <div style={{ paddingLeft: '12px', borderLeft: '2px dashed #1E2838', marginLeft: '3px', fontSize: '0.74rem', color: '#94A3B8', paddingBottom: '8px' }}>
                Via Flyover Express ({pool.durationText})
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#F59E0B' }}>
                  ● {pool.dropoffLocation}
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {pool.dropoffTime}
                </span>
              </div>
            </div>

            {/* Seat Selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Choose Your Seat
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Front Seat', 'Rear Left', 'Rear Right'].map(seat => (
                  <button
                    key={seat}
                    type="button"
                    onClick={() => setSelectedSeat(seat)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: selectedSeat === seat ? 'rgba(229, 169, 60, 0.15)' : '#0B0F17',
                      border: selectedSeat === seat ? '1.5px solid #E5A93C' : '1px solid #1E2738',
                      color: selectedSeat === seat ? '#E5A93C' : '#94A3B8',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Mode */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {['UPI AutoPay (Recommended)', 'Cash to Driver'].map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: paymentMode === mode ? 'rgba(229, 169, 60, 0.15)' : '#0B0F17',
                      border: paymentMode === mode ? '1.5px solid #E5A93C' : '1px solid #1E2738',
                      color: paymentMode === mode ? '#E5A93C' : '#94A3B8',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Fare Summary */}
            <div style={{
              background: '#0B0F17',
              border: '1px solid #1E2738',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Total You Pay (सब मिलाकर)</div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#E5A93C' }}>
                    {pool.price}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {pool.oldPrice && (
                    <div style={{ fontSize: '0.8rem', color: '#EF4444', textDecoration: 'line-through' }}>
                      Solo Cab: {pool.oldPrice}
                    </div>
                  )}
                  <div style={{ fontSize: '0.76rem', color: '#10B981', fontWeight: 700 }}>
                    Instant Zero-Toll Delay Corridor
                  </div>
                </div>
              </div>
            </div>

            {/* Book CTA */}
            <button
              className="btn-book-gold"
              onClick={handleConfirm}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.96rem' }}
            >
              <span>Confirm & Book Pakka Seat (सीट बुक करें)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          /* Confirmation Pass */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(229, 169, 60, 0.15)',
              border: '2px solid #E5A93C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={30} color="#E5A93C" />
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              Pakka Seat Confirmed! 🎉
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '20px' }}>
              Your digital boarding token is synced with {pool.driver.name}'s vehicle.
            </p>

            <div style={{
              background: '#0B0F17',
              border: '1.5px solid #E5A93C',
              borderRadius: '12px',
              padding: '18px',
              textAlign: 'left',
              marginBottom: '20px',
              boxShadow: '0 0 24px rgba(229, 169, 60, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #1E2838', paddingBottom: '10px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>CARPOOL TOKEN</div>
                  <div style={{ fontWeight: 800, color: '#FFFFFF' }}>{token}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>PICKUP ETA</div>
                  <div style={{ fontWeight: 800, color: '#E5A93C' }}>{pool.pickupTime}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>BOARDING VERIFICATION PIN</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#E5A93C', letterSpacing: '4px' }}>
                    {pinCode}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.76rem', color: '#94A3B8' }}>
                  Seat: <strong>{selectedSeat}</strong><br/>
                  Vehicle: <strong>{pool.driver.carModel}</strong><br/>
                  Method: <strong>{paymentMode}</strong>
                </div>
              </div>

              {/* WhatsApp Share Button */}
              <button
                onClick={() => {
                  const text = `Hi! I booked my SafarSaathi carpool with ${pool.driver.name} (${pool.driver.carModel} • ${pool.driver.carPlate}). Pickup at ${pool.pickupLocation} at ${pool.pickupTime}. Live tracking: http://localhost:8080/?token=${token}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                style={{
                  width: '100%',
                  background: '#25D366',
                  color: '#0C0F17',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <span>📲 Share Live Trip Details on WhatsApp</span>
              </button>
            </div>

            <button
              className="btn-book-gold"
              onClick={onClose}
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Done & View Live Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
