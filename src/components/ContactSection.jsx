import { motion } from 'framer-motion';
import { ArrowRight, GitBranch, Users, Mail, Sparkles } from 'lucide-react';

export const ContactSection = () => {
  const links = [
    { icon: Mail, href: 'mailto:rishith@example.com', label: 'Email' },
    { icon: Users, href: 'https://linkedin.com/in/rishithsuresh', label: 'LinkedIn' },
    { icon: GitBranch, href: 'https://github.com/RishithSuresh', label: 'GitHub' },
  ];

  return (
    <section id="contact" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.78fr)] lg:items-center"
        >
          <div className="section-header">
            <span className="section-kicker">Contact</span>
            <h2 className="section-title">Ready to build a premium product presence?</h2>
            <p className="section-subtitle">
              Let&apos;s shape it into a high-end digital experience that communicates trust, quality, and execution maturity from the first interaction.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="mailto:rishith@example.com"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pill-button button-primary text-sm font-medium"
              >
                Start your project conversation
                <ArrowRight size={15} />
              </motion.a>

              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="pill-button text-white/82"
                  >
                    <Icon size={14} />
                    {link.label}
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-9 inline-flex items-center gap-2 text-sm text-white/62">
              <Sparkles size={14} className="text-[#ffd6a0]" />
              Available for freelance, product, and portfolio design work
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-grid-art premium-outline"
          />
        </motion.div>
      </div>
    </section>
  );
};
