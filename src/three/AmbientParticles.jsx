import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Soft drifting particles — subtle "dust in light" feel.
// Count is bounded; we never go particle-soup.
export default function AmbientParticles({ count = 220, area = 18 }) {
  const ref = useRef();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * area;
      positions[i * 3 + 1] = (Math.random() - 0.5) * area * 0.55;
      positions[i * 3 + 2] = (Math.random() - 0.9) * area * 0.6;
      sizes[i] = Math.random() * 1.2 + 0.2;
    }
    return { positions, sizes };
  }, [count, area]);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: '#D9E2EC',
    size: 0.018,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.01;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      pos.array[iy] += Math.sin(t * 0.3 + i) * 0.0009;
      // wrap softly within area
      if (pos.array[iy] > area * 0.3) pos.array[iy] = -area * 0.3;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}
