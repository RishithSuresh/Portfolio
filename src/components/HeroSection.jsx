import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, GitBranch } from 'lucide-react';

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 28;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const lines = ['Designing elegant', 'digital experiences', 'for modern products'];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 pt-36 pb-24 overflow-hidden">
      <motion.div
        className="absolute w-[34rem] h-[34rem] rounded-full blur-3xl bg-white/15"
        style={{ top: '14%', left: '50%', transform: 'translateX(-50%)' }}
        animate={{ x: mousePosition.x * 0.35, y: mousePosition.y * 0.35 }}
        transition={{ type: 'spring', stiffness: 35, damping: 18 }}
      />

      <motion.div
        className="absolute bottom-16 right-10 w-40 h-40 rounded-full blur-3xl bg-white/10"
        animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-white/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          Open to select collaborations
        </motion.div>

        <div className="mt-8 space-y-2">
          {lines.map((line, idx) => (
            <motion.h1
              key={line}
              className="text-5xl sm:text-6xl lg:text-8xl leading-[0.94] font-bold text-white"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2 + idx * 0.15 }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          Full-stack developer focused on crafting premium interfaces, robust web platforms, and immersive user journeys with clean engineering.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          <motion.a
            href="#projects"
            className="pill-button text-white"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore projects
            <ArrowRight size={16} />
          </motion.a>

          <motion.a
            href="#contact"
            className="pill-button text-white/85"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a conversation
          </motion.a>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button text-white/85"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <GitBranch size={16} />
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-9 left-1/2 -translate-x-1/2 text-white/55 hover:text-white transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={30} />
      </motion.a>
    </section>
  );
};
