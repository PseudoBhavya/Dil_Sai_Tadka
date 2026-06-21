import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FloatingCard({ image, title, subtitle, children, className = '' }) {
  const ref = useRef(null);
  const [styleVars, setStyleVars] = useState({ '--rx': '0deg', '--ry': '0deg' });

  function handleMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const rx = (-y / rect.height) * 6; // tilt range
    const ry = (x / rect.width) * 6;
    setStyleVars({ '--rx': `${rx}deg`, '--ry': `${ry}deg` });
  }

  function handleLeave() {
    setStyleVars({ '--rx': '0deg', '--ry': '0deg' });
  }

  return (
    <motion.div
      ref={ref}
      className={`floating-card premium-glass-card floating-card-shadow ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: 'perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))', ...styleVars }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      {image && (
        <div className="w-full h-40 md:h-48 overflow-hidden rounded-t-lg">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5">
        {title && <h4 className="text-lg font-bold text-white mb-1">{title}</h4>}
        {subtitle && <p className="text-sm text-white/70 mb-2">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  );
}
