"use client";

import { motion } from "framer-motion";

interface AiAssistantProps {
  activeLabel?: string;
}

export function AiAssistant({ activeLabel }: AiAssistantProps) {
  return (
    <motion.div
      className="ai-assistant glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1.8 }}
    >
      <div className="orb" aria-hidden />
      <div>
        <p className="micro">AETHER // AI GUIDE</p>
        <p>{activeLabel ? `Now approaching ${activeLabel}.` : "Welcome. Select a planet to begin exploration."}</p>
      </div>
    </motion.div>
  );
}
