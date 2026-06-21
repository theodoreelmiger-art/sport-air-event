import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Layers, Ruler, MoveVertical, Sparkles, Timer, Wind, Plug, ShieldCheck,
  Flag, Bike, DoorOpen, Store,
} from 'lucide-react';
import { Reveal, RevealStagger, Rise, ClipReveal, MaskHeading, Magnetic, staggerChild } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

const specs = [
  { k: 'Matériau', v: 'Oxford 600D haute résistance + soudure thermique', icon: Layers },
  { k: 'Largeurs disponibles', v: '5m – 6m – 7m – 8m – 10m', icon: Ruler },
  { k: 'Hauteur', v: '3m à 5m selon largeur', icon: MoveVertical },
  { k: 'Impression', v: 'Sublimation HD 360° UV résistant', icon: Sparkles },
  { k: 'Temps de gonflage', v: '10-15 minutes', icon: Timer },
  { k: 'Résistance au vent', v: "Jusqu'à 60 km/h avec haubans", icon: Wind },
  { k: 'Alimentation ventilateur', v: '220V inclus', icon: Plug },
  { k: 'Garantie', v: '2 ans structure + 3 ans impression', icon: ShieldCheck },
];

const useCases = [
  { n: '01', title: 'Courses & marathons', desc: "Lignes de départ et d'arrivée spectaculaires", icon: Flag },
  { n: '02', title: 'Sports cyclistes', desc: 'Étapes de course, cols, critériums', icon: Bike },
  { n: '03', title: "Entrées d'événements", desc: 'Portiques, accueil, signalétique', icon: DoorOpen },
  { n: '04', title: 'Animations commerciales', desc: 'Ouvertures de magasins, promotions', icon: Store },
];

export default function ArchesGonflables() {
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ SLIM HERO ░░ */}
      <section className="pt-28 md:pt-36 pb-6 md:pb-10">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">Arches Gonflables · Sur mesure</span>
          </Reveal>

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
        </div>
      </section>

      {/* ░░ CONFIGURATOR (shared) ░░ */}
      <ProductConfigurator data={CONFIGURATORS.arches} />

      {/* ░░ SPECS — editorial bento ░░ */}
      <section className="bg-white border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Fiche technique</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text="Caractéristiques" />
                <br />
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text="techniques" delay={0.12} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead max-w-sm lg:text-right">
              Chaque arche est fabriquée avec des matériaux haute résistance, pensés pour durer saison après saison.
            </Rise>
          </div>

          {/* Bento grid */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {specs.map((row, i) => {
              const Icon = row.icon;
              // First card spans two columns on large screens as a deep-blue accent panel.
              const accent = i === 0;
              if (accent) {
                return (
                  <motion.div
                    key={row.k}
                    variants={staggerChild}
                    data-cursor
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="relative overflow-hidden bg-deep text-white rounded-[28px] p-7 md:p-9 sm:col-span-2 lg:col-span-2 lg:row-span-1 cursor-pointer group"
                  >
                    <div
                      className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none opacity-70"
                      style={{ background: 'radial-gradient(circle, rgba(70,150,255,0.45), transparent 70%)', filter: 'blur(34px)' }}
                    />
                    <div className="relative flex items-center justify-between mb-8">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 border border-white/15">
                        <Icon className="w-5 h-5 text-[#7db4f0]" />
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-white/30">0{i + 1}</span>
                    </div>
                    <div className="relative">
                      <div className="kicker mb-3" style={{ color: '#7db4f0' }}>{row.k}</div>
                      <div className="font-display font-bold text-white tracking-tight leading-[1.1] text-[clamp(1.4rem,2.4vw,2rem)]">
                        {row.v}
                      </div>
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={row.k}
                  variants={staggerChild}
                  data-cursor
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group relative overflow-hidden flex flex-col rounded-[22px] bg-paper border border-[var(--line)] p-7 cursor-pointer transition-colors duration-300 hover:border-[var(--blue)]"
                >
                  <div
                    className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(30px)' }}
                  />
                  <div className="relative flex items-center justify-between mb-7">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[var(--blue-soft)] border border-[var(--line)] group-hover:bg-[var(--blue)] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[var(--blue)] group-hover:text-white transition-colors duration-300" />
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-ink/25">0{i + 1}</span>
                  </div>
                  <div className="relative mt-auto">
                    <div className="kicker mb-2.5" style={{ color: 'var(--muted)' }}>{row.k}</div>
                    <div className="font-display font-bold text-ink tracking-tight leading-[1.12] text-[clamp(1.15rem,1.6vw,1.4rem)]">
                      {row.v}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ PARFAITE POUR — premium use-cases ░░ */}
      <section className="bg-[var(--blue-mist)] border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
            <div className="max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">03</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Cas d'usage</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text="Parfaite" />
                <br />
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text="pour" delay={0.1} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead max-w-sm md:text-right">
              Là où l'impact visuel fait la différence, l'arche marque l'entrée et le passage.
            </Rise>
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {useCases.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.n}
                  variants={staggerChild}
                  data-cursor
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group relative overflow-hidden rounded-[28px] bg-white border border-[var(--line)] p-8 md:p-10 cursor-pointer transition-colors duration-300 hover:border-[var(--blue)]"
                >
                  {/* Ghost number */}
                  <span
                    className="absolute -top-4 right-3 font-display font-bold leading-none text-[var(--blue)]/[0.06] select-none pointer-events-none tabular-nums transition-colors duration-500 group-hover:text-[var(--blue)]/[0.10]"
                    style={{ fontSize: 'clamp(5rem,9vw,8rem)' }}
                  >
                    {c.n}
                  </span>
                  {/* Hover glow */}
                  <div
                    className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.16), transparent 70%)', filter: 'blur(38px)' }}
                  />
                  <div className="relative">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--blue-soft)] border border-[var(--line)] mb-7 group-hover:bg-[var(--blue)] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[var(--blue)] group-hover:text-white transition-colors duration-300" />
                    </span>
                    <h3 className="font-display font-bold text-ink tracking-tight text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.1] mb-2.5">
                      {c.title}
                    </h3>
                    <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-sm">{c.desc}</p>
                  </div>
                  <div className="relative mt-7 flex items-center gap-2 text-sm font-semibold text-[var(--blue)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </RevealStagger>

          <Reveal className="mt-16 pt-12 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-display text-xl md:text-2xl font-semibold text-ink max-w-md tracking-tight">
              Un projet sur mesure ? Parlons-en.
            </p>
            <Magnetic>
              <Link
                to="/Contact?product=Arche%20Gonflable"
                className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
