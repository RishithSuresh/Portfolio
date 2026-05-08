import { motion } from 'framer-motion';

// Staggered, line-aware text reveal. Splits the children string by spaces.
// For finer control pass `as` to render h1, h2, etc.
export default function RevealText({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.05,
  y = 24,
  blur = 6,
  once = true,
}) {
  const text = String(children);
  const words = text.split(' ');

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word = {
    hidden: { y, opacity: 0, filter: `blur(${blur}px)` },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
    >
      <Tag style={{ display: 'inline' }}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span variants={word} className="inline-block whitespace-pre">
              {w}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.span>
  );
}
