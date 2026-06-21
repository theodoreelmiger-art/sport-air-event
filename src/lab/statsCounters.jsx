import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Timer,
  Flag,
  TrendingUp,
  Sparkles,
  Gauge,
  Wind,
} from 'lucide-react';
import { STATS } from './data.js';

// ── Shared blue palette (no black anywhere) ──
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#0b1c3f';
const INK_2 = '#2c3e63';

// One lucide icon per stat, in order (20 ans / 2 min / 100%).
const STAT_ICONS = [Award, Timer, Flag];

/* ---------------------------------------------------------------------
   useCountUp — simple count-up on mount via requestAnimationFrame.
   `run` lets a variant re-trigger the animation (e.g. "Rejouer").
   --------------------------------------------------------------------- */
function useCountUp(target, { duration = 1500, run = 0, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    let start = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const step = (now) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      const v = target * ease(p);
      setValue(decimals ? Number(v.toFixed(decimals)) : Math.round(v));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    setValue(0);
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, run, decimals]);

  return value;
}

/* =====================================================================
   V47 — Ligne inline avec séparateurs
   Trois compteurs sur une rangée, séparés par de fines hairlines
   verticales. Toggle pour rejouer l'animation count-up.
   ===================================================================== */
function V47() {
  const [run, setRun] = useState(0);
  const a = useCountUp(STATS[0].value, { run, duration: 1400 });
  const b = useCountUp(STATS[1].value, { run, duration: 1100 });
  const c = useCountUp(STATS[2].value, { run, duration: 1700 });
  const vals = [a, b, c];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            En quelques chiffres
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05, marginTop: 4 }}
          >
            La confiance, mesurée
          </h3>
        </div>
        <motion.button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          whileTap={{ scale: 0.93 }}
          whileHover={{ y: -1 }}
          className="cursor-pointer font-display inline-flex items-center gap-1.5"
          style={{
            border: `1px solid ${LINE}`,
            background: BLUE_MIST,
            color: BLUE_DEEP,
            borderRadius: 9999,
            padding: '7px 14px',
            fontSize: '0.78rem',
            fontWeight: 700,
          }}
        >
          <Sparkles size={14} strokeWidth={2.4} />
          Rejouer
        </motion.button>
      </div>

      <div
        className="grid grid-cols-3"
        style={{
          border: `1px solid ${LINE}`,
          borderRadius: 22,
          background: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {STATS.map((s, i) => {
          const Icon = STAT_ICONS[i];
          return (
            <div
              key={s.label}
              className="text-center"
              style={{
                padding: '22px 10px',
                borderLeft: i === 0 ? 'none' : `1px solid ${LINE}`,
              }}
            >
              <span
                className="inline-flex items-center justify-center mb-3"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: BLUE_SOFT,
                  color: BLUE,
                }}
              >
                <Icon size={18} strokeWidth={2.2} />
              </span>
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(1.6rem, 7vw, 2.1rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: INK,
                }}
              >
                {vals[i]}
                <span style={{ color: BLUE, fontSize: '0.62em' }}>
                  {s.suffix}
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: INK_2,
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V48 — Empilé géant (focus sélectionnable)
   Un chiffre dominant en très grand format. L'owner choisit la stat
   active (chips cliquables) ; le grand nombre recompte à chaque switch.
   ===================================================================== */
function V48() {
  const [active, setActive] = useState(0);
  const s = STATS[active];
  const Icon = STAT_ICONS[active];
  // re-run the count-up each time the active stat changes
  const value = useCountUp(s.value, { run: active, duration: 1300 });

  return (
    <div style={{ color: INK }}>
      <div className="kicker mb-1" style={{ color: BLUE }}>
        Indicateur clé
      </div>

      <div
        style={{
          border: `1px solid ${LINE}`,
          borderRadius: 24,
          background: BLUE_MIST,
          padding: '26px 22px 22px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          className="inline-flex items-center justify-center mb-4"
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: '#ffffff',
            border: `1px solid ${LINE}`,
            color: BLUE,
          }}
        >
          <Icon size={22} strokeWidth={2.2} />
        </span>

        <div className="flex items-end gap-1">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display"
            style={{
              fontSize: 'clamp(3.4rem, 18vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: INK,
            }}
          >
            {value}
          </motion.span>
          <span
            className="font-display"
            style={{
              fontSize: 'clamp(1.4rem, 6vw, 2rem)',
              lineHeight: 1,
              color: BLUE,
              paddingBottom: 6,
            }}
          >
            {s.suffix.trim()}
          </span>
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: '0.95rem',
            fontWeight: 600,
            color: INK_2,
          }}
        >
          {s.label}
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        {STATS.map((stat, i) => {
          const on = i === active;
          return (
            <motion.button
              key={stat.label}
              type="button"
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.96 }}
              className="cursor-pointer flex-1 font-display"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE : '#ffffff',
                color: on ? '#ffffff' : INK_2,
                borderRadius: 14,
                padding: '9px 6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                transition: 'background .2s, border-color .2s, color .2s',
              }}
            >
              {stat.value}
              {stat.suffix}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V49 — Cartes stat
   Trois cartes empilées, chacune avec icône, nombre qui compte et
   micro barre de progression. Survol relève la carte (tactile).
   ===================================================================== */
function V49() {
  const a = useCountUp(STATS[0].value, { duration: 1500 });
  const b = useCountUp(STATS[1].value, { duration: 1100 });
  const c = useCountUp(STATS[2].value, { duration: 1800 });
  const vals = [a, b, c];
  // each stat's bar fills relative to its own target → all land near full
  const ratios = [a / STATS[0].value, b / STATS[1].value, c / STATS[2].value];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: BLUE_SOFT,
            color: BLUE,
          }}
        >
          <TrendingUp size={16} strokeWidth={2.4} />
        </span>
        <h3
          className="font-display"
          style={{ fontSize: '1.25rem', lineHeight: 1 }}
        >
          Ce qui nous définit
        </h3>
      </div>

      <div className="flex flex-col gap-2.5">
        {STATS.map((s, i) => {
          const Icon = STAT_ICONS[i];
          const pct = Math.round(Math.min(ratios[i], 1) * 100);
          return (
            <motion.div
              key={s.label}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="flex items-center gap-3.5"
              style={{
                border: `1px solid ${LINE}`,
                borderRadius: 18,
                background: '#ffffff',
                padding: '14px 16px',
              }}
            >
              <span
                className="inline-flex items-center justify-center shrink-0"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 13,
                  background: BLUE_MIST,
                  border: `1px solid ${LINE}`,
                  color: BLUE,
                }}
              >
                <Icon size={20} strokeWidth={2.2} />
              </span>

              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="flex items-baseline justify-between gap-2">
                  <div
                    className="font-display"
                    style={{
                      fontSize: '1.55rem',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      color: INK,
                    }}
                  >
                    {vals[i]}
                    <span style={{ color: BLUE, fontSize: '0.62em' }}>
                      {s.suffix}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: INK_2,
                      textAlign: 'right',
                    }}
                  >
                    {s.label}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 9,
                    height: 5,
                    borderRadius: 9999,
                    background: BLUE_SOFT,
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: pct + '%' }}
                    transition={{ duration: 0.25 }}
                    style={{
                      height: '100%',
                      borderRadius: 9999,
                      background: `linear-gradient(90deg, ${BLUE}, ${BLUE_DEEP})`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V50 — Anneaux de progression
   Trois jauges circulaires SVG. L'arc se remplit pendant que le nombre
   compte. Un clic sur un anneau le met en avant (sélection active).
   ===================================================================== */
function Ring({ stat, Icon, active, onSelect, duration }) {
  const value = useCountUp(stat.value, { duration });
  // ring fills relative to the stat's own target value
  const ratio = Math.min(value / stat.value, 1);
  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      className="cursor-pointer text-center"
      style={{
        border: `1px solid ${active ? BLUE : LINE}`,
        background: active ? BLUE_MIST : '#ffffff',
        borderRadius: 18,
        padding: '16px 8px 14px',
        transition: 'background .2s, border-color .2s',
        outline: 'none',
      }}
    >
      <div
        style={{ position: 'relative', width: 84, height: 84, margin: '0 auto' }}
      >
        <svg width="84" height="84" viewBox="0 0 84 84">
          <circle
            cx="42"
            cy="42"
            r={R}
            fill="none"
            stroke={BLUE_SOFT}
            strokeWidth="8"
          />
          <circle
            cx="42"
            cy="42"
            r={R}
            fill="none"
            stroke={BLUE}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - ratio)}
            transform="rotate(-90 42 42)"
          />
        </svg>
        <span
          className="inline-flex items-center justify-center"
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: 28,
            height: 28,
            color: BLUE,
          }}
        >
          <Icon size={18} strokeWidth={2.2} />
        </span>
      </div>

      <div
        className="font-display"
        style={{
          marginTop: 10,
          fontSize: '1.35rem',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: INK,
        }}
      >
        {value}
        <span style={{ color: BLUE, fontSize: '0.6em' }}>{stat.suffix}</span>
      </div>
      <div
        style={{
          marginTop: 5,
          fontSize: '0.72rem',
          fontWeight: 600,
          color: INK_2,
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

function V50() {
  const [active, setActive] = useState(1);
  const durations = [1500, 1100, 1800];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            Performance
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Nos repères
          </h3>
        </div>
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            background: BLUE_SOFT,
            color: BLUE,
          }}
        >
          <Gauge size={18} strokeWidth={2.2} />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {STATS.map((s, i) => (
          <Ring
            key={s.label}
            stat={s}
            Icon={STAT_ICONS[i]}
            active={i === active}
            onSelect={() => setActive(i)}
            duration={durations[i]}
          />
        ))}
      </div>

      <div
        className="flex items-center gap-2 mt-3"
        style={{
          border: `1px solid ${LINE}`,
          borderRadius: 14,
          background: BLUE_MIST,
          padding: '10px 14px',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: INK_2,
        }}
      >
        <Wind size={16} strokeWidth={2.2} style={{ color: BLUE, flexShrink: 0 }} />
        <span>
          {STATS[active].label} — sélectionné
        </span>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 47,
    label: 'Ligne inline',
    note: 'Trois compteurs sur une rangée avec séparateurs fins et bouton rejouer.',
    Component: V47,
  },
  {
    n: 48,
    label: 'Chiffre géant',
    note: 'Un nombre dominant recomptable, chips pour basculer la stat active.',
    Component: V48,
  },
  {
    n: 49,
    label: 'Cartes stat',
    note: 'Cartes empilées avec icône, count-up et mini barre de progression.',
    Component: V49,
  },
  {
    n: 50,
    label: 'Anneaux de progression',
    note: 'Jauges circulaires SVG qui se remplissent en comptant, anneau sélectionnable.',
    Component: V50,
  },
];
