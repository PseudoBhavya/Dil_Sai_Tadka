import { motion } from 'framer-motion';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 1, user: 'Ananya Sharma', rating: 5, text: 'The Tadka Paneer was transformative.', date: '2024-01-15' },
  { id: 2, user: 'Rohan Verma', rating: 4, text: 'Beautiful atmosphere, morning coffee is great.', date: '2024-02-10' },
  { id: 3, user: 'Priya Patel', rating: 5, text: 'Best boutique stay in the city.', date: '2024-03-01' },
];

export default function AdminReviews() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Reviews Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-[24px] p-5 shadow-warm">
              <div className="flex gap-1 text-[#FFD700] mb-2">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className={`material-symbols-outlined text-sm ${j < r.rating ? 'fill-icon' : ''}`}>star</span>
                ))}
              </div>
              <p className="text-sm text-on-surface italic mb-3">"{r.text}"</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-xs font-bold text-secondary">{r.user[0]}</div>
                  <div>
                    <p className="text-xs font-semibold">{r.user}</p>
                    <p className="text-[10px] text-on-surface-variant">{r.date}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-error-container/20 text-error transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
