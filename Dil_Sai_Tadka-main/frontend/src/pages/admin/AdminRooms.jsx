import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/UIComponents';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 1, name: 'Azure Garden Suite', price: 180, status: 'Available', bed: 'Queen', rating: 4.9 },
  { id: 2, name: 'Sunset Loft', price: 240, status: 'Occupied', bed: 'King', rating: 5.0 },
  { id: 3, name: 'Olive Grove Suite', price: 165, status: 'Available', bed: 'Double', rating: 4.8 },
];

export default function AdminRooms() {
  const [rooms] = useState(MOCK);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Room Management</h2>
          <motion.button whileTap={{ scale: 0.95 }} className="px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span> Add Room
          </motion.button>
        </div>
        <div className="bg-surface-container-lowest rounded-[28px] shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-surface-variant/30">
                {['Room', 'Bed Type', 'Price/Night', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {rooms.map((r, i) => (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-surface-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-sm text-on-surface">{r.name}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{r.bed}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-primary">${r.price}</td>
                    <td className="px-5 py-4 text-sm"><span className="material-symbols-outlined fill-icon text-[#FFD700] text-xs align-middle">star</span> {r.rating}</td>
                    <td className="px-5 py-4"><Badge variant={r.status === 'Available' ? 'success' : 'warning'}>{r.status}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-primary-container/20 text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                        <button className="p-1.5 rounded-lg hover:bg-error-container/20 text-error transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                      </div>
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
