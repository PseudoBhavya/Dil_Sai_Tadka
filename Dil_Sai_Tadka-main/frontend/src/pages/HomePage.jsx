import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations/ScrollAnimations';
import ScrollFloat from '../components/animations/ScrollFloat';
import HeroBgLayer from '../components/HeroBgLayer';
import FloatingCard from '../components/FloatingCard';
import useReducedMotion from '../utils/useReducedMotion';

// Isolated image
const COOKIE_IMG = '/cookie-isolated.png';
const SPICE1 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ba03CdKs6wQ0p_Wys5vDpU3Ii8Va2VRGg_YuVz0t4VVcoiPmPnZbg2GCH11PECrXUineU1njeCQ3Wpu1CyxHwbPz1WRqHY0Sa_CmVB6LCKk98SrwwiurSozRCMGGDtXa6A54dVkDLTAFmcLnDLEMheV0nyybdZSJS_ycOo2cpD3s_O9OmhC3OCDwT2vN5oJxWzLSR-B2msvLrpCVcnRq4m1twq_hy_5Ecx6Y1dSIh8F8CsIuFIlaWW3D023-wxtd_E3YAJMSVSo';
const SPICE2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeinEqT03VTnNvXGxAaHez0vyarrvI9zPWY2KYiPq0i8Wvb_KI7IgeqIqCnjXQiyBeYs7CMcHdnejRNbvrlkZa0ns3x17oaQKkvpaRGjVq3WM3z4EvoCY_cRYSHyFNbE52ZKbohg5PQIY7jUVwFmqRDP3nOnpyvbeYANkNbuiO32w9l-M-_GBUOQDQrrobAkK3cKVMxNwYysg1zjkWA04RJzUrXcd6vBG5GQp4SM6ytl8oRKrqFdf4ELxm07whnwucJvTl1demzg0';
const FOOD_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMC2Un1ff1zjCXq2cRA8WTlYHapTvlNviW6pM-jm3MGeST0lFPSYLug84wr04ed5M-uvDX9DggRrJXDW0pVY2BoIXwzPyGVKh3j-dng4i9DrxU140KIx2X3uhQd3FgPD9AgFfkZBU8CBQqtHGqwgEuhb8d_QBSQTocinbqV5KLN3tt5XSL-a57-oTQHupPb8ynQN94kqdFPHQPwWPEd2mgJBd3NmEQbZvEKN9hdg17tKesZiqKnHiC6tp9jQHIPOaOL0G0JVAZeX4';
const ROOM_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-GaT_D95tX5g7Ae3zBjYldcKw6JGhcPWRrL3WHjtC2cquD84gEpDeW6W8KeyJ3UU5ip1VEF6ZSY_3027UQ8f6foX5OXPcZPc9GcornjQERQAvu0mPw17G1xiZoMXrhUZDSZzgKYNVAgd_vaYMWtSDqfKXiAriAPipAHQw4V2gIlNKTgrjmAwBRqcLPNZiiNimu7VBDrTLFFWb-d-2ObiszR7FF5keKa04NnXPplvt1lhijah8nAXE4WPwJVuoJ0MAffOlROH6PNU';

export default function HomePage() {
  const heroRef = useRef(null);

  const reduced = useReducedMotion();

  return (
    <div className="landing-page-theme use-legacy-bg">
      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-28 md:pt-32 flex items-center">
        <HeroBgLayer />

        <div className="max-w-[1440px] mx-auto px-5 md:px-16 w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-1 md:w-1/3 text-left">
              <motion.span className="text-xs font-bold tracking-[0.3em] uppercase mb-3 landing-title text-warm-gold block">Taste the Comfort</motion.span>

              <ScrollFloat containerClassName="mb-4" textClassName="landing-heading text-4xl md:text-6xl" animationDuration={1.2} stagger={0.05}>
                Dil Se Tadka
              </ScrollFloat>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }} className="text-base md:text-lg text-white/80 max-w-xl mt-2 leading-relaxed italic">
                Premium Lodgings & Restaurant Experience. Where home-inspired cinematic hospitality meets culinary mastery.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link to="/menu" className="flex items-center justify-center gap-3 bg-primary text-on-primary px-10 py-3 rounded-full text-sm font-bold tracking-widest shadow-xl hover:brightness-105 active:scale-95 transition-all duration-300 landing-title">
                  <span>Savor the Menu</span>
                </Link>
                <Link to="/rooms" className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md text-white px-10 py-3 rounded-full text-sm font-bold tracking-widest border border-white/20 hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all duration-300 landing-title">
                  <span>Reserve a Room</span>
                </Link>
              </div>
            </motion.div>

            <div className="flex-1 flex justify-center md:w-1/3">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-w-[520px] rounded-2xl overflow-hidden shadow-warm-xl">
                <img src={FOOD_IMG} alt="Cinematic food" className="w-full h-72 md:h-[420px] object-cover" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            </div>

            <div className="hidden md:flex flex-col gap-6 md:w-1/3 items-end">
              <FloatingCard image={ROOM_IMG} title="Room Preview" subtitle="Boutique stay, curated comfort" className="w-64" />
              <FloatingCard title="98% Booked" subtitle="Popular this month" className="w-56">
                <div className="text-2xl font-bold text-white">98%</div>
              </FloatingCard>
              {!reduced && (
                <FloatingCard title="Top Reviews" subtitle="Cinematic dining" className="w-56">
                  <div className="flex gap-1 text-yellow-400">{[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-icon">star</span>
                  ))}</div>
                </FloatingCard>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTERACTIVE COLLAGE SECTION ========== */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60 text-center mb-2 landing-title text-warm-gold">Discover</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 landing-heading">Your Journey Starts Here</h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-5" staggerDelay={0.1}>
            {/* Food Menu Card — Large */}
            <StaggerItem className="md:col-span-8">
              <Link to="/menu">
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} className="group relative overflow-hidden rounded-[40px] glass-card aspect-[16/9] shadow-warm-lg cursor-pointer border-none">
                  <img src={FOOD_IMG} alt="Food Menu" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex justify-between items-end">
                    <div className="text-white">
                      <h3 className="text-3xl md:text-5xl font-bold mb-1 landing-heading">Food Menu</h3>
                      <p className="text-base md:text-lg opacity-90 max-w-sm">Curated flavors inspired by traditional roots and modern elegance.</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.15, rotate: 45 }} className="bg-white text-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg shrink-0">
                      <span className="material-symbols-outlined text-2xl">arrow_outward</span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>

            {/* Room Booking Card — Tall */}
            <StaggerItem className="md:col-span-4">
              <Link to="/rooms">
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} className="group relative overflow-hidden rounded-[40px] glass-card aspect-[3/4] md:aspect-auto md:h-full shadow-warm-lg cursor-pointer border-none">
                  <img src={ROOM_IMG} alt="Room Booking" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-10">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-1 landing-heading">Room Booking</h3>
                    <p className="text-base md:text-lg text-white opacity-90">Find your perfect escape.</p>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>

            {/* Orders Card */}
            <StaggerItem className="md:col-span-4">
              <Link to="/orders">
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} className="glass-card rounded-[40px] min-h-[280px] shadow-warm flex flex-col justify-center items-center text-center p-8 cursor-pointer border-white/10">
                  <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-white text-4xl">receipt_long</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2 landing-heading">Orders</h3>
                  <p className="text-base text-white/60">Track your culinary journeys and past feasts.</p>
                </motion.div>
              </Link>
            </StaggerItem>

            {/* Reviews Card */}
            <StaggerItem className="md:col-span-4">
              <Link to="/reviews">
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} className="glass-card rounded-[40px] min-h-[280px] shadow-warm flex flex-col justify-between p-8 cursor-pointer border-white/10">
                  <div className="flex gap-1 text-white">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined fill-icon text-xl text-yellow-500">star</span>
                    ))}
                  </div>
                  <blockquote className="text-xl text-white italic leading-relaxed my-6">
                    "The most cinematic dining experience I've ever had. Truly feels like a getaway."
                  </blockquote>
                  <h3 className="text-3xl font-bold text-white landing-heading">Reviews</h3>
                </motion.div>
              </Link>
            </StaggerItem>

            {/* Dashboard Card */}
            <StaggerItem className="md:col-span-4">
              <Link to="/admin">
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} className="glass-card rounded-[40px] min-h-[280px] shadow-warm bg-white/5 p-8 border border-white/10 cursor-pointer flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-bold text-white landing-heading">Dashboard</h3>
                    <span className="material-symbols-outlined text-white text-2xl">dashboard</span>
                  </div>
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                  </div>
                  <p className="text-base text-white/60">Manage your reservations effortlessly.</p>
                </motion.div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <section className="py-16 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16">
          <div className="relative rounded-[48px] overflow-hidden bg-white/5 p-8 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white/10">
            <ScrollReveal className="flex-1 space-y-6" direction="left">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60 landing-title text-warm-gold">Our Philosophy</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight landing-heading">From Farm to Tadka</h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic">
                We believe that great food begins with respect for the land. Every ingredient is sourced from local ethical farms, ensuring that your meal isn't just a dish, but a story of heritage and quality.
              </p>
              <Link to="/menu" className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 rounded-full text-base font-bold hover:scale-105 active:scale-95 transition-all shadow-lg landing-title">
                Read Our Story
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </ScrollReveal>
            <ScrollReveal className="flex-1 w-full" direction="right" delay={0.2}>
              <div className="aspect-square rounded-[32px] overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu4AnzFD4zIWK_9Rk4BwN3jfQMSZBIY-PM3a9BQM3_1yZ3pXxm71pl_FAb3IwxQZxHGbBDVdfUtILf3QyP72JwqSzSCpSj0BYLNVGwxxAoF7NFhj72igPrcbwtx7-KrCR1s5fnNgMIYMtYvoMQtuW_hBV39O5TmGPXf6grpt2rv4VnrlP_FmXMMEIUstlYaGUxB8Mw6aYLgbiWW7Ci_d6hL-9AnparkMTZNz1pm29eQaUHeDdGkY8et64aCfMi-KwPpQpXm92ISqY"
                  alt="Organic farm"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
