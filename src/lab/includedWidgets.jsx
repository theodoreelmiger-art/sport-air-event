import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Sparkles,
  Printer,
  Shield,
  Box,
  Truck,
  Layers,
  BadgeCheck,
  Plus,
} from 'lucide-react';
import { INCLUDED, PRODUCT_NAME, fmt, EXAMPLE_TOTAL } from './data.js';

// Shared blue palette (no black anywhere)
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#15294a'; // deep blue-ink used instead of black for text

// One lucide icon per included line, in order.
const ICONS = [Printer, Layers, Sparkles, Box, Shield, Truck];

/* =====================================================================
   V15 — Checkmark grid
   Soft 2-col grid of tiles; each tile reveals a check that the owner
   can "tick off" (toggle) as a tactile little interaction. A running
   counter at the top reacts to how many are confirmed.
   ===================================================================== */
function V15() {
  const [checked, setChecked] = useState(() => INCLUDED.map(() => true));
  const toggle = (i) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  const count = checked.filter(Boolean).length;

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            Inclus dans le prix
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.35rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Tout est compris
          </h3>
        </div>
        <motion.div
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
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
          {count}/{INCLUDED.length}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {INCLUDED.map((label, i) => {
          const Icon = ICONS[i % ICONS.length];
          const on = checked[i];
          return (
            <motion.button
              key={label}
              type="button"
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer text-left flex items-start gap-3"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                padding: '13px 14px',
                transition: 'background .2s, border-color .2s',
              }}
            >
              <motion.span
                animate={{
                  background: on ? BLUE : '#ffffff',
                  borderColor: on ? BLUE : LINE,
                  color: on ? '#ffffff' : '#9fb6d6',
                }}
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  border: `1px solid ${LINE}`,
                  marginTop: 1,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {on ? (
                    <motion.span
                      key="on"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check size={15} strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="off"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Icon size={14} strokeWidth={2.2} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.3,
                  fontWeight: on ? 600 : 500,
                  color: on ? INK : '#5b6f8e',
                }}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V16 — Soft badge cloud
   Pill-shaped badges flowing like a cloud. Hovering / selecting a pill
   "pins" it (filled blue) and surfaces it into a highlighted strip,
   giving a playful, airy way to read what's included.
   ===================================================================== */
function V16() {
  const [active, setActive] = useState(null);

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <BadgeCheck size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          {PRODUCT_NAME} — toujours inclus
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 16 }}
      >
        Le standard, sans supplément
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {INCLUDED.map((label, i) => {
          const on = active === i;
          return (
            <motion.button
              key={label}
              type="button"
              onClick={() => setActive(on ? null : i)}
              onMouseEnter={() => setActive(i)}
              whileTap={{ scale: 0.95 }}
              animate={{
                background: on ? BLUE : BLUE_MIST,
                borderColor: on ? BLUE : LINE,
                color: on ? '#ffffff' : BLUE_DEEP,
              }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer inline-flex items-center gap-2"
              style={{
                border: `1px solid ${LINE}`,
                borderRadius: 9999,
                padding: '9px 15px 9px 11px',
                fontSize: '0.86rem',
                fontWeight: 600,
              }}
            >
              <motion.span
                animate={{
                  background: on ? 'rgba(255,255,255,.22)' : '#ffffff',
                  color: on ? '#ffffff' : BLUE,
                }}
                className="flex items-center justify-center shrink-0"
                style={{ width: 20, height: 20, borderRadius: 9999 }}
              >
                <Check size={13} strokeWidth={3} />
              </motion.span>
              {label}
            </motion.button>
          );
        })}
      </div>

      <div
        className="mt-5 flex items-center gap-3"
        style={{
          borderTop: `1px solid ${LINE}`,
          paddingTop: 14,
        }}
      >
        <Sparkles size={16} color={BLUE} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active === null ? 'idle' : active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '0.85rem', color: '#5b6f8e', margin: 0 }}
          >
            {active === null
              ? 'Survolez un badge pour le mettre en avant — tout est déjà compris.'
              : INCLUDED[active]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =====================================================================
   V17 — 2-col feature list with icon chips
   A refined 2-column list: each row is a rounded icon "chip" + label,
   selectable to expand a thin highlight bar. Footer reaffirms the
   example price so the owner sees the value framing.
   ===================================================================== */
function V17() {
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
          Compris dans l'offre
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.4rem', lineHeight: 1.05, marginTop: 4 }}
        >
          6 prestations, zéro extra
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5">
        {INCLUDED.map((label, i) => {
          const Icon = ICONS[i % ICONS.length];
          const on = sel === i;
          return (
            <div
              key={label}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative flex items-center gap-3 overflow-hidden"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 16,
                padding: '11px 13px',
                transition: 'background .2s, border-color .2s',
              }}
            >
              {on && (
                <motion.span
                  layoutId="inc-bar"
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: 3, background: BLUE, borderRadius: 9999 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <motion.span
                whileTap={{ scale: 0.9 }}
                animate={{
                  background: on ? BLUE : BLUE_SOFT,
                  color: on ? '#ffffff' : BLUE,
                }}
                className="flex items-center justify-center shrink-0"
                style={{ width: 34, height: 34, borderRadius: 11 }}
              >
                <Icon size={17} strokeWidth={2.2} />
              </motion.span>
              <span
                style={{
                  fontSize: '0.84rem',
                  lineHeight: 1.25,
                  fontWeight: on ? 650 : 540,
                  color: on ? INK : '#5b6f8e',
                }}
              >
                {label}
              </span>
              <motion.span
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
                transition={{ duration: 0.18 }}
                className="ml-auto flex items-center justify-center shrink-0"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  background: BLUE,
                  color: '#ffffff',
                }}
              >
                <Check size={12} strokeWidth={3.2} />
              </motion.span>
            </div>
          );
        })}
      </div>

      <div
        className="mt-5 flex items-center justify-between"
        style={{
          background: BLUE_SOFT,
          borderRadius: 16,
          padding: '12px 16px',
        }}
      >
        <span className="inline-flex items-center gap-2" style={{ fontSize: '0.82rem', color: BLUE_DEEP, fontWeight: 600 }}>
          <Plus size={15} strokeWidth={2.6} />
          Aucun frais caché
        </span>
        <span className="font-display" style={{ color: BLUE_DEEP, fontSize: '0.95rem', fontWeight: 700 }}>
          dès {fmt(EXAMPLE_TOTAL)}
        </span>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 15,
    label: 'Grille cochée',
    note: 'Grille 2 colonnes avec coches que l’on peut activer, compteur vivant.',
    Component: V15,
  },
  {
    n: 16,
    label: 'Nuage de badges',
    note: 'Pastilles aériennes qui s’épinglent au survol, ligne de détail animée.',
    Component: V16,
  },
  {
    n: 17,
    label: 'Liste à chips',
    note: 'Liste 2 colonnes avec chips d’icône, barre de surlignage et rappel prix.',
    Component: V17,
  },
];
