"use client";

import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BackSide, Group } from "three";

export function CosmicBackdrop() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = state.clock.elapsedTime * 0.01;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
  });

  return (
    <group ref={group}>
      <Stars radius={300} depth={60} count={10000} factor={8} fade speed={0.4} />
      <mesh position={[0, 0, -120]}>
        <sphereGeometry args={[80, 48, 48]} />
        <meshBasicMaterial color="#1a1f3f" transparent opacity={0.22} side={BackSide} />
      </mesh>
      <mesh position={[0, 14, -80]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial color="#4e2ea8" transparent opacity={0.15} side={BackSide} />
      </mesh>
    </group>
  );
}
