import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Startup Inc',
      period: '2022 — Present',
      description: 'Led end-to-end delivery of platform features and guided engineering quality across product teams.',
      skills: ['React', 'Node.js', 'AWS', 'Leadership'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd',
      period: '2021 — 2022',
      description: 'Built multi-client web products and production pipelines for fast, reliable releases.',
      skills: ['Python', 'PostgreSQL', 'Docker', 'CI/CD'],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2020 — 2021',
      description: 'Implemented frontend systems and API integrations for a commerce-focused product suite.',
      skills: ['JavaScript', 'React', 'REST APIs', 'Git'],
    },
  ];

  const stats = [
    { number: '50+', label: 'Projects Shipped' },
    { number: '100+', label: 'Client Deliverables' },
    { number: '5+', label: 'Years Experience' },
    { number: '10+', label: 'Core Technologies' },
  ];

  return (
    <section id="experience" className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="section-inner max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional milestones across product engineering, cloud systems, and performance-focused application development.</p>
        </motion.div>

        <div className="mt-14 space-y-5">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-effect rounded-3xl p-6 sm:p-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <Briefcase size={16} />
                    <h3 className="text-xl font-grotesk font-semibold">{exp.title}</h3>
                  </div>
                  <p className="mt-1 text-soft">{exp.company}</p>
                </div>
                <span className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted w-fit">
                  {exp.period}
                </span>
              </div>

              <p className="mt-4 text-muted leading-relaxed">{exp.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-xs text-soft">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="glass-effect rounded-2xl p-5 text-center"
            >
              <p className="text-2xl sm:text-3xl font-grotesk font-bold text-white">{stat.number}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
