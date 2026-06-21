import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

const socialIcons = [
  { icon: 'language', label: 'Website' },
  { icon: 'mail', label: 'Email' },
  { icon: 'location_on', label: 'Location' },
];

export default function Footer() {
  return (
    <footer className="w-full py-16 md:py-20 mb-16 md:mb-0 bg-black/30 backdrop-blur-md border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand Column */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
              <h2 className="text-2xl font-bold text-white landing-title">Dil Se Tadka</h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Crafting unforgettable boutique experiences through taste and touch. Where home-inspired cinematic hospitality meets culinary mastery.
            </p>
            <div className="flex gap-3 pt-2">
              {socialIcons.map((s) => (
                <motion.a
                  key={s.icon}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={s.label}
                >
                  <span className="material-symbols-outlined text-lg">{s.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { to: '/menu', label: 'Food Menu' },
                { to: '/rooms', label: 'Room Booking' },
                { to: '/orders', label: 'My Orders' },
                { to: '/reviews', label: 'Reviews' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Legal</h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-base">call</span>
                +91 9999999999
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-base">mail</span>
                hello@dilsaitadka.com
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-base">schedule</span>
                Open 7am – 11pm
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 my-8" />

        <p className="text-center text-xs text-white/40">
          © {new Date().getFullYear()} Dil Se Tadka. Crafted for Comfort. All rights reserved. $PseudoBhavya$.  
        </p>
      </div>
    </footer>
  );
}
