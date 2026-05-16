import { useMemo } from 'react';
import { useWorld } from '../context/WorldContext';

const ZONE_PALETTE = {
  home: ['rgba(56,239,245,0.26)', 'rgba(217,70,239,0.22)', 'rgba(0,201,122,0.18)'],
  about: ['rgba(96,165,250,0.22)', 'rgba(56,239,245,0.18)', 'rgba(139,92,246,0.20)'],
  projects: ['rgba(0,201,122,0.25)', 'rgba(56,239,245,0.20)', 'rgba(245,158,11,0.14)'],
  skills: ['rgba(139,92,246,0.26)', 'rgba(56,239,245,0.20)', 'rgba(217,70,239,0.22)'],
  certifications: ['rgba(217,70,239,0.24)', 'rgba(96,165,250,0.20)', 'rgba(217,226,236,0.14)'],
  experience: ['rgba(245,158,11,0.20)', 'rgba(0,201,122,0.20)', 'rgba(56,239,245,0.16)'],
  contact: ['rgba(0,201,122,0.24)', 'rgba(56,239,245,0.22)', 'rgba(217,70,239,0.18)'],
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
