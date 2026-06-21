import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Plus, Star, Ruler, Maximize2, Package } from 'lucide-react';
import { SIZES, fmt } from './data.js';

/* ----------------------------------------------------------------------------
   Shared tiny pieces
---------------------------------------------------------------------------- */

// Compact inline quantity stepper — used inside selected items only.
function Stepper({ qty, setQty, tone = 'solid' }) {
  const solid = tone === 'solid';
  const btn =
    'h-8 w-8 flex items-center justify-center rounded-full cursor-pointer select-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
  const skin = solid
    ? 'bg-white text-[var(--blue)] hover:bg-[var(--blue-soft)]'
    : 'bg-[var(--blue-soft)] text-[var(--blue)] hover:bg-white border border-[var(--line)]';
  return (
    <div
      className={
        'inline-flex items-center gap-1 rounded-full p-1 ' +
        (solid ? 'bg-[var(--blue)]/10' : 'bg-white')
      }
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        aria-label="Diminuer la quantité"
        disabled={qty <= 1}
        onClick={() => setQty(Math.max(1, qty - 1))}
        className={btn + ' ' + skin}
      >
        <Minus size={15} strokeWidth={2.5} />
      </motion.button>
      <span className="min-w-[1.6rem] text-center font-display text-base font-semibold text-[var(--blue-deep)] tabular-nums">
        {qty}
      </span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        aria-label="Augmenter la quantité"
        onClick={() => setQty(qty + 1)}
        className={btn + ' ' + skin}
      >
        <Plus size={15} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

function PopularTag({ className = '' }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1 rounded-full bg-[var(--blue)] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-white ' +
        className
      }
    >
      <Star size={10} strokeWidth={2.5} className="fill-white" />
      Populaire
    </span>
  );
}

// onKeyDown helper so role="button" cards behave like buttons.
const keyActivate = (fn) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fn();
  }
};

/* ============================================================================
   V1 — Horizontal segmented control / tabs
============================================================================ */
function V1() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);
  const active = SIZES[sel];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2 text-[var(--blue)]">
        <Ruler size={16} strokeWidth={2.4} />
        <span className="kicker !text-[0.68rem]">Choisissez la taille</span>
      </div>

      {/* Segmented control */}
      <div className="relative flex rounded-full border border-[var(--line)] bg-[var(--blue-mist)] p-1">
        {SIZES.map((s, i) => {
          const on = i === sel;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => setSel(i)}
              className="relative z-10 flex-1 cursor-pointer rounded-full px-2 py-2.5 text-center transition-colors"
            >
              {on && (
                <motion.span
                  layoutId="v1-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-[var(--line)]"
                />
              )}
              <span
                className={
                  'font-display text-base font-semibold transition-colors ' +
                  (on ? 'text-[var(--blue-deep)]' : 'text-[var(--blue)]/55')
                }
              >
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail row for the active tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-semibold text-[var(--blue-deep)]">
                {active.name}
              </span>
              {active.popular && <PopularTag />}
            </div>
            <div className="mt-0.5 text-[0.78rem] text-[var(--blue)]/60">{active.sub}</div>
            <div className="mt-1.5 font-display text-xl font-bold text-[var(--blue)]">
              {fmt(active.price)}
            </div>
          </div>
          <Stepper qty={qty} setQty={setQty} tone="mist" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================================================
   V2 — Generous selectable cards grid (compact, no empty space)
============================================================================ */
function V2() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);

  return (
    <div className="w-full">
      <div className="mb-4 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Format de la tente
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {SIZES.map((s, i) => {
          const on = i === sel;
          return (
            <motion.div
              key={s.name}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => setSel(i)}
              onKeyDown={keyActivate(() => setSel(i))}
              whileTap={{ scale: 0.97 }}
              className={
                'relative cursor-pointer overflow-hidden rounded-2xl border p-3 text-center transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)] ring-1 ring-[var(--blue)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              {s.popular && (
                <span className="absolute right-1.5 top-1.5 text-[var(--blue)]">
                  <Star size={13} strokeWidth={2.6} className={on ? 'fill-[var(--blue)]' : ''} />
                </span>
              )}
              {/* Proportional square glyph so each card reads as a footprint */}
              <div className="mx-auto mb-2 flex h-12 items-end justify-center">
                <div
                  className={
                    'rounded-md border-2 transition-colors ' +
                    (on ? 'border-[var(--blue)] bg-white' : 'border-[var(--blue)]/30')
                  }
                  style={{ width: 18 + i * 9, height: 18 + i * 9 }}
                />
              </div>
              <div className="font-display text-base font-bold text-[var(--blue-deep)]">
                {s.name}
              </div>
              <div className="mt-0.5 text-[0.7rem] font-semibold text-[var(--blue)]">
                {fmt(s.price)}
              </div>

              <AnimatePresence>
                {on && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--blue)] text-white"
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Qty bar appears only for the selected size */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sel}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-3 flex items-center justify-between rounded-2xl bg-[var(--blue-mist)] px-4 py-2.5"
        >
          <span className="text-[0.82rem] font-medium text-[var(--blue-deep)]">
            Quantité — {SIZES[sel].name}
          </span>
          <Stepper qty={qty} setQty={setQty} tone="mist" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================================================
   V3 — Compact list rows, radio + inline qty on selected
============================================================================ */
function V3() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);

  return (
    <div className="w-full">
      <div className="mb-3 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Sélectionnez votre taille
      </div>

      <div className="flex flex-col gap-2">
        {SIZES.map((s, i) => {
          const on = i === sel;
          return (
            <motion.div
              key={s.name}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => setSel(i)}
              onKeyDown={keyActivate(() => setSel(i))}
              whileTap={{ scale: 0.99 }}
              className={
                'flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              {/* Radio */}
              <span
                className={
                  'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ' +
                  (on ? 'border-[var(--blue)]' : 'border-[var(--blue)]/30')
                }
              >
                <AnimatePresence>
                  {on && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                      className="h-2.5 w-2.5 rounded-full bg-[var(--blue)]"
                    />
                  )}
                </AnimatePresence>
              </span>

              {/* Label */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-semibold text-[var(--blue-deep)]">
                    {s.name}
                  </span>
                  {s.popular && <PopularTag />}
                </div>
                <div className="truncate text-[0.74rem] text-[var(--blue)]/55">{s.sub}</div>
              </div>

              {/* Price OR stepper */}
              <div className="flex flex-shrink-0 items-center">
                <AnimatePresence mode="wait" initial={false}>
                  {on ? (
                    <motion.div
                      key="step"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Stepper qty={qty} setQty={setQty} tone="mist" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="price"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-display text-base font-bold text-[var(--blue)]"
                    >
                      {fmt(s.price)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
   V4 — Size slider / stepper mapping to 3x3 / 4x4 / 5x5
============================================================================ */
function V4() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);
  const active = SIZES[sel];
  const pct = (sel / (SIZES.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--blue-deep)]">
          <Maximize2 size={16} strokeWidth={2.4} className="text-[var(--blue)]" />
          <span className="font-display text-[1.05rem] font-semibold">Dimensionnez</span>
        </div>
        {active.popular && <PopularTag />}
      </div>

      {/* Big animated value */}
      <div className="mb-5 mt-3 flex items-end gap-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={active.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="font-display text-4xl font-bold leading-none text-[var(--blue-deep)]"
          >
            {active.name}
          </motion.span>
        </AnimatePresence>
        <span className="pb-1 font-display text-lg font-semibold text-[var(--blue)]">
          {fmt(active.price)}
        </span>
      </div>

      {/* Track with notches */}
      <div className="relative mx-1 h-2 rounded-full bg-[var(--blue-soft)]">
        <motion.div
          className="absolute left-0 top-0 h-2 rounded-full bg-[var(--blue)]"
          animate={{ width: pct + '%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {SIZES.map((s, i) => {
            const reached = i <= sel;
            return (
              <button
                key={s.name}
                type="button"
                aria-label={'Taille ' + s.name}
                onClick={() => setSel(i)}
                className="relative -mx-3 flex h-8 w-8 cursor-pointer items-center justify-center"
              >
                <motion.span
                  whileTap={{ scale: 0.8 }}
                  className={
                    'h-4 w-4 rounded-full border-2 transition-colors ' +
                    (reached
                      ? 'border-[var(--blue)] bg-white'
                      : 'border-[var(--blue)]/25 bg-white')
                  }
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Labels under notches */}
      <div className="mt-2 flex justify-between px-0.5">
        {SIZES.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setSel(i)}
            className={
              'cursor-pointer text-[0.72rem] font-semibold transition-colors ' +
              (i === sel ? 'text-[var(--blue)]' : 'text-[var(--blue)]/40')
            }
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* −/+ stepper that walks the slider + quantity */}
      <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--blue-mist)] p-3">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            aria-label="Taille plus petite"
            disabled={sel <= 0}
            onClick={() => setSel(Math.max(0, sel - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--blue)] transition-colors hover:bg-[var(--blue-soft)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Minus size={15} strokeWidth={2.5} />
          </motion.button>
          <span className="px-1 text-[0.78rem] font-medium text-[var(--blue-deep)]">Taille</span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            aria-label="Taille plus grande"
            disabled={sel >= SIZES.length - 1}
            onClick={() => setSel(Math.min(SIZES.length - 1, sel + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--blue)] transition-colors hover:bg-[var(--blue-soft)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[0.74rem] text-[var(--blue)]/60">Qté</span>
          <Stepper qty={qty} setQty={setQty} tone="mist" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   V5 — Pill / chip toggles with a detail panel
============================================================================ */
function V5() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);
  const active = SIZES[sel];

  return (
    <div className="w-full">
      <div className="mb-3 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Taille de la structure
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {SIZES.map((s, i) => {
          const on = i === sel;
          return (
            <motion.button
              key={s.name}
              type="button"
              aria-pressed={on}
              onClick={() => setSel(i)}
              whileTap={{ scale: 0.94 }}
              className={
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                  : 'border-[var(--line)] bg-white text-[var(--blue-deep)] hover:border-[var(--blue)]/50 hover:bg-[var(--blue-mist)]')
              }
            >
              <AnimatePresence initial={false}>
                {on && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center overflow-hidden"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
              {s.name}
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="mt-4 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--blue-mist)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22 }}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold text-[var(--blue-deep)]">
                    {active.name}
                  </span>
                  {active.popular && <PopularTag />}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[0.8rem] text-[var(--blue)]/65">
                  <Ruler size={13} strokeWidth={2.2} />
                  {active.sub}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[0.65rem] uppercase tracking-wide text-[var(--blue)]/55">
                  à partir de
                </div>
                <div className="font-display text-xl font-bold text-[var(--blue)]">
                  {fmt(active.price)}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-3 py-2.5 ring-1 ring-[var(--line)]">
              <span className="flex items-center gap-2 text-[0.82rem] font-medium text-[var(--blue-deep)]">
                <Package size={15} strokeWidth={2.2} className="text-[var(--blue)]" />
                Quantité
              </span>
              <Stepper qty={qty} setQty={setQty} tone="mist" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================================
   Export
============================================================================ */
export const variants = [
  { n: 1, label: 'Onglets segmentés', note: 'Contrôle horizontal compact avec pilule glissante', Component: V1 },
  { n: 2, label: 'Cartes format', note: 'Grille de cartes avec aperçu proportionnel du sol', Component: V2 },
  { n: 3, label: 'Liste radio', note: 'Lignes denses, radio à gauche, qté inline sur le choix', Component: V3 },
  { n: 4, label: 'Curseur de taille', note: 'Slider/stepper qui mappe 3x3 → 4x4 → 5x5', Component: V4 },
  { n: 5, label: 'Chips + panneau', note: 'Pastilles à bascule avec panneau de détail animé', Component: V5 },
];
