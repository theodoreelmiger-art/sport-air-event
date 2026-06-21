import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const products = [
  {
    n: '01',
    badge: 'Bestseller',
    label: 'Visibilité maximale à 360°',
    title: 'Dôme Premium',
    specs: [
      { k: 'Matériau', v: 'PVC 650g/m²' },
      { k: 'Montage', v: '< 15 min' },
      { k: 'Personnes', v: '1 seule' },
    ],
    features: [
      'Visibilité totale 360°',
      'Installation express 10min',
      'Diamètres 4m à 15m',
      'Résistance vent 70km/h',
      'Personnalisation complète',
      'Garantie 2 ans',
    ],
    price: "À partir de CHF 3'500",
    href: '/Contact?product=D%C3%B4me%20Premium',
    reverse: false,
  },
  {
    n: '02',
    badge: 'Innovation',
    label: 'Architecture unique et moderne',
    title: 'Tente Spider',
    specs: [
      { k: 'Stabilité', v: 'Pieds courbes' },
      { k: 'Surface', v: "Jusqu'à 60m²" },
      { k: 'Usage', v: 'Tout terrain' },
    ],
    features: [
      'Design architectural unique',
      'Pieds courbes stabilisateurs',
      'Branding sur toutes faces',
      'Usage indoor & outdoor',
      'Montage ultra-rapide',
      'Garantie structure 2 ans',
    ],
    price: "À partir de CHF 4'500",
    href: '/Contact?product=Tente%20Spider',
    reverse: true,
  },
  {
    n: '03',
    badge: 'Exclusif',
    label: 'Votre vision unique réalisée',
    title: 'Sur Mesure',
    specs: [
      { k: 'Design', v: '100% unique' },
      { k: 'Dimensions', v: 'Illimitées' },
      { k: 'Délai', v: '4-6 semaines' },
    ],
    features: [
      'Design 100% personnalisé',
      'Formes et tailles illimitées',
      'Maquette 3D photoréaliste',
      'Dimensions sur demande',
      'Conception suisse exclusive',
      'Support projet dédié',
    ],
    price: 'Sur devis personnalisé',
    href: '/Contact?product=Sur%20Mesure',
    reverse: false,
  },
];

export default function ModernProducts() {
  return (
    <div className="overflow-x-hidden bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="bg-paper pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">Catalogue · Fabrication Suisse</span>
          </Reveal>

          <h1 className="font-display text-ink font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,7vw,5.8rem)', lineHeight: 0.96, maxWidth: '15ch' }}>
            Nos produits{' '}
            <span className="serif-accent text-ink/45" style={{ fontWeight: 500 }}>gonflables professionnels</span>
          </h1>

          <Reveal as="p" delay={0.12} y={18} className="lead mt-7 max-w-xl">
            Solutions gonflables professionnelles • Fabrication Suisse
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
      <section className="bg-white border-t border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <SectionHeader kicker="Nos solutions" index="01" title={<>Trois structures.<br />Une exigence commune.</>} />
            <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
              Chaque produit en version <span className="text-ink font-medium">100% personnalisable</span>
            </Reveal>
          </div>

          <div className="space-y-20 md:space-y-28">
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
                        Demander un devis
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
      <section className="bg-ink text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                light
                kicker="Un conseil sur mesure"
                index="—"
                title={<>Besoin d&apos;aide<br /><span className="serif-accent text-white/55">pour choisir ?</span></>}
              />
            </div>
            <Reveal as="div" delay={0.12} className="lg:col-span-4 flex lg:justify-end">
              <Magnetic>
                <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                  Parler à un expert <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
