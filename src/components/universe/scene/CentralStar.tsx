"use client";

import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, PointLight } from "three";

export function CentralStar() {
  const group = useRef<Group>(null);
  const light = useRef<PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.2 + state.pointer.x * 0.2;
      group.current.rotation.x = state.pointer.y * 0.1;
    }

    if (light.current) {
      light.current.intensity = 2.2 + Math.sin(t * 1.6) * 0.3;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh>
          <sphereGeometry args={[1.15, 96, 96]} />
          <meshStandardMaterial emissive="#8bb8ff" emissiveIntensity={2.2} color="#3557ff" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh scale={1.6}>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshBasicMaterial color="#7db2ff" transparent opacity={0.1} />
        </mesh>
      </Float>
      <pointLight ref={light} intensity={2.3} distance={45} color="#95b8ff" />
      <Html center distanceFactor={9.5} position={[0, -2.7, 0]}>
        <div className="star-label">
          <p className="star-kicker">CENTRAL STAR HUB</p>
          <h1>Rishith Suresh</h1>
          <p>Building intelligent systems at the edge of AI, security, data, and design.</p>
        </div>
      </Html>
    </group>
  );
}
