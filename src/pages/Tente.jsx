import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, MessageCircle,
  Layers, Gauge, Wind, Timer, Sparkles, Flame, ShieldCheck, Feather, Droplet,
  Trophy, Briefcase, Music, Store,
} from 'lucide-react';
import { Reveal, Rise, MaskHeading, Magnetic } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

// Spec data — icon + label + prominent value. `big`/`tail` drive the large headline,
// `badges` the pill row in the detail panel. `badgeIcon` leads the first badge.
const SPECS = [
  { icon: Flame, label: 'Résistance au vent', value: "Jusqu'à 70 km/h", note: 'Structure haute pression stabilisée', big: '70', tail: 'km/h', badgeIcon: Wind, badges: ['70 km/h', 'Lestage inclus'] },
  { icon: Layers, label: 'Matériau', value: 'Oxford 600D + TPU', note: 'Haute résistance', big: 'Oxford 600D', tail: '+ TPU', badgeIcon: Droplet, badges: ['Oxford 600D', 'TPU', 'Haute résistance'] },
  { icon: Gauge, label: 'Pression de gonflage', value: 'Haute pression 0.35 bar', big: '0.35', tail: 'bar', badgeIcon: Gauge, badges: ['0.35 bar', 'Haute pression'] },
  { icon: Timer, label: 'Temps de gonflage', value: '60–90 secondes', big: '60–90', tail: 'sec', badgeIcon: Timer, badges: ['60–90 s', '1 personne'] },
  { icon: Sparkles, label: 'Impression', value: 'Sublimation HD 360°', note: 'Résistante aux UV', big: 'HD 360°', tail: 'UV', badgeIcon: Sparkles, badges: ['Sublimation', '360°', 'Anti-UV'] },
  { icon: ShieldCheck, label: 'Certification', value: 'Anti-feu M2, Anti-UV', big: 'M2', tail: 'anti-feu', badgeIcon: Flame, badges: ['M2', 'Anti-feu', 'Anti-UV'] },
  { icon: Wind, label: 'Garantie', value: '5 ans structure + impression', big: '5', tail: 'ans', badgeIcon: ShieldCheck, badges: ['5 ans', 'Structure', 'Impression'] },
  { icon: Feather, label: 'Poids (4×4m)', value: '~12 kg', big: '~12', tail: 'kg', badgeIcon: Feather, badges: ['~12 kg', '4×4m'] },
];

const USAGES = [
  { tag: '01', icon: Trophy, title: 'Événements sportifs', desc: 'Marathons, trails, salons sport, zones VIP' },
  { tag: '02', icon: Briefcase, title: 'Salons professionnels', desc: 'Stands B2B, expositions, conventions' },
  { tag: '03', icon: Music, title: 'Festivals & concerts', desc: 'Zones presse, accueil VIP, backstage' },
  { tag: '04', icon: Store, title: 'Points de vente', desc: 'Pop-up stores, démonstrations, promotions' },
];

// Shared blue palette — white & blue only, no black.
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#0b1c3f';
const INK_2 = '#2c3e63';
const MUTE = '#5b6f8e';

/* ░░ SPECS — V71 "Liste scindée" : rail de labels à gauche, grand panneau valeur + badges à droite ░░ */
function SpecsSplit() {
  const [active, setActive] = useState(0);
  const s = SPECS[active];
  const Icon = s.icon;
  const BadgeIcon = s.badgeIcon;

  return (
    <div style={{ color: INK }}>
      <div
        className="grid gap-2.5 md:gap-3"
        style={{ gridTemplateColumns: 'minmax(150px, 0.85fr) 1.15fr' }}
      >
        {/* Left rail — selectable label list */}
        <div
          style={{
            border: `1px solid ${LINE}`,
            borderRadius: 18,
            overflow: 'hidden',
            background: '#ffffff',
            alignSelf: 'start',
          }}
        >
          {SPECS.map((sp, i) => {
            const on = i === active;
            const RIcon = sp.icon;
            return (
              <button
                key={sp.label}
                type="button"
                onClick={() => setActive(i)}
                className="cursor-pointer w-full flex items-center gap-2.5 text-left relative"
                style={{
                  padding: '13px 14px',
                  borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                  background: on ? BLUE_MIST : 'transparent',
                  transition: 'background .18s',
                }}
              >
                {on && (
                  <motion.span
                    layoutId="specsRail"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 7,
                      bottom: 7,
                      width: 3,
                      borderRadius: 9999,
                      background: BLUE,
                    }}
                  />
                )}
                <span
                  className="inline-flex items-center justify-center shrink-0"
                  style={{ width: 30, height: 30, borderRadius: 9, background: on ? BLUE : BLUE_SOFT, color: on ? '#fff' : BLUE, transition: 'background .2s, color .2s' }}
                >
                  <RIcon className="w-[15px] h-[15px]" strokeWidth={2.4} />
                </span>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: on ? 700 : 600,
                    color: on ? BLUE_DEEP : INK_2,
                    lineHeight: 1.15,
                  }}
                >
                  {sp.label}
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
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              background: BLUE_MIST,
              padding: '22px 20px',
            }}
          >
            <span
              className="inline-flex items-center justify-center mb-4"
              style={{ width: 48, height: 48, borderRadius: 14, background: '#ffffff', border: `1px solid ${LINE}`, color: BLUE }}
            >
              <Icon className="w-6 h-6" strokeWidth={2.2} />
            </span>

            <div
              style={{ fontSize: '0.72rem', fontWeight: 700, color: BLUE_DEEP, textTransform: 'uppercase', letterSpacing: '0.14em' }}
            >
              {s.label}
            </div>

            <div
              className="font-display flex items-end gap-2 flex-wrap"
              style={{ marginTop: 6, lineHeight: 0.95 }}
            >
              <span style={{ fontSize: 'clamp(2.1rem, 6vw, 3.2rem)', letterSpacing: '-0.03em', color: INK, fontWeight: 700 }}>
                {s.big}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: BLUE, paddingBottom: 6 }}>
                {s.tail}
              </span>
            </div>

            <div style={{ marginTop: 12, fontSize: '0.95rem', lineHeight: 1.45, color: INK_2 }}>
              {s.value}
              {s.note && <span style={{ color: MUTE }}> · {s.note}</span>}
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {s.badges.map((b, bi) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5"
                  style={{
                    border: `1px solid ${LINE}`,
                    background: '#ffffff',
                    borderRadius: 9999,
                    padding: '5px 11px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: INK_2,
                  }}
                >
                  {bi === 0 && <BadgeIcon className="w-3 h-3" strokeWidth={2.6} style={{ color: BLUE }} />}
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Tente() {
  return (
    <div className="overflow-x-clip bg-paper">
      <main>
        {/* ░░ SLIM HERO ░░ */}
        <section className="bg-paper pt-28 md:pt-32">
          <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pb-2 md:pb-4">
            <Reveal as="div" className="flex items-center gap-3 mb-5">
              <span className="kicker">Notre produit phare</span>
              <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
              <Link to="/" className="text-xs font-semibold text-[var(--muted)] hover:text-ink transition-colors">Accueil</Link>
            </Reveal>
            <Reveal>
              <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5.2vw,3.6rem)', lineHeight: 1.02 }}>
                Tente Spider Gonflable
              </h1>
            </Reveal>
            <Reveal as="p" delay={0.1} className="lead mt-4 max-w-xl">
              Installation en 2 minutes · Conception Suisse · Impression totale comprise
            </Reveal>
          </div>
        </section>

        {/* ░░ CONFIGURATOR (shared) ░░ */}
        <ProductConfigurator data={CONFIGURATORS.tente} />

        {/* ░░ SPECS — split rail + detail panel (V71) ░░ */}
        <section className="bg-paper py-12 md:py-16">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 md:mb-16">
              <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">01</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Fiche technique</span>
                </Reveal>
                <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                  <MaskHeading text="Caractéristiques" />{' '}
                  <span className="serif-accent text-[var(--blue)]"><MaskHeading text="techniques" delay={0.18} /></span>
                </h2>
              </div>
              <Rise as="p" y={28} delay={0.1} className="lg:col-span-5 lead">
                Une structure conçue pour durer : matériaux haute résistance, certification anti-feu et
                impression sublimation garantie 5 ans.
              </Rise>
            </div>

            <Reveal>
              <SpecsSplit />
            </Reveal>
          </div>
        </section>

        {/* ░░ PARFAITE POUR — éditorial rangées à filets (V73, non-interactif) ░░ */}
        <section className="bg-white border-t border-[var(--line)] py-12 md:py-16">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="flex flex-col items-start max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold tabular-nums text-ink/30">02</span>
                  <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                  <span className="kicker">Cas d'usage</span>
                </Reveal>
                <h2 className="font-display font-bold text-ink leading-[1.02] tracking-tightest text-[clamp(1.9rem,4.4vw,3.4rem)]">
                  <MaskHeading text="Parfaite pour" />{' '}
                  <span className="serif-accent text-[var(--blue)]"><MaskHeading text="vos événements" delay={0.18} /></span>
                </h2>
              </div>
              <Reveal as="div" delay={0.1} className="md:pb-2">
                <Magnetic>
                  <Link to="/Contact" data-cursor className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <Reveal>
              <div style={{ color: INK }}>
                <div style={{ borderTop: `1px solid ${LINE}` }}>
                  {USAGES.map((u) => {
                    const Icon = u.icon;
                    return (
                      <div
                        key={u.tag}
                        className="uc-row relative flex items-center gap-4 overflow-hidden"
                        style={{
                          borderBottom: `1px solid ${LINE}`,
                          background: '#ffffff',
                          padding: '20px 14px 20px 16px',
                          transition: 'background .22s',
                        }}
                      >
                        <span
                          className="font-display shrink-0 tabular-nums select-none"
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            width: 34,
                            color: '#c2d2ea',
                          }}
                        >
                          {u.tag}
                        </span>
                        <span
                          className="flex items-center justify-center shrink-0"
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 13,
                            background: BLUE_SOFT,
                            color: BLUE,
                          }}
                        >
                          <Icon className="w-5 h-5" strokeWidth={2.2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className="font-display block"
                            style={{
                              fontSize: '1.1rem',
                              lineHeight: 1.2,
                              fontWeight: 700,
                              color: INK,
                            }}
                          >
                            {u.title}
                          </span>
                          <span
                            className="block"
                            style={{
                              fontSize: '0.92rem',
                              lineHeight: 1.4,
                              color: MUTE,
                              marginTop: 3,
                            }}
                          >
                            {u.desc}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <style>{`.uc-row:hover{background:${BLUE_MIST};}`}</style>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/41774835190"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[var(--blue)] hover:bg-[var(--blue-deep)] rounded-full shadow-2xl flex items-center justify-center text-white transition-colors"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
