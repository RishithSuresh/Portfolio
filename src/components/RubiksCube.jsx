import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const palette = ['#b8ff58', '#8bff5f', '#33d1ff', '#42e8c5', '#f0ea3b', '#111320'];

function CubeCluster() {
  const groupRef = useRef();
  const cubes = useMemo(() => {
    const out = [];

    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          if (x === 0 && y === 0 && z === 0) continue;

          const indexSeed = Math.abs(x * 7 + y * 11 + z * 13);
          out.push({
            position: [x * 0.68, y * 0.68, z * 0.68],
            color: palette[indexSeed % palette.length],
          });
        }
      }
    }

    return out;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, index) => (
        <mesh key={`${cube.position.join('-')}-${index}`} position={cube.position}>
          <boxGeometry args={[0.58, 0.58, 0.58]} />
          <meshStandardMaterial color={cube.color} roughness={0.32} metalness={0.22} />
        </mesh>
      ))}
    </group>
  );
}

export default function RubiksCube() {
  return (
    <div className="cube-wrap" aria-label="Interactive 3D Rubiks Cube">
      <Canvas camera={{ position: [3.3, 3.2, 3.8], fov: 42 }}>
        <color attach="background" args={['#eaedf3']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 5, 4]} intensity={1.05} />
        <directionalLight position={[-4, -2, -5]} intensity={0.45} color={new THREE.Color('#95ff5a')} />
        <CubeCluster />
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.4} maxPolarAngle={2.5} />
      </Canvas>
    </div>
  );
}
