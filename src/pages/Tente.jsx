import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const SIZES = [
  { id: '3x3', label: '3x3m', price: 1180 },
  { id: '4x4', label: '4x4m', price: 1490 },
  { id: '5x5', label: '5x5m', price: 1790 },
];

const PAROIS = [
  { id: 'simple', label: 'Paroi simple', price: 170 },
  { id: 'porte', label: 'Paroi avec porte (zipp central)', price: 190 },
  { id: 'petite-fenetre', label: 'Paroi avec petite fenêtre', price: 180 },
  { id: 'grande-fenetre', label: 'Paroi grande fenêtre', price: 180 },
  { id: 'double', label: 'Paroi double (impression recto - verso doublée)', price: 290 },
];

const OPTIONS = [
  { id: 'auvent', label: 'Auvent', price: 280 },
  { id: 'connexion', label: 'Connexion inter-tente', price: 180 },
];

const ACCESSOIRES = [
  { id: 'pompe', label: 'Pompe 220 volts', price: 60 },
];

const SPECS = [
  ['Matériau', 'Oxford 600D haute résistance + TPU'],
  ['Pression de gonflage', 'Haute pression 0.35 bar'],
  ['Résistance au vent', "Jusqu'à 70 km/h"],
  ['Temps de gonflage', '60-90 secondes'],
  ['Impression', 'Sublimation HD 360° résistante aux UV'],
  ['Certification', 'Anti-feu M2, Anti-UV'],
  ['Garantie', '5 ans structure + impression'],
  ['Poids (4x4m)', '~12 kg'],
];

const USAGES = [
  { tag: '01', title: 'Événements sportifs', desc: 'Marathons, trails, salons sport, zones VIP' },
  { tag: '02', title: 'Salons professionnels', desc: 'Stands B2B, expositions, conventions' },
  { tag: '03', title: 'Festivals & concerts', desc: 'Zones presse, accueil VIP, backstage' },
  { tag: '04', title: 'Points de vente', desc: 'Pop-up stores, démonstrations, promotions' },
];

const INCLUS = [
  'Impression de la partie haute de la tente',
  'Structure portante haute pression',
  'Modélisation 3D gratuite',
  'Sac de transport sur roulettes',
  'Sacs de lest, cordages et sardines à visser',
  '5 ans de garantie',
  'Envoi gratuit',
  'Design 3D gratuit',
];

export default function Tente() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('4x4');
  const [quantity, setQuantity] = useState(1);
  const [parois, setParois] = useState([]);
  const [options, setOptions] = useState([]);
  const [accessoires, setAccessoires] = useState([]);
  const [devisOpen, setDevisOpen] = useState(false);

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const size = SIZES.find((s) => s.id === selectedSize);
  const sizePrice = size?.price ?? 0;
  const paroisPrice = PAROIS.filter((p) => parois.includes(p.id)).reduce((a, p) => a + p.price, 0);
  const optionsPrice = OPTIONS.filter((o) => options.includes(o.id)).reduce((a, o) => a + o.price, 0);
  const accessoiresPrice = ACCESSOIRES.filter((a) => accessoires.includes(a.id)).reduce((acc, a) => acc + a.price, 0);
  const total = sizePrice * quantity + paroisPrice + optionsPrice + accessoiresPrice;
  const totalFormatted = total.toLocaleString('en-US');

  const devisLines = size ? [{ label: size.label, qty: quantity, unit: size.price }] : [];
  const devisExtras = [
    ...PAROIS.filter((p) => parois.includes(p.id)).map((p) => ({ label: p.label, qty: 1, unit: p.price })),
    ...OPTIONS.filter((o) => options.includes(o.id)).map((o) => ({ label: o.label, qty: 1, unit: o.price })),
    ...ACCESSOIRES.filter((a) => accessoires.includes(a.id)).map((a) => ({ label: a.label, qty: 1, unit: a.price })),
  ];

  // Shared flat editorial card style for configurator selectables
  const cardBase = 'relative rounded-[var(--radius-lg)] border bg-white transition-colors cursor-pointer p-4';
  const cardOn = 'border-[var(--blue)] bg-[var(--blue-soft)]/40';
  const cardOff = 'border-[var(--line)] hover:border-ink/15';
  const boxBase = 'w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors';

  return (
    <div className="overflow-x-hidden bg-paper">
      <main>
        {/* ░░ CONFIGURATOR ░░ */}
        <section className="bg-paper pt-28 md:pt-32">
          <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pb-16 md:pb-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Sticky visual — desktop */}
              <div className="hidden lg:flex lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] flex-col justify-center">
                <Reveal as="div" className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">—</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Configurateur</span>
                </Reveal>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[var(--radius-lg)] bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-10"
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <span className="absolute top-5 left-6 font-display text-[6rem] font-bold leading-none text-ink/[0.04] select-none">02</span>
                  <img
                    src="images/03_330206aa0_ChatGPTImage17janv202613_32_29.png"
                    alt="Tente Sport Air Event"
                    className="relative max-h-[80%] w-auto object-contain"
                    style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                  />
                </motion.div>
                <Reveal as="p" delay={0.1} className="mt-6 text-sm text-[var(--muted)] max-w-sm leading-relaxed">
                  Composez votre tente, ajustez les options et obtenez un prix en temps réel.
                </Reveal>
              </div>

              {/* Visual — mobile */}
              <div className="lg:hidden">
                <div className="relative rounded-[var(--radius-lg)] bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-6">
                  <img
                    src="images/03_330206aa0_ChatGPTImage17janv202613_32_29.png"
                    alt="Tente Sport Air Event"
                    className="w-full h-auto object-contain max-h-56"
                    style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                  />
                </div>
              </div>

              {/* Configurator column */}
              <div className="space-y-10 md:space-y-12 pb-2">
                <Reveal>
                  <div className="kicker mb-4">Notre produit phare</div>
                  <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2rem,4.6vw,3.2rem)', lineHeight: 1.02 }}>
                    Tente Spider Gonflable
                  </h1>
                  <p className="lead mt-4 max-w-md">Installation en 2 minutes · Conception Suisse</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3.5 py-1.5">
                    <Check className="w-3.5 h-3.5 text-[var(--blue)]" />
                    <span className="text-xs font-semibold text-ink">Impression totale comprise</span>
                  </div>
                </Reveal>

                {/* Taille */}
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-5">
                    <h3 className="font-display text-lg font-semibold text-ink">Taille</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full text-white text-[11px] font-semibold px-2.5 py-1 whitespace-nowrap" style={{ background: 'var(--blue)' }}>⭐ 4x4m populaire</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <div
                        onClick={() => setSelectedSize('3x3')}
                        className={`${cardBase} ${selectedSize === '3x3' ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${selectedSize === '3x3' ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {selectedSize === '3x3' && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">3x3m</div>
                            <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">300x300(H)x300cm</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">1180€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => setSelectedSize('4x4')}
                        className={`${cardBase} ${selectedSize === '4x4' ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${selectedSize === '4x4' ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {selectedSize === '4x4' && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">4x4m</div>
                            <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">400x400(H)x400cm</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">1490€</div>
                          </div>
                          <div className="flex items-center gap-1 bg-white rounded-xl border border-[var(--line)] p-0.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setQuantity((q) => Math.max(1, q - 1)); }}
                              className="w-7 h-7 rounded-lg bg-[var(--paper-2)] hover:bg-[var(--line)] flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold tabular-nums">{quantity}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setQuantity((q) => q + 1); }}
                              className="w-7 h-7 rounded-lg bg-[var(--blue)] hover:bg-[var(--blue-deep)] text-white flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => setSelectedSize('5x5')}
                        className={`${cardBase} ${selectedSize === '5x5' ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${selectedSize === '5x5' ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {selectedSize === '5x5' && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">5x5m</div>
                            <div className="text-xs text-[var(--muted)] leading-tight mt-0.5">500x500(H)x500cm</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">1790€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => navigate('/TenteSurMesure')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/TenteSurMesure'); } }}
                        className="group relative overflow-hidden rounded-[var(--radius-lg)] p-5 md:p-6 bg-ink text-white cursor-pointer transition-colors"
                        tabIndex={0}
                      >
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                          <div>
                            <div className="kicker mb-2" style={{ color: '#7db4f0' }}>Sur Mesure</div>
                            <h4 className="font-display text-xl md:text-2xl font-bold text-white">Dimensions personnalisées</h4>
                            <p className="text-white/55 text-sm mt-1">Une structure pensée pour votre projet</p>
                          </div>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b-2 border-white/25 group-hover:border-[#7db4f0] pb-1 transition-colors flex-shrink-0">
                            Configurer <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parois */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-5">Parois</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <div
                        onClick={() => toggle(parois, setParois, 'simple')}
                        className={`${cardBase} ${parois.includes('simple') ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${parois.includes('simple') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {parois.includes('simple') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">Paroi simple</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">170€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => toggle(parois, setParois, 'porte')}
                        className={`${cardBase} ${parois.includes('porte') ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${parois.includes('porte') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {parois.includes('porte') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">Paroi avec porte (zipp central)</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">190€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => toggle(parois, setParois, 'petite-fenetre')}
                        className={`${cardBase} ${parois.includes('petite-fenetre') ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${parois.includes('petite-fenetre') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {parois.includes('petite-fenetre') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">Paroi avec petite fenêtre</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">180€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => toggle(parois, setParois, 'grande-fenetre')}
                        className={`${cardBase} ${parois.includes('grande-fenetre') ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${parois.includes('grande-fenetre') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {parois.includes('grande-fenetre') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">Paroi grande fenêtre</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">180€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => toggle(parois, setParois, 'double')}
                        className={`${cardBase} ${parois.includes('double') ? cardOn : cardOff}`}
                      >
                        <div className="relative flex items-center gap-2.5">
                          <div className={`${boxBase} ${parois.includes('double') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                            {parois.includes('double') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-ink leading-tight">Paroi double (impression recto - verso doublée)</div>
                            <div className="text-sm font-bold text-[var(--blue)] mt-1">290€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options supplémentaires */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-5">Options supplémentaires</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div
                      onClick={() => toggle(options, setOptions, 'auvent')}
                      className={`${cardBase} ${options.includes('auvent') ? cardOn : cardOff}`}
                    >
                      <div className="relative flex items-center gap-2.5">
                        <div className={`${boxBase} ${options.includes('auvent') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                          {options.includes('auvent') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-ink leading-tight">Auvent</div>
                          <div className="text-sm font-bold text-[var(--blue)] mt-1">280€</div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => toggle(options, setOptions, 'connexion')}
                      className={`${cardBase} ${options.includes('connexion') ? cardOn : cardOff}`}
                    >
                      <div className="relative flex items-center gap-2.5">
                        <div className={`${boxBase} ${options.includes('connexion') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                          {options.includes('connexion') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-ink leading-tight">Connexion inter-tente</div>
                          <div className="text-sm font-bold text-[var(--blue)] mt-1">180€</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accessoires */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-5">Accessoires</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div
                      onClick={() => toggle(accessoires, setAccessoires, 'pompe')}
                      className={`${cardBase} ${accessoires.includes('pompe') ? cardOn : cardOff}`}
                    >
                      <div className="relative flex items-center gap-2.5">
                        <div className={`${boxBase} ${accessoires.includes('pompe') ? 'border-[var(--blue)] bg-white' : 'border-[var(--line)]'}`}>
                          {accessoires.includes('pompe') && <Check className="w-3 h-3 text-[var(--blue)]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-ink leading-tight">Pompe 220 volts</div>
                          <div className="text-sm font-bold text-[var(--blue)] mt-1">60€</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inclus */}
                <div className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-6">
                  <h4 className="font-display text-sm font-semibold text-ink mb-4">Inclus dans le prix de base</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                    {INCLUS.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[var(--blue)] flex-shrink-0 mt-0.5" />
                        <span className="text-[13px] text-ink/75 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sticky price — desktop */}
                <div className="hidden md:block sticky bottom-6 mt-4 rounded-[var(--radius-lg)] bg-ink text-white border border-ink">
                  <div className="p-6 flex items-center justify-between gap-6">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-white/45 font-semibold mb-1">Prix HT</div>
                      <div className="font-display text-3xl md:text-4xl font-bold text-white tabular-nums">€ {totalFormatted}</div>
                    </div>
                    <Magnetic>
                      <button
                        type="button"
                        onClick={() => setDevisOpen(true)}
                        className="cta-iridescent inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px]"
                      >
                        Demander un devis
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
                <div className="h-20 md:hidden" />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky price — mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden">
          <div className="rounded-[var(--radius-lg)] bg-ink text-white border border-ink shadow-[0_-8px_30px_rgba(11,13,18,0.18)]">
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-semibold">Prix HT</div>
                <div className="font-display text-2xl font-bold text-white tabular-nums">€ {totalFormatted}</div>
              </div>
              <button
                type="button"
                onClick={() => setDevisOpen(true)}
                className="cta-iridescent flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-3"
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
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 md:mb-16">
              <div className="lg:col-span-7">
                <SectionHeader light kicker="Fiche technique" index="01"
                  title={<>Caractéristiques<br /><span className="serif-accent text-white/55">techniques</span></>} />
              </div>
              <Reveal as="p" delay={0.1} className="lg:col-span-5 text-white/65 leading-relaxed">
                Une structure conçue pour durer : matériaux haute résistance, certification anti-feu et
                impression sublimation garantie 5 ans.
              </Reveal>
            </div>

            <RevealStagger className="rounded-[var(--radius-lg)] border border-white/10 overflow-hidden">
              {SPECS.map(([k, v], i) => (
                <motion.div
                  variants={staggerChild}
                  key={k}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${i !== SPECS.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div className="flex items-center gap-4 sm:w-1/2">
                    <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                    <span className="font-display text-[15px] font-semibold text-white">{k}</span>
                  </div>
                  <span className="text-sm text-white/55 sm:w-1/2">{v}</span>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ░░ PARFAITE POUR ░░ */}
        <section className="bg-paper py-20 md:py-28">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <SectionHeader kicker="Cas d'usage" index="02"
                title={<>Parfaite pour<br />vos événements</>} />
              <Reveal as="div" delay={0.1} className="md:pb-2">
                <Magnetic>
                  <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {USAGES.map((u) => (
                <motion.div
                  variants={staggerChild}
                  key={u.tag}
                  className="group rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors p-7"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-2xl font-bold text-ink/[0.12] tabular-nums">{u.tag}</span>
                    <ArrowUpRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--blue)] transition-colors" />
                  </div>
                  <div className="font-display text-lg font-semibold text-ink mb-1.5">{u.title}</div>
                  <div className="text-sm text-[var(--muted)] leading-relaxed">{u.desc}</div>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/41774835190"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[var(--blue)] hover:bg-[var(--blue-deep)] rounded-full shadow-2xl flex items-center justify-center text-white transition-colors"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Tente Spider"
        groupLabel="Tailles"
        lines={devisLines}
        extras={devisExtras}
        total={total}
      />
    </div>
  );
}
