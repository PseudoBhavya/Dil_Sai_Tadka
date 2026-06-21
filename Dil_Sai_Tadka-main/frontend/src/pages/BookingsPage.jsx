import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../animations/ScrollAnimations';
import { EmptyState, Badge } from '../components/ui/UIComponents';

const MOCK_BOOKINGS = [
  { id: 'BK-001', room: 'Azure Garden Suite', checkIn: '2024-02-10', checkOut: '2024-02-13', guests: 2, total: 540, status: 'CONFIRMED' },
  { id: 'BK-002', room: 'Sunset Loft', checkIn: '2024-03-05', checkOut: '2024-03-07', guests: 2, total: 480, status: 'PENDING' },
];

const statusColors = { PENDING: 'warning', CONFIRMED: 'success', CANCELLED: 'error', CHECKED_IN: 'primary', CHECKED_OUT: 'secondary' };

export default function BookingsPage() {
  const [bookings] = useState(MOCK_BOOKINGS);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-5 md:px-16 max-w-[1440px] mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">My Bookings</h1>
        <p className="text-sm text-secondary mb-8">Your room reservations at a glance.</p>

        {bookings.length === 0 ? (
          <EmptyState icon="calendar_today" title="No Bookings" description="You haven't booked any rooms yet." />
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }} className="bg-surface-container-lowest rounded-[24px] p-5 md:p-6 shadow-warm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined">bed</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{b.room}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{b.checkIn} → {b.checkOut} • {b.guests} guests</p>
                    <p className="text-[11px] text-outline mt-1">{b.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={statusColors[b.status]}>{b.status}</Badge>
                  <span className="font-bold text-primary">${b.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
