import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/UIComponents';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 'CMP-001', user: 'Priya Patel', subject: 'Late room service', status: 'RESOLVED', date: '2024-01-20' },
  { id: 'CMP-002', user: 'Vikram Singh', subject: 'Noisy neighbors', status: 'PENDING', date: '2024-02-05' },
  { id: 'CMP-003', user: 'Ananya Sharma', subject: 'AC not working', status: 'IN_PROGRESS', date: '2024-02-10' },
];
const sc = { PENDING: 'warning', IN_PROGRESS: 'primary', RESOLVED: 'success' };

export default function AdminComplaints() {
  const [complaints] = useState(MOCK);
  return (
    <PageTransition>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Complaints Management</h2>
        <div className="bg-surface-container-lowest rounded-[28px] shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-surface-variant/30">
                {['ID', 'User', 'Subject', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {complaints.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-surface-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-primary">{c.id}</td>
                    <td className="px-5 py-4 text-sm text-on-surface">{c.user}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{c.subject}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{c.date}</td>
                    <td className="px-5 py-4"><Badge variant={sc[c.status]}>{c.status.replace('_', ' ')}</Badge></td>
                    <td className="px-5 py-4">
                      <select className="bg-surface-container-low border-none rounded-xl py-1.5 px-3 text-xs focus:ring-2 focus:ring-primary-container">
                        <option>Update</option><option>PENDING</option><option>IN_PROGRESS</option><option>RESOLVED</option>
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
