import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Shield,
  Sparkles,
  Truck,
  Check,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
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
   A precise, editorial list: each atout is a single row separated by a
   hairline, prefixed with a two-digit index. Selecting a row slides a
   blue marker, tints the row and reveals a soft arrow. Restrained,
   Swiss-grid feel.
   ===================================================================== */
function V42() {
  const [sel, setSel] = useState(0);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

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
          const on = sel === i;
          return (
            <div
              key={f.title}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative flex items-center gap-4 overflow-hidden"
              style={{
                borderBottom: `1px solid ${LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                padding: '15px 14px 15px 12px',
                transition: 'background .22s',
              }}
            >
              {on && (
                <motion.span
                  layoutId="feat42-bar"
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: 3, background: BLUE }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className="font-display shrink-0 tabular-nums"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  width: 26,
                  color: on ? BLUE : '#a9bcd8',
                  transition: 'color .22s',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.span
                animate={{ color: on ? BLUE : '#a9bcd8' }}
                className="flex items-center justify-center shrink-0"
              >
                <Icon size={20} strokeWidth={2.1} />
              </motion.span>
              <span className="min-w-0">
                <span
                  className="block"
                  style={{
                    fontSize: '0.96rem',
                    lineHeight: 1.2,
                    fontWeight: on ? 700 : 600,
                    color: INK,
                  }}
                >
                  {f.title}
                </span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      key="d"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="block overflow-hidden"
                      style={{
                        fontSize: '0.82rem',
                        lineHeight: 1.35,
                        color: MUTE,
                        marginTop: 3,
                      }}
                    >
                      {f.desc}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <motion.span
                animate={{ opacity: on ? 1 : 0, x: on ? 0 : -6 }}
                transition={{ duration: 0.2 }}
                className="ml-auto flex items-center justify-center shrink-0"
                style={{ color: BLUE }}
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V43 — Icon-chip cards (2-col)
   Four soft cards, each led by a rounded icon "chip". Selecting a card
   lifts it, fills the chip blue and confirms with a check. A tactile,
   product-tile presentation of the four atouts.
   ===================================================================== */
function V43() {
  const [sel, setSel] = useState(2);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

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
        {FEATURES.map((f, i) => {
          const Icon = iconFor(f.icon);
          const on = sel === i;
          return (
            <motion.div
              key={f.title}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer relative"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                padding: '15px 15px 16px',
                transition: 'background .22s, border-color .22s',
              }}
            >
              <div className="flex items-start justify-between">
                <motion.span
                  animate={{
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#ffffff' : BLUE,
                  }}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 13 }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </motion.span>
                <motion.span
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.5 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    background: BLUE,
                    color: '#ffffff',
                  }}
                >
                  <Check size={13} strokeWidth={3.2} />
                </motion.span>
              </div>
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
   V44 — Numbered list w/ qty stepper
   A clean numbered list framed as "engagements". The selected line
   reveals a small quantity stepper (the qty stepper appears ONLY on the
   selected item) — e.g. how many units of that benefit you want priced
   in — driving a live little summary chip at the top.
   ===================================================================== */
function V44() {
  const [sel, setSel] = useState(0);
  const [qty, setQty] = useState(() => FEATURES.map(() => 1));
  const total = qty.reduce((a, b) => a + b, 0);

  const setQ = (i, d) =>
    setQty((q) =>
      q.map((v, idx) => (idx === i ? Math.max(1, Math.min(9, v + d)) : v))
    );
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
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
        <motion.div
          key={total}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          className="font-display"
          style={{
            background: BLUE_SOFT,
            color: BLUE_DEEP,
            borderRadius: 9999,
            padding: '6px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {total} pts
        </motion.div>
      </div>

      <div className="flex flex-col gap-2.5">
        {FEATURES.map((f, i) => {
          const Icon = iconFor(f.icon);
          const on = sel === i;
          return (
            <div
              key={f.title}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer flex items-center gap-3.5"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 16,
                padding: '12px 13px',
                transition: 'background .22s, border-color .22s',
              }}
            >
              <motion.span
                animate={{
                  background: on ? BLUE : '#ffffff',
                  color: on ? '#ffffff' : BLUE,
                  borderColor: on ? BLUE : LINE,
                }}
                className="font-display flex items-center justify-center shrink-0 tabular-nums"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 11,
                  border: `1px solid ${LINE}`,
                  fontSize: '0.92rem',
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </motion.span>
              <span className="min-w-0 flex-1">
                <span
                  className="flex items-center gap-2"
                  style={{
                    fontSize: '0.94rem',
                    lineHeight: 1.2,
                    fontWeight: on ? 700 : 600,
                    color: INK,
                  }}
                >
                  <Icon size={15} strokeWidth={2.2} color={on ? BLUE : '#a9bcd8'} />
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

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    key="step"
                    initial={{ opacity: 0, width: 0, scale: 0.9 }}
                    animate={{ opacity: 1, width: 'auto', scale: 1 }}
                    exit={{ opacity: 0, width: 0, scale: 0.9 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-1.5 shrink-0 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setQ(i, -1)}
                      aria-label="Diminuer"
                      className="cursor-pointer flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 9,
                        border: `1px solid ${LINE}`,
                        background: '#ffffff',
                        color: BLUE,
                      }}
                    >
                      <Minus size={14} strokeWidth={2.6} />
                    </button>
                    <span
                      className="font-display tabular-nums text-center"
                      style={{
                        minWidth: 18,
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: INK,
                      }}
                    >
                      {qty[i]}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQ(i, 1)}
                      aria-label="Augmenter"
                      className="cursor-pointer flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 9,
                        border: `1px solid ${BLUE}`,
                        background: BLUE,
                        color: '#ffffff',
                      }}
                    >
                      <Plus size={14} strokeWidth={2.6} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V45 — Bento
   An asymmetric bento: the selected atout expands into a featured deep-
   blue tile (bg-deep) while the others stay as compact white cells.
   A spatial, modern way to spotlight one benefit at a time.
   ===================================================================== */
function V45() {
  const [sel, setSel] = useState(0);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };
  const FeatIcon = iconFor(FEATURES[sel].icon);

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
        <motion.div
          layout
          className="bg-deep col-span-2 relative overflow-hidden"
          style={{ borderRadius: 22, padding: '20px 20px 22px', color: '#ffffff' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
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
                <FeatIcon size={24} strokeWidth={2.1} />
              </span>
              <div
                className="font-display"
                style={{ fontSize: '1.3rem', lineHeight: 1.1, fontWeight: 700, marginTop: 14 }}
              >
                {FEATURES[sel].title}
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
                {FEATURES[sel].desc}
              </p>
            </motion.div>
          </AnimatePresence>
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
            {String(sel + 1).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Compact selector cells */}
        {FEATURES.map((f, i) => {
          const Icon = iconFor(f.icon);
          const on = sel === i;
          return (
            <motion.div
              key={f.title}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer relative flex flex-col gap-2"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 16,
                padding: '13px 13px 14px',
                transition: 'background .2s, border-color .2s',
              }}
            >
              <span className="flex items-center justify-between">
                <motion.span
                  animate={{
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#ffffff' : BLUE,
                  }}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 32, height: 32, borderRadius: 10 }}
                >
                  <Icon size={17} strokeWidth={2.2} />
                </motion.span>
                <AnimatePresence>
                  {on && (
                    <motion.span
                      key="dot"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9999,
                        background: BLUE,
                        color: '#ffffff',
                      }}
                    >
                      <Check size={11} strokeWidth={3.4} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.2,
                  fontWeight: on ? 700 : 600,
                  color: on ? INK : '#3b4f73',
                }}
              >
                {f.title}
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
   seamless loop). Pausing on hover and clicking a chip pins it into a
   detail panel below — kinetic but controllable.
   ===================================================================== */
function V46() {
  const [paused, setPaused] = useState(false);
  const [sel, setSel] = useState(0);
  const loop = [...FEATURES, ...FEATURES];
  const Active = iconFor(FEATURES[sel].icon);

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
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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
          className="flex items-stretch gap-2.5 w-max"
          animate={{ x: paused ? undefined : ['0%', '-50%'] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((f, i) => {
            const Icon = iconFor(f.icon);
            const idx = i % FEATURES.length;
            const on = sel === idx;
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => setSel(idx)}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer inline-flex items-center gap-2.5 shrink-0"
                style={{
                  border: `1px solid ${on ? BLUE : LINE}`,
                  background: on ? BLUE : BLUE_MIST,
                  color: on ? '#ffffff' : BLUE_DEEP,
                  borderRadius: 9999,
                  padding: '9px 16px 9px 10px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  transition: 'background .2s, border-color .2s, color .2s',
                }}
              >
                <span
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 9999,
                    background: on ? 'rgba(255,255,255,.2)' : '#ffffff',
                    color: on ? '#ffffff' : BLUE,
                  }}
                >
                  <Icon size={15} strokeWidth={2.3} />
                </span>
                {f.title}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <div
        className="mt-4 flex items-start gap-3"
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
          <Active size={19} strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="font-display"
              style={{ fontSize: '1rem', fontWeight: 700, color: INK }}
            >
              {FEATURES[sel].title}
            </span>
            <ArrowUpRight size={15} color={BLUE} strokeWidth={2.4} />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={sel}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '0.83rem', lineHeight: 1.4, color: MUTE, margin: '3px 0 0' }}
            >
              {FEATURES[sel].desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 42,
    label: 'Lignes filets',
    note: 'Lignes séparées par filets avec index, marqueur bleu et détail qui se déplie.',
    Component: V42,
  },
  {
    n: 43,
    label: 'Cartes à chips',
    note: 'Quatre cartes avec chip d’icône qui se remplit et se coche à la sélection.',
    Component: V43,
  },
  {
    n: 44,
    label: 'Liste numérotée',
    note: 'Liste numérotée avec stepper de quantité uniquement sur l’atout sélectionné.',
    Component: V44,
  },
  {
    n: 45,
    label: 'Bento',
    note: 'Bento asymétrique : l’atout choisi s’ouvre en grande tuile bleu profond.',
    Component: V45,
  },
  {
    n: 46,
    label: 'Bandeau défilant',
    note: 'Marquee de pastilles en boucle, pause au survol, détail épinglé en bas.',
    Component: V46,
  },
];
