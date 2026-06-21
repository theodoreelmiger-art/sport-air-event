import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useT, useLang } from '../lib/i18n.jsx';

const makeProducts = (t) => [
  {
    n: '01',
    badge: t('Bestseller', 'Bestseller'),
    label: t('Visibilité maximale à 360°', 'Maximum 360° visibility'),
    title: t('Dôme Premium', 'Premium Dome'),
    specs: [
      { k: t('Matériau', 'Material'), v: 'PVC 650g/m²' },
      { k: t('Montage', 'Setup'), v: '< 15 min' },
      { k: t('Personnes', 'Operators'), v: t('1 seule', 'Just 1') },
    ],
    features: [
      t('Visibilité totale 360°', 'Full 360° visibility'),
      t('Installation express 10min', '10-minute express setup'),
      t('Diamètres 4m à 15m', 'Diameters from 4m to 15m'),
      t('Résistance vent 70km/h', 'Wind-resistant up to 70 km/h'),
      t('Personnalisation complète', 'Fully customisable'),
      t('Garantie 2 ans', '2-year warranty'),
    ],
    price: t("À partir de CHF 3'500", "From CHF 3'500"),
    href: '/Contact?product=D%C3%B4me%20Premium',
    reverse: false,
  },
  {
    n: '02',
    badge: t('Innovation', 'Innovation'),
    label: t('Architecture unique et moderne', 'A unique, modern architecture'),
    title: t('Tente Spider', 'Spider Tent'),
    specs: [
      { k: t('Stabilité', 'Stability'), v: t('Pieds courbes', 'Curved legs') },
      { k: t('Surface', 'Surface'), v: t("Jusqu'à 60m²", 'Up to 60m²') },
      { k: t('Usage', 'Use'), v: t('Tout terrain', 'All terrains') },
    ],
    features: [
      t('Design architectural unique', 'Distinctive architectural design'),
      t('Pieds courbes stabilisateurs', 'Curved stabilising legs'),
      t('Branding sur toutes faces', 'Branding on every face'),
      t('Usage indoor & outdoor', 'Indoor & outdoor use'),
      t('Montage ultra-rapide', 'Ultra-fast assembly'),
      t('Garantie structure 2 ans', '2-year structural warranty'),
    ],
    price: t("À partir de CHF 4'500", "From CHF 4'500"),
    href: '/Contact?product=Tente%20Spider',
    reverse: true,
  },
  {
    n: '03',
    badge: t('Exclusif', 'Exclusive'),
    label: t('Votre vision unique réalisée', 'Your unique vision brought to life'),
    title: t('Sur Mesure', 'Custom-made'),
    specs: [
      { k: t('Design', 'Design'), v: t('100% unique', '100% unique') },
      { k: t('Dimensions', 'Dimensions'), v: t('Illimitées', 'Unlimited') },
      { k: t('Délai', 'Lead time'), v: t('4-6 semaines', '4-6 weeks') },
    ],
    features: [
      t('Design 100% personnalisé', '100% bespoke design'),
      t('Formes et tailles illimitées', 'Unlimited shapes and sizes'),
      t('Maquette 3D photoréaliste', 'Photorealistic 3D mock-up'),
      t('Dimensions sur demande', 'Dimensions on request'),
      t('Conception suisse exclusive', 'Exclusive Swiss design'),
      t('Support projet dédié', 'Dedicated project support'),
    ],
    price: t('Sur devis personnalisé', 'Custom quote'),
    href: '/Contact?product=Sur%20Mesure',
    reverse: false,
  },
];

export default function ModernProducts() {
  const t = useT();
  const { lang } = useLang();
  const products = makeProducts(t);
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="bg-paper pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">{t('Catalogue · Fabrication Suisse', 'Catalogue · Swiss-made')}</span>
          </Reveal>

          <h1 className="font-display text-ink font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,7vw,5.8rem)', lineHeight: 0.96, maxWidth: '15ch' }}>
            {t('Nos produits', 'Our')}{' '}
            <span className="serif-accent text-ink/45" style={{ fontWeight: 500 }}>{t('gonflables professionnels', 'professional inflatables')}</span>
          </h1>

          <Reveal as="p" delay={0.12} y={18} className="lead mt-7 max-w-xl">
            {t('Solutions gonflables professionnelles • Fabrication Suisse', 'Professional inflatable solutions • Swiss-made')}
          </Reveal>

          <Reveal as="div" delay={0.2} className="mt-12 md:mt-16 flex flex-wrap items-stretch gap-6 sm:gap-10">
            {products.map((p, i) => (
              <div key={p.title} className="flex items-stretch gap-6 sm:gap-10">
                {i > 0 && <span className="w-px self-stretch bg-[var(--line)]" />}
                <div>
                  <div className="text-xs font-semibold tabular-nums text-ink/30 mb-2">{p.n}</div>
                  <div className="font-display font-semibold text-ink leading-tight" style={{ fontSize: 'clamp(1rem,1.6vw,1.25rem)' }}>{p.title}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ░░ PRODUCTS — alternating showcase ░░ */}
      <section className="bg-white border-t border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9 md:mb-12">
            <SectionHeader kicker={t('Nos solutions', 'Our solutions')} index="01" title={lang === 'en' ? <>Three structures.<br />One shared standard.</> : <>Trois structures.<br />Une exigence commune.</>} />
            <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
              {t('Chaque produit en version', 'Every product available in a')} <span className="text-ink font-medium">{t('100% personnalisable', '100% customisable')}</span> {t('version', 'version')}
            </Reveal>
          </div>

          <div className="space-y-12 md:space-y-16">
            {products.map((product, i) => (
              <Reveal key={product.title} y={40} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className={`relative ${product.reverse ? 'md:order-2' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[var(--radius-lg)] bg-[var(--paper-2)] border border-[var(--line)] overflow-hidden flex flex-col justify-between p-8 md:p-12"
                    style={{ aspectRatio: '4 / 3' }}
                  >
                    <span className="absolute -bottom-4 right-4 font-display font-bold leading-none text-ink/[0.05] select-none" style={{ fontSize: 'clamp(7rem,16vw,13rem)' }}>{product.n}</span>
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="kicker">{product.title}</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ background: 'var(--blue)' }}>
                        {product.badge}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <div className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.0 }}>{product.title}</div>
                      <div className="mt-3 text-sm text-ink/60 max-w-[22ch]">{product.label}</div>
                    </div>
                  </motion.div>
                </div>

                <div className={`${product.reverse ? 'md:order-1' : ''}`}>
                  <div className="kicker mb-4">{product.label}</div>
                  <h2 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', lineHeight: 1.02 }}>{product.title}</h2>

                  <RevealStagger className="grid grid-cols-3 gap-px mt-7 bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius)] overflow-hidden">
                    {product.specs.map((spec) => (
                      <motion.div variants={staggerChild} key={spec.k} className="bg-white p-3.5 md:p-4">
                        <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1">{spec.k}</div>
                        <div className="font-display font-semibold text-ink text-sm md:text-[15px]">{spec.v}</div>
                      </motion.div>
                    ))}
                  </RevealStagger>

                  <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-ink/75">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--blue-soft)' }}>
                          <Check className="w-3 h-3" style={{ color: 'var(--blue)' }} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-7">
                    <span className="font-display text-2xl font-bold text-ink">{product.price}</span>
                    <Magnetic>
                      <Link
                        to={product.href}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-ink/15 hover:border-[var(--blue)] hover:text-[var(--blue)] pb-1 transition-colors"
                      >
                        {t('Demander un devis', 'Request a quote')}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ CTA (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                light
                kicker={t('Un conseil sur mesure', 'Tailored advice')}
                index="—"
                title={lang === 'en'
                  ? <>Need help<br /><span className="serif-accent text-white/55">choosing?</span></>
                  : <>Besoin d&apos;aide<br /><span className="serif-accent text-white/55">pour choisir ?</span></>}
              />
            </div>
            <Reveal as="div" delay={0.12} className="lg:col-span-4 flex lg:justify-end">
              <Magnetic>
                <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                  {t('Parler à un expert', 'Talk to an expert')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
