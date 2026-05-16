import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWorld } from '../context/WorldContext';
import { zones } from '../data/portfolio';

// A subtle, persistent cinematic HUD: corner brackets, status strip,
// active zone readout. Sits above the canvas, below the cursor.
export default function HUDFrame() {
  const { zone, ignited } = useWorld();
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  if (!ignited) return null;
  const active = zones.find((z) => z.id === zone) ?? zones[0];

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {/* Corner brackets */}
      <Bracket className="left-4 top-4" pos="tl" />
      <Bracket className="right-4 top-4" pos="tr" />
      <Bracket className="left-4 bottom-4" pos="bl" />
      <Bracket className="right-4 bottom-4" pos="br" />

      {/* Top-left identity strip */}
      <div className="absolute left-6 top-6 flex items-center gap-3">
        <div className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
        <span className="hud-label">SYS · SHADOW DOJO · V2.0</span>
      </div>

      {/* Top-right time + zone */}
      <div className="absolute right-6 top-6 flex items-center gap-4">
        <span className="hud-label">{time}</span>
        <span className="h-3 w-px bg-silver/20" />
        <AnimatePresence mode="wait">
          <motion.span
            key={active.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.45 }}
            className="hud-label text-cyan/80"
          >
            SCROLL · {active.label.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom strip — minimal contextual labels */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-6">
        <span className="hud-label">MOVE · OR · CHOOSE A GLYPH</span>
        <span className="hud-label">STANCE · READY</span>
      </div>
    </div>
  );
}

function Bracket({ pos, className = '' }) {
  const map = {
    tl: 'border-l border-t',
    tr: 'border-r border-t',
    bl: 'border-l border-b',
    br: 'border-r border-b',
  };
  return (
    <span
      className={`absolute h-6 w-6 ${map[pos]} border-cyan/40 ${className}`}
      style={{ boxShadow: '0 0 12px rgba(245,158,11,0.24)' }}
    />
  );
}
