import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  HeartHandshake, 
  PhoneCall, 
  CheckCircle2, 
  FileCheck, 
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';

export default function SafetyHub() {
  const [emergencyContact, setEmergencyContact] = useState('+1 (555) 902-1144');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [womenOnlyEnabled, setWomenOnlyEnabled] = useState(false);

  const handleTestSos = () => {
    setSosTriggered(true);
    setTimeout(() => setSosTriggered(false), 4000);
  };

  return (
    <div className="safety-hub-container animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-emerald">
            <ShieldCheck size={13} /> TRUST & COMMUNITY PROTOCOL
          </span>
          <span className="badge badge-teal">
            <Lock size={13} /> END-TO-END ESCROW
          </span>
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
          Trust, Safety & Verified Sharing
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '720px' }}>
          Carpooling with travelers landing at the same hub should be safe, transparent, and mutually beneficial. Here is how Arrivio protects every shared corridor.
        </p>
      </div>

      {sosTriggered && (
        <div style={{
          background: 'rgba(255, 77, 109, 0.15)',
          border: '1px solid #FF4D6D',
          color: '#FF4D6D',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={22} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>SOS Test Dispatched Successfully!</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>
              Simulated notification with live route coordinates sent to {emergencyContact} and Arrivio 24/7 Security Operations.
            </div>
          </div>
        </div>
      )}

      {/* 4 Pillars of Safety Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Pillar 1 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 245, 212, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--teal-primary)',
            marginBottom: '16px'
          }}>
            <FileCheck size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Multi-tier ID Verification</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
            Every driver and co-rider undergoes government photo ID validation, vehicle registration inspection, and corporate or flight boarding pass matching.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#06D6A0' }}>
            <CheckCircle2 size={14} /> 100% Verified Profiles
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255, 77, 109, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FF4D6D',
            marginBottom: '16px'
          }}>
            <Users size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Women-Only Carpool Option</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
            Travelers can choose to exclusively match with verified female drivers and female passengers for complete peace of mind, especially during late-night airport arrivals.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#FF4D6D' }}>
            <CheckCircle2 size={14} /> Dedicated Safety Corridors
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(99, 102, 241, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A5B4FC',
            marginBottom: '16px'
          }}>
            <Lock size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Escrow Fare Protection</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
            Fares are held securely in escrow and only released once the passenger verifies their 4-digit PIN and the vehicle reaches the dropoff coordinate.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#A5B4FC' }}>
            <CheckCircle2 size={14} /> Automated Refund Guarantee
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255, 183, 3, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFB703',
            marginBottom: '16px'
          }}>
            <Eye size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Live Route Anomaly Detection</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
            Our background algorithm monitors telemetry. If an unscheduled stop or severe route detour occurs, our safety center reaches out proactively.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#FFB703' }}>
            <CheckCircle2 size={14} /> 24/7 Automated Geo-fencing
          </div>
        </div>
      </div>

      {/* Interactive Safety Settings & SOS Test Drawer */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Safety & Emergency Settings</h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Trusted Emergency Contact Phone
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                id="emergency-contact-input"
                type="text"
                className="input-field"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
              />
              <button
                id="test-sos-btn"
                className="btn btn-secondary"
                onClick={handleTestSos}
                style={{ borderColor: '#FF4D6D', color: '#FF4D6D', whiteSpace: 'nowrap' }}
              >
                <PhoneCall size={16} />
                <span>Test SOS Dispatch</span>
              </button>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              We will share your live trip route and driver credentials with this number automatically upon boarding.
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Passenger Verification Status</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--teal-primary)', marginTop: '2px' }}>
                  ✓ ID Verified • Flight Pass Sync Active
                </div>
              </div>
              <span className="badge badge-teal">TIER 1 TRUST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
