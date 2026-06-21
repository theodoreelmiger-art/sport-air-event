import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, MessageCircle,
  Layers, Gauge, Wind, Timer, Sparkles, Flame, ShieldCheck, Feather,
  Trophy, Briefcase, Music, Store,
} from 'lucide-react';
import { Reveal, RevealStagger, Rise, MaskHeading, Magnetic, staggerChild } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

// Spec data — icon + label + prominent value. `feature` marks the deep-blue hero spec.
const SPECS = [
  { icon: Flame, label: 'Résistance au vent', value: "Jusqu'à 70 km/h", note: 'Structure haute pression stabilisée', feature: true },
  { icon: Layers, label: 'Matériau', value: 'Oxford 600D + TPU', note: 'Haute résistance' },
  { icon: Gauge, label: 'Pression de gonflage', value: 'Haute pression 0.35 bar' },
  { icon: Timer, label: 'Temps de gonflage', value: '60–90 secondes' },
  { icon: Sparkles, label: 'Impression', value: 'Sublimation HD 360°', note: 'Résistante aux UV' },
  { icon: ShieldCheck, label: 'Certification', value: 'Anti-feu M2, Anti-UV' },
  { icon: Wind, label: 'Garantie', value: '5 ans structure + impression' },
  { icon: Feather, label: 'Poids (4×4m)', value: '~12 kg' },
];

const USAGES = [
  { tag: '01', icon: Trophy, title: 'Événements sportifs', desc: 'Marathons, trails, salons sport, zones VIP' },
  { tag: '02', icon: Briefcase, title: 'Salons professionnels', desc: 'Stands B2B, expositions, conventions' },
  { tag: '03', icon: Music, title: 'Festivals & concerts', desc: 'Zones presse, accueil VIP, backstage' },
  { tag: '04', icon: Store, title: 'Points de vente', desc: 'Pop-up stores, démonstrations, promotions' },
];

export default function Tente() {
  return (
    <div className="overflow-x-clip bg-paper">
      <main>
        {/* ░░ SLIM HERO ░░ */}
        <section className="bg-paper pt-28 md:pt-32">
          <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pb-2 md:pb-4">
            <Reveal as="div" className="flex items-center gap-3 mb-5">
              <span className="kicker">Notre produit phare</span>
              <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
              <Link to="/" className="text-xs font-semibold text-[var(--muted)] hover:text-ink transition-colors">Accueil</Link>
            </Reveal>
            <Reveal>
              <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5.2vw,3.6rem)', lineHeight: 1.02 }}>
                Tente Spider Gonflable
              </h1>
            </Reveal>
            <Reveal as="p" delay={0.1} className="lead mt-4 max-w-xl">
              Installation en 2 minutes · Conception Suisse · Impression totale comprise
            </Reveal>
          </div>
        </section>

        {/* ░░ CONFIGURATOR (shared) ░░ */}
        <ProductConfigurator data={CONFIGURATORS.tente} />

        {/* ░░ SPECS — editorial bento ░░ */}
        <section className="bg-paper py-20 md:py-28">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 md:mb-16">
              <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Fiche technique</span>
                </Reveal>
                <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                  <MaskHeading text="Caractéristiques" />{' '}
                  <span className="serif-accent text-[var(--blue)]"><MaskHeading text="techniques" delay={0.18} /></span>
                </h2>
              </div>
              <Rise as="p" y={28} delay={0.1} className="lg:col-span-5 lead">
                Une structure conçue pour durer : matériaux haute résistance, certification anti-feu et
                impression sublimation garantie 5 ans.
              </Rise>
            </div>

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {SPECS.map((s, i) => {
                const Icon = s.icon;
                if (s.feature) {
                  // Deep-blue accent panel — spans 2 columns / 2 rows on large screens for rhythm.
                  return (
                    <motion.div
                      variants={staggerChild}
                      key={s.label}
                      data-cursor
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="group relative overflow-hidden bg-deep text-white rounded-[28px] p-7 md:p-9 flex flex-col justify-between sm:col-span-2 lg:row-span-2 min-h-[220px] lg:min-h-full cursor-pointer"
                    >
                      <div
                        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(circle, rgba(70,150,255,0.45), transparent 70%)', filter: 'blur(34px)' }}
                      />
                      <div className="relative flex items-center justify-between">
                        <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                          <Icon className="w-5 h-5 text-[#7db4f0]" />
                        </span>
                        <span className="kicker" style={{ color: '#7db4f0' }}>Performance clé</span>
                      </div>
                      <div className="relative mt-8">
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45 mb-3">{s.label}</div>
                        <div className="font-display font-bold tracking-tightest leading-none text-white text-[clamp(2.2rem,4.5vw,3.4rem)]">
                          {s.value}
                        </div>
                        {s.note && <div className="mt-4 text-sm text-white/55 leading-relaxed max-w-xs">{s.note}</div>}
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    variants={staggerChild}
                    key={s.label}
                    data-cursor
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden bg-white rounded-[22px] border border-[var(--line)] hover:border-[var(--blue)] p-6 md:p-7 flex flex-col cursor-pointer transition-colors duration-300"
                    style={{ boxShadow: '0 1px 0 rgba(11,28,63,0.02)' }}
                  >
                    <div
                      className="absolute inset-x-0 -bottom-20 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(0,102,204,0.16), transparent 70%)', filter: 'blur(20px)' }}
                    />
                    <div className="relative flex items-center justify-between mb-7">
                      <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--blue-soft)] group-hover:bg-[var(--blue)] transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[var(--blue)] group-hover:text-white transition-colors duration-300" />
                      </span>
                      <span className="text-xs font-semibold text-ink/20 tabular-nums group-hover:text-[var(--blue)]/40 transition-colors">0{i + 1}</span>
                    </div>
                    <div className="relative mt-auto">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-2">{s.label}</div>
                      <div className="font-display font-bold tracking-tight text-ink leading-tight text-[clamp(1.15rem,2vw,1.45rem)]">
                        {s.value}
                      </div>
                      {s.note && <div className="mt-2 text-[13px] text-[var(--muted)] leading-relaxed">{s.note}</div>}
                    </div>
                  </motion.div>
                );
              })}
            </RevealStagger>
          </div>
        </section>

        {/* ░░ PARFAITE POUR — premium use-case cards ░░ */}
        <section className="bg-white border-t border-[var(--line)] py-20 md:py-28">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="flex flex-col items-start max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Cas d'usage</span>
                </Reveal>
                <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                  <MaskHeading text="Parfaite pour" />{' '}
                  <span className="serif-accent text-[var(--blue)]"><MaskHeading text="vos événements" delay={0.18} /></span>
                </h2>
              </div>
              <Reveal as="div" delay={0.1} className="md:pb-2">
                <Magnetic>
                  <Link to="/Contact" data-cursor className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {USAGES.map((u) => {
                const Icon = u.icon;
                return (
                  <motion.div
                    variants={staggerChild}
                    key={u.tag}
                    data-cursor
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden rounded-[28px] bg-white border border-[var(--line)] hover:border-[var(--blue)] p-8 md:p-9 cursor-pointer transition-colors duration-300"
                  >
                    {/* subtle blue glow on hover */}
                    <div
                      className="absolute -bottom-24 -right-10 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(36px)' }}
                    />
                    {/* oversized ghost number */}
                    <span className="absolute top-4 right-6 font-display font-bold leading-none text-[var(--blue)]/[0.06] group-hover:text-[var(--blue)]/[0.1] transition-colors select-none pointer-events-none" style={{ fontSize: 'clamp(4.5rem,9vw,7rem)' }}>
                      {u.tag}
                    </span>

                    <div className="relative flex items-center justify-between mb-10">
                      <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--blue-soft)] group-hover:bg-[var(--blue)] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[var(--blue)] group-hover:text-white transition-colors duration-300" />
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    <div className="relative">
                      <div className="font-display text-xl md:text-2xl font-bold text-ink tracking-tight mb-2">{u.title}</div>
                      <div className="text-[15px] text-[var(--muted)] leading-relaxed max-w-sm">{u.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
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
    </div>
  );
}
