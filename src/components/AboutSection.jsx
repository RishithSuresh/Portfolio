import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Cloud } from 'lucide-react';

export const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const skills = [
    { icon: Code2, label: 'Full Stack', desc: 'React, Node.js, Python' },
    { icon: Brain, label: 'AI/ML', desc: 'TensorFlow, PyTorch, LLMs' },
    { icon: Cloud, label: 'Cloud', desc: 'AWS, GCP, Docker' },
  ];

  return (
    <section id="about" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-grotesk font-bold text-text mb-4">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted leading-relaxed"
            >
              I'm a passionate full-stack developer with expertise in building scalable web applications and AI-driven solutions. With a background in computer science and 3+ years of professional experience, I've worked with startups and enterprises to deliver cutting-edge digital solutions.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted leading-relaxed"
            >
              My journey spans from frontend magic to backend architecture, cloud deployment, and AI/ML integration. I'm constantly learning and experimenting with emerging technologies to stay at the forefront of innovation.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                className="glass-effect px-8 py-3 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 167, 0, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Skills Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-effect p-6 rounded-2xl border border-text/10 hover:border-primary/30 transition-all group cursor-pointer"
                  whileHover={{
                    y: -5,
                    boxShadow: '0 0 30px rgba(255, 167, 0, 0.2)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-grotesk font-bold text-text mb-1">
                        {skill.label}
                      </h3>
                      <p className="text-sm text-muted">{skill.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
