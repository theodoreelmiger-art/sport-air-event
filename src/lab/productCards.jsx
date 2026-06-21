import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, ArrowLeft, Check, Plus, Minus, Star, Ruler, Clock, Layers,
  Sparkles, Eye, ChevronRight, ChevronLeft, Tag, Package,
} from 'lucide-react';
import { PRODUCTS } from './data.js';

/* Resolve product images against the (possibly sub-path) base URL. */
const BASE = import.meta.env.BASE_URL || '/';
const SRC = (p) => BASE + p;

/* Shared image blend: multiply so the white render dissolves into the card,
   a radial feather mask so no hard edge reads as a rectangle, a right-edge
   crop to kill the faint vertical seam — and never any box/drop shadow. */
const FEATHER =
  'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)';
const IMG_STYLE = {
  mixBlendMode: 'multiply',
  WebkitMaskImage: FEATHER,
  maskImage: FEATHER,
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

/* Framed treatment: show the REAL photo (no multiply blend → no color tint),
   keep the soft feathered radial mask so edges dissolve instead of reading as
   a hard square, and the same right-edge crop. No box/drop shadow. */
const FRAME_STYLE = {
  WebkitMaskImage: FEATHER,
  maskImage: FEATHER,
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

const SPRING = { type: 'spring', stiffness: 420, damping: 34 };
const EASE = [0.22, 1, 0.36, 1];

/* Tiny icon set keyed to spec position, purely decorative. */
const SPEC_ICONS = [Ruler, Clock, Layers];

/* Reusable +/- stepper — real <button>s, only ever rendered for the
   selected product so a clickable card never nests buttons inside a button. */
function Stepper({ qty, setQty, tone = 'blue' }) {
  const light = tone === 'light';
  const base = {
    width: 30, height: 30, borderRadius: 9,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid ' + (light ? 'rgba(255,255,255,.5)' : 'var(--line)'),
    background: light ? 'rgba(255,255,255,.16)' : '#fff',
    color: light ? '#fff' : 'var(--blue)', cursor: 'pointer',
  };
  return (
    <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <motion.button
        type="button" aria-label="Diminuer la quantité"
        whileTap={{ scale: 0.86 }}
        onClick={() => setQty(Math.max(1, qty - 1))}
        style={{ ...base, opacity: qty <= 1 ? 0.45 : 1 }}
      >
        <Minus size={14} strokeWidth={2.6} />
      </motion.button>
      <span
        className="font-display font-bold tabular-nums text-center"
        style={{ minWidth: 22, color: light ? '#fff' : 'var(--ink)' }}
      >
        {qty}
      </span>
      <motion.button
        type="button" aria-label="Augmenter la quantité"
        whileTap={{ scale: 0.86 }}
        onClick={() => setQty(Math.min(9, qty + 1))}
        style={base}
      >
        <Plus size={14} strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}

function Kicker({ children, light }) {
  return (
    <span
      className="kicker"
      style={{ color: light ? 'rgba(255,255,255,.85)' : 'var(--blue)', fontSize: '0.66rem' }}
    >
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   V36 — CLASSIC CARD GRID. Three stacked classic cards (image panel on top,
   content below). Click to select; the selected card lifts, gets a blue ring
   and reveals a qty stepper. Découvrir CTA slides its arrow on hover.
   ════════════════════════════════════════════════════════════════════════ */
function V36() {
  const [sel, setSel] = useState(PRODUCTS[1].n);
  const [qty, setQty] = useState({});
  const setQ = (n, v) => setQty((m) => ({ ...m, [n]: v }));

  return (
    <div className="w-full">
      <div className="mb-4">
        <Kicker>Catalogue</Kicker>
        <h3 className="font-display text-xl font-bold text-ink leading-tight mt-1">
          Nos structures gonflables
        </h3>
      </div>

      <div className="grid gap-3.5">
        {PRODUCTS.map((p) => {
          const active = sel === p.n;
          const q = qty[p.n] || 1;
          return (
            <motion.div
              key={p.n}
              role="button" tabIndex={0} aria-pressed={active}
              onClick={() => setSel(p.n)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(p.n); } }}
              animate={{ y: active ? -3 : 0 }}
              whileTap={{ scale: 0.992 }}
              transition={SPRING}
              className="relative cursor-pointer overflow-hidden rounded-2xl outline-none"
              style={{
                background: '#fff',
                border: '1px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
                boxShadow: active ? '0 0 0 3px var(--blue-soft)' : 'none',
              }}
            >
              <div className="flex gap-3 p-3">
                {/* image panel */}
                <div
                  className="relative shrink-0 overflow-hidden rounded-xl"
                  style={{ width: 104, height: 92, background: 'radial-gradient(110% 100% at 50% 28%, var(--blue-soft), #fff 80%)' }}
                >
                  <motion.img
                    src={SRC(p.img)} alt={p.alt} loading="lazy"
                    className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                    style={IMG_STYLE}
                    animate={{ scale: active ? 1.06 : 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  {p.popular && (
                    <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
                      <Star className="w-2.5 h-2.5 fill-current" /> Top
                    </span>
                  )}
                </div>

                {/* content */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <Kicker>{p.kicker}</Kicker>
                  <div className="font-display text-base font-bold text-ink leading-tight mt-0.5">{p.title}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.specs.map((s) => (
                      <span key={s} className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: 'var(--blue-mist)', color: 'var(--ink-2)' }}>{s}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <span className="font-display text-sm font-bold" style={{ color: 'var(--blue)' }}>{p.price}</span>
                    <motion.span
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--blue)' }}
                      whileHover={{ x: 2 }}
                    >
                      Découvrir <ArrowRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    style={{ overflow: 'hidden', borderTop: '1px solid var(--line)' }}
                  >
                    <div className="flex items-center justify-between px-3 py-2.5" style={{ background: 'var(--blue-mist)' }}>
                      <span className="text-xs font-medium" style={{ color: 'var(--ink-2)' }}>Quantité</span>
                      <Stepper qty={q} setQty={(v) => setQ(p.n, v)} />
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

/* ════════════════════════════════════════════════════════════════════════
   V37 — ALTERNATING ROWS (zig-zag). Image and text swap sides per row.
   Selecting a row tints it, draws a blue accent bar and reveals a stepper.
   ════════════════════════════════════════════════════════════════════════ */
function V37() {
  const [sel, setSel] = useState(PRODUCTS[0].n);
  const [qty, setQty] = useState({});
  const setQ = (n, v) => setQty((m) => ({ ...m, [n]: v }));

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4" style={{ color: 'var(--blue)' }} />
        <Kicker>Sélection 2026</Kicker>
      </div>

      <div className="grid gap-2.5">
        {PRODUCTS.map((p, i) => {
          const active = sel === p.n;
          const flip = i % 2 === 1;
          const q = qty[p.n] || 1;
          return (
            <motion.div
              key={p.n}
              role="button" tabIndex={0} aria-pressed={active}
              onClick={() => setSel(p.n)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(p.n); } }}
              whileTap={{ scale: 0.993 }}
              transition={SPRING}
              className="relative cursor-pointer overflow-hidden rounded-2xl outline-none"
              style={{
                background: active ? 'var(--blue-mist)' : '#fff',
                border: '1px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
              }}
            >
              {/* left accent bar grows when active */}
              <motion.div
                className="absolute left-0 top-0 bottom-0"
                style={{ width: 4, background: 'var(--blue)', borderRadius: 4 }}
                initial={false}
                animate={{ scaleY: active ? 1 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <div className={'flex items-stretch ' + (flip ? 'flex-row-reverse' : '')}>
                <div
                  className="relative shrink-0 self-stretch overflow-hidden"
                  style={{ width: 128, background: 'radial-gradient(120% 100% at 50% 30%, var(--blue-soft), #fff 82%)' }}
                >
                  <motion.img
                    src={SRC(p.img)} alt={p.alt} loading="lazy"
                    className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                    style={IMG_STYLE}
                    animate={{ scale: active ? 1.07 : 1, y: active ? -2 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-3">
                  <Kicker>{p.kicker}</Kicker>
                  <div className="font-display text-base font-bold text-ink leading-tight mt-0.5">{p.title}</div>
                  <p className="mt-1 text-[11px] leading-snug line-clamp-2" style={{ color: 'var(--muted)' }}>{p.desc}</p>
                  <div className="mt-auto flex items-center justify-between pt-2.5">
                    <span className="font-display text-sm font-bold" style={{ color: 'var(--blue)' }}>{p.price}</span>
                    {active ? (
                      <Stepper qty={q} setQty={(v) => setQ(p.n, v)} />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--blue)' }}>
                        Découvrir <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   V38 — OVERLAY ON IMAGE. A single large hero card that AUTO-SCROLLS through
   the products like a carousel (autoplay ~3.2s, paused on hover). The REAL
   photo shows on a soft light stage — no blue tint — cleanly framed with a
   feathered edge. Left/right arrows step prev/next; dots also switch product;
   kicker/title/specs/price sit on a bottom legibility wash.
   ════════════════════════════════════════════════════════════════════════ */
function V38() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const p = PRODUCTS[idx];

  const go = (next) => {
    setDir(next > idx || (idx === PRODUCTS.length - 1 && next === 0) ? 1 : -1);
    setIdx((next + PRODUCTS.length) % PRODUCTS.length);
  };
  const step = (delta) => {
    setDir(delta);
    setIdx((v) => (v + delta + PRODUCTS.length) % PRODUCTS.length);
  };

  /* autoplay carousel — advances every 3.2s, pauses on hover/focus */
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => {
      setDir(1);
      setIdx((v) => (v + 1) % PRODUCTS.length);
    }, 3200);
    return () => clearTimeout(t);
  }, [idx, paused]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Kicker>À la une</Kicker>
        <span className="text-[11px] font-medium tabular-nums" style={{ color: 'var(--muted)' }}>
          {String(idx + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[22px]"
        style={{
          aspectRatio: '4 / 5',
          background: 'linear-gradient(168deg, var(--blue-bright) 0%, var(--blue) 42%, var(--blue-deep) 100%)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* clean light stage so the real photo reads — soft feathered frame,
            no multiply blend → no blue tint on the product */}
        <div
          className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: '86%', height: '64%', background: 'radial-gradient(circle, #fff 38%, rgba(255,255,255,.55) 62%, transparent 78%)', filter: 'blur(6px)' }}
        />
        <AnimatePresence mode="popLayout" custom={dir}>
          <motion.img
            key={p.n}
            src={SRC(p.img)} alt={p.alt} loading="lazy"
            className="absolute left-1/2 top-[36%] w-[78%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
            style={FRAME_STYLE}
            custom={dir}
            initial={{ opacity: 0, x: dir * 48, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -48, scale: 0.94 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </AnimatePresence>

        {p.popular && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold" style={{ color: 'var(--blue)' }}>
            <Star className="w-3 h-3 fill-current" /> Best-seller
          </span>
        )}

        {/* prev / next arrows */}
        <motion.button
          type="button"
          aria-label="Produit précédent"
          onClick={() => step(-1)}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
          className="absolute left-3 top-[36%] -translate-y-1/2 z-10 inline-flex items-center justify-center rounded-full cursor-pointer"
          style={{ width: 38, height: 38, background: 'rgba(255,255,255,.92)', color: 'var(--blue)', border: '1px solid rgba(255,255,255,.6)' }}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.4} />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Produit suivant"
          onClick={() => step(1)}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}
          className="absolute right-3 top-[36%] -translate-y-1/2 z-10 inline-flex items-center justify-center rounded-full cursor-pointer"
          style={{ width: 38, height: 38, background: 'rgba(255,255,255,.92)', color: 'var(--blue)', border: '1px solid rgba(255,255,255,.6)' }}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.4} />
        </motion.button>

        {/* bottom legibility wash + overlay content */}
        <div className="absolute inset-x-0 bottom-0 h-[58%]" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,82,163,.9))' }} />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <Kicker light>{p.kicker}</Kicker>
              <div className="font-display text-2xl font-bold text-white leading-none mt-1">{p.title}</div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.specs.map((s, si) => {
                  const Ic = SPEC_ICONS[si % SPEC_ICONS.length];
                  return (
                    <span key={s} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-medium text-white">
                      <Ic className="w-3 h-3" /> {s}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3.5 flex items-center justify-between">
                <span className="font-display text-lg font-bold text-white">{p.price}</span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold cursor-pointer"
                  style={{ color: 'var(--blue-deep)' }}
                >
                  Découvrir <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* product dots */}
          <div className="mt-4 flex items-center gap-2">
            {PRODUCTS.map((q, qi) => (
              <button
                key={q.n}
                type="button"
                aria-label={'Voir ' + q.title}
                aria-pressed={qi === idx}
                onClick={() => go(qi)}
                className="cursor-pointer rounded-full transition-all"
                style={{
                  height: 6,
                  width: qi === idx ? 26 : 6,
                  background: qi === idx ? '#fff' : 'rgba(255,255,255,.45)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   V39 — BENTO. One large feature tile + smaller tiles in an asymmetric grid.
   Click any tile to make it the active feature (highlight + stepper).
   ════════════════════════════════════════════════════════════════════════ */
function V39() {
  const [sel, setSel] = useState(PRODUCTS[1].n);
  const [qty, setQty] = useState({});
  const setQ = (n, v) => setQty((m) => ({ ...m, [n]: v }));
  const lead = PRODUCTS.find((p) => p.n === sel) || PRODUCTS[0];
  const rest = PRODUCTS.filter((p) => p.n !== sel);
  const q = qty[lead.n] || 1;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <Package className="w-4 h-4" style={{ color: 'var(--blue)' }} />
        <Kicker>Gamme complète</Kicker>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: '1.55fr 1fr' }}>
        {/* large active tile spans both rows */}
        <motion.div
          layout
          role="button" tabIndex={0} aria-pressed
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); }}
          transition={SPRING}
          className="relative row-span-2 flex flex-col overflow-hidden rounded-2xl outline-none"
          style={{ background: '#fff', border: '1px solid var(--blue)', boxShadow: '0 0 0 3px var(--blue-soft)' }}
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '4 / 3', background: 'radial-gradient(110% 100% at 50% 26%, var(--blue-soft), #fff 82%)' }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={lead.n}
                src={SRC(lead.img)} alt={lead.alt} loading="lazy"
                className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                style={IMG_STYLE}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </AnimatePresence>
            {lead.popular && (
              <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
                <Star className="w-2.5 h-2.5 fill-current" /> Phare
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-3.5">
            <Kicker>{lead.kicker}</Kicker>
            <div className="font-display text-lg font-bold text-ink leading-tight mt-0.5">{lead.title}</div>
            <p className="mt-1 text-[11px] leading-snug" style={{ color: 'var(--muted)' }}>{lead.desc}</p>
            <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--line)' }}>
              <div>
                <div className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Quantité</div>
                <div className="mt-1"><Stepper qty={q} setQty={(v) => setQ(lead.n, v)} /></div>
              </div>
              <div className="text-right">
                <div className="font-display text-sm font-bold" style={{ color: 'var(--blue)' }}>{lead.price}</div>
                <motion.button
                  type="button"
                  whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                  style={{ color: 'var(--blue)' }}
                >
                  Découvrir <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* two small tiles */}
        {rest.map((p) => (
          <motion.div
            key={p.n}
            layout
            role="button" tabIndex={0} aria-pressed={false}
            onClick={() => setSel(p.n)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(p.n); } }}
            whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
            transition={SPRING}
            className="relative flex flex-col overflow-hidden rounded-2xl outline-none cursor-pointer"
            style={{ background: '#fff', border: '1px solid var(--line)' }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '5 / 4', background: 'radial-gradient(120% 100% at 50% 30%, var(--blue-soft), #fff 84%)' }}
            >
              <img
                src={SRC(p.img)} alt={p.alt} loading="lazy"
                className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                style={IMG_STYLE}
              />
            </div>
            <div className="flex flex-1 flex-col p-2.5">
              <div className="font-display text-[13px] font-bold text-ink leading-tight">{p.title}</div>
              <div className="mt-auto flex items-center justify-between pt-1.5">
                <span className="text-[11px] font-bold" style={{ color: 'var(--blue)' }}>{p.price}</span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--blue)' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   V40 — HORIZONTAL strips. Compact left-image / right-content rows with a
   prominent price block. Cards only link to product pages — no quantity —
   so selecting expands a spec strip with a Découvrir affordance. Images are
   cleanly framed (real photo, soft feathered edge, no shadow).
   ════════════════════════════════════════════════════════════════════════ */
function V40() {
  const [sel, setSel] = useState(PRODUCTS[2].n);

  return (
    <div className="w-full">
      <div className="mb-4">
        <Kicker>Comparatif rapide</Kicker>
        <h3 className="font-display text-xl font-bold text-ink leading-tight mt-1">Choisissez votre structure</h3>
      </div>

      <div className="grid gap-2.5">
        {PRODUCTS.map((p) => {
          const active = sel === p.n;
          return (
            <motion.div
              key={p.n}
              role="button" tabIndex={0} aria-pressed={active}
              onClick={() => setSel(p.n)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(p.n); } }}
              whileTap={{ scale: 0.993 }}
              transition={SPRING}
              className="relative overflow-hidden rounded-2xl outline-none cursor-pointer"
              style={{
                background: '#fff',
                border: '1px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
                boxShadow: active ? '0 0 0 3px var(--blue-soft)' : 'none',
              }}
            >
              <div className="flex items-center gap-3 p-2.5">
                <div
                  className="relative shrink-0 overflow-hidden rounded-xl"
                  style={{ width: 76, height: 76, background: 'radial-gradient(120% 100% at 50% 32%, var(--blue-soft), #fff 84%)' }}
                >
                  <motion.img
                    src={SRC(p.img)} alt={p.alt} loading="lazy"
                    className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                    style={FRAME_STYLE}
                    animate={{ scale: active ? 1.06 : 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Kicker>{p.kicker}</Kicker>
                  <div className="font-display text-[15px] font-bold text-ink leading-tight mt-0.5 flex items-center gap-1.5">
                    {p.title}
                    {p.popular && <Star className="w-3 h-3 fill-current" style={{ color: 'var(--blue)' }} />}
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: 'var(--muted)' }}>{p.specs[0]}</div>
                </div>

                {/* price block */}
                <div
                  className="shrink-0 self-stretch flex flex-col items-end justify-center rounded-xl px-3"
                  style={{ background: active ? 'var(--blue)' : 'var(--blue-mist)' }}
                >
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: active ? 'rgba(255,255,255,.8)' : 'var(--muted)' }}>Prix</span>
                  <span className="font-display text-sm font-bold leading-tight" style={{ color: active ? '#fff' : 'var(--blue)' }}>
                    {p.price.replace('Dès ', '')}
                  </span>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    style={{ overflow: 'hidden', borderTop: '1px solid var(--line)' }}
                  >
                    <div className="flex items-center justify-between gap-2 px-2.5 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {p.specs.map((s) => (
                          <span key={s} className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: 'var(--blue-mist)', color: 'var(--ink-2)' }}>{s}</span>
                        ))}
                      </div>
                      <motion.span
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
                        style={{ background: 'var(--blue)', color: '#fff' }}
                        whileHover={{ x: 2 }}
                      >
                        Découvrir <ArrowRight className="w-3.5 h-3.5" />
                      </motion.span>
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

/* ════════════════════════════════════════════════════════════════════════
   V41 — HOVER-REVEAL. Calm cards by default; on hover/focus a blue panel
   slides up from the bottom revealing specs + a Découvrir button. The tapped
   card is "pinned" open on touch, with a qty stepper in the revealed panel.
   ════════════════════════════════════════════════════════════════════════ */
function V41() {
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const [qty, setQty] = useState({});
  const setQ = (n, v) => setQty((m) => ({ ...m, [n]: v }));

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <Eye className="w-4 h-4" style={{ color: 'var(--blue)' }} />
        <Kicker>Survol pour découvrir</Kicker>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {PRODUCTS.map((p) => {
          const open = hover === p.n || pinned === p.n;
          const q = qty[p.n] || 1;
          return (
            <motion.div
              key={p.n}
              role="button" tabIndex={0} aria-pressed={pinned === p.n}
              onMouseEnter={() => setHover(p.n)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.n)}
              onBlur={() => setHover(null)}
              onClick={() => setPinned((v) => (v === p.n ? null : p.n))}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPinned((v) => (v === p.n ? null : p.n)); } }}
              whileTap={{ scale: 0.985 }}
              transition={SPRING}
              className="relative overflow-hidden rounded-2xl outline-none cursor-pointer"
              style={{
                background: '#fff',
                border: '1px solid ' + (open ? 'var(--blue)' : 'var(--line)'),
                minHeight: 210,
              }}
            >
              {/* base image + always-visible title/price */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '1 / 1', background: 'radial-gradient(120% 100% at 50% 28%, var(--blue-soft), #fff 84%)' }}
              >
                <motion.img
                  src={SRC(p.img)} alt={p.alt} loading="lazy"
                  className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                  style={IMG_STYLE}
                  animate={{ scale: open ? 1.08 : 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
                {p.popular && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
                    <Star className="w-2.5 h-2.5 fill-current" /> Top
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <div className="font-display text-[13px] font-bold text-ink leading-tight">{p.title}</div>
                <div className="mt-0.5 text-[11px] font-bold" style={{ color: 'var(--blue)' }}>{p.price}</div>
              </div>

              {/* reveal panel slides up from the bottom */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.34, ease: EASE }}
                    className="absolute inset-x-0 bottom-0 p-3"
                    style={{ background: 'linear-gradient(180deg, var(--blue) 0%, var(--blue-deep) 100%)' }}
                  >
                    <Kicker light>{p.kicker}</Kicker>
                    <div className="font-display text-sm font-bold text-white leading-tight mt-0.5">{p.title}</div>
                    <div className="mt-1.5 flex flex-col gap-1">
                      {p.specs.map((s, si) => {
                        const Ic = SPEC_ICONS[si % SPEC_ICONS.length];
                        return (
                          <span key={s} className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white/90">
                            <Ic className="w-3 h-3 shrink-0" /> {s}
                          </span>
                        );
                      })}
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <Stepper qty={q} setQty={(v) => setQ(p.n, v)} tone="light" />
                      <motion.button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-bold cursor-pointer"
                        style={{ color: 'var(--blue-deep)' }}
                      >
                        Voir <ArrowRight className="w-3 h-3" />
                      </motion.button>
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

export const variants = [
  { n: 36, label: 'Carte classique', note: 'Grille de cartes classiques (image + contenu), sélection avec anneau bleu et stepper', Component: V36 },
  { n: 37, label: 'Lignes alternées', note: 'Rangées en zig-zag image/texte, barre d’accent bleue et stepper sur la ligne active', Component: V37 },
  { n: 38, label: 'Overlay image', note: 'Grande carte héro plein cadre bleu, infos en surimpression et points de navigation', Component: V38 },
  { n: 39, label: 'Bento', note: 'Grille asymétrique : tuile vedette + petites tuiles cliquables qui prennent la vedette', Component: V39 },
  { n: 40, label: 'Horizontal', note: 'Bandeaux compacts image/contenu avec bloc prix, dépliage des specs + lien Découvrir', Component: V40 },
  { n: 41, label: 'Survol révélation', note: 'Cartes sobres ; au survol/clic un panneau bleu remonte avec specs et bouton Découvrir', Component: V41 },
];
