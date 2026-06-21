import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../animations/ScrollAnimations';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-5 md:px-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>
        <div className="glass-card rounded-[32px] p-8 shadow-warm-lg">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-primary text-3xl font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">{user?.name || 'User'}</h2>
              <p className="text-sm text-secondary">{user?.email}</p>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-primary-container/30 text-primary">
                {user?.role === 'ROLE_ADMIN' ? 'Admin' : 'Customer'}
              </span>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4">
              {['name', 'email', 'phone'].map(f => (
                <div key={f} className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">{f}</label>
                  <input value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container" />
                </div>
              ))}
              <div className="flex gap-3">
                <button onClick={() => setEditing(false)} className="flex-1 py-3 bg-primary text-on-primary rounded-2xl text-sm font-semibold">Save</button>
                <button onClick={() => setEditing(false)} className="flex-1 py-3 bg-surface-container rounded-2xl text-sm font-semibold text-secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { icon: 'person', label: 'Name', value: user?.name },
                { icon: 'mail', label: 'Email', value: user?.email },
                { icon: 'call', label: 'Phone', value: user?.phone || 'Not set' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl">
                  <span className="material-symbols-outlined text-primary">{f.icon}</span>
                  <div>
                    <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">{f.label}</p>
                    <p className="text-sm font-semibold text-on-surface">{f.value}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setEditing(true)} className="flex-1 py-3 bg-primary text-on-primary rounded-2xl text-sm font-semibold">Edit Profile</motion.button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={logout} className="py-3 px-6 bg-error-container/20 text-error rounded-2xl text-sm font-semibold">Logout</motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
