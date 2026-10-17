import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Car, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Zap,
  TrendingDown
} from 'lucide-react';
import { createBookingOnBackend } from '../utils/apiClient';

export default function MatchReviewModal({
  match,
  onClose,
  onConfirm
}) {
  const [selectedSeat, setSelectedSeat] = useState('Rear Left');
  const [confirmed, setConfirmed] = useState(false);
  const [pinCode, setPinCode] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [bookingToken, setBookingToken] = useState('AR-948210');

  if (!match) return null;

  const handleConfirmReservation = async () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#00F5D4', '#00E599', '#38BDF8', '#FFFFFF']
    });

    const numericFare = parseFloat(match.price.replace(/[^0-9.]/g, '')) || 120.0;
    const bookingPayload = {
      rideId: match.id,
      passengerName: 'Alex Morgan',
      seat: selectedSeat,
      pickupLocation: match.pickupLocation,
      dropoffLocation: match.dropoffLocation,
      pickupTime: match.pickupTime,
      dropoffTime: match.dropoffTime,
      fare: numericFare
    };

    const backendResult = await createBookingOnBackend(bookingPayload);
    const assignedToken = backendResult?.id || `AR-DEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const assignedPin = backendResult?.pinCode || pinCode;

    setBookingToken(assignedToken);
    setPinCode(assignedPin);
    setConfirmed(true);

    onConfirm({
      bookingId: assignedToken,
      driver: match.driver,
      seat: selectedSeat,
      pickup: match.pickupLocation,
      dropoff: match.dropoffLocation,
      pickupTime: match.pickupTime,
      dropoffTime: match.dropoffTime,
      price: match.price,
      pinCode: assignedPin,
      status: 'Active • En Route'
    });
  };

  const [paymentMode, setPaymentMode] = useState('UPI');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 9, 14, 0.85)',
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
        maxWidth: '540px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#0B1119',
        border: '1px solid rgba(0, 245, 212, 0.35)',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 245, 212, 0.15)',
        position: 'relative'
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
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="match-pill-pct">
                <Sparkles size={12} /> {match.score}
              </span>
              <span className="detour-pill">{match.detour}</span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
              Confirm Delhi-NCR Corridor Seat
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '16px' }}>
              Synchronized commuter carpool with {match.driver.name}.
            </p>

            {/* Driver Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#0E1622',
              border: '1px solid #1A2433',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <img 
                src={match.driver.avatar} 
                alt={match.driver.name} 
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00F5D4' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.96rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{match.driver.name}</span>
                  <CheckCircle2 size={14} color="#00F5D4" />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{match.driver.car}</div>
                <div style={{ fontSize: '0.72rem', color: '#00F5D4', marginTop: '2px' }}>
                  🛡️ Aadhaar & Office ID Verified Commuter
                </div>
              </div>
            </div>

            {/* Trajectory Breakdown */}
            <div style={{
              background: '#0E1622',
              border: '1px solid #1A2433',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#00F5D4', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Delhi-NCR Route Timeline
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F5D4' }} />
                    <span style={{ fontSize: '0.86rem', color: '#FFFFFF', fontWeight: 600 }}>{match.pickupLocation}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#00F5D4', fontWeight: 700 }}>{match.pickupTime}</span>
                </div>

                <div style={{ borderLeft: '2px dashed #1B293C', marginLeft: '3px', paddingLeft: '14px', fontSize: '0.74rem', color: '#64748B' }}>
                  Via NH-48 Express Corridor (+22 km/h over solo cab in rush hour)
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E599' }} />
                    <span style={{ fontSize: '0.86rem', color: '#FFFFFF', fontWeight: 600 }}>{match.dropoffLocation}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: '#00E599', fontWeight: 700 }}>{match.dropoffTime}</span>
                </div>
              </div>
            </div>

            {/* Local Indian Payment Method Selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Payment Method • भुगतान का तरीका
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)', icon: '⚡' },
                  { id: 'Cash', label: 'Cash / Handover to Driver', icon: '💵' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setPaymentMode(mode.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: paymentMode === mode.id ? 'rgba(0, 245, 212, 0.15)' : '#0E1622',
                      border: paymentMode === mode.id ? '1.5px solid #00F5D4' : '1px solid #1A2433',
                      color: paymentMode === mode.id ? '#00F5D4' : '#94A3B8',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{mode.icon} {mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fare & FASTag Breakdown */}
            <div style={{
              background: '#070C12',
              borderRadius: '10px',
              border: '1px solid #172231',
              padding: '14px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '6px' }}>
                <span>Base Distance Fare:</span>
                <span style={{ color: '#FFFFFF' }}>₹95.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '8px' }}>
                <span>FASTag Toll Split (MCD / Border):</span>
                <span style={{ color: '#00F5D4' }}>+ ₹25.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '8px', borderTop: '1px dashed #1A2433' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Total You Pay (सब मिलाकर)</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00F5D4' }}>{match.price}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: '#EF4444', textDecoration: 'line-through' }}>{match.soloPrice}</div>
                  <span style={{ fontSize: '0.74rem', color: '#00E599', fontWeight: 700 }}>
                    You save 77% vs solo cab!
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Guarantee Banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 229, 153, 0.08)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0, 229, 153, 0.25)', marginBottom: '18px' }}>
              <ShieldCheck size={18} color="#00E599" />
              <div style={{ fontSize: '0.74rem', color: '#CBD5E1' }}>
                <strong>Delhi Police 112 & Live WhatsApp Share Enabled</strong>. 24/7 ride telemetry monitored.
              </div>
            </div>

            {/* CTA Button */}
            <button
              id="confirm-match-reservation-btn"
              className="btn-match-cta"
              onClick={handleConfirmReservation}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.94rem' }}
            >
              <span>Confirm & Lock In Seat (सीट कन्फर्म करें)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          /* Confirmed Boarding Pass HUD */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(0, 245, 212, 0.15)',
              border: '2px solid #00F5D4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={30} color="#00F5D4" />
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
              Delhi-NCR Carpool Confirmed! 🎉
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '20px' }}>
              Your digital boarding token has been synced with {match.driver.name}'s vehicle.
            </p>

            <div style={{
              background: '#070C12',
              border: '1.5px solid #00F5D4',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '20px',
              boxShadow: '0 0 24px rgba(0, 245, 212, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #1B293C', paddingBottom: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>CARPOOL TOKEN</div>
                  <div style={{ fontWeight: 800, color: '#FFFFFF' }}>{bookingToken}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>PICKUP ETA</div>
                  <div style={{ fontWeight: 700, color: '#00F5D4' }}>{match.pickupTime}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>BOARDING VERIFICATION PIN</div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#00F5D4', letterSpacing: '4px' }}>
                    {pinCode}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.76rem', color: '#94A3B8' }}>
                  Seat: <strong>{selectedSeat}</strong><br/>
                  Vehicle: <strong>{match.driver.car.split('•')[0]}</strong><br/>
                  Paid via: <strong>{paymentMode}</strong>
                </div>
              </div>

              {/* 1-Tap WhatsApp Share */}
              <button
                onClick={() => {
                  const text = `Hi! I booked Arrivio carpool with ${match.driver.name} (${match.driver.car.split('•')[0]}). Pickup at ${match.pickupLocation} at ${match.pickupTime}. Live tracking: http://localhost:8080/?token=${bookingToken}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                style={{
                  width: '100%',
                  background: '#25D366',
                  color: '#070B11',
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
              className="btn-match-cta"
              onClick={onClose}
              style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
            >
              Done & View Live Delhi Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
