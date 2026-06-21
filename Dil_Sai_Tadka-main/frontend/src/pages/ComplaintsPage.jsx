import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../animations/ScrollAnimations';
import { EmptyState, Badge } from '../components/ui/UIComponents';

export default function ComplaintsPage() {
  const [complaints] = useState([
    { id: 'CMP-001', subject: 'Late room service', date: '2024-01-20', status: 'RESOLVED', description: 'Room service took 45 minutes instead of the promised 20.' },
    { id: 'CMP-002', subject: 'Noisy neighbors', date: '2024-02-05', status: 'PENDING', description: 'The room next door was very loud late at night.' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: '', description: '' });

  const statusColors = { PENDING: 'warning', IN_PROGRESS: 'primary', RESOLVED: 'success' };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-5 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Complaints</h1>
            <p className="text-sm text-secondary mt-1">We're here to help. Submit any concerns.</p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            New Complaint
          </motion.button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card rounded-[28px] p-6 mb-8 shadow-warm">
            <h3 className="font-bold text-primary mb-4">Submit a Complaint</h3>
            <div className="space-y-3">
              <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container" placeholder="Subject" />
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container resize-none" placeholder="Describe your concern..." />
              <button className="px-6 py-2.5 bg-primary text-on-primary rounded-2xl text-sm font-semibold">Submit</button>
            </div>
          </motion.div>
        )}

        {complaints.length === 0 ? (
          <EmptyState icon="sentiment_satisfied" title="No Complaints" description="You haven't submitted any complaints." />
        ) : (
          <div className="space-y-4">
            {complaints.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-surface-container-lowest rounded-[24px] p-5 shadow-warm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-primary text-sm">{c.subject}</p>
                    <p className="text-[11px] text-outline">{c.id} • {c.date}</p>
                  </div>
                  <Badge variant={statusColors[c.status]}>{c.status}</Badge>
                </div>
                <p className="text-sm text-on-surface-variant">{c.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
