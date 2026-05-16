import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function ImmersiveCore() {
  const groupRef = useRef();
  const ringsRef = useRef();
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 56; i += 1) {
      const radius = 2 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.8;
      data.push([
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
        0.08 + Math.random() * 0.18,
      ]);
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    const { mouse } = state;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.3, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouse.x * 0.3, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 0.3, 0.05);
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.x += delta * 0.1;
      ringsRef.current.rotation.y -= delta * 0.08;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.75}>
          <mesh>
            <icosahedronGeometry args={[1.05, 1]} />
            <meshStandardMaterial
              color="#78ffd6"
              emissive="#59d7ff"
              emissiveIntensity={0.55}
              metalness={0.5}
              roughness={0.25}
              wireframe
            />
          </mesh>
        </Float>
      </group>

      <group ref={ringsRef}>
        <mesh rotation={[Math.PI * 0.15, Math.PI * 0.15, 0]}>
          <torusGeometry args={[2.25, 0.03, 16, 100]} />
          <meshStandardMaterial color="#89ff5d" emissive="#89ff5d" emissiveIntensity={0.22} />
        </mesh>
        <mesh rotation={[Math.PI * 0.5, 0, Math.PI * 0.25]}>
          <torusGeometry args={[2.8, 0.024, 16, 100]} />
          <meshStandardMaterial color="#63b3ff" emissive="#63b3ff" emissiveIntensity={0.18} />
        </mesh>
      </group>

      <group ref={particlesRef}>
        {particles.map((particle, index) => (
          <mesh key={`particle-${index}`} position={[particle[0], particle[1], particle[2]]}>
            <sphereGeometry args={[particle[3], 16, 16]} />
            <meshStandardMaterial color={index % 2 ? '#b8ff58' : '#88d7ff'} emissive="#6ec8ff" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function RubiksCube() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.2, 8], fov: 42 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#05070f']} />
        <fog attach="fog" args={['#05070f', 5, 15]} />
        <ambientLight intensity={0.48} />
        <directionalLight position={[2.4, 2.6, 4.2]} intensity={1.2} color={new THREE.Color('#9effdb')} />
        <directionalLight position={[-3, -2, -4]} intensity={0.72} color={new THREE.Color('#6bb0ff')} />
        <ImmersiveCore />
        <Stars radius={80} depth={25} count={2600} factor={3.2} saturation={0.9} fade speed={0.75} />
      </Canvas>
    </div>
  );
}
