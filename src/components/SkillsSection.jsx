import React from 'react';
import { motion } from 'framer-motion';

export const SkillsSection = () => {
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind', icon: '🎨' },
        { name: 'Framer Motion', icon: '✨' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'Express', icon: '⚡' },
        { name: 'FastAPI', icon: '🚀' },
      ],
    },
    {
      title: 'AI/ML',
      skills: [
        { name: 'TensorFlow', icon: '🧠' },
        { name: 'PyTorch', icon: '🔥' },
        { name: 'LLMs', icon: '💬' },
        { name: 'NLP', icon: '📝' },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', icon: '🍃' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Redis', icon: '⚡' },
        { name: 'Firebase', icon: '🔥' },
      ],
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', icon: '☁️' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '⚓' },
        { name: 'CI/CD', icon: '🔄' },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: '📦' },
        { name: 'Figma', icon: '🎭' },
        { name: 'REST API', icon: '🔌' },
        { name: 'GraphQL', icon: '📊' },
      ],
    },
  ];

  return (
    <section id="skills" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-grotesk font-bold text-text mb-4">
            Skills & Expertise
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-secondary to-accent rounded" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-effect p-6 rounded-2xl border border-text/10 hover:border-secondary/30 transition-all group cursor-pointer"
            >
              <h3 className="text-xl font-grotesk font-bold text-text mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded" />
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-text/5 group-hover:bg-secondary/10 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm text-muted group-hover:text-secondary transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating decoration */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-secondary blur-3xl opacity-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
    </section>
  );
};
