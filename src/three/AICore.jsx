import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useWorld } from '../context/WorldContext';

// The "AI core" — a layered icosahedron + halo + slow rotation rings.
// Shifts color subtly based on zone mood.
export default function AICore({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef();
  const inner = useRef();
  const outer = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const { cursor, ignited } = useWorld();

  const ringGeo = useMemo(() => {
    const g = new THREE.TorusGeometry(1.55, 0.005, 16, 200);
    return g;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const tx = (cursor.current.x - 0.5) * 0.6;
      const ty = -(cursor.current.y - 0.5) * 0.4;
      group.current.rotation.y += (tx - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (ty - group.current.rotation.x) * 0.04;
      group.current.position.y = position[1] + Math.sin(t * 0.6) * 0.08;
    }
    if (inner.current) inner.current.rotation.y += dt * 0.25;
    if (outer.current) {
      outer.current.rotation.y -= dt * 0.18;
      outer.current.rotation.x += dt * 0.06;
    }
    if (ring1.current) ring1.current.rotation.z += dt * 0.12;
    if (ring2.current) ring2.current.rotation.x += dt * 0.08;
    const pulse = 0.95 + Math.sin(t * 1.4) * 0.05;
    if (group.current) group.current.scale.setScalar(scale * (ignited ? pulse : 0.85));
  });

  return (
    <group ref={group} position={position}>
      {/* Inner solid core */}
      <Icosahedron ref={inner} args={[0.55, 1]}>
        <meshStandardMaterial
          color="#1c2431"
          metalness={0.7}
          roughness={0.25}
          emissive="#2E8B57"
          emissiveIntensity={0.35}
        />
      </Icosahedron>

      {/* Outer wireframe shell */}
      <Icosahedron ref={outer} args={[1.05, 2]}>
        <meshBasicMaterial color="#5BC0BE" wireframe transparent opacity={0.35} />
      </Icosahedron>

      {/* Soft halo */}
      <Sphere args={[1.25, 32, 32]}>
        <meshBasicMaterial color="#5BC0BE" transparent opacity={0.04} />
      </Sphere>

      {/* Orbiting hairline rings */}
      <mesh ref={ring1} geometry={ringGeo}>
        <meshBasicMaterial color="#D9E2EC" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} geometry={ringGeo} rotation={[Math.PI / 2.1, 0, 0]}>
        <meshBasicMaterial color="#5BC0BE" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
