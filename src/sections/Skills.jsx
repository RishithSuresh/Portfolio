import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import SectionShell from '../components/SectionShell';
import { skills } from '../data/portfolio';

// Skills zone — constellation of tech nodes with animated connections.
// Each group orbits around a central anchor; lines connect related nodes.
const GROUPS = ['Frontend', 'Backend', 'AI', 'Cloud'];

export default function Skills() {
  const grouped = useMemo(() => {
    const m = {};
    GROUPS.forEach((g) => (m[g] = skills.filter((s) => s.group === g)));
    return m;
  }, []);

  return (
    <SectionShell
      id="skills"
      eyebrow="03 · CONSTELLATION"
      title="The skill matrix"
      kicker="An interactive map of the technologies that power the missions. Hover any node to see its weight."
    >
      <Constellation grouped={grouped} />
    </SectionShell>
  );
}

function Constellation({ grouped }) {
  const W = 1000, H = 560;
  const centers = {
    Frontend: { x: 240, y: 200 },
    Backend: { x: 760, y: 200 },
    AI: { x: 240, y: 420 },
    Cloud: { x: 760, y: 420 },
  };
  const [hovered, setHovered] = useState(null);

  // Pre-compute node positions deterministically around each group center.
  const positions = useMemo(() => {
    const out = [];
    Object.entries(grouped).forEach(([group, items]) => {
      const c = centers[group];
      const r = 110;
      items.forEach((s, i) => {
        const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        out.push({
          ...s,
          x: c.x + Math.cos(a) * r,
          y: c.y + Math.sin(a) * r * 0.85,
        });
      });
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouped]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative w-full overflow-hidden rounded-2xl p-4"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <defs>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0%" stopColor="#5BC0BE" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#5BC0BE" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2E8B57" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5BC0BE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5BC0BE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connections — center-to-node + a few cross-links */}
        {Object.entries(grouped).map(([g, items]) =>
          items.map((s, i) => {
            const c = centers[g];
            const node = positions.find((p) => p.name === s.name);
            return (
              <motion.line
                key={`${g}-${s.name}`}
                x1={c.x} y1={c.y} x2={node.x} y2={node.y}
                stroke="url(#line)" strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })
        )}

        {/* Group cores */}
        {Object.entries(centers).map(([g, c]) => (
          <g key={g}>
            <circle cx={c.x} cy={c.y} r={40} fill="url(#node)" opacity={0.5} />
            <circle cx={c.x} cy={c.y} r={6} fill="#D9E2EC" />
            <text x={c.x} y={c.y + 60} textAnchor="middle"
                  fill="#8FA0B3" fontFamily="JetBrains Mono"
                  fontSize="10" letterSpacing="3">
              {g.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Skill nodes */}
        {positions.map((p, i) => {
          const r = 5 + p.level * 7;
          const isHover = hovered === p.name;
          return (
            <motion.g
              key={p.name}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p.x} cy={p.y} r={r + 14} fill="url(#node)" opacity={isHover ? 0.65 : 0.18} />
              <circle cx={p.x} cy={p.y} r={r}
                      fill={isHover ? '#5BC0BE' : '#D9E2EC'}
                      opacity={isHover ? 1 : 0.85} />
              <text x={p.x} y={p.y - r - 8} textAnchor="middle"
                    fill={isHover ? '#5BC0BE' : '#D9E2EC'}
                    fontFamily="General Sans" fontSize="11">
                {p.name}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}
