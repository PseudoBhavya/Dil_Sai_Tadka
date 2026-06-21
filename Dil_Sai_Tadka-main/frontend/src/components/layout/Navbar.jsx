import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { path: '/menu', label: 'Menu', icon: 'restaurant_menu' },
  { path: '/rooms', label: 'Stays', icon: 'bed' },
  { path: '/orders', label: 'Orders', icon: 'receipt_long' },
  { path: '/reviews', label: 'Reviews', icon: 'rate_review' },
];

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { count } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isLanding = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav shadow-2xl py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="flex justify-between items-center px-5 md:px-16 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.img
              whileHover={{ rotate: 10, scale: 1.1 }}
              src="/logo.png"
              alt="Dil Se Tadka Logo"
              className="w-12 h-12 object-contain"
            />
            <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${!scrolled ? 'text-white' : 'text-primary'}`}>
              Dil Se Tadka
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? (!scrolled ? 'text-white' : 'text-primary')
                    : (!scrolled ? 'text-white/70 hover:text-white' : 'text-secondary hover:text-primary')
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${!scrolled ? 'bg-white' : 'bg-primary'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-full transition-all ${!scrolled ? 'hover:bg-white/10' : 'hover:bg-primary-container/20'}`}
            >
              <span className={`material-symbols-outlined ${!scrolled ? 'text-white' : 'text-primary'}`}>shopping_bag</span>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-0.5 -right-0.5 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center ${!scrolled ? 'bg-white text-primary' : 'bg-primary text-on-primary'}`}
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider hover:scale-105 transition-transform ${!scrolled ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-tertiary-container text-on-tertiary-container'}`}
                  >
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform ${!scrolled ? 'bg-white text-primary' : 'bg-primary-container text-primary'}`}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className={`p-2 transition-colors ${!scrolled ? 'text-white/70 hover:text-white' : 'text-secondary hover:text-error'}`}
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-5 py-2 rounded-full border text-sm font-semibold tracking-wider transition-all ${!scrolled ? 'border-white/30 text-white hover:bg-white/10' : 'border-outline/30 text-primary hover:bg-primary-container/20'}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ${!scrolled ? 'bg-white text-primary' : 'bg-primary text-on-primary'}`}
                >
                  Book Now
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-primary">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface shadow-2xl p-6 pt-20"
            >
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                        location.pathname === link.path
                          ? 'bg-primary-container text-on-primary-container'
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined">{link.icon}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="h-px bg-outline-variant my-4" />

                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container">
                      <span className="material-symbols-outlined">person</span>
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold text-tertiary hover:bg-tertiary-container/20">
                        <span className="material-symbols-outlined">dashboard</span>
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold text-error hover:bg-error-container/20 w-full text-left"
                    >
                      <span className="material-symbols-outlined">logout</span>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold text-primary hover:bg-primary-container/20">
                      <span className="material-symbols-outlined">login</span>
                      Login
                    </Link>
                    <Link to="/register" className="block px-4 py-3 bg-primary text-on-primary rounded-2xl text-sm font-semibold text-center">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 glass-nav shadow-warm-xl z-50 rounded-t-[32px]">
        {[
          { to: '/', icon: 'restaurant', label: 'Explore' },
          { to: '/rooms', icon: 'bed', label: 'Stay' },
          { to: '/cart', icon: 'shopping_bag', label: 'Cart', badge: count },
          { to: '/orders', icon: 'receipt_long', label: 'Orders' },
          { to: '/reviews', icon: 'rate_review', label: 'Feed' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-all duration-300 ${
              location.pathname === item.to
                ? 'bg-primary-container text-on-primary-container scale-95'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[8px] font-bold rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </>
  );
}
