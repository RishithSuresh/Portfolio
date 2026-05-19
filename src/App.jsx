import React, { useState, useEffect } from 'react';
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

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useSmoothScroll();

  // Update document class and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'} bg-background text-text min-h-screen transition-colors duration-300`}>
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Scroll to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 glass-effect p-4 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all"
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 30px rgba(255, 167, 0, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
