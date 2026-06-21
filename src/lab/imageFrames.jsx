import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Sparkles, Sun, Droplet, RotateCcw } from 'lucide-react';
import { PRODUCT_IMAGE, PRODUCT_NAME, EXAMPLE_TOTAL, fmt } from './data.js';

/* Resolve the product image against the (possibly sub-path) base URL. */
const IMG = (import.meta.env.BASE_URL || '/') + PRODUCT_IMAGE;

/* Shared: crop ~2% off the right edge to kill the dark vertical line,
   and feather every edge with a radial mask so nothing reads as a rectangle. */
const FEATHER_MASK =
  'radial-gradient(120% 120% at 50% 46%, #000 52%, rgba(0,0,0,0.55) 72%, transparent 88%)';
const CLIP_RIGHT = 'inset(0 2.2% 0 0)';

/* ────────────────────────────────────────────────────────────────────────
   V22 — Soft blue radial glow. Image floats on a feathered halo, multiply
   blend so the white background of the render dissolves into the card.
   ──────────────────────────────────────────────────────────────────────── */
function V22() {
  const [lifted, setLifted] = useState(false);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: 'var(--blue)' }}>Aperçu produit</div>
          <h3 className="font-display text-xl font-bold text-ink leading-tight">{PRODUCT_NAME}</h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">À partir de</div>
          <div className="font-display text-lg font-bold" style={{ color: 'var(--blue)' }}>{fmt(EXAMPLE_TOTAL)}</div>
        </div>
      </div>

      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={lifted}
        onClick={() => setLifted((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted((v) => !v); } }}
        whileTap={{ scale: 0.99 }}
        className="relative w-full cursor-pointer rounded-[22px] overflow-hidden outline-none"
        style={{
          aspectRatio: '1 / 1',
          background: 'radial-gradient(110% 95% at 50% 30%, var(--blue-soft) 0%, var(--blue-mist) 46%, #ffffff 78%)',
        }}
      >
        {/* feathered glow puddle */}
        <motion.div
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '78%', height: '78%',
            background: 'radial-gradient(circle, rgba(0,102,204,0.22) 0%, rgba(0,102,204,0.08) 42%, transparent 70%)',
            filter: 'blur(26px)',
          }}
          animate={{ scale: lifted ? 1.08 : 1, opacity: lifted ? 1 : 0.85 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={{
            mixBlendMode: 'multiply',
            clipPath: CLIP_RIGHT,
            WebkitMaskImage: FEATHER_MASK,
            maskImage: FEATHER_MASK,
          }}
          animate={{ y: lifted ? -10 : [0, -8, 0] }}
          transition={lifted
            ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-medium" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
          <Sun className="w-3.5 h-3.5" /> {lifted ? 'En lévitation' : 'Toucher pour soulever'}
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V23 — Frameless blurred-gradient field. A drifting blue gradient blob
   sits behind a heavily-feathered image with no border at all.
   ──────────────────────────────────────────────────────────────────────── */
function V23() {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4" style={{ color: 'var(--blue)' }} />
        <span className="kicker" style={{ color: 'var(--blue)' }}>Sans cadre</span>
      </div>

      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={active}
        onClick={() => setActive((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive((v) => !v); } }}
        whileTap={{ scale: 0.99 }}
        className="relative w-full cursor-pointer overflow-hidden rounded-[22px] outline-none"
        style={{ aspectRatio: '4 / 3', background: '#ffffff' }}
      >
        {/* two drifting blurred gradient fields — the frameless backdrop */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: '70%', height: '70%', left: '8%', top: '6%', background: 'radial-gradient(circle, var(--blue-soft), transparent 68%)', filter: 'blur(40px)' }}
          animate={{ x: active ? 20 : [0, 14, 0], y: active ? 8 : [0, -10, 0] }}
          transition={{ duration: active ? 0.7 : 9, repeat: active ? 0 : Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: '62%', height: '62%', right: '4%', bottom: '2%', background: 'radial-gradient(circle, rgba(31,122,224,0.20), transparent 70%)', filter: 'blur(46px)' }}
          animate={{ x: active ? -16 : [0, -12, 0], y: active ? -6 : [0, 12, 0] }}
          transition={{ duration: active ? 0.7 : 11, repeat: active ? 0 : Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={{
            mixBlendMode: 'multiply',
            clipPath: CLIP_RIGHT,
            WebkitMaskImage: FEATHER_MASK,
            maskImage: FEATHER_MASK,
          }}
          animate={{ scale: active ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-medium" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
          <Maximize2 className="w-3.5 h-3.5" /> {active ? 'Zoom' : 'Survoler'}
        </div>
      </motion.div>

      <p className="mt-4 text-center text-sm text-[var(--muted)]">{PRODUCT_NAME} — {fmt(EXAMPLE_TOTAL)}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V24 — Soft contact-shadow ellipse only. The product sits on a very subtle
   grounded ellipse (NOT a box shadow), feathered into a near-white field.
   ──────────────────────────────────────────────────────────────────────── */
function V24() {
  const [grounded, setGrounded] = useState(true);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="kicker" style={{ color: 'var(--blue)' }}>Posé au sol</span>
        <button
          type="button"
          onClick={() => setGrounded((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold cursor-pointer"
          style={{
            color: grounded ? '#fff' : 'var(--blue)',
            background: grounded ? 'var(--blue)' : 'var(--blue-mist)',
            border: '1px solid var(--line)',
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> {grounded ? 'Ombre visible' : 'Sans ombre'}
        </button>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[22px]"
        style={{ aspectRatio: '1 / 1', background: 'linear-gradient(180deg, #ffffff 0%, var(--blue-mist) 100%)' }}
      >
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 top-[44%] w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={{
            mixBlendMode: 'multiply',
            clipPath: CLIP_RIGHT,
            WebkitMaskImage: FEATHER_MASK,
            maskImage: FEATHER_MASK,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* contact ellipse — soft, low, blue-tinted, NOT a box shadow */}
        <AnimatePresence>
          {grounded && (
            <motion.div
              key="contact"
              className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
              style={{
                bottom: '11%',
                width: '56%',
                height: '7%',
                background: 'radial-gradient(closest-side, rgba(0,82,163,0.26), rgba(0,82,163,0.10) 60%, transparent 80%)',
                filter: 'blur(7px)',
              }}
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1, y: [0, 2, 0] }}
              exit={{ opacity: 0, scaleX: 0.7 }}
              transition={{ duration: 0.4, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            />
          )}
        </AnimatePresence>
        <div className="absolute left-4 bottom-4 inline-flex items-center gap-2">
          <span className="font-display text-base font-bold text-ink">{PRODUCT_NAME}</span>
          <span className="text-sm" style={{ color: 'var(--blue)' }}>{fmt(EXAMPLE_TOTAL)}</span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V25 — Duotone blend into a blue gradient. The render is tinted blue and
   multiplied into a full-bleed gradient so it reads as one continuous image.
   ──────────────────────────────────────────────────────────────────────── */
function V25() {
  const [tinted, setTinted] = useState(true);
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Droplet className="w-4 h-4" style={{ color: 'var(--blue)' }} />
        <span className="kicker" style={{ color: 'var(--blue)' }}>Duotone bleu</span>
      </div>

      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={tinted}
        onClick={() => setTinted((v) => !v)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTinted((v) => !v); } }}
        whileTap={{ scale: 0.99 }}
        className="relative w-full cursor-pointer overflow-hidden rounded-[22px] outline-none"
        style={{
          aspectRatio: '1 / 1',
          background: 'linear-gradient(155deg, var(--blue-bright) 0%, var(--blue) 38%, var(--blue-deep) 100%)',
        }}
      >
        {/* light feathered core so the image stays legible against the deep gradient */}
        <div
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: '88%', height: '88%', background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 50%, transparent 72%)', filter: 'blur(20px)' }}
        />
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
          style={{
            mixBlendMode: 'multiply',
            clipPath: CLIP_RIGHT,
            WebkitMaskImage: FEATHER_MASK,
            maskImage: FEATHER_MASK,
            filter: tinted ? 'grayscale(1) brightness(1.05) sepia(0.4) hue-rotate(175deg) saturate(2.6)' : 'none',
          }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* bottom legibility wash + label */}
        <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,82,163,0.55))' }} />
        <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
          <div>
            <div className="font-display text-base font-bold text-white leading-tight">{PRODUCT_NAME}</div>
            <div className="text-xs text-white/85">{fmt(EXAMPLE_TOTAL)}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white">
            <Droplet className="w-3.5 h-3.5" /> {tinted ? 'Teinté' : 'Naturel'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export const variants = [
  { n: 22, label: 'Halo radial', note: 'Image flottante sur une lueur bleue feutrée, fusionnée en multiply', Component: V22 },
  { n: 23, label: 'Champ flou', note: 'Sans cadre : dégradés bleus flous qui dérivent derrière l’image', Component: V23 },
  { n: 24, label: 'Ombre de contact', note: 'Ellipse de contact très subtile sous le produit, aucune ombre de boîte', Component: V24 },
  { n: 25, label: 'Duotone bleu', note: 'Rendu teinté et fondu dans un dégradé bleu plein cadre', Component: V25 },
];
