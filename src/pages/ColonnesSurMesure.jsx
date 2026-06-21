import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const included = [
  'Impression haute qualité de votre logo et design',
  'Modélisation 3D gratuite',
  'Option éclairage LED RGB intégré',
  'Ventilateur électrique silencieux fourni',
  'Base lestée pour stabilité maximale',
  'Sac de transport professionnel',
  'Garantie 2 ans structure + 3 ans impression',
];

const whyCustom = [
  { title: 'Hauteur précise', desc: 'De 2 à 5m — idéale pour votre événement' },
  { title: 'Branding total', desc: 'Logo visible de tous les côtés' },
  { title: 'Éclairage LED', desc: 'RGB programmable pour impact maximal' },
  { title: 'Fluidité', desc: 'Formes cylindriques, coniques ou géométriques' },
];

const steps = [
  { title: 'Échange initial', desc: 'Parlez-nous de votre événement. Réponse rapide garantie.' },
  { title: 'Conception 3D', desc: 'Visualisez votre colonne avant fabrication (inclus)' },
  { title: 'Fabrication', desc: 'Construction et impression haute définition (6-8 semaines)' },
  { title: 'Installation clé en main', desc: 'Support technique, garantie, et assistance comprise' },
];

const dimensions = [
  'Dimensions et formes personnalisées selon vos besoins',
  'Design 100% sur mesure',
  'Maquette 3D incluse',
  'Délai : 6-8 semaines',
];

export default function ColonnesSurMesure() {
  const [devisOpen, setDevisOpen] = useState(false);

  return (
    <div className="overflow-x-hidden bg-paper">
      {/* ░░ HERO — editorial split ░░ */}
      <section className="bg-ink text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
                <span className="h-px w-10 bg-white/40" />
                <span className="kicker" style={{ color: '#7db4f0' }}>Création exclusive</span>
              </Reveal>

              <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,6.5vw,5rem)', lineHeight: 0.96 }}>
                Colonne{' '}
                <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>Sur&nbsp;Mesure</span>
              </h1>

              <Reveal as="p" delay={0.12} className="lead mt-7 max-w-md" style={{ color: 'rgba(255,255,255,0.78)' }}>
                Colonnes de 2 à 5 mètres de hauteur. Votre vision, notre expertise. Conception et fabrication sur mesure pour vos événements d&apos;exception.
              </Reveal>

              <Reveal as="div" delay={0.22} className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#5aa2f0' }} />
                <span className="text-[13px] font-medium text-white/80">Impression totale comprise</span>
              </Reveal>

              <Reveal as="div" delay={0.3} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => setDevisOpen(true)}
                    className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                  >
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </button>
                </Magnetic>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/50 text-sm">Prix HT</span>
                  <span className="font-display text-xl font-bold text-white">Sur devis</span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={40} className="relative">
                <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-white flex items-center justify-center p-8 md:p-12" style={{ aspectRatio: '4 / 5' }}>
                  <span className="absolute top-5 left-6 font-display text-[5rem] md:text-[7rem] font-bold leading-none text-ink/[0.05] select-none">SM</span>
                  <img
                    src="images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png"
                    alt="Colonne Sur Mesure Sport Air Event"
                    className="relative max-h-[80%] w-auto object-contain"
                    style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 6px 0px 0px)' }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ DIMENSIONS + INCLUS ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Dimensions */}
          <div className="lg:col-span-5">
            <SectionHeader
              kicker="Configuration"
              index="01"
              title={<>Dimensions<br />personnalisées</>}
              lead="De 2 à 5 mètres de hauteur selon vos besoins."
            />
            <RevealStagger className="mt-9 border-t border-[var(--line)]">
              {dimensions.map((d, i) => (
                <motion.div
                  key={d}
                  variants={staggerChild}
                  className="flex items-center gap-4 py-4 border-b border-[var(--line)]"
                >
                  <span className="text-xs font-semibold tabular-nums text-ink/30">0{i + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />
                  <span className="text-[15px] text-ink/80">{d}</span>
                </motion.div>
              ))}
            </RevealStagger>
          </div>

          {/* Inclus dans le prix de base */}
          <div className="lg:col-span-7">
            <Reveal className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] p-7 md:p-10">
              <div className="kicker mb-5">Sans supplément</div>
              <h3 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(1.5rem,2.4vw,2rem)', lineHeight: 1.05 }}>
                Inclus dans le prix de base
              </h3>
              <RevealStagger className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-1">
                {included.map((item) => (
                  <motion.div
                    key={item}
                    variants={staggerChild}
                    className="flex items-start gap-3 py-3 border-b border-[var(--line)]"
                  >
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }} />
                    <span className="text-sm text-ink/75 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </RevealStagger>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ POURQUOI PERSONNALISER (dark) ░░ */}
      <section className="bg-ink text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
          <SectionHeader
            light
            kicker="Sur mesure"
            index="02"
            title={<>Pourquoi personnaliser<br /><span className="serif-accent text-white/55">votre colonne ?</span></>}
          />
          <RevealStagger className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {whyCustom.map((f, i) => (
              <motion.div variants={staggerChild} key={f.title} className="bg-ink p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <Check className="w-5 h-5" style={{ color: '#5aa2f0' }} />
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <div className="font-display font-semibold text-[15px] mb-1.5">{f.title}</div>
                <div className="text-[13px] text-white/50 leading-relaxed">{f.desc}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ DE L'IDÉE À LA RÉALITÉ ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <SectionHeader
            kicker="Notre process"
            index="03"
            title={<>De l&apos;idée<br />à la réalité</>}
            lead="Un accompagnement complet, de la première discussion à l'installation."
          />
          <RevealStagger className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
            {steps.map((s, i) => (
              <motion.div variants={staggerChild} key={s.title} className="bg-white p-7 md:p-8 min-h-[180px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-3xl font-bold text-ink/15 tabular-nums">{i + 1}</span>
                  {i < steps.length - 1 && <span className="h-px w-8" style={{ background: 'var(--blue)' }} />}
                </div>
                <div className="font-display font-semibold text-ink text-[16px] mb-2">{s.title}</div>
                <div className="text-[13px] text-[var(--muted)] leading-relaxed">{s.desc}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="px-5 sm:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-content mx-auto">
          <Reveal className="rounded-[var(--radius-lg)] bg-paper-2 border border-[var(--line)] p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="kicker mb-4">Prêt à démarrer</div>
              <h2 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', lineHeight: 1.02 }}>
                Donnons vie à votre colonne.
              </h2>
              <p className="lead mt-5 max-w-md">
                Votre vision, notre expertise. Conception et fabrication sur mesure pour vos événements d&apos;exception.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4 flex-shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[var(--muted)]">Prix HT</span>
                <span className="font-display text-2xl font-bold" style={{ color: 'var(--blue)' }}>Sur devis</span>
              </div>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => setDevisOpen(true)}
                  className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                >
                  Demander un devis <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Colonne Sur Mesure"
        groupLabel={null}
        lines={[]}
        extras={[]}
        total={null}
      />
    </div>
  );
}
