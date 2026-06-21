import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

const SPECS = [
  ['Matériau', 'PVC 650g/m² haute résistance'],
  ['Hauteurs disponibles', '2.5m – 3m – 4m'],
  ['Impression', 'Sublimation HD 360° UV résistant'],
  ['Éclairage', 'LED RGB intégré (option)'],
  ['Temps de montage', '3-5 minutes par colonne'],
  ['Base de lestage', 'Base lestée incluse'],
  ['Usage', 'Intérieur et extérieur'],
  ['Garantie', '2 ans structure + 3 ans impression'],
];

const USAGES = [
  { n: '01', title: 'Balisage sportif', desc: 'Circuits, parcours, zones de balisage' },
  { n: '02', title: 'Entrées & allées', desc: "Créer des couloirs d'honneur visuels" },
  { n: '03', title: 'Salons & expo', desc: 'Signalétique de stand, délimitation' },
  { n: '04', title: 'Soirées & événements', desc: 'Décoration lumineuse, ambiance unique' },
];

export default function ColonnesGonflables() {
  return (
    <div className="overflow-x-hidden bg-paper">
      <main>
        {/* ░░ HERO (slim) ░░ */}
        <section className="pt-28 md:pt-32 bg-paper">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-8 md:py-12">
            <Reveal>
              <div className="kicker mb-4">Configurez votre produit</div>
              <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.1rem,4.6vw,3.4rem)', lineHeight: 1.0 }}>
                Colonnes Gonflables
              </h1>
              <p className="lead mt-4">Balisage élégant pour vos événements</p>
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-white">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
                <span className="text-[13px] font-semibold text-ink">Impression totale comprise</span>
              </div>
            </Reveal>
          </div>

          {/* ░░ CONFIGURATEUR (shared, sticky image + per-option steppers) ░░ */}
          <ProductConfigurator data={CONFIGURATORS.colonnes} />
        </section>

        {/* ░░ SPECS (dark) ░░ */}
        <section className="bg-deep text-white">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
            <SectionHeader
              light
              kicker="Fiche technique"
              index="01"
              title={<>Caractéristiques<br /><span className="serif-accent text-white/55">techniques</span></>}
              className="mb-14"
            />
            <Reveal className="border-t border-white/10">
              <table className="w-full text-sm">
                <tbody>
                  {SPECS.map(([label, value]) => (
                    <tr key={label} className="border-b border-white/10">
                      <td className="py-4 pr-4 font-display font-semibold text-white w-1/2 align-top">{label}</td>
                      <td className="py-4 text-white/55 align-top">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* ░░ USAGES ░░ */}
        <section className="bg-paper">
          <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <SectionHeader
                kicker="Cas d'usage"
                index="02"
                title={<>Parfaites pour<br />vos événements</>}
              />
              <Reveal as="div" delay={0.1} className="md:pb-2">
                <Magnetic>
                  <Link
                    to="/Contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-ink/15 hover:border-[var(--blue)] hover:text-[var(--blue)] pb-1 transition-colors"
                  >
                    Demander un devis <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USAGES.map((u) => (
                <motion.div
                  key={u.n}
                  variants={staggerChild}
                  className="group flex items-start justify-between gap-4 p-6 md:p-7 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors"
                >
                  <div>
                    <div className="font-display text-lg font-semibold text-ink mb-1.5">{u.title}</div>
                    <div className="text-sm text-[var(--muted)]">{u.desc}</div>
                  </div>
                  <span className="font-display text-2xl font-bold text-ink/15 tabular-nums select-none">{u.n}</span>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </section>
      </main>

      <motion.a
        href="https://wa.me/41774835190"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-deep rounded-full shadow-[0_12px_30px_rgba(11,13,18,0.28)] flex items-center justify-center text-white"
        tabIndex={0}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
