import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Check, ChevronLeft, ChevronRight, Star, Wind, Award } from 'lucide-react';
import { HERO_IMAGE, PRODUCT_NAME, STATS, fmt } from './data.js';

/* Resolve the hero image against the (possibly sub-path) base URL. */
const IMG = (import.meta.env.BASE_URL || '/') + HERO_IMAGE;

/* Shared feather mask + right-edge crop so the render never reads as a hard
   rectangle and the white render background dissolves into the card. */
const FEATHER_MASK =
  'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)';
const IMG_MASK = {
  WebkitMaskImage: FEATHER_MASK,
  maskImage: FEATHER_MASK,
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

const EASE = [0.22, 1, 0.36, 1];

/* ────────────────────────────────────────────────────────────────────────
   V26 — Full-bleed image w/ overlay + big title. The hero photo fills the
   frame under a blue legibility wash; a CTA toggles to a "demandé" state and
   the angle of the title shifts on tap.
   ──────────────────────────────────────────────────────────────────────── */
function V26() {
  const [requested, setRequested] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative w-full overflow-hidden rounded-[22px]"
      style={{ aspectRatio: '4 / 5', background: 'var(--blue-mist)' }}
    >
      <motion.img
        src={IMG}
        alt={PRODUCT_NAME}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      {/* blue legibility wash, no black */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,82,163,0.10) 0%, rgba(0,82,163,0.12) 42%, rgba(11,28,63,0.74) 100%)' }}
      />

      <motion.div
        className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
        style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
      >
        <Sparkles className="h-3.5 w-3.5" /> Conception suisse
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <motion.div
          className="kicker mb-1.5 text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
        >
          Structures gonflables premium
        </motion.div>
        <motion.h2
          className="font-display text-[2.1rem] font-bold leading-[0.95] text-white"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
        >
          {PRODUCT_NAME}
        </motion.h2>
        <motion.p
          className="mt-2 max-w-[26ch] text-sm text-white/85"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
        >
          Montée en 2 minutes, imprimée à vos couleurs.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => setRequested((v) => !v)}
          whileTap={{ scale: 0.97 }}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer"
          style={{
            background: requested ? 'rgba(255,255,255,0.18)' : '#fff',
            color: requested ? '#fff' : 'var(--blue)',
            border: '1px solid rgba(255,255,255,0.45)',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        >
          {requested ? (
            <><Check className="h-4 w-4" /> Devis demandé</>
          ) : (
            <>Demander un devis <ArrowRight className="h-4 w-4" /></>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V27 — Split (text / visual). Text column left, feathered product render
   right on a blue-mist panel. A small size toggle swaps the displayed price.
   ──────────────────────────────────────────────────────────────────────── */
const V27_SIZES = [
  { name: '3×3m', price: 1180 },
  { name: '4×4m', price: 1490 },
  { name: '5×5m', price: 1790 },
];
function V27() {
  const [idx, setIdx] = useState(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid w-full overflow-hidden rounded-[22px]"
      style={{ gridTemplateColumns: '1.05fr 1fr', border: '1px solid var(--line)' }}
    >
      {/* text column */}
      <div className="flex flex-col justify-center p-5">
        <div className="kicker mb-2" style={{ color: 'var(--blue)' }}>Produit phare</div>
        <h2 className="font-display text-[1.7rem] font-bold leading-[0.98] text-ink">{PRODUCT_NAME}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
          Architecture moderne à pieds courbes, 100% personnalisable.
        </p>

        <div className="mt-4 flex gap-1.5">
          {V27_SIZES.map((s, i) => {
            const on = i === idx;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setIdx(i)}
                className="flex-1 rounded-xl px-2 py-2 text-[12px] font-semibold cursor-pointer transition-colors"
                style={{
                  color: on ? '#fff' : 'var(--ink)',
                  background: on ? 'var(--blue)' : 'var(--blue-mist)',
                  border: `1px solid ${on ? 'var(--blue)' : 'var(--line)'}`,
                }}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-[11px] uppercase tracking-widest text-[var(--muted)]">Dès</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={idx}
              className="font-display text-2xl font-bold"
              style={{ color: 'var(--blue)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {fmt(V27_SIZES[idx].price)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* visual column */}
      <div className="relative flex items-center justify-center" style={{ background: 'radial-gradient(110% 100% at 60% 35%, var(--blue-soft), var(--blue-mist) 70%, #fff)' }}>
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="w-[88%] object-contain select-none pointer-events-none"
          style={{ mixBlendMode: 'multiply', ...IMG_MASK }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold" style={{ color: 'var(--blue)', border: '1px solid var(--line)' }}>
          <Wind className="h-3 w-3" /> 70 km/h
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V28 — Editorial w/ kicker + stats strip. Centered editorial headline, a
   feathered render, then an interactive stats strip; tapping a stat
   highlights it and surfaces a short caption.
   ──────────────────────────────────────────────────────────────────────── */
const V28_CAPTIONS = [
  'Deux décennies à concevoir des structures gonflables.',
  'Une seule personne, deux minutes, prêt.',
  'Dessinée et fabriquée en Suisse, de A à Z.',
];
function V28() {
  const [active, setActive] = useState(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full overflow-hidden rounded-[22px] p-5"
      style={{ background: '#fff', border: '1px solid var(--line)' }}
    >
      <div className="text-center">
        <div className="kicker mb-2" style={{ color: 'var(--blue)' }}>L’atelier suisse du gonflable</div>
        <h2 className="font-display mx-auto max-w-[18ch] text-[1.85rem] font-bold leading-[0.98] text-ink">
          {PRODUCT_NAME}, pensée pour durer
        </h2>
      </div>

      <div
        className="relative mx-auto mt-4 flex items-center justify-center overflow-hidden rounded-2xl"
        style={{ aspectRatio: '16 / 9', background: 'radial-gradient(110% 110% at 50% 30%, var(--blue-soft), #fff 72%)' }}
      >
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="w-[78%] object-contain select-none pointer-events-none"
          style={{ mixBlendMode: 'multiply', ...IMG_MASK }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* interactive stats strip */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {STATS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-xl px-2 py-3 text-center cursor-pointer transition-colors"
              style={{
                background: on ? 'var(--blue)' : 'var(--blue-mist)',
                border: `1px solid ${on ? 'var(--blue)' : 'var(--line)'}`,
              }}
            >
              <div className="font-display text-xl font-bold leading-none" style={{ color: on ? '#fff' : 'var(--blue)' }}>
                {s.value}{s.suffix}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wide" style={{ color: on ? 'rgba(255,255,255,0.85)' : 'var(--muted)' }}>
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          className="mt-3 text-center text-[13px] text-[var(--muted)]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {V28_CAPTIONS[active]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V29 — Minimal centered. Lots of white space, a single centered render,
   tight title, and one focused CTA that toggles a "save" heart-less star.
   ──────────────────────────────────────────────────────────────────────── */
function V29() {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex w-full flex-col items-center overflow-hidden rounded-[22px] px-5 py-8 text-center"
      style={{ background: '#fff', border: '1px solid var(--line)' }}
    >
      <motion.div
        className="kicker mb-3"
        style={{ color: 'var(--blue)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
      >
        Sport Air Event
      </motion.div>
      <motion.h2
        className="font-display max-w-[14ch] text-[2.3rem] font-bold leading-[0.95] text-ink"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
      >
        {PRODUCT_NAME}
      </motion.h2>

      <motion.div
        className="relative mt-5 flex w-[72%] items-center justify-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        style={{ aspectRatio: '1 / 1' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, var(--blue-soft) 0%, transparent 68%)' }}
        />
        <motion.img
          src={IMG}
          alt={PRODUCT_NAME}
          loading="eager"
          className="relative w-[92%] object-contain select-none pointer-events-none"
          style={{ mixBlendMode: 'multiply', ...IMG_MASK }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
          style={{ background: 'var(--blue)' }}
        >
          Découvrir <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition-colors"
          style={{
            background: saved ? 'var(--blue)' : 'var(--blue-mist)',
            border: `1px solid ${saved ? 'var(--blue)' : 'var(--line)'}`,
          }}
        >
          <motion.span animate={{ scale: saved ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.35 }}>
            <Star className="h-4 w-4" style={{ color: saved ? '#fff' : 'var(--blue)', fill: saved ? '#fff' : 'transparent' }} />
          </motion.span>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V30 — Asymmetric with floating badge. Deep-blue panel, off-center render,
   and a floating rating badge that can be cycled. An arrow stepper rotates
   the highlighted selling point.
   ──────────────────────────────────────────────────────────────────────── */
const V30_POINTS = [
  { icon: Award, text: 'Garantie 5 ans, structure + impression' },
  { icon: Wind, text: 'Tient jusqu’à 70 km/h de vent' },
  { icon: Sparkles, text: 'Impression HD 360° à vos couleurs' },
];
function V30() {
  const [i, setI] = useState(0);
  const move = (d) => setI((p) => (p + d + V30_POINTS.length) % V30_POINTS.length);
  const Pt = V30_POINTS[i].icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="bg-deep relative w-full overflow-hidden rounded-[22px] p-5"
      style={{ aspectRatio: '4 / 5' }}
    >
      <motion.div
        className="kicker mb-2 text-white/70"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
      >
        Édition premium
      </motion.div>
      <motion.h2
        className="font-display max-w-[12ch] text-[2rem] font-bold leading-[0.95] text-white"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
      >
        {PRODUCT_NAME}
      </motion.h2>

      {/* off-center render, pushed to the right & down */}
      <motion.img
        src={IMG}
        alt={PRODUCT_NAME}
        loading="eager"
        className="pointer-events-none absolute right-[-6%] top-[26%] w-[72%] select-none object-contain"
        style={{ mixBlendMode: 'screen', ...IMG_MASK }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 0.45, duration: 0.7, ease: EASE }, x: { delay: 0.45, duration: 0.7, ease: EASE }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />

      {/* floating rating badge */}
      <motion.div
        className="absolute left-5 top-[38%] inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2"
        style={{ border: '1px solid var(--line)' }}
        initial={{ opacity: 0, y: 14, rotate: -4 }}
        animate={{ opacity: 1, y: [0, -5, 0], rotate: -4 }}
        transition={{ opacity: { delay: 0.7, duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <div className="flex">
          {[0, 1, 2, 3, 4].map((k) => (
            <Star key={k} className="h-3.5 w-3.5" style={{ color: 'var(--blue)', fill: 'var(--blue)' }} />
          ))}
        </div>
        <span className="font-display text-sm font-bold text-ink">4,9</span>
      </motion.div>

      {/* selling-point carousel anchored at the bottom */}
      <div className="absolute inset-x-5 bottom-5">
        <div
          className="flex items-center gap-3 rounded-2xl px-3 py-3"
          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)' }}
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
            <Pt className="h-4 w-4" style={{ color: 'var(--blue)' }} />
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              className="flex-1 text-[12.5px] font-medium leading-snug text-white"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {V30_POINTS[i].text}
            </motion.p>
          </AnimatePresence>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Précédent"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Suivant"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full cursor-pointer"
              style={{ background: '#fff' }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: 'var(--blue)' }} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const variants = [
  { n: 26, label: 'Plein cadre', note: 'Image plein cadre, wash bleu et grand titre, CTA devis interactif', Component: V26 },
  { n: 27, label: 'Split texte/visuel', note: 'Colonne texte à gauche, rendu feutré à droite, sélecteur de taille', Component: V27 },
  { n: 28, label: 'Éditorial + stats', note: 'Titre éditorial centré et bande de statistiques cliquables', Component: V28 },
  { n: 29, label: 'Minimal centré', note: 'Beaucoup de blanc, rendu centré, un seul CTA et bouton favori', Component: V29 },
  { n: 30, label: 'Asymétrique badge', note: 'Panneau bleu profond, rendu décalé et badge note flottant', Component: V30 },
];
