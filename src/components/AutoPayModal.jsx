import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, CreditCard, Lock } from 'lucide-react';

export default function AutoPayModal({ onClose }) {
  const [mandateLimit, setMandateLimit] = useState(500);
  const [autoSettle, setAutoSettle] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1200);
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
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#131824',
        border: '1.5px solid #1E2738',
        borderRadius: '16px',
        padding: '28px',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Zap size={18} color="#F59E0B" />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>UPI AutoPay & Khaata Mandate</h2>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '20px', lineHeight: 1.5 }}>
          Authorized NPCI e-Mandate linked to your corporate UPI ID for friction-free contactless boarding.
        </p>

        {/* Linked UPI Account Info */}
        <div style={{
          background: '#0B0F17',
          border: '1px solid #1E2738',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>LINKED UPI VPA</span>
            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>● Active & Verified</span>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#E5A93C' }}>
            ananya.sharma@oksbi
          </div>
          <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>
            State Bank of India (Salary Account •• 4912)
          </div>
        </div>

        {/* Daily Mandate Cap Slider */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>
              Daily Maximum Mandate Cap
            </label>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#E5A93C' }}>
              ₹{mandateLimit}
            </span>
          </div>
          <input 
            type="range"
            min="200"
            max="1500"
            step="50"
            value={mandateLimit}
            onChange={(e) => setMandateLimit(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#E5A93C', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748B', marginTop: '4px' }}>
            <span>₹200</span>
            <span>₹850</span>
            <span>₹1,500</span>
          </div>
        </div>

        {/* Auto Settle Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0B0F17',
          padding: '12px 14px',
          borderRadius: '10px',
          marginBottom: '22px'
        }}>
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>Instant Driver Scan-in Settlement</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Deduct fare only after driver verifies your boarding PIN</div>
          </div>
          <input 
            type="checkbox"
            checked={autoSettle}
            onChange={(e) => setAutoSettle(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#E5A93C', cursor: 'pointer' }}
          />
        </div>

        <button
          className="btn-book-gold"
          onClick={handleSave}
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
        >
          {saved ? 'Mandate Saved ✓' : 'Update AutoPay Settings'}
        </button>
      </div>
    </div>
  );
}
