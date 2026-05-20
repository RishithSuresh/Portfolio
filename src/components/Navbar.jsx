import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';

const SCROLL_THRESHOLD = 14;

export const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', section: 'about' },
    { label: 'Capabilities', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Results', section: 'experience' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`mx-auto max-w-6xl rounded-full border border-white/10 ${scrolled ? 'glass-effect-lg' : 'glass-effect'} px-4 py-3 sm:px-5`}>
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            aria-label="Rishith Suresh Portfolio Home"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/6 ring-1 ring-white/12">
              <Sparkles size={14} className="text-[#ffd6a0]" />
            </span>
              <span className="font-grotesk tracking-[0.12em]">Rishith Studio</span>
          </a>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
            {navItems.map((item) => {
              const active = item.section === activeSection;
              return (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  className={`relative rounded-full px-4 py-2 text-sm tracking-wide transition-colors ${active ? 'text-white' : 'text-muted hover:text-white'}`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 -z-10 rounded-full border border-white/14 bg-white/[0.05]"
                    />
                  )}
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex pill-button button-primary !px-5 !py-2.5 text-sm font-medium"
          >
            Hire me
          </a>

          <motion.button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full border border-white/12 text-white"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto mt-3 max-w-5xl rounded-3xl glass-effect-lg border border-white/10 p-3"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="pill-button button-primary mt-2 justify-center text-sm font-medium"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
