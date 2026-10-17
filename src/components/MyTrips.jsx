import React, { useState } from 'react';
import { 
  Ticket, 
  Car, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  ShieldAlert, 
  Share2, 
  CheckCircle2, 
  AlertTriangle,
  QrCode,
  User,
  ArrowRight
} from 'lucide-react';

export default function MyTrips({
  bookings,
  onCancelBooking,
  onExploreRides
}) {
  const [activeChatBookingId, setActiveChatBookingId] = useState(bookings[0]?.bookingId || null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Elena (Driver)', text: 'Hi team! Just pulled up to Connaught Place Inner Circle Gate 4 pickup bay. Blue Tata Nexon EV (DL 01 EV 9821) with hazards on.', time: '08:16', isDriver: true },
    { id: 2, sender: 'Alex (You)', text: 'Hey Elena, just came out of Rajiv Chowk Metro Gate 4, walking to the car now!', time: '08:18', isDriver: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [sharedAlert, setSharedAlert] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDriver: false,
      },
    ]);
    setInputText('');
  };

  const handleShareTrip = () => {
    setSharedAlert(true);
    setTimeout(() => setSharedAlert(false), 3000);
  };

  return (
    <div className="my-trips-container animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '6px' }}>My Active Shared Bookings</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Manage your ride passes, track arrival vehicles, and coordinate with matched co-riders.
        </p>
      </div>

      {sharedAlert && (
        <div style={{
          background: 'rgba(0, 245, 212, 0.15)',
          border: '1px solid var(--teal-primary)',
          color: 'var(--teal-primary)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} />
          <span>Live GPS tracking link copied! Anyone with the link can follow your arrival in real-time.</span>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center' }}>
          <Ticket size={48} color="var(--teal-primary)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>No active bookings yet</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 24px', fontSize: '0.92rem' }}>
            Search for arrivals matching your flight or commute destination, and reserve your first seat!
          </p>
          <button
            id="empty-trips-explore-btn"
            className="btn btn-primary"
            onClick={onExploreRides}
          >
            Explore Matched Rides
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(360px, 1fr) 420px',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Bookings List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                id={`booking-card-${booking.bookingId}`}
                className="glass-panel"
                style={{
                  padding: '24px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-teal">
                      <span className="live-pulse" style={{ width: '6px', height: '6px' }}></span> {booking.status}
                    </span>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      Pass: <strong>{booking.bookingId}</strong>
                    </span>
                  </div>

                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                    ₹{booking.fare.toFixed(2)}
                  </div>
                </div>

                {/* Ride route */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--teal-primary)' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{booking.origin.name}</span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                      Departs {booking.departureTime}
                    </span>
                  </div>

                  <div style={{ width: '2px', height: '12px', background: 'rgba(255, 255, 255, 0.15)', marginLeft: '4px' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFB703' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{booking.destination.name}</span>
                    <span style={{ fontSize: '0.76rem', color: '#06D6A0', marginLeft: 'auto' }}>
                      Reserved Seat: {booking.seat}
                    </span>
                  </div>
                </div>

                {/* Driver details + PIN */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={booking.driver.avatar}
                      alt={booking.driver.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{booking.driver.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {booking.vehicle.model} • {booking.vehicle.plate}
                      </div>
                    </div>
                  </div>

                  {/* Verification PIN */}
                  <div style={{
                    background: 'rgba(0, 245, 212, 0.1)',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>BOARDING PIN</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--teal-primary)', letterSpacing: '2px' }}>
                      {booking.pinCode}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      id={`share-trip-btn-${booking.bookingId}`}
                      className="btn btn-secondary"
                      onClick={handleShareTrip}
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      <Share2 size={14} />
                      <span>Share Trip</span>
                    </button>

                    <button
                      id={`open-chat-btn-${booking.bookingId}`}
                      className="btn btn-secondary"
                      onClick={() => setActiveChatBookingId(booking.bookingId)}
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      <MessageSquare size={14} />
                      <span>Co-rider Chat</span>
                    </button>
                  </div>

                  <button
                    id={`cancel-booking-btn-${booking.bookingId}`}
                    className="btn btn-ghost"
                    onClick={() => onCancelBooking(booking.bookingId)}
                    style={{ fontSize: '0.78rem', color: '#FF4D6D' }}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Group Chat & Live Ride Status Side Panel */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '560px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={16} color="var(--teal-primary)" />
                  <span>Carpool Group Chat</span>
                </h4>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Driver & Matched Passengers
                </div>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                <span className="live-pulse" style={{ width: '5px', height: '5px' }}></span> 3 Online
              </span>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px' }}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: msg.sender === 'You' 
                      ? 'linear-gradient(135deg, rgba(0, 245, 212, 0.25) 0%, rgba(6, 214, 160, 0.25) 100%)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: msg.sender === 'You' ? '1px solid var(--teal-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: msg.isDriver ? '#FFB703' : 'var(--teal-primary)' }}>
                      {msg.sender}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#FFFFFF', lineHeight: 1.4 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <input
                id="group-chat-input"
                type="text"
                className="input-field"
                placeholder="Message your co-riders & driver..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '9px 12px' }}
              />
              <button
                id="group-chat-send-btn"
                type="submit"
                className="btn btn-primary"
                style={{ padding: '8px 14px' }}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
