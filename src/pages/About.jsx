import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Zap, Heart, Shield, Target, Rocket, CircleCheck, ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const values = [
  { Icon: Award, title: 'Excellence', text: 'Chaque structure fabriquée au standard suisse le plus exigeant.' },
  { Icon: Zap, title: 'Innovation', text: 'Des solutions gonflables pensées pour les événements modernes.' },
  { Icon: Heart, title: 'Passion', text: "20 ans d'engagement pour faire de chaque événement un succès." },
  { Icon: Shield, title: 'Qualité', text: 'Matériaux certifiés, non-feu, anti-UV, testés pour durer.' },
  { Icon: Target, title: 'Précision', text: 'Maquettes 3D et suivi de production à chaque étape.' },
  { Icon: Rocket, title: 'Ambition', text: "Nous accompagnons les marques les plus exigeantes d'Europe." },
];

const reasons = [
  'Conception 100% suisse',
  'Certifié non-feu et anti-UV',
  'Installation en 2 minutes',
  'Garantie et support inclus',
];

export default function About() {
  return (
    <div className="overflow-x-hidden bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">Notre histoire</span>
          </Reveal>

          <h1 className="font-display font-bold tracking-tightest text-ink" style={{ fontSize: 'clamp(2.4rem,6.4vw,5.4rem)', lineHeight: 0.98, maxWidth: '17ch' }}>
            <Reveal as="span" delay={0.05} className="block">Créateurs de structures</Reveal>
            <Reveal as="span" delay={0.16} className="block">
              événementielles <span className="serif-accent text-ink/45" style={{ fontWeight: 500 }}>d'exception</span>
            </Reveal>
          </h1>

          <div className="mt-9 grid lg:grid-cols-12 gap-8 lg:gap-16">
            <Reveal as="p" delay={0.3} className="lead lg:col-span-7 max-w-2xl">
              Sport Air Event est votre partenaire de confiance pour des structures gonflables événementielles de haute qualité. Basée sur une conception suisse rigoureuse, notre entreprise allie innovation, design et performance pour donner vie à vos projets les plus ambitieux.
            </Reveal>
            <Reveal as="p" delay={0.4} className="lg:col-span-5 text-ink/60 leading-relaxed lg:pt-1">
              Depuis plus de 20 ans, nous accompagnons professionnels et entreprises dans la création d'espaces événementiels uniques. Nos structures gonflables – tentes, dômes, arches, colonnes et mobilier – sont conçues pour résister aux conditions les plus exigeantes tout en offrant un design moderne et une personnalisation totale.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ STATS ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-16 md:py-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
            <motion.div variants={staggerChild} className="bg-white p-8 md:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <span className="kicker" style={{ color: 'var(--muted)' }}>D'expérience</span>
                <span className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tightest">20 ans</span>
              </div>
              <div className="relative h-1.5 bg-[var(--paper-2)] rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '100%', background: 'var(--blue)' }}></div>
              </div>
              <div className="flex justify-between mt-3 text-xs text-[var(--muted)] font-medium tabular-nums">
                <span>0 an</span>
                <span className="text-[var(--blue)] font-semibold">20 ans</span>
              </div>
            </motion.div>
            <motion.div variants={staggerChild} className="bg-white p-8 md:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <span className="kicker" style={{ color: 'var(--muted)' }}>Clients satisfaits</span>
                <span className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tightest">100%</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-5 h-5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="ml-2 font-display text-lg font-bold text-ink">4.9 / 5</span>
              </div>
              <p className="text-xs text-[var(--muted)]">Basé sur 127 avis Google vérifiés</p>
            </motion.div>
          </RevealStagger>
        </div>
      </section>

      {/* ░░ MISSION ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionHeader kicker="Notre raison d'être" index="01" title="Notre mission" />
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <Reveal as="p" className="font-display text-xl md:text-2xl font-semibold text-ink leading-snug tracking-tight">
              Nous croyons que chaque événement mérite une structure à la hauteur de son ambition. C'est pourquoi nous mettons un point d'honneur à offrir des produits durables, esthétiques et faciles à installer.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-ink/60 leading-relaxed max-w-xl">
              Notre équipe d'experts vous accompagne de la conception à la livraison, en passant par la création de maquettes 3D pour visualiser votre projet avant sa réalisation.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ VALUES (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
          <div className="mb-14 md:mb-20">
            <SectionHeader light kicker="Ce qui nous guide au quotidien" index="02"
              title={<>Nos <span className="serif-accent text-white/55">valeurs</span></>} />
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {values.map(({ Icon, title, text }, i) => (
              <motion.div variants={staggerChild} key={title} className="bg-deep p-7 md:p-9">
                <div className="flex items-center justify-between mb-8">
                  <Icon className="w-5 h-5 text-[#5aa2f0]" />
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-[16px] mb-1.5">{title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ WHY US ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
        <div className="mb-14 md:mb-16">
          <SectionHeader kicker="Nos engagements" index="03" title={<>Pourquoi nous<br />choisir ?</>} />
        </div>
        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason}
              variants={staggerChild}
              className="group flex items-center gap-5 p-6 md:p-7 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors"
            >
              <span className="font-display text-sm font-semibold text-ink/25 tabular-nums">0{i + 1}</span>
              <span className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: 'var(--blue-soft)' }}>
                <CircleCheck className="w-5 h-5" style={{ color: 'var(--blue)' }} />
              </span>
              <span className="font-display text-base md:text-lg font-semibold text-ink">{reason}</span>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="px-5 sm:px-8 pb-20">
        <div className="relative max-w-content mx-auto rounded-[28px] overflow-hidden flex items-center justify-center bg-deep" style={{ minHeight: 360 }}>
          <div className="relative z-10 text-center px-6 py-24 max-w-2xl">
            <Reveal as="div" y={14} className="flex justify-center mb-5">
              <span className="kicker" style={{ color: 'rgba(255,255,255,0.85)' }}>Prêt à démarrer</span>
            </Reveal>
            <Reveal as="h2" delay={0.05} className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.1rem,5vw,4rem)', lineHeight: 1.0 }}>
              Prêt à créer ensemble ?
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 text-white/75 text-lg">Transformons votre vision en réalité</Reveal>
            <Reveal delay={0.2} className="mt-9 flex justify-center">
              <Magnetic>
                <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                  Nous contacter <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
