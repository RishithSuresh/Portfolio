import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorld } from '../context/WorldContext';

function seedRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function buildPalette(index) {
  switch (index % 6) {
    case 0: return new THREE.Color('#dff7b5');
    case 1: return new THREE.Color('#a8f5c4');
    case 2: return new THREE.Color('#79f0ea');
    case 3: return new THREE.Color('#c6f6ff');
    case 4: return new THREE.Color('#c5f09a');
    default: return new THREE.Color('#8fe6b1');
  }
}

function ParticleField({ count, area, depth, seed }) {
  const points = useRef();
  const rand = useMemo(() => seedRandom(seed), [seed]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      base: [
        (rand() - 0.5) * area,
        -2.3 + rand() * 6.8,
        -1.2 - rand() * depth,
      ],
      orbit: 0.25 + rand() * 1.6,
      speed: 0.08 + rand() * 0.24,
      drift: 0.05 + rand() * 0.22,
      phase: rand() * Math.PI * 2 + index * 0.06,
      scale: 0.035 + rand() * 0.085,
      color: buildPalette(index),
    }));
  }, [area, count, depth, rand]);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      pos.set(particle.base, i * 3);
      col.set([particle.color.r, particle.color.g, particle.color.b], i * 3);
    }
    return { positions: pos, colors: col };
  }, [count, particles]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    const geometry = points.current.geometry;
    const positionAttr = geometry.attributes.position;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const angle = t * particle.speed + particle.phase;
      const [bx, by, bz] = particle.base;

      const x = bx + Math.cos(angle) * particle.orbit;
      const y = by + Math.sin(angle * 1.7) * particle.drift + Math.sin(t * 0.22 + i) * 0.12;
      const z = bz + Math.sin(angle * 0.9) * particle.orbit * 0.5;

      positionAttr.setXYZ(i, x, y, z);
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(particle.scale * (0.78 + Math.sin(t * 1.6 + particle.phase) * 0.22));
      dummy.updateMatrix();
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        sizeAttenuation
        vertexColors
        color="#ffffff"
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowWash() {
  return (
    <mesh position={[0, -0.4, -5.5]}>
      <planeGeometry args={[18, 12]} />
      <meshBasicMaterial
        color="#76d9a4"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function AncientNature() {
  const { tier } = useWorld();
  const primaryCount = tier === 'low' ? 120 : tier === 'mid' ? 180 : 260;
  const secondaryCount = tier === 'low' ? 42 : tier === 'mid' ? 60 : 88;
  const area = tier === 'low' ? 8.5 : tier === 'mid' ? 11 : 13.5;
  const depth = tier === 'low' ? 5.5 : tier === 'mid' ? 7 : 8.5;

  return (
    <group>
      <GlowWash />
      <ParticleField count={primaryCount} area={area} depth={depth} seed={7813} />
      <ParticleField count={secondaryCount} area={area * 0.72} depth={depth * 0.72} seed={9931} />
    </group>
  );
}