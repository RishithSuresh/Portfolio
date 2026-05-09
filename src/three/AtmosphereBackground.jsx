import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereVertex, atmosphereFragment } from './shaders/atmosphere';
import { useWorld } from '../context/WorldContext';

// Fullscreen shader plane behind the scene.
// Mood shifts smoothly when the active zone changes.
const ZONE_MOOD = {
  home: 0.05,
  about: 0.2,
  projects: 0.55,
  skills: 0.35,
  experience: 0.7,
  contact: 0.15,
};

export default function AtmosphereBackground() {
  const { zone, ignited, cursor } = useWorld();
  const matRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMood: { value: ZONE_MOOD.home },
    uIntensity: { value: 0.0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value += dt;
    u.uResolution.value.set(size.width, size.height);

    // Smoothly chase target intensity / mood.
    const targetI = ignited ? 1.0 : 0.55;
    const targetM = ZONE_MOOD[zone] ?? 0.2;
    u.uIntensity.value += (targetI - u.uIntensity.value) * 0.03;
    u.uMood.value     += (targetM - u.uMood.value) * 0.02;

    u.uMouse.value.x += (cursor.current.x - u.uMouse.value.x) * 0.04;
    u.uMouse.value.y += (cursor.current.y - u.uMouse.value.y) * 0.04;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
