import React from 'react';
import { Clock } from 'lucide-react';

export default function SafarHero({ selectedCity = 'bengaluru', onBookPreRush }) {
  const isBengaluru = selectedCity === 'bengaluru';

  return (
    <div className="safar-hero-area">
      <div>
        <div className="safar-hero-tag">
          DAILY DESI RIDE FINDER • {isBengaluru ? 'Bengaluru Tech Corridor Engine' : 'Delhi-NCR Expressway Engine'}
        </div>

        <h1 className="safar-hero-title">
          Namaste Ananya! Ready for your <span className="gold-highlight">office commute?</span>
        </h1>

        <p className="safar-hero-subtitle">
          {isBengaluru 
            ? 'Save ₹400+ daily on Silk Board, HSR & Outer Ring Road bumper-to-bumper jams while sharing peaceful rides with verified tech co-workers.'
            : 'Save ₹400+ daily on NH-48, Dhaula Kuan & Cyber City bumper-to-bumper jams while sharing peaceful rides with verified tech co-workers.'}
        </p>
      </div>

      {/* Rush Alert Card */}
      <div className="rush-alert-card">
        <div className="rush-alert-icon">
          <Clock size={20} />
        </div>

        <div>
          <div className="rush-alert-title">RUSH ALERT</div>
          <div className="rush-alert-desc">
            {isBengaluru ? 'Post 9:00 AM ORR surge expected' : 'Post 9:00 AM NH-48 surge expected'}
          </div>
        </div>

        <button 
          className="btn-book-prerush"
          onClick={onBookPreRush}
        >
          Book Pre-Rush
        </button>
      </div>
    </div>
  );
}
