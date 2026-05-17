"use client";

import { motion } from "framer-motion";
import { PlanetConfig } from "@/types/universe";

interface HudOverlayProps {
  activePlanet?: PlanetConfig;
  hoveredPlanet?: PlanetConfig;
}

export function HudOverlay({ activePlanet, hoveredPlanet }: HudOverlayProps) {
  const shown = activePlanet ?? hoveredPlanet;

  return (
    <div className="hud-layer">
      <div className="hud-top-left glass">
        <p className="micro">UNIVERSE NODE</p>
        <h3>Rishith Suresh</h3>
        <p>AI · Cybersecurity · Music Tech · Data · Experimental Systems</p>
      </div>

      <div className="hud-bottom-left glass">
        <p className="micro">NAVIGATION</p>
        <p>Click planets to travel. Drag to orbit. Explore naturally.</p>
      </div>

      <motion.div
        className="hud-right glass"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: shown ? 1 : 0.45, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="micro">ACTIVE DESTINATION</p>
        <h4>{shown?.title ?? "Central Star"}</h4>
        <p>{shown?.description ?? "Core profile, philosophy, and mission data."}</p>
      </motion.div>
    </div>
  );
}
