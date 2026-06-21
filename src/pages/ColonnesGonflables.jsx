import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, MessageCircle, Layers, Ruler, Sparkles, Lightbulb,
  Timer, Anchor, Sun, ShieldCheck, Flag, DoorOpen, LayoutPanelTop, PartyPopper,
} from 'lucide-react';
import { Reveal, Rise, ClipReveal, MaskHeading, Magnetic } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

/* SPECS — real values preserved; `big`/`tail` = compact headline for the V71
   detail panel, `badges` = quick descriptors derived from each real value. */
const SPECS = [
  { icon: Layers, label: 'Matériau', value: 'PVC 650g/m² haute résistance', big: 'PVC', tail: '650g/m²', badges: ['650g/m²', 'Haute résistance'] },
  { icon: Ruler, label: 'Hauteurs disponibles', value: '2.5m – 3m – 4m', big: '2.5–4', tail: 'm', badges: ['2.5m', '3m', '4m'] },
  { icon: Sparkles, label: 'Impression', value: 'Sublimation HD 360° UV résistant', big: 'HD 360°', tail: 'UV', badges: ['Sublimation', '360°', 'Anti-UV'] },
  { icon: Lightbulb, label: 'Éclairage', value: 'LED RGB intégré (option)', big: 'LED', tail: 'RGB', badges: ['LED RGB', 'Option'] },
  { icon: Timer, label: 'Temps de montage', value: '3-5 minutes par colonne', big: '3-5', tail: 'min', badges: ['Par colonne', 'Montage rapide'] },
  { icon: Anchor, label: 'Base de lestage', value: 'Base lestée incluse', big: 'Base', tail: 'lestée', badges: ['Incluse', 'Stable'] },
  { icon: Sun, label: 'Usage', value: 'Intérieur et extérieur', big: 'Indoor', tail: 'outdoor', badges: ['Intérieur', 'Extérieur'] },
  { icon: ShieldCheck, label: 'Garantie', value: '2 ans structure + 3 ans impression', big: '2-3', tail: 'ans', badges: ['Structure', 'Impression'] },
];

const USAGES = [
  { n: '01', icon: Flag, title: 'Balisage sportif', desc: 'Circuits, parcours, zones de balisage' },
  { n: '02', icon: DoorOpen, title: 'Entrées & allées', desc: "Créer des couloirs d'honneur visuels" },
  { n: '03', icon: LayoutPanelTop, title: 'Salons & expo', desc: 'Signalétique de stand, délimitation' },
  { n: '04', icon: PartyPopper, title: 'Soirées & événements', desc: 'Décoration lumineuse, ambiance unique' },
];

/* ░░ V71 — rail de labels sélectionnables + grand panneau valeur synchronisé ░░ */
function SpecRailDetail() {
  const [active, setActive] = useState(0);
  const s = SPECS[active];
  const Icon = s.icon;

  return (
    <Reveal as="div" y={18}>
      <div className="grid gap-3 md:gap-3.5" style={{ gridTemplateColumns: 'minmax(150px, 0.85fr) 1.15fr' }}>
        {/* Left rail — selectable label list */}
        <div className="self-start overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
          {SPECS.map((row, i) => {
            const on = i === active;
            const RIcon = row.icon;
            return (
              <button
                key={row.label}
                type="button"
                onClick={() => setActive(i)}
                data-cursor
                className="cursor-pointer w-full flex items-center gap-2.5 sm:gap-3 text-left relative py-3 px-3 sm:px-4 transition-colors duration-200"
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  background: on ? 'var(--blue-mist)' : 'transparent',
                }}
              >
                {on && (
                  <motion.span
                    layoutId="spec-rail-indicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full"
                    style={{ background: 'var(--blue)' }}
                  />
                )}
                <span
                  className="inline-flex items-center justify-center shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl transition-colors duration-200"
                  style={{
                    background: on ? 'var(--blue)' : 'var(--blue-soft)',
                    color: on ? '#fff' : 'var(--blue)',
                  }}
                >
                  <RIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.4} />
                </span>
                <span
                  className="text-[0.82rem] sm:text-[0.9rem] leading-tight"
                  style={{
                    fontWeight: on ? 700 : 600,
                    color: on ? 'var(--blue-deep)' : 'var(--ink-2)',
                  }}
                >
                  {row.label}
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
            className="rounded-3xl border border-[var(--line)] p-5 sm:p-7 md:p-8"
            style={{ background: 'var(--blue-mist)' }}
          >
            <span className="inline-flex items-center justify-center mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[var(--line)] text-[var(--blue)]">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
            </span>

            <div className="kicker" style={{ color: 'var(--blue-deep)' }}>{s.label}</div>

            <div className="font-display flex items-end gap-2 flex-wrap mt-1.5 tracking-tightest" style={{ lineHeight: 0.95 }}>
              <span className="text-ink text-[clamp(1.9rem,6vw,3.2rem)]">{s.big}</span>
              <span className="text-[var(--blue)] text-[clamp(1rem,3vw,1.6rem)] pb-1.5">{s.tail}</span>
            </div>

            <div className="mt-3 text-[0.95rem] sm:text-[1.02rem] leading-relaxed text-[var(--ink-2)]">
              {s.value}
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {s.badges.map((b, bi) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white py-1.5 px-3 text-[0.78rem] font-bold text-[var(--ink-2)]"
                >
                  {bi === 0 && <Icon className="w-3 h-3 text-[var(--blue)]" strokeWidth={2.6} />}
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function ColonnesGonflables() {
  return (
    <div className="overflow-x-clip bg-paper">
      <main>
        {/* ░░ HERO (slim) ░░ */}
        <section className="pt-28 md:pt-32 bg-paper">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-8 md:py-12">
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
          </div>

          {/* ░░ CONFIGURATEUR (shared, sticky image + per-option steppers) ░░ */}
          <ProductConfigurator data={CONFIGURATORS.colonnes} />
        </section>

        {/* ░░ SPECS — bento grid ░░ */}
        <section className="bg-paper relative overflow-hidden">
          {/* soft blue ambient wash */}
          <div className="pointer-events-none absolute -top-24 right-[6%] w-[36rem] h-[36rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.08), transparent 70%)', filter: 'blur(40px)' }} />
          <div className="relative max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Fiche technique</span>
                </Reveal>
                <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                  <MaskHeading text="Caractéristiques" />
                  <br />
                  <span className="serif-accent text-[var(--blue)]"><MaskHeading text="techniques" delay={0.12} /></span>
                </h2>
              </div>
              <Rise as="p" y={26} delay={0.1} className="lead max-w-sm md:text-right md:pb-2">
                Une structure pensée dans le moindre détail, conçue pour durer et briller.
              </Rise>
            </div>

            {/* V71 — Liste scindée (rail de labels + grand panneau détail synchronisé) */}
            <SpecRailDetail />
          </div>
        </section>

        {/* ░░ USAGES ░░ */}
        <section className="bg-white border-t border-[var(--line)]">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Cas d'usage</span>
                </Reveal>
                <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                  <MaskHeading text="Parfaites pour" />
                  <br />
                  <MaskHeading text="vos événements" delay={0.12} />
                </h2>
              </div>
              <Reveal as="div" delay={0.1} className="md:pb-2">
                <Magnetic>
                  <Link
                    to="/Contact"
                    data-cursor
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-[var(--blue)]/25 hover:border-[var(--blue)] hover:text-[var(--blue)] pb-1 transition-colors"
                  >
                    Demander un devis <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            {/* V73 — Liste-rangées éditoriales (informatif, non-interactif) */}
            <Reveal as="div" y={18}>
              <div className="border-t border-[var(--line)]">
                {USAGES.map((u) => {
                  const Icon = u.icon;
                  return (
                    <div
                      key={u.n}
                      className="uc73-row relative flex items-center gap-4 sm:gap-5 overflow-hidden bg-white border-b border-[var(--line)] py-5 sm:py-6 px-3 sm:px-5 transition-colors duration-200"
                    >
                      <span className="font-display shrink-0 tabular-nums select-none font-extrabold text-[1.4rem] sm:text-[1.6rem] w-9 sm:w-12 text-[#c2d2ea]">
                        {u.n}
                      </span>
                      <span className="flex items-center justify-center shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--blue-soft)] text-[var(--blue)]">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display font-semibold text-ink leading-tight text-[1.05rem] sm:text-[1.3rem]">
                          {u.title}
                        </span>
                        <span className="block text-[var(--muted)] leading-relaxed text-[0.9rem] sm:text-[0.98rem] mt-1">
                          {u.desc}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <style>{`.uc73-row:hover{background:var(--blue-mist);}`}</style>
            </Reveal>

            {/* ░░ closing CTA panel (deep blue) ░░ */}
            <ClipReveal className="mt-16 md:mt-20 rounded-[28px]" scaleFrom={1.06}>
              <div className="relative overflow-hidden bg-deep text-white px-7 sm:px-12 py-12 md:py-16">
                <div className="pointer-events-none absolute -top-16 right-[10%] w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(70,150,255,0.32), transparent 70%)', filter: 'blur(44px)' }} />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div>
                    <span className="kicker" style={{ color: '#7db4f0' }}>Votre projet</span>
                    <h3 className="mt-4 font-display font-bold tracking-tightest text-white leading-[1.05] text-[clamp(1.7rem,3.4vw,2.7rem)]">
                      <MaskHeading text="Balisez vos événements avec style" />
                    </h3>
                    <Rise as="p" y={22} delay={0.1} className="mt-4 text-white/70 max-w-md">Impression totale comprise. Conception Suisse, livraison rapide.</Rise>
                  </div>
                  <Reveal as="div" delay={0.15} className="flex-shrink-0">
                    <Magnetic>
                      <Link to="/Contact" data-cursor className="inline-flex items-center gap-2 bg-white text-[var(--blue)] font-semibold rounded-full px-7 py-3.5 text-[15px] hover:bg-white/90 transition-colors">
                        Demander un devis gratuit <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Magnetic>
                  </Reveal>
                </div>
              </div>
            </ClipReveal>
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
    </div>
  );
}
