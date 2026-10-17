import React from 'react';
import { Radio, Leaf, TrendingUp, Users } from 'lucide-react';

export default function LiveDispatchTicker({ selectedCity = 'bengaluru' }) {
  const isBengaluru = selectedCity === 'bengaluru';

  return (
    <div className="safar-dispatch-ticker">
      {/* Red Pulse Badge */}
      <div className="dispatch-badge">
        <span className="dispatch-dot-pulse" />
        <span>{isBengaluru ? 'ORR LIVE DISPATCH' : 'DELHI-NCR LIVE DISPATCH'}</span>
      </div>

      <span style={{ color: '#334155' }}>|</span>

      {/* Traffic Item 1 */}
      <div className="dispatch-item">
        <span>{isBengaluru ? 'Outer Ring Road (ORR) Peak Jam:' : 'NH-48 Sirhaul Toll Peak Jam:'}</span>
        <strong className="highlight-jam">
          {isBengaluru ? 'Heavy at Marathahalli flyover' : 'Moderate at Ambience Mall'}
        </strong>
      </div>

      <span style={{ color: '#334155' }}>•</span>

      {/* Traffic Item 2 */}
      <div className="dispatch-item">
        <span>{isBengaluru ? 'Silk Board Flyover Ramp:' : 'Dhaula Kuan Underpass:'}</span>
        <strong className="highlight-flowing">
          {isBengaluru ? 'Flowing (4 min clearance)' : 'Flowing (3 min clearance)'}
        </strong>
      </div>

      <span style={{ color: '#334155' }}>•</span>

      {/* Metric 1 */}
      <div className="dispatch-item">
        <strong style={{ color: '#E5A93C' }}>482 active tech carpools live</strong>
      </div>

      <span style={{ color: '#334155' }}>•</span>

      {/* Metric 2 */}
      <div className="dispatch-item" style={{ color: '#10B981' }}>
        <Leaf size={13} />
        <span>12,480 kg CO₂ avoided today</span>
      </div>

      <span style={{ color: '#334155' }}>|</span>

      {/* Corporate hubs */}
      <div className="dispatch-item" style={{ color: '#64748B' }}>
        {isBengaluru ? 'Flipkart • Wipro • Amazon • Infosys Hubs' : 'Google • Microsoft • Zomato • Paytm Hubs'}
      </div>
    </div>
  );
}
