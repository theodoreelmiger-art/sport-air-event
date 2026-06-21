import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Minus,
  Plus,
  ArrowRight,
  Check,
  Package,
  Tag,
  ShieldCheck,
  Sparkles,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { EXAMPLE_TOTAL, fmt, PRODUCT_IMAGE, PRODUCT_NAME } from './data.js';

/* ================================================================== *
 * priceWidgets2.jsx — variants #112 to #115
 * Four FRESH price summaries, distinct from #11-14.
 * Shared helpers below are intentionally re-implemented with new
 * styling so each file stands alone.
 * ================================================================== */

/* Animated "odometer" price — the whole formatted value slides up
 * when it changes. Transform/opacity only. */
function RollPrice({ value, className, style }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', ...style }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '0.7em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.7em', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 540, damping: 38 }}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {fmt(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Compact pill-shaped stepper. Real <button> elements so it is safe to
 * place inside clickable role="button" cards. */
function PillStepper({ qty, setQty, tone = 'blue', min = 1, max = 30 }) {
  const light = tone === 'light';
  const border = light ? 'rgba(255,255,255,.5)' : 'var(--line)';
  const ico = light ? '#fff' : 'var(--blue)';
  const txt = light ? '#fff' : 'var(--ink)';
  const btn = {
    width: 32,
    height: 32,
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid ' + border,
    background: light ? 'rgba(255,255,255,.16)' : '#fff',
    color: ico,
    cursor: 'pointer',
  };
  const dec = (e) => {
    e.stopPropagation();
    setQty(Math.max(min, qty - 1));
  };
  const inc = (e) => {
    e.stopPropagation();
    setQty(Math.min(max, qty + 1));
  };
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: 3,
        borderRadius: 999,
        border: '1px solid ' + border,
        background: light ? 'rgba(255,255,255,.08)' : 'var(--blue-mist)',
      }}
    >
      <motion.button
        type="button"
        aria-label="Diminuer la quantité"
        whileTap={{ scale: 0.86 }}
        onClick={dec}
        style={{ ...btn, opacity: qty <= min ? 0.42 : 1 }}
      >
        <Minus size={14} strokeWidth={2.6} />
      </motion.button>
      <span
        className="font-display"
        style={{
          minWidth: 22,
          textAlign: 'center',
          fontSize: 15.5,
          fontWeight: 700,
          color: txt,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {qty}
      </span>
      <motion.button
        type="button"
        aria-label="Augmenter la quantité"
        whileTap={{ scale: 0.86 }}
        onClick={inc}
        style={btn}
      >
        <Plus size={14} strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}

const IMG_MASK =
  'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)';

/* ================================================================== *
 * V112 — Sélecteur de pack (Solo / Duo / Pro)
 * Three pack presets that scale the quantity; a savings badge appears
 * on bulk packs. Deep-blue total footer with white CTA.
 * ================================================================== */
function V112() {
  const PACKS = [
    { key: 'solo', label: 'Solo', units: 1, off: 0, sub: '1 structure' },
    { key: 'duo', label: 'Duo', units: 2, off: 0.05, sub: '2 structures' },
    { key: 'pro', label: 'Pro', units: 4, off: 0.12, sub: '4 structures' },
  ];
  const [sel, setSel] = useState('duo');
  const pack = PACKS.find((p) => p.key === sel);
  const gross = EXAMPLE_TOTAL * pack.units;
  const total = Math.round(gross * (1 - pack.off));
  const saved = gross - total;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 16px 36px -24px rgba(11,28,63,.26)',
        }}
      >
        <div style={{ padding: '18px 18px 4px' }}>
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
            <Package size={13} strokeWidth={2.4} />
            Choisissez votre pack
          </div>
        </div>

        {/* segmented pack picker */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            padding: '12px 18px 6px',
          }}
        >
          {PACKS.map((p) => {
            const active = p.key === sel;
            return (
              <motion.button
                key={p.key}
                type="button"
                onClick={() => setSel(p.key)}
                whileTap={{ scale: 0.96 }}
                animate={{
                  borderColor: active ? 'var(--blue)' : 'var(--line)',
                  backgroundColor: active ? 'var(--blue-soft)' : '#fff',
                }}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: 16,
                  border: '1.5px solid var(--line)',
                  padding: '13px 8px 12px',
                  textAlign: 'center',
                }}
              >
                {p.off > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -9,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: '#fff',
                      background: 'var(--blue)',
                      borderRadius: 999,
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    -{Math.round(p.off * 100)}%
                  </span>
                )}
                <div
                  className="font-display"
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: active ? 'var(--blue-deep)' : 'var(--ink)',
                  }}
                >
                  {p.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-2)', opacity: 0.85, marginTop: 1 }}>
                  {p.sub}
                </div>
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                      style={{
                        position: 'absolute',
                        top: 7,
                        right: 7,
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        background: 'var(--blue)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* savings line */}
        <div style={{ padding: '8px 18px 4px', minHeight: 26 }}>
          <AnimatePresence mode="wait">
            {saved > 0 ? (
              <motion.div
                key="save"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: 'var(--blue-deep)',
                  background: 'var(--blue-mist)',
                  borderRadius: 999,
                  padding: '5px 12px',
                }}
              >
                <TrendingUp size={13} strokeWidth={2.4} />
                Vous économisez {fmt(saved)}
              </motion.div>
            ) : (
              <motion.div
                key="nosave"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: 12.5, color: 'var(--ink-2)', opacity: 0.8 }}
              >
                Tarif unitaire standard
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* deep-blue total footer */}
        <div
          style={{
            margin: '12px 14px 14px',
            borderRadius: 18,
            padding: '16px 18px 18px',
            color: '#fff',
            background:
              'linear-gradient(135deg, var(--blue-bright) 0%, var(--blue) 50%, var(--blue-deep) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div
                style={{
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  opacity: 0.85,
                }}
              >
                Total HT
              </div>
              <RollPrice
                value={total}
                className="font-display"
                style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.05, marginTop: 2 }}
              />
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, opacity: 0.85, paddingBottom: 4 }}>
              {pack.units} unité{pack.units > 1 ? 's' : ''}
            </div>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            style={{
              marginTop: 14,
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 13,
              padding: '13px 18px',
              background: '#fff',
              color: 'var(--blue-deep)',
              fontWeight: 700,
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
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

/* ================================================================== *
 * V113 — Cartes de format (radio) + stepper sur la sélection
 * Pick a tent format; unit price changes; the qty stepper appears ONLY
 * on the selected format card. Total recalculates live.
 * ================================================================== */
function V113() {
  const FORMATS = [
    { key: '3x3', name: '3×3 m', sub: '300×300×300 cm', price: 1180 },
    { key: '4x4', name: '4×4 m', sub: '400×400×400 cm', price: 1490, popular: true },
    { key: '5x5', name: '5×5 m', sub: '500×500×500 cm', price: 1790 },
  ];
  const [sel, setSel] = useState('4x4');
  const [qty, setQty] = useState(1);
  const fmtSel = FORMATS.find((f) => f.key === sel);
  const total = fmtSel.price * qty;

  const onKey = (e, key) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(key);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: '#fff',
          padding: '18px 16px 18px',
          boxShadow: '0 16px 36px -24px rgba(11,28,63,.26)',
        }}
      >
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
            marginBottom: 12,
          }}
        >
          <Layers size={13} strokeWidth={2.4} />
          Format de la tente
        </div>

        <div style={{ display: 'grid', gap: 9 }}>
          {FORMATS.map((f) => {
            const active = f.key === sel;
            return (
              <motion.div
                key={f.key}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => setSel(f.key)}
                onKeyDown={(e) => onKey(e, f.key)}
                whileTap={{ scale: 0.99 }}
                animate={{
                  borderColor: active ? 'var(--blue)' : 'var(--line)',
                  backgroundColor: active ? 'var(--blue-mist)' : '#fff',
                }}
                style={{
                  cursor: 'pointer',
                  borderRadius: 16,
                  border: '1.5px solid var(--line)',
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
                    {/* radio dot */}
                    <span
                      style={{
                        width: 19,
                        height: 19,
                        borderRadius: 999,
                        border: '2px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 540, damping: 26 }}
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: 999,
                              background: 'var(--blue)',
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          className="font-display"
                          style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)' }}
                        >
                          {f.name}
                        </span>
                        {f.popular && (
                          <span
                            style={{
                              fontSize: 9.5,
                              fontWeight: 700,
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              color: 'var(--blue-deep)',
                              background: 'var(--blue-soft)',
                              borderRadius: 999,
                              padding: '2px 8px',
                            }}
                          >
                            Populaire
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-2)', opacity: 0.82 }}>
                        {f.sub}
                      </div>
                    </div>
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: active ? 'var(--blue-deep)' : 'var(--ink)',
                      whiteSpace: 'nowrap',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {fmt(f.price)}
                  </div>
                </div>

                {/* stepper ONLY on the selected card */}
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: '1px solid var(--line)',
                        }}
                      >
                        <span style={{ fontSize: 12.5, color: 'var(--ink-2)', fontWeight: 600 }}>
                          Quantité
                        </span>
                        <PillStepper qty={qty} setQty={setQty} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* total + CTA */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--ink-2)',
            }}
          >
            Total HT
          </div>
          <RollPrice
            value={total}
            className="font-display"
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          />
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ filter: 'brightness(1.06)' }}
          style={{
            marginTop: 14,
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
          }}
        >
          <FileText size={17} strokeWidth={2.2} />
          Demander un devis
          <ArrowRight size={17} strokeWidth={2.4} />
        </motion.button>
      </div>
    </div>
  );
}

/* ================================================================== *
 * V114 — Aperçu produit + total, options en interrupteurs
 * Split layout: a blended product image on the left, the live total on
 * the right with toggle add-ons. Quantity stepper under the total.
 * ================================================================== */
function V114() {
  const [qty, setQty] = useState(1);
  const ADDONS = [
    { key: 'walls', label: 'Pack 4 parois', price: 640, icon: Tag },
    { key: 'warranty', label: 'Extension garantie', price: 120, icon: ShieldCheck },
  ];
  const [on, setOn] = useState({ walls: true, warranty: false });
  const toggle = (k) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const addonSum = ADDONS.reduce((s, a) => s + (on[a.key] ? a.price : 0), 0);
  const total = EXAMPLE_TOTAL * qty + addonSum;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 16px 36px -24px rgba(11,28,63,.26)',
        }}
      >
        {/* top: image preview + headline price */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'stretch',
            flexWrap: 'wrap',
          }}
        >
          {/* image panel */}
          <div
            style={{
              flex: '1 1 170px',
              minWidth: 150,
              background: 'var(--blue-mist)',
              padding: '14px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              src={PRODUCT_IMAGE}
              alt={PRODUCT_NAME}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                maxWidth: 190,
                height: 'auto',
                mixBlendMode: 'multiply',
                WebkitMaskImage: IMG_MASK,
                maskImage: IMG_MASK,
                clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
              }}
            />
          </div>

          {/* price block */}
          <div
            style={{
              flex: '1 1 200px',
              minWidth: 180,
              padding: '18px 18px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--blue)',
              }}
            >
              {PRODUCT_NAME}
            </div>
            <RollPrice
              value={total}
              className="font-display"
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1,
                marginTop: 6,
                fontVariantNumeric: 'tabular-nums',
              }}
            />
            <div style={{ marginTop: 12 }}>
              <PillStepper qty={qty} setQty={setQty} />
            </div>
          </div>
        </div>

        {/* add-on toggles */}
        <div style={{ padding: '4px 16px 6px' }}>
          <div className="hairline" style={{ marginBottom: 10 }} />
          {ADDONS.map((a) => {
            const active = on[a.key];
            const Icon = a.icon;
            return (
              <div
                key={a.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '9px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      background: active ? 'var(--blue-soft)' : 'var(--blue-mist)',
                      color: 'var(--blue)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>
                      {a.label}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-2)', opacity: 0.82 }}>
                      + {fmt(a.price)}
                    </div>
                  </div>
                </div>

                {/* switch */}
                <motion.button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  aria-label={a.label}
                  onClick={() => toggle(a.key)}
                  whileTap={{ scale: 0.94 }}
                  animate={{ backgroundColor: active ? 'var(--blue)' : '#dbe6f5' }}
                  style={{
                    width: 46,
                    height: 27,
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 3,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: active ? 'flex-end' : 'flex-start',
                    flexShrink: 0,
                  }}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 600, damping: 34 }}
                    style={{
                      width: 21,
                      height: 21,
                      borderRadius: 999,
                      background: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {active && <Check size={12} strokeWidth={3} style={{ color: 'var(--blue)' }} />}
                  </motion.span>
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ padding: '8px 16px 16px' }}>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            style={{
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

/* ================================================================== *
 * V115 — Barre de composition animée
 * The total is visualised as a single horizontal stacked bar whose
 * segments grow with framer-motion as options are toggled and quantity
 * changes. Deep-blue CTA panel at the foot.
 * ================================================================== */
function V115() {
  const [qty, setQty] = useState(2);
  const base = EXAMPLE_TOTAL * qty;

  const OPTS = [
    { key: 'print', label: 'Impression 360°', price: 340, color: 'var(--blue-bright)' },
    { key: 'led', label: 'Éclairage LED', price: 220, color: 'var(--blue)' },
  ];
  const [on, setOn] = useState({ print: true, led: false });
  const toggle = (k) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const segments = [
    { key: 'base', label: PRODUCT_NAME, price: base, color: 'var(--blue-deep)' },
    ...OPTS.filter((o) => on[o.key]),
  ];
  const total = segments.reduce((s, x) => s + x.price, 0);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          borderRadius: 22,
          border: '1px solid var(--line)',
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 16px 36px -24px rgba(11,28,63,.26)',
        }}
      >
        <div style={{ padding: '18px 18px 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}
          >
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
              <Sparkles size={13} strokeWidth={2.4} />
              Composition
            </div>
            <PillStepper qty={qty} setQty={setQty} />
          </div>

          {/* stacked bar */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 16,
              borderRadius: 999,
              overflow: 'hidden',
              marginTop: 16,
              background: 'var(--blue-mist)',
            }}
          >
            {segments.map((s) => (
              <motion.div
                key={s.key}
                layout
                initial={{ flexGrow: 0, opacity: 0 }}
                animate={{ flexGrow: s.price, opacity: 1 }}
                exit={{ flexGrow: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 240, damping: 32 }}
                style={{
                  flexBasis: 0,
                  background: s.color,
                  minWidth: 6,
                  borderRight: '2px solid #fff',
                }}
              />
            ))}
          </div>

          {/* legend rows */}
          <div style={{ marginTop: 14 }}>
            {segments.map((s) => (
              <div
                key={s.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '6px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 4,
                      background: s.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 600 }}>
                    {s.label}
                  </span>
                </div>
                <span
                  className="font-display"
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--ink-2)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {fmt(s.price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* option toggles */}
        <div style={{ padding: '6px 18px 14px' }}>
          <div className="hairline" style={{ margin: '8px 0 12px' }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {OPTS.map((o) => {
              const active = on[o.key];
              return (
                <motion.button
                  key={o.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(o.key)}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    borderColor: active ? 'var(--blue)' : 'var(--line)',
                    backgroundColor: active ? 'var(--blue-soft)' : '#fff',
                  }}
                  style={{
                    flex: '1 1 140px',
                    cursor: 'pointer',
                    borderRadius: 13,
                    border: '1.5px solid var(--line)',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: active ? 'var(--blue-deep)' : 'var(--ink)',
                      textAlign: 'left',
                    }}
                  >
                    {o.label}
                    <span
                      style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 500,
                        color: 'var(--ink-2)',
                        opacity: 0.82,
                      }}
                    >
                      + {fmt(o.price)}
                    </span>
                  </span>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      flexShrink: 0,
                      border: '1.5px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
                      background: active ? 'var(--blue)' : '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 540, damping: 26 }}
                          style={{ display: 'inline-flex' }}
                        >
                          <Check size={13} strokeWidth={3} style={{ color: '#fff' }} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* deep-blue total + CTA */}
        <div
          style={{
            background:
              'linear-gradient(135deg, var(--blue-deep) 0%, var(--blue) 100%)',
            padding: '16px 18px 18px',
            color: '#fff',
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
            <span
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                opacity: 0.85,
              }}
            >
              Total HT
            </span>
            <RollPrice
              value={total}
              className="font-display"
              style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}
            />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            style={{
              marginTop: 14,
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 13,
              padding: '13px 18px',
              background: '#fff',
              color: 'var(--blue-deep)',
              fontWeight: 700,
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
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
    n: 112,
    label: 'Sélecteur de pack',
    note: 'Packs Solo / Duo / Pro avec remise et économie affichée.',
    Component: V112,
  },
  {
    n: 113,
    label: 'Cartes de format',
    note: 'Formats radio, stepper sur la carte sélectionnée uniquement.',
    Component: V113,
  },
  {
    n: 114,
    label: 'Aperçu + options',
    note: 'Image produit fondue, total live et add-ons en interrupteurs.',
    Component: V114,
  },
  {
    n: 115,
    label: 'Barre de composition',
    note: 'Total visualisé en barre empilée animée, options à cocher.',
    Component: V115,
  },
];
