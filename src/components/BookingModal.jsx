import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Car, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Ticket, 
  ArrowRight,
  Briefcase,
  Users
} from 'lucide-react';

export default function BookingModal({
  ride,
  onClose,
  onConfirmBooking
}) {
  const [selectedSeat, setSelectedSeat] = useState('Front Seat');
  const [luggageSize, setLuggageSize] = useState('1 Carry-on');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!ride) return null;

  const seats = [
    { id: 'Front Seat', label: 'Front Passenger', price: ride.currentSharedFarePerSeat, occupied: false },
    { id: 'Rear Left', label: 'Rear Left (Window)', price: ride.currentSharedFarePerSeat, occupied: ride.existingPassengers.some(p => p.seat === 'Rear Left') },
    { id: 'Rear Right', label: 'Rear Right (Window)', price: ride.currentSharedFarePerSeat, occupied: ride.existingPassengers.some(p => p.seat === 'Rear Right') },
  ];

  const handleConfirm = () => {
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F5D4', '#06D6A0', '#6366F1', '#FFB703']
    });

    const bookingData = {
      bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      rideId: ride.id,
      driver: ride.driver,
      vehicle: ride.vehicle,
      origin: ride.origin,
      destination: ride.primaryDestination,
      departureTime: ride.departureTime,
      seat: selectedSeat,
      fare: ride.currentSharedFarePerSeat,
      luggage: luggageSize,
      pinCode: Math.floor(1000 + Math.random() * 9000),
      status: 'Confirmed & En Route',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedBooking(bookingData);
    onConfirmBooking(bookingData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(7, 9, 14, 0.82)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'rgba(15, 22, 38, 0.96)',
          border: '1px solid rgba(0, 245, 212, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          id="close-booking-modal-btn"
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
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {!confirmedBooking ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-teal">
                <ShieldCheck size={13} /> SECURE RIDE ALLOCATION
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
              Reserve Your Shared Seat
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '20px' }}>
              Departing from {ride.origin.name} at <strong>{ride.departureTime}</strong> with {ride.driver.name}.
            </p>

            {/* Interactive Vehicle Seat Schematic */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Select Your Preferred Seat:
              </label>

              <div style={{
                background: 'rgba(11, 15, 25, 0.8)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Front (Dashboard)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rear Row</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      id={`seat-choice-${seat.id.toLowerCase().replace(/\s+/g, '-')}`}
                      disabled={seat.occupied}
                      onClick={() => setSelectedSeat(seat.id)}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        background: seat.occupied 
                          ? 'rgba(255, 255, 255, 0.02)' 
                          : selectedSeat === seat.id 
                            ? 'linear-gradient(135deg, rgba(0, 245, 212, 0.2) 0%, rgba(6, 214, 160, 0.2) 100%)' 
                            : 'rgba(255, 255, 255, 0.04)',
                        border: seat.occupied 
                          ? '1px dashed rgba(255, 255, 255, 0.08)' 
                          : selectedSeat === seat.id 
                            ? '1.5px solid var(--teal-primary)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: seat.occupied ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                        {seat.occupied ? '👤' : selectedSeat === seat.id ? '💺' : '🪑'}
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: seat.occupied ? 'var(--text-muted)' : '#FFFFFF' }}>
                        {seat.label}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: seat.occupied ? '#EF476F' : 'var(--teal-primary)', marginTop: '2px' }}>
                        {seat.occupied ? 'Occupied' : `$${seat.price.toFixed(2)}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Luggage Capacity */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Luggage Allowance
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['1 Backpack Only', '1 Carry-on', '2 Checked Bags'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setLuggageSize(size)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      background: luggageSize === size ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: luggageSize === size ? '1px solid var(--teal-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: luggageSize === size ? 'var(--teal-primary)' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '22px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Shared Route Corridor Fare:</span>
                <span>${ride.currentSharedFarePerSeat.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Trust, Safety & Live Tracking:</span>
                <span style={{ color: 'var(--teal-primary)' }}>Included</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span>Total Due:</span>
                <span style={{ color: 'var(--teal-primary)' }}>${ride.currentSharedFarePerSeat.toFixed(2)}</span>
              </div>
            </div>

            {/* Confirm CTA Button */}
            <button
              id="confirm-seat-booking-btn"
              className="btn btn-primary"
              onClick={handleConfirm}
              style={{ width: '100%', padding: '12px', fontSize: '0.96rem' }}
            >
              <span>Confirm Reservation & Generate Boarding Pass</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Confirmed Digital Boarding Pass */
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(6, 214, 160, 0.15)',
              border: '2px solid #06D6A0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <CheckCircle2 size={32} color="#06D6A0" />
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Seat Confirmed!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '20px' }}>
              Your digital boarding pass has been registered with {ride.driver.name}.
            </p>

            {/* Digital Pass Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 25, 42, 0.98) 0%, rgba(11, 18, 32, 0.95) 100%)',
              border: '1.5px solid var(--teal-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'left',
              boxShadow: 'var(--shadow-teal)',
              marginBottom: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(255, 255, 255, 0.15)', paddingBottom: '14px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>BOARDING PASS</span>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF' }}>{confirmedBooking.bookingId}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DEPARTURE</span>
                  <div style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>{confirmedBooking.departureTime}</div>
                </div>
              </div>

              {/* Ride Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DRIVER & CAR</div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>{confirmedBooking.driver.name}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{confirmedBooking.vehicle.model}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--teal-primary)' }}>Plate: {confirmedBooking.vehicle.plate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SEAT ALLOCATED</div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>{confirmedBooking.seat}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Luggage: {confirmedBooking.luggage}</div>
                  <div style={{ fontSize: '0.76rem', color: '#06D6A0' }}>Paid: ${confirmedBooking.fare.toFixed(2)}</div>
                </div>
              </div>

              {/* Pickup Verification PIN Code */}
              <div style={{
                background: 'rgba(0, 245, 212, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BOARDING VERIFICATION PIN</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--teal-primary)' }}>
                    {confirmedBooking.pinCode}
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '160px', textAlign: 'right' }}>
                  Provide this 4-digit PIN to driver at curb pickup.
                </div>
              </div>
            </div>

            <button
              id="finish-booking-btn"
              className="btn btn-primary"
              onClick={onClose}
              style={{ width: '100%', padding: '11px' }}
            >
              Done & View Active Rides
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
