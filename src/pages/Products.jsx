import { Link } from 'react-router-dom';
import {
  Shield,
  Clock,
  Users,
  Maximize2,
  Wind,
  Zap,
  Package,
  Check,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { motion, Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useT } from '../lib/i18n.jsx';

const makeSpecs = (t) => [
  { icon: Shield, label: t('Matériaux', 'Materials'), value: t('PVC 650g/m² anti-UV', '650 g/m² anti-UV PVC') },
  { icon: Clock, label: t('Montage', 'Setup'), value: t('Moins de 15 minutes', 'Under 15 minutes') },
  { icon: Users, label: t('Installation', 'Installation'), value: t('1 personne suffit', 'One person is enough') },
  { icon: Maximize2, label: t('Tailles', 'Sizes'), value: t('De 3m à 20m', 'From 3 m to 20 m') },
];

const makeProducts = (t) => [
  {
    n: '01',
    img: 'images/19_f5298932f_Capturedecran2026-01-02a170657.png',
    alt: t(
      'Dôme Premium - Dômes gonflables SPORT AIR EVENT - Structures gonflables professionnelles fabriquées en Suisse pour événements, salons et expositions',
      'Premium Dome - SPORT AIR EVENT inflatable domes - Professional inflatable structures made in Switzerland for events, trade shows and exhibitions'
    ),
    icon: Wind,
    category: t('Dômes gonflables', 'Inflatable domes'),
    title: t('Dôme Premium', 'Premium Dome'),
    tagline: t('Visibilité 360° garantie', 'Guaranteed 360° visibility'),
    features: [
      t('Montage 10 minutes', 'Set up in 10 minutes'),
      t('Surface personnalisable complète', 'Fully customisable surface'),
      t('Résistance vent 70 km/h', 'Wind resistance up to 70 km/h'),
      t('Diamètres 4m à 15m', 'Diameters from 4 m to 15 m'),
    ],
    to: '/Contact?product=D%C3%B4me%20Premium',
  },
  {
    n: '02',
    img: 'images/16_be94e4481_Capturedecran2026-01-02a170703.png',
    alt: t(
      'Tente Spider - Tentes professionnelles SPORT AIR EVENT - Structures gonflables professionnelles fabriquées en Suisse pour événements, salons et expositions',
      'Spider Tent - SPORT AIR EVENT professional tents - Professional inflatable structures made in Switzerland for events, trade shows and exhibitions'
    ),
    icon: Zap,
    category: t('Tentes professionnelles', 'Professional tents'),
    title: t('Tente Spider', 'Spider Tent'),
    tagline: t('Design architectural unique', 'A unique architectural design'),
    features: [
      t('Pieds courbes stabilisateurs', 'Curved stabilising legs'),
      t('Montage ultra-rapide', 'Ultra-fast setup'),
      t('Branding sur arches', 'Branding on the arches'),
      t('Indoor & Outdoor', 'Indoor & outdoor'),
    ],
    to: '/Contact?product=Tente%20Spider',
  },
  {
    n: '03',
    img: 'images/17_0aa557b4e_Capturedecran2026-01-02a170639.png',
    alt: t(
      'Structure Sur Mesure - Création exclusive SPORT AIR EVENT - Structures gonflables professionnelles fabriquées en Suisse pour événements, salons et expositions',
      'Custom-Made Structure - Exclusive SPORT AIR EVENT creation - Professional inflatable structures made in Switzerland for events, trade shows and exhibitions'
    ),
    icon: Package,
    category: t('Création exclusive', 'Exclusive creation'),
    title: t('Structure Sur Mesure', 'Custom-Made Structure'),
    tagline: t('Votre vision, notre réalité', 'Your vision, brought to life'),
    features: [
      t('Design unique', 'One-of-a-kind design'),
      t('Dimensions illimitées', 'Unlimited dimensions'),
      t('Formes personnalisées', 'Custom shapes'),
      t('Maquette 3D incluse', '3D mock-up included'),
    ],
    to: '/Contact?product=Structure%20Sur%20Mesure',
  },
];

export default function Products() {
  const t = useT();
  const specs = makeSpecs(t);
  const products = makeProducts(t);
  return (
    <div className="overflow-x-clip bg-paper pt-20">
      {/* ░░ HERO ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-24 md:py-32">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-white/40" />
            <span className="kicker" style={{ color: '#7db4f0' }}>{t('Catalogue · Swiss Quality', 'Catalogue · Swiss Quality')}</span>
          </Reveal>
          <h1
            className="font-display text-white font-bold tracking-tightest"
            style={{ fontSize: 'clamp(2.4rem,6.5vw,5.4rem)', lineHeight: 0.97, maxWidth: '18ch' }}
          >
            {t('Structures gonflables événementielles', 'Inflatable event structures')}{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>
              {t('professionnelles suisses', 'professional Swiss-made')}
            </span>
          </h1>
          <Reveal as="p" delay={0.18} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {t('Impact maximum. Installation minimum.', 'Maximum impact. Minimal setup.')}
          </Reveal>
        </div>
      </section>

      {/* ░░ SPECS STRIP ░░ */}
      <section className="bg-white border-b border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-16 md:py-20">
          <RevealStagger className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
            {specs.map((s, i) => (
              <motion.div variants={staggerChild} key={s.label} className="bg-white p-7 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <s.icon className="w-5 h-5 text-[var(--blue)]" />
                  <span className="text-xs font-semibold text-ink/20 tabular-nums">0{i + 1}</span>
                </div>
                <div className="kicker mb-2" style={{ color: 'var(--muted)' }}>{s.label}</div>
                <div className="font-display font-semibold text-[15px] text-ink">{s.value}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ PRODUCTS — alternating showcase ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="mb-9 md:mb-12">
          <SectionHeader
            kicker={t('Notre gamme', 'Our range')}
            index="01"
            title={<>{t('Trois structures.', 'Three structures.')}<br />{t('Une exigence suisse.', 'One Swiss standard.')}</>}
            lead={t('Chaque structure est conçue, imprimée et finie sur mesure pour votre marque et vos événements.', 'Every structure is designed, printed and finished to measure for your brand and your events.')}
          />
        </div>

        <div className="space-y-12 md:space-y-16">
          {products.map((p, i) => (
            <Reveal key={p.title} y={40} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className={`relative ${i % 2 ? 'md:order-2' : ''}`}>
                <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--line)]">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-[460px] md:h-[520px] object-cover"
                  />
                  <span className="absolute top-5 left-6 font-display text-[5rem] md:text-[7rem] font-bold leading-none text-white/15 select-none">{p.n}</span>
                  <div className="absolute bottom-6 left-6">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-deep text-white text-sm font-semibold">
                      <p.icon className="w-4 h-4 text-[#5aa2f0]" />
                      <span>{p.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${i % 2 ? 'md:order-1' : ''}`}>
                <div className="kicker mb-4">{p.category}</div>
                <h2
                  className="font-display font-bold text-ink tracking-tightest"
                  style={{ fontSize: 'clamp(1.9rem,3.4vw,2.9rem)', lineHeight: 1.02 }}
                >
                  {p.title}
                </h2>
                <p className="lead mt-4 max-w-md">{p.tagline}</p>

                <ul className="mt-8 space-y-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-ink/80">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border border-[var(--line)]">
                        <Check className="w-3 h-3 text-[var(--blue)]" />
                      </span>
                      <span className="text-[15px]">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <Magnetic>
                    <Link
                      to={p.to}
                      className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                    >
                      {t('Obtenir un devis', 'Request a quote')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <SectionHeader
                light
                kicker={t('Prêt à démarrer', 'Ready to start')}
                index="02"
                title={<>{t('Prêt à donner vie', 'Ready to bring')}<br /><span className="serif-accent text-white/55">{t('à votre projet ?', 'your project to life?')}</span></>}
                lead={t('Obtenez un devis personnalisé en quelques clics', 'Get a tailored quote in just a few clicks')}
              />
            </div>
            <Reveal as="div" delay={0.15} className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3 lg:pb-2">
              <Magnetic>
                <Link
                  to="/Calculator"
                  className="inline-flex items-center justify-center gap-2 bg-white text-ink font-semibold rounded-full px-7 py-3.5 text-[15px] hover:bg-white/90 transition-colors"
                >
                  {t('Calculer mon devis', 'Calculate my quote')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Link
                to="/Contact"
                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                {t('Parler à un expert', 'Talk to an expert')} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
