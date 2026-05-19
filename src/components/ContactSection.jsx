import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, GitBranch, X, Send } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:rishith@example.com', label: 'Email' },
    { icon: Heart, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
    { icon: X, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-grotesk font-bold text-text mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Have a question or want to collaborate? Feel free to reach out. I'm always excited to connect with fellow developers and designers.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-secondary to-accent rounded mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-grotesk font-bold text-text mb-2">
                Let's connect
              </h3>
              <p className="text-muted">
                I'm currently available for freelance work and exciting collaborations. Feel free to send me an email or reach out via social media.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-grotesk font-bold text-text">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-effect p-4 rounded-lg border border-text/10 text-muted hover:text-primary hover:border-primary/30 transition-all"
                      whileHover={{
                        y: -5,
                        boxShadow: '0 0 30px rgba(255, 167, 0, 0.2)',
                      }}
                    >
                      <Icon size={24} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-grotesk font-bold text-text">Contact Details</h4>
              <div className="space-y-3">
                <a
                  href="mailto:rishith@example.com"
                  className="flex items-center gap-3 text-muted hover:text-primary transition-colors"
                >
                  <Mail size={20} className="text-primary" />
                  rishith@example.com
                </a>
                <p className="flex items-center gap-3 text-muted">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    📍
                  </span>
                  San Francisco, CA
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="glass-effect p-8 rounded-2xl border border-text/10 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-text/5 border border-text/10 text-text placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                  whileFocus={{ borderColor: '#FFA700' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-text/5 border border-text/10 text-text placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                  whileFocus={{ borderColor: '#FFA700' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-text/5 border border-text/10 text-text placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your message..."
                  whileFocus={{ borderColor: '#FFA700' }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full glass-effect px-6 py-3 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(255, 167, 0, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                Send Message
              </motion.button>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: submitted ? 1 : 0,
                  y: submitted ? 0 : 10,
                }}
                className="text-center text-secondary font-medium"
              >
                ✓ Message sent successfully!
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Floating decoration */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent blur-3xl opacity-10"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
};
