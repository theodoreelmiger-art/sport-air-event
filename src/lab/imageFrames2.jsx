import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Ruler, Eye, Layers, Palette, Frame } from 'lucide-react';
import { PRODUCT_IMAGE, PRODUCT_NAME, fmt } from './data.js';

/* Resolve the product image against the (possibly sub-path) base URL. */
const IMG = (import.meta.env.BASE_URL || '/') + PRODUCT_IMAGE;

/* Shared seamless-blend recipe (kept distinct from #22-25 by varying the
   mask geometry per-variant, but always: multiply blend, radial feather,
   ~2% right crop to kill the dark edge, NO box / drop shadow). */
const featherMask = (g) => ({
  WebkitMaskImage: g,
  maskImage: g,
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
  mixBlendMode: 'multiply',
});

const PRICE = 1490;

/* ────────────────────────────────────────────────────────────────────────
   V116 — Projecteur. A soft spotlight cone sweeps behind the product; the
   image dissolves into a near-white stage via a tight feather. Toggle the
   light on/off; selecting "spot" lifts the product a touch. NO shadow box.
   ──────────────────────────────────────────────────────────────────────── */
function V116() {
  const [lit, setLit] = useState(true);
  const mask = 'radial-gradient(125% 130% at 50% 50%, #000 58%, transparent 90%)';
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" style={{ color: 'var(--blue)' }} />
          <span className="kicker" style={{ color: 'var(--blue)' }}>Projecteur</span>
        </div>
        <button
          type="button"
          onClick={() => setLit((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold cursor-pointer transition-colors"
          style={{
            color: lit ? '#fff' : 'var(--blue)',
            background: lit ? 'var(--blue)' : 'var(--blue-mist)',
            border: '1px solid var(--line)',
          }}
        >
          <Sun className="w-3.5 h-3.5" /> {lit ? 'Lumière allumée' : 'Lumière éteinte'}
        </button>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[22px]"
        style={{
          aspectRatio: '1 / 1',
          background: 'linear-gradient(180deg, #ffffff 0%, var(--blue-mist) 100%)',
        }}
      >
        {/* sweeping spotlight cone — pure light, no edges */}
        <AnimatePresence>
          {lit && (
            <motion.div
              key="cone"
              className="absolute left-1/2 -top-[14%] -translate-x-1/2"
              style={{
                width: '74%',
                height: '108%',
                background:
                  'radial-gradient(60% 80% at 50% 8%, rgba(31,122,224,0.20) 0%, rgba(31,122,224,0.07) 40%, transparent 72%)',
                clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
                filter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: [-5, 5, -5] }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.5 }, rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
            />
          )}
        </AnimatePresence>

        {/* bright pool on the floor where the cone lands */}
        <AnimatePresence>
          {lit && (
            <motion.div
              key="pool"
              className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
              style={{
                bottom: '12%',
                width: '64%',
                height: '14%',
                background: 'radial-gradient(closest-side, rgba(255,255,255,0.9), transparent 78%)',
                filter: 'blur(6px)',
              }}
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.7 }}
              transition={{ duration: 0.45 }}
            />
          )}
        </AnimatePresence>

        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={featherMask(mask)}
          animate={{ y: lit ? -8 : 0, filter: lit ? 'brightness(1.02)' : 'brightness(0.97)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="absolute left-4 bottom-4">
          <div className="font-display text-base font-bold text-ink leading-tight">{PRODUCT_NAME}</div>
          <div className="text-xs" style={{ color: 'var(--blue)' }}>{fmt(PRICE)}</div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V117 — Plan technique. Image multiplies over a faint blue blueprint grid;
   toggle clean dimension annotations that animate in. Frameless, feathered.
   ──────────────────────────────────────────────────────────────────────── */
function V117() {
  const [dims, setDims] = useState(true);
  const mask = 'radial-gradient(135% 130% at 50% 46%, #000 56%, transparent 90%)';
  const grid =
    'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)';
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4" style={{ color: 'var(--blue)' }} />
          <span className="kicker" style={{ color: 'var(--blue)' }}>Plan technique</span>
        </div>
        <button
          type="button"
          onClick={() => setDims((v) => !v)}
          aria-pressed={dims}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold cursor-pointer transition-colors"
          style={{
            color: dims ? '#fff' : 'var(--blue)',
            background: dims ? 'var(--blue)' : 'var(--blue-mist)',
            border: '1px solid var(--line)',
          }}
        >
          <Ruler className="w-3.5 h-3.5" /> {dims ? 'Cotes affichées' : 'Cotes masquées'}
        </button>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[22px]"
        style={{ aspectRatio: '4 / 3', background: 'var(--blue-mist)' }}
      >
        {/* blueprint grid, feathered at the edges so it never reads as a box */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: grid,
            backgroundSize: '34px 34px',
            opacity: 0.7,
            WebkitMaskImage: 'radial-gradient(120% 120% at 50% 50%, #000 55%, transparent 92%)',
            maskImage: 'radial-gradient(120% 120% at 50% 50%, #000 55%, transparent 92%)',
          }}
        />

        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 top-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={featherMask(mask)}
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* dimension annotations — thin blue rules + chips */}
        <AnimatePresence>
          {dims && (
            <>
              <motion.div
                key="w"
                className="absolute left-[14%] right-[14%]"
                style={{ bottom: '11%', height: 1, background: 'var(--blue)' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                key="wchip"
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold"
                style={{ bottom: '7.5%', color: 'var(--blue)', border: '1px solid var(--line)' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                400 cm
              </motion.div>
              <motion.div
                key="h"
                className="absolute top-[14%] bottom-[20%]"
                style={{ right: '9%', width: 1, background: 'var(--blue)' }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                key="hchip"
                className="absolute rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold"
                style={{ right: '3%', top: '44%', color: 'var(--blue)', border: '1px solid var(--line)' }}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                400 cm
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-medium"
          style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}
        >
          <Frame className="w-3.5 h-3.5" /> {PRODUCT_NAME}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V118 — Galerie / cadrages. Selectable framing dots cross-fade the SAME
   render at different crop scales; selected dot highlighted. Frameless blend.
   ──────────────────────────────────────────────────────────────────────── */
function V118() {
  const views = [
    { id: 0, label: 'Plan large', scale: 0.74, y: 0 },
    { id: 1, label: 'Plan moyen', scale: 0.92, y: 2 },
    { id: 2, label: 'Détail haut', scale: 1.18, y: 14 },
  ];
  const [sel, setSel] = useState(1);
  const view = views[sel];
  const mask = 'radial-gradient(120% 120% at 50% 48%, #000 60%, transparent 90%)';
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4" style={{ color: 'var(--blue)' }} />
        <span className="kicker" style={{ color: 'var(--blue)' }}>Cadrages</span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[22px]"
        style={{
          aspectRatio: '1 / 1',
          background: 'radial-gradient(115% 100% at 50% 35%, #ffffff 0%, var(--blue-soft) 70%, var(--blue-mist) 100%)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={view.id}
            src={IMG}
            alt={`${PRODUCT_NAME} — ${view.label}`}
            loading="eager"
            className="absolute left-1/2 top-1/2 object-contain pointer-events-none select-none"
            style={{ ...featherMask(mask), width: '84%' }}
            initial={{ opacity: 0, scale: view.scale * 0.96 }}
            animate={{
              opacity: 1,
              scale: view.scale,
              x: '-50%',
              y: `calc(-50% + ${view.y}px)`,
            }}
            exit={{ opacity: 0, scale: view.scale * 1.03 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* view label */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
          <Eye className="w-3.5 h-3.5" /> {view.label}
        </div>

        {/* framing dots */}
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center gap-2.5">
          {views.map((v) => {
            const on = v.id === sel;
            return (
              <motion.button
                key={v.id}
                type="button"
                aria-label={v.label}
                aria-pressed={on}
                onClick={() => setSel(v.id)}
                whileTap={{ scale: 0.85 }}
                className="cursor-pointer rounded-full outline-none"
                style={{
                  width: on ? 26 : 10,
                  height: 10,
                  background: on ? 'var(--blue)' : 'var(--blue-soft)',
                  border: '1px solid var(--line)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-[var(--muted)]">{PRODUCT_NAME} — {fmt(PRICE)}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V119 — Présentoir & reflet. Product on a deep-blue plinth with a soft,
   feathered, flipped reflection (NOT a shadow). Color swatches recolour the
   plinth; selected swatch highlighted. Image stays naturally blended.
   ──────────────────────────────────────────────────────────────────────── */
function V119() {
  const swatches = [
    { id: 0, name: 'Azur', from: 'var(--blue-bright)', to: 'var(--blue-deep)' },
    { id: 1, name: 'Marine', from: 'var(--blue)', to: '#04173f' },
    { id: 2, name: 'Ciel', from: 'var(--blue-soft)', to: 'var(--blue)' },
  ];
  const [sel, setSel] = useState(0);
  const sw = swatches[sel];
  const mask = 'radial-gradient(128% 128% at 50% 44%, #000 58%, transparent 90%)';
  const reflMask = 'radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.5) 0%, transparent 70%)';
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" style={{ color: 'var(--blue)' }} />
          <span className="kicker" style={{ color: 'var(--blue)' }}>Présentoir</span>
        </div>
        <span className="text-[11px] font-medium text-[var(--muted)]">{sw.name}</span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[22px]"
        style={{ aspectRatio: '1 / 1', background: '#ffffff' }}
      >
        {/* deep-blue plinth — fills the lower portion, recoloured by swatch */}
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ height: '42%' }}
          animate={{ background: `linear-gradient(180deg, ${sw.from} 0%, ${sw.to} 100%)` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* soft top edge of the plinth, feathered so there is no hard line */}
        <motion.div
          className="absolute inset-x-0"
          style={{ bottom: '42%', height: '12%' }}
          animate={{ background: `linear-gradient(180deg, transparent, ${sw.from})` }}
          transition={{ duration: 0.5 }}
        />

        {/* product */}
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 object-contain pointer-events-none select-none"
          style={{ ...featherMask(mask), width: '78%', top: '6%', transform: 'translateX(-50%)' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* flipped, feathered reflection on the plinth — multiply blend, no shadow */}
        <motion.img
          src={IMG}
          alt=""
          aria-hidden
          loading="eager"
          className="absolute left-1/2 object-contain pointer-events-none select-none"
          style={{
            width: '78%',
            top: '52%',
            transform: 'translateX(-50%) scaleY(-1)',
            opacity: 0.18,
            mixBlendMode: 'screen',
            clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
            WebkitMaskImage: reflMask,
            maskImage: reflMask,
          }}
        />

        {/* swatches */}
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          {swatches.map((s) => {
            const on = s.id === sel;
            return (
              <motion.button
                key={s.id}
                type="button"
                aria-label={s.name}
                aria-pressed={on}
                onClick={() => setSel(s.id)}
                whileTap={{ scale: 0.88 }}
                className="cursor-pointer rounded-full outline-none"
                style={{
                  width: 22,
                  height: 22,
                  background: `linear-gradient(180deg, ${s.from}, ${s.to})`,
                  border: on ? '2px solid #fff' : '2px solid rgba(255,255,255,0.5)',
                  boxShadow: on ? '0 0 0 2px var(--blue)' : 'none',
                }}
              />
            );
          })}
        </div>

        <div className="absolute right-4 bottom-4 text-right">
          <div className="font-display text-sm font-bold text-white leading-tight">{PRODUCT_NAME}</div>
          <div className="text-xs text-white/85">{fmt(PRICE)}</div>
        </div>
      </div>
    </div>
  );
}

export const variants = [
  { n: 116, label: 'Projecteur', note: 'Cône de lumière balayant derrière le produit fondu sur scène claire', Component: V116 },
  { n: 117, label: 'Plan technique', note: 'Image fusionnée sur grille bleue avec cotes animées activables', Component: V117 },
  { n: 118, label: 'Cadrages', note: 'Pastilles de cadrage qui fondent le même rendu en différents plans', Component: V118 },
  { n: 119, label: 'Présentoir', note: 'Produit sur socle bleu avec reflet feutré et nuancier de teintes', Component: V119 },
];
