import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  Truck,
  Globe,
  Mail,
  MapPin,
} from 'lucide-react';
import { HERO_IMAGE } from './data.js';

/*
  CATEGORY: Bannière CTA finale
  4 bannières CTA de fin de page (#93 → #96), blanc & bleu uniquement.
  Message : « Prêt à marquer les esprits ? » / « Conception Suisse.
  Livraison France et Europe. » / « Demander un devis gratuit ».
  Variantes : fond image + voile bleu, dégradé bleu profond, split, minimal.
  Interactions : bouton devis avec état envoyé, onglets de contact, toggle
  d'options, champ email. Animations transform/opacity uniquement.
*/

// Resolve hero image against the (possibly sub-path) base URL.
const IMG = (import.meta.env.BASE_URL || '/') + HERO_IMAGE;

// Shared feather mask + edge crop so the render dissolves into the panel.
const FEATHER_MASK =
  'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)';
const IMG_MASK = {
  WebkitMaskImage: FEATHER_MASK,
  maskImage: FEATHER_MASK,
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

const EASE = [0.22, 1, 0.36, 1];

/* ────────────────────────────────────────────────────────────────────────
   V93 — Fond image + voile bleu. La photo héro remplit le cadre sous un
   lavis bleu de lisibilité. Le bouton « Demander un devis » bascule vers un
   état « Demande envoyée ». Trois pastilles de réassurance s'activent au clic.
   ──────────────────────────────────────────────────────────────────────── */
function V93() {
  const [sent, setSent] = useState(false);
  const [chip, setChip] = useState(0);
  const chips = [
    { icon: ShieldCheck, label: 'Garantie 5 ans' },
    { icon: Truck, label: 'Livraison Europe' },
    { icon: Sparkles, label: 'Conception Suisse' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative w-full overflow-hidden rounded-[22px]"
      style={{ background: '#0a2a52' }}
    >
      {/* Image background under blue wash */}
      <img
        src={IMG}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ mixBlendMode: 'screen', opacity: 0.55, ...IMG_MASK }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(0,102,204,0.78) 0%, rgba(8,32,66,0.92) 100%)',
        }}
      />
      <div className="relative px-6 py-9 text-white">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.72rem] font-semibold tracking-wide">
          <Sparkles className="h-3.5 w-3.5" />
          PRÊT À VOUS LANCER ?
        </span>
        <h3 className="font-display mt-4 text-[1.9rem] font-bold leading-[1.08]">
          Prêt à marquer<br />les esprits ?
        </h3>
        <p className="mt-2 max-w-[300px] text-[0.92rem] leading-relaxed text-white/80">
          Conception Suisse. Livraison France et Europe.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c, i) => {
            const Icon = c.icon;
            const on = chip === i;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => setChip(i)}
                className="cursor-pointer rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors"
                style={{
                  background: on ? '#ffffff' : 'rgba(255,255,255,0.12)',
                  color: on ? '#0066cc' : 'rgba(255,255,255,0.9)',
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        <motion.button
          type="button"
          onClick={() => setSent((v) => !v)}
          whileTap={{ scale: 0.96 }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-[0.95rem] font-semibold text-[#0066cc] sm:w-auto"
          aria-pressed={sent}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="h-4.5 w-4.5" />
                Demande envoyée
              </motion.span>
            ) : (
              <motion.span
                key="ask"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="inline-flex items-center gap-2"
              >
                Demander un devis gratuit
                <ArrowRight className="h-4.5 w-4.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V94 — Dégradé bleu profond, centré. Aucune image. Grand titre, ligne de
   signature, et un unique bouton « Demander un devis » centré en bas, mis en
   avant. Plus de choix de canal de contact : une seule action claire.
   ──────────────────────────────────────────────────────────────────────── */
function V94() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="bg-deep relative w-full overflow-hidden rounded-[22px] text-white"
    >
      {/* Soft radial accent, transform/opacity-safe (static) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% -10%, rgba(59,130,246,0.45) 0%, rgba(10,30,66,0) 60%)',
        }}
      />
      <div className="relative flex flex-col items-center px-6 py-10 text-center">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="font-display mx-auto mt-4 max-w-[340px] text-[1.85rem] font-bold leading-[1.1]">
          Prêt à marquer les esprits ?
        </h3>
        <p className="mx-auto mt-2 max-w-[300px] text-[0.9rem] leading-relaxed text-white/75">
          Conception Suisse. Livraison France et Europe.
        </p>

        {/* Single prominent action, centered at the bottom */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex w-full max-w-[300px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-[1rem] font-semibold text-[#0066cc]"
        >
          Demander un devis
          <ArrowRight className="h-4.5 w-4.5" />
        </motion.button>

        <div className="mt-4 inline-flex items-center gap-1.5 text-[0.74rem] text-white/55">
          <ShieldCheck className="h-3.5 w-3.5" />
          Réponse sous 24 h — devis sans engagement
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V95 — Split : visuel à gauche, contenu à droite. La photo héro (mix-blend
   multiply + masque plume) occupe le panneau bleu de gauche. À droite, deux
   options de format se sélectionnent et alimentent le bouton de devis.
   ──────────────────────────────────────────────────────────────────────── */
function V95() {
  const [pick, setPick] = useState(1);
  const formats = [
    { label: 'Tente Spider', sub: '3×3 → 5×5 m' },
    { label: 'Arche gonflable', sub: '5 → 10 m' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="w-full overflow-hidden rounded-[22px]"
      style={{ border: '1px solid var(--line)' }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left visual panel */}
        <div
          className="bg-deep relative flex items-center justify-center overflow-hidden sm:w-[44%]"
          style={{ minHeight: 150 }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 80% at 30% 30%, rgba(59,130,246,0.4) 0%, rgba(10,30,66,0) 70%)',
            }}
          />
          <img
            src={IMG}
            alt="Structure gonflable Sport Air Event"
            className="relative h-full w-full object-cover"
            style={{ mixBlendMode: 'multiply', ...IMG_MASK }}
          />
        </div>

        {/* Right content panel */}
        <div className="flex-1 bg-white px-5 py-6">
          <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-[#0066cc]">
            Devis gratuit
          </span>
          <h3
            className="font-display mt-1.5 text-[1.5rem] font-bold leading-[1.12]"
            style={{ color: 'var(--ink)' }}
          >
            Prêt à marquer les esprits ?
          </h3>
          <p
            className="mt-1.5 text-[0.85rem] leading-relaxed"
            style={{ color: 'var(--ink)', opacity: 0.62 }}
          >
            Conception Suisse. Livraison France et Europe.
          </p>

          <div className="mt-4 space-y-2">
            {formats.map((f, i) => {
              const on = pick === i;
              return (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => setPick(i)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-3.5 py-2.5 text-left transition-colors"
                  style={{
                    border: on
                      ? '1.5px solid #0066cc'
                      : '1.5px solid var(--line)',
                    background: on ? 'var(--blue-mist)' : '#fff',
                  }}
                  aria-pressed={on}
                >
                  <span>
                    <span
                      className="block text-[0.86rem] font-semibold"
                      style={{ color: 'var(--ink)' }}
                    >
                      {f.label}
                    </span>
                    <span
                      className="block text-[0.74rem]"
                      style={{ color: 'var(--ink)', opacity: 0.55 }}
                    >
                      {f.sub}
                    </span>
                  </span>
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      border: on ? 'none' : '1.5px solid var(--line)',
                      background: on ? '#0066cc' : 'transparent',
                    }}
                  >
                    {on && <Check className="h-3 w-3 text-white" />}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-[0.9rem] font-semibold text-white"
            style={{ background: '#0066cc' }}
          >
            Demander un devis
            <ArrowUpRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   V96 — Minimal. Carte blanche, hairline, accent bleu sobre. Une seule ligne
   de message, un champ email en ligne avec validation visuelle et bouton
   d'envoi qui bascule vers « Envoyé ». Aucune image.
   ──────────────────────────────────────────────────────────────────────── */
function V96() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="w-full overflow-hidden rounded-[22px] bg-white px-6 py-8"
      style={{ border: '1px solid var(--line)' }}
    >
      <div
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold"
        style={{ background: 'var(--blue-soft)', color: '#0066cc' }}
      >
        <Globe className="h-3.5 w-3.5" />
        France & Europe
      </div>

      <h3
        className="font-display mt-4 text-[1.6rem] font-bold leading-[1.12]"
        style={{ color: 'var(--ink)' }}
      >
        Prêt à marquer les esprits ?
      </h3>
      <p
        className="mt-1.5 text-[0.88rem] leading-relaxed"
        style={{ color: 'var(--ink)', opacity: 0.6 }}
      >
        Conception Suisse. Recevez un devis gratuit en 24 h.
      </p>

      {/* Inline email + submit */}
      <div
        className="mt-5 flex items-center gap-1.5 rounded-2xl p-1.5"
        style={{ border: '1px solid var(--line)' }}
      >
        <span className="pl-2.5" style={{ color: '#0066cc' }}>
          <Mail className="h-4 w-4" />
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSent(false);
          }}
          placeholder="vous@entreprise.com"
          aria-label="Votre email"
          className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-[0.88rem] outline-none"
          style={{ color: 'var(--ink)' }}
        />
        <motion.button
          type="button"
          disabled={!valid}
          onClick={() => valid && setSent(true)}
          whileTap={valid ? { scale: 0.94 } : undefined}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[0.82rem] font-semibold text-white transition-opacity"
          style={{ background: '#0066cc', opacity: valid ? 1 : 0.4, cursor: valid ? 'pointer' : 'not-allowed' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                Envoyé
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5"
              >
                Devis
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div
        className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.74rem]"
        style={{ color: 'var(--ink)', opacity: 0.55 }}
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Conception Suisse
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" />
          Livraison Europe
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Garantie 5 ans
        </span>
      </div>
    </motion.div>
  );
}

export const variants = [
  {
    n: 93,
    label: 'Image + voile bleu',
    note: 'Photo héro sous lavis bleu, pastilles de réassurance et bouton devis avec état envoyé.',
    Component: V93,
  },
  {
    n: 94,
    label: 'Dégradé bleu centré',
    note: 'Bannière bleu profond centrée; un unique bouton « Demander un devis » mis en avant en bas.',
    Component: V94,
  },
  {
    n: 95,
    label: 'Split visuel + options',
    note: 'Visuel à gauche, choix de format à droite qui alimente la demande de devis.',
    Component: V95,
  },
  {
    n: 96,
    label: 'Minimal email en ligne',
    note: 'Carte blanche sobre, champ email validé et bouton qui bascule vers « Envoyé ».',
    Component: V96,
  },
];
