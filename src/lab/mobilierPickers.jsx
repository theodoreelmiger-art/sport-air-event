import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Plus,
  Minus,
  Sofa,
  Armchair,
  Package,
  Grid3x3,
  Layers,
  Eye,
  Tag,
  ChevronRight,
} from 'lucide-react';
import { MOBILIER, fmt } from './data.js';

/* ----------------------------------------------------------------------------
   Shared helpers — image blending, stepper, totals
   Every preview image MUST blend (multiply + feather mask) so the white render
   background dissolves into the card; no box/drop shadow on images.
---------------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL || '/';
const IMG = (p) => BASE + p;

const FEATHER_MASK =
  'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)';

// Inline style block applied to every preview <img>.
const blendStyle = {
  mixBlendMode: 'multiply',
  WebkitMaskImage: FEATHER_MASK,
  maskImage: FEATHER_MASK,
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

const keyActivate = (fn) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fn();
  }
};

// Compact qty stepper — only ever rendered inside a *selected* item.
function Stepper({ qty, dec, inc, tone = 'mist' }) {
  const solid = tone === 'solid';
  const btn =
    'h-7 w-7 flex items-center justify-center rounded-full cursor-pointer select-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
  const skin = solid
    ? 'bg-white text-[var(--blue)] hover:bg-[var(--blue-soft)]'
    : 'bg-[var(--blue-soft)] text-[var(--blue)] hover:bg-white border border-[var(--line)]';
  return (
    <div
      className={
        'inline-flex items-center gap-1 rounded-full p-1 ' +
        (solid ? 'bg-white/20' : 'bg-white border border-[var(--line)]')
      }
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        aria-label="Diminuer la quantité"
        disabled={qty <= 0}
        onClick={dec}
        className={btn + ' ' + skin}
      >
        <Minus size={14} strokeWidth={2.6} />
      </motion.button>
      <span
        className={
          'min-w-[1.5rem] text-center font-display text-sm font-semibold tabular-nums ' +
          (solid ? 'text-white' : 'text-[var(--blue-deep)]')
        }
      >
        {qty}
      </span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        aria-label="Augmenter la quantité"
        onClick={inc}
        className={btn + ' ' + skin}
      >
        <Plus size={14} strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}

// Per-category glyph so list/grid rows read as furniture without extra art.
function CatIcon({ cat, size = 16, ...rest }) {
  if (cat === 'Tables') return <Layers size={size} strokeWidth={2.2} {...rest} />;
  if (cat === 'Bars') return <Package size={size} strokeWidth={2.2} {...rest} />;
  if (cat === 'Assises')
    return <Armchair size={size} strokeWidth={2.2} {...rest} />;
  return <Sofa size={size} strokeWidth={2.2} {...rest} />;
}

// Shared hook: quantities map keyed by item index + derived total / count.
function useCart(initial = {}) {
  const [qty, setQty] = useState(initial);
  const set = (i, n) =>
    setQty((q) => {
      const v = Math.max(0, n);
      const next = { ...q };
      if (v === 0) delete next[i];
      else next[i] = v;
      return next;
    });
  const inc = (i) => set(i, (qty[i] || 0) + 1);
  const dec = (i) => set(i, (qty[i] || 0) - 1);
  const total = useMemo(
    () =>
      Object.entries(qty).reduce(
        (s, [i, n]) => s + MOBILIER[i].price * n,
        0
      ),
    [qty]
  );
  const count = useMemo(
    () => Object.values(qty).reduce((s, n) => s + n, 0),
    [qty]
  );
  return { qty, set, inc, dec, total, count };
}

// Running-total footer bar shared by several variants.
function TotalBar({ total, count, tone = 'deep' }) {
  const deep = tone === 'deep';
  return (
    <motion.div
      layout
      className={
        'mt-4 flex items-center justify-between rounded-2xl px-4 py-3 ' +
        (deep
          ? 'bg-[var(--blue)] text-white'
          : 'bg-[var(--blue-mist)] text-[var(--blue-deep)] border border-[var(--line)]')
      }
    >
      <span
        className={
          'text-[0.8rem] font-medium ' +
          (deep ? 'text-white/80' : 'text-[var(--blue)]/70')
        }
      >
        {count} article{count > 1 ? 's' : ''} sélectionné{count > 1 ? 's' : ''}
      </span>
      <span className="font-display text-xl font-bold tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={total}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="inline-block"
          >
            {fmt(total)}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.div>
  );
}

// The big preview image stage (square-ish), with cross-fade on change.
function PreviewStage({ index, hovered, label, sub, rounded = '[22px]' }) {
  const shown = hovered != null ? hovered : index;
  const item = MOBILIER[shown];
  return (
    <div
      className={
        'relative w-full overflow-hidden rounded-' +
        rounded +
        ' border border-[var(--line)]'
      }
      style={{
        aspectRatio: '4 / 3',
        background:
          'radial-gradient(110% 95% at 50% 32%, var(--blue-soft) 0%, var(--blue-mist) 50%, #ffffff 82%)',
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={item.img}
          src={IMG(item.img)}
          alt={item.name}
          loading="eager"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={blendStyle}
        />
      </AnimatePresence>

      {(label || sub) && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl bg-white/85 px-3 py-1.5 ring-1 ring-[var(--line)] backdrop-blur-[2px]"
            >
              <div className="font-display text-sm font-semibold text-[var(--blue-deep)]">
                {item.name}
              </div>
              {sub && (
                <div className="text-[0.72rem] font-semibold text-[var(--blue)]">
                  {fmt(item.price)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

const CATS = ['Assises', 'Tables', 'Bars'];

/* ============================================================================
   #81 — Category tabs + grid + live preview image
============================================================================ */
function V81() {
  const cart = useCart({ 2: 1 });
  const [cat, setCat] = useState('Assises');
  const [active, setActive] = useState(2); // index into MOBILIER for preview
  const [hover, setHover] = useState(null);

  const rows = MOBILIER.map((m, i) => ({ ...m, i })).filter(
    (m) => m.cat === cat
  );

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2 text-[var(--blue)]">
        <Grid3x3 size={16} strokeWidth={2.4} />
        <span className="kicker !text-[0.66rem]">Composez votre mobilier</span>
      </div>

      <PreviewStage index={active} hovered={hover} label sub />

      {/* Category tabs */}
      <div className="mt-4 flex rounded-full border border-[var(--line)] bg-[var(--blue-mist)] p-1">
        {CATS.map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className="relative z-10 flex-1 cursor-pointer rounded-full px-2 py-2 text-center"
            >
              {on && (
                <motion.span
                  layoutId="v81-tab"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-[var(--line)]"
                />
              )}
              <span
                className={
                  'font-display text-sm font-semibold transition-colors ' +
                  (on ? 'text-[var(--blue-deep)]' : 'text-[var(--blue)]/55')
                }
              >
                {c}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of items for the active category */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {rows.map((m) => {
          const on = active === m.i;
          const q = cart.qty[m.i] || 0;
          return (
            <motion.div
              key={m.i}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => setActive(m.i)}
              onKeyDown={keyActivate(() => setActive(m.i))}
              onMouseEnter={() => setHover(m.i)}
              onMouseLeave={() => setHover(null)}
              whileTap={{ scale: 0.98 }}
              className={
                'relative cursor-pointer rounded-2xl border p-3 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)] ring-1 ring-[var(--blue)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    'flex h-7 w-7 items-center justify-center rounded-lg ' +
                    (on
                      ? 'bg-[var(--blue)] text-white'
                      : 'bg-[var(--blue-mist)] text-[var(--blue)]')
                  }
                >
                  <CatIcon cat={m.cat} size={15} />
                </span>
                {q > 0 && (
                  <span className="ml-auto rounded-full bg-[var(--blue)] px-1.5 text-[0.62rem] font-bold text-white tabular-nums">
                    ×{q}
                  </span>
                )}
              </div>
              <div className="mt-2 font-display text-[0.82rem] font-semibold leading-tight text-[var(--blue-deep)]">
                {m.name}
              </div>
              <div className="mt-0.5 text-[0.72rem] font-semibold text-[var(--blue)]">
                {fmt(m.price)}
              </div>

              <div className="mt-2">
                {on ? (
                  <Stepper
                    qty={q}
                    dec={() => cart.dec(m.i)}
                    inc={() => cart.inc(m.i)}
                  />
                ) : (
                  <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-[var(--blue)]/55">
                    Voir l'aperçu <ChevronRight size={12} strokeWidth={2.6} />
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <TotalBar total={cart.total} count={cart.count} />
    </div>
  );
}

/* ============================================================================
   #82 — List + sticky preview (preview pinned at top, scroll-feel list below)
============================================================================ */
function V82() {
  const cart = useCart({ 4: 1 });
  const [active, setActive] = useState(4);
  const [hover, setHover] = useState(null);

  return (
    <div className="w-full">
      <div className="mb-3 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Mobilier gonflable
      </div>

      {/* Sticky-style preview header */}
      <div className="sticky top-2 z-10">
        <PreviewStage index={active} hovered={hover} label />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {MOBILIER.map((m, i) => {
          const on = active === i;
          const q = cart.qty[i] || 0;
          return (
            <motion.div
              key={i}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => setActive(i)}
              onKeyDown={keyActivate(() => setActive(i))}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              whileTap={{ scale: 0.99 }}
              className={
                'flex cursor-pointer items-center gap-3 rounded-2xl border p-2.5 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              {/* thumbnail */}
              <div
                className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)]"
                style={{ background: 'var(--blue-mist)' }}
              >
                <img
                  src={IMG(m.img)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain p-1 pointer-events-none select-none"
                  style={blendStyle}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-display text-[0.9rem] font-semibold leading-tight text-[var(--blue-deep)]">
                  {m.name}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[0.72rem] text-[var(--blue)]/60">
                  <CatIcon cat={m.cat} size={12} />
                  {m.cat}
                </div>
              </div>

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
                      <Stepper
                        qty={q}
                        dec={() => cart.dec(i)}
                        inc={() => cart.inc(i)}
                      />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="price"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-display text-[0.9rem] font-bold text-[var(--blue)]"
                    >
                      {fmt(m.price)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <TotalBar total={cart.total} count={cart.count} />
    </div>
  );
}

/* ============================================================================
   #83 — Gallery thumbnails (filmstrip) drive a single hero preview
============================================================================ */
function V83() {
  const cart = useCart({ 0: 2 });
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const item = MOBILIER[active];
  const q = cart.qty[active] || 0;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--blue)]">
          <Eye size={16} strokeWidth={2.4} />
          <span className="kicker !text-[0.66rem]">Galerie mobilier</span>
        </div>
        <span className="text-[0.72rem] font-medium text-[var(--blue)]/55">
          {active + 1}/{MOBILIER.length}
        </span>
      </div>

      <PreviewStage index={active} hovered={hover} />

      {/* Selected item detail + stepper */}
      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white p-3">
        <div className="min-w-0">
          <div className="font-display text-[0.95rem] font-semibold leading-tight text-[var(--blue-deep)]">
            {item.name}
          </div>
          <div className="mt-0.5 font-display text-lg font-bold text-[var(--blue)]">
            {fmt(item.price)}
          </div>
        </div>
        <Stepper
          qty={q}
          dec={() => cart.dec(active)}
          inc={() => cart.inc(active)}
        />
      </div>

      {/* Thumbnail filmstrip */}
      <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {MOBILIER.map((m, i) => {
          const on = active === i;
          const qi = cart.qty[i] || 0;
          return (
            <motion.button
              key={i}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              whileTap={{ scale: 0.94 }}
              className={
                'relative h-14 w-14 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-colors ' +
                (on
                  ? 'border-[var(--blue)]'
                  : 'border-[var(--line)] hover:border-[var(--blue)]/50')
              }
              style={{ background: 'var(--blue-mist)' }}
            >
              <img
                src={IMG(m.img)}
                alt={m.name}
                className="absolute inset-0 h-full w-full object-contain p-1 pointer-events-none select-none"
                style={blendStyle}
              />
              {qi > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--blue)] px-1 text-[0.6rem] font-bold text-white tabular-nums">
                  {qi}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <TotalBar total={cart.total} count={cart.count} />
    </div>
  );
}

/* ============================================================================
   #84 — Big preview + chip list (chips select; selected chip gets stepper)
============================================================================ */
function V84() {
  const cart = useCart({ 5: 1 });
  const [active, setActive] = useState(5);
  const [hover, setHover] = useState(null);
  const item = MOBILIER[active];
  const q = cart.qty[active] || 0;

  return (
    <div className="w-full">
      <div className="mb-3 font-display text-[1.05rem] font-semibold text-[var(--blue-deep)]">
        Aperçu en direct
      </div>

      <PreviewStage index={active} hovered={hover} />

      {/* Active line: name + price + stepper */}
      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-[var(--blue-mist)] px-4 py-2.5 ring-1 ring-[var(--line)]">
        <div className="flex items-center gap-2 text-[var(--blue-deep)]">
          <Tag size={14} strokeWidth={2.4} className="text-[var(--blue)]" />
          <AnimatePresence mode="wait">
            <motion.span
              key={item.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="font-display text-[0.9rem] font-semibold"
            >
              {item.name} · {fmt(item.price)}
            </motion.span>
          </AnimatePresence>
        </div>
        <Stepper
          qty={q}
          dec={() => cart.dec(active)}
          inc={() => cart.inc(active)}
        />
      </div>

      {/* Chip list */}
      <div className="mt-3 flex flex-wrap gap-2">
        {MOBILIER.map((m, i) => {
          const on = active === i;
          const qi = cart.qty[i] || 0;
          return (
            <motion.button
              key={i}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              whileTap={{ scale: 0.94 }}
              className={
                'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 font-display text-[0.78rem] font-semibold transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue)] text-white'
                  : 'border-[var(--line)] bg-white text-[var(--blue-deep)] hover:border-[var(--blue)]/50 hover:bg-[var(--blue-mist)]')
              }
            >
              <CatIcon cat={m.cat} size={13} />
              {m.name}
              {qi > 0 && (
                <span
                  className={
                    'rounded-full px-1.5 text-[0.62rem] font-bold tabular-nums ' +
                    (on
                      ? 'bg-white/25 text-white'
                      : 'bg-[var(--blue)] text-white')
                  }
                >
                  {qi}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <TotalBar total={cart.total} count={cart.count} />
    </div>
  );
}

/* ============================================================================
   #85 — Cart-style (preview + add-to-cart rows, animated cart summary)
============================================================================ */
function V85() {
  const cart = useCart({ 6: 1, 4: 2 });
  const [active, setActive] = useState(6);
  const [hover, setHover] = useState(null);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2 text-[var(--blue)]">
        <Package size={16} strokeWidth={2.4} />
        <span className="kicker !text-[0.66rem]">Votre sélection</span>
      </div>

      <PreviewStage index={active} hovered={hover} label sub />

      <div className="mt-3 flex flex-col gap-2">
        {MOBILIER.map((m, i) => {
          const on = active === i;
          const q = cart.qty[i] || 0;
          const inCart = q > 0;
          return (
            <motion.div
              key={i}
              layout
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => setActive(i)}
              onKeyDown={keyActivate(() => setActive(i))}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={
                'flex cursor-pointer items-center gap-3 rounded-2xl border p-2.5 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)]'
                  : inCart
                  ? 'border-[var(--blue)]/30 bg-[var(--blue-mist)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              <span
                className={
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ' +
                  (inCart
                    ? 'bg-[var(--blue)] text-white'
                    : 'bg-[var(--blue-mist)] text-[var(--blue)]')
                }
              >
                {inCart ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <CatIcon cat={m.cat} size={16} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="font-display text-[0.88rem] font-semibold leading-tight text-[var(--blue-deep)]">
                  {m.name}
                </div>
                <div className="mt-0.5 text-[0.74rem] font-semibold text-[var(--blue)]">
                  {fmt(m.price)}
                  {inCart && (
                    <span className="ml-1 text-[var(--blue)]/55">
                      · {fmt(m.price * q)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                {inCart ? (
                  <Stepper
                    qty={q}
                    dec={() => cart.dec(i)}
                    inc={() => cart.inc(i)}
                  />
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cart.inc(i);
                      setActive(i);
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--blue)] bg-white px-3 py-1.5 text-[0.74rem] font-semibold text-[var(--blue)] transition-colors hover:bg-[var(--blue-soft)] cursor-pointer"
                  >
                    <Plus size={13} strokeWidth={2.8} />
                    Ajouter
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cart summary panel (deep blue) */}
      <motion.div
        layout
        className="mt-4 overflow-hidden rounded-[22px] bg-[var(--blue)] p-4 text-white"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[0.82rem] font-medium text-white/85">
            <Package size={15} strokeWidth={2.3} />
            Panier
          </span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.72rem] font-semibold tabular-nums">
            {cart.count} art.
          </span>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <span className="text-[0.74rem] text-white/70">Total estimé</span>
          <span className="font-display text-2xl font-bold tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={cart.total}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="inline-block"
              >
                {fmt(cart.total)}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================================
   #86 — Masonry tiles (varied heights) + floating preview overlay
============================================================================ */
function V86() {
  const cart = useCart({ 3: 1 });
  const [active, setActive] = useState(3);
  const [hover, setHover] = useState(null);
  const shown = hover != null ? hover : active;
  const item = MOBILIER[shown];

  // Deterministic "masonry" row spans so tiles feel staggered.
  const spans = [44, 60, 52, 64, 48, 56, 60];

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--blue)]">
          <Layers size={16} strokeWidth={2.4} />
          <span className="kicker !text-[0.66rem]">Mur de mobilier</span>
        </div>
      </div>

      {/* Floating preview overlay */}
      <div
        className="relative w-full overflow-hidden rounded-[22px] border border-[var(--line)]"
        style={{
          aspectRatio: '16 / 9',
          background:
            'radial-gradient(110% 120% at 50% 28%, var(--blue-soft) 0%, var(--blue-mist) 52%, #ffffff 84%)',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={item.img}
            src={IMG(item.img)}
            alt={item.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-[88%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
            style={blendStyle}
          />
        </AnimatePresence>
        <div className="absolute left-3 top-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.18 }}
              className="rounded-xl bg-white/85 px-3 py-1.5 ring-1 ring-[var(--line)] backdrop-blur-[2px]"
            >
              <div className="font-display text-sm font-semibold text-[var(--blue-deep)]">
                {item.name}
              </div>
              <div className="text-[0.72rem] font-semibold text-[var(--blue)]">
                {fmt(item.price)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Masonry-ish grid */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {MOBILIER.map((m, i) => {
          const on = active === i;
          const q = cart.qty[i] || 0;
          return (
            <motion.div
              key={i}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => setActive(i)}
              onKeyDown={keyActivate(() => setActive(i))}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              whileTap={{ scale: 0.97 }}
              className={
                'relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border p-2 transition-colors ' +
                (on
                  ? 'border-[var(--blue)] bg-[var(--blue-soft)] ring-1 ring-[var(--blue)]'
                  : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40')
              }
            >
              <div
                className="relative w-full overflow-hidden rounded-xl"
                style={{ height: spans[i], background: 'var(--blue-mist)' }}
              >
                <img
                  src={IMG(m.img)}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full object-contain p-1 pointer-events-none select-none"
                  style={blendStyle}
                />
                {q > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--blue)] px-1 text-[0.58rem] font-bold text-white tabular-nums">
                    {q}
                  </span>
                )}
                <AnimatePresence>
                  {on && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                      className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--blue)] text-white"
                    >
                      <Check size={10} strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-1.5 truncate font-display text-[0.7rem] font-semibold text-[var(--blue-deep)]">
                {m.name}
              </div>

              {on ? (
                <div className="mt-1">
                  <Stepper
                    qty={q}
                    dec={() => cart.dec(i)}
                    inc={() => cart.inc(i)}
                  />
                </div>
              ) : (
                <div className="mt-0.5 text-[0.66rem] font-semibold text-[var(--blue)]">
                  {fmt(m.price)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <TotalBar total={cart.total} count={cart.count} />
    </div>
  );
}

/* ============================================================================
   Export
============================================================================ */
export const variants = [
  {
    n: 81,
    label: 'Onglets + grille',
    note: 'Onglets par catégorie, grille et aperçu image en direct',
    Component: V81,
  },
  {
    n: 82,
    label: 'Liste + aperçu collant',
    note: 'Aperçu épinglé en haut, liste de mobilier en dessous',
    Component: V82,
  },
  {
    n: 83,
    label: 'Galerie miniatures',
    note: "Filmstrip de vignettes qui pilote un grand aperçu",
    Component: V83,
  },
  {
    n: 84,
    label: 'Grand aperçu + chips',
    note: 'Aperçu large, liste de pastilles, qté sur le choix actif',
    Component: V84,
  },
  {
    n: 85,
    label: 'Style panier',
    note: 'Lignes « ajouter au panier » avec récap animé',
    Component: V85,
  },
  {
    n: 86,
    label: 'Masonry + overlay',
    note: 'Tuiles en mosaïque avec aperçu flottant superposé',
    Component: V86,
  },
];
