import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Layers, Wind, Sparkles, Timer, ShieldCheck,
  Feather, Sun, PartyPopper, Building2, Wine, Tent,
} from 'lucide-react';
import {
  Reveal, RevealStagger, Rise, ClipReveal, MaskHeading, Magnetic, staggerChild, motion,
} from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

/* Technical specs — label + prominent value, with an icon for the bento accent. */
const SPECS = [
  { icon: Layers, label: 'Matériau', value: 'PVC 0.6mm', sub: 'Soudé haute fréquence, étanche' },
  { icon: Wind, label: 'Gonflage', value: 'Air permanent', sub: 'Souffleur silencieux fourni' },
  { icon: Sparkles, label: 'Impression', value: 'HD 360°', sub: 'Sublimation résistante aux UV' },
  { icon: Timer, label: 'Montage', value: '< 2 min', sub: 'Mise en place par une personne' },
  { icon: Feather, label: 'Transport', value: 'Ultra-léger', sub: 'Plié dans un sac dédié' },
  { icon: Sun, label: 'Usage', value: 'Indoor / Outdoor', sub: 'Intérieur comme extérieur' },
  { icon: ShieldCheck, label: 'Garantie', value: '2 ans', sub: 'Structure + impression' },
];

/* Use-cases — keep every word, only the design changes. */
const USAGES = [
  { n: '01', icon: PartyPopper, title: 'Lounges & espaces VIP', desc: 'Créez des zones de détente premium pour vos invités et partenaires.' },
  { n: '02', icon: Building2, title: 'Salons & stands', desc: 'Habillez votre stand avec un mobilier aux couleurs de votre marque.' },
  { n: '03', icon: Wine, title: 'Bars & réceptions', desc: 'Bars gonflables imprimés pour cocktails, lancements et soirées.' },
  { n: '04', icon: Tent, title: 'Événements sportifs', desc: 'Assises et tables qui complètent vos arches et tentes Sport Air Event.' },
];

export default function Mobilier() {
  return (
    <main className="overflow-x-clip bg-paper">
      {/* ░░ HERO (slim, no image, no configurator) ░░ */}
      <section className="bg-deep text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold tabular-nums text-white/40">—</span>
            <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="kicker" style={{ color: '#7db4f0' }}>Mobilier événementiel</span>
          </Reveal>
          <Reveal as="h1" className="font-display text-white font-bold tracking-tightest max-w-3xl" style={{ fontSize: 'clamp(2.4rem,6vw,4.6rem)', lineHeight: 0.98 }}>
            Mobilier Gonflable{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>sur mesure</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="lead mt-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Complétez vos structures avec notre mobilier personnalisé.
          </Reveal>
          <Reveal as="div" delay={0.16} className="mt-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7db4f0' }} />
            <span className="text-[13px] font-medium text-white/85">Impression totale comprise</span>
          </Reveal>
        </div>
      </section>

      {/* ░░ CONFIGURATEUR (shared component — sticky image, qty steppers on selected only) ░░ */}
      <ProductConfigurator data={CONFIGURATORS.mobilier} />

      {/* ░░ CARACTÉRISTIQUES TECHNIQUES — bento spec grid ░░ */}
      <section className="bg-paper py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 md:mb-16">
            <div className="lg:col-span-7">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Fiche technique</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02]" style={{ fontSize: 'clamp(1.9rem,4.4vw,3.4rem)' }}>
                <MaskHeading text="Caractéristiques" />
                <br />
                <span className="serif-accent text-[var(--blue)]/70" style={{ fontWeight: 500 }}><MaskHeading text="techniques" delay={0.18} /></span>
              </h2>
            </div>
            <Rise as="p" y={26} delay={0.1} className="lg:col-span-5 lead">
              Un mobilier pensé pour l’événementiel : matériaux premium, impression haute définition
              et une installation express, partout, en quelques minutes.
            </Rise>
          </div>

          {/* Bento grid: deep-blue hero panel + spec cards (no auto-rows-fr / row-span) */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Deep-blue accent panel — spans two columns on large screens for rhythm */}
            <motion.div
              variants={staggerChild}
              data-cursor
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative overflow-hidden cursor-pointer bg-deep text-white rounded-[28px] p-7 md:p-9 sm:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[220px] lg:min-h-full"
            >
              <div className="pointer-events-none absolute -top-16 -right-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(125,180,240,0.32), transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex w-12 h-12 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
                  <Sparkles className="w-5 h-5 text-[#7db4f0]" />
                </span>
                <span className="kicker" style={{ color: '#7db4f0' }}>Sur mesure</span>
              </div>
              <div className="relative mt-10">
                <div className="font-display font-bold leading-none tracking-tightest" style={{ fontSize: 'clamp(2.6rem,5vw,4rem)' }}>
                  100%
                </div>
                <div className="mt-3 font-display text-lg font-semibold text-white">Personnalisable</div>
                <p className="mt-2 text-sm leading-relaxed text-white/55 max-w-xs">
                  Formes, couleurs et logo : chaque pièce est imprimée aux couleurs de votre marque.
                </p>
              </div>
            </motion.div>

            {/* Spec cards */}
            {SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={staggerChild}
                data-cursor
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative cursor-pointer rounded-[22px] bg-white border border-[var(--line)] hover:border-[var(--blue)] p-6 md:p-7 transition-colors duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,102,204,0.28)]"
              >
                <div className="flex items-center justify-between mb-7">
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[var(--blue-mist)] border border-[var(--line)] group-hover:bg-[var(--blue-soft)] transition-colors">
                    <s.icon className="w-5 h-5 text-[var(--blue)]" />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-ink/20">0{i + 1}</span>
                </div>
                <div className="kicker mb-2" style={{ color: 'var(--muted)' }}>{s.label}</div>
                <div className="font-display font-bold text-ink tracking-tight leading-none" style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)' }}>
                  {s.value}
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--muted)]">{s.sub}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ PARFAITE POUR — premium use-case cards ░░ */}
      <section className="bg-[var(--blue-mist)] border-y border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
            <div className="max-w-xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Cas d’usage</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02]" style={{ fontSize: 'clamp(1.9rem,4.4vw,3.4rem)' }}>
                <MaskHeading text="Parfait pour" />
                <br />
                <MaskHeading text="vos événements" delay={0.16} />
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

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {USAGES.map((u) => (
              <motion.div
                key={u.n}
                variants={staggerChild}
                data-cursor
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative overflow-hidden cursor-pointer rounded-[28px] bg-white border border-[var(--line)] hover:border-[var(--blue)] p-7 md:p-9 transition-colors duration-300 hover:shadow-[0_24px_50px_-16px_rgba(0,102,204,0.30)]"
              >
                <div className="pointer-events-none absolute -bottom-16 -right-12 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.14), transparent 70%)', filter: 'blur(24px)' }} />
                <div className="relative flex items-start justify-between mb-10">
                  <span className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-[var(--blue-mist)] border border-[var(--line)] group-hover:bg-[var(--blue-soft)] group-hover:scale-105 transition-all duration-300">
                    <u.icon className="w-6 h-6 text-[var(--blue)]" />
                  </span>
                  <span className="font-display text-3xl font-bold text-[var(--blue)]/12 tabular-nums select-none group-hover:text-[var(--blue)]/25 transition-colors">{u.n}</span>
                </div>
                <div className="relative font-display text-xl md:text-2xl font-semibold text-ink tracking-tight mb-2.5 group-hover:text-[var(--blue)] transition-colors">{u.title}</div>
                <p className="relative text-[15px] leading-relaxed text-[var(--muted)] max-w-sm">{u.desc}</p>
                <div className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--blue)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="px-5 sm:px-8 py-12 md:py-16">
        <ClipReveal className="rounded-[28px]" scaleFrom={1.1}>
          <div className="relative overflow-hidden bg-deep text-white rounded-[28px] flex items-center justify-center" style={{ minHeight: 360 }}>
            <div className="pointer-events-none absolute -top-20 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(70,150,255,0.30), transparent 70%)', filter: 'blur(50px)' }} />
            <div className="relative z-10 text-center px-6 py-20 max-w-2xl">
              <Reveal as="div" y={14} className="flex justify-center mb-5">
                <span className="kicker" style={{ color: 'rgba(255,255,255,0.85)' }}>Prêt à démarrer</span>
              </Reveal>
              <h2 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', lineHeight: 1.0 }}>
                <MaskHeading text="Composons votre mobilier." />
              </h2>
              <Rise as="p" y={22} delay={0.1} className="mt-5 text-white/75 text-lg">
                Conception Suisse. Impression totale comprise. Livraison France et Europe.
              </Rise>
              <Reveal delay={0.2} className="mt-9">
                <Magnetic>
                  <Link to="/Contact" data-cursor className="inline-flex items-center gap-2 bg-white text-[var(--blue)] font-semibold rounded-full px-8 py-4 text-[15px] hover:bg-white/90 transition-colors">
                    Demander un devis gratuit <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </ClipReveal>
      </section>
    </main>
  );
}
