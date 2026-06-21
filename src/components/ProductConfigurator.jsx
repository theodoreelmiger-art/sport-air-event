import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Plus, Minus, ArrowRight, Star, Sparkles, Ruler,
  Tag, FileText, Send, ChevronRight, PencilRuler, BadgeCheck,
  PanelTop, DoorOpen, Frame, Maximize2, Layers,
} from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';
import { useT } from '../lib/i18n.jsx';
import DevisModal from './DevisModal.jsx';

const EASE = [0.16, 1, 0.3, 1];
const EASE2 = [0.22, 1, 0.36, 1];
const fmt = (n) => '€ ' + n.toLocaleString('fr-FR');

/* lucide icon per option (no emoji) — matched by index inside a group */
const OPTION_ICONS = [PanelTop, DoorOpen, Frame, Maximize2, Layers];
const iconFor = (i) => OPTION_ICONS[i % OPTION_ICONS.length];

/* EN dictionary for the French labels coming from data/configurators.js
   (product names, size groups, option names/subs, included lines). Render with
   t(frLabel, EN[frLabel] || frLabel) so untranslated labels fall back to FR. */
const EN = {
  // Product names
  'Tente Spider': 'Spider Tent',
  'Arche Gonflable': 'Inflatable Arch',
  'Colonnes Gonflables': 'Inflatable Columns',
  'Mobilier Gonflable': 'Inflatable Furniture',
  // Size-group labels
  'Taille': 'Size',
  'Dimensions': 'Dimensions',
  'Hauteur': 'Height',
  // Size detail subs
  '250x60(diamètre)cm': '250x60(diameter)cm',
  '300x60(diamètre)cm': '300x60(diameter)cm',
  '400x70(diamètre)cm': '400x70(diameter)cm',
  // Group labels
  'Parois': 'Walls',
  'Options supplémentaires': 'Add-ons',
  'Accessoires': 'Accessories',
  'Option éclairage': 'Lighting option',
  'Assises': 'Seating',
  'Tables': 'Tables',
  'Bars': 'Bars',
  // Option names
  'Paroi simple': 'Plain wall',
  'Paroi avec porte (zipp central)': 'Wall with door (centre zip)',
  'Paroi avec petite fenêtre': 'Wall with small window',
  'Paroi grande fenêtre': 'Wall with large window',
  'Paroi double (impression recto - verso doublée)': 'Double wall (double-sided print)',
  'Auvent': 'Canopy',
  'Connexion inter-tente': 'Tent-to-tent connector',
  'Pompe 220 volts': '220-volt blower',
  'Éclairage LED RGB intégré': 'Built-in RGB LED lighting',
  'Pouf gonflable imprimé': 'Printed inflatable pouf',
  'Chaise basse': 'Low chair',
  'Sofa 1 place': '1-seat sofa',
  'Sofa 2 places': '2-seat sofa',
  'Table basse': 'Coffee table',
  'Table haute': 'High table',
  'Bar gonflable droit': 'Straight inflatable bar',
  // Option subs
  'Illumination programmable multicolore': 'Programmable multicolour lighting',
  // Included lines
  'Impression de la partie haute de la tente': 'Print on the upper section of the tent',
  'Structure portante haute pression': 'High-pressure load-bearing structure',
  'Modélisation 3D gratuite': 'Free 3D modelling',
  'Sac de transport sur roulettes': 'Wheeled carry bag',
  'Sacs de lest, cordages et sardines à visser': 'Ballast bags, ropes and screw-in stakes',
  '5 ans de garantie': '5-year warranty',
  'Envoi gratuit': 'Free shipping',
  'Impression haute qualité de votre logo et design': 'High-quality print of your logo and design',
  'Ventilateur électrique professionnel fourni': 'Professional electric blower included',
  'Kit de fixation et sac de transport inclus': 'Anchoring kit and carry bag included',
  'Garantie 2 ans structure + 3 ans impression': '2-year structure + 3-year print warranty',
  'Personnalisation complète avec votre logo': 'Full customisation with your logo',
  'Ventilateur électrique silencieux': 'Quiet electric blower',
  'Base lestée pour stabilité maximale': 'Ballasted base for maximum stability',
  'Sac de transport professionnel': 'Professional carry bag',
};
const tr = (t, fr) => t(fr, EN[fr] || fr);

/* ── Size detail stepper (design from sizeSelectors V1 — "mist" tone) ── */
function SizeStepper({ qty, onInc, onDec }) {
  const t = useT();
  const btn =
    'h-8 w-8 flex items-center justify-center rounded-full cursor-pointer select-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-[var(--blue-soft)] text-[var(--blue)] hover:bg-white border border-[var(--line)]';
  return (
    <div className="inline-flex items-center gap-1 rounded-full p-1 bg-white" onClick={(e) => e.stopPropagation()}>
      <motion.button whileTap={{ scale: 0.85 }} type="button" aria-label={t('Diminuer la quantité', 'Decrease quantity')}
        disabled={qty <= 1} onClick={onDec} className={btn}>
        <Minus size={15} strokeWidth={2.5} />
      </motion.button>
      <span className="min-w-[1.6rem] text-center font-display text-base font-semibold text-[var(--blue-deep)] tabular-nums">{qty}</span>
      <motion.button whileTap={{ scale: 0.85 }} type="button" aria-label={t('Augmenter la quantité', 'Increase quantity')}
        onClick={onInc} className={btn}>
        <Plus size={15} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

/* ── Option stepper (design from optionSelectors V9 — "soft" tone) ── */
function OptStepper({ qty, onInc, onDec }) {
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

export default function ProductConfigurator({ data }) {
  const t = useT();
  const { productName, image, sizeGroup, groups = [], included = [], surMesureTo, modalGroupLabel } = data;
  const defaultSize = sizeGroup ? Math.max(0, sizeGroup.items.findIndex((s) => s.popular)) : -1;
  const [sizeIdx, setSizeIdx] = useState(sizeGroup ? (defaultSize < 0 ? 0 : defaultSize) : -1);
  const [sizeQty, setSizeQty] = useState(1);
  const [optQty, setOptQty] = useState({});
  const [open, setOpen] = useState(false);

  const key = (gi, ii) => `${gi}-${ii}`;
  const setQ = (k, v) => setOptQty((m) => ({ ...m, [k]: Math.max(0, v) }));
  const selectedCount = Object.values(optQty).filter((v) => v > 0).length;

  const total = useMemo(() => {
    let t = sizeGroup ? sizeGroup.items[sizeIdx].price * sizeQty : 0;
    groups.forEach((g, gi) => g.items.forEach((it, ii) => { t += (optQty[key(gi, ii)] || 0) * it.price; }));
    return t;
  }, [sizeGroup, sizeIdx, sizeQty, groups, optQty]);

  const lines = sizeGroup ? [{ label: sizeGroup.items[sizeIdx].name, qty: sizeQty, unit: sizeGroup.items[sizeIdx].price }] : [];
  const extras = [];
  groups.forEach((g, gi) => g.items.forEach((it, ii) => { const q = optQty[key(gi, ii)] || 0; if (q > 0) extras.push({ label: it.name, qty: q, unit: it.price }); }));

  // Receipt rows for the V14-style price bar — base size line + every selected option.
  const receiptRows = [
    ...(sizeGroup ? [{
      label: tr(t, sizeGroup.items[sizeIdx].name),
      sub: sizeGroup.items[sizeIdx].sub ? tr(t, sizeGroup.items[sizeIdx].sub) : tr(t, sizeGroup.label),
      amount: sizeGroup.items[sizeIdx].price * sizeQty,
    }] : []),
    ...extras.map((e) => ({
      label: tr(t, e.label),
      sub: `${fmt(e.unit)} / ${t('unité', 'unit')}`,
      amount: e.unit * e.qty,
      qty: e.qty,
    })),
  ];

  const AnimPrice = ({ value, className }) => (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="inline-block">{fmt(value)}</motion.span>
      </AnimatePresence>
    </span>
  );

  // Rolling price used by the V14-style receipt (spring odometer).
  const RollPrice = ({ value, className, style }) => (
    <span className={className} style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', ...style }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: '0.65em', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-0.65em', opacity: 0 }} transition={{ type: 'spring', stiffness: 520, damping: 36 }} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{fmt(value)}</motion.span>
      </AnimatePresence>
    </span>
  );

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 py-14 md:py-20">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16">
        {/* ── LEFT: sticky, following image ── */}
        <div>
          <div className="lg:sticky lg:top-24">
            <motion.div
              className="relative rounded-[28px] bg-gradient-to-br from-[var(--blue-mist)] to-[var(--blue-soft)] border border-[var(--line)] overflow-hidden flex items-center justify-center p-10 md:p-14"
              style={{ aspectRatio: '1 / 1' }}
              initial={{ opacity: 0, scale: 0.96, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute w-2/3 h-2/3 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(40px)' }} />
              <motion.img
                src={image} alt={tr(t, productName)} loading="eager"
                className="relative max-h-[82%] max-w-[88%] object-contain product-render"
                animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg px-5 py-3.5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{t('Configuration', 'Configuration')}</div>
                  <AnimPrice value={total} className="font-display text-2xl font-bold text-ink leading-tight" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--blue)]">{t('Total HT', 'Total excl. VAT')}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: controls ── */}
        <div className="space-y-12">
          {/* Size group — design of sizeSelectors V1 (segmented tabs + detail row) */}
          {sizeGroup && (
            <Reveal y={30}>
              <div className="mb-4 flex items-center gap-2 text-[var(--blue)]">
                <Ruler size={16} strokeWidth={2.4} />
                <span className="kicker !text-[0.68rem]">{tr(t, sizeGroup.label)}</span>
              </div>

              {/* Segmented control — sliding pill, one active tab */}
              <div className="relative flex rounded-full border border-[var(--line)] bg-[var(--blue-mist)] p-1">
                {sizeGroup.items.map((s, i) => {
                  const on = i === sizeIdx;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      aria-pressed={on}
                      data-cursor
                      onClick={() => setSizeIdx(i)}
                      className="relative z-10 flex-1 cursor-pointer rounded-full px-2 py-2.5 text-center transition-colors"
                    >
                      {on && (
                        <motion.span
                          layoutId={`size-pill-${productName}`}
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-[var(--line)]"
                        />
                      )}
                      <span className={'font-display text-base font-semibold transition-colors ' + (on ? 'text-[var(--blue-deep)]' : 'text-[var(--blue)]/55')}>
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail row for the active size — quantity stepper ONLY here */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={sizeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-semibold text-[var(--blue-deep)]">{tr(t, sizeGroup.items[sizeIdx].name)}</span>
                      {sizeGroup.items[sizeIdx].popular && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--blue)] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-white">
                          <Star size={10} strokeWidth={2.5} className="fill-white" /> {t('Populaire', 'Popular')}
                        </span>
                      )}
                    </div>
                    {sizeGroup.items[sizeIdx].sub && (
                      <div className="mt-0.5 text-[0.78rem] text-[var(--blue)]/60">{tr(t, sizeGroup.items[sizeIdx].sub)}</div>
                    )}
                    <div className="mt-1.5 font-display text-xl font-bold text-[var(--blue)]">{sizeGroup.items[sizeIdx].price}€</div>
                  </div>
                  <SizeStepper qty={sizeQty} onInc={() => setSizeQty((q) => q + 1)} onDec={() => setSizeQty((q) => Math.max(1, q - 1))} />
                </motion.div>
              </AnimatePresence>
            </Reveal>
          )}

          {/* Option / parois groups — design of optionSelectors V9 (table-like list) */}
          {groups.map((g, gi) => (
            <Reveal key={g.label} y={30} delay={0.05}>
              <div className="flex items-end justify-between mb-1">
                <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>{tr(t, g.label)}</h3>
                <span className="tabular-nums" style={{ fontSize: '0.72rem', color: '#8493a8', letterSpacing: '0.04em' }}>{t('PRIX / UNITÉ', 'PRICE / UNIT')}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 14 }}>{t('Survolez puis cliquez pour activer.', 'Hover, then click to add.')}</p>

              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                {g.items.map((it, ii) => {
                  const k = key(gi, ii); const q = optQty[k] || 0; const on = q > 0;
                  const Icon = iconFor(ii);
                  return (
                    <OptionRow
                      key={it.name}
                      it={it}
                      on={on}
                      qty={q}
                      Icon={Icon}
                      first={ii === 0}
                      onToggle={() => setQ(k, on ? 0 : 1)}
                      onInc={() => setQ(k, q + 1)}
                      onDec={() => setQ(k, q - 1)}
                    />
                  );
                })}
              </div>

              {/* per-group running total (V9 TotalBar) */}
              <GroupTotal group={g} gi={gi} optQty={optQty} keyFn={key} />
            </Reveal>
          ))}

          {/* Included — design of includedWidgets V16 (badge grid), non-interactive */}
          {included.length > 0 && (
            <Reveal y={24}>
              <div style={{ color: 'var(--ink)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck size={18} color="var(--blue)" strokeWidth={2.4} />
                  <div className="kicker">{tr(t, productName)} — {t('toujours inclus', 'always included')}</div>
                </div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 16 }}>
                  {t('Le standard, sans supplément', 'The standard, at no extra cost')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {included.map((label) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-2.5 w-full"
                      style={{
                        background: 'var(--blue-mist)', border: '1px solid var(--line)', borderRadius: 9999,
                        padding: '9px 16px 9px 10px', fontSize: '0.86rem', fontWeight: 600, color: 'var(--blue-deep)',
                      }}
                    >
                      <span className="flex items-center justify-center shrink-0" style={{ width: 22, height: 22, borderRadius: 9999, background: 'var(--blue)', color: '#fff' }}>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span style={{ lineHeight: 1.25 }}>{tr(t, label)}</span>
                    </div>
                  ))}
                  <div
                    className="inline-flex items-center gap-2.5 w-full"
                    style={{
                      background: 'var(--blue-mist)', border: '1px solid var(--line)', borderRadius: 9999,
                      padding: '9px 16px 9px 10px', fontSize: '0.86rem', fontWeight: 600, color: 'var(--blue-deep)',
                    }}
                  >
                    <span className="flex items-center justify-center shrink-0" style={{ width: 22, height: 22, borderRadius: 9999, background: 'var(--blue)', color: '#fff' }}>
                      <Sparkles size={13} strokeWidth={2.6} />
                    </span>
                    <span style={{ lineHeight: 1.25 }}>{t('Design 3D gratuit', 'Free 3D design')}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  <Sparkles size={16} color="var(--blue)" />
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>{t('Tout est déjà compris dans le prix de base.', 'It is all already included in the base price.')}</p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Price bar — design of priceWidgets V14 (receipt recap) */}
          <Reveal y={20}>
            <div style={{ borderRadius: 22, border: '1px solid var(--line)', background: '#fff', overflow: 'hidden', boxShadow: '0 14px 34px -22px rgba(11,28,63,.22)' }}>
              <div style={{ padding: '18px 20px 6px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--blue)' }}>
                  <Tag size={13} strokeWidth={2.4} />
                  {t('Récapitulatif', 'Summary')}{selectedCount > 0 ? ` · ${selectedCount} ${selectedCount > 1 ? t('options', 'options') : t('option', 'option')}` : ''}
                </div>
              </div>

              <div style={{ padding: '6px 20px 4px' }}>
                {receiptRows.map((r, i) => (
                  <div key={`${r.label}-${i}`}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 0' }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14.5 }}>{r.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-2)', opacity: 0.8 }}>{r.sub}{r.qty ? ` · ×${r.qty}` : ''}</div>
                      </div>
                      <RollPrice value={r.amount} className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }} />
                    </div>
                    {i < receiptRows.length - 1 && <div className="hairline" />}
                  </div>
                ))}
              </div>

              {/* tinted subtotal + CTA block */}
              <div style={{ background: 'var(--blue-mist)', borderTop: '1px solid var(--line)', padding: '16px 20px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>
                    <Sparkles size={14} strokeWidth={2.2} style={{ color: 'var(--blue)' }} />
                    {t('Total HT', 'Total excl. VAT')}
                  </div>
                  <RollPrice value={total} className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--blue-deep)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }} />
                </div>

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
              </div>
            </div>
          </Reveal>

          {/* Alternative sur-mesure — le devis principal est déjà dans le récapitulatif ci-dessus (un seul bouton devis) */}
          {surMesureTo && (
            <Reveal y={20}>
              <Link
                to={surMesureTo}
                data-cursor
                className="group flex w-full items-center gap-4 rounded-[22px] px-5 py-4 text-left cursor-pointer transition-colors duration-300"
                style={{ background: 'var(--blue-mist)', border: '1.5px dashed var(--blue-bright)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: '#fff', border: '1px solid var(--line)' }}>
                  <PencilRuler size={20} style={{ color: 'var(--blue)' }} strokeWidth={2.1} />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--blue-deep)' }}>
                    {t('Sur mesure', 'Custom-made')}
                    <Sparkles size={14} style={{ color: 'var(--blue-bright)' }} strokeWidth={2.2} />
                  </span>
                  <span className="block text-sm" style={{ color: 'var(--blue)' }}>{t('Dimensions 100% personnalisées', 'Fully bespoke dimensions')}</span>
                </span>
                <ChevronRight size={20} style={{ color: 'var(--blue)' }} strokeWidth={2.3} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>

      <DevisModal open={open} onClose={() => setOpen(false)} productName={productName} groupLabel={modalGroupLabel} lines={lines} extras={extras} total={total} />
    </section>
  );
}

/* Single option row — design of optionSelectors V9 (hover, active rail, icon,
   price column that swaps to a stepper when active). Stepper ONLY on selected. */
function OptionRow({ it, on, qty, Icon, first, onToggle, onInc, onDec }) {
  const t = useT();
  const [hover, setHover] = useState(false);
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } };
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={on}
      data-cursor
      onClick={onToggle}
      onKeyDown={onKey}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer flex items-center gap-4 transition-colors"
      style={{
        padding: '17px 18px',
        background: on ? 'var(--blue-mist)' : hover ? 'var(--blue-mist)' : '#fff',
        borderTop: first ? 'none' : '1px solid var(--line)',
      }}
    >
      {/* Case à cocher — cliquer la ligne la coche */}
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
        <motion.span initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.18, ease: EASE2 }} style={{ display: 'grid' }}>
          <Check size={15} strokeWidth={3} style={{ color: '#fff' }} />
        </motion.span>
      </span>

      <div className="flex-1 min-w-0">
        <div className="leading-snug" style={{ fontSize: '0.88rem', fontWeight: on ? 600 : 500, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>{tr(t, it.name)}</div>
        {it.sub && <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: 2 }}>{tr(t, it.sub)}</div>}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {on ? (
          <motion.div key="stepper" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.22, ease: EASE2 }} className="shrink-0">
            <OptStepper qty={qty} onInc={onInc} onDec={onDec} />
          </motion.div>
        ) : (
          <motion.span key="price" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="tabular-nums shrink-0 whitespace-nowrap" style={{ fontSize: '0.88rem', fontWeight: 600, color: hover ? 'var(--blue)' : 'var(--muted)' }}>
            +{it.price}€
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Per-group running total — design of optionSelectors V9 TotalBar */
function GroupTotal({ group, gi, optQty, keyFn }) {
  const t = useT();
  let total = 0; let count = 0;
  group.items.forEach((it, ii) => { const q = optQty[keyFn(gi, ii)] || 0; if (q > 0) { count += 1; total += q * it.price; } });
  return (
    <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
        {count === 0
          ? t('Aucune option sélectionnée', 'No option selected')
          : (count > 1
              ? t(`${count} options sélectionnées`, `${count} options selected`)
              : t(`${count} option sélectionnée`, `${count} option selected`))}
      </span>
      <span className="font-display tabular-nums" style={{ color: 'var(--blue)', fontSize: '1.05rem' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={total} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.28, ease: EASE2 }} className="inline-block">
            {fmt(total)}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
