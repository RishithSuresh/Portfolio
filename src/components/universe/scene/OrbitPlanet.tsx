"use client";

import { Html } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";
import { PlanetConfig } from "@/types/universe";

interface OrbitPlanetProps {
  config: PlanetConfig;
  index: number;
  active: boolean;
  onSelect: (id: string, position: Vector3) => void;
  onHover: (id?: string) => void;
}

export function OrbitPlanet({ config, index, active, onSelect, onHover }: OrbitPlanetProps) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const phaseOffset = useMemo(() => index * 1.3, [index]);

  useFrame((state) => {
    if (!group.current || !mesh.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    const angle = t * config.orbitSpeed + phaseOffset;

    group.current.position.set(
      Math.cos(angle) * config.orbitRadius,
      Math.sin(angle * 0.35) * 1.3,
      Math.sin(angle) * config.orbitRadius,
    );

    mesh.current.rotation.y += 0.008;
    mesh.current.rotation.x = Math.sin(t * 0.6 + index) * 0.16;

    const intensity = hovered || active ? 1.2 : 0.45;
    const material = mesh.current.material;
    if (!Array.isArray(material) && "emissiveIntensity" in material) {
      material.emissiveIntensity = intensity;
    }
  });

  const handleSelect = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (!group.current) {
      return;
    }

    onSelect(config.id, group.current.position.clone());
  };

  const handleEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    onHover(config.id);
  };

  const handleLeave = () => {
    setHovered(false);
    onHover(undefined);
  };

  return (
    <group ref={group}>
      <mesh ref={mesh} onClick={handleSelect} onPointerOver={handleEnter} onPointerOut={handleLeave} castShadow>
        <icosahedronGeometry args={[config.size, 4]} />
        <meshStandardMaterial color={config.color} emissive={config.accent} emissiveIntensity={0.45} metalness={0.65} roughness={0.2} />
      </mesh>

      <mesh scale={1.25}>
        <sphereGeometry args={[config.size, 48, 48]} />
        <meshBasicMaterial color={config.atmosphere} transparent opacity={0.09} />
      </mesh>

      {(hovered || active) && (
        <Html distanceFactor={11} position={[0, config.size + 0.8, 0]} center>
          <div className="planet-label">
            <h3>{config.title}</h3>
            <p>{config.subtitle}</p>
          </div>
        </Html>
      )}
    </group>
  );
}
