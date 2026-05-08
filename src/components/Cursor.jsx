import { useEffect, useRef, useState } from 'react';

// Custom holographic cursor: a soft outer ring that lags + a precise dot.
// Reacts to elements with [data-magnetic] (expand) or [data-cursor="text"].
export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const state = useRef({
    x: 0, y: 0, tx: 0, ty: 0,
    rs: 1, trs: 1, // ring scale
    label: '',
  });

  useEffect(() => {
    const can = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!can) return;
    setEnabled(true);
    document.body.classList.add('cursor-active');

    const onMove = (e) => {
      state.current.tx = e.clientX;
      state.current.ty = e.clientY;
    };
    const onOver = (e) => {
      const t = e.target.closest('[data-magnetic],[data-cursor]');
      if (!t) {
        state.current.trs = 1;
        state.current.label = '';
        return;
      }
      if (t.hasAttribute('data-magnetic')) state.current.trs = 2.4;
      if (t.dataset.cursor === 'text') state.current.trs = 0.6;
    };
    const onOut = () => { state.current.trs = 1; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    let raf;
    const loop = () => {
      const s = state.current;
      // Ring lerps slowly for cinematic lag
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      s.rs += (s.trs - s.rs) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.x - 18}px, ${s.y - 18}px, 0) scale(${s.rs})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.tx - 3}px, ${s.ty - 3}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full"
        style={{
          border: '1px solid rgba(91,192,190,0.55)',
          boxShadow: '0 0 18px rgba(91,192,190,0.18), inset 0 0 8px rgba(91,192,190,0.12)',
          mixBlendMode: 'screen',
          transition: 'border-color 200ms ease',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-cyan"
        style={{ boxShadow: '0 0 10px rgba(91,192,190,0.7)' }}
      />
    </>
  );
}
