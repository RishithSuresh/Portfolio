import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="glass-effect p-3 rounded-lg border border-text/20 text-text hover:border-primary/50 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0, scale: isDarkMode ? 1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <Moon size={20} className="text-yellow-400" />
        ) : (
          <Sun size={20} className="text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};
