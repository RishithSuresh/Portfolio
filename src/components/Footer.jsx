import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { icon: Mail, href: 'mailto:rishith@example.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com/in/rishithsuresh', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/RishithSuresh', label: 'GitHub' },
  ];

  return (
    <footer className="relative w-full px-5 sm:px-8 lg:px-12 pb-12 pt-16">
      <div className="section-inner">
        <div className="fade-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/6 ring-1 ring-white/12">
              <Sparkles size={16} className="text-[#ffd6a0]" />
            </span>
            <div>
              <p className="font-grotesk text-lg tracking-[0.18em] text-white">Rishith</p>
              <p className="mt-1 text-sm text-muted">Premium-focused developer portfolio</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button !px-4 !py-2 text-sm text-white/78"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>

          <p className="text-sm text-muted">© {currentYear} Rishith Suresh. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};
