import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Clock,
  Palette,
  CircleCheckBig,
  Factory,
  Truck,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useT } from '../lib/i18n.jsx';

const makeSteps = (t) => [
  {
    number: '1',
    title: t('Analyse du besoin', 'Needs assessment'),
    duration: t('1-2 jours', '1-2 days'),
    description: t('Échange approfondi pour comprendre votre projet', 'An in-depth conversation to fully understand your project'),
    Icon: MessageSquare,
  },
  {
    number: '2',
    title: t('Design 3D', '3D design'),
    duration: t('3-5 jours', '3-5 days'),
    description: t('Maquette photoréaliste de votre structure', 'A photorealistic mock-up of your structure'),
    Icon: Palette,
  },
  {
    number: '3',
    title: t('Validation', 'Approval'),
    duration: t('2-3 jours', '2-3 days'),
    description: t('Révisions illimitées jusqu\'à votre satisfaction', 'Unlimited revisions until you are fully satisfied'),
    Icon: CircleCheckBig,
  },
  {
    number: '4',
    title: t('Production', 'Production'),
    duration: t('2-4 semaines', '2-4 weeks'),
    description: t('Fabrication avec contrôle qualité rigoureux', 'Manufacturing with rigorous quality control'),
    Icon: Factory,
  },
  {
    number: '5',
    title: t('Livraison', 'Delivery'),
    duration: t('2-5 jours', '2-5 days'),
    description: t('Expédition sécurisée avec tout le matériel', 'Secure shipping with all the equipment included'),
    Icon: Truck,
  },
  {
    number: '6',
    title: t('Support continu', 'Ongoing support'),
    duration: t('Illimité', 'Unlimited'),
    description: t('Assistance technique et service après-vente', 'Technical assistance and after-sales service'),
    Icon: Headphones,
  },
];

const makeDelais = (t) => [
  {
    big: t('4-6 semaines', '4-6 weeks'),
    title: t('Standard', 'Standard'),
    description: t('Structure classique personnalisée', 'A classic structure, personalised for you'),
  },
  {
    big: t('6-8 semaines', '6-8 weeks'),
    title: t('Sur mesure', 'Custom-made'),
    description: t('Création unique sur cahier des charges', 'A one-of-a-kind creation built to your specifications'),
  },
  {
    big: t('2-3 semaines', '2-3 weeks'),
    title: t('Express', 'Express'),
    description: t('Production accélérée (supplément)', 'Accelerated production (surcharge applies)'),
  },
];

export default function Process() {
  const t = useT();
  const steps = makeSteps(t);
  const delais = makeDelais(t);
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="relative bg-deep text-white overflow-hidden">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pt-36 md:pt-44 pb-20 md:pb-28">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-white/50" />
            <span className="kicker" style={{ color: '#7db4f0' }}>{t('Notre méthode', 'Our method')}</span>
          </Reveal>

          <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,7vw,6rem)', lineHeight: 0.95, maxWidth: '14ch' }}>
            {t('De l’idée', 'From idea')}{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>{t('à la réalité', 'to reality')}</span>
          </h1>

          <Reveal as="p" delay={0.18} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.74)' }}>
            {t('Un processus transparent pour un résultat parfait', 'A transparent process for a flawless result')}
          </Reveal>

          <Reveal as="div" delay={0.3} className="mt-12 md:mt-16 flex items-stretch gap-6 sm:gap-10">
            {[['6', '', t('Étapes claires', 'Clear steps')], ['1-2', t('sem', 'wks'), t('Express possible', 'Express available')], ['100', '%', t('Suivi dédié', 'Dedicated follow-up')]].map(([n, u, l], i) => (
              <div key={i} className="flex items-stretch gap-6 sm:gap-10">
                {i > 0 && <span className="w-px self-stretch bg-white/20" />}
                <div>
                  <div className="font-display text-white font-bold leading-none flex items-baseline gap-0.5" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.7rem)', letterSpacing: '-0.03em' }}>
                    {n}<span className="text-white/55 text-[0.55em] font-semibold">{u}</span>
                  </div>
                  <div className="text-white/55 text-xs font-medium mt-1.5">{l}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ░░ STEPS — editorial numbered rows ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9 md:mb-12">
          <SectionHeader kicker={t('Le déroulé', 'The journey')} index="01" title={<>{t('Six étapes,', 'Six steps,')}<br />{t('de l’échange à l’événement', 'from first conversation to event day')}</>} />
          <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
            <Clock className="w-4 h-4 text-[var(--blue)]" />
            {t('Chaque étape pilotée avec un', 'Every step managed with a')} <span className="text-ink font-medium">{t('délai annoncé', 'committed timeline')}</span>
          </Reveal>
        </div>

        <div className="border-t border-[var(--line)]">
          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <Reveal key={step.number} y={32} className="group border-b border-[var(--line)]">
                <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center py-9 md:py-12">
                  <div className="md:col-span-2 flex items-center gap-4">
                    <span className="font-display text-[3.4rem] md:text-[4.6rem] font-bold leading-none text-ink/[0.08] group-hover:text-[var(--blue)]/20 transition-colors select-none tabular-nums">
                      0{step.number}
                    </span>
                  </div>

                  <div className="md:col-span-1 flex md:justify-center">
                    <div className="w-12 h-12 rounded-[var(--radius)] bg-white border border-[var(--line)] group-hover:border-[var(--blue)]/40 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-[var(--blue)]" />
                    </div>
                  </div>

                  <div className="md:col-span-6">
                    <h3 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', lineHeight: 1.05 }}>{step.title}</h3>
                    <p className="lead mt-2.5 max-w-md">{step.description}</p>
                  </div>

                  <div className="md:col-span-3 md:text-right">
                    <div className="inline-flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-[var(--muted)]" />
                      <span className="text-ink font-semibold tabular-nums">{step.duration}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ░░ DÉLAIS (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 md:mb-16">
            <div className="lg:col-span-7">
              <SectionHeader light kicker={t('Calendrier', 'Timeline')} index="02"
                title={<>{t('Délais de', 'Production')}<br /><span className="serif-accent text-white/55">{t('réalisation', 'lead times')}</span></>} />
            </div>
            <Reveal as="p" delay={0.1} className="lg:col-span-5 text-white/65 leading-relaxed">
              {t(
                'Trois cadences de production selon votre projet et votre échéance. Le délai exact vous est confirmé dès la validation du design.',
                'Three production paces to match your project and your deadline. Your exact lead time is confirmed as soon as the design is approved.'
              )}
            </Reveal>
          </div>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {delais.map((item, i) => (
              <motion.div variants={staggerChild} key={item.title} className="bg-deep p-7 md:p-9">
                <div className="flex items-center justify-between mb-8">
                  <span className="kicker" style={{ color: '#7db4f0' }}>{item.title}</span>
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <div className="font-display font-bold text-white tracking-tightest" style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)', lineHeight: 1 }}>{item.big}</div>
                <div className="mt-4 text-[14px] text-white/55 leading-relaxed">{item.description}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="bg-white border-t border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <SectionHeader kicker={t('Prêt à démarrer', 'Ready to start')} title={<>{t('Lançons votre projet', 'Let’s launch your project')}<br />{t('ensemble.', 'together.')}</>} lead={t('Conception Suisse. Livraison France et Europe.', 'Designed in Switzerland. Delivered across France and Europe.')} />
          <Reveal delay={0.1}>
            <Magnetic>
              <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                {t('Démarrer votre projet', 'Start your project')} <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
