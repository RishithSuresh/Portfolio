import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useWorld } from '../context/WorldContext';
import { zones } from '../data/portfolio';

// Custom radial / orbital navigation.
// Collapsed: a single pulsing "node" hub with the zone glyph.
// Expanded: nodes orbit around it; selecting one transitions the world.
export default function OrbitalNav() {
  const [open, setOpen] = useState(false);
  const { zone, setZone, ignited } = useWorld();
  const active = zones.find((z) => z.id === zone) ?? zones[0];

  if (!ignited) return null;

  const radius = 124;

  return (
    <div className="pointer-events-none fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      {/* Orbit ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2"
        style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      >
        <div className="absolute inset-0 rounded-full hair" />
        <div className="absolute inset-3 rounded-full" style={{ border: '1px dashed rgba(217,226,236,0.08)' }} />
      </motion.div>

      {/* Orbit nodes */}
      <AnimatePresence>
        {open &&
          zones.map((z, i) => {
            const angle = (-Math.PI / 2) + (i / zones.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = z.id === zone;
            return (
              <motion.button
                key={z.id}
                data-magnetic
                onClick={() => { setZone(z.id); setOpen(false); }}
                className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ x, y, opacity: 1, scale: 1 }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group relative flex flex-col items-center">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full glass text-base transition-all duration-300 ${isActive ? 'text-cyan' : 'text-silver/80 group-hover:text-cyan'}`}
                    style={{
                      boxShadow: isActive
                        ? '0 0 24px rgba(91,192,190,0.35), inset 0 0 12px rgba(91,192,190,0.15)'
                        : '0 10px 30px -16px rgba(0,0,0,0.6)',
                    }}
                  >
                    {z.glyph}
                  </span>
                  <span className="mt-2 hud-label text-[9px]">{z.label}</span>
                </div>
              </motion.button>
            );
          })}
      </AnimatePresence>

      {/* Hub button */}
      <motion.button
        data-magnetic
        onClick={() => setOpen((s) => !s)}
        className="pointer-events-auto relative flex flex-col items-center"
        whileTap={{ scale: 0.94 }}
      >
        <span
          className="relative flex h-16 w-16 items-center justify-center rounded-full glass"
          style={{
            boxShadow: '0 0 28px rgba(91,192,190,0.18), inset 0 0 16px rgba(91,192,190,0.10)',
          }}
        >
          <span className="absolute inset-1 rounded-full hair" />
          <span className="absolute inset-3 rounded-full hair" />
          <motion.span
            key={active.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-lg text-silver"
          >
            {active.glyph}
          </motion.span>
        </span>
        <span className="mt-3 hud-label">
          {open ? 'Select zone' : `${active.label.toUpperCase()} · TAP TO TRAVEL`}
        </span>
      </motion.button>
    </div>
  );
}
