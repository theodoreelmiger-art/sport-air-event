import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  Search,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  Clock,
  Tag,
  Info,
} from 'lucide-react';
import { FAQS } from './data.js';

/* Shared blue palette — white & blue only, never black. */
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#15294a';
const INK_2 = '#3a4d70';

/* Smooth height transition shared by every accordion body. */
const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
};

/* =====================================================================
   V57 — Accordéon hairline
   Ultra-sober list separated by blue hairlines. No boxes: just a
   chevron that rotates and a question that slides up its answer.
   Single-open behaviour (classic FAQ).
   ===================================================================== */
function V57() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ color: INK }}>
      <div className="mb-4">
        <div
          className="kicker"
          style={{
            color: BLUE,
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Questions fréquentes
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.4rem', lineHeight: 1.05, marginTop: 4 }}
        >
          Tout savoir avant de commander
        </h3>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}` }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${LINE}` }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="cursor-pointer"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 2px',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                <span
                  className="font-display"
                  style={{
                    flex: 1,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: isOpen ? BLUE_DEEP : INK,
                    transition: 'color 0.2s',
                  }}
                >
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    color: isOpen ? BLUE : INK_2,
                  }}
                >
                  <ChevronDown size={18} strokeWidth={2.2} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div {...collapse} style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        margin: 0,
                        padding: '0 40px 18px 2px',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        color: INK_2,
                      }}
                    >
                      {f.a}
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
   V58 — Accordéon cartes
   Each question is its own rounded card. The open card lifts, tints
   blue and shows a numbered badge. Allows multiple open at once.
   ===================================================================== */
function V58() {
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = (i) =>
    setOpen((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-3 mb-4">
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 12,
            background: BLUE_SOFT,
            color: BLUE,
            flexShrink: 0,
          }}
        >
          <MessageCircle size={20} strokeWidth={2.2} />
        </div>
        <div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05 }}
          >
            Vos questions, nos réponses
          </h3>
          <div style={{ fontSize: '0.82rem', color: INK_2, marginTop: 2 }}>
            Touchez une carte pour la déplier
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQS.map((f, i) => {
          const isOpen = open.has(i);
          return (
            <motion.div
              key={i}
              animate={{
                y: isOpen ? -1 : 0,
                backgroundColor: isOpen ? BLUE_MIST : '#ffffff',
              }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 18,
                border: `1px solid ${isOpen ? BLUE_SOFT : LINE}`,
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="cursor-pointer"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                <span
                  className="font-display"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: 9,
                    flexShrink: 0,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    background: isOpen ? BLUE : '#fff',
                    color: isOpen ? '#fff' : BLUE_DEEP,
                    border: `1px solid ${isOpen ? BLUE : LINE}`,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-display"
                  style={{
                    flex: 1,
                    fontSize: '0.96rem',
                    fontWeight: 600,
                    color: isOpen ? BLUE_DEEP : INK,
                  }}
                >
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.26 }}
                  style={{ color: isOpen ? BLUE : INK_2, flexShrink: 0 }}
                >
                  <ChevronRight size={18} strokeWidth={2.4} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div {...collapse} style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        margin: 0,
                        padding: '0 16px 16px 56px',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: INK_2,
                      }}
                    >
                      {f.a}
                    </p>
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
   V59 — Grille 2 colonnes
   FAQ laid out as a 2-column tile grid (collapses to 1 col under
   ~420px via flex-wrap). Selected tile spans full width and glows.
   ===================================================================== */
function V59() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div
            className="kicker"
            style={{
              color: BLUE,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            FAQ
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.3rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Réponses en un coup d’œil
          </h3>
        </div>
        <Sparkles size={22} style={{ color: BLUE, flexShrink: 0 }} />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              layout
              transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
              style={{
                flex: isOpen ? '1 1 100%' : '1 1 calc(50% - 5px)',
                minWidth: 150,
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="cursor-pointer"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  textAlign: 'left',
                  padding: '13px 14px',
                  borderRadius: 16,
                  background: isOpen ? BLUE : BLUE_MIST,
                  border: `1px solid ${isOpen ? BLUE : LINE}`,
                  transition: 'background 0.25s, border-color 0.25s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      flex: 1,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: isOpen ? '#fff' : INK,
                    }}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.26 }}
                    style={{
                      color: isOpen ? '#fff' : BLUE,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <Plus size={17} strokeWidth={2.6} />
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div {...collapse} style={{ overflow: 'hidden' }}>
                      <p
                        style={{
                          margin: 0,
                          paddingTop: 10,
                          fontSize: '0.88rem',
                          lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.92)',
                        }}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================================
   V60 — Plus / Minus avec recherche
   Live-filtered FAQ with a search field; each row uses an animated
   plus→minus toggle inside a square chip. Empty-state when no match.
   ===================================================================== */
function V60() {
  const [open, setOpen] = useState(-1);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filtered = FAQS.map((f, i) => ({ ...f, i })).filter(
    (f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  );

  return (
    <div style={{ color: INK }}>
      <h3
        className="font-display"
        style={{ fontSize: '1.35rem', lineHeight: 1.05, marginBottom: 12 }}
      >
        Centre d’aide
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 14px',
          borderRadius: 14,
          background: BLUE_MIST,
          border: `1px solid ${LINE}`,
          marginBottom: 14,
        }}
      >
        <Search size={18} style={{ color: BLUE, flexShrink: 0 }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une question…"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '0.92rem',
            color: INK,
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="cursor-pointer"
            style={{
              border: 'none',
              background: 'transparent',
              color: INK_2,
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: 0,
            }}
          >
            Effacer
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((f) => {
            const isOpen = open === f.i;
            return (
              <motion.div
                key={f.i}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${isOpen ? BLUE_SOFT : LINE}`,
                  background: isOpen ? BLUE_MIST : '#fff',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : f.i)}
                  className="cursor-pointer"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '13px 14px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      flex: 1,
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: isOpen ? BLUE_DEEP : INK,
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 9,
                      flexShrink: 0,
                      background: isOpen ? BLUE : '#fff',
                      color: isOpen ? '#fff' : BLUE,
                      border: `1px solid ${isOpen ? BLUE : LINE}`,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isOpen ? (
                        <motion.span
                          key="minus"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ display: 'grid' }}
                        >
                          <Minus size={16} strokeWidth={2.6} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="plus"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ display: 'grid' }}
                        >
                          <Plus size={16} strokeWidth={2.6} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div {...collapse} style={{ overflow: 'hidden' }}>
                      <p
                        style={{
                          margin: 0,
                          padding: '0 14px 14px 14px',
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          color: INK_2,
                        }}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '24px 12px',
              color: INK_2,
              fontSize: '0.9rem',
            }}
          >
            <Info
              size={26}
              style={{ color: BLUE, margin: '0 auto 8px' }}
            />
            Aucune question ne correspond à «&nbsp;{query}&nbsp;».
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   V61 — Catégories rail gauche
   Left rail of category chips (icon + label); selecting one filters
   the answers panel on the right. Each panel row is its own
   open/close accordion. Stacks to a top row of chips under ~420px.
   ===================================================================== */
const CATEGORIES = [
  { label: 'Livraison', icon: Truck, match: [0, 1] },
  { label: 'Garantie', icon: ShieldCheck, match: [3] },
  { label: 'Installation', icon: Clock, match: [4] },
  { label: 'Sur mesure', icon: Tag, match: [2, 5] },
];

function V61() {
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState(CATEGORIES[0].match[0]);

  const active = CATEGORIES[cat];
  const rows = active.match.map((idx) => ({ ...FAQS[idx], i: idx }));

  const pickCat = (c) => {
    setCat(c);
    setOpen(CATEGORIES[c].match[0]);
  };

  return (
    <div style={{ color: INK }}>
      <h3
        className="font-display"
        style={{ fontSize: '1.3rem', lineHeight: 1.05, marginBottom: 14 }}
      >
        Aide par catégorie
      </h3>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 14,
          alignItems: 'flex-start',
        }}
      >
        {/* Left rail */}
        <div
          style={{
            flex: '1 1 130px',
            minWidth: 130,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {CATEGORIES.map((c, ci) => {
            const isActive = cat === ci;
            const Icon = c.icon;
            return (
              <button
                key={ci}
                type="button"
                onClick={() => pickCat(ci)}
                className="cursor-pointer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '11px 12px',
                  borderRadius: 12,
                  textAlign: 'left',
                  background: isActive ? BLUE : '#fff',
                  border: `1px solid ${isActive ? BLUE : LINE}`,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <span
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    color: isActive ? '#fff' : BLUE,
                  }}
                >
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: isActive ? '#fff' : INK,
                  }}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Answers panel */}
        <div
          style={{
            flex: '2 1 220px',
            minWidth: 200,
            borderRadius: 18,
            border: `1px solid ${LINE}`,
            background: BLUE_MIST,
            padding: 8,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cat}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.24 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              {rows.map((f) => {
                const isOpen = open === f.i;
                return (
                  <div
                    key={f.i}
                    style={{
                      borderRadius: 12,
                      background: '#fff',
                      border: `1px solid ${isOpen ? BLUE_SOFT : LINE}`,
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : f.i)}
                      className="cursor-pointer"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '11px 12px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          flex: 1,
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          color: isOpen ? BLUE_DEEP : INK,
                        }}
                      >
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.26 }}
                        style={{ color: isOpen ? BLUE : INK_2, flexShrink: 0 }}
                      >
                        <ChevronDown size={16} strokeWidth={2.4} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div {...collapse} style={{ overflow: 'hidden' }}>
                          <p
                            style={{
                              margin: 0,
                              padding: '0 12px 12px 12px',
                              fontSize: '0.86rem',
                              lineHeight: 1.6,
                              color: INK_2,
                            }}
                          >
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 57,
    label: 'Hairline',
    note: 'Liste sobre séparée par des filets bleus, chevron qui pivote, ouverture unique.',
    Component: V57,
  },
  {
    n: 58,
    label: 'Cartes',
    note: 'Chaque question est une carte arrondie numérotée qui se teinte en bleu à l’ouverture.',
    Component: V58,
  },
  {
    n: 59,
    label: 'Grille 2 colonnes',
    note: 'Tuiles sur deux colonnes ; la tuile ouverte s’étend en pleine largeur et passe en bleu.',
    Component: V59,
  },
  {
    n: 60,
    label: 'Plus / Minus',
    note: 'Centre d’aide avec recherche en direct et bascule plus→moins animée.',
    Component: V60,
  },
  {
    n: 61,
    label: 'Rail catégories',
    note: 'Rail de catégories à gauche qui filtre un panneau de réponses dépliables à droite.',
    Component: V61,
  },
];
