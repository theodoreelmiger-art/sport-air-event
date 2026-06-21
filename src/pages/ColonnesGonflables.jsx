import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, MessageCircle, Layers, Ruler, Sparkles, Lightbulb,
  Timer, Anchor, Sun, ShieldCheck, Flag, DoorOpen, LayoutPanelTop, PartyPopper,
} from 'lucide-react';
import { Reveal, RevealStagger, Rise, ClipReveal, MaskHeading, Magnetic, staggerChild } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

const SPECS = [
  { icon: Layers, label: 'Matériau', value: 'PVC 650g/m² haute résistance', span: 'lg:col-span-2', feature: true },
  { icon: Ruler, label: 'Hauteurs disponibles', value: '2.5m – 3m – 4m' },
  { icon: Sparkles, label: 'Impression', value: 'Sublimation HD 360° UV résistant' },
  { icon: Lightbulb, label: 'Éclairage', value: 'LED RGB intégré (option)' },
  { icon: Timer, label: 'Temps de montage', value: '3-5 minutes par colonne' },
  { icon: Anchor, label: 'Base de lestage', value: 'Base lestée incluse' },
  { icon: Sun, label: 'Usage', value: 'Intérieur et extérieur' },
  { icon: ShieldCheck, label: 'Garantie', value: '2 ans structure + 3 ans impression', span: 'lg:col-span-2', feature: true },
];

const USAGES = [
  { n: '01', icon: Flag, title: 'Balisage sportif', desc: 'Circuits, parcours, zones de balisage' },
  { n: '02', icon: DoorOpen, title: 'Entrées & allées', desc: "Créer des couloirs d'honneur visuels" },
  { n: '03', icon: LayoutPanelTop, title: 'Salons & expo', desc: 'Signalétique de stand, délimitation' },
  { n: '04', icon: PartyPopper, title: 'Soirées & événements', desc: 'Décoration lumineuse, ambiance unique' },
];

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

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {SPECS.map((s) => {
                const Icon = s.icon;
                return s.feature ? (
                  /* deep-blue accent panel for rhythm */
                  <motion.div
                    key={s.label}
                    variants={staggerChild}
                    data-cursor
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={`group relative overflow-hidden bg-deep text-white rounded-[28px] p-7 md:p-8 cursor-pointer ${s.span || ''}`}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(125,180,240,0.45), transparent 70%)', filter: 'blur(30px)' }} />
                    <div className="relative flex items-start justify-between">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 ring-1 ring-white/15">
                        <Icon className="w-6 h-6 text-[#7db4f0]" />
                      </span>
                      <span className="kicker" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</span>
                    </div>
                    <div className="relative mt-8 font-display font-bold tracking-tightest text-white leading-[1.05] text-[clamp(1.5rem,2.6vw,2.1rem)]">
                      {s.value}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={s.label}
                    variants={staggerChild}
                    data-cursor
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden bg-white rounded-[28px] p-7 md:p-8 border border-[var(--line)] hover:border-[var(--blue)] hover:shadow-[0_24px_60px_-24px_rgba(0,102,204,0.4)] transition-[border-color,box-shadow] duration-300 cursor-pointer"
                  >
                    <div className="pointer-events-none absolute -right-12 -bottom-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.16), transparent 70%)', filter: 'blur(28px)' }} />
                    <div className="relative flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[var(--blue-soft)] text-[var(--blue)] group-hover:bg-[var(--blue)] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="kicker" style={{ color: 'var(--muted)' }}>{s.label}</span>
                    </div>
                    <div className="relative mt-6 font-display font-bold text-ink tracking-tight leading-[1.15] text-[clamp(1.15rem,1.9vw,1.5rem)]">
                      {s.value}
                    </div>
                  </motion.div>
                );
              })}
            </RevealStagger>
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

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {USAGES.map((u) => {
                const Icon = u.icon;
                return (
                  <motion.div
                    key={u.n}
                    variants={staggerChild}
                    data-cursor
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden rounded-[28px] bg-[var(--blue-mist)] border border-[var(--line)] p-8 md:p-10 cursor-pointer hover:border-[var(--blue)] hover:shadow-[0_30px_70px_-28px_rgba(0,102,204,0.45)] transition-[border-color,box-shadow] duration-300"
                  >
                    {/* blue glow on hover */}
                    <div className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(36px)' }} />
                    {/* oversized ghost number */}
                    <span className="pointer-events-none absolute right-5 -bottom-4 font-display font-bold leading-none text-[var(--blue)]/[0.07] group-hover:text-[var(--blue)]/[0.12] transition-colors select-none tabular-nums" style={{ fontSize: 'clamp(5rem,9vw,8rem)' }}>{u.n}</span>

                    <div className="relative flex items-center justify-between mb-7">
                      <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-[var(--blue)] ring-1 ring-[var(--line)] group-hover:bg-[var(--blue)] group-hover:text-white group-hover:ring-[var(--blue)] transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </span>
                      <span className="kicker tabular-nums" style={{ color: 'var(--muted)' }}>{u.n}</span>
                    </div>
                    <h3 className="relative font-display text-2xl md:text-[1.7rem] font-bold text-ink tracking-tight mb-2.5">{u.title}</h3>
                    <p className="relative text-[15px] text-[var(--muted)] leading-relaxed max-w-xs">{u.desc}</p>
                  </motion.div>
                );
              })}
            </RevealStagger>

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
