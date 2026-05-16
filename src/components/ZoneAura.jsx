import { useMemo } from 'react';
import { useWorld } from '../context/WorldContext';

const ZONE_PALETTE = {
  home: ['rgba(157,23,77,0.32)', 'rgba(245,158,11,0.24)', 'rgba(217,70,239,0.20)'],
  about: ['rgba(245,158,11,0.26)', 'rgba(157,23,77,0.22)', 'rgba(217,70,239,0.20)'],
  projects: ['rgba(157,23,77,0.30)', 'rgba(217,70,239,0.24)', 'rgba(245,158,11,0.20)'],
  skills: ['rgba(217,70,239,0.28)', 'rgba(245,158,11,0.22)', 'rgba(157,23,77,0.22)'],
  certifications: ['rgba(245,158,11,0.22)', 'rgba(217,70,239,0.24)', 'rgba(232,221,199,0.12)'],
  experience: ['rgba(157,23,77,0.28)', 'rgba(245,158,11,0.22)', 'rgba(217,70,239,0.18)'],
  contact: ['rgba(245,158,11,0.26)', 'rgba(157,23,77,0.24)', 'rgba(217,70,239,0.22)'],
};

export default function ZoneAura() {
  const { zone, ignited } = useWorld();
  if (!ignited) return null;

  const [a, b, c] = useMemo(() => ZONE_PALETTE[zone] ?? ZONE_PALETTE.home, [zone]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden zone-aura-layer"
      style={{
        ['--zone-a']: a,
        ['--zone-b']: b,
        ['--zone-c']: c,
      }}
    >
      <div className="zone-aura-blend" />
      <div className="zone-aura-sweep" />
    </div>
  );
}
