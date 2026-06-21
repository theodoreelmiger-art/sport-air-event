import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

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

export default function Tente() {
  return (
    <div className="overflow-x-hidden bg-paper">
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

        {/* ░░ SPECS (dark) ░░ */}
        <section className="bg-deep text-white">
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
    </div>
  );
}
