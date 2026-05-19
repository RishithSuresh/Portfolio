import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-text/10 glass-effect-lg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              className="text-3xl font-bold gradient-text mb-2"
              whileHover={{ scale: 1.05 }}
            >
              RS
            </motion.div>
            <p className="text-muted">
              Full Stack Developer | AI/ML Enthusiast | Cloud Solutions Architect
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {[
              { label: 'Twitter', href: 'https://twitter.com' },
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Email', href: 'mailto:rishith@example.com' },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-text/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted">
              © {currentYear} Rishith Suresh. All rights reserved.
            </p>
            <p className="text-sm text-muted">
              Designed & Built with <span className="text-primary">❤️</span> using React, Framer Motion & Tailwind CSS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
