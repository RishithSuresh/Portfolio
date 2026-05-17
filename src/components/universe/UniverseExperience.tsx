"use client";

import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import { planets } from "@/data/planets";
import { useSoundscape } from "@/hooks/useSoundscape";
import { PlanetConfig } from "@/types/universe";
import { UniverseCanvas } from "./UniverseCanvas";
import { AiAssistant } from "./ui/AiAssistant";
import { HudOverlay } from "./ui/HudOverlay";
import { IntroSequence } from "./ui/IntroSequence";

export function UniverseExperience() {
  const [introDone, setIntroDone] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [activePlanet, setActivePlanet] = useState<PlanetConfig>();
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string>();

  useEffect(() => {
    const state = { value: 0 };

    const tween = gsap.to(state, {
      value: 1,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => setIntroProgress(state.value),
      onComplete: () => setIntroDone(true),
    });

    return () => {
      tween.kill();
    };
  }, []);

  useSoundscape({ activeId: activePlanet?.id, introDone });

  const hoveredPlanet = useMemo(
    () => planets.find((planet) => planet.id === hoveredPlanetId),
    [hoveredPlanetId],
  );

  return (
    <div className="universe-root">
      <UniverseCanvas
        introProgress={introProgress}
        activePlanetId={activePlanet?.id}
        hoverPlanetId={hoveredPlanetId}
        onHoverPlanet={setHoveredPlanetId}
        onSelectPlanet={(planet: PlanetConfig) => {
          setActivePlanet(planet);
        }}
      />
      <IntroSequence done={introDone} />
      <HudOverlay activePlanet={activePlanet} hoveredPlanet={hoveredPlanet} />
      <AiAssistant activeLabel={activePlanet?.title ?? hoveredPlanet?.title} />
    </div>
  );
}
