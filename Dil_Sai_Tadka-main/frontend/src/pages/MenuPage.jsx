import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations/ScrollAnimations';
import { LoadingSpinner } from '../components/ui/UIComponents';
import { menuAPI } from '../services/api';

const MOCK_MENU = [
  { id: 1, name: 'Tadka Garden Bowl', price: 450, rating: 4.9, reviews: 120, category: 'Main Course', tag: 'Nutritious', description: 'Organic greens tossed in our signature mustard temper with hints of roasted cumin and pomegranate seeds.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-ict95eR06Ia642ZVkiPX3txX1PEd_WOGwf-brC8akLLj20raPY3VYSRKdn-wcOpIypRP8pZTjdqvxQCtmUlM6c0wJrzk_Jl1qE9bsqfuvB5WPmfst1dA_OxE2TsQWUl4yobiRDZo5Hou9Mmrj2PRhTcQhrx6HZ7COHlIcVmy0hA4nXdgYlYwUtDom6JGn1FO_4rMBfFmmauO0Ty1ZNnlMsPD_j08047E78_PASDbq0qJxYRxCWLO4_vsOSBNa6PAtL5SQ1YccvU' },
  { id: 2, name: 'Royal Saffron Biryani', price: 680, rating: 5.0, reviews: 200, category: 'Indian Classics', tag: 'Signature', description: 'A slow-cooked aromatic experience using long-grain Basmati rice, infused with grade-A Kashmiri saffron.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3dWcMTQ7dRPUFLg4Ke7yGl-6-8T4cuXpTMaUFtf1Uu9ZanLIXkzb4UfGX_tzH_mIYSGQTmuAJIuZDff9R33JObX6aKLLvxpamxW98Bj5CQKZaEc2DfuZGpWmm5EZIYJSmUMf_gI5Z5j3l6VBSXKJM4qE29Zttx4G3kSwn4HcdxV4mFi0fHR4BuNhXFGG3jsPDJf7nvNJYcsc5GoQx3Gxi9I4_r4vSzTqnF2KAQ2kagqFhrS5umhj7uF57_FUT1vkLR6-GwQBpjWo' },
  { id: 3, name: 'Sun-Drenched Stack', price: 320, rating: 4.8, reviews: 85, category: 'Breakfast', tag: 'Breakfast', description: 'Fluffy buttermilk pancakes topped with seasonal farm-fresh berries and artisanal organic honey.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzZ53WDPBtraAvlPo0NzUIRCw3z7dkXHMnV6RpycoLQRJZypL4UAuINBZ6xfAazzaX8jhqsCCX8a3YgN-BFYKDev95ZPPCoOwcXZ2pCOf_Vo2HpUQY-dRW8LbVfEdXMT3WTn1KcR4t_eUt0vufx_AkaCBPKHCfV1IufBSGLo2iscyWYi0V-xpXH6viGFDBruqi1TnaUvW7gZ4zHTX5aRMNXnpPJwO7XLvMT0hQs3MGRa5V9d1QE916yEfHA2N-HsI5FLBB5cW_TeA' },
  { id: 4, name: 'Herb Silk Fettuccine', price: 550, rating: 4.7, reviews: 62, category: 'Main Course', tag: 'Artisanal', description: 'Hand-rolled pasta ribbons tossed in a delicate emulsion of cold-pressed oil and roasted garlic.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2NBA0VMPyM0L6DU6iIFkPmKaQ0BpmL_qIEhBtrme13vjfUixOiBcNE5dcCeDap8m078FlIBC_VfZsz9orRCMLCgsN9L7rRzxxUfMMC9pK4Q8Z2MO0aRlL_bU4vYwxlX3oVwQLIRIA2GhnTh1IcV9C8CgMmTmv0aYl2XsdGJStOwdw8oFGJeG6lOKPo196MqVfKKX4_QTxEI9av9MKTKuaOsRwEkyqegRl7sDou0NIog7jL2JYk0W-pS44SB0HjDR7BHqUGBy4sUI' },
  { id: 5, name: 'Velvet Rose Kheer', price: 280, rating: 4.9, reviews: 145, category: 'Sweet Endings', tag: 'Sweet', description: 'Traditional rice pudding slow-simmered for 6 hours, delicately scented with organic damask roses.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVkbAwP9JFkqdXjf6Bzu7qOJktdalFEGL9A5hDGCmg1UZFHfw8bf85OoBQbWIHMbe-HCvwecfxxyqoC31EdEN9klclpYG5Dtu_U53KT6xhMJwes-bHtptgHjX1fbUDuyVT0ilsBs9La8pMDJO-fzQABoYeHGpLt_v3ozNazrhhklGfirOGi-BPhzgYxGLDyDGs1Y4W_mECLgGwbp9v53-nD64axuSFevxE8laTDOcvJLfiLHMgUnnDOZR7gKqEI1x7R4E8dG5w9fE' },
  { id: 6, name: 'Smoked Clay Tikka', price: 420, rating: 4.8, reviews: 110, category: 'Indian Classics', tag: 'Grill', description: "Farm-fresh cottage cheese cubes marinated in our family's 3-generation secret spice blend.", image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVqF6GAA7dU3BnnOgua_JDZjFUE_goPbHZeALnGK-i0sW1I3N98iSR9vtfKAlXyKC5r_5zkKkWE0tp-yk_33AVBI4kQ9wbvYpsH0rDk1hbreKet3FePC2opYbKk1LWq0p_73WVwuxp4PC1ulUyOoun7MwDGdV4uIbWyzIHJhK8OIY9IqKCOv1WOWR3ok-257EL6aAyc29T5b34feXHiDslcifgQXxcJRi4Ngsj4_lXs4Jw0qiDRPwT9KSqO_T6jfx6_QVKtGSJl38' },
];

const categories = ['All Dishes', 'Breakfast', 'Main Course', 'Indian Classics', 'Sweet Endings'];

const tagColors = {
  Nutritious: 'bg-tertiary-container text-on-tertiary-container',
  Signature: 'bg-secondary-container text-on-secondary-container',
  Breakfast: 'bg-tertiary-container text-on-tertiary-container',
  Artisanal: 'bg-secondary-container text-on-secondary-container',
  Sweet: 'bg-primary-container text-on-primary-container',
  Grill: 'bg-secondary-container text-on-secondary-container',
};

export default function MenuPage() {
  const [items, setItems] = useState(MOCK_MENU);
  const [activeCategory, setActiveCategory] = useState('All Dishes');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    // Try to fetch from API, fallback to mock
    setLoading(true);
    menuAPI.getAll().then(res => {
      if (res.data?.length) setItems(res.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = items.filter(item => {
    const matchCat = activeCategory === 'All Dishes' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20 pb-20">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-16 mt-12">
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight">
            Handcrafted<br />
            <span className="text-secondary italic">Culinary Delights</span>
          </h1>
          <p className="text-base text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
            A curated selection of home-inspired dishes prepared with premium organic ingredients and a pinch of soul.
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <div className="flex-1 flex flex-wrap gap-2">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary shadow-lg'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container/50'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary-container"
              placeholder="Search for flavors..."
            />
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-16 mt-10">
        {loading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map(item => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group glass-card rounded-[32px] overflow-hidden shadow-warm"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${tagColors[item.tag] || 'bg-primary-container text-on-primary-container'}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                      <span className="text-lg font-bold text-secondary">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined fill-icon text-[#FFD700] text-sm">star</span>
                        <span className="text-xs font-semibold text-on-surface-variant">{item.rating} ({item.reviews}+)</span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.08 }}
                        onClick={() => addItem(item)}
                        className="bg-primary-container text-on-primary-container p-2.5 rounded-xl"
                      >
                        <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>
    </div>
  );
}
