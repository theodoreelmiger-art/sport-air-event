import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Plus, Minus, PanelTop, DoorOpen, Frame,
  Square, Layers, ChevronDown, Maximize2,
} from 'lucide-react';
import { OPTIONS, fmt } from './data.js';

const EASE = [0.22, 1, 0.36, 1];

/* Give each option a lucide icon (no emoji) — matched by index to OPTIONS. */
const OPTION_ICONS = [PanelTop, DoorOpen, Frame, Maximize2, Layers];
const iconFor = (i) => OPTION_ICONS[i % OPTION_ICONS.length];

/* Small shared quantity stepper — reused across variants. */
function Stepper({ qty, onDec, onInc, tone = 'soft' }) {
  const base =
    'w-8 h-8 grid place-items-center rounded-full cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed';
  const style =
    tone === 'solid'
      ? { border: '1px solid var(--blue)', color: 'var(--blue)', background: '#fff' }
      : { border: '1px solid var(--line)', color: 'var(--blue)', background: 'var(--blue-mist)' };
  const stop = (e) => e.stopPropagation();
  return (
    <div className="flex items-center gap-2" onClick={stop} onKeyDown={stop}>
      <motion.button
        type="button"
        aria-label="Diminuer la quantité"
        whileTap={{ scale: 0.85 }}
        onClick={onDec}
        disabled={qty <= 1}
        className={base}
        style={style}
      >
        <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
      </motion.button>
      <div
        className="w-7 text-center font-display tabular-nums select-none"
        style={{ color: 'var(--blue-deep, #0052a3)', fontSize: '0.95rem' }}
        aria-live="polite"
      >
        {qty}
      </div>
      <motion.button
        type="button"
        aria-label="Augmenter la quantité"
        whileTap={{ scale: 0.85 }}
        onClick={onInc}
        className={base}
        style={style}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

/* Shared selection hook: { [name]: qty } map. */
function useSelection() {
  const [sel, setSel] = useState({});
  const toggle = (name) =>
    setSel((s) => {
      const next = { ...s };
      if (next[name]) delete next[name];
      else next[name] = 1;
      return next;
    });
  const setQty = (name, q) =>
    setSel((s) => ({ ...s, [name]: Math.max(1, q) }));
  const total = OPTIONS.reduce(
    (sum, o) => (sel[o.name] ? sum + o.price * sel[o.name] : sum),
    0
  );
  const count = Object.keys(sel).length;
  return { sel, toggle, setQty, total, count };
}

function onKeyActivate(fn) {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };
}

/* Tiny running-total footer shared by several variants. */
function TotalBar({ count, total }) {
  return (
    <div
      className="flex items-center justify-between mt-5 pt-4"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <span style={{ color: '#5a6b82', fontSize: '0.85rem' }}>
        {count === 0
          ? 'Aucune paroi sélectionnée'
          : `${count} option${count > 1 ? 's' : ''} sélectionnée${count > 1 ? 's' : ''}`}
      </span>
      <span className="font-display tabular-nums" style={{ color: 'var(--blue)', fontSize: '1.05rem' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={total}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="inline-block"
          >
            {fmt(total)}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   V6 — Clean checklist: right-aligned price, qty-on-select reveals inline.
   ────────────────────────────────────────────────────────────────────────── */
function V6() {
  const { sel, toggle, setQty, total, count } = useSelection();
  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: '#16243a', marginBottom: 4 }}>
        Choisissez vos parois
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 18 }}>
        Multi-sélection — la quantité apparaît une fois cochée.
      </p>

      <div className="flex flex-col">
        {OPTIONS.map((o, i) => {
          const on = !!sel[o.name];
          const qty = sel[o.name] || 0;
          return (
            <div
              key={o.name}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => toggle(o.name)}
              onKeyDown={onKeyActivate(() => toggle(o.name))}
              className="cursor-pointer rounded-2xl transition-colors"
              style={{
                padding: '13px 14px',
                background: on ? 'var(--blue-mist)' : 'transparent',
                borderBottom: i < OPTIONS.length - 1 && !on ? '1px solid var(--line)' : '1px solid transparent',
                marginBottom: on ? 4 : 0,
              }}
            >
              <div className="flex items-center gap-3">
                {/* checkbox */}
                <motion.span
                  whileTap={{ scale: 0.85 }}
                  className="grid place-items-center shrink-0"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    border: on ? '1px solid var(--blue)' : '1.5px solid var(--line)',
                    background: on ? 'var(--blue)' : '#fff',
                  }}
                >
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2, ease: EASE }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>

                <span
                  className="flex-1 leading-snug"
                  style={{ fontSize: '0.9rem', color: on ? '#16243a' : '#33425a', fontWeight: on ? 600 : 500 }}
                >
                  {o.name}
                </span>

                <span
                  className="tabular-nums shrink-0"
                  style={{ fontSize: '0.9rem', color: 'var(--blue)', fontWeight: 600 }}
                >
                  {fmt(o.price)}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between pl-9">
                      <span style={{ fontSize: '0.78rem', color: '#5a6b82' }}>Quantité</span>
                      <Stepper
                        qty={qty}
                        onDec={() => setQty(o.name, qty - 1)}
                        onInc={() => setQty(o.name, qty + 1)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <TotalBar count={count} total={total} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   V7 — Chip / tag multi-toggle wrap. Selected chips expand to host a stepper.
   ────────────────────────────────────────────────────────────────────────── */
function V7() {
  const { sel, toggle, setQty, total, count } = useSelection();
  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: '#16243a', marginBottom: 4 }}>
        Parois & options
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 18 }}>
        Touchez les étiquettes — elles se déplient pour la quantité.
      </p>

      <div className="flex flex-wrap gap-2.5">
        {OPTIONS.map((o) => {
          const on = !!sel[o.name];
          const qty = sel[o.name] || 0;
          return (
            <motion.div
              key={o.name}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              layout
              onClick={() => toggle(o.name)}
              onKeyDown={onKeyActivate(() => toggle(o.name))}
              whileTap={{ scale: 0.97 }}
              transition={{ layout: { duration: 0.32, ease: EASE } }}
              className="cursor-pointer select-none inline-flex items-center gap-2"
              style={{
                padding: on ? '7px 8px 7px 13px' : '9px 14px',
                borderRadius: 9999,
                border: on ? '1px solid var(--blue)' : '1px solid var(--line)',
                background: on ? 'var(--blue-soft)' : '#fff',
                color: on ? 'var(--blue-deep, #0052a3)' : '#33425a',
                fontSize: '0.85rem',
                fontWeight: on ? 600 : 500,
                boxShadow: on ? '0 1px 0 rgba(0,102,204,0.06)' : 'none',
              }}
            >
              <motion.span layout="position" className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 16, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="grid place-items-center overflow-hidden"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} style={{ color: 'var(--blue)' }} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {o.name}
                <span className="tabular-nums" style={{ color: on ? 'var(--blue)' : '#8493a8' }}>
                  {' · '}{fmt(o.price)}
                </span>
              </motion.span>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.span
                    layout
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden inline-flex"
                  >
                    <Stepper
                      qty={qty}
                      tone="solid"
                      onDec={() => setQty(o.name, qty - 1)}
                      onInc={() => setQty(o.name, qty + 1)}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <TotalBar count={count} total={total} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   V8 — 2-col compact grid of small cards with icon. Stepper docks at the
        card foot when selected.
   ────────────────────────────────────────────────────────────────────────── */
function V8() {
  const { sel, toggle, setQty, total, count } = useSelection();
  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: '#16243a', marginBottom: 4 }}>
        Sélecteur de parois
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 18 }}>
        Grille compacte — sélectionnez puis ajustez la quantité.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((o, i) => {
          const on = !!sel[o.name];
          const qty = sel[o.name] || 0;
          const Icon = iconFor(i);
          const last = i === OPTIONS.length - 1;
          const odd = OPTIONS.length % 2 === 1;
          return (
            <motion.div
              key={o.name}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              layout
              onClick={() => toggle(o.name)}
              onKeyDown={onKeyActivate(() => toggle(o.name))}
              whileTap={{ scale: 0.98 }}
              transition={{ layout: { duration: 0.3, ease: EASE } }}
              className={`cursor-pointer flex flex-col ${last && odd ? 'col-span-2' : ''}`}
              style={{
                padding: 14,
                borderRadius: 18,
                border: on ? '1.5px solid var(--blue)' : '1px solid var(--line)',
                background: on ? 'var(--blue-mist)' : '#fff',
                transition: 'border-color .2s, background .2s',
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="grid place-items-center shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 11,
                    background: on ? 'var(--blue)' : 'var(--blue-soft)',
                  }}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} style={{ color: on ? '#fff' : 'var(--blue)' }} />
                </span>
                <motion.span
                  className="grid place-items-center shrink-0"
                  animate={{ scale: on ? 1 : 0.6, opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  style={{ width: 20, height: 20, borderRadius: 9999, background: 'var(--blue)' }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.span>
              </div>

              <span
                className="leading-snug mt-3"
                style={{ fontSize: '0.84rem', fontWeight: on ? 600 : 500, color: on ? '#16243a' : '#33425a' }}
              >
                {o.name}
              </span>
              <span className="tabular-nums mt-1" style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--blue)' }}>
                {fmt(o.price)}
              </span>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between pt-3"
                      style={{ borderTop: '1px solid var(--line)' }}
                    >
                      <span style={{ fontSize: '0.74rem', color: '#5a6b82' }}>Qté</span>
                      <Stepper
                        qty={qty}
                        onDec={() => setQty(o.name, qty - 1)}
                        onInc={() => setQty(o.name, qty + 1)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <TotalBar count={count} total={total} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   V9 — Refined table-like list with hover, leading icon, qty column reveals
        when the row is active.
   ────────────────────────────────────────────────────────────────────────── */
function V9() {
  const { sel, toggle, setQty, total, count } = useSelection();
  const [hover, setHover] = useState(null);
  return (
    <div>
      <div className="flex items-end justify-between mb-1">
        <h3 className="font-display" style={{ fontSize: '1.15rem', color: '#16243a' }}>
          Options de parois
        </h3>
        <span className="tabular-nums" style={{ fontSize: '0.72rem', color: '#8493a8', letterSpacing: '0.04em' }}>
          PRIX / UNITÉ
        </span>
      </div>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 14 }}>
        Liste épurée — survolez puis cliquez pour activer.
      </p>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
        {OPTIONS.map((o, i) => {
          const on = !!sel[o.name];
          const qty = sel[o.name] || 0;
          const Icon = iconFor(i);
          const isHover = hover === o.name;
          return (
            <div
              key={o.name}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => toggle(o.name)}
              onKeyDown={onKeyActivate(() => toggle(o.name))}
              onMouseEnter={() => setHover(o.name)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer flex items-center gap-3 transition-colors"
              style={{
                padding: '12px 14px',
                background: on ? 'var(--blue-mist)' : isHover ? 'var(--blue-mist)' : '#fff',
                borderTop: i === 0 ? 'none' : '1px solid var(--line)',
              }}
            >
              {/* active rail */}
              <motion.span
                aria-hidden
                animate={{ scaleY: on ? 1 : 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{
                  width: 3,
                  height: 30,
                  borderRadius: 9999,
                  background: 'var(--blue)',
                  transformOrigin: 'center',
                  marginLeft: -4,
                }}
              />
              <span
                className="grid place-items-center shrink-0 transition-colors"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: on ? 'var(--blue)' : 'var(--blue-soft)',
                }}
              >
                <Icon className="w-4 h-4" strokeWidth={2} style={{ color: on ? '#fff' : 'var(--blue)' }} />
              </span>

              <span
                className="flex-1 leading-snug"
                style={{ fontSize: '0.88rem', fontWeight: on ? 600 : 500, color: on ? '#16243a' : '#33425a' }}
              >
                {o.name}
              </span>

              <AnimatePresence mode="wait" initial={false}>
                {on ? (
                  <motion.div
                    key="stepper"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="shrink-0"
                  >
                    <Stepper
                      qty={qty}
                      onDec={() => setQty(o.name, qty - 1)}
                      onInc={() => setQty(o.name, qty + 1)}
                    />
                  </motion.div>
                ) : (
                  <motion.span
                    key="price"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="tabular-nums shrink-0"
                    style={{ fontSize: '0.88rem', fontWeight: 600, color: isHover ? 'var(--blue)' : '#5a6b82' }}
                  >
                    {fmt(o.price)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <TotalBar count={count} total={total} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   V10 — Accordion / segmented grouping. Options split into "Parois pleines"
         and "Parois vitrées / spéciales"; one group open at a time.
   ────────────────────────────────────────────────────────────────────────── */
function V10() {
  const { sel, toggle, setQty, total, count } = useSelection();

  const groups = [
    { id: 'plein', label: 'Parois pleines', items: OPTIONS.filter((o) => !/fenêtre/i.test(o.name)) },
    { id: 'special', label: 'Vitrées & spéciales', items: OPTIONS.filter((o) => /fenêtre/i.test(o.name)) },
  ];
  const [open, setOpen] = useState('plein');

  const groupCount = (items) => items.filter((o) => sel[o.name]).length;

  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: '#16243a', marginBottom: 4 }}>
        Configurateur de parois
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 16 }}>
        Regroupé par type — dépliez une section pour choisir.
      </p>

      <div className="flex flex-col gap-3">
        {groups.map((g) => {
          const isOpen = open === g.id;
          const gc = groupCount(g.items);
          return (
            <div
              key={g.id}
              className="rounded-2xl overflow-hidden"
              style={{
                border: isOpen ? '1.5px solid var(--blue)' : '1px solid var(--line)',
                transition: 'border-color .25s',
              }}
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => setOpen(isOpen ? null : g.id)}
                aria-expanded={isOpen}
                className="w-full cursor-pointer flex items-center gap-3"
                style={{
                  padding: '13px 15px',
                  background: isOpen ? 'var(--blue-soft)' : '#fff',
                  textAlign: 'left',
                }}
              >
                <Square className="w-4 h-4" strokeWidth={2} style={{ color: 'var(--blue)' }} />
                <span
                  className="flex-1 font-display"
                  style={{ fontSize: '0.95rem', color: '#16243a' }}
                >
                  {g.label}
                </span>
                {gc > 0 && (
                  <span
                    className="tabular-nums grid place-items-center"
                    style={{
                      minWidth: 22, height: 22, padding: '0 7px',
                      borderRadius: 9999, background: 'var(--blue)', color: '#fff',
                      fontSize: '0.72rem', fontWeight: 700,
                    }}
                  >
                    {gc}
                  </span>
                )}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="grid place-items-center"
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5} style={{ color: 'var(--blue)' }} />
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div style={{ borderTop: '1px solid var(--line)' }}>
                      {g.items.map((o, i) => {
                        const on = !!sel[o.name];
                        const qty = sel[o.name] || 0;
                        return (
                          <div
                            key={o.name}
                            role="button"
                            tabIndex={0}
                            aria-pressed={on}
                            onClick={() => toggle(o.name)}
                            onKeyDown={onKeyActivate(() => toggle(o.name))}
                            className="cursor-pointer flex items-center gap-3 transition-colors"
                            style={{
                              padding: '11px 15px',
                              background: on ? 'var(--blue-mist)' : '#fff',
                              borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                            }}
                          >
                            <motion.span
                              whileTap={{ scale: 0.85 }}
                              className="grid place-items-center shrink-0"
                              style={{
                                width: 20, height: 20, borderRadius: 7,
                                border: on ? '1px solid var(--blue)' : '1.5px solid var(--line)',
                                background: on ? 'var(--blue)' : '#fff',
                              }}
                            >
                              <AnimatePresence>
                                {on && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.2, ease: EASE }}
                                  >
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.span>
                            <span
                              className="flex-1 leading-snug"
                              style={{ fontSize: '0.85rem', fontWeight: on ? 600 : 500, color: on ? '#16243a' : '#33425a' }}
                            >
                              {o.name}
                            </span>

                            <AnimatePresence mode="wait" initial={false}>
                              {on ? (
                                <motion.div
                                  key="st"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  transition={{ duration: 0.2, ease: EASE }}
                                  className="shrink-0"
                                >
                                  <Stepper
                                    qty={qty}
                                    onDec={() => setQty(o.name, qty - 1)}
                                    onInc={() => setQty(o.name, qty + 1)}
                                  />
                                </motion.div>
                              ) : (
                                <motion.span
                                  key="pr"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="tabular-nums shrink-0"
                                  style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue)' }}
                                >
                                  {fmt(o.price)}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <TotalBar count={count} total={total} />
    </div>
  );
}

export const variants = [
  { n: 6, label: 'Checklist prix', note: 'Cases à cocher, prix à droite, quantité en ligne au clic', Component: V6 },
  { n: 7, label: 'Étiquettes', note: 'Chips multi-toggle qui se déplient pour la quantité', Component: V7 },
  { n: 8, label: 'Grille 2 colonnes', note: 'Petites cartes compactes avec icône et stepper en pied', Component: V8 },
  { n: 9, label: 'Liste tableau', note: 'Lignes type tableau, hover discret, colonne quantité', Component: V9 },
  { n: 10, label: 'Accordéon groupé', note: 'Sections pleines / vitrées, une ouverte à la fois', Component: V10 },
];
