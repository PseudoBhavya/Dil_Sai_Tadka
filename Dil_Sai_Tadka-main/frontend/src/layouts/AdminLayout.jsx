import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { path: '/admin', icon: 'dashboard', label: 'Overview', exact: true },
  { path: '/admin/api-dashboard', icon: 'terminal', label: 'API & AI Ecosystem' },
  { path: '/admin/menu', icon: 'menu_book', label: 'Menu Management' },
  { path: '/admin/rooms', icon: 'bed', label: 'Room Management' },
  { path: '/admin/orders', icon: 'receipt_long', label: 'Orders' },
  { path: '/admin/bookings', icon: 'calendar_today', label: 'Bookings' },
  { path: '/admin/reviews', icon: 'star', label: 'Reviews' },
  { path: '/admin/complaints', icon: 'report', label: 'Complaints' },
  { path: '/admin/users', icon: 'group', label: 'Users' },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.path;
    return location.pathname.startsWith(link.path);
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden md:flex h-screen w-72 fixed left-0 top-0 bg-surface-container-low flex-col p-5 gap-2 shadow-sm border-r border-surface-variant/30">
        <div className="mb-8 px-3 text-center">
          <Link to="/" className="flex flex-col items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
            <h1 className="text-lg font-bold text-primary tracking-tight landing-title">Dil Se Tadka</h1>
          </Link>
          <p className="text-on-surface-variant text-[11px] tracking-wider uppercase mt-1">Hospitality Portal</p>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link)
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:translate-x-1'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{link.icon}</span>
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="border-t border-outline-variant/40 pt-4 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">home</span>
            Back to Site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-error transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-nav border-b border-surface-variant/20 px-5 md:px-10 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-primary">
              {sidebarLinks.find(l => isActive(l))?.label || 'Dashboard'}
            </h2>
            <p className="text-xs text-on-surface-variant">
              Welcome back, {user?.name || 'Admin'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full w-56 text-sm focus:ring-2 focus:ring-primary-container"
                placeholder="Search..."
                type="text"
              />
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-5 md:p-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav for Admin */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-5 pt-2 glass-nav shadow-warm-xl z-50 rounded-t-[28px]">
        {sidebarLinks.slice(0, 5).map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex flex-col items-center px-2 py-1 rounded-full transition-all ${
              isActive(link)
                ? 'bg-primary-container text-on-primary-container scale-90'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{link.icon}</span>
            <span className="text-[9px] font-medium mt-0.5">{link.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
