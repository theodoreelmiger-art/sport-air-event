import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const dimensions = [
  'Dimensions personnalisées selon vos besoins',
  'Design 100% sur mesure',
  'Maquette 3D incluse',
  'Délai : 6-8 semaines',
];

const included = [
  'Impression haute qualité de votre logo et design',
  'Modélisation 3D gratuite',
  'Design 3D gratuit',
  'Ventilateur électrique professionnel fourni',
  'Kit de fixation et sac de transport inclus',
  'Garantie 2 ans structure + 3 ans impression',
];

const reasons = [
  { title: 'Hauteur précise', desc: 'De 5 à 15m — idéale pour votre lieu' },
  { title: 'Branding total', desc: 'Logo XXL visible de loin' },
  { title: 'Impact garanti', desc: 'Première impression inoubliable' },
  { title: 'Flexibilité', desc: 'Designs uniques, formes courbes ou géométriques' },
];

const process = [
  { n: '01', title: 'Échange initial', desc: 'Parlez-nous de votre événement. Réponse rapide garantie.' },
  { n: '02', title: 'Conception 3D', desc: 'Visualisez votre arche avant fabrication (inclus)' },
  { n: '03', title: 'Fabrication', desc: 'Construction et impression haute définition (6-8 semaines)' },
  { n: '04', title: 'Installation clé en main', desc: 'Support technique, garantie, et assistance comprise' },
];

export default function ArchesSurMesure() {
  const [devisOpen, setDevisOpen] = useState(false);

  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="bg-paper pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
                <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Création exclusive</span>
              </Reveal>
              <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.4rem,6vw,4.6rem)', lineHeight: 0.98 }}>
                Arche Sur Mesure
              </h1>
              <Reveal as="p" delay={0.12} y={18} className="lead mt-6 max-w-md">
                Arches de 5 à 15 mètres de largeur. Votre vision, notre expertise.
                Conception et fabrication sur mesure pour vos événements{' '}
                <span className="serif-accent text-ink/70">d&apos;exception.</span>
              </Reveal>

              <Reveal as="div" delay={0.2} className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] bg-white">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
                <span className="text-[13px] font-semibold text-ink">Impression totale comprise</span>
              </Reveal>

              <Reveal as="div" delay={0.28} className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Magnetic>
                  <button
                    onClick={() => setDevisOpen(true)}
                    className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                  >
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </button>
                </Magnetic>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-[var(--muted)]">Prix HT</span>
                  <span className="font-display text-xl font-bold text-ink">Sur devis</span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={40} className="relative">
                <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-10 md:p-14" style={{ aspectRatio: '4 / 3' }}>
                  <span className="absolute top-5 left-6 font-display text-[5rem] md:text-[7rem] font-bold leading-none text-ink/[0.04] select-none">SM</span>
                  <img
                    src="images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png"
                    alt="Arche Sur Mesure Sport Air Event"
                    loading="eager"
                    className="relative max-h-[80%] object-contain"
                    style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 8px 0px 0px)' }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ DIMENSIONS + INCLUS ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                kicker="Dimensions personnalisées"
                index="01"
                title={<>De 5 à 15 mètres<br />de largeur</>}
                lead="Selon vos besoins. Chaque arche est conçue à la mesure exacte de votre lieu et de votre événement."
              />
              <RevealStagger className="mt-9 border-t border-[var(--line)]">
                {dimensions.map((d) => (
                  <motion.div variants={staggerChild} key={d} className="flex items-center gap-3 py-4 border-b border-[var(--line)]">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />
                    <span className="text-[15px] text-ink/80">{d}</span>
                  </motion.div>
                ))}
              </RevealStagger>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="rounded-[var(--radius-lg)] bg-paper border border-[var(--line)] hover:border-ink/15 transition-colors p-7 md:p-9">
                <h3 className="font-display text-lg md:text-xl font-bold text-ink">Inclus dans le prix de base</h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--blue)' }} />
                      <span className="text-sm text-ink/75 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ POURQUOI (dark) ░░ */}
      <section className="bg-deep text-white py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14 md:mb-16">
            <SectionHeader
              light
              kicker="Sur mesure"
              index="02"
              title={<>Pourquoi personnaliser<br /><span className="serif-accent text-white/55">votre arche ?</span></>}
            />
          </div>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {reasons.map((r, i) => (
              <motion.div variants={staggerChild} key={r.title} className="bg-deep p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <Check className="w-5 h-5 text-[#5aa2f0]" />
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <div className="font-display font-semibold text-[15px] mb-1.5">{r.title}</div>
                <div className="text-[13px] text-white/50 leading-relaxed">{r.desc}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ PROCESS ░░ */}
      <section className="bg-paper py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14 md:mb-16">
            <SectionHeader
              kicker="Notre méthode"
              index="03"
              title={<>De l&apos;idée<br />à la réalité</>}
              lead="Un accompagnement complet, de la première conversation à l'installation clé en main."
            />
          </div>

          <RevealStagger className="grid md:grid-cols-2 gap-5">
            {process.map((step) => (
              <motion.div
                variants={staggerChild}
                key={step.n}
                className="flex items-start gap-5 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors p-7"
              >
                <span className="font-display text-2xl font-bold tabular-nums leading-none" style={{ color: 'var(--blue)' }}>{step.n}</span>
                <div>
                  <h4 className="font-display font-semibold text-ink text-[17px]">{step.title}</h4>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mt-1.5">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="bg-white border-t border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <Reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight max-w-md">
                Un projet d&apos;exception ? Parlons-en.
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-sm text-[var(--muted)]">Prix HT</span>
                <span className="font-display text-xl font-bold text-ink">Sur devis</span>
              </div>
            </div>
            <Magnetic>
              <button
                onClick={() => setDevisOpen(true)}
                className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Arche Sur Mesure"
        groupLabel={null}
        lines={[]}
        extras={[]}
        total={null}
      />
    </div>
  );
}
