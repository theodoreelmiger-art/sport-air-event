import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Minus,
  Plus,
  Star,
  Ruler,
  Maximize2,
  Package,
  ChevronDown,
  Gauge,
  Grid3x3,
  ArrowRight,
} from 'lucide-react';
import { SIZES, fmt } from './data.js';

/* ----------------------------------------------------------------------------
   Shared tiny pieces (local to this file)
---------------------------------------------------------------------------- */

// Compact inline quantity stepper — used inside selected items only.
function Stepper({ qty, setQty, tone = 'mist' }) {
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
        (solid ? 'bg-white/15' : 'bg-white')
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
   V102 — Dropdown with live preview panel
   A select-style trigger that opens an animated menu; the picked size feeds a
   "footprint to scale" preview card with an inline stepper.
============================================================================ */
function V102() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const active = SIZES[sel];

  const choose = (i) => {
    setSel(i);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2 text-[var(--blue)]">
        <Ruler size={16} strokeWidth={2.4} />
        <span className="kicker !text-[0.68rem]">Format de la tente</span>
      </div>

      {/* Trigger */}
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={
            'flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-colors ' +
            (open
              ? 'border-[var(--blue)] ring-1 ring-[var(--blue)]'
              : 'border-[var(--line)] hover:border-[var(--blue)]/45')
          }
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--blue-soft)] text-[var(--blue)]">
              <Grid3x3 size={17} strokeWidth={2.3} />
            </span>
            <span>
              <span className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-[var(--blue-deep)]">
                  {active.name}
                </span>
                {active.popular && <PopularTag />}
              </span>
              <span className="block text-[0.74rem] text-[var(--blue)]/55">{active.sub}</span>
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-display text-base font-bold text-[var(--blue)]">
              {fmt(active.price)}
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
              <ChevronDown size={18} strokeWidth={2.4} className="text-[var(--blue)]/60" />
            </motion.span>
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-1.5 shadow-[0_18px_40px_-22px_rgba(0,82,163,0.45)]"
            >
              {SIZES.map((s, i) => {
                const on = i === sel;
                return (
                  <li key={s.name} role="option" aria-selected={on}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      className={
                        'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ' +
                        (on
                          ? 'bg-[var(--blue-soft)]'
                          : 'hover:bg-[var(--blue-mist)]')
                      }
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={
                            'rounded-[5px] border-2 transition-colors ' +
                            (on ? 'border-[var(--blue)] bg-white' : 'border-[var(--blue)]/30')
                          }
                          style={{ width: 14 + i * 6, height: 14 + i * 6 }}
                        />
                        <span>
                          <span className="font-display text-sm font-semibold text-[var(--blue-deep)]">
                            {s.name}
                          </span>
                          <span className="block text-[0.7rem] text-[var(--blue)]/50">
                            {s.sub}
                          </span>
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-[var(--blue)]">
                          {fmt(s.price)}
                        </span>
                        {on && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--blue)] text-white">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Live preview */}
      <div className="mt-4 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--blue-mist)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 p-4"
          >
            {/* Scale footprint */}
            <div className="flex h-[72px] w-[72px] flex-shrink-0 items-end justify-center">
              <motion.div
                layout
                className="rounded-md border-2 border-[var(--blue)] bg-white"
                style={{ width: 34 + sel * 16, height: 34 + sel * 16 }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg font-bold text-[var(--blue-deep)]">
                Aperçu — {active.name}
              </div>
              <div className="text-[0.76rem] text-[var(--blue)]/60">{active.sub}</div>
            </div>
            <Stepper qty={qty} setQty={setQty} tone="mist" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================================
   V103 — Big visual footprint blocks
   Three large stacked blocks scaled to area; selecting reveals a stepper bar
   that slides out within the active block.
============================================================================ */
function V103() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);

  return (
    <div className="w-full">
      <div className="mb-4 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Choisissez l'emprise au sol
      </div>

      <div className="flex flex-col gap-3">
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
                'relative cursor-pointer overflow-hidden rounded-[22px] border p-4 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)] ring-1 ring-[var(--blue)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              <div className="flex items-center gap-4">
                {/* Big proportional footprint */}
                <div className="flex h-[68px] w-[68px] flex-shrink-0 items-end justify-center">
                  <motion.div
                    className={
                      'relative rounded-lg border-2 transition-colors ' +
                      (on ? 'border-[var(--blue)] bg-white' : 'border-[var(--blue)]/30 bg-[var(--blue-mist)]')
                    }
                    style={{ width: 30 + i * 17, height: 30 + i * 17 }}
                    animate={{ scale: on ? 1.04 : 1 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  >
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[0.6rem] font-semibold text-[var(--blue)]/55">
                      {(i + 3) + 'm'}
                    </span>
                  </motion.div>
                </div>

                {/* Label block */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-bold text-[var(--blue-deep)]">
                      {s.name}
                    </span>
                    {s.popular && <PopularTag />}
                  </div>
                  <div className="mt-0.5 text-[0.76rem] text-[var(--blue)]/55">{s.sub}</div>
                  <div className="mt-1 font-display text-base font-bold text-[var(--blue)]">
                    {fmt(s.price)}
                  </div>
                </div>

                {/* Check */}
                <span
                  className={
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ' +
                    (on
                      ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                      : 'border-[var(--blue)]/25 text-transparent')
                  }
                >
                  <Check size={15} strokeWidth={3} />
                </span>
              </div>

              {/* Stepper slides out on selection */}
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-3 py-2.5 ring-1 ring-[var(--line)]">
                      <span className="flex items-center gap-2 text-[0.82rem] font-medium text-[var(--blue-deep)]">
                        <Package size={15} strokeWidth={2.2} className="text-[var(--blue)]" />
                        Quantité
                      </span>
                      <Stepper qty={qty} setQty={setQty} tone="mist" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
   V104 — Comparison table with selectable columns
   Rows = attributes, columns = sizes. Click a column header to select; the
   active column highlights and grows a stepper footer cell.
============================================================================ */
function V104() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);

  const rows = [
    { label: 'Dimensions', get: (s) => s.sub.replace('(H)', ' (H) ') },
    { label: 'Surface au sol', get: (s, i) => (i + 3) + '×' + (i + 3) + ' m' },
    { label: 'Personnes', get: (s, i) => ['~8', '~14', '~22'][i] },
    { label: 'Prix', get: (s) => fmt(s.price), strong: true },
  ];

  return (
    <div className="w-full">
      <div className="mb-3 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Comparez les tailles
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-white">
        {/* Header: clickable columns */}
        <div className="grid grid-cols-[1.1fr_repeat(3,1fr)] border-b border-[var(--line)] bg-[var(--blue-mist)]">
          <div className="px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-wide text-[var(--blue)]/55">
            Caractéristique
          </div>
          {SIZES.map((s, i) => {
            const on = i === sel;
            return (
              <button
                key={s.name}
                type="button"
                aria-pressed={on}
                onClick={() => setSel(i)}
                className={
                  'relative cursor-pointer px-1 py-3 text-center transition-colors ' +
                  (on ? 'bg-[var(--blue)] text-white' : 'text-[var(--blue-deep)] hover:bg-[var(--blue-soft)]')
                }
              >
                {s.popular && (
                  <Star
                    size={11}
                    strokeWidth={2.6}
                    className={
                      'absolute right-1.5 top-1.5 ' + (on ? 'fill-white text-white' : 'text-[var(--blue)]')
                    }
                  />
                )}
                <span className="font-display text-sm font-bold">{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Body rows */}
        {rows.map((r, ri) => (
          <div
            key={r.label}
            className={
              'grid grid-cols-[1.1fr_repeat(3,1fr)] ' +
              (ri < rows.length - 1 ? 'border-b border-[var(--line)]' : '')
            }
          >
            <div className="px-3 py-2.5 text-[0.78rem] font-medium text-[var(--blue)]/65">
              {r.label}
            </div>
            {SIZES.map((s, i) => {
              const on = i === sel;
              return (
                <div
                  key={s.name}
                  className={
                    'px-1 py-2.5 text-center text-[0.8rem] transition-colors ' +
                    (on ? 'bg-[var(--blue-soft)]' : '') +
                    (r.strong
                      ? ' font-display font-bold text-[var(--blue)]'
                      : ' text-[var(--blue-deep)]')
                  }
                >
                  {r.get(s, i)}
                </div>
              );
            })}
          </div>
        ))}

        {/* Footer: stepper under the active column */}
        <div className="grid grid-cols-[1.1fr_repeat(3,1fr)] border-t border-[var(--line)] bg-[var(--blue-mist)]">
          <div className="flex items-center px-3 py-3 text-[0.78rem] font-medium text-[var(--blue-deep)]">
            Quantité
          </div>
          {SIZES.map((s, i) => {
            const on = i === sel;
            return (
              <div
                key={s.name}
                className={'flex items-center justify-center px-1 py-2.5 ' + (on ? 'bg-[var(--blue-soft)]' : '')}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {on ? (
                    <motion.div
                      key="step"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.16 }}
                    >
                      <Stepper qty={qty} setQty={setQty} tone="mist" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="dash"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[var(--blue)]/25"
                    >
                      —
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   V105 — Rotary dial / gauge selector
   A circular dial with a rotating needle and three notches; rotating to a
   size reveals the price and a stepper.
============================================================================ */
function V105() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);
  const active = SIZES[sel];

  const N = SIZES.length;
  // Map index → angle across a 180° arc (−90° … +90°).
  const angleFor = (i) => -90 + (i / (N - 1)) * 180;
  const needle = angleFor(sel);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-2 text-[var(--blue)]">
        <Gauge size={16} strokeWidth={2.4} />
        <span className="kicker !text-[0.68rem]">Réglez la taille</span>
      </div>

      <div className="flex flex-col items-center">
        {/* Dial */}
        <div className="relative h-[150px] w-[260px] overflow-hidden">
          {/* Arc track */}
          <div className="absolute left-1/2 top-[10px] h-[240px] w-[240px] -translate-x-1/2 rounded-full border-[10px] border-[var(--blue-soft)]" />
          {/* Notch buttons placed along the arc */}
          {SIZES.map((s, i) => {
            const a = (angleFor(i) * Math.PI) / 180;
            const r = 120; // radius to notch center
            const cx = 130 + Math.sin(a) * r;
            const cy = 130 - Math.cos(a) * r;
            const on = i === sel;
            return (
              <button
                key={s.name}
                type="button"
                aria-label={'Taille ' + s.name}
                aria-pressed={on}
                onClick={() => setSel(i)}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
                style={{ left: cx, top: cy }}
              >
                <motion.span
                  whileTap={{ scale: 0.82 }}
                  animate={{ scale: on ? 1.12 : 1 }}
                  className={
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-[0.7rem] font-bold transition-colors ' +
                    (on
                      ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                      : 'border-[var(--blue)]/25 bg-white text-[var(--blue)]/55 hover:border-[var(--blue)]/50')
                  }
                >
                  {s.name.split('x')[0]}
                </motion.span>
              </button>
            );
          })}
          {/* Needle */}
          <motion.div
            className="absolute bottom-[20px] left-1/2 origin-bottom"
            style={{ height: 92, width: 4, marginLeft: -2 }}
            animate={{ rotate: needle }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className="mx-auto h-full w-[4px] rounded-full bg-[var(--blue)]" />
          </motion.div>
          {/* Hub */}
          <div className="absolute bottom-[12px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white bg-[var(--blue-deep)]" />
        </div>

        {/* Read-out */}
        <div className="-mt-1 flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={active.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="font-display text-3xl font-bold leading-none text-[var(--blue-deep)]"
            >
              {active.name}
            </motion.span>
          </AnimatePresence>
          {active.popular && <PopularTag />}
        </div>
        <div className="mt-1 text-[0.76rem] text-[var(--blue)]/55">{active.sub}</div>
      </div>

      {/* Price + stepper */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--blue-mist)] p-3">
        <div>
          <div className="text-[0.62rem] uppercase tracking-wide text-[var(--blue)]/55">à partir de</div>
          <div className="font-display text-xl font-bold text-[var(--blue)]">{fmt(active.price)}</div>
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
   V106 — Swatch tiles
   Square tactile swatches in a row; the selected one lifts and expands a
   detail drawer below with the stepper + CTA.
============================================================================ */
function V106() {
  const [sel, setSel] = useState(1);
  const [qty, setQty] = useState(1);
  const active = SIZES[sel];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2 text-[var(--blue)]">
        <Maximize2 size={16} strokeWidth={2.4} />
        <span className="kicker !text-[0.68rem]">Nuancier de tailles</span>
      </div>

      {/* Swatch row */}
      <div className="flex gap-3">
        {SIZES.map((s, i) => {
          const on = i === sel;
          return (
            <motion.button
              key={s.name}
              type="button"
              aria-pressed={on}
              onClick={() => setSel(i)}
              whileTap={{ scale: 0.95 }}
              animate={{ y: on ? -4 : 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              className={
                'relative flex-1 cursor-pointer overflow-hidden rounded-2xl border p-3 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue)] ring-1 ring-[var(--blue)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/45')
              }
            >
              {s.popular && (
                <span className="absolute right-1.5 top-1.5">
                  <Star
                    size={12}
                    strokeWidth={2.6}
                    className={on ? 'fill-white text-white' : 'text-[var(--blue)]'}
                  />
                </span>
              )}
              {/* Swatch face: a tinted square footprint */}
              <div className="mb-2 flex h-12 items-end justify-center">
                <div
                  className={
                    'rounded-[6px] border-2 transition-colors ' +
                    (on ? 'border-white/70 bg-white/20' : 'border-[var(--blue)]/30 bg-[var(--blue-mist)]')
                  }
                  style={{ width: 18 + i * 9, height: 18 + i * 9 }}
                />
              </div>
              <div
                className={
                  'text-center font-display text-base font-bold transition-colors ' +
                  (on ? 'text-white' : 'text-[var(--blue-deep)]')
                }
              >
                {s.name}
              </div>
              <div
                className={
                  'text-center text-[0.7rem] font-semibold transition-colors ' +
                  (on ? 'text-white/80' : 'text-[var(--blue)]')
                }
              >
                {fmt(s.price)}
              </div>

              <AnimatePresence>
                {on && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                    className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[var(--blue)]"
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Detail drawer */}
      <div className="mt-4 overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--blue-mist)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-xl font-bold text-[var(--blue-deep)]">
                  {active.name}
                </div>
                <div className="flex items-center gap-1.5 text-[0.78rem] text-[var(--blue)]/60">
                  <Ruler size={13} strokeWidth={2.2} />
                  {active.sub}
                </div>
              </div>
              <Stepper qty={qty} setQty={setQty} tone="mist" />
            </div>

            <button
              type="button"
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--blue)] px-4 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-[var(--blue-deep)]"
            >
              Ajouter {qty > 1 ? qty + ' × ' : ''}
              {active.name}
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
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
  {
    n: 102,
    label: 'Menu déroulant + aperçu',
    note: 'Select animé qui alimente un aperçu de format à l’échelle',
    Component: V102,
  },
  {
    n: 103,
    label: 'Blocs visuels',
    note: 'Grands blocs d’emprise au sol proportionnels, stepper déroulant',
    Component: V103,
  },
  {
    n: 104,
    label: 'Tableau comparatif',
    note: 'Colonnes sélectionnables, ligne quantité sous la taille choisie',
    Component: V104,
  },
  {
    n: 105,
    label: 'Cadran rotatif',
    note: 'Jauge avec aiguille animée et crans 3x3 → 4x4 → 5x5',
    Component: V105,
  },
  {
    n: 106,
    label: 'Nuancier',
    note: 'Pavés-échantillons qui se soulèvent, tiroir détail + CTA',
    Component: V106,
  },
];
