import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { zones } from '../data/portfolio';

// ─────────────────────────────────────────────────────────────
// WorldContext — central state for the gamified portfolio.
//
// Tracks:
//  • current zone (drives camera & scene mood)
//  • whether the experience has been "ignited" (Press Start)
//  • cursor position (for magnetic / parallax effects)
//  • performance tier (auto-detected for mobile / low-power)
// ─────────────────────────────────────────────────────────────

const WorldContext = createContext(null);

const detectTier = () => {
  if (typeof window === 'undefined') return 'high';
  const ua = navigator.userAgent || '';
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (isMobile || cores <= 4 || mem <= 4) return 'low';
  if (cores <= 6 || mem <= 6) return 'mid';
  return 'high';
};

export function WorldProvider({ children }) {
  const [ignited, setIgnited] = useState(false);
  const [zone, setZoneState] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [tier, setTier] = useState('high');
  const cursor = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });

  useEffect(() => {
    setTier(detectTier());
  }, []);

  // Track normalized cursor with velocity (used by 3D scene + cursor)
  useEffect(() => {
    let lx = 0.5, ly = 0.5;
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      cursor.current.vx = x - lx;
      cursor.current.vy = y - ly;
      cursor.current.x = x;
      cursor.current.y = y;
      lx = x; ly = y;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const setZone = useCallback((next) => {
    if (next === zone) return;
    setTransitioning(true);
    // Fire visual transition; sections handle their own enter/exit.
    setZoneState(next);
    // Smoothly scroll to the section anchor.
    requestAnimationFrame(() => {
      const el = document.getElementById(`zone-${next}`);
      if (el && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => setTransitioning(false), 1200);
    });
  }, [zone]);

  // Auto-detect zone on scroll (so URL/state stays in sync with what the user sees).
  useEffect(() => {
    if (!ignited) return;
    const ids = zones.map((z) => `zone-${z.id}`);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id.replace('zone-', '');
          setZoneState((curr) => (curr === id ? curr : id));
        }
      },
      { threshold: [0.35, 0.55, 0.75] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ignited]);

  const value = useMemo(
    () => ({ ignited, setIgnited, zone, setZone, transitioning, tier, cursor }),
    [ignited, zone, transitioning, tier, setZone]
  );

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export const useWorld = () => {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error('useWorld must be used inside WorldProvider');
  return ctx;
};
