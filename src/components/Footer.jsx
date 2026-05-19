import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full px-5 sm:px-8 lg:px-12 pb-12 pt-16">
      <div className="section-inner">
        <div className="fade-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="font-grotesk text-lg tracking-[0.2em] text-white">RS</p>
            <p className="mt-1 text-sm text-muted">Premium-focused full stack developer portfolio</p>
          </div>
          <p className="text-sm text-muted">© {currentYear} Rishith Suresh. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};
