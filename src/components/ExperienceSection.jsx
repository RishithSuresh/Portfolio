import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';

export const ExperienceSection = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Startup Inc',
      period: '2022 - Present',
      description: 'Led development of scalable web applications and managed team of 3 developers',
      skills: ['React', 'Node.js', 'AWS', 'Team Leadership'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd',
      period: '2021 - 2022',
      description: 'Developed and maintained multiple client projects, implemented CI/CD pipelines',
      skills: ['React', 'Python', 'Docker', 'PostgreSQL'],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2020 - 2021',
      description: 'Worked on frontend features and API integration for e-commerce platform',
      skills: ['React', 'JavaScript', 'REST APIs', 'Git'],
    },
  ];

  return (
    <section id="experience" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-grotesk font-bold text-text mb-4">
            Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative pl-0 lg:pl-32"
              >
                {/* Timeline Dot */}
                <motion.div
                  className="hidden lg:block absolute left-0 top-2 w-16 h-16 -translate-x-1/3 flex items-center justify-center rounded-full glass-effect border-2 border-primary"
                  animate={{ boxShadow: ['0 0 20px rgba(255, 167, 0, 0.3)', '0 0 40px rgba(255, 167, 0, 0.6)', '0 0 20px rgba(255, 167, 0, 0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Briefcase className="text-primary" size={24} />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="glass-effect p-6 rounded-2xl border border-text/10 hover:border-primary/30 transition-all group"
                  whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255, 167, 0, 0.2)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-grotesk font-bold text-text group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted bg-text/5 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIdx) => (
                      <motion.span
                        key={skillIdx}
                        className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary group-hover:bg-secondary/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50+', label: 'Projects' },
            { number: '100+', label: 'Happy Clients' },
            { number: '5+', label: 'Years Exp.' },
            { number: '10+', label: 'Technologies' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass-effect p-6 rounded-xl text-center border border-text/10 hover:border-secondary/30 transition-all"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-3xl font-bold gradient-text mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating decoration */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-secondary blur-3xl opacity-10"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
};
