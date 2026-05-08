import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import RevealText from '../components/RevealText';
import Magnetic from '../components/Magnetic';
import { useWorld } from '../context/WorldContext';
import { identity } from '../data/portfolio';

// Landing zone — the cinematic intro.
// Pre-ignition: full-screen "Press Start" overlay over a dimmed scene.
// Post-ignition: floating identity reveal with HUD overlays.
export default function Landing() {
  const { ignited, setIgnited } = useWorld();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (ignited) {
      const t = setTimeout(() => setShowIntro(false), 1100);
      return () => clearTimeout(t);
    }
  }, [ignited]);

  return (
    <section
      id="zone-home"
      className="scanlines relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 sm:px-10"
    >
      {/* Pre-ignition overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.0, ease: 'easeOut' } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center"
          >
            {/* Boot strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <span className="hud-label">AETHER · BOOT SEQUENCE · 00.01</span>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
                <span className="hud-label text-cyan/80">CHANNEL · STABLE</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="font-display text-5xl tracking-cinema text-silver-soft sm:text-7xl md:text-8xl"
              >
                {identity.callsign}
              </motion.h1>

              <span className="hud-label">{identity.role.toUpperCase()}</span>

              <Magnetic strength={0.45}>
                <button
                  data-magnetic
                  onClick={() => setIgnited(true)}
                  disabled={ignited}
                  className="group relative mt-6 inline-flex items-center justify-center rounded-full px-9 py-4"
                  style={{
                    border: '1px solid rgba(91,192,190,0.45)',
                    background: 'linear-gradient(180deg, rgba(28,36,49,0.6), rgba(13,17,23,0.6))',
                    boxShadow:
                      '0 0 36px rgba(91,192,190,0.18), inset 0 0 20px rgba(91,192,190,0.08)',
                  }}
                >
                  <span className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 0 1px rgba(217,226,236,0.06)' }} />
                  <span className="font-display text-sm tracking-hud text-silver-soft">
                    PRESS START
                  </span>
                  <motion.span
                    className="ml-3 inline-block text-cyan"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ▸
                  </motion.span>
                </button>
              </Magnetic>

              <span className="hud-label opacity-60">[ enter the world ]</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ignited landing content */}
      <AnimatePresence>
        {ignited && !showIntro && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 mx-auto flex max-w-6xl flex-col items-center gap-7 text-center"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
              <span className="hud-label">{identity.status}</span>
            </div>

            <h1 className="font-display text-5xl leading-[0.95] text-silver-soft sm:text-7xl md:text-8xl lg:text-[120px]">
              <RevealText delay={0.05} stagger={0.06}>{identity.name}</RevealText>
            </h1>

            <p className="max-w-2xl font-sans text-lg text-silver-dim sm:text-xl">
              <RevealText delay={0.5} stagger={0.02} y={14} blur={3}>
                {identity.tagline}
              </RevealText>
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <Tag>{identity.role}</Tag>
              <Tag>{identity.location}</Tag>
              <Tag accent>v1.0 · live</Tag>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="absolute -bottom-24 left-1/2 -translate-x-1/2"
            >
              <span className="hud-label opacity-70">↓ scroll · or · open the orbital nav</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Tag({ children, accent }) {
  return (
    <span
      className={`hud-label rounded-full px-3 py-1.5 ${accent ? 'text-cyan' : 'text-silver-dim'}`}
      style={{
        border: `1px solid ${accent ? 'rgba(91,192,190,0.35)' : 'rgba(217,226,236,0.12)'}`,
        background: 'rgba(13,17,23,0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </span>
  );
}
