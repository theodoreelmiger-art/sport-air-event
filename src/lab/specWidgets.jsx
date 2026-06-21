import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Wind,
  Gauge,
  Timer,
  Sparkles,
  ShieldCheck,
  Award,
  Package,
  Check,
  ChevronDown,
  Ruler,
  Flame,
  Droplet,
  Info,
} from 'lucide-react';
import { SPECS } from './data.js';

/* ─────────────────────────────────────────────────────────────────────
   Shared blue palette — white & blue only, NO black anywhere.
   ───────────────────────────────────────────────────────────────────── */
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#0b1c3f';
const INK_2 = '#2c3e63';

// Deep-blue panel gradient (navy, never black) for accent surfaces.
const DEEP = 'radial-gradient(120% 130% at 18% 0%, #0a3d8f 0%, #0b2e6b 52%, #07224f 100%)';

/* One lucide icon per SPECS row, in data order.
   Matériau / Pression / Vent / Gonflage / Impression / Certif / Garantie / Poids */
const SPEC_ICONS = [Layers, Gauge, Wind, Timer, Sparkles, Flame, ShieldCheck, Package];

// Compact "headline" version of each value for the big bento number.
const SPEC_BIG = [
  { big: 'Oxford 600D', tail: '+ TPU' },
  { big: '0.35', tail: 'bar' },
  { big: '70', tail: 'km/h' },
  { big: '60-90', tail: 'sec' },
  { big: 'HD 360°', tail: 'UV' },
  { big: 'M2', tail: 'anti-feu' },
  { big: '5', tail: 'ans' },
  { big: '~12', tail: 'kg' },
];

/* =====================================================================
   V67 — Bento avec grand panneau bleu profond
   Grille bento : une grande tuile deep-blue (valeur sélectionnée en
   géant) + petites tuiles cliquables. Sélection mise en avant.
   ===================================================================== */
function V67() {
  const [active, setActive] = useState(0);
  const Big = SPEC_ICONS[active];
  const head = SPEC_BIG[active];

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            Fiche technique
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Caractéristiques
          </h3>
        </div>
        <span
          className="inline-flex items-center justify-center"
          style={{ width: 34, height: 34, borderRadius: 11, background: BLUE_SOFT, color: BLUE }}
        >
          <Ruler size={18} strokeWidth={2.2} />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Big deep-blue accent panel — shows the selected spec in large type */}
        <motion.div
          layout
          className="col-span-2"
          style={{
            background: DEEP,
            borderRadius: 22,
            padding: '22px 22px 20px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            className="inline-flex items-center justify-center mb-4"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#ffffff',
            }}
          >
            <Big size={22} strokeWidth={2.2} />
          </span>

          <div
            style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bcd4f5' }}
          >
            {SPECS[active].label}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="font-display flex items-end gap-2 flex-wrap"
              style={{ marginTop: 6, lineHeight: 0.95 }}
            >
              <span style={{ fontSize: 'clamp(2.1rem, 11vw, 3rem)', letterSpacing: '-0.03em' }}>
                {head.big}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 5vw, 1.4rem)', color: '#9fc2f0', paddingBottom: 6 }}>
                {head.tail}
              </span>
            </motion.div>
          </AnimatePresence>

          <div style={{ marginTop: 10, fontSize: '0.82rem', color: '#d7e6fa', lineHeight: 1.4 }}>
            {SPECS[active].value}
          </div>
        </motion.div>

        {/* Small clickable spec tiles */}
        {SPECS.map((s, i) => {
          if (i === active) return null;
          const Icon = SPEC_ICONS[i];
          return (
            <motion.button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="cursor-pointer text-left"
              style={{
                border: `1px solid ${LINE}`,
                background: '#ffffff',
                borderRadius: 16,
                padding: '13px 14px',
                transition: 'border-color .2s, background .2s',
              }}
            >
              <span
                className="inline-flex items-center justify-center mb-2.5"
                style={{ width: 30, height: 30, borderRadius: 9, background: BLUE_MIST, color: BLUE }}
              >
                <Icon size={16} strokeWidth={2.3} />
              </span>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: INK_2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.label}
              </div>
              <div
                className="font-display"
                style={{ fontSize: '0.95rem', lineHeight: 1.1, marginTop: 3, color: INK }}
              >
                {SPEC_BIG[i].big}{' '}
                <span style={{ color: BLUE, fontSize: '0.78em' }}>{SPEC_BIG[i].tail}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V68 — Tableau 2 colonnes
   Tableau spécification propre (label / valeur) avec lignes survolables
   et clic pour épingler la ligne active. Une ligne épinglée s'éclaire.
   ===================================================================== */
function V68() {
  const [pinned, setPinned] = useState(null);

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="inline-flex items-center justify-center"
          style={{ width: 32, height: 32, borderRadius: 10, background: BLUE_SOFT, color: BLUE }}
        >
          <Info size={17} strokeWidth={2.3} />
        </span>
        <h3 className="font-display" style={{ fontSize: '1.25rem', lineHeight: 1 }}>
          Spécifications détaillées
        </h3>
      </div>

      <div
        style={{
          border: `1px solid ${LINE}`,
          borderRadius: 18,
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        {SPECS.map((s, i) => {
          const on = pinned === i;
          return (
            <motion.div
              key={s.label}
              role="button"
              tabIndex={0}
              onClick={() => setPinned(on ? null : i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPinned(on ? null : i);
                }
              }}
              whileTap={{ scale: 0.995 }}
              className="cursor-pointer grid items-center"
              style={{
                gridTemplateColumns: '40% 60%',
                borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                transition: 'background .18s',
                outline: 'none',
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{
                  padding: '13px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: on ? BLUE_DEEP : INK_2,
                  borderRight: `1px solid ${LINE}`,
                }}
              >
                <motion.span
                  animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ width: 16, height: 16, borderRadius: 5, background: BLUE, color: '#fff' }}
                >
                  <Check size={11} strokeWidth={3} />
                </motion.span>
                {s.label}
              </div>
              <div
                className="font-display"
                style={{
                  padding: '13px 14px',
                  fontSize: '0.92rem',
                  lineHeight: 1.25,
                  color: INK,
                }}
              >
                {s.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        className="flex items-center gap-2 mt-3"
        style={{ fontSize: '0.76rem', fontWeight: 600, color: INK_2 }}
      >
        <Sparkles size={14} strokeWidth={2.3} style={{ color: BLUE, flexShrink: 0 }} />
        {pinned === null
          ? 'Touchez une ligne pour l’épingler.'
          : `« ${SPECS[pinned].label} » épinglé.`}
      </div>
    </div>
  );
}

/* =====================================================================
   V69 — Cartes spec à icônes
   Grille 2 colonnes de cartes icône + valeur en grand (font-display).
   Survol relève la carte ; clic la sélectionne (anneau bleu).
   ===================================================================== */
function V69() {
  const [active, setActive] = useState(6); // "Garantie" by default

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            En un coup d’œil
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Performances clés
          </h3>
        </div>
        <span
          className="inline-flex items-center justify-center"
          style={{ width: 34, height: 34, borderRadius: 11, background: BLUE_SOFT, color: BLUE }}
        >
          <Award size={18} strokeWidth={2.2} />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {SPECS.map((s, i) => {
          const Icon = SPEC_ICONS[i];
          const on = i === active;
          const head = SPEC_BIG[i];
          return (
            <motion.div
              key={s.label}
              role="button"
              tabIndex={0}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="cursor-pointer"
              style={{
                border: `1.5px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 18,
                padding: '15px 14px 14px',
                outline: 'none',
                transition: 'border-color .2s, background .2s',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#ffffff' : BLUE,
                    transition: 'background .2s, color .2s',
                  }}
                >
                  <Icon size={19} strokeWidth={2.2} />
                </span>
                <motion.span
                  animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center justify-center"
                  style={{ width: 20, height: 20, borderRadius: 7, background: BLUE, color: '#fff' }}
                >
                  <Check size={13} strokeWidth={3} />
                </motion.span>
              </div>
              <div
                style={{ fontSize: '0.68rem', fontWeight: 700, color: INK_2, textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                {s.label}
              </div>
              <div
                className="font-display"
                style={{ fontSize: '1.15rem', lineHeight: 1.05, marginTop: 4, letterSpacing: '-0.02em', color: INK }}
              >
                {head.big}{' '}
                <span style={{ color: BLUE, fontSize: '0.72em' }}>{head.tail}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V70 — Lignes empilées dépliables (accordion)
   Chaque spec est une rangée pliée (label + valeur courte). Clic
   déplie une description complète. Une seule ouverte à la fois.
   ===================================================================== */
const SPEC_DETAIL = [
  'Toile Oxford 600D enduite TPU : résistance à l’abrasion et étanchéité longue durée.',
  'Soudure haute fréquence et gonflage à 0.35 bar pour une rigidité maximale de la structure.',
  'Testée et stabilisée jusqu’à 70 km/h avec le kit de lestage et d’ancrage fourni.',
  'Gonflage complet en 60 à 90 secondes avec une soufflerie standard, par une seule personne.',
  'Sublimation HD sur 360°, encres résistantes aux UV pour des couleurs durables en extérieur.',
  'Toile certifiée anti-feu M2 et traitée anti-UV — conforme aux exigences événementielles.',
  'Garantie 5 ans couvrant la structure portante et l’impression contre tout défaut.',
  'Poids plume d’environ 12 kg en 4×4m : transport et installation sans effort.',
];

function V70() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="inline-flex items-center justify-center"
          style={{ width: 32, height: 32, borderRadius: 10, background: BLUE_SOFT, color: BLUE }}
        >
          <Layers size={17} strokeWidth={2.3} />
        </span>
        <h3 className="font-display" style={{ fontSize: '1.25rem', lineHeight: 1 }}>
          Tout sur la structure
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {SPECS.map((s, i) => {
          const on = open === i;
          const Icon = SPEC_ICONS[i];
          return (
            <div
              key={s.label}
              style={{
                border: `1px solid ${on ? BLUE : LINE}`,
                background: on ? BLUE_MIST : '#ffffff',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'border-color .2s, background .2s',
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(on ? -1 : i)}
                className="cursor-pointer w-full flex items-center gap-3 text-left"
                style={{ padding: '12px 14px', background: 'transparent' }}
              >
                <span
                  className="inline-flex items-center justify-center shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 11,
                    background: on ? BLUE : BLUE_SOFT,
                    color: on ? '#fff' : BLUE,
                    transition: 'background .2s, color .2s',
                  }}
                >
                  <Icon size={17} strokeWidth={2.3} />
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: INK_2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {s.label}
                  </div>
                  <div
                    className="font-display"
                    style={{ fontSize: '0.95rem', lineHeight: 1.15, color: INK, marginTop: 1 }}
                  >
                    {s.value}
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: on ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ color: BLUE }}
                >
                  <ChevronDown size={18} strokeWidth={2.4} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '0 14px 13px 61px',
                        fontSize: '0.82rem',
                        lineHeight: 1.5,
                        color: INK_2,
                      }}
                    >
                      {SPEC_DETAIL[i]}
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

/* =====================================================================
   V71 — Liste scindée (rail + détail)
   Colonne gauche : rail de labels sélectionnables. Colonne droite :
   grand panneau valeur (font-display) + badges. Synchronisé.
   ===================================================================== */
const SPEC_BADGES = [
  ['Oxford 600D', 'TPU', 'Étanche'],
  ['0.35 bar', 'Haute pression'],
  ['70 km/h', 'Lestage inclus'],
  ['60-90 s', '1 personne'],
  ['Sublimation', '360°', 'Anti-UV'],
  ['M2', 'Anti-feu', 'Anti-UV'],
  ['5 ans', 'Structure', 'Impression'],
  ['~12 kg', '4×4m'],
];
const BADGE_ICONS = [Droplet, Gauge, Wind, Timer, Sparkles, Flame, ShieldCheck, Package];

function V71() {
  const [active, setActive] = useState(0);
  const Icon = SPEC_ICONS[active];
  const BadgeIcon = BADGE_ICONS[active];
  const head = SPEC_BIG[active];

  return (
    <div style={{ color: INK }}>
      <div className="kicker mb-3" style={{ color: BLUE }}>
        Caractéristiques techniques
      </div>

      <div
        className="grid gap-2.5"
        style={{ gridTemplateColumns: 'minmax(120px, 0.85fr) 1.15fr' }}
      >
        {/* Left rail — selectable label list */}
        <div
          style={{
            border: `1px solid ${LINE}`,
            borderRadius: 18,
            overflow: 'hidden',
            background: '#ffffff',
            alignSelf: 'start',
          }}
        >
          {SPECS.map((s, i) => {
            const on = i === active;
            const RIcon = SPEC_ICONS[i];
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                className="cursor-pointer w-full flex items-center gap-2 text-left relative"
                style={{
                  padding: '11px 12px',
                  borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                  background: on ? BLUE_MIST : 'transparent',
                  transition: 'background .18s',
                }}
              >
                {on && (
                  <motion.span
                    layoutId="v71-rail"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      borderRadius: 9999,
                      background: BLUE,
                    }}
                  />
                )}
                <span
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ width: 26, height: 26, borderRadius: 8, background: on ? BLUE : BLUE_SOFT, color: on ? '#fff' : BLUE, transition: 'background .2s, color .2s' }}
                >
                  <RIcon size={14} strokeWidth={2.4} />
                </span>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: on ? 700 : 600,
                    color: on ? BLUE_DEEP : INK_2,
                    lineHeight: 1.15,
                  }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right — big detail panel for the active spec */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.26 }}
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              background: BLUE_MIST,
              padding: '18px 16px',
            }}
          >
            <span
              className="inline-flex items-center justify-center mb-3"
              style={{ width: 42, height: 42, borderRadius: 13, background: '#ffffff', border: `1px solid ${LINE}`, color: BLUE }}
            >
              <Icon size={21} strokeWidth={2.2} />
            </span>

            <div
              style={{ fontSize: '0.7rem', fontWeight: 700, color: BLUE_DEEP, textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              {SPECS[active].label}
            </div>

            <div
              className="font-display flex items-end gap-1.5 flex-wrap"
              style={{ marginTop: 5, lineHeight: 0.95 }}
            >
              <span style={{ fontSize: 'clamp(1.8rem, 9vw, 2.5rem)', letterSpacing: '-0.03em', color: INK }}>
                {head.big}
              </span>
              <span style={{ fontSize: 'clamp(0.9rem, 4.5vw, 1.2rem)', color: BLUE, paddingBottom: 5 }}>
                {head.tail}
              </span>
            </div>

            <div style={{ marginTop: 8, fontSize: '0.82rem', lineHeight: 1.4, color: INK_2 }}>
              {SPECS[active].value}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {SPEC_BADGES[active].map((b, bi) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1"
                  style={{
                    border: `1px solid ${LINE}`,
                    background: '#ffffff',
                    borderRadius: 9999,
                    padding: '4px 9px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: INK_2,
                  }}
                >
                  {bi === 0 && <BadgeIcon size={11} strokeWidth={2.6} style={{ color: BLUE }} />}
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 67,
    label: 'Bento panneau bleu',
    note: 'Grille bento avec grande tuile deep-blue ; la valeur sélectionnée passe en géant.',
    Component: V67,
  },
  {
    n: 68,
    label: 'Tableau 2 colonnes',
    note: 'Tableau label/valeur épuré, lignes survolables et épinglables d’un clic.',
    Component: V68,
  },
  {
    n: 69,
    label: 'Cartes spec à icônes',
    note: 'Cartes 2 colonnes icône + valeur en grand, sélection avec anneau bleu.',
    Component: V69,
  },
  {
    n: 70,
    label: 'Lignes dépliables',
    note: 'Rangées empilées en accordéon : un clic révèle la description complète.',
    Component: V70,
  },
  {
    n: 71,
    label: 'Liste scindée',
    note: 'Rail de labels à gauche, grand panneau valeur + badges synchronisé à droite.',
    Component: V71,
  },
];
