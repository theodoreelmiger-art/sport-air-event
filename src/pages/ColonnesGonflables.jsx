import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  Minus,
  Plus,
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const HEIGHTS = [
  { id: '2.5m', label: '2.5m', dims: '250x60(diamètre)cm', price: 590 },
  { id: '3m', label: '3m', dims: '300x60(diamètre)cm', price: 670 },
  { id: '4m', label: '4m', dims: '400x70(diamètre)cm', price: 750 },
];

const LED_PRICE = 95;
const PUMP_PRICE = 60;

const SPECS = [
  ['Matériau', 'PVC 650g/m² haute résistance'],
  ['Hauteurs disponibles', '2.5m – 3m – 4m'],
  ['Impression', 'Sublimation HD 360° UV résistant'],
  ['Éclairage', 'LED RGB intégré (option)'],
  ['Temps de montage', '3-5 minutes par colonne'],
  ['Base de lestage', 'Base lestée incluse'],
  ['Usage', 'Intérieur et extérieur'],
  ['Garantie', '2 ans structure + 3 ans impression'],
];

const USAGES = [
  { n: '01', title: 'Balisage sportif', desc: 'Circuits, parcours, zones de balisage' },
  { n: '02', title: 'Entrées & allées', desc: "Créer des couloirs d'honneur visuels" },
  { n: '03', title: 'Salons & expo', desc: 'Signalétique de stand, délimitation' },
  { n: '04', title: 'Soirées & événements', desc: 'Décoration lumineuse, ambiance unique' },
];

const INCLUDED = [
  'Personnalisation complète avec votre logo',
  'Modélisation 3D gratuite',
  'Ventilateur électrique silencieux',
  'Base lestée pour stabilité maximale',
  'Sac de transport professionnel',
  'Design 3D gratuit',
];

export default function ColonnesGonflables() {
  const navigate = useNavigate();
  const [selectedHeight, setSelectedHeight] = useState('3m');
  const [quantity, setQuantity] = useState(1);
  const [ledOn, setLedOn] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [devisOpen, setDevisOpen] = useState(false);

  const heightData = HEIGHTS.find((h) => h.id === selectedHeight) || HEIGHTS[1];
  const totalPrice =
    heightData.price * quantity + (ledOn ? LED_PRICE : 0) + (pumpOn ? PUMP_PRICE : 0);

  const devisLines = [{ label: heightData.label, qty: quantity, unit: heightData.price }];
  const devisExtras = [
    ...(ledOn ? [{ label: 'Éclairage LED RGB intégré', qty: 1, unit: LED_PRICE }] : []),
    ...(pumpOn ? [{ label: 'Pompe 220 volts', qty: 1, unit: PUMP_PRICE }] : []),
  ];

  return (
    <div className="overflow-x-hidden bg-paper">
      <main>
        {/* ░░ CONFIGURATEUR ░░ */}
        <section className="pt-28 md:pt-32 bg-paper">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-8 md:py-12">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
              {/* Visual column */}
              <div className="hidden lg:flex lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] items-center justify-center">
                <Reveal className="relative w-full">
                  <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-10 md:p-14" style={{ aspectRatio: '4 / 5' }}>
                    <span className="absolute top-6 left-7 font-display text-[6rem] md:text-[8rem] font-bold leading-none text-ink/[0.04] select-none">03</span>
                    <span className="absolute top-7 right-7 z-10 kicker" style={{ color: 'var(--blue)' }}>Balisage élégant</span>
                    <img
                      src="images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png"
                      alt="Colonnes Gonflables Sport Air Event"
                      className="relative w-full h-auto object-contain"
                      style={{
                        maxHeight: '560px',
                        mixBlendMode: 'multiply',
                        background: 'transparent',
                        clipPath: 'inset(0px 6px 0px 0px)',
                      }}
                    />
                  </div>
                </Reveal>
              </div>

              {/* Mobile image */}
              <div className="lg:hidden">
                <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-6">
                  <span className="absolute top-4 left-5 font-display text-[4rem] font-bold leading-none text-ink/[0.04] select-none">03</span>
                  <img
                    src="images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png"
                    alt="Colonnes Gonflables Sport Air Event"
                    className="relative w-full h-auto object-contain max-h-60"
                    style={{
                      mixBlendMode: 'multiply',
                      background: 'transparent',
                      clipPath: 'inset(0px 6px 0px 0px)',
                    }}
                  />
                </div>
              </div>

              {/* Configurator column */}
              <div className="space-y-8 md:space-y-10 pb-2 md:pb-8">
                <Reveal>
                  <div className="kicker mb-4">Configurez votre produit</div>
                  <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.1rem,4.6vw,3.4rem)', lineHeight: 1.0 }}>
                    Colonnes Gonflables
                  </h1>
                  <p className="lead mt-4">Balisage élégant pour vos événements</p>
                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-white">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
                    <span className="text-[13px] font-semibold text-ink">Impression totale comprise</span>
                  </div>
                </Reveal>

                {/* Height selector */}
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
                    <h3 className="font-display text-lg font-semibold text-ink">Hauteur</h3>
                    <span className="px-2.5 py-1 text-white text-[11px] font-semibold rounded-full whitespace-nowrap" style={{ background: 'var(--blue)' }}>
                      3m POPULAIRE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <div
                        onClick={() => setSelectedHeight('2.5m')}
                        className={`relative rounded-[var(--radius)] border transition-colors cursor-pointer p-4 ${
                          selectedHeight === '2.5m'
                            ? 'border-ink bg-white'
                            : 'border-[var(--line)] bg-white hover:border-ink/15'
                        }`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              selectedHeight === '2.5m'
                                ? 'border-[var(--blue)] bg-white'
                                : 'border-[var(--line)]'
                            }`}
                          >
                            {selectedHeight === '2.5m' && (
                              <Check className="w-3 h-3 text-[var(--blue)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-semibold text-sm text-ink leading-tight">
                              2.5m
                            </div>
                            <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">
                              250x60(diamètre)cm
                            </div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">590€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => setSelectedHeight('3m')}
                        className={`relative rounded-[var(--radius)] border transition-colors cursor-pointer p-4 ${
                          selectedHeight === '3m'
                            ? 'border-ink bg-white'
                            : 'border-[var(--line)] bg-white hover:border-ink/15'
                        }`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              selectedHeight === '3m'
                                ? 'border-[var(--blue)] bg-white'
                                : 'border-[var(--line)]'
                            }`}
                          >
                            {selectedHeight === '3m' && (
                              <Check className="w-3 h-3 text-[var(--blue)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-semibold text-sm text-ink leading-tight">
                              3m
                            </div>
                            <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">
                              300x60(diamètre)cm
                            </div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">670€</div>
                          </div>
                          <div className="flex items-center gap-1 bg-white rounded-[var(--radius)] border border-[var(--line)] p-0.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuantity((q) => Math.max(1, q - 1));
                              }}
                              className="w-7 h-7 rounded-[10px] bg-[var(--paper-2)] hover:bg-[var(--line)] flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold tabular-nums">{quantity}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuantity((q) => q + 1);
                              }}
                              className="w-7 h-7 rounded-[10px] bg-deep hover:bg-[var(--blue)] text-white flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => setSelectedHeight('4m')}
                        className={`relative rounded-[var(--radius)] border transition-colors cursor-pointer p-4 ${
                          selectedHeight === '4m'
                            ? 'border-ink bg-white'
                            : 'border-[var(--line)] bg-white hover:border-ink/15'
                        }`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              selectedHeight === '4m'
                                ? 'border-[var(--blue)] bg-white'
                                : 'border-[var(--line)]'
                            }`}
                          >
                            {selectedHeight === '4m' && (
                              <Check className="w-3 h-3 text-[var(--blue)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-semibold text-sm text-ink leading-tight">
                              4m
                            </div>
                            <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">
                              400x70(diamètre)cm
                            </div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">750€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => navigate('/ColonnesSurMesure')}
                        role="button"
                        className="group relative overflow-hidden rounded-[var(--radius-lg)] p-5 md:p-6 bg-deep text-white cursor-pointer"
                        tabIndex={0}
                      >
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 md:w-14 md:h-14 rounded-[var(--radius)] border border-white/15 flex items-center justify-center flex-shrink-0">
                              <span className="font-display text-base md:text-lg font-bold text-white">04</span>
                            </div>
                            <div>
                              <h4 className="font-display text-lg md:text-2xl font-bold text-white mb-1">
                                Sur Mesure
                              </h4>
                              <p className="text-white/60 text-xs md:text-sm">
                                Dimensions personnalisées
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:translate-x-2 transition-transform md:flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LED option */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-4">
                    Option éclairage
                  </h3>
                  <button
                    onClick={() => setLedOn((v) => !v)}
                    className={`w-full p-5 md:p-6 rounded-[var(--radius-lg)] border transition-colors text-left ${
                      ledOn
                        ? 'border-ink bg-white'
                        : 'border-[var(--line)] bg-white hover:border-ink/15'
                    }`}
                    tabIndex={0}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          ledOn ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'
                        }`}
                      >
                        {ledOn && <Check className="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)]" />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-display font-semibold text-ink flex items-center gap-2 text-sm md:text-lg mb-1">
                          <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-[var(--blue)]" />
                          Éclairage LED RGB intégré
                        </div>
                        <div className="text-xs md:text-sm text-[var(--muted)] mb-2">
                          Illumination programmable multicolore
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-base md:text-xl font-bold text-[var(--blue)]">+€ 95</div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Accessoires */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-4">Accessoires</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div
                      onClick={() => setPumpOn((v) => !v)}
                      role="button"
                      className={`relative rounded-[var(--radius-lg)] border transition-colors cursor-pointer p-5 ${
                        pumpOn
                          ? 'border-ink bg-white'
                          : 'border-[var(--line)] bg-white hover:border-ink/15'
                      }`}
                    >
                      <div className="relative flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            pumpOn ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'
                          }`}
                        >
                          {pumpOn && <Check className="w-3 h-3 text-[var(--blue)]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-sm text-ink leading-tight">
                            Pompe 220 volts
                          </div>
                          <div className="text-sm font-bold text-[var(--blue)] mt-1">60€</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Included */}
                <div className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-5 md:p-6">
                  <h4 className="font-display text-sm font-semibold text-ink mb-4">
                    Inclus dans le prix de base :
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2.5">
                    {INCLUDED.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[var(--blue)] flex-shrink-0 mt-0.5" />
                        <span className="text-[13px] text-ink/75">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop sticky price */}
                <div className="hidden md:block sticky bottom-6 mt-4 rounded-[var(--radius-lg)] bg-white border border-ink">
                  <div className="p-5 md:p-6">
                    <div className="mb-4">
                      <div className="kicker mb-1" style={{ color: 'var(--muted)' }}>Prix HT</div>
                      <div className="font-display text-3xl md:text-4xl font-bold text-ink tabular-nums">€ {totalPrice}</div>
                    </div>
                    <Magnetic className="w-full">
                      <button
                        type="button"
                        onClick={() => setDevisOpen(true)}
                        className="cta-iridescent w-full inline-flex items-center justify-center gap-2 font-semibold text-[15px]"
                        tabIndex={0}
                        style={{ padding: '14px 24px', minHeight: '52px' }}
                      >
                        Demander un devis
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
                <div className="h-20 md:hidden"></div>
              </div>
            </div>
          </div>

          {/* Mobile sticky price */}
          <div
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden"
            style={{
              background:
                'linear-gradient(to top, rgba(250, 249, 246, 0.98) 70%, transparent)',
            }}
          >
            <div className="rounded-[var(--radius-lg)] bg-white border border-ink shadow-[0_8px_30px_rgba(11,13,18,0.12)]">
              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <div className="kicker" style={{ color: 'var(--muted)' }}>Prix HT</div>
                  <div className="font-display text-2xl font-bold text-ink tabular-nums">€ {totalPrice}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setDevisOpen(true)}
                  className="cta-iridescent flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm"
                  style={{ padding: '12px 16px', minHeight: '48px' }}
                >
                  Demander un devis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ░░ SPECS (dark) ░░ */}
        <section className="bg-deep text-white">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
            <SectionHeader
              light
              kicker="Fiche technique"
              index="01"
              title={<>Caractéristiques<br /><span className="serif-accent text-white/55">techniques</span></>}
              className="mb-14"
            />
            <Reveal className="border-t border-white/10">
              <table className="w-full text-sm">
                <tbody>
                  {SPECS.map(([label, value]) => (
                    <tr key={label} className="border-b border-white/10">
                      <td className="py-4 pr-4 font-display font-semibold text-white w-1/2 align-top">{label}</td>
                      <td className="py-4 text-white/55 align-top">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* ░░ USAGES ░░ */}
        <section className="bg-paper">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <SectionHeader
                kicker="Cas d'usage"
                index="02"
                title={<>Parfaites pour<br />vos événements</>}
              />
              <Reveal as="div" delay={0.1} className="md:pb-2">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => setDevisOpen(true)}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-ink/15 hover:border-[var(--blue)] hover:text-[var(--blue)] pb-1 transition-colors"
                  >
                    Demander un devis <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </Magnetic>
              </Reveal>
            </div>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USAGES.map((u) => (
                <motion.div
                  key={u.n}
                  variants={staggerChild}
                  className="group flex items-start justify-between gap-4 p-6 md:p-7 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors"
                >
                  <div>
                    <div className="font-display text-lg font-semibold text-ink mb-1.5">{u.title}</div>
                    <div className="text-sm text-[var(--muted)]">{u.desc}</div>
                  </div>
                  <span className="font-display text-2xl font-bold text-ink/15 tabular-nums select-none">{u.n}</span>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </section>
      </main>

      <motion.a
        href="https://wa.me/41774835190"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-deep rounded-full shadow-[0_12px_30px_rgba(11,13,18,0.28)] flex items-center justify-center text-white"
        tabIndex={0}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Colonnes Gonflables"
        groupLabel="Hauteurs"
        lines={devisLines}
        extras={devisExtras}
        total={totalPrice}
      />
    </div>
  );
}
