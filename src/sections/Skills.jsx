import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import SectionShell from '../components/SectionShell';
import { skills } from '../data/portfolio';

// Skills zone — constellation of tech nodes with animated connections.
// Each group orbits around a central anchor; lines connect related nodes.
const GROUPS = ['Languages', 'Front-end', 'Database', 'Networking', 'Tools'];

export default function Skills() {
  const grouped = useMemo(() => {
    const m = {};
    GROUPS.forEach((g) => (m[g] = skills.filter((s) => s.group === g)));
    return m;
  }, []);

  return (
    <SectionShell
      id="skills"
      eyebrow="03 · BLADE MATRIX"
      title="Skill codex"
      kicker="An interactive map of the technologies behind each build. Hover any node to see its weight."
    >
      <Constellation grouped={grouped} />
    </SectionShell>
  );
}

function Constellation({ grouped }) {
  const W = 1100, H = 640;
  const centers = {
    Languages: { x: 160, y: 180 },
    'Front-end': { x: 550, y: 160 },
    Database: { x: 940, y: 180 },
    Networking: { x: 300, y: 470 },
    Tools: { x: 820, y: 470 },
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
          group,
          x: c.x + Math.cos(a) * r,
          y: c.y + Math.sin(a) * r * 0.85,
        });
      });
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouped]);

  const groupedPositions = useMemo(() => {
    return GROUPS.reduce((acc, group) => {
      acc[group] = positions.filter((p) => p.group === group);
      return acc;
    }, {});
  }, [positions]);

  // Semantic cross-group connections — show tech relationships.
  const crossLinks = useMemo(() => {
    const links = [];
    const findNode = (name) => positions.find((p) => p.name === name);

    const semanticPairs = [
      ['Python', 'Jupyter Notebook'],
      ['JavaScript', 'React'],
      ['JavaScript', 'Node.js'],
      ['Node.js', 'Express.js'],
      ['HTML', 'CSS'],
      ['React', 'HTML'],
      ['SQL', 'MongoDB'],
      ['C', 'Arduino IDE'],
      ['Solidity', 'Web3'],
      ['VS Code', 'Python'],
      ['Figma', 'React'],
      ['Java', 'Android Studio'],
    ];

    semanticPairs.forEach(([from, to]) => {
      const p1 = findNode(from);
      const p2 = findNode(to);
      if (p1 && p2) {
        links.push({ from: p1, to: p2, id: `${from}-${to}` });
      }
    });

    return links;
  }, [positions]);

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
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D946EF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connections — center spokes plus visible node-to-node links */}
        {Object.entries(groupedPositions).flatMap(([group, nodes]) => {
          if (nodes.length < 2) return [];

          const c = centers[group];
          const loop = nodes.map((node, index) => {
            const next = nodes[(index + 1) % nodes.length];
            return (
              <motion.line
                key={`${group}-${node.name}-${next.name}`}
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                stroke="url(#line)"
                strokeWidth={1.25}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.15, delay: 0.14 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          });

          const spoke = nodes.map((node, index) => (
            <motion.line
              key={`${group}-spoke-${node.name}`}
              x1={c.x}
              y1={c.y}
              x2={node.x}
              y2={node.y}
              stroke="url(#line)"
              strokeWidth={1}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 0.08 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
            />
          ));

          return [...loop, ...spoke];
        })}

        {/* Cross-group semantic links — subtle interconnected web */}
        {crossLinks.map((link, i) => (
          <motion.line
            key={link.id}
            x1={link.from.x}
            y1={link.from.y}
            x2={link.to.x}
            y2={link.to.y}
            stroke="url(#line)"
            strokeWidth={0.9}
            strokeLinecap="round"
            strokeDasharray="4,3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.28 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Group cores */}
        {Object.entries(centers).map(([g, c]) => (
          <g key={g}>
            <circle cx={c.x} cy={c.y} r={44} fill="url(#node)" opacity={0.5} />
            <circle cx={c.x} cy={c.y} r={6} fill="#E8DDC7" />
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
              {/* Outer pulse aura on hover */}
              {isHover && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={r + 22}
                  fill="url(#pulseGlow)"
                  initial={{ r: r + 20, opacity: 0.6 }}
                  animate={{ r: r + 28, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              {/* Main glow halo */}
              <circle cx={p.x} cy={p.y} r={r + 14} fill="url(#node)" opacity={isHover ? 0.85 : 0.18} />
              {/* Core node */}
              <circle
                cx={p.x}
                cy={p.y}
                r={r}
                fill={isHover ? '#D946EF' : '#F59E0B'}
                opacity={isHover ? 1 : 0.85}
                filter={isHover ? 'url(#glow)' : ''}
              />
              {/* Enhanced hover glow */}
              {isHover && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="none"
                  stroke="#D946EF"
                  strokeWidth={1.5}
                  opacity={0.6}
                  style={{
                    filter: 'drop-shadow(0 0 16px rgba(217,70,239,0.8))',
                  }}
                />
              )}
              {/* Label */}
              <text
                x={p.x}
                y={p.y - r - 8}
                textAnchor="middle"
                fill={isHover ? '#D946EF' : '#F59E0B'}
                fontFamily="General Sans"
                fontSize="11"
                fontWeight={isHover ? '600' : '400'}
                style={{
                  filter: isHover ? 'drop-shadow(0 0 6px rgba(217,70,239,0.6))' : 'none',
                }}
              >
                {p.name}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}
