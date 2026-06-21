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
import { useT } from '../lib/i18n.jsx';

export default function Customization() {
  const t = useT();
  const features = [
    {
      badge: t('Premium', 'Premium'),
      Icon: Eye,
      title: t('Visibilité maximale', 'Maximum visibility'),
      text: t("Jusqu'à 200m² de surface personnalisable pour un impact visuel garanti.", 'Up to 200 m² of customizable surface for guaranteed visual impact.'),
    },
    {
      badge: t('Qualité', 'Quality'),
      Icon: Zap,
      title: t('Impression HD', 'HD printing'),
      text: t('Technologie sublimation pour des couleurs vives qui durent dans le temps.', 'Sublimation technology for vivid colours that stand the test of time.'),
    },
    {
      badge: t('Unique', 'One of a kind'),
      Icon: Layers,
      title: t('Design 360°', '360° design'),
      text: t('Personnalisation complète sur toutes les faces de votre structure.', 'Full branding across every face of your structure.'),
    },
    {
      badge: t('Précision', 'Precision'),
      Icon: Palette,
      title: t('Couleurs Pantone', 'Pantone colours'),
      text: t('Reproduction exacte de votre charte graphique professionnelle.', 'An exact match to your professional brand guidelines.'),
    },
  ];

  const steps = [
    {
      Icon: MessageSquare,
      title: t('Brief', 'Brief'),
      num: '1',
      text: t('Analyse approfondie de vos besoins', 'An in-depth analysis of your needs'),
      duration: t('Durée estimée : 1-2 jours', 'Estimated time: 1–2 days'),
    },
    {
      Icon: Palette,
      title: t('Design', 'Design'),
      num: '2',
      text: t('Création maquette 3D photoréaliste', 'Photorealistic 3D mock-up creation'),
      duration: t('Durée estimée : 3-5 jours', 'Estimated time: 3–5 days'),
    },
    {
      Icon: CircleCheckBig,
      title: t('Validation', 'Approval'),
      num: '3',
      text: t('Révisions & approbation finale', 'Revisions and final sign-off'),
      duration: t('Durée estimée : 2-3 jours', 'Estimated time: 2–3 days'),
    },
    {
      Icon: Printer,
      title: t('Production', 'Production'),
      num: '4',
      text: t('Fabrication avec contrôle qualité', 'Manufacturing with quality control'),
      duration: t('Durée estimée : 2-4 semaines', 'Estimated time: 2–4 weeks'),
    },
  ];

  const impacts = [
    t("Jusqu'à 200m² de surface imprimable", 'Up to 200 m² of printable surface'),
    t('Visibilité à 360° garantie', 'Guaranteed 360° visibility'),
    t('Forme unique qui attire le regard', 'A distinctive shape that turns heads'),
    t('Couleurs vives qui durent dans le temps', 'Vivid colours that last over time'),
    t('ROI publicitaire supérieur', 'Superior advertising ROI'),
  ];

  return (
    <div className="overflow-x-clip bg-paper pt-20">
      {/* ░░ HERO (dark) ░░ */}
      <section className="relative bg-deep text-white overflow-hidden">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
                <span className="h-px w-10 bg-white/40" />
                <span className="kicker" style={{ color: '#7db4f0' }}>{t('Personnalisation', 'Customization')}</span>
              </Reveal>
              <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,6.5vw,5.2rem)', lineHeight: 0.96, maxWidth: '14ch' }}>
                {t('Votre marque,', 'Your brand,')}<br />
                <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>{t('amplifiée', 'amplified')}</span>
              </h1>
              <Reveal as="p" delay={0.15} y={18} className="lead mt-7 max-w-lg" style={{ color: 'rgba(255,255,255,0.74)' }}>
                {t('Transformez chaque centimètre carré en support de communication ultra-visible.', 'Turn every square centimetre into a high-impact communication surface.')}
              </Reveal>
              <Reveal as="div" delay={0.26} className="mt-9">
                <Magnetic>
                  <Link
                    to="/Contact"
                    className="cta-iridescent inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px]"
                  >
                    {t('Démarrer un projet', 'Start a project')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-6" delay={0.2} y={40}>
              <div className="relative">
                <div className="rounded-[var(--radius-lg)] overflow-hidden border border-white/10 bg-white/[0.02]">
                  <img
                    src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                    alt={t('Personnalisation complète structures gonflables - Impression HD sublimation, couleurs Pantone, design sur mesure SPORT AIR EVENT Suisse', 'Fully customized inflatable structures - HD sublimation printing, Pantone colours, bespoke design by SPORT AIR EVENT Switzerland')}
                    className="w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-3 sm:-right-5 rounded-[var(--radius)] bg-white border border-[var(--line)] px-6 py-5">
                  <div className="font-display text-4xl font-bold text-ink leading-none">360°</div>
                  <div className="text-sm text-[var(--muted)] mt-1.5">{t('de visibilité', 'of visibility')}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ POSSIBILITÉS — feature cards ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <SectionHeader
            align="center"
            className="mb-9 md:mb-12"
            kicker={t('Possibilités infinies', 'Endless possibilities')}
            index="01"
            title={t('Possibilités infinies', 'Endless possibilities')}
            lead={t('Chaque structure devient une œuvre unique qui reflète votre identité', 'Every structure becomes a unique piece that reflects your identity')}
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
      <section className="bg-deep text-white py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-9 md:mb-12">
            <div className="lg:col-span-7">
              <SectionHeader
                light
                kicker={t('Du concept à la réalité', 'From concept to reality')}
                index="02"
                title={<>{t('Du concept', 'From concept')}<br /><span className="serif-accent text-white/55">{t('à la réalité.', 'to reality.')}</span></>}
              />
            </div>
            <Reveal as="p" delay={0.1} className="lg:col-span-5 text-white/60 leading-relaxed">
              {t('Un processus simple et transparent', 'A simple, transparent process')}
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
      <section className="py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal y={40}>
              <div className="rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)]">
                <img
                  src="images/17_0aa557b4e_Capturedecran2026-01-02a170639.png"
                  alt={t('Impact visuel structures gonflables événementielles - Visibilité maximale 360 degrés pour salons professionnels et événements corporatifs', 'Visual impact of inflatable event structures - Maximum 360-degree visibility for trade shows and corporate events')}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeader
                kicker={t('Impact visuel', 'Visual impact')}
                index="03"
                title={<>{t('Un impact visuel', 'Visual impact')}<br />{t('incomparable', 'beyond compare')}</>}
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
                    {t('Démarrer votre projet', 'Start your project')} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
