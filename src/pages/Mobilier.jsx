import { useState, useMemo } from 'react';
import {
  Check, Plus, Minus, ArrowRight, FileText, Tag, Sparkles,
  Armchair, Table2, Wine, Layers,
} from 'lucide-react';
import {
  Reveal, RevealStagger, staggerChild, Magnetic, motion,
} from '../lib/motion.jsx';
import { AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';
import { CONFIGURATORS } from '../data/configurators.js';
import { useT } from '../lib/i18n.jsx';

const EASE = [0.16, 1, 0.3, 1];
const fmt = (n) => '€ ' + n.toLocaleString('fr-FR');

/* EN dictionary for the French labels coming from ../data/configurators.js */
const EN = {
  'Mobilier Gonflable': 'Inflatable Furniture',
  'Assises': 'Seating',
  'Tables': 'Tables',
  'Bars': 'Bars',
  'Accessoires': 'Accessories',
  'Pouf gonflable imprimé': 'Printed inflatable pouf',
  'Chaise basse': 'Low chair',
  'Sofa 1 place': 'One-seater sofa',
  'Sofa 2 places': 'Two-seater sofa',
  'Table basse': 'Coffee table',
  'Table haute': 'High table',
  'Bar gonflable droit': 'Straight inflatable bar',
  'Pompe 220 volts': '220-volt pump',
  'Impression HD': 'HD printing',
  'Matériaux premium': 'Premium materials',
  'Montage rapide': 'Quick setup',
  'Design 3D gratuit': 'Free 3D design',
};
const tr = (t, name) => t(name, EN[name] || name);

const DATA = CONFIGURATORS.mobilier;
const CAT_ICON = { Assises: Armchair, Tables: Table2, Bars: Wine };

/* Maps each furniture name to its render kind; clicking a row swaps the sticky image. */
const FURNITURE_KIND = {
  'Pouf gonflable imprimé': 'pouf',
  'Chaise basse': 'chaise',
  'Sofa 1 place': 'sofa1',
  'Sofa 2 places': 'sofa2',
  'Table basse': 'tableBasse',
  'Table haute': 'tableHaute',
  'Bar gonflable droit': 'bar',
  'Pompe 220 volts': 'pompe',
};

/* The Pouf is the only real base44 render (a real photo). Every other piece uses a
   matching white-inflatable render (volume gradient + SPORT AIR EVENT wordmark + soft
   contact shadow) so each furniture shows its OWN visual when selected. */
const FURNITURE_PHOTO = {
  pouf: 'images/mobilier/pouf.png',
  chaise: 'images/mobilier/chaise.png',
  sofa1: 'images/mobilier/sofa1.png',
  sofa2: 'images/mobilier/sofa2.png',
  tableBasse: 'images/mobilier/table-basse.png',
  tableHaute: 'images/mobilier/table-haute.png',
  bar: 'images/mobilier/bar.png',
};

/* Small SPORT AIR EVENT wordmark, faithful to the real logo (navy + red + swoosh). */
function Mark({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <text x="0" y="0" fontFamily="'Schibsted Grotesk',system-ui,sans-serif" fontStyle="italic" fontWeight="800" fontSize="17" letterSpacing="-0.3">
        <tspan fill="#06245f">SPORT</tspan><tspan dx="2" fill="#e11d2a">AIR</tspan>
      </text>
      <text x="1" y="14" fontFamily="'Schibsted Grotesk',system-ui,sans-serif" fontStyle="italic" fontWeight="800" fontSize="12" letterSpacing="1.5" fill="#06245f">EVENT</text>
      <path d="M0 20 Q44 12 88 20" fill="none" stroke="#e11d2a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M0 23.5 Q44 15.5 88 23.5" fill="none" stroke="#1f4fa0" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}

function FurnitureRender({ kind }) {
  if (FURNITURE_PHOTO[kind]) {
    return (
      <img src={FURNITURE_PHOTO[kind]} alt="" className="block w-full h-auto"
        style={{ maxWidth: 380, filter: 'drop-shadow(0 16px 20px rgba(0,30,90,0.15))' }} />
    );
  }
  const B = { fill: 'url(#fbody)', stroke: '#bcd3ef', strokeWidth: 2.5, strokeLinejoin: 'round' };
  const T = { fill: 'url(#ftop)', stroke: '#bcd3ef', strokeWidth: 2.5, strokeLinejoin: 'round' };
  const seam = { stroke: '#c3d7f0', strokeWidth: 2, fill: 'none', opacity: 0.75, strokeLinecap: 'round' };
  const shadow = <ellipse cx="160" cy="214" rx="106" ry="13" fill="rgba(0,40,100,0.12)" />;
  const SHAPES = {
    chaise: (<>{shadow}
      <rect x="84" y="70" width="152" height="58" rx="26" {...B} />
      <rect x="66" y="120" width="188" height="74" rx="30" {...B} />
      <path d="M86 158 H234" {...seam} />
      <Mark x="116" y="150" s={0.92} /></>),
    sofa1: (<>{shadow}
      <rect x="84" y="66" width="152" height="56" rx="24" {...B} />
      <rect x="68" y="112" width="184" height="78" rx="28" {...B} />
      <rect x="58" y="100" width="34" height="90" rx="16" {...B} />
      <rect x="228" y="100" width="34" height="90" rx="16" {...B} />
      <Mark x="118" y="146" s={0.9} /></>),
    sofa2: (<>{shadow}
      <rect x="50" y="66" width="220" height="54" rx="24" {...B} />
      <rect x="36" y="110" width="248" height="80" rx="28" {...B} />
      <rect x="26" y="98" width="34" height="92" rx="16" {...B} />
      <rect x="260" y="98" width="34" height="92" rx="16" {...B} />
      <path d="M160 118 V184" {...seam} />
      <Mark x="116" y="150" s={0.9} /></>),
    tableBasse: (<>{shadow}
      <ellipse cx="160" cy="170" rx="58" ry="15" {...B} />
      <rect x="138" y="98" width="44" height="74" rx="14" {...B} />
      <ellipse cx="160" cy="96" rx="92" ry="26" {...T} />
      <ellipse cx="160" cy="96" rx="92" ry="26" {...seam} /></>),
    tableHaute: (<>{shadow}
      <ellipse cx="160" cy="194" rx="52" ry="14" {...B} />
      <rect x="146" y="74" width="28" height="120" rx="12" {...B} />
      <ellipse cx="160" cy="72" rx="72" ry="21" {...T} />
      <ellipse cx="160" cy="72" rx="72" ry="21" {...seam} /></>),
    bar: (<>{shadow}
      <rect x="52" y="86" width="216" height="22" rx="10" {...T} />
      <rect x="62" y="104" width="196" height="92" rx="16" {...B} />
      <path d="M127 110 V190 M193 110 V190" {...seam} />
      <Mark x="118" y="150" s={0.95} /></>),
    pompe: (<>{shadow}
      <rect x="122" y="98" width="76" height="80" rx="14" {...B} />
      <rect x="114" y="84" width="92" height="18" rx="9" {...T} />
      <rect x="152" y="60" width="10" height="26" rx="5" fill="#1f4fa0" />
      <path d="M198 150 q44 0 44 -34" fill="none" stroke="#1f4fa0" strokeWidth="6" strokeLinecap="round" />
      <circle cx="242" cy="112" r="7" fill="#1f4fa0" />
      <text x="160" y="148" textAnchor="middle" fontFamily="'Schibsted Grotesk',sans-serif" fontWeight="800" fontSize="15" fill="#06245f">220V</text></>),
  };
  return (
    <svg viewBox="0 0 320 250" width="100%" style={{ maxWidth: 380, display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id="fbody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e8f1fc" /></linearGradient>
        <linearGradient id="ftop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#eef5fd" /></linearGradient>
      </defs>
      {SHAPES[kind] || SHAPES.chaise}
    </svg>
  );
}

/* ── Quantity stepper — shown only on a selected row ── */
function Stepper({ qty, onInc, onDec }) {
  const t = useT();
  const base = 'w-8 h-8 grid place-items-center rounded-full cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed';
  const style = { border: '1px solid var(--line)', color: 'var(--blue)', background: 'var(--blue-mist)' };
  const stop = (e) => e.stopPropagation();
  return (
    <div className="flex items-center gap-2" onClick={stop} onKeyDown={stop}>
      <motion.button type="button" aria-label={t('Diminuer la quantité', 'Decrease quantity')} whileTap={{ scale: 0.85 }}
        onClick={onDec} disabled={qty <= 1} className={base} style={style}>
        <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
      </motion.button>
      <div className="w-7 text-center font-display tabular-nums select-none" style={{ color: 'var(--blue-deep)', fontSize: '0.95rem' }} aria-live="polite">{qty}</div>
      <motion.button type="button" aria-label={t('Augmenter la quantité', 'Increase quantity')} whileTap={{ scale: 0.85 }}
        onClick={onInc} className={base} style={style}>
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

/* ── One selectable furniture row: whole row toggles, checkbox + qty stepper ── */
function ItemRow({ it, on, active, qty, first, onToggle, onFocusRow, onInc, onDec }) {
  const t = useT();
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } };
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={on}
      data-cursor
      onClick={onToggle}
      onKeyDown={onKey}
      onMouseEnter={onFocusRow}
      className="cursor-pointer flex items-center gap-4 transition-colors"
      style={{
        padding: '15px 16px',
        background: on || active ? 'var(--blue-mist)' : '#fff',
        borderTop: first ? 'none' : '1px solid var(--line)',
        boxShadow: active && !on ? 'inset 3px 0 0 var(--blue-bright)' : 'none',
      }}
    >
      {/* Checkbox — 24px, fills blue with white Check when selected */}
      <span
        aria-hidden
        className="grid place-items-center shrink-0 transition-colors"
        style={{
          width: 24, height: 24, borderRadius: 7,
          background: on ? 'var(--blue)' : '#fff',
          border: on ? '1px solid var(--blue)' : '1.5px solid var(--line)',
          boxShadow: on ? '0 5px 12px -5px rgba(0,82,163,.55)' : 'none',
        }}
      >
        <motion.span initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.18, ease: EASE }} style={{ display: 'grid' }}>
          <Check size={15} strokeWidth={3} style={{ color: '#fff' }} />
        </motion.span>
      </span>

      <div className="flex-1 min-w-0">
        <div className="leading-snug" style={{ fontSize: '0.92rem', fontWeight: on ? 600 : 500, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>{tr(t, it.name)}</div>
        {it.sub && <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: 2 }}>{tr(t, it.sub)}</div>}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {on ? (
          <motion.div key="stepper" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.22, ease: EASE }} className="shrink-0">
            <Stepper qty={qty} onInc={onInc} onDec={onDec} />
          </motion.div>
        ) : (
          <motion.span key="price" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="tabular-nums shrink-0 whitespace-nowrap" style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--blue)' }}>
            {it.price}€
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Mobilier() {
  const t = useT();
  const { productName, image, groups, accessories, custom } = DATA;
  const categories = groups.map((g) => g.category);

  const [cat, setCat] = useState(categories[0]);          // active category filter
  const [qtys, setQtys] = useState({});                   // key -> qty
  const [activeKey, setActiveKey] = useState(`${categories[0]}-0`); // item shown on the image
  const [open, setOpen] = useState(false);

  const setQ = (k, v) => setQtys((m) => ({ ...m, [k]: Math.max(0, v) }));

  // flat lookup of every item by key (across all categories + accessories)
  const allItems = useMemo(() => {
    const map = {};
    groups.forEach((g) => g.items.forEach((it, i) => { map[`${g.category}-${i}`] = { ...it, group: g.label }; }));
    accessories.items.forEach((it, i) => { map[`acc-${i}`] = { ...it, group: accessories.label }; });
    return map;
  }, [groups, accessories]);

  const activeGroup = groups.find((g) => g.category === cat);

  const total = useMemo(
    () => Object.entries(qtys).reduce((t, [k, q]) => t + (q > 0 && allItems[k] ? allItems[k].price * q : 0), 0),
    [qtys, allItems],
  );

  // selected lines for the modal + receipt
  const selected = Object.entries(qtys)
    .filter(([, q]) => q > 0)
    .map(([k, q]) => ({ label: allItems[k].name, qty: q, unit: allItems[k].price }));

  // image + caption react to the active item (fixes "quand je clique sur la chaise l'image n'apparaît pas")
  const activeItem = allItems[activeKey] || allItems[`${cat}-0`];
  const activeKind = FURNITURE_KIND[activeItem?.name] || 'pouf';

  const RollPrice = ({ value, style }) => (
    <span style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', ...style }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: '0.65em', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-0.65em', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 36 }} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{value}</motion.span>
      </AnimatePresence>
    </span>
  );

  return (
    <main className="overflow-x-clip bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="bg-deep text-white pt-32 md:pt-40 pb-14 md:pb-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="kicker" style={{ color: '#7db4f0' }}>{t('Mobilier événementiel', 'Event furniture')}</span>
          </Reveal>
          <Reveal as="h1" className="font-display text-white font-bold tracking-tightest max-w-3xl" style={{ fontSize: 'clamp(2.4rem,6vw,4.6rem)', lineHeight: 0.98 }}>
            {t('Mobilier Gonflable', 'Inflatable Furniture')}{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>{t('sur mesure', 'custom-made')}</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="lead mt-5 max-w-lg" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {t('Complétez vos structures avec notre mobilier personnalisé.', 'Complete your structures with our custom-made furniture.')}
          </Reveal>
          <Reveal as="div" delay={0.16} className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7db4f0' }} />
            <span className="text-[13px] font-medium text-white/85">{t('Impression totale comprise', 'Full printing included')}</span>
          </Reveal>
        </div>
      </section>

      {/* ░░ CONFIGURATEUR ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14">
          {/* ── LEFT: sticky reactive image panel ── */}
          <div>
            <div className="lg:sticky lg:top-24">
              <motion.div
                className="relative rounded-[28px] bg-gradient-to-br from-white to-[var(--blue-mist)] border border-[var(--line)] overflow-hidden flex items-center justify-center p-8 md:p-10"
                style={{ aspectRatio: '1 / 1' }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div className="absolute w-2/3 h-2/3 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(40px)' }} />
                <motion.div
                  className="relative w-[78%] max-w-[360px]"
                  animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeKind}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -10 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <FurnitureRender kind={activeKind} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* caption — updates to the currently selected/active item */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl bg-white/92 backdrop-blur-md border border-white/60 shadow-lg px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{activeItem?.group ? tr(t, activeItem.group) : ''}</div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeItem?.name}
                        initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="font-display text-lg md:text-xl font-bold text-ink leading-tight truncate"
                      >
                        {activeItem?.name ? tr(t, activeItem.name) : ''}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--blue)] font-semibold">{t('À partir de', 'From')}</div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeItem?.price}
                        initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="font-display text-xl font-bold text-[var(--blue-deep)] tabular-nums"
                      >
                        {activeItem?.price}€
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: controls ── */}
          <div className="space-y-9">
            {/* Catégorie filter */}
            <Reveal y={28}>
              <div className="mb-3 flex items-center gap-2 text-[var(--blue)]">
                <Layers size={16} strokeWidth={2.4} />
                <span className="kicker !text-[0.68rem]">{t('Catégorie', 'Category')}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {groups.map((g) => {
                  const on = g.category === cat;
                  const Icon = CAT_ICON[g.category] || Layers;
                  return (
                    <button
                      key={g.category}
                      type="button"
                      aria-pressed={on}
                      data-cursor
                      onClick={() => { setCat(g.category); setActiveKey(`${g.category}-0`); }}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
                      style={{
                        background: on ? 'var(--blue)' : '#fff',
                        color: on ? '#fff' : 'var(--ink-2)',
                        border: on ? '1px solid var(--blue)' : '1.5px solid var(--line)',
                        boxShadow: on ? '0 10px 22px -12px rgba(0,82,163,.6)' : 'none',
                      }}
                    >
                      <Icon size={15} strokeWidth={2.4} />
                      {tr(t, g.category)}
                      <span className="tabular-nums" style={{ opacity: on ? 0.8 : 0.5 }}>{g.items.length}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Type de mobilier — list for active category */}
            <Reveal y={28} delay={0.05}>
              <div className="flex items-end justify-between mb-1">
                <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>{t('Type de mobilier', 'Furniture type')}</h3>
                <span className="tabular-nums" style={{ fontSize: '0.72rem', color: '#8493a8', letterSpacing: '0.04em' }}>{t('PRIX HT / UNITÉ', 'PRICE EXCL. VAT / UNIT')}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 14 }}>{t('Cliquez une ligne pour l’ajouter — l’aperçu se met à jour.', 'Click a row to add it — the preview updates instantly.')}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}
                >
                  {activeGroup.items.map((it, i) => {
                    const k = `${cat}-${i}`; const q = qtys[k] || 0; const on = q > 0;
                    return (
                      <ItemRow
                        key={it.name}
                        it={it} on={on} active={activeKey === k} qty={q} first={i === 0}
                        onToggle={() => { setActiveKey(k); setQ(k, on ? 0 : 1); }}
                        onFocusRow={() => setActiveKey(k)}
                        onInc={() => setQ(k, q + 1)}
                        onDec={() => setQ(k, q - 1)}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </Reveal>

            {/* Accessoires */}
            <Reveal y={28} delay={0.05}>
              <h3 className="font-display mb-3" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>{tr(t, accessories.label)}</h3>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                {accessories.items.map((it, i) => {
                  const k = `acc-${i}`; const q = qtys[k] || 0; const on = q > 0;
                  return (
                    <ItemRow
                      key={it.name}
                      it={it} on={on} active={activeKey === k} qty={q} first={i === 0}
                      onToggle={() => { setActiveKey(k); setQ(k, on ? 0 : 1); }}
                      onFocusRow={() => setActiveKey(k)}
                      onInc={() => setQ(k, q + 1)}
                      onDec={() => setQ(k, q - 1)}
                    />
                  );
                })}
              </div>
            </Reveal>

            {/* Personnalisation complète */}
            <Reveal y={24}>
              <div className="rounded-[22px] p-6 md:p-7" style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={18} color="var(--blue)" strokeWidth={2.4} />
                  <div className="kicker">{t('Personnalisation complète', 'Full customization')}</div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0 0 16px', maxWidth: '38ch' }}>
                  {t('Chaque élément de mobilier peut être entièrement personnalisé avec vos couleurs et votre logo.', 'Every piece of furniture can be fully customized with your colors and your logo.')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {custom.map((label) => (
                    <div key={label} className="inline-flex items-center gap-2.5 w-full"
                      style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 9999, padding: '9px 16px 9px 10px', fontSize: '0.86rem', fontWeight: 600, color: 'var(--blue-deep)' }}>
                      <span className="flex items-center justify-center shrink-0" style={{ width: 22, height: 22, borderRadius: 9999, background: 'var(--blue)', color: '#fff' }}>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span style={{ lineHeight: 1.25 }}>{tr(t, label)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Prix HT + ONE Demander un devis */}
            <Reveal y={20}>
              <div style={{ borderRadius: 22, border: '1px solid var(--line)', background: '#fff', overflow: 'hidden', boxShadow: '0 14px 34px -22px rgba(11,28,63,.22)' }}>
                {selected.length > 0 && (
                  <div style={{ padding: '6px 20px 4px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--blue)', padding: '14px 0 4px' }}>
                      <Tag size={13} strokeWidth={2.4} />
                      {t('Récapitulatif', 'Summary')} · {selected.length} {t(`élément${selected.length > 1 ? 's' : ''}`, `item${selected.length > 1 ? 's' : ''}`)}
                    </div>
                    {selected.map((r, i) => (
                      <div key={`${r.label}-${i}`}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 0' }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14.5 }}>{tr(t, r.label)}</div>
                            <div style={{ fontSize: 12, color: 'var(--ink-2)', opacity: 0.8 }}>{fmt(r.unit)} {t('/ unité', '/ unit')} · ×{r.qty}</div>
                          </div>
                          <RollPrice value={fmt(r.unit * r.qty)} style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', fontFamily: "'Schibsted Grotesk', sans-serif" }} />
                        </div>
                        {i < selected.length - 1 && <div className="hairline" />}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ background: 'var(--blue-mist)', borderTop: '1px solid var(--line)', padding: '16px 20px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>
                      <Sparkles size={14} strokeWidth={2.2} style={{ color: 'var(--blue)' }} />
                      {t('Prix HT', 'Price excl. VAT')}
                    </div>
                    <RollPrice value={fmt(total)} style={{ fontSize: 32, fontWeight: 700, color: 'var(--blue-deep)', lineHeight: 1, fontVariantNumeric: 'tabular-nums', fontFamily: "'Schibsted Grotesk', sans-serif" }} />
                  </div>

                  <Magnetic className="block">
                    <motion.button
                      type="button"
                      onClick={() => setOpen(true)}
                      data-cursor
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ y: -1 }}
                      style={{
                        marginTop: 16, width: '100%', border: 'none', cursor: 'pointer', borderRadius: 14, padding: '14px 18px',
                        background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))', color: '#fff', fontWeight: 700,
                        fontSize: 15, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                        boxShadow: '0 12px 26px -12px rgba(0,82,163,.55)',
                      }}
                    >
                      <FileText size={17} strokeWidth={2.2} />
                      {t('Demander un devis', 'Request a quote')}
                      <ArrowRight size={17} strokeWidth={2.4} />
                    </motion.button>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ CARACTÉRISTIQUES ░░ */}
      <section className="bg-paper py-12 md:py-16 border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <SectionHeader
            kicker={t('Fiche technique', 'Technical specifications')}
            title={t('Un mobilier pensé pour l’événementiel', 'Furniture designed for events')}
            lead={t('Matériaux premium, impression haute définition et une installation express, partout, en quelques minutes.', 'Premium materials, high-definition printing and express setup, anywhere, in just minutes.')}
            className="mb-9 md:mb-12"
          />
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { label: t('Matériau', 'Material'), value: t('PVC premium', 'Premium PVC'), sub: t('Soudé, étanche et résistant', 'Welded, waterproof and durable') },
              { label: t('Impression', 'Printing'), value: 'HD 360°', sub: t('Sublimation résistante aux UV', 'UV-resistant sublimation') },
              { label: t('Montage', 'Setup'), value: t('< 2 min', '< 2 min'), sub: t('Mise en place par une personne', 'Set up by a single person') },
              { label: t('Usage', 'Use'), value: t('Indoor / Outdoor', 'Indoor / Outdoor'), sub: t('Intérieur comme extérieur', 'Indoors and outdoors alike') },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={staggerChild}
                data-cursor
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="cursor-pointer rounded-[22px] bg-white border border-[var(--line)] hover:border-[var(--blue)] p-6 transition-colors duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,102,204,0.24)]"
              >
                <div className="kicker mb-2" style={{ color: 'var(--muted)' }}>{s.label}</div>
                <div className="font-display font-bold text-ink tracking-tight leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,1.85rem)' }}>{s.value}</div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--muted)]">{s.sub}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <DevisModal
        open={open}
        onClose={() => setOpen(false)}
        productName={tr(t, productName)}
        groupLabel={null}
        lines={[]}
        extras={selected}
        total={total}
      />
    </main>
  );
}
