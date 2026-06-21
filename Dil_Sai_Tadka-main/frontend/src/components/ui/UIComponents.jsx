import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} border-2 border-primary-container border-t-primary rounded-full`}
      />
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-[32px] overflow-hidden ${className}`}>
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      <div className="skeleton h-10 w-full rounded-xl" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-primary-container/20 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
}

export function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary-container/20 text-primary',
    secondary: 'bg-secondary-container text-on-secondary-container',
    tertiary: 'bg-tertiary-container text-on-tertiary-container',
    error: 'bg-error-container text-on-error-container',
    success: 'bg-[#CDEAC0] text-[#1a4d1a]',
    warning: 'bg-[#FFE8CC] text-[#775932]',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function StatCard({ icon, label, value, trendLabel }) {
  const positive = trendLabel?.startsWith('+');
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-surface-container-lowest p-5 rounded-[28px] shadow-warm border border-surface-variant/20"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 bg-primary-container/20 text-primary rounded-xl">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        {trendLabel && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${positive ? 'text-[#1a4d1a] bg-[#CDEAC0]/30' : 'text-error bg-error-container/30'}`}>
            {trendLabel}
          </span>
        )}
      </div>
      <p className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">{label}</p>
      <h3 className="text-2xl font-bold text-on-surface mt-1">{value}</h3>
    </motion.div>
  );
}
