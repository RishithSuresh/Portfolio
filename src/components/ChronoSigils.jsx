import { useMemo } from 'react';
import { useWorld } from '../context/WorldContext';
import { zones } from '../data/portfolio';

export default function ChronoSigils() {
  const { ignited, zone, transitioning } = useWorld();
  if (!ignited) return null;

  const active = useMemo(() => zones.find((item) => item.id === zone) ?? zones[0], [zone]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[33] hidden xl:block">
      <SigilWidget side="left" glyph={active.glyph} label={active.label} transitioning={transitioning} />
      <SigilWidget side="right" glyph={active.glyph} label={active.subtitle} transitioning={transitioning} />
    </div>
  );
}

function SigilWidget({ side, glyph, label, transitioning }) {
  const align = side === 'left' ? 'left-10' : 'right-10';
  return (
    <div className={`chrono-sigil ${align}`}>
      <span className="chrono-sigil-core">{glyph}</span>
      <span className="chrono-sigil-ring ring-a" />
      <span className="chrono-sigil-ring ring-b" />
      <span className={`chrono-sigil-ring ring-c ${transitioning ? 'ring-boost' : ''}`} />
      <span className="chrono-sigil-label">{label}</span>
    </div>
  );
}
