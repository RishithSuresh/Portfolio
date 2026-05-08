import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// A constellation of slow-floating monoliths that drift around the AI core.
// Their position pattern + count are deterministic for a calm, intentional feel.
const SEEDS = [
  { p: [-3.6, -0.4, -2.2], h: 2.6, w: 0.18, d: 0.18, hue: 'silver' },
  { p: [3.4, 0.6, -2.6], h: 3.2, w: 0.22, d: 0.22, hue: 'cyan' },
  { p: [-5.0, 1.4, -4.0], h: 1.8, w: 0.14, d: 0.14, hue: 'silver' },
  { p: [4.8, -0.8, -4.2], h: 2.0, w: 0.16, d: 0.16, hue: 'emerald' },
  { p: [-2.2, -1.6, -1.4], h: 1.2, w: 0.12, d: 0.12, hue: 'silver' },
  { p: [2.0, 1.8, -1.6], h: 1.0, w: 0.10, d: 0.10, hue: 'cyan' },
  { p: [0, -2.4, -3.2], h: 1.6, w: 0.16, d: 0.16, hue: 'silver' },
  { p: [-6.5, 0.0, -6.0], h: 4.0, w: 0.28, d: 0.28, hue: 'emerald' },
  { p: [6.5, 0.5, -6.5], h: 3.6, w: 0.26, d: 0.26, hue: 'cyan' },
];

const HUES = {
  silver: { color: '#D9E2EC', emissive: '#2A3340', intensity: 0.05 },
  cyan: { color: '#1C2431', emissive: '#5BC0BE', intensity: 0.18 },
  emerald: { color: '#1C2431', emissive: '#2E8B57', intensity: 0.16 },
};

export default function Monoliths({ count = 9 }) {
  const items = useMemo(() => SEEDS.slice(0, count), [count]);
  return (
    <group>
      {items.map((m, i) => (
        <Float
          key={i}
          speed={0.6 + (i % 3) * 0.2}
          rotationIntensity={0.15}
          floatIntensity={0.6}
          floatingRange={[-0.1, 0.1]}
        >
          <Monolith {...m} />
        </Float>
      ))}
    </group>
  );
}

function Monolith({ p, h, w, d, hue }) {
  const ref = useRef();
  const palette = HUES[hue] ?? HUES.silver;
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.1 + p[0]) * 0.05;
  });
  return (
    <mesh ref={ref} position={p} castShadow={false} receiveShadow={false}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color={palette.color}
        emissive={palette.emissive}
        emissiveIntensity={palette.intensity}
        metalness={0.85}
        roughness={0.3}
      />
    </mesh>
  );
}
