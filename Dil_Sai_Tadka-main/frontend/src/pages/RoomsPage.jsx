import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations/ScrollAnimations';
import { useAuth } from '../context/AuthContext';

const MOCK_ROOMS = [
  { id: 1, name: 'Azure Garden Suite', floor: 'Ground Floor', feature: 'Private Patio', price: 180, rating: 4.9, status: 'Available', view: 'Garden View', bed: 'Queen Size', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-lRaqTWt8VJaNAzNrYjdkD0SjH_Wm10-v437-66brbrKA-iyxm4_RxaLli752i6cfQRisW0AnNxqCELxir1kfQ6IFy09Dg4p1G5JKDX0t6rsPqDeddTWCeIL_S9b6V7dtr7dNbMDvBHBpWW3KNEktMlGRJ72DTVR8_TUGV2eIMBaFhFIVj17ChH8xQqSdcd4Zc23RmUxG16u3GPHxl8BFgxOCvPu4B36CaFJkq9Jh_DCWTgsDG98XLUm6CYxJCw8iGGW4Yu4256E' },
  { id: 2, name: 'Sunset Loft', floor: 'Top Floor', feature: 'Sky Windows', price: 240, rating: 5.0, status: 'Only 2 left', view: 'City View', bed: 'King Size', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Y6fNL9Ff19v8qYcgwvppSYUUcLQetLUBXsMTfTksWD8G2alWUJ8M2RKGoAGLsV675pugx22CLlFgZs8QtKN-3fYz-toePGKhv7QokyhNTzqO8WV9tLxdBy4r5Heg0WrctRWpFAmX4hdN6ZmrykpohVjeqFHLDP2WKbzSiN0NM5XozSuNv9InyloM23lr53cS7hIm7HegtFWeFsk6wmKAjPD8CFpY7L3zKFAFYXBnbIMWGnw4EcE017l0-TrIhT1V3P-Zz5ESS3I' },
  { id: 3, name: 'Olive Grove Suite', floor: 'Internal Courtyard', feature: 'Quiet', price: 165, rating: 4.8, status: 'Available', view: 'Quiet Zone', bed: 'Full Amenities', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnUQJE0p5m1xPdFeBlWL1cWxBX4oGsy7Yf-6147j79pgyT3gRkEMntIKprh8HnaI07J5lTtoaB-JLjaLTRVJcmGPwt0V760MEIWiQCzfBl_ssO-pwtKl_hjmFwPwbHOb-Hrt71vkYX1shvel86sX-fo4B-6UIn9wOYyNdYz1VoXDDAAo1bCoT8XqHZx2BakCq_39vIXa3JtZYX_Ka91VdaNG_V0Cuhfu7HTOdA1_OZBoYI3Pz_XQlxgCXixlzWkF2c2vAy7Nrn6pc' },
];

const amenities = [
  { icon: 'wifi', label: 'Fiber Wifi' },
  { icon: 'breakfast_dining', label: "Chef's Breakfast" },
  { icon: 'pool', label: 'Private Plunge' },
];

export default function RoomsPage() {
  const { isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  return (
    <div className="pt-20 pb-20">
      {/* Hero */}
      <header className="pt-12 pb-8 px-5 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <ScrollReveal className="flex-1 space-y-5" direction="left">
            <span className="inline-block px-4 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-[11px] font-semibold tracking-wider uppercase">
              Boutique Hospitality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Your Serene Escape Awaits.
            </h1>
            <p className="text-base text-secondary max-w-xl leading-relaxed">
              Experience the perfect blend of high-end culinary art and boutique comfort. Hand-curated rooms designed for the modern soul.
            </p>
            <div className="flex flex-wrap gap-5 pt-2">
              {amenities.map(a => (
                <div key={a.icon} className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-xl">{a.icon}</span>
                  <span className="text-sm font-semibold">{a.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="flex-1 w-full relative" direction="right" delay={0.2}>
            <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-warm-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ff4Cdn-Pes0NmgrSo7PhetFoq3HorDzas8siiPwLcZcQ0TBdEsaDatT11dhQcykIdAJKKTOeG6OMGiA1Zc6Rk7Rm6X43QPOMc4pgsZbP_Ch1qH9mmmHEEq8Z9nVbcnq7ovSmYae-GsH5EvE5I0uREaZoZGCGjsEdqAkbo-T-XKPe2ja0lusAJaBNFuRwO1NbifURHatKmgVe8I_8nHvnfyySBDAv0Aej3zXv2KFPanQ_d2I4ZRwbpkYnNPsRlPWDiSZprh1WDJU"
                alt="Boutique Room"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </header>

      {/* Search Bar */}
      <section className="px-5 md:px-16 max-w-[1440px] mx-auto -mt-4 relative z-10">
        <div className="bg-surface shadow-warm-xl rounded-[32px] p-5 md:p-7 border border-surface-variant/30 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-1">
            <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">Check In</label>
            <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="date" className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 px-5 text-sm focus:ring-2 focus:ring-primary-container" />
          </div>
          <div className="flex-1 w-full space-y-1">
            <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">Check Out</label>
            <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="date" className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 px-5 text-sm focus:ring-2 focus:ring-primary-container" />
          </div>
          <div className="flex-1 w-full space-y-1">
            <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">Guests</label>
            <select className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 px-5 text-sm focus:ring-2 focus:ring-primary-container appearance-none">
              <option>2 Adults, 1 Room</option>
              <option>1 Adult, 1 Room</option>
              <option>2 Adults, 2 Rooms</option>
            </select>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} className="w-full md:w-auto bg-primary text-on-primary text-sm font-semibold py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">search</span> Search
          </motion.button>
        </div>
      </section>

      {/* Room Listings */}
      <main className="py-14 px-5 md:px-16 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Discover Our Suites</h2>
          <p className="text-sm text-secondary mb-10">Every corner tells a story of comfort and design.</p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {MOCK_ROOMS.map(room => (
            <StaggerItem key={room.id}>
              <motion.article whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }} className="group bg-surface rounded-[36px] overflow-hidden shadow-warm">
                <div className="relative h-64 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md ${room.status === 'Available' ? 'bg-tertiary-container/90 text-on-tertiary-container' : 'bg-primary-container/90 text-on-primary-container'}`}>
                      {room.status === 'Available' && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                      {room.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-surface/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                    <p className="text-lg font-bold text-primary">${room.price}<span className="text-[11px] font-normal text-secondary">/night</span></p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-primary">{room.name}</h3>
                      <p className="text-sm text-on-surface-variant mt-0.5">{room.floor} • {room.feature}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined fill-icon text-base">star</span>
                      <span className="text-sm font-bold">{room.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-semibold uppercase tracking-wider">{room.view}</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">{room.bed}</span>
                  </div>
                  <Link to={isAuthenticated ? '/bookings' : '/login'}>
                    <motion.button whileTap={{ scale: 0.95 }} className="w-full py-3.5 rounded-2xl bg-primary-container text-on-primary-container text-sm font-semibold hover:shadow-md transition-all">
                      Book This Room
                    </motion.button>
                  </Link>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </main>
    </div>
  );
}
