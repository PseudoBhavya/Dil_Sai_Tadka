import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/UIComponents';
import { PageTransition } from '../../animations/ScrollAnimations';

const MOCK = [
  { id: 1, name: 'Tadka Garden Bowl', price: 450, category: 'Main Course', status: 'Active', rating: 4.9 },
  { id: 2, name: 'Royal Saffron Biryani', price: 680, category: 'Indian Classics', status: 'Active', rating: 5.0 },
  { id: 3, name: 'Sun-Drenched Stack', price: 320, category: 'Breakfast', status: 'Active', rating: 4.8 },
  { id: 4, name: 'Herb Silk Fettuccine', price: 550, category: 'Main Course', status: 'Active', rating: 4.7 },
  { id: 5, name: 'Velvet Rose Kheer', price: 280, category: 'Sweet Endings', status: 'Inactive', rating: 4.9 },
  { id: 6, name: 'Smoked Clay Tikka', price: 420, category: 'Indian Classics', status: 'Active', rating: 4.8 },
];

export default function AdminMenu() {
  const [items] = useState(MOCK);
  const [showForm, setShowForm] = useState(false);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Menu Management</h2>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span> Add Item
          </motion.button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[28px] p-6 shadow-warm">
            <h3 className="font-bold text-primary mb-4">New Menu Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Name', 'Price', 'Category', 'Description'].map(f => (
                <div key={f} className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant px-2">{f}</label>
                  {f === 'Description' ? (
                    <textarea className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container resize-none" rows={2} />
                  ) : (
                    <input type={f === 'Price' ? 'number' : 'text'} className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-primary-container" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-6 py-2.5 bg-primary text-on-primary rounded-2xl text-sm font-semibold">Save</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-surface-container rounded-2xl text-sm font-semibold text-secondary">Cancel</button>
            </div>
          </motion.div>
        )}

        <div className="bg-surface-container-lowest rounded-[28px] shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-variant/30">
                  {['Item', 'Category', 'Price', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-surface-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-sm text-on-surface">{item.name}</td>
                    <td className="px-5 py-4"><Badge variant="secondary">{item.category}</Badge></td>
                    <td className="px-5 py-4 text-sm font-semibold text-primary">₹{item.price}</td>
                    <td className="px-5 py-4 text-sm"><span className="material-symbols-outlined fill-icon text-[#FFD700] text-xs align-middle">star</span> {item.rating}</td>
                    <td className="px-5 py-4"><Badge variant={item.status === 'Active' ? 'success' : 'warning'}>{item.status}</Badge></td>
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
