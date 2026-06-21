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

/* No real per-furniture photo exists (the old site had a single render too), so each
   item gets a clean on-brand inflatable illustration that swaps when you click a row. */
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

function FurnitureArt({ kind }) {
  const F = 'var(--blue-soft)', S = 'var(--blue)', sw = 3.5;
  const box = { fill: F, stroke: S, strokeWidth: sw, strokeLinejoin: 'round' };
  const top = { fill: '#ffffff', stroke: S, strokeWidth: sw };
  const seam = { stroke: S, strokeWidth: 2.2, opacity: 0.35, fill: 'none', strokeLinecap: 'round' };
  const shadow = <ellipse cx="110" cy="183" rx="72" ry="9" fill="rgba(0,82,163,0.12)" />;
  const SHAPES = {
    pouf: (<>{shadow}
      <rect x="60" y="96" width="100" height="72" rx="28" {...box} />
      <ellipse cx="110" cy="96" rx="50" ry="17" {...top} />
      <path d="M73 122 H147 M73 142 H147" {...seam} /></>),
    chaise: (<>{shadow}
      <rect x="64" y="72" width="92" height="42" rx="18" {...box} />
      <rect x="56" y="106" width="108" height="58" rx="22" {...box} />
      <path d="M56 134 H164" {...seam} /></>),
    sofa1: (<>{shadow}
      <rect x="58" y="82" width="104" height="42" rx="18" {...box} />
      <rect x="50" y="104" width="120" height="58" rx="20" {...box} />
      <rect x="46" y="98" width="24" height="64" rx="12" {...box} />
      <rect x="150" y="98" width="24" height="64" rx="12" {...box} /></>),
    sofa2: (<>{shadow}
      <rect x="40" y="82" width="140" height="42" rx="18" {...box} />
      <rect x="32" y="104" width="156" height="56" rx="20" {...box} />
      <rect x="28" y="98" width="24" height="62" rx="12" {...box} />
      <rect x="168" y="98" width="24" height="62" rx="12" {...box} />
      <path d="M110 110 V152" {...seam} strokeWidth="2.5" opacity="0.4" /></>),
    tableBasse: (<>{shadow}
      <ellipse cx="110" cy="152" rx="40" ry="12" {...box} />
      <rect x="98" y="104" width="24" height="50" rx="8" {...box} />
      <ellipse cx="110" cy="100" rx="66" ry="20" {...top} /></>),
    tableHaute: (<>{shadow}
      <ellipse cx="110" cy="162" rx="36" ry="11" {...box} />
      <rect x="100" y="78" width="20" height="86" rx="8" {...box} />
      <ellipse cx="110" cy="74" rx="48" ry="15" {...top} /></>),
    bar: (<>{shadow}
      <rect x="52" y="90" width="116" height="78" rx="14" {...box} />
      <rect x="44" y="82" width="132" height="20" rx="9" {...top} />
      <path d="M78 112 V162 M110 112 V162 M142 112 V162" {...seam} /></>),
    pompe: (<>{shadow}
      <rect x="92" y="88" width="36" height="80" rx="12" {...box} />
      <rect x="84" y="74" width="52" height="16" rx="8" {...top} />
      <rect x="106" y="56" width="8" height="22" rx="4" fill={S} />
      <path d="M128 150 q42 0 42 -30" fill="none" stroke={S} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="170" cy="116" r="6" fill={S} /></>),
  };
  return (
    <svg viewBox="0 0 220 200" width="100%" style={{ maxWidth: 360, display: 'block' }} aria-hidden>
      {SHAPES[kind] || SHAPES.pouf}
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
                className="relative rounded-[28px] bg-gradient-to-br from-[var(--blue-mist)] to-[var(--blue-soft)] border border-[var(--line)] overflow-hidden flex items-center justify-center p-10 md:p-12"
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
                      <FurnitureArt kind={activeKind} />
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
