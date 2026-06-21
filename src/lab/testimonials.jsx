import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ThumbsUp,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { REVIEWS } from './data.js';

// Shared blue palette (no black anywhere)
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#0b1c3f';
const MUTED = '#5b6f8e';
const AMBER = '#f5a623';

/* ── Shared building blocks ─────────────────────────────────────────── */

// Authentic multicolor Google "G" logo (vector, no black).
function GoogleG({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-label="Google"
      role="img"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

// 5 amber stars (with optional partial last star for 4.9-style ratings).
function Stars({ size = 15, value = 5, gap = 2 }) {
  return (
    <span className="inline-flex items-center" style={{ gap }} aria-label={`${value} sur 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star size={size} strokeWidth={1.6} color="#d8c39a" fill="none" />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden inline-flex"
                style={{ width: `${fill * 100}%` }}
              >
                <Star size={size} strokeWidth={1.6} color={AMBER} fill={AMBER} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

// "Publié sur Google" verified badge.
function GoogleBadge({ small = false }) {
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        background: BLUE_MIST,
        border: `1px solid ${LINE}`,
        borderRadius: 9999,
        padding: small ? '3px 9px 3px 7px' : '4px 11px 4px 8px',
        fontSize: small ? '0.66rem' : '0.72rem',
        fontWeight: 600,
        color: MUTED,
        whiteSpace: 'nowrap',
      }}
    >
      <GoogleG size={small ? 12 : 14} />
      Publié sur Google
    </span>
  );
}

// Avatar disc using the gradient + initials from REVIEWS data.
function Avatar({ r, size = 44 }) {
  return (
    <span
      className="inline-flex items-center justify-center font-display shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: r.grad,
        color: '#ffffff',
        fontSize: size * 0.36,
        fontWeight: 700,
        letterSpacing: '0.01em',
      }}
    >
      {r.ini}
    </span>
  );
}

/* =====================================================================
   V51 — 3-col selectable cards
   Three compact review cards. Clicking one promotes it (blue ring +
   tint + a "merci" thumbs-up toggle). A rating summary sits on top with
   the Google G, 4.9/5 and the live avis count.
   ===================================================================== */
function V51() {
  const [sel, setSel] = useState(1);
  const [liked, setLiked] = useState(() => REVIEWS.map(() => false));
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <GoogleG size={22} />
          <div>
            <div className="font-display" style={{ fontSize: '1.05rem', lineHeight: 1 }}>
              4.9 / 5
            </div>
            <span style={{ fontSize: '0.72rem', color: MUTED }}>127 avis</span>
          </div>
        </div>
        <Stars size={17} value={4.9} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {REVIEWS.map((r, i) => {
          const on = sel === i;
          return (
            <div
              key={r.name}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative flex flex-col"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                padding: '14px 13px',
                transition: 'background .2s, border-color .2s',
                boxShadow: on ? `0 0 0 3px ${BLUE_SOFT}` : 'none',
              }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <Avatar r={r} size={38} />
                <div className="min-w-0">
                  <div
                    className="truncate"
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: INK }}
                  >
                    {r.name}
                  </div>
                  <Stars size={12} value={5} />
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.78rem',
                  lineHeight: 1.4,
                  color: MUTED,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: on ? 99 : 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {r.text}
              </p>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiked((l) => l.map((v, idx) => (idx === i ? !v : v)));
                    }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer inline-flex items-center gap-1.5 self-start mt-2.5"
                    style={{
                      border: `1px solid ${liked[i] ? BLUE : LINE}`,
                      background: liked[i] ? BLUE : '#ffffff',
                      color: liked[i] ? '#ffffff' : BLUE_DEEP,
                      borderRadius: 9999,
                      padding: '5px 11px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    <ThumbsUp size={12} strokeWidth={2.4} />
                    {liked[i] ? 'Merci !' : 'Utile'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V52 — Big featured quote + selectable list
   A large highlighted quote on top; a thin list of the other reviews
   below. Selecting a list row swaps it into the featured slot with a
   smooth fade. Google badge + 4.9/127 header for trust.
   ===================================================================== */
function V52() {
  const [sel, setSel] = useState(0);
  const r = REVIEWS[sel];
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <GoogleG size={18} />
          <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>4.9 / 127 avis</span>
        </div>
        <GoogleBadge small />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            background: BLUE_MIST,
            border: `1px solid ${LINE}`,
            borderRadius: 22,
            padding: '20px 20px 18px',
          }}
        >
          <Quote size={28} color={BLUE} fill={BLUE} style={{ opacity: 0.9 }} />
          <p
            className="font-display"
            style={{ fontSize: '1.05rem', lineHeight: 1.4, margin: '8px 0 16px', color: INK }}
          >
            {r.text}
          </p>
          <div className="flex items-center gap-3">
            <Avatar r={r} size={42} />
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: '0.74rem', color: MUTED }}>
                {r.role} · {r.date}
              </div>
            </div>
            <span className="ml-auto">
              <Stars size={15} value={5} />
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 flex flex-col gap-2">
        {REVIEWS.map((rv, i) => {
          const on = sel === i;
          return (
            <div
              key={rv.name}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer flex items-center gap-3"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? '#ffffff' : '#ffffff',
                borderRadius: 14,
                padding: '9px 12px',
                opacity: on ? 1 : 0.78,
                transition: 'border-color .2s, opacity .2s',
              }}
            >
              <Avatar r={rv} size={30} />
              <div className="min-w-0 flex-1">
                <div className="truncate" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                  {rv.name}
                </div>
                <Stars size={11} value={5} />
              </div>
              <motion.span
                animate={{ scale: on ? 1 : 0.6, opacity: on ? 1 : 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center justify-center shrink-0"
                style={{ width: 20, height: 20, borderRadius: 9999, background: BLUE, color: '#fff' }}
              >
                <Check size={12} strokeWidth={3} />
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V53 — Carousel (prev / next + dots)
   One review at a time inside a deep-blue framed slide, with animated
   directional transitions, prev/next buttons and clickable dots.
   ===================================================================== */
// Local review set for V53 only — natural, varied French names + company labels.
const V53_REVIEWS = [
  {
    ini: 'CM',
    grad: 'linear-gradient(135deg,#0066cc,#3b82f6)',
    name: 'Camille Mercier',
    role: 'Trail Évasion Annecy',
    date: '12 mai 2026',
    text: 'Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono, rendu visuel impressionnant et service client très réactif. Parfait pour nos événements professionnels.',
  },
  {
    ini: 'YB',
    grad: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    name: 'Yanis B.',
    role: 'Agence Lumen — Lyon',
    date: '3 juillet 2025',
    text: 'Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande vivement.',
  },
  {
    ini: 'FN',
    grad: 'linear-gradient(135deg,#2563eb,#60a5fa)',
    name: 'Farida Nasri',
    role: 'Comité Marathon du Léman',
    date: '21 décembre 2024',
    text: 'Quatrième commande et toujours aussi satisfait. Produits haut de gamme, délais respectés, équipe professionnelle. Les structures résistent parfaitement aux conditions extérieures.',
  },
];

function V53() {
  const [[idx, dir], setState] = useState([0, 0]);
  const go = (d) =>
    setState(([i]) => {
      const next = (i + d + V53_REVIEWS.length) % V53_REVIEWS.length;
      return [next, d];
    });
  const jump = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);
  const r = V53_REVIEWS[idx];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GoogleG size={18} />
          <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>4.9 / 127 avis</span>
        </div>
        <Stars size={15} value={4.9} />
      </div>

      <div className="relative overflow-hidden" style={{ borderRadius: 22 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
            transition={{ duration: 0.28 }}
            className="bg-deep"
            style={{ borderRadius: 22, padding: '22px 22px 20px', color: '#fff' }}
          >
            <div className="flex items-center justify-between mb-3">
              <Quote size={26} color="#9fc6ff" fill="#9fc6ff" style={{ opacity: 0.85 }} />
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  background: 'rgba(255,255,255,.12)',
                  borderRadius: 9999,
                  padding: '3px 9px 3px 7px',
                  fontSize: '0.66rem',
                  fontWeight: 600,
                }}
              >
                <GoogleG size={12} /> Publié sur Google
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 16px', color: '#eaf2ff' }}>
              {r.text}
            </p>
            <div className="flex items-center gap-3">
              <Avatar r={r} size={40} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#a8c2e6' }}>{r.role}</div>
              </div>
              <span className="ml-auto">
                <Stars size={14} value={5} />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {[-1, 1].map((d) => (
            <motion.button
              key={d}
              type="button"
              onClick={() => go(d)}
              whileTap={{ scale: 0.9 }}
              aria-label={d < 0 ? 'Précédent' : 'Suivant'}
              className="cursor-pointer inline-flex items-center justify-center"
              style={{
                width: 38,
                height: 38,
                borderRadius: 9999,
                border: `1px solid ${LINE}`,
                background: '#ffffff',
                color: BLUE,
              }}
            >
              {d < 0 ? (
                <ChevronLeft size={18} strokeWidth={2.4} />
              ) : (
                <ChevronRight size={18} strokeWidth={2.4} />
              )}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {V53_REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Avis ${i + 1}`}
              className="cursor-pointer"
              style={{
                width: i === idx ? 22 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === idx ? BLUE : LINE,
                border: 'none',
                transition: 'width .25s, background .25s',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   V54 — Masonry / staggered cards
   A staggered two-column layout where cards have varying emphasis.
   Hover/select lifts a card and reveals its full text + Google badge.
   Header carries the rating summary.
   ===================================================================== */
function V54() {
  const [sel, setSel] = useState(0);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };
  // staggered vertical offset per card for a masonry feel
  const offsets = ['0px', '18px', '6px'];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="inline-flex items-center justify-center"
          style={{ width: 40, height: 40, borderRadius: 12, background: BLUE_SOFT }}
        >
          <GoogleG size={22} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display" style={{ fontSize: '1rem', lineHeight: 1 }}>
              4.9 / 5
            </span>
            <Stars size={14} value={4.9} />
          </div>
          <span style={{ fontSize: '0.72rem', color: MUTED }}>Basé sur 127 avis vérifiés</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-start">
        {REVIEWS.map((r, i) => {
          const on = sel === i;
          return (
            <motion.div
              key={r.name}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              onMouseEnter={() => setSel(i)}
              animate={{ y: on ? -3 : 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="cursor-pointer"
              style={{
                marginTop: offsets[i % offsets.length],
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                padding: '14px 14px',
                boxShadow: on ? `0 0 0 3px ${BLUE_SOFT}` : 'none',
                transition: 'background .2s, border-color .2s, box-shadow .2s',
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <Stars size={14} value={5} />
                <GoogleG size={15} />
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  lineHeight: 1.42,
                  color: MUTED,
                  margin: '0 0 12px',
                  display: '-webkit-box',
                  WebkitLineClamp: on ? 99 : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {r.text}
              </p>
              <div className="flex items-center gap-2.5">
                <Avatar r={r} size={34} />
                <div className="min-w-0">
                  <div className="truncate" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    {r.name}
                  </div>
                  <div className="truncate" style={{ fontSize: '0.7rem', color: MUTED }}>
                    {r.role}
                  </div>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <GoogleBadge small />
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

/* =====================================================================
   V55 — Compact list with expand
   A tight, scannable list row per review. Each row toggles open to
   reveal the full quote. A small filter toggles "5 étoiles seulement".
   Google badge + count anchor trust at the top.
   ===================================================================== */
function V55() {
  const [open, setOpen] = useState(0);
  const [onlyFive, setOnlyFive] = useState(false);
  const list = onlyFive ? REVIEWS : REVIEWS; // all are 5★ here; toggle is illustrative
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((o) => (o === i ? -1 : i));
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <GoogleG size={18} />
          <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>4.9 / 127 avis</span>
        </div>
        <motion.button
          type="button"
          onClick={() => setOnlyFive((v) => !v)}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer inline-flex items-center gap-1.5"
          style={{
            border: `1px solid ${onlyFive ? BLUE : LINE}`,
            background: onlyFive ? BLUE : '#ffffff',
            color: onlyFive ? '#ffffff' : MUTED,
            borderRadius: 9999,
            padding: '5px 11px',
            fontSize: '0.72rem',
            fontWeight: 600,
          }}
        >
          <Star size={12} strokeWidth={2.4} fill={onlyFive ? '#fff' : 'none'} />
          5 étoiles
        </motion.button>
      </div>

      <div
        className="flex flex-col"
        style={{ border: `1px solid ${LINE}`, borderRadius: 18, overflow: 'hidden' }}
      >
        {list.map((r, i) => {
          const on = open === i;
          return (
            <div
              key={r.name}
              role="button"
              tabIndex={0}
              onClick={() => setOpen(on ? -1 : i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer"
              style={{
                borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                transition: 'background .2s',
              }}
            >
              <div className="flex items-center gap-3" style={{ padding: '11px 14px' }}>
                <Avatar r={r} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {r.name}
                    </span>
                    <BadgeCheck size={14} color={BLUE} strokeWidth={2.4} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Stars size={11} value={5} />
                    <span style={{ fontSize: '0.68rem', color: MUTED }}>{r.date}</span>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: on ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ color: BLUE }}
                >
                  <ChevronRight size={16} strokeWidth={2.4} style={{ transform: 'rotate(90deg)' }} />
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p
                      style={{
                        fontSize: '0.8rem',
                        lineHeight: 1.45,
                        color: MUTED,
                        margin: 0,
                        padding: '0 14px 13px 61px',
                      }}
                    >
                      {r.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V56 — Rating summary header + cards
   A bold rating panel (big 4.9, stars, distribution bars) sits above a
   horizontal strip of selectable mini review cards. Selecting a bar
   filters/animates; selecting a card highlights it.
   ===================================================================== */
function V56() {
  const [sel, setSel] = useState(0);
  const dist = [
    { stars: 5, pct: 94 },
    { stars: 4, pct: 5 },
    { stars: 3, pct: 1 },
  ];
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div style={{ color: INK }}>
      <div
        className="flex items-stretch gap-4 mb-3"
        style={{
          background: BLUE_MIST,
          border: `1px solid ${LINE}`,
          borderRadius: 20,
          padding: '16px 18px',
        }}
      >
        <div className="flex flex-col items-center justify-center text-center shrink-0" style={{ minWidth: 92 }}>
          <div className="font-display" style={{ fontSize: '2.4rem', lineHeight: 1, color: INK }}>
            4.9
          </div>
          <Stars size={14} value={4.9} />
          <div className="inline-flex items-center gap-1.5 mt-1.5">
            <GoogleG size={13} />
            <span style={{ fontSize: '0.68rem', color: MUTED, fontWeight: 600 }}>127 avis</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          {dist.map((d) => (
            <div key={d.stars} className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-0.5 shrink-0"
                style={{ fontSize: '0.7rem', color: MUTED, width: 26 }}
              >
                {d.stars}
                <Star size={10} fill={AMBER} color={AMBER} strokeWidth={0} />
              </span>
              <span
                className="flex-1 relative overflow-hidden"
                style={{ height: 7, borderRadius: 9999, background: '#ffffff' }}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute left-0 top-0 bottom-0"
                  style={{ background: BLUE, borderRadius: 9999 }}
                />
              </span>
              <span style={{ fontSize: '0.66rem', color: MUTED, width: 30, textAlign: 'right' }}>
                {d.pct}%
              </span>
            </div>
          ))}
          <div className="inline-flex items-center gap-1.5 mt-1">
            <ShieldCheck size={13} color={BLUE} strokeWidth={2.2} />
            <span style={{ fontSize: '0.68rem', color: BLUE_DEEP, fontWeight: 600 }}>
              100% avis vérifiés
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {REVIEWS.map((r, i) => {
          const on = sel === i;
          return (
            <div
              key={r.name}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative overflow-hidden flex gap-3"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? '#ffffff' : '#ffffff',
                borderRadius: 16,
                padding: '12px 14px',
                transition: 'border-color .2s',
              }}
            >
              {on && (
                <motion.span
                  layoutId="rev-bar"
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: 3, background: BLUE, borderRadius: 9999 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Avatar r={r} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                    {r.name}
                  </span>
                  <Stars size={12} value={5} />
                </div>
                <p
                  style={{
                    fontSize: '0.77rem',
                    lineHeight: 1.4,
                    color: MUTED,
                    margin: '3px 0 0',
                    display: '-webkit-box',
                    WebkitLineClamp: on ? 99 : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {r.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 51,
    label: 'Cartes 3 colonnes',
    note: 'Trois avis sélectionnables, en-tête 4.9/127 et bouton « utile ».',
    Component: V51,
  },
  {
    n: 52,
    label: 'Citation vedette',
    note: 'Grande citation mise en avant + liste qui la remplace au clic.',
    Component: V52,
  },
  {
    n: 53,
    label: 'Carrousel',
    note: 'Un avis à la fois, panneau bleu, flèches préc./suiv. et points.',
    Component: V53,
  },
  {
    n: 54,
    label: 'Masonry',
    note: 'Cartes décalées qui se soulèvent et révèlent le texte au survol.',
    Component: V54,
  },
  {
    n: 55,
    label: 'Liste compacte',
    note: 'Lignes scannables qui se déplient, filtre « 5 étoiles ».',
    Component: V55,
  },
  {
    n: 56,
    label: 'Résumé + cartes',
    note: 'Panneau de note 4.9 avec barres de distribution puis cartes.',
    Component: V56,
  },
];
