import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const partners = ['Framer', 'Webflow', 'Figma', 'Notion', 'React'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 28;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <motion.div
        className="absolute left-1/2 top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(179,160,255,0.22) 0%, rgba(179,160,255,0) 70%)',
          transform: 'translateX(-50%)',
        }}
        animate={{ x: mousePosition.x * 0.35, y: mousePosition.y * 0.35 }}
        transition={{ type: 'spring', stiffness: 35, damping: 18 }}
      />

      <motion.div
        className="absolute right-0 top-24 h-48 w-48 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,214,160,0.14) 0%, rgba(255,214,160,0) 72%)' }}
        animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-white/70">
          <motion.span
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2"
          >
            <span className="spark-dot" />
            Premium portfolio system
          </motion.span>
          <motion.span initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="hidden sm:inline-flex items-center gap-2">
            <Sparkles size={14} className="text-[#ffd6a0]" />
            Available for freelance work
          </motion.span>
        </div>

        <div className="grid-stage min-h-[32rem] px-4 py-10 sm:px-10 sm:py-14 lg:min-h-[38rem] lg:px-16">
          <span className="star-pin left-0 top-1/2 -translate-x-1/2" />
          <span className="star-pin right-[16%] top-[22%]" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(16rem,0.72fr)] lg:items-stretch">
            <motion.div
              className="hero-card glass-effect-lg animate-fadeUp"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <span className="section-kicker justify-center">Ultimate upgrade</span>
              <h1 className="mt-6 max-w-4xl font-grotesk text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.6rem]">
                I design and build clean web experiences
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-muted sm:text-base">
                With thoughtful interaction design, premium spacing, and stronger visual hierarchy to help your portfolio stand out instantly.
              </p>

              <motion.div
                className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35 }}
              >
                <motion.a
                  href="#projects"
                  className="pill-button button-primary text-sm font-medium"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View work
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#contact"
                  className="pill-button text-white/85"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Hire me
                </motion.a>
              </motion.div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {['Modern UI', 'Interactive motion', 'Responsive layout'].map((item) => (
                  <span key={item} className="tag-pill">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="glass-effect-lg flex flex-col justify-between gap-6 rounded-[2rem] p-6 sm:p-7 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
            >
              <div>
                <span className="section-kicker">Live direction</span>
                <h2 className="mt-5 font-grotesk text-2xl font-semibold text-white">Clean hierarchy, glass depth, clear spacing</h2>
                <p className="mt-4 text-sm leading-8 text-muted">
                  The interface leans into editorial spacing, stronger visual breaks, and softer glass surfaces so each block reads clearly.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  'Bigger section breathing room',
                  'More visible panel separation',
                  'Consistent animation pacing',
                ].map((item) => (
                  <div key={item} className="stat-chip justify-start text-sm text-white/82">
                    <Sparkles size={14} className="text-[#ffd6a0]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>

        <motion.div
          className="logo-marquee"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {partners.map((partner) => (
            <div key={partner}>
              <span>{partner}</span>
              <span className="spark-dot" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/55 transition-colors hover:text-white floating-cta"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={30} />
      </motion.a>
    </section>
  );
};
