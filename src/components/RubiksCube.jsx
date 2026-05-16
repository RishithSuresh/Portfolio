import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function ImmersiveCore() {
  const groupRef = useRef();
  const ringsRef = useRef();
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 72; i += 1) {
      const radius = 2 + Math.random() * 4.4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.1;
      data.push([
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
        0.06 + Math.random() * 0.16,
      ]);
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.19;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.35, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouse.x * 0.35, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.65, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 0.45, 0.05);
      groupRef.current.position.z = Math.sin(t * 0.8) * 0.2;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.x += delta * 0.14;
      ringsRef.current.rotation.y -= delta * 0.1;
      ringsRef.current.rotation.z += delta * 0.06;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
      particlesRef.current.rotation.x = Math.sin(t * 0.3) * 0.18;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.05}>
          <mesh>
            <icosahedronGeometry args={[1.08, 2]} />
            <meshStandardMaterial
              color="#86ffe9"
              emissive="#60d8ff"
              emissiveIntensity={0.7}
              metalness={0.62}
              roughness={0.2}
              wireframe
            />
          </mesh>
        </Float>
      </group>

      <group ref={ringsRef}>
        <mesh rotation={[Math.PI * 0.14, Math.PI * 0.1, 0]}>
          <torusGeometry args={[2.2, 0.03, 16, 140]} />
          <meshStandardMaterial color="#89ff5d" emissive="#89ff5d" emissiveIntensity={0.33} />
        </mesh>
        <mesh rotation={[Math.PI * 0.5, 0, Math.PI * 0.28]}>
          <torusGeometry args={[2.9, 0.024, 16, 140]} />
          <meshStandardMaterial color="#63b3ff" emissive="#63b3ff" emissiveIntensity={0.24} />
        </mesh>
        <mesh rotation={[Math.PI * 0.84, Math.PI * 0.2, Math.PI * 0.4]}>
          <torusGeometry args={[3.3, 0.018, 16, 140]} />
          <meshStandardMaterial color="#b5a4ff" emissive="#b5a4ff" emissiveIntensity={0.2} />
        </mesh>
      </group>

      <group ref={particlesRef}>
        {particles.map((particle, index) => (
          <mesh key={`particle-${index}`} position={[particle[0], particle[1], particle[2]]}>
            <sphereGeometry args={[particle[3], 16, 16]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? '#b8ff58' : index % 2 ? '#88d7ff' : '#d2b6ff'}
              emissive="#6ec8ff"
              emissiveIntensity={0.24}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function RubiksCube() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.2, 8], fov: 42 }} dpr={[1, 1.7]}>
        <color attach="background" args={['#03050d']} />
        <fog attach="fog" args={['#03050d', 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 4]} intensity={1.1} color={new THREE.Color('#88dcff')} />
        <directionalLight position={[2.5, 2.6, 4]} intensity={1.32} color={new THREE.Color('#9effdb')} />
        <directionalLight position={[-3.2, -2, -4]} intensity={0.8} color={new THREE.Color('#7c9eff')} />

        <ImmersiveCore />

        <Sparkles count={120} scale={12} size={2.1} speed={0.35} color="#9ce2ff" opacity={0.65} />
        <Stars radius={85} depth={32} count={3200} factor={3.8} saturation={1} fade speed={0.9} />

        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.08} luminanceSmoothing={0.42} />
          <ChromaticAberration offset={new THREE.Vector2(0.0009, 0.0012)} />
          <Noise opacity={0.06} />
          <Vignette eskil={false} offset={0.16} darkness={0.76} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
