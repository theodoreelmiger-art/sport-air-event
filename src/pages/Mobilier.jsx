import { Reveal } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

export default function Mobilier() {
  return (
    <main className="overflow-x-hidden bg-paper">
      {/* ░░ HERO (slim, no image, no configurator) ░░ */}
      <section className="bg-deep text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold tabular-nums text-white/40">—</span>
            <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="kicker" style={{ color: '#7db4f0' }}>Mobilier événementiel</span>
          </Reveal>
          <Reveal as="h1" className="font-display text-white font-bold tracking-tightest max-w-3xl" style={{ fontSize: 'clamp(2.4rem,6vw,4.6rem)', lineHeight: 0.98 }}>
            Mobilier Gonflable{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>sur mesure</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="lead mt-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Complétez vos structures avec notre mobilier personnalisé.
          </Reveal>
          <Reveal as="div" delay={0.16} className="mt-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7db4f0' }} />
            <span className="text-[13px] font-medium text-white/85">Impression totale comprise</span>
          </Reveal>
        </div>
      </section>

      {/* ░░ CONFIGURATEUR (shared component — sticky image, qty steppers on selected only) ░░ */}
      <ProductConfigurator data={CONFIGURATORS.mobilier} />
    </main>
  );
}
