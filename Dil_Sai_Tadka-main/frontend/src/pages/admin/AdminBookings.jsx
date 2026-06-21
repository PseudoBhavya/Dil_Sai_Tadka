import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/UIComponents';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 'BK-001', guest: 'Ananya Sharma', room: 'Azure Garden Suite', checkIn: '2024-02-10', checkOut: '2024-02-13', status: 'CONFIRMED' },
  { id: 'BK-002', guest: 'Rohan Verma', room: 'Sunset Loft', checkIn: '2024-03-05', checkOut: '2024-03-07', status: 'PENDING' },
  { id: 'BK-003', guest: 'Priya Patel', room: 'Olive Grove Suite', checkIn: '2024-03-10', checkOut: '2024-03-15', status: 'CHECKED_IN' },
];
const sc = { PENDING: 'warning', CONFIRMED: 'success', CHECKED_IN: 'primary', CHECKED_OUT: 'secondary', CANCELLED: 'error' };

export default function AdminBookings() {
  const [bookings] = useState(MOCK);
  return (
    <PageTransition>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Booking Management</h2>
        <div className="bg-surface-container-lowest rounded-[28px] shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-surface-variant/30">
                {['Booking ID', 'Guest', 'Room', 'Check-in', 'Check-out', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {bookings.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-surface-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-primary">{b.id}</td>
                    <td className="px-5 py-4 text-sm text-on-surface">{b.guest}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{b.room}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{b.checkIn}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{b.checkOut}</td>
                    <td className="px-5 py-4"><Badge variant={sc[b.status]}>{b.status.replace('_', ' ')}</Badge></td>
                    <td className="px-5 py-4">
                      <select className="bg-surface-container-low border-none rounded-xl py-1.5 px-3 text-xs focus:ring-2 focus:ring-primary-container">
                        <option>Update</option><option>CONFIRMED</option><option>CHECKED_IN</option><option>CHECKED_OUT</option><option>CANCELLED</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
