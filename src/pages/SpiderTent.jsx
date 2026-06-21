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
  Layers,
  Gauge,
  Sparkles,
  Wrench,
  Maximize,
} from 'lucide-react';
import {
  Reveal,
  RevealStagger,
  Rise,
  MaskHeading,
  Magnetic,
  staggerChild,
} from '../lib/motion.jsx';
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

// Spec data — icon + label + prominent value. `feature` marks the deep-blue hero spec.
const specs = [
  {
    icon: Layers,
    label: 'Structure',
    value: '4 pieds gonflables courbes',
    note: 'Architecture autoportante, sans armature rigide',
    feature: true,
  },
  { icon: Shield, label: 'Matériau', value: 'PVC 650g/m² anti-UV' },
  { icon: Gauge, label: 'Pression', value: '0.3 bar' },
  { icon: Sparkles, label: 'Personnalisation', value: 'Impression haute définition' },
  { icon: Wrench, label: 'Accessoires', value: 'Pompe électrique incluse' },
  { icon: Maximize, label: 'Usage', value: 'Intérieur et extérieur' },
];

export default function SpiderTent() {
  const [selectedSize, setSelectedSize] = useState(
    sizes.find((s) => s.popular)?.title ?? sizes[0].title
  );
  return (
    <div className="overflow-x-clip bg-paper">
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

      {/* ░░ PARFAITE POUR — premium use-case / feature cards ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div className="flex flex-col items-start max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Parfaite pour</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink leading-[1.0] tracking-tightest text-[clamp(1.9rem,4.6vw,3.4rem)]">
                <MaskHeading text="Conçue pour l'efficacité" />{' '}
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text="et l'impact visuel." delay={0.2} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead md:max-w-sm md:pb-2">
              Six atouts qui font de la Tente Spider la structure idéale pour vos salons,
              événements sportifs et stands promotionnels.
            </Rise>
          </div>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div
                variants={staggerChild}
                key={title}
                data-cursor
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden bg-white rounded-[28px] border border-[var(--line)] hover:border-[var(--blue)] p-7 md:p-8 flex flex-col cursor-pointer transition-colors duration-300"
                style={{ boxShadow: '0 1px 0 rgba(11,28,63,0.02)' }}
              >
                <div
                  className="absolute inset-x-0 -bottom-24 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(22px)' }}
                />
                <div className="relative flex items-center justify-between mb-10">
                  <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--blue-soft)] group-hover:bg-[var(--blue)] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[var(--blue)] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="font-display text-3xl font-bold text-ink/[0.08] tabular-nums group-hover:text-[var(--blue)]/20 transition-colors duration-300">
                    0{i + 1}
                  </span>
                </div>
                <div className="relative mt-auto">
                  <div className="font-display text-xl font-semibold text-ink tracking-tight mb-2 group-hover:text-[var(--blue)] transition-colors duration-300">
                    {title}
                  </div>
                  <div className="text-sm text-[var(--muted)] leading-relaxed">{desc}</div>
                </div>
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
                            ? 'bg-deep text-white hover:bg-[var(--blue)]'
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

      {/* ░░ CARACTÉRISTIQUES TECHNIQUES — editorial bento ░░ */}
      <section className="bg-paper py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 md:mb-16">
            <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">03</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Fiche technique</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text="Caractéristiques" />{' '}
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text="techniques" delay={0.18} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lg:col-span-5 lead">
              Une structure pensée pour durer : matériaux anti-UV, gonflage haute pression et
              personnalisation haute définition, prête pour l'intérieur comme l'extérieur.
            </Rise>
          </div>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {specs.map((s, i) => {
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
                      <span className="kicker" style={{ color: '#7db4f0' }}>Signature design</span>
                    </div>
                    <div className="relative mt-8">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45 mb-3">{s.label}</div>
                      <div className="font-display font-bold tracking-tightest leading-none text-white text-[clamp(2rem,4vw,3rem)]">
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
                    <div className="font-display font-bold tracking-tight text-ink leading-tight text-[clamp(1.1rem,1.9vw,1.4rem)]">
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

      {/* ░░ CTA ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <Reveal className="rounded-[var(--radius-lg)] bg-deep text-white px-6 sm:px-12 py-16 md:py-20 text-center">
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
