import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild, motion } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import DevisModal from '../components/DevisModal.jsx';
import { useT } from '../lib/i18n.jsx';

/* ░░ Per-product config — ONLY this block differs between the 3 sur-mesure pages ░░ */
const makeProduct = (t) => ({
  name: t('Arche Sur Mesure', 'Custom-Made Arch'),
  image: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png',
  intro: t(
    "Arches de 5 à 15 mètres de largeur. Votre vision, notre expertise — conception et fabrication sur mesure pour vos événements d'exception.",
    'Arches from 5 to 15 metres wide. Your vision, our expertise — bespoke design and manufacturing for your standout events.'
  ),
  width: { label: t('Largeur', 'Width'), range: t('De 5 à 15 m', 'From 5 to 15 m'), placeholder: t('ex. 8', 'e.g. 8') },
  height: { label: t('Hauteur', 'Height'), range: t('Selon la largeur', 'Depends on the width'), placeholder: t('ex. 5', 'e.g. 5') },
  delay: t('Délai : 6-8 semaines', 'Lead time: 6–8 weeks'),
});

/* Finishes / options the client can pick — rendered as CHECKBOX rows */
const makeOptions = (t) => [
  t('Impression totale 360°', 'Full 360° printing'),
  t('Forme courbe ou géométrique', 'Curved or geometric shape'),
  t('Maquette 3D de validation', '3D mock-up for sign-off'),
  t('Logo XXL visible de loin', 'Oversized logo, visible from afar'),
];

/* Short "Toujours inclus" advantages strip */
const makeIncluded = (t) => [
  t('Design 100% sur mesure', 'Fully bespoke design'),
  t('Modélisation & design 3D gratuits', 'Free 3D modelling & design'),
  t('Impression haute qualité de votre logo', 'High-quality printing of your logo'),
  t('Ventilateur électrique professionnel fourni', 'Professional electric blower supplied'),
  t('Kit de fixation & sac de transport inclus', 'Fixing kit & carry bag included'),
  t('Garantie 2 ans structure + 3 ans impression', '2-year structure warranty + 3-year print warranty'),
];

export default function ArchesSurMesure() {
  const t = useT();
  const PRODUCT = makeProduct(t);
  const OPTIONS = makeOptions(t);
  const INCLUDED = makeIncluded(t);
  const [devisOpen, setDevisOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggle = (opt) =>
    setSelected((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]));

  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ SLIM HERO (light) ░░ */}
      <section className="bg-paper pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
                <span className="kicker">{t('Création exclusive · Sur mesure', 'Exclusive creation · Custom-made')}</span>
              </Reveal>
              <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', lineHeight: 1.0 }}>
                {PRODUCT.name}
              </h1>
              <Reveal as="p" delay={0.1} y={16} className="lead mt-4 max-w-md">
                {PRODUCT.intro}
              </Reveal>
              <Reveal as="div" delay={0.18} className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white">
                <Check className="w-4 h-4" style={{ color: 'var(--blue)' }} />
                <span className="text-[13px] font-semibold text-ink">{t('Impression totale comprise', 'Full printing included')}</span>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={30}>
                <img
                  src={PRODUCT.image}
                  alt={PRODUCT.name}
                  loading="eager"
                  className="product-render w-full max-h-[340px] object-contain"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ VOS DIMENSIONS SUR MESURE ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <SectionHeader
            kicker={t('Configuration', 'Configuration')}
            title={t('Vos dimensions sur mesure', 'Your custom dimensions')}
            lead={t('Indiquez les dimensions exactes de votre structure — nous fabriquons à la mesure de votre espace.', 'Tell us the exact dimensions of your structure — we build it to fit your space precisely.')}
          />

          <Reveal className="mt-9 grid sm:grid-cols-3 gap-4">
            {[
              { ...PRODUCT.width },
              { ...PRODUCT.height },
              { label: t('Quantité', 'Quantity'), range: t('Nombre de structures', 'Number of structures'), placeholder: t('ex. 1', 'e.g. 1') },
            ].map((f) => (
              <div key={f.label} className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-5">
                <label className="kicker block mb-2" style={{ color: 'var(--muted)' }}>{f.label}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={f.placeholder}
                  className="w-full bg-white border border-[var(--line)] rounded-[var(--radius)] px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-[var(--blue)] transition-colors"
                />
                <p className="text-[12px] text-[var(--muted)] mt-2">{f.range}</p>
              </div>
            ))}
          </Reveal>

          {/* Options — CHECKBOX rows */}
          <div className="mt-8">
            <div className="kicker mb-3" style={{ color: 'var(--muted)' }}>{t('Finitions & options', 'Finishes & options')}</div>
            <RevealStagger className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white overflow-hidden">
              {OPTIONS.map((opt, i) => {
                const on = selected.includes(opt);
                return (
                  <motion.div
                    key={opt}
                    variants={staggerChild}
                    role="button"
                    tabIndex={0}
                    data-cursor
                    onClick={() => toggle(opt)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(opt); } }}
                    className={`cursor-pointer flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-paper ${i > 0 ? 'border-t border-[var(--line)]' : ''}`}
                  >
                    <span
                      className="flex items-center justify-center flex-shrink-0 rounded-md transition-colors"
                      style={{
                        width: 24, height: 24,
                        background: on ? 'var(--blue)' : '#fff',
                        border: on ? '1.5px solid var(--blue)' : '1.5px solid var(--line)',
                      }}
                    >
                      {on && <Check size={15} strokeWidth={3} color="#fff" />}
                    </span>
                    <span className="text-[15px] text-ink/85">{opt}</span>
                  </motion.div>
                );
              })}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ░░ TOUJOURS INCLUS ░░ */}
      <section className="bg-paper py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <SectionHeader
            kicker={t('Sans supplément', 'No extra charge')}
            title={t('Toujours inclus', 'Always included')}
            lead={t("Chaque création sur mesure comprend, de série, l'essentiel pour un résultat impeccable.", 'Every bespoke creation comes, as standard, with everything you need for a flawless result.')}
          />
          <RevealStagger className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INCLUDED.map((item) => (
              <motion.div
                variants={staggerChild}
                key={item}
                className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] px-5 py-4"
              >
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--blue)' }} />
                <span className="text-sm text-ink/80 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="bg-white border-t border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight max-w-md">
                {t('Un projet d’exception ? Parlons-en.', 'An exceptional project? Let’s talk.')}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-sm text-[var(--muted)]">{t('Prix HT', 'Price excl. VAT')}</span>
                <span className="font-display text-xl font-bold text-ink">{t('Sur devis', 'On quote')}</span>
              </div>
            </div>
            <Magnetic>
              <button
                type="button"
                onClick={() => setDevisOpen(true)}
                className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
              >
                {t('Demander un devis', 'Request a quote')} <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName={PRODUCT.name}
        groupLabel={null}
        lines={[]}
        extras={selected.map((label) => ({ label, qty: 1, unit: 0 }))}
        total={null}
      />
    </div>
  );
}
