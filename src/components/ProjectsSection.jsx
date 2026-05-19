import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';

export const ProjectsSection = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const projects = [
    {
      title: 'AI Chat Platform',
      description: 'A modern chat application powered by LLMs with real-time messaging and AI-assisted responses.',
      image: '🤖',
      tech: ['React', 'Node.js', 'LLM', 'WebSocket'],
      github: 'https://github.com',
      live: 'https://demo.com',
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Full-featured admin dashboard for managing products, orders, and analytics with real-time updates.',
      image: '📊',
      tech: ['React', 'TypeScript', 'TailwindCSS', 'Charts'],
      github: 'https://github.com',
      live: 'https://demo.com',
    },
    {
      title: 'Cloud Analytics Platform',
      description: 'Scalable analytics platform built on cloud infrastructure for processing and visualizing large datasets.',
      image: '☁️',
      tech: ['AWS', 'Python', 'BigQuery', 'React'],
      github: 'https://github.com',
      live: 'https://demo.com',
    },
    {
      title: 'ML Model Deployment',
      description: 'End-to-end ML pipeline with model training, evaluation, and deployment using containerization.',
      image: '🧠',
      tech: ['TensorFlow', 'Docker', 'Kubernetes', 'FastAPI'],
      github: 'https://github.com',
      live: 'https://demo.com',
    },
  ];

  return (
    <section id="projects" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-grotesk font-bold text-text mb-4">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary rounded" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group glass-effect rounded-2xl border border-text/10 overflow-hidden hover:border-primary/30 transition-all"
              whileHover={{ y: -5 }}
            >
              {/* Project Header with Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden flex items-center justify-center">
                <motion.div
                  className="text-7xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {project.image}
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-grotesk font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIdx) => (
                    <motion.span
                      key={techIdx}
                      className="px-3 py-1 rounded-full bg-text/5 text-xs font-medium text-secondary group-hover:bg-secondary/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-text/20 text-text hover:border-primary/50 hover:text-primary transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GitBranch size={18} />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="inline-block glass-effect px-8 py-4 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255, 167, 0, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects →
          </motion.a>
        </motion.div>
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
