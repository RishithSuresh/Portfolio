import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const SCROLL_THRESHOLD = 14;

export const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`mx-auto max-w-5xl rounded-full border border-white/10 ${scrolled ? 'glass-effect-lg' : 'glass-effect'} px-4 sm:px-6 py-3`}>
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            aria-label="Rishith Suresh Portfolio Home"
            className="text-base sm:text-lg font-grotesk font-bold tracking-[0.24em] text-white"
          >
            RS
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const section = item.toLowerCase();
              const active = section === activeSection;
              return (
                <a
                  key={item}
                  href={`#${section}`}
                  className={`relative px-4 py-2 text-sm tracking-wide transition-colors ${active ? 'text-white' : 'text-muted hover:text-white'}`}
                >
                  {item}
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-white"
                    />
                  )}
                </a>
              );
            })}
          </div>

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
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
