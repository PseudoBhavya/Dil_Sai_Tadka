import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition, StaggerContainer, StaggerItem } from '../animations/ScrollAnimations';

const MOCK_REVIEWS = [
  { id: 1, user: 'Ananya Sharma', date: 'Jan 2024', rating: 5, text: 'The Tadka Paneer was transformative. The service feels like being at a friend\'s luxury estate.' },
  { id: 2, user: 'Rohan Verma', date: 'Feb 2024', rating: 4.5, text: 'Beautiful atmosphere and the morning coffee by the pool is a highlight of my week.' },
  { id: 3, user: 'Priya Patel', date: 'Mar 2024', rating: 5, text: 'Absolutely stunning rooms and the food is to die for. Best boutique stay in the city.' },
];

export default function ReviewsPage() {
  const [reviews] = useState(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [showForm, setShowForm] = useState(false);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-5 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Reviews</h1>
            <p className="text-sm text-secondary mt-1">See what our guests are saying.</p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">edit</span>
            Write Review
          </motion.button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card rounded-[28px] p-6 mb-8 shadow-warm">
            <h3 className="font-bold text-primary mb-4">Share Your Experience</h3>
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setNewReview(p => ({ ...p, rating: s }))} className="text-primary">
                  <span className={`material-symbols-outlined text-2xl ${s <= newReview.rating ? 'fill-icon' : ''}`}>star</span>
                </button>
              ))}
            </div>
            <textarea value={newReview.text} onChange={e => setNewReview(p => ({ ...p, text: e.target.value }))} rows={3} className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container resize-none mb-4" placeholder="Tell us about your experience..." />
            <button className="px-6 py-2.5 bg-primary text-on-primary rounded-2xl text-sm font-semibold">Submit Review</button>
          </motion.div>
        )}

        <StaggerContainer className="space-y-4">
          {reviews.map(r => (
            <StaggerItem key={r.id}>
              <motion.div whileHover={{ y: -2 }} className="bg-surface-container-lowest rounded-[24px] p-6 shadow-warm">
                <div className="flex gap-1 text-[#FFD700] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(r.rating) ? 'fill-icon' : ''}`}>star</span>
                  ))}
                </div>
                <p className="text-sm text-on-surface italic mb-4 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-sm font-bold text-secondary">{r.user[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{r.user}</p>
                    <p className="text-[11px] text-on-surface-variant">{r.date}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
