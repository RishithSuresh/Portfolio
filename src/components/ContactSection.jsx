import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, GitBranch, X, Send } from 'lucide-react';

const SUCCESS_MESSAGE_DURATION = 3000;

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), SUCCESS_MESSAGE_DURATION);
  };

  const links = [
    { icon: Mail, href: 'mailto:rishith@example.com', label: 'Email' },
    { icon: Heart, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
    { icon: X, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="section-title">Let’s Build Something Great</h2>
          <p className="section-subtitle mx-auto">
            If you have an idea, product, or collaboration in mind, I’d love to hear about it.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-7"
          >
            <h3 className="text-2xl font-grotesk font-semibold text-white">Contact</h3>
            <p className="mt-3 text-muted leading-relaxed">
              I am currently available for freelance, contract, and product-focused engineering engagements.
            </p>

            <div className="mt-8 space-y-4">
              <a href="mailto:rishith@example.com" className="text-soft hover:text-white transition-colors block">
                rishith@example.com
              </a>
              <p className="text-muted">San Francisco, CA</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="pill-button !px-4 !py-2.5 text-soft"
                  >
                    <Icon size={14} />
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.aside>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-effect rounded-3xl p-7 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm text-soft">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted focus:border-white/35 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-soft">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted focus:border-white/35 focus:outline-none"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-soft">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-none rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted focus:border-white/35 focus:outline-none"
                placeholder="Tell me about your project"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="pill-button w-full text-white"
            >
              <Send size={15} />
              Send message
            </motion.button>

            <motion.p
              initial={false}
              animate={{ opacity: submitted ? 1 : 0, y: submitted ? 0 : 8 }}
              className="text-sm text-soft"
            >
              Message sent successfully.
            </motion.p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
