import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const result = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    setLoading(false);
    if (result.success) navigate('/');
    else setError(result.message);
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210' },
    { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-5">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold text-white landing-heading">Create Account</h1>
          <p className="text-sm text-white/60 mt-2">Join the Dil Se Tadka experience</p>
        </div>

        <div className="glass-card rounded-[32px] p-8 shadow-warm-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-error-container/20 text-on-error-container text-sm rounded-2xl text-center">{error}</div>}
            {fields.map(f => (
              <div key={f.key} className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">{f.label}</label>
                <input value={form[f.key]} onChange={update(f.key)} type={f.type} required className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container" placeholder={f.placeholder} />
              </div>
            ))}
            <motion.button whileTap={{ scale: 0.97 }} disabled={loading} type="submit" className="w-full py-3.5 bg-primary text-on-primary rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
              {loading ? 'Creating...' : 'Create Account'}
            </motion.button>
          </form>
          <p className="text-center text-sm text-on-surface-variant mt-6">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
