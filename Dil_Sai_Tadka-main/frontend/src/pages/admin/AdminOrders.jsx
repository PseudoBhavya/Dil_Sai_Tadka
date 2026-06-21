import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/UIComponents';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 'ORD-001', customer: 'Priya Patel', items: 'Tadka Garden Bowl x2', total: 900, status: 'PENDING', date: '2024-01-20' },
  { id: 'ORD-002', customer: 'Rahul Kumar', items: 'Royal Saffron Biryani', total: 680, status: 'PREPARING', date: '2024-01-20' },
  { id: 'ORD-003', customer: 'Ananya Sharma', items: 'Sun-Drenched Stack, Cold Brew', total: 540, status: 'DELIVERED', date: '2024-01-19' },
  { id: 'ORD-004', customer: 'Vikram Singh', items: 'Herb Silk Fettuccine', total: 550, status: 'CANCELLED', date: '2024-01-18' },
];
const sc = { PENDING: 'warning', PREPARING: 'primary', DELIVERED: 'success', CANCELLED: 'error' };

export default function AdminOrders() {
  const [orders] = useState(MOCK);
  return (
    <PageTransition>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Order Management</h2>
        <div className="bg-surface-container-lowest rounded-[28px] shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-surface-variant/30">
                {['Order ID', 'Customer', 'Items', 'Total', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {orders.map((o, i) => (
                  <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-surface-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-primary">{o.id}</td>
                    <td className="px-5 py-4 text-sm text-on-surface">{o.customer}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{o.items}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-primary">₹{o.total}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{o.date}</td>
                    <td className="px-5 py-4"><Badge variant={sc[o.status]}>{o.status}</Badge></td>
                    <td className="px-5 py-4">
                      <select className="bg-surface-container-low border-none rounded-xl py-1.5 px-3 text-xs focus:ring-2 focus:ring-primary-container">
                        <option>Update Status</option>
                        <option>PENDING</option><option>PREPARING</option><option>DELIVERED</option><option>CANCELLED</option>
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
