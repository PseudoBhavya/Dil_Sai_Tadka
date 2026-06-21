import { motion } from 'framer-motion';
import { StatCard } from '../../components/ui/UIComponents';
import { StaggerContainer, StaggerItem, ScrollReveal } from '../../animations/ScrollAnimations';

const recentOrders = [
  { name: 'Paneer Tikka Platter', location: 'Table 04', time: '2 mins ago', price: '₹540', icon: 'lunch_dining', color: 'bg-primary-container/30 text-primary' },
  { name: 'Artisan Cold Brew', location: 'Room 102', time: '12 mins ago', price: '₹220', icon: 'coffee', color: 'bg-tertiary-container/30 text-tertiary' },
  { name: 'Gourmet Breakfast Box', location: 'Pickup', time: '45 mins ago', price: '₹850', icon: 'bakery_dining', color: 'bg-secondary-container/30 text-secondary' },
];

const reviews = [
  { name: 'Ananya Sharma', date: 'Stayed: Jan 2024', rating: 5, text: 'The Tadka Paneer was transformative. The service feels like being at a friend\'s luxury estate.' },
  { name: 'Rohan Verma', date: 'Dine-in: Feb 2024', rating: 4.5, text: 'Beautiful atmosphere and the morning coffee by the pool is a highlight of my week.' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StaggerItem><StatCard icon="payments" label="Total Revenue" value="₹1,42,850" trendLabel="+12%" /></StaggerItem>
        <StaggerItem><StatCard icon="restaurant" label="Active Orders" value="38" trendLabel="+5%" /></StaggerItem>
        <StaggerItem><StatCard icon="bed" label="Occupancy" value="84%" trendLabel="-2%" /></StaggerItem>
        <StaggerItem><StatCard icon="star" label="Guest Rating" value="4.9/5.0" trendLabel="New!" /></StaggerItem>
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Revenue Chart */}
        <ScrollReveal className="lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-[32px] p-6 md:p-8 shadow-warm border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-primary">Revenue Overview</h4>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-primary-container/15 text-primary text-xs font-semibold rounded-full">Weekly</button>
                <button className="px-4 py-1.5 text-on-surface-variant text-xs font-semibold rounded-full hover:bg-surface-container">Monthly</button>
              </div>
            </div>
            <div className="h-52 flex items-end justify-between gap-3 px-2">
              {[40, 60, 85, 45, 70, 55, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scaleX: 1.15, backgroundColor: 'var(--color-primary-container)' }}
                  className={`w-full rounded-t-xl transition-colors cursor-pointer ${h === 85 || h === 95 ? 'bg-primary-container' : 'bg-secondary-container/25'}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3 px-2 text-on-surface-variant text-[11px] font-medium">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        </ScrollReveal>

        {/* Recent Orders */}
        <ScrollReveal className="lg:col-span-4" delay={0.15}>
          <div className="bg-surface-container-low rounded-[32px] p-6 border border-surface-variant/10 h-full">
            <h4 className="text-lg font-bold text-primary mb-4">Recent Orders</h4>
            <div className="space-y-3">
              {recentOrders.map((order, i) => (
                <motion.div key={i} whileHover={{ x: 3 }} className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                  <div className={`w-10 h-10 rounded-lg ${order.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-lg">{order.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">{order.name}</p>
                    <p className="text-[11px] text-on-surface-variant">{order.location} • {order.time}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{order.price}</p>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 text-primary text-xs font-semibold border border-primary/15 rounded-xl hover:bg-primary-container/10 transition-colors">
              View All Orders
            </button>
          </div>
        </ScrollReveal>

        {/* Booking Status */}
        <ScrollReveal className="lg:col-span-6">
          <div className="bg-surface-container-lowest rounded-[32px] p-6 border border-surface-variant/20 shadow-warm">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-lg font-bold text-primary">Booking Status</h4>
              <span className="material-symbols-outlined text-outline">more_horiz</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-5 bg-tertiary-container/10 rounded-2xl text-center border border-tertiary/10">
                <h5 className="text-4xl font-bold text-tertiary leading-none mb-1">12</h5>
                <p className="text-[11px] font-semibold text-tertiary/70 uppercase tracking-widest">Arrivals Today</p>
              </div>
              <div className="p-5 bg-primary-container/10 rounded-2xl text-center border border-primary/10">
                <h5 className="text-4xl font-bold text-primary leading-none mb-1">08</h5>
                <p className="text-[11px] font-semibold text-primary/70 uppercase tracking-widest">Upcoming</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant mb-2">
                <span>Capacity Used</span><span>82%</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Guest Reviews */}
        <ScrollReveal className="lg:col-span-6" delay={0.1}>
          <div className="bg-primary-container/5 rounded-[32px] p-6 border border-primary-container/20 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px' }}>format_quote</span>
            </div>
            <h4 className="text-lg font-bold text-primary mb-5">Guest Experiences</h4>
            <div className="space-y-5">
              {reviews.map((r, i) => (
                <div key={i} className={i > 0 ? 'opacity-70' : ''}>
                  <div className="flex gap-1 text-[#FFD700] mb-2">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={`material-symbols-outlined text-xs ${j < Math.floor(r.rating) ? 'fill-icon' : ''}`}>star</span>
                    ))}
                  </div>
                  <p className="text-sm text-on-surface italic mb-2 leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-xs font-bold">{r.name[0]}</div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">{r.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{r.date}</p>
                    </div>
                  </div>
                  {i < reviews.length - 1 && <div className="h-px bg-primary-container/30 mt-4" />}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
