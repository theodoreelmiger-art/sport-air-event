import { useState } from 'react';
import { motion } from 'framer-motion';
import { Armchair, Table2, Wine, Check, ArrowRight, Minus, Plus } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const MOBILIER_ITEMS = [
  { name: 'Pouf gonflable imprimé', price: '180€', category: 'assises' },
  { name: 'Chaise basse', price: '280€', category: 'assises' },
  { name: 'Sofa 1 place', price: '290€', category: 'assises' },
  { name: 'Sofa 2 places', price: '460€', category: 'assises' },
  { name: 'Table basse', price: '370€', category: 'tables' },
  { name: 'Table haute', price: '490€', category: 'tables' },
  { name: 'Bar gonflable droit', price: '600€', category: 'bars' },
];

const CATEGORIES = [
  { id: 'assises', label: 'Assises', icon: Armchair, count: 4 },
  { id: 'tables', label: 'Tables', icon: Table2, count: 2 },
  { id: 'bars', label: 'Bars', icon: Wine, count: 1 },
];

const CUSTOM_POINTS = ['Impression HD', 'Matériaux premium', 'Montage rapide', 'Design 3D gratuit'];

export default function Mobilier() {
  const [category, setCategory] = useState('assises');
  const [quantities, setQuantities] = useState({});
  const [pumpSelected, setPumpSelected] = useState(false);
  const [devisOpen, setDevisOpen] = useState(false);
  const visibleItems = MOBILIER_ITEMS.filter((item) => item.category === category);

  const parsePrice = (price) => parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
  const itemQty = (name) => quantities[name] || 0;
  const setItemQty = (name, next) =>
    setQuantities((q) => ({ ...q, [name]: Math.max(0, next) }));

  const itemsTotal = MOBILIER_ITEMS.reduce(
    (sum, item) => sum + parsePrice(item.price) * itemQty(item.name),
    0
  );
  const total = itemsTotal + (pumpSelected ? 60 : 0);

  const extras = [
    ...MOBILIER_ITEMS.filter((item) => itemQty(item.name) > 0).map((item) => ({
      label: item.name,
      qty: itemQty(item.name),
      unit: parsePrice(item.price),
    })),
    ...(pumpSelected ? [{ label: 'Pompe 220 volts', qty: 1, unit: 60 }] : []),
  ];

  return (
    <main className="overflow-x-hidden bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="bg-deep text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold tabular-nums text-white/40">—</span>
                <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <span className="kicker" style={{ color: '#7db4f0' }}>Mobilier événementiel</span>
              </Reveal>
              <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.4rem,6vw,4.6rem)', lineHeight: 0.98 }}>
                Mobilier Gonflable{' '}
                <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>sur mesure</span>
              </h1>
              <Reveal as="p" delay={0.1} className="lead mt-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Complétez vos structures avec notre mobilier personnalisé.
              </Reveal>
              <Reveal as="div" delay={0.16} className="mt-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7db4f0' }} />
                <span className="text-[13px] font-medium text-white/85">Impression totale comprise</span>
              </Reveal>
            </div>
            <Reveal y={40} className="lg:col-span-5">
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-white flex items-center justify-center p-8 md:p-10" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src="images/18_1fc91b287_ChatGPTImage17janv202616_40_27.png"
                  alt="Mobilier Gonflable Sport Air Event"
                  className="relative max-h-[88%] w-auto object-contain"
                  style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ CONFIGURATEUR ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Sticky visual column (desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-10 md:p-14" style={{ aspectRatio: '4 / 5' }}>
                <span className="absolute top-5 left-6 font-display text-[6rem] font-bold leading-none text-ink/[0.05] select-none">01</span>
                <img
                  src="images/18_1fc91b287_ChatGPTImage17janv202616_40_27.png"
                  alt="Mobilier Gonflable Sport Air Event"
                  className="relative max-h-[82%] w-auto object-contain"
                  style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                />
              </div>
            </Reveal>
          </div>

          {/* Configurator column */}
          <div className="lg:col-span-7">
            <SectionHeader kicker="Composez votre sélection" index="02"
              title={<>Configurez votre<br />mobilier</>}
              lead="Choisissez vos pièces, ajustez les quantités et obtenez votre prix instantanément." />

            {/* Catégorie */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">A</span>
                <h3 className="font-display text-lg font-semibold text-ink">Catégorie</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {CATEGORIES.map((c) => {
                  const Icon = c.icon;
                  const active = category === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      aria-pressed={active}
                      tabIndex={0}
                      className={`group rounded-[var(--radius)] p-4 md:p-6 text-left transition-colors ${active ? 'bg-deep text-white border border-ink' : 'bg-white text-ink border border-[var(--line)] hover:border-ink/15'}`}
                    >
                      <div className="flex items-center justify-between mb-6 md:mb-8">
                        <Icon className={`w-5 h-5 ${active ? 'text-[#7db4f0]' : 'text-[var(--blue)]'}`} />
                        <span className={`text-xs font-semibold tabular-nums ${active ? 'text-white/40' : 'text-ink/30'}`}>0{c.count}</span>
                      </div>
                      <span className={`font-display font-semibold text-[15px] ${active ? 'text-white' : 'text-ink'}`}>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type de mobilier */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">B</span>
                <h3 className="font-display text-lg font-semibold text-ink">Type de mobilier</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {visibleItems.map((item) => {
                  const qty = itemQty(item.name);
                  const isSelected = qty > 0;
                  return (
                    <div
                      key={item.name}
                      className={`rounded-[var(--radius-lg)] p-5 transition-colors ${isSelected ? 'bg-white border border-[var(--blue)]' : 'bg-white border border-[var(--line)] hover:border-ink/15'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${isSelected ? 'border-[var(--blue)] bg-[var(--blue)]' : 'border-[var(--line)]'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-[15px] text-ink leading-snug">{item.name}</div>
                          <div className="text-sm font-semibold text-[var(--blue)] mt-1 tabular-nums">{item.price}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-4">
                        <button
                          type="button"
                          aria-label={`Retirer ${item.name}`}
                          onClick={() => setItemQty(item.name, qty - 1)}
                          disabled={qty === 0}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${qty === 0 ? 'border-[var(--line)] text-ink/20 cursor-not-allowed' : 'border-[var(--line)] text-ink hover:border-[var(--blue)] hover:text-[var(--blue)]'}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-7 text-center font-display font-bold text-[15px] text-ink tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Ajouter ${item.name}`}
                          onClick={() => setItemQty(item.name, qty + 1)}
                          className="w-9 h-9 rounded-full border border-[var(--line)] text-ink flex items-center justify-center hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accessoires */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">C</span>
                <h3 className="font-display text-lg font-semibold text-ink">Accessoires</h3>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setPumpSelected((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPumpSelected((v) => !v);
                  }
                }}
                className={`rounded-[var(--radius-lg)] p-5 cursor-pointer transition-colors ${pumpSelected ? 'bg-white border border-[var(--blue)]' : 'bg-white border border-[var(--line)] hover:border-ink/15'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${pumpSelected ? 'border-[var(--blue)] bg-[var(--blue)]' : 'border-[var(--line)]'}`}>
                    {pumpSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-[15px] text-ink leading-snug">Pompe 220 volts</div>
                    <div className="text-sm font-semibold text-[var(--blue)] mt-1 tabular-nums">60€</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personnalisation complète */}
            <div className="mt-12 rounded-[var(--radius-lg)] bg-[var(--paper-2)] border border-[var(--line)] p-6 md:p-8">
              <div className="kicker mb-3">Personnalisation complète</div>
              <p className="text-[15px] text-ink/70 leading-relaxed mb-6 max-w-md">
                Chaque élément de mobilier peut être entièrement personnalisé avec vos couleurs et votre logo
              </p>
              <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {CUSTOM_POINTS.map((point) => (
                  <motion.div variants={staggerChild} key={point} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--blue)] flex-shrink-0" />
                    <span className="text-sm text-ink/75">{point}</span>
                  </motion.div>
                ))}
              </RevealStagger>
            </div>

            {/* Prix HT card (desktop) */}
            <div className="hidden md:block sticky bottom-6 mt-8">
              <div className="rounded-[var(--radius-lg)] bg-deep text-white p-6 md:p-7">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="kicker mb-1" style={{ color: '#7db4f0' }}>Prix HT</div>
                    <div className="font-display text-4xl font-bold text-white tabular-nums">€ {total}</div>
                  </div>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => setDevisOpen(true)}
                      className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
              </div>
            </div>

            <div className="h-24 md:hidden"></div>
          </div>
        </div>
      </section>

      {/* Sticky price bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden" style={{ background: 'linear-gradient(to top, var(--paper) 70%, transparent)' }}>
        <div className="rounded-[var(--radius-lg)] bg-deep text-white border border-ink">
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-white/45">Prix HT</div>
              <div className="font-display text-2xl font-bold text-white tabular-nums">€ {total}</div>
            </div>
            <button
              type="button"
              onClick={() => setDevisOpen(true)}
              className="flex-1 cta-iridescent inline-flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ padding: '12px 16px', minHeight: '48px' }}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Mobilier Gonflable"
        groupLabel={null}
        lines={[]}
        extras={extras}
        total={total}
      />
    </main>
  );
}
