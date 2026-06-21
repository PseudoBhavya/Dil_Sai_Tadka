import React from 'react';

export default function HeroBgLayer() {
  return (
    <div aria-hidden className="hero-bg-layer">
      <div className="grain-overlay" />
      {/* soft vignette / glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(255,232,204,0.06), transparent 20%), radial-gradient(ellipse at 70% 60%, rgba(30,20,12,0.4), transparent 40%)', pointerEvents: 'none' }} />
    </div>
  );
}
