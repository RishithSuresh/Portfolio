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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0.45, scale: 0.96 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(245,158,11,0.24), transparent 26%), radial-gradient(circle at 18% 58%, rgba(217,70,239,0.14), transparent 24%), radial-gradient(circle at 82% 58%, rgba(157,23,77,0.2), transparent 22%)',
        }}
      />

      {/* Pre-ignition overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.0, ease: 'easeOut' } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="absolute h-[42rem] w-[42rem] rounded-full border border-cyan/20"
              style={{ boxShadow: '0 0 140px rgba(56,239,245,0.12), inset 0 0 80px rgba(217,70,239,0.06)' }}
            />

            {/* Boot strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <span className="hud-label">SHADOW DOJO · GATE RITUAL · 00.01</span>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
                <span className="hud-label text-cyan/80">KATANA CORE · STABLE</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="font-display text-5xl tracking-cinema text-luminous sm:text-7xl md:text-8xl"
              >
                {identity.callsign}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.45 }}
                className="h-px w-40 origin-center bg-gradient-to-r from-transparent via-cyan to-transparent"
              />

              <span className="hud-label">{identity.role.toUpperCase()}</span>

              <Magnetic strength={0.45}>
                <button
                  data-magnetic
                  onClick={() => setIgnited(true)}
                  disabled={ignited}
                  className="group ribbon-trace relative mt-6 inline-flex items-center justify-center rounded-full px-9 py-4"
                  style={{
                    border: '1px solid rgba(91,192,190,0.52)',
                    background: 'linear-gradient(180deg, rgba(28,36,49,0.72), rgba(13,17,23,0.62))',
                    boxShadow:
                      '0 0 42px rgba(91,192,190,0.22), inset 0 0 24px rgba(91,192,190,0.10), 0 0 90px rgba(217,70,239,0.06)',
                  }}
                >
                  <span className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 0 1px rgba(217,226,236,0.08)' }} />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.96, 1.02, 0.96] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle, rgba(56,239,245,0.14), transparent 68%)' }}
                  />
                  <span className="font-display text-sm tracking-hud text-silver-soft">
                    ENTER DOJO
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

              <span className="hud-label opacity-60">[ enter the dojo ]</span>
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
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-violet/15"
              style={{ boxShadow: '0 0 160px rgba(217,70,239,0.08), inset 0 0 100px rgba(56,239,245,0.06)' }}
            />

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald" />
              <span className="hud-label">{identity.status}</span>
            </div>

            <h1 className="font-display text-5xl leading-[0.95] text-silver-soft drop-shadow-[0_0_18px_rgba(56,239,245,0.18)] sm:text-7xl md:text-8xl lg:text-[120px]">
              <RevealText delay={0.05} stagger={0.06}>{identity.name}</RevealText>
            </h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="h-px w-56 origin-center bg-gradient-to-r from-transparent via-violet via-50% to-transparent"
            />

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
              <span className="hud-label opacity-70">↓ scroll · or · open the war map</span>
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
