import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, MessageCircle, Layers, Ruler, Sparkles, Lightbulb,
  Timer, Anchor, Sun, ShieldCheck, Flag, DoorOpen, LayoutPanelTop, PartyPopper,
} from 'lucide-react';
import { Reveal, Rise, ClipReveal, MaskHeading, Magnetic, RevealStagger, staggerChild } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

/* SPECS — real label + full real value preserved verbatim. The compact card grid
   renders the label and the value as the prominent line — no derived facts. */
const SPECS = [
  { icon: Layers, label: 'Matériau', value: 'PVC 650g/m² haute résistance' },
  { icon: Ruler, label: 'Hauteurs disponibles', value: '2.5m – 3m – 4m' },
  { icon: Sparkles, label: 'Impression', value: 'Sublimation HD 360° UV résistant' },
  { icon: Lightbulb, label: 'Éclairage', value: 'LED RGB intégré (option)' },
  { icon: Timer, label: 'Temps de montage', value: '3-5 minutes par colonne' },
  { icon: Anchor, label: 'Base de lestage', value: 'Base lestée incluse' },
  { icon: Sun, label: 'Usage', value: 'Intérieur et extérieur' },
  { icon: ShieldCheck, label: 'Garantie', value: '2 ans structure + 3 ans impression' },
];

const USAGES = [
  { n: '01', icon: Flag, title: 'Balisage sportif', desc: 'Circuits, parcours, zones de balisage' },
  { n: '02', icon: DoorOpen, title: 'Entrées & allées', desc: "Créer des couloirs d'honneur visuels" },
  { n: '03', icon: LayoutPanelTop, title: 'Salons & expo', desc: 'Signalétique de stand, délimitation' },
  { n: '04', icon: PartyPopper, title: 'Soirées & événements', desc: 'Décoration lumineuse, ambiance unique' },
];

/* ░░ Compact spec-card grid — icône + label, valeur réelle en évidence ░░ */
function SpecCardGrid() {
  return (
    <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3.5">
      {SPECS.map((row) => {
        const Icon = row.icon;
        return (
          <motion.div
            variants={staggerChild}
            key={row.label}
            className="col-spec-card flex flex-col rounded-2xl border border-[var(--line)] bg-white p-4 md:p-5 transition-colors duration-200"
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)]">
                <Icon className="w-4 h-4" strokeWidth={2.4} />
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.1em] leading-tight text-[var(--blue-deep)]">
                {row.label}
              </span>
            </div>
            <div className="font-display font-bold tracking-tightest text-ink leading-[1.1] text-[clamp(1.05rem,1.8vw,1.35rem)]">
              {row.value}
            </div>
          </motion.div>
        );
      })}
      <style>{`.col-spec-card:hover{border-color:rgba(0,102,204,0.2);background:var(--blue-mist);}`}</style>
    </RevealStagger>
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
          <div className="relative max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9 md:mb-12">
              <div className="max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
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

            {/* Compact spec-card grid */}
            <SpecCardGrid />
          </div>
        </section>

        {/* ░░ USAGES ░░ */}
        <section className="bg-white border-t border-[var(--line)]">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
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
