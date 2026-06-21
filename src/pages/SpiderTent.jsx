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
import { useT } from '../lib/i18n.jsx';

const makeFeatures = (t) => [
  {
    Icon: Zap,
    title: t('Montage ultra-rapide', 'Ultra-fast setup'),
    desc: t('Installation en 10 minutes par 1 personne', 'Up and running in 10 minutes by a single person'),
  },
  {
    Icon: Wind,
    title: t('Résistance au vent', 'Wind resistance'),
    desc: t("Jusqu'à 70 km/h", 'Up to 70 km/h'),
  },
  {
    Icon: Droplet,
    title: t('Étanche', 'Waterproof'),
    desc: t('100% imperméable, PVC 650g/m²', '100% waterproof, 650g/m² PVC'),
  },
  {
    Icon: Sun,
    title: t('Anti-UV', 'UV protection'),
    desc: t('Protection UV50+', 'UV50+ protection'),
  },
  {
    Icon: Shield,
    title: t('Garantie 2 ans', '2-year warranty'),
    desc: t('Sur structure et impression', 'On structure and printing'),
  },
  {
    Icon: Clock,
    title: t('Livraison rapide', 'Fast delivery'),
    desc: t('4-6 semaines', '4-6 weeks'),
  },
];

const makeSizes = (t) => [
  {
    title: '3x3m',
    people: t('8-10 personnes', '8-10 people'),
    dimensions: '3m x 3m',
    hauteur: '2.8m',
    poids: '45kg',
    prix: 'CHF 4,500',
    popular: false,
  },
  {
    title: '4x4m',
    people: t('12-15 personnes', '12-15 people'),
    dimensions: '4m x 4m',
    hauteur: '3.2m',
    poids: '60kg',
    prix: 'CHF 6,500',
    popular: true,
  },
  {
    title: '5x5m',
    people: t('20-25 personnes', '20-25 people'),
    dimensions: '5m x 5m',
    hauteur: '3.5m',
    poids: '75kg',
    prix: 'CHF 8,500',
    popular: false,
  },
];

// Spec data — icon + label + prominent value. `feature` marks the deep-blue hero spec.
const makeSpecs = (t) => [
  {
    icon: Layers,
    label: t('Structure', 'Structure'),
    value: t('4 pieds gonflables courbes', '4 curved inflatable legs'),
    note: t('Architecture autoportante, sans armature rigide', 'Self-supporting architecture, no rigid frame'),
    feature: true,
  },
  { icon: Shield, label: t('Matériau', 'Material'), value: t('PVC 650g/m² anti-UV', '650g/m² UV-resistant PVC') },
  { icon: Gauge, label: t('Pression', 'Pressure'), value: '0.3 bar' },
  { icon: Sparkles, label: t('Personnalisation', 'Customisation'), value: t('Impression haute définition', 'High-definition printing') },
  { icon: Wrench, label: t('Accessoires', 'Accessories'), value: t('Pompe électrique incluse', 'Electric pump included') },
  { icon: Maximize, label: t('Usage', 'Use'), value: t('Intérieur et extérieur', 'Indoor and outdoor') },
];

// Compact spec-card grid — icône + label, valeur réelle en évidence, petit
// sous-titre. La spec signature (feature) garde un léger liseré bleu.
function SpecCardGrid() {
  const t = useT();
  const specs = makeSpecs(t);
  return (
    <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
      {specs.map((s) => {
        const Icon = s.icon;
        return (
          <motion.div
            variants={staggerChild}
            key={s.label}
            className={`spider-spec-card flex flex-col rounded-2xl border bg-white p-4 md:p-5 transition-colors duration-200 ${
              s.feature ? 'border-[var(--blue)]/40' : 'border-[var(--line)]'
            }`}
          >
            <div className="mb-3.5 flex items-center justify-between gap-2">
              <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[var(--blue-soft)] text-[var(--blue)]" style={{ width: 32, height: 32 }}>
                <Icon className="w-4 h-4" strokeWidth={2.4} />
              </span>
              {s.feature && (
                <span className="kicker text-[0.62rem]" style={{ color: 'var(--blue)' }}>{t('Signature', 'Signature')}</span>
              )}
            </div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] leading-tight text-[var(--blue-deep)]">
              {s.label}
            </div>
            <div className="font-display font-bold tracking-tightest text-ink leading-[1.1] mt-1.5 text-[clamp(1.05rem,1.8vw,1.35rem)]">
              {s.value}
            </div>
            {s.note && (
              <div className="mt-2 text-[0.82rem] leading-relaxed text-[var(--muted)]">
                {s.note}
              </div>
            )}
          </motion.div>
        );
      })}
      <style>{`.spider-spec-card:hover{border-color:rgba(0,102,204,0.4);background:var(--blue-mist);}`}</style>
    </RevealStagger>
  );
}

export default function SpiderTent() {
  const t = useT();
  const features = makeFeatures(t);
  const sizes = makeSizes(t);
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
                <span className="kicker">{t('Tente professionnelle', 'Professional tent')}</span>
              </Reveal>

              <Reveal as="h1" y={26} delay={0.05}
                className="font-display font-bold text-ink tracking-tightest"
                style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 0.96 }}>
                {t('Tente Spider', 'Spider Tent')}<br />
                <span className="serif-accent text-ink/55" style={{ fontWeight: 500 }}>X-Gloo Style</span>
              </Reveal>

              <Reveal as="p" delay={0.12} y={20} className="lead mt-7 max-w-lg">
                {t('Design architectural unique avec 4 pieds courbes gonflables. Parfaite pour salons, événements sportifs et stands promotionnels.', 'A striking architectural design with 4 curved inflatable legs. Perfect for trade shows, sporting events and promotional stands.')}
              </Reveal>

              <Reveal as="div" delay={0.18} className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                {[t('Montage 10 minutes', '10-minute setup'), t('Design moderne', 'Modern design'), t('Branding 360°', '360° branding')].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-ink/75">
                    <Check className="w-4 h-4 text-[var(--blue)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </Reveal>

              <Reveal as="div" delay={0.24} className="mt-9 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <Link to="/Calculator" className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                    {t('Calculer mon prix', 'Calculate my price')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Link to="/Contact?product=Tente%20Spider" className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-ink border border-[var(--line)] hover:border-ink/30 transition-colors">
                  {t('Demander un devis', 'Request a quote')}
                </Link>
              </Reveal>
            </div>

            <Reveal y={40} className="relative">
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)]">
                <img
                  src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                  alt={t('Tente Spider X-Gloo', 'Spider Tent X-Gloo')}
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-6 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-6">
                <div className="text-xs text-[var(--muted)] uppercase tracking-[0.16em] font-semibold mb-1.5">{t('À partir de', 'From')}</div>
                <div className="font-display text-3xl font-bold text-ink">CHF 4,500</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ PARFAITE POUR — premium use-case / feature cards ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div className="flex flex-col items-start max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">{t('Parfaite pour', 'Perfect for')}</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink leading-[1.0] tracking-tightest text-[clamp(1.9rem,4.6vw,3.4rem)]">
                <MaskHeading text={t("Conçue pour l'efficacité", 'Built for efficiency')} />{' '}
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text={t("et l'impact visuel.", 'and visual impact.')} delay={0.2} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead md:max-w-sm md:pb-2">
              {t('Six atouts qui font de la Tente Spider la structure idéale pour vos salons, événements sportifs et stands promotionnels.', 'Six strengths that make the Spider Tent the ideal structure for your trade shows, sporting events and promotional stands.')}
            </Rise>
          </div>

          {/* Liste-rangées éditoriales (informatif) — rangées à filets : numéro
              fantôme, chip d'icône, titre + desc. Survol discret, aucun état. */}
          <RevealStagger className="border-t border-[var(--line)]">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div
                variants={staggerChild}
                key={title}
                data-cursor
                className="spider-uc-row relative flex items-center gap-3.5 md:gap-5 overflow-hidden bg-white border-b border-[var(--line)] px-3.5 py-4 md:px-6 md:py-6 transition-colors duration-200"
              >
                <span className="flex items-center justify-center shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-[11px] bg-[var(--blue-soft)] text-[var(--blue)]">
                  <Icon className="w-[18px] h-[18px] md:w-5 md:h-5" strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[0.95rem] md:text-xl font-semibold leading-tight text-ink tracking-tight">
                    {title}
                  </span>
                  <span className="block text-[0.8rem] md:text-sm leading-snug text-[var(--muted)] mt-0.5">
                    {desc}
                  </span>
                </span>
              </motion.div>
            ))}
          </RevealStagger>
          <style>{`.spider-uc-row:hover{background:var(--blue-mist);}`}</style>
        </div>
      </section>

      {/* ░░ SIZES ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader kicker={t('Tailles disponibles', 'Available sizes')} index="02"
            title={<>{t('Choisissez la dimension', 'Choose the size')}<br />{t('adaptée à votre événement', 'that fits your event')}</>} />
          <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
            {t('Sélectionnez votre format', 'Select your format')}
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
                    {t('Plus populaire', 'Most popular')}
                  </div>
                )}
                <div className="flex flex-col flex-1 p-8">
                  <div className="mb-6">
                    <div className="font-display text-4xl font-bold text-ink mb-1.5">{size.title}</div>
                    <div className="text-sm text-[var(--muted)]">{size.people}</div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">{t('Dimensions', 'Dimensions')}</span>
                      <span className="font-semibold text-ink">{size.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">{t('Hauteur', 'Height')}</span>
                      <span className="font-semibold text-ink">{size.hauteur}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">{t('Poids', 'Weight')}</span>
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
                        {t('Configurer', 'Configure')}
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </RevealStagger>
      </section>

      {/* ░░ CARACTÉRISTIQUES TECHNIQUES — compact spec-card grid ░░ */}
      <section className="bg-paper py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-9 md:mb-12">
            <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">{t('Fiche technique', 'Spec sheet')}</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text={t('Caractéristiques', 'Technical')} />{' '}
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text={t('techniques', 'specifications')} delay={0.18} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lg:col-span-5 lead">
              {t("Une structure pensée pour durer : matériaux anti-UV, gonflage haute pression et personnalisation haute définition, prête pour l'intérieur comme l'extérieur.", 'A structure built to last: UV-resistant materials, high-pressure inflation and high-definition customisation, ready for indoor and outdoor use alike.')}
            </Rise>
          </div>

          {/* Compact spec-card grid */}
          <SpecCardGrid />
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
        <Reveal className="rounded-[var(--radius-lg)] bg-deep text-white px-6 sm:px-12 py-16 md:py-20 text-center">
          <span className="kicker" style={{ color: '#7db4f0' }}>{t('Prêt à démarrer', 'Ready to start')}</span>
          <h2 className="font-display font-bold tracking-tightest mt-5" style={{ fontSize: 'clamp(2rem,4.6vw,3.4rem)', lineHeight: 1.02 }}>
            {t('Prêt à commander votre Tente Spider ?', 'Ready to order your Spider Tent?')}
          </h2>
          <p className="lead mt-5 mx-auto max-w-xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {t('Obtenez un devis personnalisé en quelques clics', 'Get a tailored quote in just a few clicks')}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Magnetic>
              <Link to="/Calculator" className="inline-flex items-center justify-center gap-2 bg-white text-ink font-semibold rounded-full px-7 py-3.5 text-[15px] hover:bg-white/90 transition-colors">
                {t('Calculer mon prix', 'Calculate my price')} <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <Link to="/Contact?product=Tente%20Spider" className="group inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors">
              {t('Contacter un expert', 'Talk to an expert')} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
