import { useEffect, useRef, useState } from 'react';
import { useWorld } from '../context/WorldContext';

const TTL = 900;
const MAX_TRAILS = 18;

export default function PointerTrails() {
  const { ignited, tier } = useWorld();
  const [trails, setTrails] = useState([]);
  const [now, setNow] = useState(Date.now());
  const lastEmit = useRef(0);

  useEffect(() => {
    if (!ignited || tier === 'low') return;
    const can = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!can) return;

    const onMove = (e) => {
      const t = performance.now();
      if (t - lastEmit.current < 28) return;
      lastEmit.current = t;
      setTrails((prev) => [
        ...prev.slice(-(MAX_TRAILS - 1)),
        {
          id: `${t}-${Math.random().toString(36).slice(2, 7)}`,
          x: e.clientX,
          y: e.clientY,
          born: Date.now(),
          hue: 176 + ((Math.random() * 2 - 1) * 18),
          size: 10 + Math.random() * 22,
        },
      ]);
    };

    const tick = setInterval(() => {
      const t = Date.now();
      setNow(t);
      setTrails((prev) => prev.filter((trail) => t - trail.born < TTL));
    }, 45);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      clearInterval(tick);
      window.removeEventListener('pointermove', onMove);
    };
  }, [ignited, tier]);

  if (!ignited || tier === 'low' || trails.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[35]">
      {trails.map((trail) => {
        const life = Math.max(0, 1 - (now - trail.born) / TTL);
        const scale = 0.55 + (1 - life) * 1.25;
        return (
          <span
            key={trail.id}
            className="absolute rounded-full"
            style={{
              left: trail.x,
              top: trail.y,
              width: `${trail.size}px`,
              height: `${trail.size}px`,
              opacity: life * 0.95,
              transform: `translate(-50%, -50%) scale(${scale})`,
              background: `radial-gradient(circle, hsla(${trail.hue}, 90%, 70%, ${life}), transparent 70%)`,
              boxShadow: `0 0 ${14 + trail.size}px hsla(${trail.hue}, 90%, 70%, ${life * 0.5})`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </div>
  );
}
