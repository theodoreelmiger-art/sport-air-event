import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Minus,
  Plus,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const PRODUCT = 'Arches Gonflables';

const dimensions = [
  { id: '5m', title: '5m', dims: '500x320(H)x60cm', price: 1490, span: '' },
  { id: '6m', title: '6m', dims: '600x380(H)x60cm', price: 1590, span: '' },
  { id: '7m', title: '7m', dims: '700x430(H)x80cm', price: 1790, span: '' },
  { id: '8m', title: '8m', dims: '800x480(H)x90cm', price: 1990, span: '' },
  { id: '10m', title: '10m', dims: '1000x580(H)x90cm', price: 2490, span: 'sm:col-span-2' },
];

const POMPE_PRICE = 60;

const specs = [
  { k: 'Matériau', v: 'Oxford 600D haute résistance + soudure thermique' },
  { k: 'Largeurs disponibles', v: '5m – 6m – 7m – 8m – 10m' },
  { k: 'Hauteur', v: '3m à 5m selon largeur' },
  { k: 'Impression', v: 'Sublimation HD 360° UV résistant' },
  { k: 'Temps de gonflage', v: '10-15 minutes' },
  { k: 'Résistance au vent', v: "Jusqu'à 60 km/h avec haubans" },
  { k: 'Alimentation ventilateur', v: '220V inclus' },
  { k: 'Garantie', v: '2 ans structure + 3 ans impression' },
];

const included = [
  'Impression haute qualité de votre logo et design',
  'Modélisation 3D gratuite',
  'Ventilateur électrique professionnel fourni',
  'Kit de fixation et sac de transport inclus',
  'Garantie 2 ans structure + 3 ans impression',
  'Design 3D gratuit',
];

const useCases = [
  { n: '01', title: 'Courses & marathons', desc: "Lignes de départ et d'arrivée spectaculaires" },
  { n: '02', title: 'Sports cyclistes', desc: 'Étapes de course, cols, critériums' },
  { n: '03', title: "Entrées d'événements", desc: 'Portiques, accueil, signalétique' },
  { n: '04', title: 'Animations commerciales', desc: 'Ouvertures de magasins, promotions' },
];

function formatPrice(value) {
  return value.toLocaleString('en-US');
}

export default function ArchesGonflables() {
  const [selectedDimension, setSelectedDimension] = useState('6m');
  const [quantity, setQuantity] = useState(1);
  const [pompeSelected, setPompeSelected] = useState(false);
  const [devisOpen, setDevisOpen] = useState(false);

  const selected = dimensions.find((d) => d.id === selectedDimension) ?? dimensions[1];
  const totalPrice =
    selected.price * quantity + (pompeSelected ? POMPE_PRICE : 0);

  const devisLines = [{ label: selected.title, qty: quantity, unit: selected.price }];
  const devisExtras = pompeSelected
    ? [{ label: 'Pompe 220 volts', qty: 1, unit: POMPE_PRICE }]
    : [];

  const handleSelectDimension = (id) => {
    setSelectedDimension(id);
    if (quantity < 1) setQuantity(1);
  };

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  return (
    <div className="overflow-x-hidden bg-paper">
      {/* ░░ HERO / CONFIGURATOR ░░ */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">Arches Gonflables · Sur mesure</span>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ── Visual (desktop sticky) ── */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <Reveal className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-12" style={{ aspectRatio: '4 / 3' }}>
                <span className="absolute top-5 left-6 font-display text-[7rem] font-bold leading-none text-ink/[0.04] select-none">01</span>
                <img
                  src="images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png"
                  alt="Arche Gonflable Sport Air Event"
                  className="relative max-h-[78%] w-auto object-contain"
                  style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                />
              </Reveal>
            </div>

            {/* ── Mobile visual ── */}
            <div className="lg:hidden">
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-8">
                <img
                  src="images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png"
                  alt="Arche Gonflable Sport Air Event"
                  className="w-full h-auto object-contain max-h-60"
                  style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                />
              </div>
            </div>

            {/* ── Configurator column (LOGIC FROZEN) ── */}
            <div className="space-y-10">
              <Reveal>
                <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', lineHeight: 1.0 }}>
                  Arches Gonflables
                </h1>
                <p className="lead mt-4 max-w-md">
                  Lignes de départ/arrivée et événements sportifs
                </p>
                <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
                  <span className="text-[13px] font-semibold text-ink">Impression totale comprise</span>
                </div>
              </Reveal>

              {/* Dimensions */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                    <h3 className="font-display text-lg font-semibold text-ink">Dimensions</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white" style={{ background: 'var(--blue)' }}>
                    6m POPULAIRE
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {dimensions.map((dim) => {
                    const isSelected = selectedDimension === dim.id;
                    return (
                      <div key={dim.id} className={dim.span}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleSelectDimension(dim.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectDimension(dim.id);
                            }
                          }}
                          className={`relative rounded-[var(--radius)] border transition-colors cursor-pointer p-4 ${
                            isSelected
                              ? 'border-[var(--blue)] bg-white'
                              : 'border-[var(--line)] bg-white hover:border-ink/15'
                          }`}
                        >
                          <div className="relative flex items-center gap-2.5">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                isSelected ? 'border-[var(--blue)] bg-[var(--blue)]' : 'border-[var(--line)] bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-display font-semibold text-sm text-ink leading-tight">{dim.title}</div>
                              <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">{dim.dims}</div>
                              <div className="text-sm font-bold text-ink mt-1">{dim.price}€</div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-1 bg-paper rounded-full border border-[var(--line)] p-0.5 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    decrement();
                                  }}
                                  className="w-7 h-7 rounded-full bg-white border border-[var(--line)] hover:border-ink/15 flex items-center justify-center transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-sm font-bold tabular-nums">{quantity}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    increment();
                                  }}
                                  className="w-7 h-7 rounded-full text-white flex items-center justify-center transition-colors hover:opacity-90"
                                  style={{ background: 'var(--blue)' }}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-span-1 sm:col-span-2">
                    <div
                      role="button"
                      onClick={() => setDevisOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setDevisOpen(true);
                        }
                      }}
                      className="group relative rounded-[var(--radius)] p-5 md:p-6 bg-ink text-white cursor-pointer transition-colors hover:bg-[var(--blue)]"
                      tabIndex={0}
                    >
                      <div className="relative flex items-center justify-between gap-4">
                        <div>
                          <h4 className="font-display text-lg md:text-xl font-bold text-white">Sur mesure</h4>
                          <p className="text-white/70 text-xs md:text-sm mt-0.5">Dimensions personnalisées</p>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-white flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessoires */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                  <h3 className="font-display text-lg font-semibold text-ink">Accessoires</h3>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setPompeSelected((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setPompeSelected((v) => !v);
                    }
                  }}
                  className={`relative rounded-[var(--radius)] border transition-colors cursor-pointer p-4 ${
                    pompeSelected
                      ? 'border-[var(--blue)] bg-white'
                      : 'border-[var(--line)] bg-white hover:border-ink/15'
                  }`}
                >
                  <div className="relative flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        pompeSelected ? 'border-[var(--blue)] bg-[var(--blue)]' : 'border-[var(--line)] bg-white'
                      }`}
                    >
                      {pompeSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-sm text-ink leading-tight">Pompe 220 volts</div>
                      <div className="text-sm font-bold text-ink mt-1">60€</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inclus */}
              <div className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-6">
                <h4 className="kicker mb-4">Inclus dans le prix de base</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--blue)' }} />
                      <span className="text-[13px] text-ink/75 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop price + CTA */}
              <div className="hidden md:block sticky bottom-6 rounded-[var(--radius-lg)] bg-ink text-white p-6">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="kicker mb-1" style={{ color: '#7db4f0' }}>Prix HT</div>
                    <div className="font-display text-3xl md:text-4xl font-bold text-white leading-none tabular-nums">€ {formatPrice(totalPrice)}</div>
                  </div>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => setDevisOpen(true)}
                      className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                      tabIndex={0}
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
              </div>
              <div className="h-20 md:hidden"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile sticky price bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden"
        style={{ background: 'linear-gradient(to top, rgba(250, 249, 246, 0.98) 70%, transparent)' }}
      >
        <div className="rounded-[var(--radius)] bg-ink text-white">
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-white/55">Prix HT</div>
              <div className="font-display text-2xl font-bold text-white tabular-nums">€ {formatPrice(totalPrice)}</div>
            </div>
            <button
              type="button"
              onClick={() => setDevisOpen(true)}
              className="flex-1 bg-white text-ink rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-white/90"
              style={{ padding: '12px 16px', minHeight: '48px' }}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ░░ SPECS (dark) ░░ */}
      <section className="bg-ink text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <SectionHeader
            light
            kicker="Fiche technique"
            index="02"
            title={<>Caractéristiques<br /><span className="serif-accent text-white/55">techniques</span></>}
          />
          <Reveal className="mt-12 md:mt-16 border-t border-white/10">
            {specs.map((row, i) => (
              <div
                key={row.k}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-1 sm:gap-8 py-5 border-b border-white/10"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold tabular-nums text-white/25">0{i + 1}</span>
                  <span className="font-display font-semibold text-[15px] text-white">{row.k}</span>
                </div>
                <span className="text-[15px] text-white/60 sm:pl-0 pl-8">{row.v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ░░ PARFAITE POUR ░░ */}
      <section className="bg-white border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
            <SectionHeader
              kicker="Cas d'usage"
              index="03"
              title={<>Parfaite<br />pour</>}
              lead="Là où l'impact visuel fait la différence, l'arche marque l'entrée et le passage."
            />
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {useCases.map((c) => (
              <motion.div
                key={c.n}
                variants={staggerChild}
                className="group flex items-start gap-5 p-7 rounded-[var(--radius-lg)] bg-paper border border-[var(--line)] hover:border-ink/15 transition-colors"
              >
                <span className="font-display text-2xl font-bold leading-none text-ink/20 tabular-nums pt-0.5">{c.n}</span>
                <div>
                  <div className="font-display font-semibold text-ink mb-1.5">{c.title}</div>
                  <div className="text-sm text-[var(--muted)] leading-relaxed">{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </RevealStagger>

          <Reveal className="mt-16 pt-12 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-display text-xl md:text-2xl font-semibold text-ink max-w-md tracking-tight">
              Un projet sur mesure ? Parlons-en.
            </p>
            <Magnetic>
              <button
                type="button"
                onClick={() => setDevisOpen(true)}
                className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Arche Gonflable"
        groupLabel="Tailles"
        lines={devisLines}
        extras={devisExtras}
        total={totalPrice}
      />
    </div>
  );
}
