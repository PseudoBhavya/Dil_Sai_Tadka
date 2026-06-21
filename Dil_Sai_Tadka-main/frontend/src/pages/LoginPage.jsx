import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  // Demo login helper
  const fillDemo = (role) => {
    if (role === 'admin') { setEmail('admin@dilsaitadka.com'); setPassword('Admin@123'); }
    else { setEmail('customer@dilsaitadka.com'); setPassword('Customer@123'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-5">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold text-white landing-heading">Welcome Back</h1>
          <p className="text-sm text-white/60 mt-2">Sign in to your Dil Se Tadka account</p>
        </div>

        <div className="glass-card rounded-[32px] p-8 shadow-warm-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-error-container/20 text-on-error-container text-sm rounded-2xl text-center">
                {error}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 px-5 text-sm focus:ring-2 focus:ring-primary-container" placeholder="your@email.com" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 px-5 text-sm focus:ring-2 focus:ring-primary-container" placeholder="••••••••" />
            </div>

            <motion.button whileTap={{ scale: 0.97 }} disabled={loading} type="submit" className="w-full py-3.5 bg-primary text-on-primary rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 flex gap-2">
            <button onClick={() => fillDemo('admin')} className="flex-1 py-2 text-[11px] font-semibold bg-surface-container rounded-xl text-primary hover:bg-primary-container/20 transition-all">Admin Demo</button>
            <button onClick={() => fillDemo('customer')} className="flex-1 py-2 text-[11px] font-semibold bg-surface-container rounded-xl text-tertiary hover:bg-tertiary-container/20 transition-all">Customer Demo</button>
          </div>

          <p className="text-center text-sm text-on-surface-variant mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
