"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector3 } from "three";
import { planets } from "@/data/planets";
import { PlanetConfig } from "@/types/universe";
import { CentralStar } from "./CentralStar";
import { CosmicBackdrop } from "./CosmicBackdrop";
import { OrbitPlanet } from "./OrbitPlanet";

interface UniverseSceneProps {
  activePlanetId?: string;
  hoverPlanetId?: string;
  introProgress: number;
  onSelectPlanet: (planet: PlanetConfig, position: Vector3) => void;
  onHoverPlanet: (id?: string) => void;
}

export function UniverseScene({
  activePlanetId,
  hoverPlanetId,
  introProgress,
  onSelectPlanet,
  onHoverPlanet,
}: UniverseSceneProps) {
  const { camera } = useThree();

  const destination = useMemo(() => {
    const selected = planets.find((planet) => planet.id === activePlanetId);

    if (!selected) {
      return new Vector3(0, 4.5, 20 - introProgress * 8);
    }

    return new Vector3(selected.orbitRadius * 0.58, 2.4, selected.orbitRadius * 0.58);
  }, [activePlanetId, introProgress]);

  useFrame((state) => {
    camera.position.lerp(destination, 0.035);
    camera.lookAt(0, Math.sin(state.clock.elapsedTime * 0.3) * 0.8, 0);
  });

  return (
    <group>
      <color attach="background" args={["#03050c"]} />
      <fog attach="fog" args={["#050814", 16, 85]} />
      <ambientLight intensity={0.32} color="#718cff" />
      <directionalLight position={[12, 18, 8]} intensity={1.4} color="#9db8ff" castShadow />

      <CosmicBackdrop />
      <CentralStar />

      <group>
        {planets.map((planet, index) => (
          <OrbitPlanet
            key={planet.id}
            config={planet}
            index={index}
            active={activePlanetId === planet.id || hoverPlanetId === planet.id}
            onHover={onHoverPlanet}
            onSelect={(id, position) => {
              const selected = planets.find((item) => item.id === id);
              if (selected) {
                onSelectPlanet(selected, position);
              }
            }}
          />
        ))}
      </group>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.35} width={40} height={40} blur={1.8} far={20} />
      <Environment preset="night" />
    </group>
  );
}
