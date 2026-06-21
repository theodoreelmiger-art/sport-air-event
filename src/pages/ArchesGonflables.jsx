import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

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

const useCases = [
  { n: '01', title: 'Courses & marathons', desc: "Lignes de départ et d'arrivée spectaculaires" },
  { n: '02', title: 'Sports cyclistes', desc: 'Étapes de course, cols, critériums' },
  { n: '03', title: "Entrées d'événements", desc: 'Portiques, accueil, signalétique' },
  { n: '04', title: 'Animations commerciales', desc: 'Ouvertures de magasins, promotions' },
];

export default function ArchesGonflables() {
  return (
    <div className="overflow-x-hidden bg-paper">
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

      {/* ░░ SPECS (dark) ░░ */}
      <section className="bg-deep text-white">
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
