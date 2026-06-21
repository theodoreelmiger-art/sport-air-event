import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Briefcase,
  Music,
  Store,
  Check,
  Plus,
  Minus,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Target,
  ChevronRight,
} from 'lucide-react';
import { USECASES } from './data.js';

// Shared blue palette (no black anywhere)
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#0b1c3f';
const MUTE = '#5b6f8e';

// One distinct icon per use-case (mapped by index so order is stable).
const UC_ICONS = [Trophy, Briefcase, Music, Store];
const iconAt = (i) => UC_ICONS[i % UC_ICONS.length];

/* =====================================================================
   V72 — Grille d'icônes (2×2)
   Quatre cartes carrées avec gros numéro fantôme en filigrane et chip
   d'icône. La carte sélectionnée se soulève, le chip devient bleu plein
   et un check apparaît. Lift au survol + halo bleu.
   ===================================================================== */
function V72() {
  const [sel, setSel] = useState(0);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <Target size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          Parfaite pour
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 16 }}
      >
        Vos événements, sublimés
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {USECASES.map((u, i) => {
          const Icon = iconAt(i);
          const on = sel === i;
          return (
            <motion.div
              key={u.n}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer relative overflow-hidden"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                padding: '16px 15px 17px',
                boxShadow: on ? '0 14px 30px -16px rgba(0,102,204,.5)' : 'none',
                transition: 'background .22s, border-color .22s, box-shadow .22s',
              }}
            >
              <span
                className="font-display absolute tabular-nums select-none"
                style={{
                  right: 10,
                  bottom: -14,
                  fontSize: '3.4rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: on ? 'rgba(0,102,204,.12)' : 'rgba(11,28,63,.05)',
                  transition: 'color .22s',
                }}
              >
                {u.n}
              </span>
              <div className="relative flex items-start justify-between">
                <motion.span
                  animate={{
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#ffffff' : BLUE,
                  }}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 42, height: 42, borderRadius: 13 }}
                >
                  <Icon size={21} strokeWidth={2.1} />
                </motion.span>
                <motion.span
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.5 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 9999,
                    background: BLUE,
                    color: '#ffffff',
                  }}
                >
                  <Check size={13} strokeWidth={3.2} />
                </motion.span>
              </div>
              <div
                className="font-display relative"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  marginTop: 13,
                  color: INK,
                }}
              >
                {u.title}
              </div>
              <p
                className="relative"
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.4,
                  color: MUTE,
                  margin: '5px 0 0',
                }}
              >
                {u.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V73 — Liste-rangées + stepper
   Rangées éditoriales à filets : numéro fantôme à gauche, icône, titre.
   La rangée sélectionnée tinte, révèle un marqueur bleu et un stepper de
   quantité (stands à prévoir) — stepper UNIQUEMENT sur l'élément choisi.
   Une puce de total vivante en haut.
   ===================================================================== */
function V73() {
  const [sel, setSel] = useState(0);
  const [qty, setQty] = useState(() => USECASES.map(() => 1));
  const total = qty.reduce((a, b) => a + b, 0);

  const setQ = (i, d) =>
    setQty((q) =>
      q.map((v, idx) => (idx === i ? Math.max(1, Math.min(9, v + d)) : v))
    );
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            Parfaite pour
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.35rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Choisissez vos terrains
          </h3>
        </div>
        <motion.div
          key={total}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          className="font-display"
          style={{
            background: BLUE_SOFT,
            color: BLUE_DEEP,
            borderRadius: 9999,
            padding: '6px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {total} stands
        </motion.div>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}` }}>
        {USECASES.map((u, i) => {
          const Icon = iconAt(i);
          const on = sel === i;
          return (
            <div
              key={u.n}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative flex items-center gap-3.5 overflow-hidden"
              style={{
                borderBottom: `1px solid ${LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                padding: '14px 12px 14px 14px',
                transition: 'background .22s',
              }}
            >
              {on && (
                <motion.span
                  layoutId="uc73-bar"
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: 3, background: BLUE }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className="font-display shrink-0 tabular-nums select-none"
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  width: 30,
                  color: on ? BLUE : '#c2d2ea',
                  transition: 'color .22s',
                }}
              >
                {u.n}
              </span>
              <motion.span
                animate={{
                  background: on ? BLUE : BLUE_SOFT,
                  color: on ? '#ffffff' : BLUE,
                }}
                className="flex items-center justify-center shrink-0"
                style={{ width: 36, height: 36, borderRadius: 11 }}
              >
                <Icon size={18} strokeWidth={2.2} />
              </motion.span>
              <span className="min-w-0 flex-1">
                <span
                  className="block"
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.2,
                    fontWeight: on ? 700 : 600,
                    color: INK,
                  }}
                >
                  {u.title}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: '0.8rem',
                    lineHeight: 1.35,
                    color: MUTE,
                    marginTop: 2,
                  }}
                >
                  {u.desc}
                </span>
              </span>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    key="step"
                    initial={{ opacity: 0, width: 0, scale: 0.9 }}
                    animate={{ opacity: 1, width: 'auto', scale: 1 }}
                    exit={{ opacity: 0, width: 0, scale: 0.9 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-1.5 shrink-0 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setQ(i, -1)}
                      aria-label="Diminuer"
                      className="cursor-pointer flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 9,
                        border: `1px solid ${LINE}`,
                        background: '#ffffff',
                        color: BLUE,
                      }}
                    >
                      <Minus size={14} strokeWidth={2.6} />
                    </button>
                    <span
                      className="font-display tabular-nums text-center"
                      style={{
                        minWidth: 18,
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: INK,
                      }}
                    >
                      {qty[i]}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQ(i, 1)}
                      aria-label="Augmenter"
                      className="cursor-pointer flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 9,
                        border: `1px solid ${BLUE}`,
                        background: BLUE,
                        color: '#ffffff',
                      }}
                    >
                      <Plus size={14} strokeWidth={2.6} />
                    </button>
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
   V74 — Bento asymétrique
   La sélection s'ouvre en grande tuile bleu profond (bg-deep) avec
   numéro fantôme clair ; les trois autres restent en cellules blanches
   compactes. Spatial, moderne, un cas mis en lumière à la fois.
   ===================================================================== */
function V74() {
  const [sel, setSel] = useState(0);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSel(i);
    }
  };
  const FeatIcon = iconAt(sel);

  return (
    <div style={{ color: INK }}>
      <div className="mb-4">
        <div className="kicker" style={{ color: BLUE }}>
          Parfaite pour
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.4rem', lineHeight: 1.05, marginTop: 4 }}
        >
          Un cas, en grand
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Featured deep-blue tile */}
        <motion.div
          layout
          className="bg-deep col-span-2 relative overflow-hidden"
          style={{ borderRadius: 22, padding: '20px 20px 22px', color: '#ffffff' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,.14)',
                  color: '#ffffff',
                }}
              >
                <FeatIcon size={24} strokeWidth={2.1} />
              </span>
              <div
                className="font-display"
                style={{
                  fontSize: '1.3rem',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  marginTop: 14,
                }}
              >
                {USECASES[sel].title}
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,.78)',
                  margin: '6px 0 0',
                  maxWidth: '92%',
                }}
              >
                {USECASES[sel].desc}
              </p>
            </motion.div>
          </AnimatePresence>
          <span
            className="font-display absolute tabular-nums select-none"
            style={{
              right: 18,
              top: 12,
              fontSize: '2.6rem',
              fontWeight: 800,
              color: 'rgba(255,255,255,.16)',
            }}
          >
            {USECASES[sel].n}
          </span>
        </motion.div>

        {/* Compact selector cells */}
        {USECASES.map((u, i) => {
          const Icon = iconAt(i);
          const on = sel === i;
          return (
            <motion.div
              key={u.n}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={(e) => keyNav(e, i)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer relative flex flex-col gap-2"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 16,
                padding: '13px 13px 14px',
                boxShadow: on ? '0 12px 26px -16px rgba(0,102,204,.5)' : 'none',
                transition: 'background .2s, border-color .2s, box-shadow .2s',
              }}
            >
              <span className="flex items-center justify-between">
                <motion.span
                  animate={{
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#ffffff' : BLUE,
                  }}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 32, height: 32, borderRadius: 10 }}
                >
                  <Icon size={17} strokeWidth={2.2} />
                </motion.span>
                <AnimatePresence>
                  {on && (
                    <motion.span
                      key="dot"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9999,
                        background: BLUE,
                        color: '#ffffff',
                      }}
                    >
                      <Check size={11} strokeWidth={3.4} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.2,
                  fontWeight: on ? 700 : 600,
                  color: on ? INK : '#3b4f73',
                }}
              >
                {u.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V75 — Onglets + panneau
   Une rangée d'onglets-pastilles (icône + titre) pilote un panneau
   détaillé animé en dessous, avec numéro fantôme géant en fond. Compact,
   navigable, idéal pour comparer les cas un par un.
   ===================================================================== */
function V75() {
  const [sel, setSel] = useState(0);
  const Active = iconAt(sel);

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          Parfaite pour
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 14 }}
      >
        Explorez par usage
      </h3>

      {/* Tabs */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Cas d'usage"
      >
        {USECASES.map((u, i) => {
          const Icon = iconAt(i);
          const on = sel === i;
          return (
            <motion.button
              key={u.n}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setSel(i)}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer inline-flex items-center gap-2 shrink-0"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE : BLUE_MIST,
                color: on ? '#ffffff' : BLUE_DEEP,
                borderRadius: 9999,
                padding: '8px 14px 8px 8px',
                fontSize: '0.84rem',
                fontWeight: 600,
                transition: 'background .2s, border-color .2s, color .2s',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  background: on ? 'rgba(255,255,255,.2)' : '#ffffff',
                  color: on ? '#ffffff' : BLUE,
                }}
              >
                <Icon size={15} strokeWidth={2.3} />
              </span>
              {u.title}
            </motion.button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        className="relative overflow-hidden mt-3"
        style={{
          border: `1px solid ${LINE}`,
          background: BLUE_MIST,
          borderRadius: 20,
          padding: '20px 20px 22px',
          minHeight: 138,
        }}
      >
        <span
          className="font-display absolute tabular-nums select-none"
          style={{
            right: 8,
            bottom: -20,
            fontSize: '5.5rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'rgba(0,102,204,.08)',
          }}
        >
          {USECASES[sel].n}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            className="relative"
          >
            <span
              className="flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: BLUE,
                color: '#ffffff',
              }}
            >
              <Active size={22} strokeWidth={2.1} />
            </span>
            <div className="flex items-center gap-2" style={{ marginTop: 13 }}>
              <span
                className="font-display"
                style={{ fontSize: '1.2rem', lineHeight: 1.1, fontWeight: 700, color: INK }}
              >
                {USECASES[sel].title}
              </span>
              <ArrowUpRight size={17} color={BLUE} strokeWidth={2.4} />
            </div>
            <p
              style={{
                fontSize: '0.86rem',
                lineHeight: 1.45,
                color: MUTE,
                margin: '6px 0 0',
                maxWidth: '90%',
              }}
            >
              {USECASES[sel].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =====================================================================
   V76 — Accordéon empilé
   Quatre lignes qui s'ouvrent en accordéon : une seule ouverte à la fois.
   L'en-tête garde chip d'icône + numéro fantôme ; le corps déplie la
   description avec une flèche-CTA. Chevron qui pivote, hauteur animée.
   ===================================================================== */
function V76() {
  const [open, setOpen] = useState(0);
  const keyNav = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((o) => (o === i ? -1 : i));
    }
  };

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <Target size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          Parfaite pour
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 14 }}
      >
        Déroulez chaque usage
      </h3>

      <div className="flex flex-col gap-2.5">
        {USECASES.map((u, i) => {
          const Icon = iconAt(i);
          const on = open === i;
          return (
            <div
              key={u.n}
              role="button"
              tabIndex={0}
              aria-expanded={on}
              onClick={() => setOpen((o) => (o === i ? -1 : i))}
              onKeyDown={(e) => keyNav(e, i)}
              className="cursor-pointer relative overflow-hidden"
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                transition: 'background .22s, border-color .22s',
              }}
            >
              <span
                className="font-display absolute tabular-nums select-none"
                style={{
                  right: 12,
                  top: -6,
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: on ? 'rgba(0,102,204,.1)' : 'rgba(11,28,63,.045)',
                  transition: 'color .22s',
                }}
              >
                {u.n}
              </span>

              <div
                className="relative flex items-center gap-3.5"
                style={{ padding: '13px 14px' }}
              >
                <motion.span
                  animate={{
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#ffffff' : BLUE,
                  }}
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 38, height: 38, borderRadius: 12 }}
                >
                  <Icon size={19} strokeWidth={2.2} />
                </motion.span>
                <span
                  className="font-display flex-1 min-w-0"
                  style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.2,
                    fontWeight: 700,
                    color: INK,
                  }}
                >
                  {u.title}
                </span>
                <motion.span
                  animate={{ rotate: on ? 90 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-center justify-center shrink-0"
                  style={{ color: on ? BLUE : '#a9bcd8' }}
                >
                  <ChevronRight size={19} strokeWidth={2.6} />
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    key="body"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.26 }}
                    className="relative overflow-hidden"
                  >
                    <div style={{ padding: '0 16px 15px 66px' }}>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          lineHeight: 1.45,
                          color: MUTE,
                          margin: 0,
                        }}
                      >
                        {u.desc}
                      </p>
                      <div
                        className="inline-flex items-center gap-1.5"
                        style={{
                          marginTop: 11,
                          color: BLUE,
                          fontSize: '0.83rem',
                          fontWeight: 700,
                        }}
                      >
                        Voir un exemple
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </div>
                    </div>
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

export const variants = [
  {
    n: 72,
    label: 'Grille d’icônes',
    note: 'Grille 2×2 avec numéro fantôme, chip d’icône qui se remplit, lift et halo bleu au survol.',
    Component: V72,
  },
  {
    n: 73,
    label: 'Rangées + stepper',
    note: 'Rangées à filets avec marqueur bleu et stepper de quantité uniquement sur le cas sélectionné.',
    Component: V73,
  },
  {
    n: 74,
    label: 'Bento',
    note: 'Bento asymétrique : le cas choisi s’ouvre en grande tuile bleu profond, les autres en cellules.',
    Component: V74,
  },
  {
    n: 75,
    label: 'Onglets + panneau',
    note: 'Onglets-pastilles qui pilotent un panneau détaillé animé avec gros numéro fantôme en fond.',
    Component: V75,
  },
  {
    n: 76,
    label: 'Accordéon',
    note: 'Accordéon empilé, une ligne ouverte à la fois, chevron pivotant et CTA flèche au déploiement.',
    Component: V76,
  },
];
