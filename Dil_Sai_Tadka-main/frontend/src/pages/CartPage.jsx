import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { EmptyState } from '../components/ui/UIComponents';
import { PageTransition } from '../animations/ScrollAnimations';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total, count } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (count === 0) {
    return (
      <div className="pt-28 pb-20 px-5 max-w-[1440px] mx-auto">
        <EmptyState icon="shopping_cart" title="Your Cart is Empty" description="Explore our menu and add something delicious to your cart." action={<Link to="/menu" className="px-6 py-3 bg-primary text-on-primary rounded-full text-sm font-semibold">Browse Menu</Link>} />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="pt-28 pb-24 px-5 md:px-16 max-w-[1440px] mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4 bg-surface-container-lowest p-4 rounded-[24px] shadow-warm">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-primary">{item.name}</h3>
                  <p className="text-sm text-secondary">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container transition-all">
                      <span className="material-symbols-outlined text-base">remove</span>
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container transition-all">
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="text-secondary hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                  <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} className="text-sm text-secondary hover:text-error transition-colors underline">Clear Cart</button>
          </div>

          <div className="glass-card rounded-[28px] p-6 h-fit shadow-warm-lg sticky top-28">
            <h3 className="text-lg font-bold text-primary mb-5">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-on-surface-variant">Subtotal</span><span className="font-semibold">₹{total}</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Delivery</span><span className="font-semibold text-tertiary">Free</span></div>
              <div className="h-px bg-outline-variant/40 my-2" />
              <div className="flex justify-between text-base"><span className="font-bold text-primary">Total</span><span className="font-bold text-primary">₹{total}</span></div>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate(isAuthenticated ? '/orders' : '/login')} className="w-full mt-6 py-3.5 bg-primary text-on-primary rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all">
              {isAuthenticated ? 'Place Order' : 'Login to Order'}
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
