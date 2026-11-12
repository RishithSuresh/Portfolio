
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';

function Sculpture() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={256}
            thickness={0.8}
            roughness={0.16}
            transmission={0.92}
            ior={1.25}
            chromaticAberration={0.04}
            anisotropy={0.2}
            color="#D9A79A"
          />
        </mesh>
      </Float>

      <mesh rotation={[1.1, 0.3, 0.4]}>
        <torusGeometry args={[1.65, 0.009, 12, 120]} />
        <meshStandardMaterial color="#FFC400" transparent opacity={0.7} />
      </mesh>

      <mesh rotation={[0.4, 0.8, 1.2]}>
        <torusGeometry args={[1.85, 0.007, 12, 120]} />
        <meshStandardMaterial color="#D9A79A" transparent opacity={0.65} />
      </mesh>

      <mesh position={[1.5, 0.7, 0.2]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#FFC400" emissive="#FFC400" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 5, 5]} intensity={2} color="#D9A79A" />
      <pointLight position={[-4, -2, 3]} intensity={2} color="#FFC400" />

      <Sculpture />

      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
