import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink, GitBranch } from 'lucide-react';

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary blur-3xl opacity-20"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{ top: '10%', right: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-secondary blur-3xl opacity-20"
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{ bottom: '20%', left: '5%' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-block mb-6"
        >
          <motion.div
            className="glass-effect px-6 py-3 rounded-full flex items-center gap-2 w-fit mx-auto border border-primary/30"
            whileHover={{ scale: 1.05, borderColor: '#FFA700' }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Available for opportunities</span>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-grotesk font-bold text-text mb-6 leading-tight"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Crafting Digital
          </motion.span>
          <motion.span
            className="block gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Experiences
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted mb-12 max-w-2xl mx-auto"
        >
          Full Stack Developer | AI/ML Enthusiast | Cloud Solutions Architect
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href="#projects"
            className="group glass-effect px-8 py-4 rounded-lg border border-primary/50 text-text font-medium flex items-center justify-center gap-2 hover:bg-primary/10 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255, 167, 0, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#contact"
            className="group glass-effect px-8 py-4 rounded-lg border border-secondary/50 text-text font-medium flex items-center justify-center gap-2 hover:bg-secondary/10 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#"
            className="group glass-effect px-8 py-4 rounded-lg border border-text/20 text-text font-medium flex items-center justify-center gap-2 hover:border-text/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GitBranch size={18} />
            GitHub
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6"
        >
          {[
            { icon: '𝕏', href: 'https://twitter.com' },
            { icon: 'in', href: 'https://linkedin.com' },
            { icon: 'GitHub', href: 'https://github.com' },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
              whileHover={{ y: -5 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" className="text-muted hover:text-primary transition-colors">
          <ChevronDown size={28} />
        </a>
      </motion.div>
    </section>
  );
};
