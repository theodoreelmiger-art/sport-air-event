import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  Zap,
  Layers,
  Palette,
  MessageSquare,
  Clock,
  CircleCheckBig,
  Printer,
  Check,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

export default function Customization() {
  const features = [
    {
      badge: 'Premium',
      Icon: Eye,
      title: 'Visibilité maximale',
      text: "Jusqu'à 200m² de surface personnalisable pour un impact visuel garanti.",
    },
    {
      badge: 'Qualité',
      Icon: Zap,
      title: 'Impression HD',
      text: 'Technologie sublimation pour des couleurs vives qui durent dans le temps.',
    },
    {
      badge: 'Unique',
      Icon: Layers,
      title: 'Design 360°',
      text: 'Personnalisation complète sur toutes les faces de votre structure.',
    },
    {
      badge: 'Précision',
      Icon: Palette,
      title: 'Couleurs Pantone',
      text: 'Reproduction exacte de votre charte graphique professionnelle.',
    },
  ];

  const steps = [
    {
      Icon: MessageSquare,
      title: 'Brief',
      num: '1',
      text: 'Analyse approfondie de vos besoins',
      duration: 'Durée estimée : 1-2 jours',
    },
    {
      Icon: Palette,
      title: 'Design',
      num: '2',
      text: 'Création maquette 3D photoréaliste',
      duration: 'Durée estimée : 3-5 jours',
    },
    {
      Icon: CircleCheckBig,
      title: 'Validation',
      num: '3',
      text: 'Révisions & approbation finale',
      duration: 'Durée estimée : 2-3 jours',
    },
    {
      Icon: Printer,
      title: 'Production',
      num: '4',
      text: 'Fabrication avec contrôle qualité',
      duration: 'Durée estimée : 2-4 semaines',
    },
  ];

  const impacts = [
    "Jusqu'à 200m² de surface imprimable",
    'Visibilité à 360° garantie',
    'Forme unique qui attire le regard',
    'Couleurs vives qui durent dans le temps',
    'ROI publicitaire supérieur',
  ];

  return (
    <div className="overflow-x-clip bg-paper pt-20">
      {/* ░░ HERO (dark) ░░ */}
      <section className="relative bg-deep text-white overflow-hidden">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
                <span className="h-px w-10 bg-white/40" />
                <span className="kicker" style={{ color: '#7db4f0' }}>Personnalisation</span>
              </Reveal>
              <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,6.5vw,5.2rem)', lineHeight: 0.96, maxWidth: '14ch' }}>
                Votre marque,<br />
                <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>amplifiée</span>
              </h1>
              <Reveal as="p" delay={0.15} y={18} className="lead mt-7 max-w-lg" style={{ color: 'rgba(255,255,255,0.74)' }}>
                Transformez chaque centimètre carré en support de communication ultra-visible.
              </Reveal>
              <Reveal as="div" delay={0.26} className="mt-9">
                <Magnetic>
                  <Link
                    to="/Contact"
                    className="cta-iridescent inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px]"
                  >
                    Démarrer un projet <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-6" delay={0.2} y={40}>
              <div className="relative">
                <div className="rounded-[var(--radius-lg)] overflow-hidden border border-white/10 bg-white/[0.02]">
                  <img
                    src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                    alt="Personnalisation complète structures gonflables - Impression HD sublimation, couleurs Pantone, design sur mesure SPORT AIR EVENT Suisse"
                    className="w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-3 sm:-right-5 rounded-[var(--radius)] bg-white border border-[var(--line)] px-6 py-5">
                  <div className="font-display text-4xl font-bold text-ink leading-none">360°</div>
                  <div className="text-sm text-[var(--muted)] mt-1.5">de visibilité</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ POSSIBILITÉS — feature cards ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <SectionHeader
            align="center"
            className="mb-16 md:mb-20"
            kicker="Possibilités infinies"
            index="01"
            title="Possibilités infinies"
            lead="Chaque structure devient une œuvre unique qui reflète votre identité"
          />
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={staggerChild}
                className="group relative p-8 md:p-9 rounded-[var(--radius-lg)] bg-paper border border-[var(--line)] hover:border-ink/15 transition-colors"
              >
                <div className="flex items-start justify-between mb-9">
                  <div className="w-12 h-12 rounded-[14px] bg-white border border-[var(--line)] flex items-center justify-center">
                    <f.Icon className="w-5 h-5 text-[var(--blue)]" />
                  </div>
                  <span className="kicker" style={{ color: 'var(--muted)' }}>{f.badge}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink tracking-tight mb-3">{f.title}</h3>
                <p className="text-ink/65 leading-relaxed">{f.text}</p>
                <span className="absolute bottom-6 right-7 font-display text-[3.5rem] font-bold leading-none text-ink/[0.05] select-none tabular-nums">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ PROCESSUS — editorial timeline ░░ */}
      <section className="bg-deep text-white py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <SectionHeader
                light
                kicker="Du concept à la réalité"
                index="02"
                title={<>Du concept<br /><span className="serif-accent text-white/55">à la réalité.</span></>}
              />
            </div>
            <Reveal as="p" delay={0.1} className="lg:col-span-5 text-white/60 leading-relaxed">
              Un processus simple et transparent
            </Reveal>
          </div>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {steps.map((s) => (
              <motion.div variants={staggerChild} key={s.title} className="bg-deep p-7 md:p-9">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-[14px] bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <s.Icon className="w-5 h-5 text-[#5aa2f0]" />
                  </div>
                  <span className="font-display text-[3rem] font-bold leading-none text-white/10 tabular-nums select-none">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-[15px] text-white/55 leading-relaxed mb-5">{s.text}</p>
                <div className="flex items-center gap-2 text-sm text-[#7db4f0] pt-4 border-t border-white/10">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{s.duration}</span>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ IMPACT VISUEL ░░ */}
      <section className="py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal y={40}>
              <div className="rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)]">
                <img
                  src="images/17_0aa557b4e_Capturedecran2026-01-02a170639.png"
                  alt="Impact visuel structures gonflables événementielles - Visibilité maximale 360 degrés pour salons professionnels et événements corporatifs"
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeader
                kicker="Impact visuel"
                index="03"
                title={<>Un impact visuel<br />incomparable</>}
              />
              <RevealStagger className="mt-9 border-t border-[var(--line)]">
                {impacts.map((item) => (
                  <motion.div
                    key={item}
                    variants={staggerChild}
                    className="flex items-center gap-4 py-4 border-b border-[var(--line)]"
                  >
                    <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--blue-soft)' }}>
                      <Check className="w-4 h-4 text-[var(--blue)]" />
                    </span>
                    <span className="text-[15px] md:text-base text-ink/80">{item}</span>
                  </motion.div>
                ))}
              </RevealStagger>
              <Reveal delay={0.1} className="mt-10">
                <Magnetic>
                  <Link
                    to="/Contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-ink/15 hover:border-[var(--blue)] hover:text-[var(--blue)] pb-1 transition-colors"
                  >
                    Démarrer votre projet <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
