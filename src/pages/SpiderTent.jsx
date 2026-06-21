import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Wind,
  Droplet,
  Sun,
  Shield,
  Clock,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const features = [
  {
    Icon: Zap,
    title: 'Montage ultra-rapide',
    desc: 'Installation en 10 minutes par 1 personne',
  },
  {
    Icon: Wind,
    title: 'Résistance au vent',
    desc: "Jusqu'à 70 km/h",
  },
  {
    Icon: Droplet,
    title: 'Étanche',
    desc: '100% imperméable, PVC 650g/m²',
  },
  {
    Icon: Sun,
    title: 'Anti-UV',
    desc: 'Protection UV50+',
  },
  {
    Icon: Shield,
    title: 'Garantie 2 ans',
    desc: 'Sur structure et impression',
  },
  {
    Icon: Clock,
    title: 'Livraison rapide',
    desc: '4-6 semaines',
  },
];

const sizes = [
  {
    title: '3x3m',
    people: '8-10 personnes',
    dimensions: '3m x 3m',
    hauteur: '2.8m',
    poids: '45kg',
    prix: 'CHF 4,500',
    popular: false,
  },
  {
    title: '4x4m',
    people: '12-15 personnes',
    dimensions: '4m x 4m',
    hauteur: '3.2m',
    poids: '60kg',
    prix: 'CHF 6,500',
    popular: true,
  },
  {
    title: '5x5m',
    people: '20-25 personnes',
    dimensions: '5m x 5m',
    hauteur: '3.5m',
    poids: '75kg',
    prix: 'CHF 8,500',
    popular: false,
  },
];

const specs = [
  { label: 'Matériau', value: 'PVC 650g/m² anti-UV' },
  { label: 'Structure', value: '4 pieds gonflables courbes' },
  { label: 'Pression', value: '0.3 bar' },
  { label: 'Personnalisation', value: 'Impression haute définition' },
  { label: 'Accessoires', value: 'Pompe électrique incluse' },
  { label: 'Usage', value: 'Intérieur et extérieur' },
];

export default function SpiderTent() {
  const [selectedSize, setSelectedSize] = useState(
    sizes.find((s) => s.popular)?.title ?? sizes[0].title
  );
  return (
    <div className="overflow-x-hidden bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
                <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Tente professionnelle</span>
              </Reveal>

              <Reveal as="h1" y={26} delay={0.05}
                className="font-display font-bold text-ink tracking-tightest"
                style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 0.96 }}>
                Tente Spider<br />
                <span className="serif-accent text-ink/55" style={{ fontWeight: 500 }}>X-Gloo Style</span>
              </Reveal>

              <Reveal as="p" delay={0.12} y={20} className="lead mt-7 max-w-lg">
                Design architectural unique avec 4 pieds courbes gonflables. Parfaite pour salons, événements sportifs et stands promotionnels.
              </Reveal>

              <Reveal as="div" delay={0.18} className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                {['Montage 10 minutes', 'Design moderne', 'Branding 360°'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-ink/75">
                    <Check className="w-4 h-4 text-[var(--blue)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </Reveal>

              <Reveal as="div" delay={0.24} className="mt-9 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <Link to="/Calculator" className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                    Calculer mon prix <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Link to="/Contact?product=Tente%20Spider" className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-ink border border-[var(--line)] hover:border-ink/30 transition-colors">
                  Demander un devis
                </Link>
              </Reveal>
            </div>

            <Reveal y={40} className="relative">
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)]">
                <img
                  src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                  alt="Tente Spider X-Gloo"
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-6 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-6">
                <div className="text-xs text-[var(--muted)] uppercase tracking-[0.16em] font-semibold mb-1.5">À partir de</div>
                <div className="font-display text-3xl font-bold text-ink">CHF 4,500</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ FEATURES (dark) ░░ */}
      <section className="bg-ink text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <SectionHeader light kicker="Caractéristiques principales" index="01"
            title={<>Conçue pour l'efficacité<br /><span className="serif-accent text-white/55">et l'impact visuel.</span></>}
            className="mb-14 md:mb-20" />

          <RevealStagger className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div variants={staggerChild} key={title} className="bg-ink p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <Icon className="w-5 h-5 text-[#5aa2f0]" />
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <div className="font-display font-semibold text-[15px] mb-1.5">{title}</div>
                <div className="text-[13px] text-white/50 leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ SIZES ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader kicker="Tailles disponibles" index="02"
            title={<>Choisissez la dimension<br />adaptée à votre événement</>} />
          <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
            Sélectionnez votre format
          </Reveal>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sizes.map((size) => {
            const isSelected = selectedSize === size.title;
            return (
              <motion.div
                key={size.title}
                variants={staggerChild}
                onClick={() => setSelectedSize(size.title)}
                className={`relative flex flex-col rounded-[var(--radius-lg)] bg-white border cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-[var(--blue)]'
                    : size.popular
                    ? 'border-ink/15'
                    : 'border-[var(--line)] hover:border-ink/15'
                }`}
              >
                {size.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ background: 'var(--blue)' }}>
                    Plus populaire
                  </div>
                )}
                <div className="flex flex-col flex-1 p-8">
                  <div className="mb-6">
                    <div className="font-display text-4xl font-bold text-ink mb-1.5">{size.title}</div>
                    <div className="text-sm text-[var(--muted)]">{size.people}</div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Dimensions</span>
                      <span className="font-semibold text-ink">{size.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Hauteur</span>
                      <span className="font-semibold text-ink">{size.hauteur}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Poids</span>
                      <span className="font-semibold text-ink">{size.poids}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-[var(--line)]">
                    <div className="font-display text-3xl font-bold text-ink mb-5">{size.prix}</div>
                    <Link to="/Calculator" onClick={(e) => e.stopPropagation()} className="block">
                      <button
                        className={`w-full py-3 text-[15px] font-semibold rounded-full transition-colors ${
                          isSelected
                            ? 'bg-ink text-white hover:bg-[var(--blue)]'
                            : 'bg-transparent text-ink border border-[var(--line)] hover:border-ink/30'
                        }`}
                        tabIndex={0}
                      >
                        Configurer
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </RevealStagger>
      </section>

      {/* ░░ SPECS ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <SectionHeader kicker="Fiche technique" index="03"
            title="Spécifications techniques"
            className="mb-14 md:mb-16" />

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
            {specs.map((spec) => (
              <motion.div
                key={spec.label}
                variants={staggerChild}
                className="bg-white p-7"
              >
                <div className="kicker mb-3" style={{ color: 'var(--muted)' }}>{spec.label}</div>
                <div className="font-display text-lg font-semibold text-ink">{spec.value}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <Reveal className="rounded-[var(--radius-lg)] bg-ink text-white px-6 sm:px-12 py-16 md:py-20 text-center">
          <span className="kicker" style={{ color: '#7db4f0' }}>Prêt à démarrer</span>
          <h2 className="font-display font-bold tracking-tightest mt-5" style={{ fontSize: 'clamp(2rem,4.6vw,3.4rem)', lineHeight: 1.02 }}>
            Prêt à commander votre Tente Spider ?
          </h2>
          <p className="lead mt-5 mx-auto max-w-xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Obtenez un devis personnalisé en quelques clics
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Magnetic>
              <Link to="/Calculator" className="inline-flex items-center justify-center gap-2 bg-white text-ink font-semibold rounded-full px-7 py-3.5 text-[15px] hover:bg-white/90 transition-colors">
                Calculer mon prix <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <Link to="/Contact?product=Tente%20Spider" className="group inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors">
              Contacter un expert <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
