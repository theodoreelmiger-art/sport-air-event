import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Leaf, Recycle, Factory, Shield, Clock, TrendingUp, Package, Zap, CircleCheckBig, ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const durabilityItems = [
  {
    Icon: Leaf,
    title: 'Matériaux durables',
    text: 'Sélection rigoureuse de matières premières certifiées',
  },
  {
    Icon: Recycle,
    title: 'Réutilisation optimale',
    text: "Conçues pour des centaines d'utilisations",
  },
  {
    Icon: Factory,
    title: 'Production responsable',
    text: 'Processus optimisés, déchets minimisés',
  },
];

const swissCards = [
  {
    Icon: Award,
    title: 'Conception suisse',
    text: "Bureau d'études basé en Suisse, rigueur absolue",
  },
  {
    Icon: Shield,
    title: 'Tests rigoureux',
    text: 'Chaque structure testée avant expédition',
  },
  {
    Icon: Clock,
    title: 'Longévité garantie',
    text: 'Durée de vie exceptionnelle prouvée',
  },
];

const stats = [
  { Icon: TrendingUp, value: '10+', label: "Années d'expérience" },
  { Icon: Package, value: '500+', label: 'Structures produites' },
  { Icon: Award, value: '99%', label: 'Satisfaction client' },
  { Icon: Zap, value: '5', label: 'Ans de durée de vie' },
];

const certifications = [
  'ISO 9001 - Management de la qualité',
  'Certification ignifugation M2/B1',
  'Conformité CE',
  'Traitement anti-UV certifié',
  'Tests résistance traction',
];

export default function Quality() {
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO (dark) ░░ */}
      <section className="relative bg-deep text-white overflow-hidden">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16" style={{ paddingTop: 'clamp(140px,18vw,200px)', paddingBottom: 'clamp(80px,12vw,140px)' }}>
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-white/40" />
            <span className="kicker" style={{ color: '#7db4f0' }}>Swiss Quality Certified</span>
          </Reveal>

          <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,7.5vw,6rem)', lineHeight: 0.95, maxWidth: '14ch' }}>
            Qualité &amp; Durabilité{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>par exigence</span>
          </h1>

          <Reveal as="p" delay={0.2} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.78)' }}>
            L'excellence suisse au service de l'environnement
          </Reveal>

          <Reveal as="div" delay={0.32} className="mt-12 md:mt-16 flex items-stretch gap-6 sm:gap-10">
            {stats.slice(0, 3).map(({ value, label }, i) => (
              <div key={i} className="flex items-stretch gap-6 sm:gap-10">
                {i > 0 && <span className="w-px self-stretch bg-white/20" />}
                <div>
                  <div className="font-display text-white font-bold leading-none" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.7rem)', letterSpacing: '-0.03em' }}>
                    {value}
                  </div>
                  <div className="text-white/55 text-xs font-medium mt-1.5">{label}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ░░ DURABILITÉ — editorial split ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal y={40} className="relative order-2 lg:order-1">
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)]">
              <img
                src="images/20_photo-1473496169904-658ba7c44d8a.img"
                alt="Durabilité"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white border border-[var(--line)] rounded-[var(--radius)] px-7 py-6 shadow-sm">
              <div className="font-display text-4xl md:text-5xl font-bold text-ink leading-none">90%</div>
              <div className="text-sm text-[var(--muted)] mt-2">matériaux recyclables</div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeader
              kicker="Durabilité par conception"
              index="01"
              title={<>Durabilité<br />par conception</>}
            />
            <RevealStagger className="mt-10 space-y-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
              {durabilityItems.map(({ Icon, title, text }, i) => (
                <motion.div
                  key={i}
                  variants={staggerChild}
                  className="flex gap-5 p-6 bg-white"
                >
                  <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--paper-2)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[var(--blue)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink mb-1.5">{title}</h3>
                    <p className="text-[15px] text-[var(--muted)] leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ░░ SWISS MADE (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <SectionHeader
            light
            align="center"
            kicker="Swiss Made"
            index="02"
            title={<>Swiss Made Excellence</>}
            lead="La précision suisse dans chaque produit"
            className="mb-16 md:mb-20"
          />
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {swissCards.map(({ Icon, title, text }, i) => (
              <motion.div variants={staggerChild} key={i} className="bg-deep p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <Icon className="w-6 h-6 text-[#5aa2f0]" />
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-[15px] text-white/55 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ STATS ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <SectionHeader
            kicker="En chiffres"
            index="03"
            title={<>Les chiffres parlent<br />d'eux-mêmes</>}
            className="mb-14 md:mb-16"
          />
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
            {stats.map(({ Icon, value, label }, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="bg-white p-8 md:p-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <Icon className="w-6 h-6 text-[var(--blue)]" />
                  <span className="text-xs font-semibold text-ink/25 tabular-nums">0{i + 1}</span>
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-ink leading-none mb-2.5">{value}</div>
                <div className="text-[15px] text-[var(--muted)] font-medium">{label}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CERTIFICATIONS — editorial split ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeader
              kicker="Conformités"
              index="04"
              title={<>Certifications<br />&amp; Conformités</>}
            />
            <RevealStagger className="mt-10 border-t border-[var(--line)]">
              {certifications.map((text, i) => (
                <motion.div
                  key={i}
                  variants={staggerChild}
                  className="flex items-center gap-4 py-5 border-b border-[var(--line)] group"
                >
                  <span className="text-xs font-semibold text-ink/30 tabular-nums w-6">0{i + 1}</span>
                  <CircleCheckBig className="w-5 h-5 text-[var(--blue)] flex-shrink-0" />
                  <span className="text-[15px] md:text-base text-ink/80 group-hover:text-ink transition-colors">{text}</span>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
          <Reveal y={40} className="order-first lg:order-last">
            <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)]">
              <img
                src="images/21_photo-1581092918056-0c4c3acd3789.img"
                alt="Qualité"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ░░ CTA (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <SectionHeader
              light
              kicker="Prêt à démarrer"
              index="—"
              title={<>L'exigence suisse,<br /><span className="serif-accent text-white/55">au service de vos événements.</span></>}
            />
            <Reveal as="div" delay={0.1} className="md:pb-2">
              <Magnetic>
                <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                  Demander un devis <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
