import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild, motion } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';

const highlights = [
  'Design 100% personnalisé',
  'Maquette 3D incluse',
  'Conception suisse',
  'Délai : 8-12 semaines',
];

const reasons = [
  { title: 'Dimensions exactes', desc: 'De 6 à 20m — adaptée à votre espace unique' },
  { title: 'Design 100% personnel', desc: 'Votre vision devient réalité sans compromis' },
  { title: 'Impression totale 360°', desc: 'Logo, couleurs, design sur tous les panneaux' },
  { title: 'Formes spéciales', desc: 'Dôme, géodésique, polygone — possibilités infinies' },
];

const steps = [
  { n: '01', title: 'Consultation', desc: 'Présentez votre projet et vos besoins. Réponse sous 24h.' },
  { n: '02', title: 'Design & Maquette 3D', desc: 'Nous créons votre vision en 3D (2-3 semaines)' },
  { n: '03', title: 'Fabrication', desc: 'Construction et impression (6-10 semaines)' },
  { n: '04', title: 'Livraison & Support', desc: 'Installation, garantie, et support technique inclus' },
];

const ProductImage = () => (
  <div className="relative rounded-[var(--radius-lg)] overflow-hidden bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center p-10 md:p-14" style={{ aspectRatio: '4 / 3' }}>
    <span className="absolute top-5 left-6 font-display text-[5rem] md:text-[7rem] font-bold leading-none text-ink/[0.04] select-none">SM</span>
    <img
      src="images/22_4887239cb_ChatGPTImage16janv202616_52_44.png"
      alt="Tente Sur Mesure Sport Air Event"
      loading="lazy"
      className="relative max-h-[78%] object-contain"
      style={{ mixBlendMode: 'multiply' }}
    />
  </div>
);

export default function TenteSurMesure() {
  const [devisOpen, setDevisOpen] = useState(false);

  return (
    <div className="overflow-x-hidden bg-paper pt-24 md:pt-28">
      <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ░░ Sticky product image (desktop) ░░ */}
          <div className="hidden lg:flex lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)] items-center">
            <Reveal className="w-full">
              <ProductImage />
            </Reveal>
          </div>

          {/* ░░ Editorial content column ░░ */}
          <div className="py-12 md:py-16 space-y-16 md:space-y-20 pb-28">
            {/* Intro */}
            <header>
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Création exclusive</span>
              </Reveal>

              <Reveal as="h1" y={26} delay={0.05} className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.4rem,5.2vw,4rem)', lineHeight: 0.98 }}>
                Tente Sur Mesure
              </Reveal>

              <Reveal as="p" y={20} delay={0.12} className="lead mt-6 max-w-md">
                Tentes de 6 à 20 mètres de diamètre. <span className="serif-accent text-ink/60">Votre vision, notre expertise.</span> Conception et fabrication sur mesure.
              </Reveal>

              <Reveal as="div" delay={0.18} className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--line)]">
                <Check className="w-4 h-4 text-[var(--blue)]" />
                <span className="text-sm font-semibold text-ink">Impression totale comprise</span>
              </Reveal>

              {/* Mobile image */}
              <Reveal className="lg:hidden mt-10">
                <ProductImage />
              </Reveal>
            </header>

            {/* Dimensions personnalisées */}
            <section>
              <SectionHeader
                kicker="Spécifications"
                index="02"
                title="Dimensions personnalisées"
                lead="De 6 à 20 mètres de diamètre selon vos besoins"
              />
              <RevealStagger className="mt-8 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] overflow-hidden">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    variants={staggerChild}
                    className={`flex items-center gap-4 px-6 py-5 ${i > 0 ? 'border-t border-[var(--line)]' : ''}`}
                  >
                    <span className="text-xs font-semibold tabular-nums text-ink/30 w-6">0{i + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />
                    <span className="text-[15px] text-ink/80">{h}</span>
                  </motion.div>
                ))}
              </RevealStagger>
            </section>

            {/* Pourquoi — dark premium section */}
            <section className="relative -mx-5 sm:-mx-8 lg:mx-0">
              <div className="bg-ink text-white rounded-[var(--radius-lg)] px-6 sm:px-8 md:px-10 py-12 md:py-14">
                <SectionHeader
                  light
                  kicker="Le choix sur mesure"
                  index="03"
                  title={<>Pourquoi choisir<br /><span className="serif-accent text-white/55">la version Sur Mesure ?</span></>}
                />
                <RevealStagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
                  {reasons.map((r, i) => (
                    <motion.div variants={staggerChild} key={r.title} className="bg-ink p-6 md:p-7">
                      <div className="flex items-center justify-between mb-6">
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

            {/* Processus et délais */}
            <section>
              <SectionHeader
                kicker="Étape par étape"
                index="04"
                title="Processus et délais"
              />
              <div className="mt-8 border-t border-[var(--line)]">
                {steps.map((s, i) => (
                  <Reveal key={s.n} y={24} delay={i * 0.04} className="flex gap-6 py-6 border-b border-[var(--line)]">
                    <span className="font-display text-2xl md:text-3xl font-bold text-ink/15 leading-none w-12 flex-shrink-0 tabular-nums">{s.n}</span>
                    <div className="pt-0.5">
                      <h4 className="font-display font-semibold text-ink text-[17px]">{s.title}</h4>
                      <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Price + CTA */}
            <Reveal className="sticky bottom-4">
              <div className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors p-6 md:p-8 shadow-[0_8px_30px_rgba(11,13,18,0.06)]">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex-1">
                    <div className="kicker mb-1.5" style={{ color: 'var(--muted)' }}>Prix HT</div>
                    <div className="font-display text-3xl md:text-4xl font-bold text-ink">Sur devis</div>
                  </div>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => setDevisOpen(true)}
                      className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Tente Sur Mesure"
        groupLabel={null}
        lines={[]}
        extras={[]}
        total={null}
      />
    </div>
  );
}
