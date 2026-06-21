import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, MessageCircle,
  Layers, Gauge, Wind, Timer, Sparkles, Flame, ShieldCheck, Feather,
  Trophy, Briefcase, Music, Store,
} from 'lucide-react';
import { Reveal, Rise, MaskHeading, Magnetic, RevealStagger, staggerChild } from '../lib/motion.jsx';
import ProductConfigurator from '../components/ProductConfigurator.jsx';
import { CONFIGURATORS } from '../data/configurators.js';

// Spec data — icon + label + prominent value + optional small sub-note. Every
// real label/value/note is preserved verbatim from the original fiche technique.
const SPECS = [
  { icon: Flame, label: 'Résistance au vent', value: "Jusqu'à 70 km/h", note: 'Structure haute pression stabilisée' },
  { icon: Layers, label: 'Matériau', value: 'Oxford 600D + TPU', note: 'Haute résistance' },
  { icon: Gauge, label: 'Pression de gonflage', value: 'Haute pression 0.35 bar' },
  { icon: Timer, label: 'Temps de gonflage', value: '60–90 secondes' },
  { icon: Sparkles, label: 'Impression', value: 'Sublimation HD 360°', note: 'Résistante aux UV' },
  { icon: ShieldCheck, label: 'Certification', value: 'Anti-feu M2, Anti-UV' },
  { icon: Wind, label: 'Garantie', value: '5 ans structure + impression' },
  { icon: Feather, label: 'Poids (4×4m)', value: '~12 kg' },
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
const MUTE = '#5b6f8e';

/* ░░ SPECS — compact spec-card grid : icône + label, valeur en évidence, petit sous-titre ░░ */
function SpecsGrid() {
  return (
    <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3.5">
      {SPECS.map((s) => {
        const Icon = s.icon;
        return (
          <motion.div
            variants={staggerChild}
            key={s.label}
            className="spec-card flex flex-col rounded-2xl border bg-white p-4 md:p-5 transition-colors duration-200"
            style={{ borderColor: LINE }}
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <span
                className="inline-flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, borderRadius: 10, background: BLUE_SOFT, color: BLUE }}
              >
                <Icon className="w-4 h-4" strokeWidth={2.4} />
              </span>
              <span
                style={{ fontSize: '0.7rem', fontWeight: 700, color: BLUE_DEEP, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.2 }}
              >
                {s.label}
              </span>
            </div>
            <div
              className="font-display tracking-tightest"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', lineHeight: 1.1, color: INK, fontWeight: 700 }}
            >
              {s.value}
            </div>
            {s.note && (
              <div style={{ marginTop: 6, fontSize: '0.82rem', lineHeight: 1.4, color: MUTE }}>
                {s.note}
              </div>
            )}
          </motion.div>
        );
      })}
      <style>{`.spec-card:hover{border-color:${BLUE}33;background:${BLUE_MIST};}`}</style>
    </RevealStagger>
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

        {/* ░░ SPECS — compact spec-card grid ░░ */}
        <section className="bg-paper py-12 md:py-16">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-9 md:mb-12">
              <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
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

            <SpecsGrid />
          </div>
        </section>

        {/* ░░ PARFAITE POUR — éditorial rangées à filets (V73, non-interactif) ░░ */}
        <section className="bg-white border-t border-[var(--line)] py-12 md:py-16">
          <div className="max-w-content mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="flex flex-col items-start max-w-2xl">
                <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
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
