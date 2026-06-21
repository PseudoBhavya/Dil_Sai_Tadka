import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/UIComponents';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 1, name: 'Admin User', email: 'admin@dilsaitadka.com', role: 'ROLE_ADMIN', joined: '2024-01-01', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'ROLE_CUSTOMER', joined: '2024-01-10', status: 'Active' },
  { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'ROLE_CUSTOMER', joined: '2024-01-15', status: 'Active' },
  { id: 4, name: 'Ananya Sharma', email: 'ananya@example.com', role: 'ROLE_CUSTOMER', joined: '2024-02-01', status: 'Inactive' },
];

export default function AdminUsers() {
  const [users] = useState(MOCK);
  return (
    <PageTransition>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">User Management</h2>
        <div className="bg-surface-container-lowest rounded-[28px] shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-surface-variant/30">
                {['User', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {users.map((u, i) => (
                  <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-surface-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary text-xs font-bold">{u.name[0]}</div>
                        <span className="text-sm font-semibold text-on-surface">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{u.email}</td>
                    <td className="px-5 py-4"><Badge variant={u.role === 'ROLE_ADMIN' ? 'primary' : 'tertiary'}>{u.role === 'ROLE_ADMIN' ? 'Admin' : 'Customer'}</Badge></td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{u.joined}</td>
                    <td className="px-5 py-4"><Badge variant={u.status === 'Active' ? 'success' : 'warning'}>{u.status}</Badge></td>
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
