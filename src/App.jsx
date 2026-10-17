import React, { useState } from 'react';
import SafarNavbar from './components/SafarNavbar';
import LiveDispatchTicker from './components/LiveDispatchTicker';
import SafarHero from './components/SafarHero';
import SetCommuteCard from './components/SetCommuteCard';
import MatchedCarpoolsList from './components/MatchedCarpoolsList';
import RightSidebarWidgets from './components/RightSidebarWidgets';
import SafarBookingModal from './components/SafarBookingModal';
import AutoPayModal from './components/AutoPayModal';
import MyTrips from './components/MyTrips';
import FareSplitCalculator from './components/FareSplitCalculator';
import { 
  Sparkles, 
  TrendingUp, 
  Leaf, 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Zap,
  Share2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('find-rides');
  const [selectedCity, setSelectedCity] = useState('bengaluru');
  
  const [origin, setOrigin] = useState('HSR Layout Sector 2 (Opp. BDA Complex)');
  const [destination, setDestination] = useState('Bellandur Ecospace, ORR');
  
  const [selectedPoolForModal, setSelectedPoolForModal] = useState(null);
  const [isAutoPayOpen, setIsAutoPayOpen] = useState(false);
  const [sosBanner, setSosBanner] = useState(false);

  // Active bookings list
  const [bookings, setBookings] = useState([
    {
      bookingId: 'SAFAR-839102',
      driver: {
        name: 'Rahul Verma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rating: 4.96,
        totalRides: 540
      },
      vehicle: {
        model: 'TATA NEXON EV MAX',
        plate: 'KA • 01 MJ 8820'
      },
      origin: { name: 'HSR Layout Sector 2 (Opp. BDA Complex)' },
      destination: { name: 'Bellandur Ecospace Gate 2, ORR' },
      departureTime: '08:45 AM',
      seat: 'Rear Left',
      fare: 85.00,
      pinCode: 4892,
      status: 'Active • Driver 4m Away (Silk Board Ramp)',
      timestamp: '08:41 AM'
    }
  ]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (city === 'delhi') {
      setOrigin('Connaught Place (Inner Circle Gate 4)');
      setDestination('DLF Cyber Hub, Gurugram');
    } else {
      setOrigin('HSR Layout Sector 2 (Opp. BDA Complex)');
      setDestination('Bellandur Ecospace, ORR');
    }
  };

  const handleConfirmBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const triggerSosNotice = () => {
    setSosBanner(true);
    setTimeout(() => setSosBanner(false), 5000);
  };

  return (
    <div className="safar-app-container">
      {/* 1. Top Desi Navbar */}
      <SafarNavbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeBookingCount={bookings.length}
        selectedCity={selectedCity}
        setSelectedCity={handleCityChange}
      />

      {/* 2. Top Live Dispatch Ticker */}
      <LiveDispatchTicker selectedCity={selectedCity} />

      {/* SOS Alert Notice if triggered */}
      {sosBanner && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.95)',
          color: '#FFFFFF',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 700,
          fontSize: '0.86rem',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚨</span>
            <span>Suraksha Shield Active: Bengaluru City Police (112) notified with live GPS coordinates. Emergency contacts alerted via WhatsApp.</span>
          </div>
          <button 
            onClick={() => setSosBanner(false)}
            style={{ background: '#FFFFFF', color: '#DC2626', border: 'none', borderRadius: '4px', padding: '4px 10px', fontWeight: 800, cursor: 'pointer' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'find-rides' && (
          <div>
            {/* Hero Greeting & Rush Alert */}
            <SafarHero 
              selectedCity={selectedCity} 
              onBookPreRush={() => {
                const firstCard = document.querySelector('.safar-match-card');
                if (firstCard) firstCard.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3-Column Main Grid Layout from Screenshot */}
            <div className="safar-main-grid">
              {/* Column 1: Set Today's Commute */}
              <div>
                <SetCommuteCard 
                  origin={origin}
                  setOrigin={setOrigin}
                  destination={destination}
                  setDestination={setDestination}
                  onSearch={() => {}}
                  selectedCity={selectedCity}
                />
              </div>

              {/* Column 2: Matched Carpools (38 Available) */}
              <div>
                <MatchedCarpoolsList 
                  onSelectPool={(pool) => setSelectedPoolForModal(pool)}
                  onOpenChat={(pool) => {
                    setActiveTab('my-commutes');
                  }}
                />
              </div>

              {/* Column 3: Transit Corridor Leaflet Map, Bachat Meter, UPI AutoPay */}
              <div>
                <RightSidebarWidgets 
                  selectedCity={selectedCity}
                  onTriggerSos={triggerSosNotice}
                  onOpenAutoPayModal={() => setIsAutoPayOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Safar Match & Compare */}
        {activeTab === 'match-compare' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px' }}>
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="pakka-pick-tag">
                  <Sparkles size={12} /> TECH CORRIDOR CONCURRENCY MATRIX
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                Compare Verified Office Carpools
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '0.96rem' }}>
                All 38 active corporate carpool groups along Silk Board, HSR, Bellandur, and Marathahalli tech parks.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '20px'
            }}>
              {[
                { name: 'Rahul Verma', role: 'Senior Architect', corp: 'Wipro Bellandur', car: 'TATA NEXON EV MAX', time: '08:45 AM', detour: 'Silk Board Flyover Ramp', price: '₹85', solo: '₹380', seats: '2 left', co2: '-3.2 kg' },
                { name: 'Pooja Hegde', role: 'Product Lead', corp: 'Zepto Kadubeesanahalli', car: 'HYUNDAI CRETA 1.5', time: '08:50 AM', detour: 'Agara Elevated Corridor', price: '₹110', solo: '₹420', seats: '3 left', co2: '-2.8 kg' },
                { name: 'Vikram Sundaram', role: 'DevOps Lead', corp: 'Amazon Bagmane', car: 'MARUTI BREZZA SMART HYBRID', time: '08:30 AM', detour: 'Iblur Flyover', price: '₹65', solo: '₹340', seats: '1 left', co2: '-2.4 kg' },
                { name: 'Deepak Rao', role: 'Staff Eng', corp: 'Flipkart Bellandur', car: 'MAHINDRA XUV400 EV', time: '09:00 AM', detour: 'Sarjapur Rd Express', price: '₹95', solo: '₹390', seats: '2 left', co2: '-3.4 kg' },
              ].map((item, idx) => (
                <div key={idx} className="safar-box" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span className="pakka-pick-tag">★ VERIFIED CO-WORKER</span>
                    <span style={{ fontSize: '0.72rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                      {item.detour}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '4px' }}>{item.name}</h3>
                  <div style={{ fontSize: '0.76rem', color: '#38BDF8', marginBottom: '12px' }}>
                    {item.role} • {item.corp}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#E2E8F0', marginBottom: '10px' }}>
                    🚘 {item.car}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #1E2738', borderBottom: '1px solid #1E2738', marginBottom: '14px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#94A3B8' }}>Pickup: <strong style={{ color: '#fff' }}>{item.time}</strong></span>
                    <span style={{ color: '#00E599' }}>{item.seats}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E5A93C' }}>{item.price}</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748B', textDecoration: 'line-through', marginLeft: '6px' }}>{item.solo}</span>
                    </div>
                    <button 
                      className="btn-book-gold"
                      onClick={() => setSelectedPoolForModal({
                        id: `compare-${idx}`,
                        badgeTitle: 'PAKKA SAATHI PICK',
                        tagline: 'Zero Toll Delay',
                        driver: { name: item.name, role: item.role, company: item.corp, rating: 4.96, totalSafars: 380, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', carModel: item.car, carPlate: 'KA 01 MJ 8820' },
                        pickupLocation: 'HSR BDA (Metro Pillar 42)',
                        dropoffLocation: 'Bellandur Ecospace',
                        pickupTime: item.time,
                        dropoffTime: '09:20 AM',
                        durationText: '28 mins',
                        price: item.price,
                        oldPrice: item.solo,
                        seatsAvailable: 2,
                        seatsTotal: 4
                      })}
                    >
                      <span>Select Pool</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Meri Bookings */}
        {activeTab === 'my-commutes' && (
          <MyTrips 
            bookings={bookings}
            onCancelBooking={(id) => setBookings(b => b.filter(item => item.bookingId !== id))}
            onExploreRides={() => setActiveTab('find-rides')}
          />
        )}

        {/* Tab: Khaata & UPI Wallet */}
        {activeTab === 'impact-tracker' && (
          <div style={{ maxWidth: '1200px', margin: '36px auto', padding: '0 24px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="pakka-pick-tag">
                  <Leaf size={12} /> DESI BACHAT & CARBON TELEMETRY
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                Your Monthly Commute Bachat & Carbon Ledger
              </h1>
              <p style={{ color: '#94A3B8' }}>
                Zero commission, transparent community carpooling. See exactly where your rupee goes.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="safar-box" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase' }}>November Bachat</div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#E5A93C', margin: '8px 0' }}>₹9,450</div>
                <div style={{ fontSize: '0.78rem', color: '#10B981' }}>78.4% saved vs Ola/Uber solo cabs</div>
              </div>

              <div className="safar-box" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase' }}>CO₂ Emissions Avoided</div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10B981', margin: '8px 0' }}>-84.2 kg</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Equivalent to 6 mature trees planted</div>
              </div>

              <div className="safar-box" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase' }}>HOV Commute Streak</div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#38BDF8', margin: '8px 0' }}>14 Safars 🔥</div>
                <div style={{ fontSize: '0.78rem', color: '#00E599' }}>Chaayos Bun Maska coupon active</div>
              </div>

              <div className="safar-box" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase' }}>Flyover Time Saved</div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFFFFF', margin: '8px 0' }}>4.8 hrs</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Bypassed Silk Board bumper jams</div>
              </div>
            </div>

            {/* Embedded Transparent Fare Calculator */}
            <FareSplitCalculator 
              selectedHub={{
                name: 'Silk Board to Bellandur Ecospace',
                code: 'ORR-TECH',
                defaultDestinations: [{ name: 'Ecospace, Outer Ring Road', distanceKm: 28 }]
              }}
            />
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedPoolForModal && (
        <SafarBookingModal 
          pool={selectedPoolForModal}
          onClose={() => setSelectedPoolForModal(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* UPI AutoPay Mandate Modal */}
      {isAutoPayOpen && (
        <AutoPayModal 
          onClose={() => setIsAutoPayOpen(false)}
        />
      )}

      {/* High-Tech Desi Bottom Footer matching screenshot */}
      <footer style={{
        background: '#080B12',
        borderTop: '1px solid #1A2232',
        padding: '24px',
        fontSize: '0.75rem',
        color: '#64748B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontWeight: 600 }}>
          <span>🛡️ Proudly Made in India for Daily Indian Commuters • Safe, Verified Corporate Network</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#sos" onClick={(e) => { e.preventDefault(); triggerSosNotice(); }} style={{ color: '#EF4444', textDecoration: 'none', fontWeight: 700 }}>
            🚨 SOS & 24x7 Helpline
          </a>
          <a href="#pink-pool" style={{ color: '#EC4899', textDecoration: 'none' }}>Women Only Pink Pool</a>
          <a href="#fastag" style={{ color: '#94A3B8', textDecoration: 'none' }}>FASTag & Toll Rules</a>
          <a href="#autopay" onClick={(e) => { e.preventDefault(); setIsAutoPayOpen(true); }} style={{ color: '#94A3B8', textDecoration: 'none' }}>
            UPI AutoPay FAQs
          </a>
          <a href="#corporate" style={{ color: '#94A3B8', textDecoration: 'none' }}>Corporate Hub Guidelines</a>
        </div>

        <div style={{ color: '#475569', fontSize: '0.7rem' }}>
          SafarSaathi Mobility Solutions Pvt Ltd © {new Date().getFullYear()}. Built for high-velocity urban tech corridors.
        </div>
      </footer>
    </div>
  );
}
