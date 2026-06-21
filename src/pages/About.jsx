import { Link } from 'react-router-dom';
import {
  Award, Lightbulb, Heart, ShieldCheck, Crosshair, Rocket,
  Check, ArrowRight, MapPin, Clock, BadgeCheck,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild, motion } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useT } from '../lib/i18n.jsx';

const makeValues = (t) => [
  { Icon: Award, title: t('Excellence', 'Excellence'), text: t('Chaque structure fabriquée au standard suisse le plus exigeant.', 'Every structure built to the most demanding Swiss standard.') },
  { Icon: Lightbulb, title: t('Innovation', 'Innovation'), text: t('Des solutions gonflables pensées pour les événements modernes.', 'Inflatable solutions designed for modern events.') },
  { Icon: Heart, title: t('Passion', 'Passion'), text: t("20 ans d'engagement pour faire de chaque événement un succès.", '20 years of dedication to making every event a success.') },
  { Icon: ShieldCheck, title: t('Qualité', 'Quality'), text: t('Matériaux certifiés, non-feu, anti-UV, testés pour durer.', 'Certified, fire-retardant and UV-resistant materials, tested to last.') },
  { Icon: Crosshair, title: t('Précision', 'Precision'), text: t('Maquettes 3D et suivi de production à chaque étape.', '3D mock-ups and production tracking at every stage.') },
  { Icon: Rocket, title: t('Ambition', 'Ambition'), text: t("Nous accompagnons les marques les plus exigeantes d'Europe.", "We partner with Europe's most demanding brands.") },
];

const makeReasons = (t) => [
  t('Conception 100% suisse', '100% Swiss design'),
  t('Certifié non-feu et anti-UV', 'Fire-retardant and UV-resistant certified'),
  t('Installation en 2 minutes', 'Set up in 2 minutes'),
  t('Garantie et support inclus', 'Warranty and support included'),
];

const makeStats = (t) => [
  { Icon: Clock, value: t('20 ans', '20 years'), label: t("D'expérience", 'Of experience') },
  { Icon: BadgeCheck, value: '2 min', label: t('Installation', 'Setup') },
  { Icon: MapPin, value: '100%', label: t('Conception Suisse', 'Swiss design') },
];

export default function About() {
  const t = useT();
  const values = makeValues(t);
  const reasons = makeReasons(t);
  const stats = makeStats(t);
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">{t('Notre histoire', 'Our story')}</span>
          </Reveal>

          <h1 className="font-display font-bold tracking-tightest text-ink" style={{ fontSize: 'clamp(2.3rem,5.8vw,4.8rem)', lineHeight: 0.99, maxWidth: '16ch' }}>
            <Reveal as="span" delay={0.05} className="block">{t('Créateurs de structures', 'Creators of')}</Reveal>
            <Reveal as="span" delay={0.16} className="block">
              {t('événementielles', 'exceptional')} <span className="serif-accent text-ink/45" style={{ fontWeight: 500 }}>{t("d'exception", 'event structures')}</span>
            </Reveal>
          </h1>

          <div className="mt-8 grid lg:grid-cols-12 gap-7 lg:gap-14">
            <Reveal as="p" delay={0.3} className="lead lg:col-span-7 max-w-2xl">
              {t('Sport Air Event est votre partenaire de confiance pour des structures gonflables événementielles de haute qualité. Basée sur une conception suisse rigoureuse, notre entreprise allie innovation, design et performance pour donner vie à vos projets les plus ambitieux.', 'Sport Air Event is your trusted partner for high-quality inflatable event structures. Built on rigorous Swiss engineering, our company combines innovation, design and performance to bring your most ambitious projects to life.')}
            </Reveal>
            <Reveal as="p" delay={0.4} className="lg:col-span-5 text-ink/60 leading-relaxed lg:pt-1">
              {t("Depuis plus de 20 ans, nous accompagnons professionnels et entreprises dans la création d'espaces événementiels uniques. Nos structures gonflables – tentes, dômes, arches, colonnes et mobilier – sont conçues pour résister aux conditions les plus exigeantes tout en offrant un design moderne et une personnalisation totale.", 'For over 20 years, we have helped professionals and businesses create unique event spaces. Our inflatable structures - tents, domes, arches, columns and furniture - are engineered to withstand the most demanding conditions while delivering a modern design and full customization.')}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ STATS ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pb-12 md:pb-16">
        <RevealStagger className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {stats.map(({ Icon, value, label }) => (
            <motion.div
              key={label}
              variants={staggerChild}
              className="flex items-center gap-4 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-5 md:p-6"
            >
              <span className="w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: 'var(--blue-soft)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--blue)' }} />
              </span>
              <div className="leading-tight">
                <div className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tightest">{value}</div>
                <div className="text-[12.5px] text-[var(--muted)] font-medium mt-0.5">{label}</div>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      {/* ░░ MISSION ░░ */}
      <section className="bg-white border-y border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeader kicker={t("Notre raison d'être", 'Our purpose')} title={t('Notre mission', 'Our mission')} />
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <Reveal as="p" className="font-display text-xl md:text-2xl font-semibold text-ink leading-snug tracking-tight">
                {t("Nous croyons que chaque événement mérite une structure à la hauteur de son ambition. C'est pourquoi nous mettons un point d'honneur à offrir des produits durables, esthétiques et faciles à installer.", 'We believe every event deserves a structure worthy of its ambition. That is why we are committed to delivering products that are durable, beautiful and easy to set up.')}
              </Reveal>
              <Reveal as="p" delay={0.1} className="mt-5 text-ink/60 leading-relaxed max-w-xl">
                {t("Notre équipe d'experts vous accompagne de la conception à la livraison, en passant par la création de maquettes 3D pour visualiser votre projet avant sa réalisation.", 'Our team of experts supports you from design to delivery, including 3D mock-ups so you can visualize your project before it is built.')}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ VALUES (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-12 md:py-16">
          <div className="mb-9 md:mb-12">
            <SectionHeader light kicker={t('Ce qui nous guide au quotidien', 'What guides us every day')}
              title={<>{t('Nos', 'Our')} <span className="serif-accent text-white/55">{t('valeurs', 'values')}</span></>} />
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {values.map(({ Icon, title, text }) => (
              <motion.div variants={staggerChild} key={title} className="bg-deep p-6 md:p-7">
                <Icon className="w-5 h-5 text-[#7db4f0] mb-5" />
                <h3 className="font-display font-semibold text-[16px] mb-1.5">{title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ WHY US ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-12 md:py-16">
        <div className="mb-9 md:mb-12">
          <SectionHeader kicker={t('Nos engagements', 'Our commitments')} title={t('Pourquoi nous choisir ?', 'Why choose us?')} />
        </div>
        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {reasons.map((reason) => (
            <motion.div
              key={reason}
              variants={staggerChild}
              className="flex items-center gap-4 p-5 md:p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--line)]"
            >
              <span className="w-6 h-6 flex-shrink-0 rounded-md flex items-center justify-center" style={{ background: 'var(--blue)' }}>
                <Check size={15} strokeWidth={3} className="text-white" />
              </span>
              <span className="font-display text-base md:text-lg font-semibold text-ink">{reason}</span>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="px-5 sm:px-8 pb-16 md:pb-20">
        <div className="relative max-w-content mx-auto rounded-[28px] overflow-hidden flex items-center justify-center bg-deep" style={{ minHeight: 300 }}>
          <div className="relative z-10 text-center px-6 py-16 md:py-20 max-w-2xl">
            <Reveal as="div" y={14} className="flex justify-center mb-4">
              <span className="kicker" style={{ color: '#7db4f0' }}>{t('Prêt à démarrer', 'Ready to start')}</span>
            </Reveal>
            <Reveal as="h2" delay={0.05} className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2rem,4.6vw,3.4rem)', lineHeight: 1.02 }}>
              {t('Prêt à créer ensemble ?', 'Ready to create together?')}
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-4 text-white/75 text-lg">{t('Transformons votre vision en réalité', "Let's turn your vision into reality")}</Reveal>
            <Reveal delay={0.2} className="mt-8 flex justify-center">
              <Magnetic>
                <Link to="/Contact" data-cursor className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                  {t('Demander un devis', 'Request a quote')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
