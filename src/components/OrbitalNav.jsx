import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useWorld } from '../context/WorldContext';
import { zones } from '../data/portfolio';

// Bottom navigation — hub button expands into a clean frosted-glass pill
// containing all zone nodes in a horizontal row. No more orbital clutter.
export default function OrbitalNav() {
  const [open, setOpen] = useState(false);
  const { zone, setZone, ignited } = useWorld();
  const active = zones.find((z) => z.id === zone) ?? zones[0];

  if (!ignited) return null;

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-3">

      {/* Expanded zone picker — slides up from hub */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-panel"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-1 rounded-2xl p-2"
            style={{
              background: 'rgba(13,17,23,0.82)',
              border: '1px solid rgba(245,158,11,0.26)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.08), inset 0 0 24px rgba(157,23,77,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {zones.map((z, i) => {
              const isActive = z.id === zone;
              return (
                <motion.button
                  key={z.id}
                  onClick={() => { setZone(z.id); setOpen(false); }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all duration-200"
                  style={{
                    background: isActive
                      ? 'rgba(245,158,11,0.14)'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(245,158,11,0.34)'
                      : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(217,226,236,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Glyph */}
                  <span
                    className="text-base transition-all duration-200"
                    style={{
                      color: isActive ? 'rgba(245,158,11,1)' : 'rgba(217,226,236,0.5)',
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' : 'none',
                    }}
                  >
                    {z.glyph}
                  </span>
                  {/* Label */}
                  <span
                    className="hud-label text-[9px] transition-colors duration-200"
                    style={{ color: isActive ? 'rgba(245,158,11,0.95)' : 'rgba(217,226,236,0.35)' }}
                  >
                    {z.label}
                  </span>
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-2 left-1/2 h-px w-4 -translate-x-1/2 rounded-full"
                      style={{ background: 'rgba(245,158,11,0.9)', boxShadow: '0 0 6px rgba(245,158,11,0.7)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hub / toggle button */}
      <motion.button
        data-magnetic
        onClick={() => setOpen((s) => !s)}
        className="pointer-events-auto flex flex-col items-center gap-2"
        whileTap={{ scale: 0.92 }}
      >
        {/* Orb */}
        <span
          className="relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: open
              ? 'linear-gradient(135deg, rgba(245,158,11,0.26), rgba(157,23,77,0.2))'
              : 'rgba(13,17,23,0.7)',
            border: `1px solid ${open ? 'rgba(245,158,11,0.55)' : 'rgba(217,226,236,0.12)'}`,
            boxShadow: open
              ? '0 0 32px rgba(245,158,11,0.3), inset 0 0 20px rgba(157,23,77,0.16)'
              : '0 0 20px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* inner rings */}
          <span className="absolute inset-1.5 rounded-full" style={{ border: '1px solid rgba(217,226,236,0.06)' }} />
          <span className="absolute inset-3 rounded-full" style={{ border: '1px solid rgba(217,226,236,0.04)' }} />

          <motion.span
            key={open ? 'close' : active.id}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-base"
            style={{ color: open ? 'rgba(245,158,11,1)' : 'rgba(217,226,236,0.85)' }}
          >
            {open ? '✕' : active.glyph}
          </motion.span>
        </span>

        {/* Label beneath hub */}
        <motion.span
          key={open ? 'sel' : active.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="hud-label text-[9px]"
          style={{ color: 'rgba(217,226,236,0.35)' }}
        >
          {open ? 'CHOOSE SCROLL' : `${active.label.toUpperCase()} · TAP`}
        </motion.span>
      </motion.button>
    </div>
  );
}
