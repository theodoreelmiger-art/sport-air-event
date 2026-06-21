import { motion } from 'framer-motion';
import {
  Clock,
  Shield,
  Sparkles,
  Truck,
  ArrowUpRight,
} from 'lucide-react';
import { FEATURES } from './data.js';

// Shared blue palette (no black anywhere)
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#0b1c3f';
const MUTE = '#5b6f8e';

// Map the FEATURES icon string names to the safe lucide set.
const ICON_MAP = { Clock, Shield, Sparkles, Truck };
const iconFor = (name) => ICON_MAP[name] || Sparkles;

/* =====================================================================
   V42 — Hairline divided rows w/ index
   A precise, editorial list: each atout (a brand commitment) is a single
   row separated by a hairline, prefixed with a two-digit index. Title and
   description always shown. A restrained hover tint keeps it Swiss-grid.
   Display only — no quantity, no selection.
   ===================================================================== */
function V42() {
  return (
    <div style={{ color: INK }}>
      <div className="mb-4">
        <div className="kicker" style={{ color: BLUE }}>
          Pourquoi nous choisir
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.4rem', lineHeight: 1.05, marginTop: 4 }}
        >
          Quatre atouts, un standard
        </h3>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}` }}>
        {FEATURES.map((f, i) => {
          const Icon = iconFor(f.icon);
          return (
            <div
              key={f.title}
              className="group relative flex items-center gap-4 overflow-hidden"
              style={{
                borderBottom: `1px solid ${LINE}`,
                padding: '15px 14px 15px 12px',
                transition: 'background .22s',
              }}
            >
              <span
                className="font-display shrink-0 tabular-nums"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  width: 26,
                  color: '#a9bcd8',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="flex items-center justify-center shrink-0"
                style={{ color: BLUE }}
              >
                <Icon size={20} strokeWidth={2.1} />
              </span>
              <span className="min-w-0">
                <span
                  className="block"
                  style={{
                    fontSize: '0.96rem',
                    lineHeight: 1.2,
                    fontWeight: 600,
                    color: INK,
                  }}
                >
                  {f.title}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: '0.82rem',
                    lineHeight: 1.35,
                    color: MUTE,
                    marginTop: 3,
                  }}
                >
                  {f.desc}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V43 — Icon-chip cards (2-col)
   Four soft cards, each led by a rounded icon "chip". A tasteful hover
   lifts the card and warms the chip. A tactile, product-tile presentation
   of the four brand commitments. Display only.
   ===================================================================== */
function V43() {
  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          Nos atouts
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 16 }}
      >
        Conçu pour durer, pensé pour vous
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {FEATURES.map((f) => {
          const Icon = iconFor(f.icon);
          return (
            <motion.div
              key={f.title}
              whileHover={{ y: -3 }}
              className="relative"
              style={{
                border: `1px solid ${LINE}`,
                background: '#ffffff',
                borderRadius: 18,
                padding: '15px 15px 16px',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 13,
                  background: BLUE_SOFT,
                  color: BLUE,
                }}
              >
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <div
                className="font-display"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  marginTop: 12,
                  color: INK,
                }}
              >
                {f.title}
              </div>
              <p
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.4,
                  color: MUTE,
                  margin: '5px 0 0',
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V44 — Numbered list of engagements
   A clean numbered list framed as "engagements". Each line shows its
   number, icon, title and description. A tasteful hover shifts the row
   subtly. Display only — no quantity steppers, no selection.
   ===================================================================== */
function V44() {
  return (
    <div style={{ color: INK }}>
      <div className="mb-4">
        <div className="kicker" style={{ color: BLUE }}>
          Nos engagements
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.35rem', lineHeight: 1.05, marginTop: 4 }}
        >
          Ce qui fait la différence
        </h3>
      </div>

      <div className="flex flex-col gap-2.5">
        {FEATURES.map((f, i) => {
          const Icon = iconFor(f.icon);
          return (
            <motion.div
              key={f.title}
              whileHover={{ x: 3 }}
              className="flex items-center gap-3.5"
              style={{
                border: `1px solid ${LINE}`,
                background: '#ffffff',
                borderRadius: 16,
                padding: '12px 13px',
              }}
            >
              <span
                className="font-display flex items-center justify-center shrink-0 tabular-nums"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 11,
                  border: `1px solid ${LINE}`,
                  background: '#ffffff',
                  color: BLUE,
                  fontSize: '0.92rem',
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="flex items-center gap-2"
                  style={{
                    fontSize: '0.94rem',
                    lineHeight: 1.2,
                    fontWeight: 600,
                    color: INK,
                  }}
                >
                  <Icon size={15} strokeWidth={2.2} color={BLUE} />
                  {f.title}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: '0.8rem',
                    lineHeight: 1.35,
                    color: MUTE,
                    marginTop: 2,
                  }}
                >
                  {f.desc}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V45 — Bento
   An asymmetric bento: the first commitment leads in a featured deep-blue
   tile, the remaining three sit as compact white cells. A spatial, modern
   way to present the atouts at a glance. Display only — no selection.
   ===================================================================== */
function V45() {
  const Lead = FEATURES[0];
  const LeadIcon = iconFor(Lead.icon);
  const rest = FEATURES.slice(1);

  return (
    <div style={{ color: INK }}>
      <div className="mb-4">
        <div className="kicker" style={{ color: BLUE }}>
          La promesse
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.4rem', lineHeight: 1.05, marginTop: 4 }}
        >
          Tout, en un coup d'œil
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Featured deep-blue tile */}
        <div
          className="bg-deep col-span-2 relative overflow-hidden"
          style={{ borderRadius: 22, padding: '20px 20px 22px', color: '#ffffff' }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: 'rgba(255,255,255,.14)',
              color: '#ffffff',
            }}
          >
            <LeadIcon size={24} strokeWidth={2.1} />
          </span>
          <div
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.1, fontWeight: 700, marginTop: 14 }}
          >
            {Lead.title}
          </div>
          <p
            style={{
              fontSize: '0.88rem',
              lineHeight: 1.45,
              color: 'rgba(255,255,255,.78)',
              margin: '6px 0 0',
              maxWidth: '92%',
            }}
          >
            {Lead.desc}
          </p>
          <span
            className="font-display absolute tabular-nums"
            style={{
              right: 18,
              top: 16,
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,.42)',
            }}
          >
            01
          </span>
        </div>

        {/* Compact cells */}
        {rest.map((f, i) => {
          const Icon = iconFor(f.icon);
          return (
            <motion.div
              key={f.title}
              whileHover={{ y: -2 }}
              className="relative flex flex-col gap-2"
              style={{
                border: `1px solid ${LINE}`,
                background: '#ffffff',
                borderRadius: 16,
                padding: '13px 13px 14px',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: BLUE_SOFT,
                  color: BLUE,
                }}
              >
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  color: INK,
                }}
              >
                {f.title}
              </span>
              <span
                style={{
                  fontSize: '0.76rem',
                  lineHeight: 1.35,
                  color: MUTE,
                }}
              >
                {f.desc}
              </span>
              <span
                className="font-display absolute tabular-nums"
                style={{
                  right: 12,
                  top: 11,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#c2d2ea',
                }}
              >
                {String(i + 2).padStart(2, '0')}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V46 — Marquee strip
   A continuously scrolling marquee of atout chips (duplicated for a
   seamless loop), pausing on hover. Below, the four commitments are laid
   out in full. Kinetic but display only — no click-to-select.
   ===================================================================== */
function V46() {
  const loop = [...FEATURES, ...FEATURES];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          En continu
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 14 }}
      >
        Nos atouts en mouvement
      </h3>

      <div
        className="relative overflow-hidden group"
        style={{
          borderTop: `1px solid ${LINE}`,
          borderBottom: `1px solid ${LINE}`,
          padding: '12px 0',
          maskImage:
            'linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)',
        }}
      >
        <motion.div
          className="flex items-stretch gap-2.5 w-max group-hover:[animation-play-state:paused]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((f, i) => {
            const Icon = iconFor(f.icon);
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2.5 shrink-0"
                style={{
                  border: `1px solid ${LINE}`,
                  background: BLUE_MIST,
                  color: BLUE_DEEP,
                  borderRadius: 9999,
                  padding: '9px 16px 9px 10px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                }}
              >
                <span
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 9999,
                    background: '#ffffff',
                    color: BLUE,
                  }}
                >
                  <Icon size={15} strokeWidth={2.3} />
                </span>
                {f.title}
              </span>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {FEATURES.map((f) => {
          const Icon = iconFor(f.icon);
          return (
            <div
              key={f.title}
              className="flex items-start gap-3"
              style={{
                background: BLUE_SOFT,
                borderRadius: 18,
                padding: '14px 16px',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{ width: 38, height: 38, borderRadius: 12, background: BLUE, color: '#ffffff' }}
              >
                <Icon size={19} strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="font-display"
                    style={{ fontSize: '1rem', fontWeight: 700, color: INK }}
                  >
                    {f.title}
                  </span>
                  <ArrowUpRight size={15} color={BLUE} strokeWidth={2.4} />
                </div>
                <p
                  style={{ fontSize: '0.83rem', lineHeight: 1.4, color: MUTE, margin: '3px 0 0' }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 42,
    label: 'Lignes filets',
    note: 'Lignes séparées par filets avec index, icône bleue, titre et description toujours visibles.',
    Component: V42,
  },
  {
    n: 43,
    label: 'Cartes à chips',
    note: 'Quatre cartes d’affichage avec chip d’icône et léger survol qui soulève la carte.',
    Component: V43,
  },
  {
    n: 44,
    label: 'Liste numérotée',
    note: 'Liste numérotée des engagements, icône et description, léger décalage au survol.',
    Component: V44,
  },
  {
    n: 45,
    label: 'Bento',
    note: 'Bento asymétrique : le premier atout en grande tuile bleu profond, les autres en cellules.',
    Component: V45,
  },
  {
    n: 46,
    label: 'Bandeau défilant',
    note: 'Marquee de pastilles en boucle, pause au survol, les quatre atouts détaillés en dessous.',
    Component: V46,
  },
];
