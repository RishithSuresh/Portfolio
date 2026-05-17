"use client";

import { motion } from "framer-motion";

interface IntroSequenceProps {
  done: boolean;
}

export function IntroSequence({ done }: IntroSequenceProps) {
  return (
    <motion.div
      className="intro-sequence"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 2.6, ease: "easeInOut" }}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: done ? 0 : 1, y: done ? -20 : 0 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>Initializing cinematic universe…</p>
        <h2>Rishith Suresh</h2>
      </motion.div>
    </motion.div>
  );
}
