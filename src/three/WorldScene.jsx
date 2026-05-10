import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import AtmosphereBackground from './AtmosphereBackground';
import AICore from './AICore';
import Monoliths from './Monoliths';
import AmbientParticles from './AmbientParticles';
import AncientNature from './AncientNature';
import { useWorld } from '../context/WorldContext';

// Camera target per zone — drives cinematic transitions when navigating.
const ZONE_CAMERA = {
  home:       { pos: [0, 0.2, 6.0], look: [0, 0, 0],   fov: 38 },
  about:      { pos: [-1.4, 0.6, 5.4], look: [0.4, 0.1, 0], fov: 36 },
  projects:   { pos: [1.6, -0.2, 5.6], look: [-0.2, 0, 0], fov: 40 },
  skills:     { pos: [0, 1.0, 5.2], look: [0, -0.2, 0], fov: 42 },
  certifications: { pos: [1.0, 0.2, 5.0], look: [0.1, 0.1, 0], fov: 39 },
  experience: { pos: [-1.2, -0.8, 5.8], look: [0.2, 0.4, 0], fov: 38 },
  contact:    { pos: [0, 0, 4.6], look: [0, 0, 0],     fov: 34 },
};

function Rig() {
  const { zone, cursor } = useWorld();
  const lookAt = useRef(new THREE.Vector3());
  useFrame((state) => {
    const cam = state.camera;
    const target = ZONE_CAMERA[zone] ?? ZONE_CAMERA.home;
    // Gentle parallax around the zone target based on cursor.
    const px = (cursor.current.x - 0.5) * 0.6;
    const py = -(cursor.current.y - 0.5) * 0.4;
    const tx = target.pos[0] + px;
    const ty = target.pos[1] + py;
    const tz = target.pos[2];
    cam.position.x += (tx - cam.position.x) * 0.04;
    cam.position.y += (ty - cam.position.y) * 0.04;
    cam.position.z += (tz - cam.position.z) * 0.04;
    cam.fov += (target.fov - cam.fov) * 0.04;
    cam.updateProjectionMatrix();
    lookAt.current.set(target.look[0], target.look[1], target.look[2]);
    cam.lookAt(lookAt.current);
  });
  return null;
}

export default function WorldScene() {
  const { tier } = useWorld();
  const dpr = tier === 'low' ? [1, 1] : tier === 'mid' ? [1, 1.5] : [1, 2];
  const showParticles = tier !== 'low';
  const showBloom = tier !== 'low';

  return (
    <Canvas
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      dpr={dpr}
      camera={{ position: [0, 0.2, 6], fov: 38, near: 0.1, far: 50 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <color attach="background" args={['#0A0E14']} />
      <fog attach="fog" args={['#0A0E14', 6, 18]} />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <Suspense fallback={null}>
        <AtmosphereBackground />

        {/* Soft cinematic lighting */}
        <ambientLight intensity={0.24} color="#c6d3b2" />
        <hemisphereLight intensity={0.3} color="#f4ecd4" groundColor="#1b2018" />
        <directionalLight position={[5, 6, 3]} intensity={0.82} color="#ffe7c2" />
        <pointLight position={[-3, -1, 2]} intensity={0.22} color="#8fb36a" distance={16} />
        <pointLight position={[3, 1.5, 1]} intensity={0.18} color="#8a7f5e" distance={14} />
        <pointLight position={[-5, 0, -5]} intensity={0.16} color="#b6d7a8" distance={18} />

        <Environment preset="forest" background={false} />

        <AICore position={[0, 0, 0]} scale={1} />
        <Monoliths count={tier === 'low' ? 3 : 6} />
        <AncientNature />
        {showParticles && <AmbientParticles count={tier === 'mid' ? 140 : 220} />}

        <Rig />
        <Preload all />
      </Suspense>

      {showBloom && (
        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.75}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.00025, 0.00035]} blendFunction={BlendFunction.NORMAL} />
          <Vignette eskil={false} offset={0.25} darkness={0.78} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
