import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Star, Check, Award } from 'lucide-react';
import { LOGOS } from './data.js';

// Shared blue palette (no black anywhere)
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#15294a'; // deep blue-ink used instead of black for text
const MUTED = '#5b6f8e';

// Feather mask + multiply blend so logos sit cleanly on white (no shadows).
const logoMask = {
  WebkitMaskImage:
    'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)',
  maskImage:
    'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)',
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

/* =====================================================================
   V87 — Marquee infini (CSS keyframes)
   Bandeau de logos en grayscale qui défile en continu via une keyframe
   CSS (transform translateX). Le défilement se met en pause au survol,
   et l'on peut le geler / relancer avec un vrai bouton. Le logo survolé
   passe en couleur + scale, façon vitrine vivante.
   ===================================================================== */
function V87() {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);
  // Duplicate the list so the translateX(-50%) loop is seamless.
  const loop = [...LOGOS, ...LOGOS];

  return (
    <div style={{ color: INK }}>
      <style>{`
        @keyframes sae-marquee-87 {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} color={BLUE} strokeWidth={2.4} />
          <div className="kicker" style={{ color: BLUE }}>
            Ils nous font confiance
          </div>
        </div>
        <motion.button
          type="button"
          onClick={() => setPaused((p) => !p)}
          whileTap={{ scale: 0.94 }}
          className="cursor-pointer font-display"
          style={{
            border: `1px solid ${paused ? BLUE : LINE}`,
            background: paused ? BLUE : '#ffffff',
            color: paused ? '#ffffff' : BLUE_DEEP,
            borderRadius: 9999,
            padding: '6px 14px',
            fontSize: '0.76rem',
            fontWeight: 700,
            transition: 'background .2s, border-color .2s, color .2s',
          }}
        >
          {paused ? 'Relancer' : 'Figer'}
        </motion.button>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          border: `1px solid ${LINE}`,
          background: BLUE_MIST,
          borderRadius: 18,
          padding: '18px 0',
        }}
      >
        {/* Fade edges so logos slide in/out softly */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{
            width: 54,
            background: `linear-gradient(90deg, ${BLUE_MIST}, rgba(243,248,255,0))`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: 54,
            background: `linear-gradient(270deg, ${BLUE_MIST}, rgba(243,248,255,0))`,
          }}
        />

        <div
          className="flex items-center"
          style={{
            width: 'max-content',
            gap: 40,
            paddingInline: 20,
            animation: 'sae-marquee-87 26s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {loop.map((logo, i) => {
            const on = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="shrink-0 flex items-center justify-center"
                style={{ height: 40 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    height: 36,
                    width: 'auto',
                    objectFit: 'contain',
                    filter: on ? 'grayscale(0)' : 'grayscale(1)',
                    opacity: on ? 1 : 0.62,
                    transform: on ? 'scale(1.12)' : 'scale(1)',
                    transition: 'filter .25s, opacity .25s, transform .25s',
                    mixBlendMode: 'multiply',
                    ...logoMask,
                  }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ fontSize: '0.78rem', color: MUTED, marginTop: 12 }}>
        Plus de {LOGOS.length * 30}+ marques équipées en structures gonflables.
      </p>
    </div>
  );
}

/* =====================================================================
   V88 — Grille statique sélectionnable
   Pas de défilement : une grille propre de logos en grayscale. Chaque
   case est cliquable — la sélection passe en couleur, s'entoure de bleu
   et révèle une coche. Un compteur "épinglés" suit les choix de
   l'owner, façon mur de références.
   ===================================================================== */
function V88() {
  const [picked, setPicked] = useState(() => new Set());
  const toggle = (i) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(i);
    }
  };
  const count = picked.size;

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award size={18} color={BLUE} strokeWidth={2.4} />
            <div className="kicker" style={{ color: BLUE }}>
              Ils nous font confiance
            </div>
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05, marginTop: 6 }}
          >
            Des marques exigeantes
          </h3>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {count > 0 && (
            <motion.div
              key={count}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="font-display"
              style={{
                background: BLUE_SOFT,
                color: BLUE_DEEP,
                borderRadius: 9999,
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {count} épinglé{count > 1 ? 's' : ''}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {LOGOS.map((logo, i) => {
          const on = picked.has(i);
          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onClick={() => toggle(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative flex items-center justify-center"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 16,
                height: 72,
                padding: '10px 12px',
                transition: 'background .2s, border-color .2s',
              }}
            >
              <motion.span
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.5 }}
                transition={{ duration: 0.18 }}
                className="absolute flex items-center justify-center"
                style={{
                  top: 6,
                  right: 6,
                  width: 18,
                  height: 18,
                  borderRadius: 9999,
                  background: BLUE,
                  color: '#ffffff',
                }}
              >
                <Check size={11} strokeWidth={3.2} />
              </motion.span>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxHeight: 34,
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: on ? 'grayscale(0)' : 'grayscale(1)',
                  opacity: on ? 1 : 0.58,
                  transition: 'filter .25s, opacity .25s',
                  mixBlendMode: 'multiply',
                  ...logoMask,
                }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: '0.78rem', color: MUTED, marginTop: 14 }}>
        Touchez un logo pour l'épingler à votre mur de références.
      </p>
    </div>
  );
}

/* =====================================================================
   V89 — Ruban à fondu (deep-blue panel)
   Variation sur panneau bleu profond : un ruban de logos en grayscale
   clair avec de larges fondus latéraux. On bascule entre deux "pistes"
   de marques via des onglets, et la piste active glisse en place.
   Le logo survolé s'illumine légèrement.
   ===================================================================== */
function V89() {
  const [track, setTrack] = useState(0);
  const [hovered, setHovered] = useState(null);
  const half = Math.ceil(LOGOS.length / 2);
  const tracks = [LOGOS.slice(0, half), LOGOS.slice(half)];
  const tabs = ['Sport & Auto', 'Industrie & Retail'];
  const rows = tracks[track];

  return (
    <div
      className="bg-deep"
      style={{
        background: 'linear-gradient(160deg, #0a3a78, #0052a3)',
        borderRadius: 22,
        padding: '20px 20px 22px',
        color: '#ffffff',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={16} color="#ffffff" strokeWidth={2.4} fill="#ffffff" />
          <div
            className="kicker"
            style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '.08em' }}
          >
            Ils nous font confiance
          </div>
        </div>

        <div
          className="relative flex items-center"
          style={{
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 9999,
            padding: 3,
          }}
        >
          {tabs.map((label, i) => {
            const on = track === i;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setTrack(i)}
                className="cursor-pointer relative font-display"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: on ? BLUE_DEEP : 'rgba(255,255,255,0.85)',
                  borderRadius: 9999,
                  padding: '5px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  zIndex: 1,
                  transition: 'color .2s',
                }}
              >
                {on && (
                  <motion.span
                    layoutId="trust-track-pill"
                    className="absolute inset-0"
                    style={{ background: '#ffffff', borderRadius: 9999, zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.96)',
          borderRadius: 16,
          padding: '18px 0',
        }}
      >
        {/* Wide lateral fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{
            width: 64,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.96), rgba(255,255,255,0))',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: 64,
            background:
              'linear-gradient(270deg, rgba(255,255,255,0.96), rgba(255,255,255,0))',
          }}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={track}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex items-center justify-center flex-wrap"
            style={{ gap: 30, paddingInline: 24 }}
          >
            {rows.map((logo, i) => {
              const on = hovered === i;
              return (
                <div
                  key={logo.alt}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex items-center justify-center"
                  style={{ height: 38 }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{
                      height: 34,
                      width: 'auto',
                      objectFit: 'contain',
                      filter: on ? 'grayscale(0)' : 'grayscale(1)',
                      opacity: on ? 1 : 0.6,
                      transform: on ? 'scale(1.1)' : 'scale(1)',
                      transition: 'filter .25s, opacity .25s, transform .25s',
                      mixBlendMode: 'multiply',
                      ...logoMask,
                    }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <p
        style={{
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.78)',
          marginTop: 14,
        }}
      >
        Partenaires sélectionnés — basculez entre les secteurs.
      </p>
    </div>
  );
}

export const variants = [
  {
    n: 87,
    label: 'Marquee infini',
    note: 'Défilement CSS continu, pause au survol, bouton figer/relancer.',
    Component: V87,
  },
  {
    n: 88,
    label: 'Grille statique',
    note: 'Mur de logos cliquables, sélection en couleur et compteur d’épinglés.',
    Component: V88,
  },
  {
    n: 89,
    label: 'Ruban à fondu',
    note: 'Panneau bleu profond, fondus larges et bascule entre pistes de marques.',
    Component: V89,
  },
];
