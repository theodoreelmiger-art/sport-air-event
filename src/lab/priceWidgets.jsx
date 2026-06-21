import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Minus, Plus, ArrowRight, Check, Tag, Sparkles } from 'lucide-react';
import { EXAMPLE_TOTAL, fmt } from './data.js';

/* ------------------------------------------------------------------ *
 * Small shared helper: an animated "price roll" number.
 * The whole formatted value swaps with a vertical slide whenever it
 * changes — gives the tactile "odometer" feel without per-digit logic.
 * ------------------------------------------------------------------ */
function RollingPrice({ value, className, style }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', ...style }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '0.65em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.65em', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 36 }}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {fmt(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Reusable +/- quantity stepper. Buttons are real <button> elements so
 * each variant can drop it inside a plain container (never a card-button). */
function Stepper({ qty, setQty, tone = 'blue', min = 1, max = 20 }) {
  const isLight = tone === 'light';
  const btnBase = {
    width: 34,
    height: 34,
    borderRadius: 11,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid ' + (isLight ? 'rgba(255,255,255,.45)' : 'var(--line)'),
    background: isLight ? 'rgba(255,255,255,.14)' : '#fff',
    color: isLight ? '#fff' : 'var(--blue)',
    cursor: 'pointer',
  };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <motion.button
        type="button"
        aria-label="Diminuer la quantité"
        whileTap={{ scale: 0.88 }}
        whileHover={{ borderColor: isLight ? '#fff' : 'var(--blue)' }}
        onClick={() => setQty(Math.max(min, qty - 1))}
        style={{ ...btnBase, opacity: qty <= min ? 0.45 : 1 }}
      >
        <Minus size={15} strokeWidth={2.4} />
      </motion.button>
      <span
        className="font-display"
        style={{
          minWidth: 26,
          textAlign: 'center',
          fontSize: 17,
          fontWeight: 700,
          color: isLight ? '#fff' : 'var(--ink)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {qty}
      </span>
      <motion.button
        type="button"
        aria-label="Augmenter la quantité"
        whileTap={{ scale: 0.88 }}
        whileHover={{ borderColor: isLight ? '#fff' : 'var(--blue)' }}
        onClick={() => setQty(Math.min(max, qty + 1))}
        style={btnBase}
      >
        <Plus size={15} strokeWidth={2.4} />
      </motion.button>
    </div>
  );
}

/* ================================================================== *
 * V11 — Deep-blue gradient bar
 * A bold, sticky-feeling banner. Price + qty stepper on a rich blue
 * gradient, with a white CTA that pops against it.
 * ================================================================== */
function V11() {
  const [qty, setQty] = useState(1);
  const total = EXAMPLE_TOTAL * qty;

  return (
    <div style={{ width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          borderRadius: 22,
          padding: '20px 20px 22px',
          color: '#fff',
          background:
            'linear-gradient(135deg, var(--blue-bright) 0%, var(--blue) 45%, var(--blue-deep) 100%)',
          boxShadow: '0 18px 40px -18px rgba(0,82,163,.55)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* soft light orb for depth */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,.22), transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                opacity: 0.85,
              }}
            >
              Prix HT
            </div>
            <RollingPrice
              value={total}
              className="font-display"
              style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.05, marginTop: 2 }}
            />
            <div style={{ fontSize: 12.5, opacity: 0.8, marginTop: 2 }}>
              soit {fmt(EXAMPLE_TOTAL)} / unité
            </div>
          </div>
          <div style={{ paddingTop: 4 }}>
            <Stepper qty={qty} setQty={setQty} tone="light" />
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -1 }}
          style={{
            marginTop: 18,
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 14,
            padding: '14px 18px',
            background: '#fff',
            color: 'var(--blue-deep)',
            fontWeight: 700,
            fontSize: 15,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            boxShadow: '0 8px 18px -8px rgba(0,0,0,.25)',
          }}
        >
          <FileText size={17} strokeWidth={2.2} />
          Demander un devis
          <ArrowRight size={17} strokeWidth={2.4} />
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ================================================================== *
 * V12 — Clean white card, big number + breakdown line
 * Airy, editorial. Huge tabular total, a single breakdown row, and a
 * filled-blue CTA. Quantity adjusts inline.
 * ================================================================== */
function V12() {
  const [qty, setQty] = useState(2);
  const unit = EXAMPLE_TOTAL;
  const total = unit * qty;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: '#fff',
          padding: '22px 22px 24px',
          boxShadow: '0 14px 34px -22px rgba(11,28,63,.22)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--blue)',
            }}
          >
            Prix HT
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--ink-2)',
              background: 'var(--blue-soft)',
              borderRadius: 999,
              padding: '4px 11px',
              fontWeight: 600,
            }}
          >
            Estimation
          </span>
        </div>

        <RollingPrice
          value={total}
          className="font-display"
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1,
            marginTop: 8,
            fontVariantNumeric: 'tabular-nums',
          }}
        />

        <div className="hairline" style={{ margin: '18px 0 14px' }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>
            {fmt(unit)} <span style={{ opacity: 0.6 }}>×</span>{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{qty} unité{qty > 1 ? 's' : ''}</span>
          </div>
          <Stepper qty={qty} setQty={setQty} />
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ filter: 'brightness(1.06)' }}
          style={{
            marginTop: 20,
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 14,
            padding: '14px 18px',
            background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            boxShadow: '0 12px 26px -12px rgba(0,82,163,.55)',
          }}
        >
          <FileText size={17} strokeWidth={2.2} />
          Demander un devis
        </motion.button>
      </div>
    </div>
  );
}

/* ================================================================== *
 * V13 — Minimal sticky pill
 * Ultra-compact, full-rounded bar built to live pinned to a viewport
 * edge. Price on the left, qty + a tight CTA pill on the right.
 * ================================================================== */
function V13() {
  const [qty, setQty] = useState(1);
  const total = EXAMPLE_TOTAL * qty;

  return (
    <div style={{ width: '100%', paddingTop: 4, paddingBottom: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          borderRadius: 999,
          border: '1px solid var(--line)',
          background: '#fff',
          padding: '10px 12px 10px 20px',
          boxShadow: '0 12px 30px -16px rgba(11,28,63,.30)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, minWidth: 0 }}>
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--blue)',
            }}
          >
            Prix HT
          </span>
          <RollingPrice
            value={total}
            className="font-display"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--ink)',
              fontVariantNumeric: 'tabular-nums',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Stepper qty={qty} setQty={setQty} />
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ filter: 'brightness(1.07)' }}
            style={{
              border: 'none',
              cursor: 'pointer',
              borderRadius: 999,
              padding: '11px 18px',
              background: 'var(--blue)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 18px -8px rgba(0,82,163,.6)',
            }}
          >
            <FileText size={15} strokeWidth={2.3} />
            Devis
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================== *
 * V14 — Price + small line-item recap
 * The most "receipt" of the set. Itemised lines (qty-driven), a tinted
 * subtotal block, and a full-width CTA. Removing items can't drop the
 * base tent below 1.
 * ================================================================== */
function V14() {
  const [qty, setQty] = useState(1);
  const [walls, setWalls] = useState(2);

  const tentLine = EXAMPLE_TOTAL * qty;
  const WALL_PRICE = 170;
  const wallLine = WALL_PRICE * walls;
  const total = tentLine + wallLine;

  const rows = [
    { label: 'Tente Spider', sub: 'Structure + impression', amount: tentLine, qty, setQty, min: 1 },
    { label: 'Parois imprimées', sub: fmt(WALL_PRICE) + ' / paroi', amount: wallLine, qty: walls, setQty: setWalls, min: 0 },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 14px 34px -22px rgba(11,28,63,.22)',
        }}
      >
        <div style={{ padding: '18px 20px 6px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--blue)',
            }}
          >
            <Tag size={13} strokeWidth={2.4} />
            Récapitulatif
          </div>
        </div>

        <div style={{ padding: '6px 20px 4px' }}>
          {rows.map((r, i) => (
            <div key={r.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '12px 0',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14.5 }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', opacity: 0.8 }}>{r.sub}</div>
                  <div style={{ marginTop: 8 }}>
                    <Stepper qty={r.qty} setQty={r.setQty} min={r.min} />
                  </div>
                </div>
                <RollingPrice
                  value={r.amount}
                  className="font-display"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                />
              </div>
              {i < rows.length - 1 && <div className="hairline" />}
            </div>
          ))}
        </div>

        {/* tinted subtotal + CTA block */}
        <div
          style={{
            background: 'var(--blue-mist)',
            borderTop: '1px solid var(--line)',
            padding: '16px 20px 18px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--ink-2)',
              }}
            >
              <Sparkles size={14} strokeWidth={2.2} style={{ color: 'var(--blue)' }} />
              Total HT
            </div>
            <RollingPrice
              value={total}
              className="font-display"
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--blue-deep)',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            style={{
              marginTop: 16,
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 14,
              padding: '14px 18px',
              background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
              boxShadow: '0 12px 26px -12px rgba(0,82,163,.55)',
            }}
          >
            <FileText size={17} strokeWidth={2.2} />
            Demander un devis
            <ArrowRight size={17} strokeWidth={2.4} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 11,
    label: 'Barre dégradé bleu',
    note: 'Bandeau audacieux en dégradé profond, CTA blanc contrasté.',
    Component: V11,
  },
  {
    n: 12,
    label: 'Carte blanche XL',
    note: 'Carte épurée, très grand chiffre et ligne de détail unique.',
    Component: V12,
  },
  {
    n: 13,
    label: 'Pilule sticky',
    note: 'Barre arrondie ultra-compacte, pensée pour rester épinglée.',
    Component: V13,
  },
  {
    n: 14,
    label: 'Récap par lignes',
    note: 'Mini-récapitulatif type reçu avec sous-total bleu tinté.',
    Component: V14,
  },
];
