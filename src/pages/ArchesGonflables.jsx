import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Layers, Ruler, MoveVertical, Sparkles, Timer, Wind, Plug, ShieldCheck,
  Flag, Bike, DoorOpen, Store,
} from 'lucide-react';
import { Reveal, Rise, MaskHeading, Magnetic, RevealStagger, staggerChild } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';
import { useT } from '../lib/i18n.jsx';

// Each spec keeps its real label (k) + full real value (v). `note` is an optional
// short sub-line drawn only from the original copy — no new facts.
const makeSpecs = (t) => [
  { k: t('Matériau', 'Material'), v: t('Oxford 600D haute résistance + soudure thermique', 'Heavy-duty 600D Oxford + thermal welding'), icon: Layers },
  { k: t('Largeurs disponibles', 'Available widths'), v: '5m – 6m – 7m – 8m – 10m', icon: Ruler },
  { k: t('Hauteur', 'Height'), v: t('3m à 5m selon largeur', '3m to 5m depending on width'), icon: MoveVertical },
  { k: t('Impression', 'Printing'), v: t('Sublimation HD 360° UV résistant', '360° HD sublimation, UV-resistant'), icon: Sparkles },
  { k: t('Temps de gonflage', 'Inflation time'), v: t('10-15 minutes', '10–15 minutes'), icon: Timer },
  { k: t('Résistance au vent', 'Wind resistance'), v: t("Jusqu'à 60 km/h avec haubans", 'Up to 60 km/h with guy ropes'), icon: Wind },
  { k: t('Alimentation ventilateur', 'Blower power supply'), v: t('220V inclus', '220V included'), icon: Plug },
  { k: t('Garantie', 'Warranty'), v: t('2 ans structure + 3 ans impression', '2-year structure + 3-year print'), icon: ShieldCheck },
];

const makeUseCases = (t) => [
  { n: '01', title: t('Courses & marathons', 'Races & marathons'), desc: t("Lignes de départ et d'arrivée spectaculaires", 'Striking start and finish lines'), icon: Flag },
  { n: '02', title: t('Sports cyclistes', 'Cycling events'), desc: t('Étapes de course, cols, critériums', 'Race stages, mountain passes, criteriums'), icon: Bike },
  { n: '03', title: t("Entrées d'événements", 'Event entrances'), desc: t('Portiques, accueil, signalétique', 'Gateways, welcome areas, signage'), icon: DoorOpen },
  { n: '04', title: t('Animations commerciales', 'Retail activations'), desc: t('Ouvertures de magasins, promotions', 'Store openings, promotions'), icon: Store },
];

export default function ArchesGonflables() {
  const t = useT();
  const specs = makeSpecs(t);
  const useCases = makeUseCases(t);
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ SLIM HERO ░░ */}
      <section className="pt-28 md:pt-36 pb-6 md:pb-10">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">{t('Arches Gonflables · Sur mesure', 'Inflatable Arches · Custom-made')}</span>
          </Reveal>

          <Reveal>
            <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', lineHeight: 1.0 }}>
              {t('Arches Gonflables', 'Inflatable Arches')}
            </h1>
            <p className="lead mt-4 max-w-md">
              {t('Lignes de départ/arrivée et événements sportifs', 'Start/finish lines and sporting events')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
              <span className="text-[13px] font-semibold text-ink">{t('Impression totale comprise', 'Full printing included')}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ░░ CONFIGURATOR (shared) ░░ */}
      <ProductConfigurator data={CONFIGURATORS.arches} />

      {/* ░░ SPECS — compact spec-card grid (label + valeur en évidence) ░░ */}
      <section className="bg-white border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-9 md:mb-12">
            <div className="max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">{t('Fiche technique', 'Spec sheet')}</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text={t('Caractéristiques', 'Technical')} />
                <br />
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text={t('techniques', 'specifications')} delay={0.12} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead max-w-sm lg:text-right">
              {t('Chaque arche est fabriquée avec des matériaux haute résistance, pensés pour durer saison après saison.', 'Every arch is built from heavy-duty materials, engineered to last season after season.')}
            </Rise>
          </div>

          {/* Compact spec cards — icône + label, valeur en évidence */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3.5">
            {specs.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  variants={staggerChild}
                  key={s.k}
                  className="arch-spec-card flex flex-col rounded-2xl border border-[var(--line)] bg-white p-4 md:p-5 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span
                      className="inline-flex items-center justify-center shrink-0 bg-[var(--blue-soft)] text-[var(--blue)]"
                      style={{ width: 32, height: 32, borderRadius: 10 }}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2.4} />
                    </span>
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.1em] leading-tight text-[var(--blue-deep)]">
                      {s.k}
                    </span>
                  </div>
                  <div className="font-display font-bold tracking-tightest text-ink leading-[1.1] text-[clamp(1.05rem,1.8vw,1.35rem)]">
                    {s.v}
                  </div>
                </motion.div>
              );
            })}
          </RevealStagger>
          <style>{`.arch-spec-card:hover{border-color:rgba(0,102,204,0.2);background:var(--blue-mist);}`}</style>
        </div>
      </section>

      {/* ░░ PARFAITE POUR — V73 editorial filet rows (non-interactive) ░░ */}
      <section className="bg-[var(--blue-mist)] border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
            <div className="max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">03</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">{t("Cas d'usage", 'Use cases')}</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text={t('Parfaite', 'Perfect')} />
                <br />
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text={t('pour', 'for')} delay={0.1} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead max-w-sm md:text-right">
              {t("Là où l'impact visuel fait la différence, l'arche marque l'entrée et le passage.", 'Wherever visual impact matters most, the arch frames the entrance and marks the passage.')}
            </Rise>
          </div>

          {/* Editorial filet rows — ghost number, icon chip, title + desc */}
          <Reveal>
            <div className="rounded-[24px] overflow-hidden bg-white border border-[var(--line)]">
              <div className="border-t border-[var(--line)] -mt-px">
                {useCases.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.n}
                      className="uc-row relative flex items-center gap-4 overflow-hidden border-b border-[var(--line)] bg-white last:border-b-0 transition-colors duration-200"
                      style={{ padding: '20px 18px 20px 22px' }}
                    >
                      <span
                        className="flex items-center justify-center shrink-0 bg-[var(--blue-soft)] text-[var(--blue)]"
                        style={{ width: 46, height: 46, borderRadius: 13 }}
                      >
                        <Icon className="w-[22px] h-[22px]" strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display font-bold text-ink tracking-tight leading-[1.15] text-[clamp(1.1rem,2vw,1.45rem)]">
                          {c.title}
                        </span>
                        <span className="block text-[15px] leading-relaxed text-[var(--muted)] mt-1">
                          {c.desc}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <style>{`.uc-row:hover{background:var(--blue-mist);}`}</style>

          <Reveal className="mt-16 pt-12 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-display text-xl md:text-2xl font-semibold text-ink max-w-md tracking-tight">
              {t('Un projet sur mesure ? Parlons-en.', 'A custom project in mind? Let’s talk.')}
            </p>
            <Magnetic>
              <Link
                to="/Contact?product=Arche%20Gonflable"
                className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
              >
                {t('Demander un devis', 'Request a quote')} <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
