import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/Background';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './App.css';

const SECTION_DETECTION_THRESHOLD = 140;

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= SECTION_DETECTION_THRESHOLD && rect.bottom >= SECTION_DETECTION_THRESHOLD;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-text min-h-screen">
      <ParticleBackground />
      <div className="grain-overlay" />
      <div className="vignette-overlay" />

      <div className="relative z-10">
        <Navbar activeSection={activeSection} />

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 pill-button !px-4 !py-4 text-white/85"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>

        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
