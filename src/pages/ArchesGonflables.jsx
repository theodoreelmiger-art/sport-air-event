import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Layers, Ruler, MoveVertical, Sparkles, Timer, Wind, Plug, ShieldCheck,
  Flag, Bike, DoorOpen, Store,
} from 'lucide-react';
import { Reveal, Rise, MaskHeading, Magnetic } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

// Each spec keeps its real label (k) + full real value (v). `big`/`tail` are a
// compact headline distilled from the real value for the V71 detail panel, and
// `badges` are short tags derived from that same real value — no new facts.
const specs = [
  { k: 'Matériau', v: 'Oxford 600D haute résistance + soudure thermique', icon: Layers, big: 'Oxford 600D', tail: '+ soudure', badges: ['Oxford 600D', 'Soudure thermique', 'Haute résistance'] },
  { k: 'Largeurs disponibles', v: '5m – 6m – 7m – 8m – 10m', icon: Ruler, big: '5 – 10', tail: 'm', badges: ['5m', '6m', '7m', '8m', '10m'] },
  { k: 'Hauteur', v: '3m à 5m selon largeur', icon: MoveVertical, big: '3 – 5', tail: 'm', badges: ['3m à 5m', 'Selon largeur'] },
  { k: 'Impression', v: 'Sublimation HD 360° UV résistant', icon: Sparkles, big: 'HD 360°', tail: 'UV', badges: ['Sublimation', '360°', 'Anti-UV'] },
  { k: 'Temps de gonflage', v: '10-15 minutes', icon: Timer, big: '10-15', tail: 'min', badges: ['10-15 min'] },
  { k: 'Résistance au vent', v: "Jusqu'à 60 km/h avec haubans", icon: Wind, big: '60', tail: 'km/h', badges: ['60 km/h', 'Avec haubans'] },
  { k: 'Alimentation ventilateur', v: '220V inclus', icon: Plug, big: '220', tail: 'V', badges: ['220V', 'Inclus'] },
  { k: 'Garantie', v: '2 ans structure + 3 ans impression', icon: ShieldCheck, big: '2 + 3', tail: 'ans', badges: ['2 ans structure', '3 ans impression'] },
];

const useCases = [
  { n: '01', title: 'Courses & marathons', desc: "Lignes de départ et d'arrivée spectaculaires", icon: Flag },
  { n: '02', title: 'Sports cyclistes', desc: 'Étapes de course, cols, critériums', icon: Bike },
  { n: '03', title: "Entrées d'événements", desc: 'Portiques, accueil, signalétique', icon: DoorOpen },
  { n: '04', title: 'Animations commerciales', desc: 'Ouvertures de magasins, promotions', icon: Store },
];

export default function ArchesGonflables() {
  // V71 — split list: left rail of selectable labels, right synced detail panel.
  const [active, setActive] = useState(0);
  const current = specs[active];
  const CurrentIcon = current.icon;

  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ SLIM HERO ░░ */}
      <section className="pt-28 md:pt-36 pb-6 md:pb-10">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
            <span className="kicker">Arches Gonflables · Sur mesure</span>
          </Reveal>

          <Reveal>
            <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', lineHeight: 1.0 }}>
              Arches Gonflables
            </h1>
            <p className="lead mt-4 max-w-md">
              Lignes de départ/arrivée et événements sportifs
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
              <span className="text-[13px] font-semibold text-ink">Impression totale comprise</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ░░ CONFIGURATOR (shared) ░░ */}
      <ProductConfigurator data={CONFIGURATORS.arches} />

      {/* ░░ SPECS — V71 split list (rail + synced detail) ░░ */}
      <section className="bg-white border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Fiche technique</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text="Caractéristiques" />
                <br />
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text="techniques" delay={0.12} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead max-w-sm lg:text-right">
              Chaque arche est fabriquée avec des matériaux haute résistance, pensés pour durer saison après saison.
            </Rise>
          </div>

          {/* Split list — left rail + right detail panel */}
          <Reveal>
            <div className="grid gap-3 md:gap-4 grid-cols-1 lg:[grid-template-columns:minmax(220px,0.85fr)_1.15fr]">
              {/* Left rail — selectable label list */}
              <div
                className="overflow-hidden self-start bg-white rounded-[18px] border border-[var(--line)]"
              >
                {specs.map((s, i) => {
                  const on = i === active;
                  const RIcon = s.icon;
                  return (
                    <button
                      key={s.k}
                      type="button"
                      data-cursor
                      onClick={() => setActive(i)}
                      className="cursor-pointer w-full flex items-center gap-2.5 text-left relative transition-colors duration-200"
                      style={{
                        padding: '13px 14px',
                        borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                        background: on ? 'var(--blue-mist)' : 'transparent',
                      }}
                    >
                      {on && (
                        <motion.span
                          layoutId="arches-spec-rail"
                          className="absolute left-0 rounded-full"
                          style={{ top: 7, bottom: 7, width: 3, background: 'var(--blue)' }}
                        />
                      )}
                      <span
                        className="inline-flex items-center justify-center shrink-0 transition-colors duration-200"
                        style={{
                          width: 30, height: 30, borderRadius: 9,
                          background: on ? 'var(--blue)' : 'var(--blue-soft)',
                          color: on ? '#fff' : 'var(--blue)',
                        }}
                      >
                        <RIcon className="w-4 h-4" strokeWidth={2.4} />
                      </span>
                      <span
                        className="text-[0.82rem] leading-tight transition-colors duration-200"
                        style={{
                          fontWeight: on ? 700 : 600,
                          color: on ? 'var(--blue-deep)' : 'var(--ink-2)',
                        }}
                      >
                        {s.k}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right — big detail panel for the active spec */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.26 }}
                  className="rounded-[18px] border border-[var(--line)] bg-[var(--blue-mist)] p-6 md:p-8"
                >
                  <span
                    className="inline-flex items-center justify-center mb-4 bg-white border border-[var(--line)] text-[var(--blue)]"
                    style={{ width: 48, height: 48, borderRadius: 14 }}
                  >
                    <CurrentIcon className="w-6 h-6" strokeWidth={2.2} />
                  </span>

                  <div className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[var(--blue-deep)]">
                    {current.k}
                  </div>

                  <div
                    className="font-display flex items-end gap-2 flex-wrap mt-1.5"
                    style={{ lineHeight: 0.95 }}
                  >
                    <span className="text-ink tracking-tightest" style={{ fontSize: 'clamp(1.9rem, 5vw, 2.9rem)' }}>
                      {current.big}
                    </span>
                    <span className="text-[var(--blue)]" style={{ fontSize: 'clamp(1rem, 2.4vw, 1.45rem)', paddingBottom: 6 }}>
                      {current.tail}
                    </span>
                  </div>

                  <div className="mt-2.5 text-[0.95rem] leading-relaxed text-[var(--ink-2)] max-w-md">
                    {current.v}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {current.badges.map((b, bi) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1.5 border border-[var(--line)] bg-white rounded-full text-[var(--ink-2)] font-bold"
                        style={{ padding: '5px 11px', fontSize: '0.74rem' }}
                      >
                        {bi === 0 && <CurrentIcon className="w-3 h-3 text-[var(--blue)]" strokeWidth={2.6} />}
                        {b}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ░░ PARFAITE POUR — V73 editorial filet rows (non-interactive) ░░ */}
      <section className="bg-[var(--blue-mist)] border-t border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
            <div className="max-w-2xl">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold tabular-nums text-ink/30">03</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Cas d'usage</span>
              </Reveal>
              <h2 className="font-display font-bold text-ink tracking-tightest leading-[1.02] text-[clamp(1.9rem,4.4vw,3.4rem)]">
                <MaskHeading text="Parfaite" />
                <br />
                <span className="serif-accent text-[var(--blue)]"><MaskHeading text="pour" delay={0.1} /></span>
              </h2>
            </div>
            <Rise as="p" y={28} delay={0.1} className="lead max-w-sm md:text-right">
              Là où l'impact visuel fait la différence, l'arche marque l'entrée et le passage.
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
                        className="font-display shrink-0 tabular-nums select-none"
                        style={{ fontSize: '1.4rem', fontWeight: 800, width: 40, color: '#c2d2ea' }}
                      >
                        {c.n}
                      </span>
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
              Un projet sur mesure ? Parlons-en.
            </p>
            <Magnetic>
              <Link
                to="/Contact?product=Arche%20Gonflable"
                className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
