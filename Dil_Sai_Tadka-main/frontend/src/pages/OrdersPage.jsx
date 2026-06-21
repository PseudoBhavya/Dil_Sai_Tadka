import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../animations/ScrollAnimations';
import { EmptyState, Badge } from '../components/ui/UIComponents';

const MOCK_ORDERS = [
  { id: 'ORD-001', date: '2024-01-15', items: ['Tadka Garden Bowl', 'Royal Saffron Biryani'], total: 1130, status: 'DELIVERED' },
  { id: 'ORD-002', date: '2024-01-18', items: ['Sun-Drenched Stack', 'Artisan Cold Brew'], total: 540, status: 'PREPARING' },
  { id: 'ORD-003', date: '2024-01-20', items: ['Smoked Clay Tikka'], total: 420, status: 'PENDING' },
];

const statusColors = { PENDING: 'warning', PREPARING: 'primary', DELIVERED: 'success', CANCELLED: 'error' };

export default function OrdersPage() {
  const [orders] = useState(MOCK_ORDERS);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-5 md:px-16 max-w-[1440px] mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">My Orders</h1>
        <p className="text-sm text-secondary mb-8">Track your culinary journeys and past feasts.</p>

        {orders.length === 0 ? (
          <EmptyState icon="receipt_long" title="No Orders Yet" description="Your order history will appear here." />
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="bg-surface-container-lowest rounded-[24px] p-5 md:p-6 shadow-warm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{order.id}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{order.items.join(' • ')}</p>
                    <p className="text-[11px] text-outline mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                  <span className="font-bold text-primary">₹{order.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
