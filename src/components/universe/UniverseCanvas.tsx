"use client";

import { OrbitControls } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { Vector2, Vector3 } from "three";
import { PlanetConfig } from "@/types/universe";
import { UniverseScene } from "./scene/UniverseScene";

interface UniverseCanvasProps {
  activePlanetId?: string;
  hoverPlanetId?: string;
  introProgress: number;
  onSelectPlanet: (planet: PlanetConfig, position: Vector3) => void;
  onHoverPlanet: (id?: string) => void;
}

export function UniverseCanvas({
  activePlanetId,
  hoverPlanetId,
  introProgress,
  onSelectPlanet,
  onHoverPlanet,
}: UniverseCanvasProps) {
  const dpr = useMemo<[number, number]>(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return [1, 1.25];
    }

    return [1, 1.6];
  }, []);

  return (
    <Canvas
      className="universe-canvas"
      shadows
      dpr={dpr}
      camera={{ position: [0, 5, 20], fov: 52 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <UniverseScene
        activePlanetId={activePlanetId}
        hoverPlanetId={hoverPlanetId}
        introProgress={introProgress}
        onSelectPlanet={onSelectPlanet}
        onHoverPlanet={onHoverPlanet}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        maxDistance={30}
        minDistance={8}
        maxPolarAngle={Math.PI * 0.7}
        rotateSpeed={0.4}
      />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.25} luminanceSmoothing={0.4} intensity={0.8} />
        <ChromaticAberration offset={new Vector2(0.0003, 0.0003)} />
      </EffectComposer>
    </Canvas>
  );
}
