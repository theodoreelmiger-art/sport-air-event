import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Ruler,
  ArrowRight,
  Sparkles,
  Check,
  PencilRuler,
  Send,
  ChevronRight,
} from 'lucide-react';

/*
  CATEGORY: BOUTONS CTA — paires "Demander un devis" (primaire, bleu plein)
  vs "Sur mesure / Dimensions personnalisées" (secondaire, clairement distinct).
  Chaque variante affiche LES DEUX boutons ensemble pour montrer le contraste.
*/

// ── V18 — Plein vs Contour ──────────────────────────────────────────────
// Le primaire est un bloc bleu plein qui s'illumine; le secondaire est un
// contour fin qui se remplit d'une teinte au survol. Contraste fort, sobre.
function V18() {
  const [clicked, setClicked] = useState(null);
  return (
    <div className="w-full">
      <p className="kicker mb-4">Prêt à lancer votre projet ?</p>
      <div className="flex flex-col gap-3">
        <motion.button
          type="button"
          onClick={() => setClicked('devis')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          className="group relative flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 font-semibold text-white cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
            boxShadow: '0 12px 26px -12px rgba(0,82,163,0.7)',
          }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #2f8cf0, #0066cc)' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <FileText size={19} className="relative z-10" strokeWidth={2.2} />
          <span className="relative z-10 text-[1.02rem]">Demander un devis</span>
          <ArrowRight
            size={18}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2.2}
          />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setClicked('mesure')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          className="group relative flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue-deep)',
            background: '#fff',
            border: '1.5px solid var(--line)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--blue)';
            e.currentTarget.style.background = 'var(--blue-mist)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--line)';
            e.currentTarget.style.background = '#fff';
          }}
        >
          <Ruler size={18} strokeWidth={2.2} />
          <span className="text-[1.02rem]">Sur mesure</span>
        </motion.button>
      </div>
      <AnimatePresence>
        {clicked && (
          <motion.p
            key={clicked}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-center text-sm"
            style={{ color: 'var(--blue)' }}
          >
            {clicked === 'devis'
              ? 'Formulaire de devis ouvert'
              : 'Configurateur dimensions personnalisées'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── V19 — Bloc vedette + lien fantôme ───────────────────────────────────
// Le primaire devient une carte bleue pleine "vedette". Le secondaire est un
// lien fantôme discret, souligné animé — hiérarchie maximale.
function V19() {
  const [hover, setHover] = useState(false);
  return (
    <div className="w-full">
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className="group relative w-full flex items-center gap-4 rounded-[22px] px-6 py-5 text-left cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1f7ae0 0%, #0052a3 100%)',
          boxShadow: '0 18px 40px -18px rgba(0,82,163,0.65)',
        }}
      >
        <motion.div
          aria-hidden
          className="absolute -right-8 -top-10 h-32 w-32 rounded-full"
          style={{ background: 'rgba(255,255,255,0.14)' }}
          animate={{ scale: hover ? 1.25 : 1, opacity: hover ? 1 : 0.7 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        />
        <span
          className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.18)' }}
        >
          <FileText size={22} className="text-white" strokeWidth={2.1} />
        </span>
        <span className="relative z-10 flex-1">
          <span className="block font-display text-[1.15rem] font-semibold text-white">
            Demander un devis
          </span>
          <span className="block text-sm text-white/80">Réponse sous 24h</span>
        </span>
        <motion.span
          className="relative z-10"
          animate={{ x: hover ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <ArrowRight size={22} className="text-white" strokeWidth={2.3} />
        </motion.span>
      </motion.button>

      <div className="mt-4 flex items-center justify-center">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 px-2 py-1 font-semibold cursor-pointer"
          style={{ color: 'var(--blue)' }}
        >
          <Ruler size={16} strokeWidth={2.2} />
          <span className="relative">
            Besoin de dimensions sur mesure ?
            <span
              className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ background: 'var(--blue)' }}
            />
          </span>
          <ChevronRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2.4}
          />
        </motion.button>
      </div>
    </div>
  );
}

// ── V20 — Duo segmenté (poids visuel asymétrique) ───────────────────────
// Deux pavés côte à côte dans un même rail; le primaire occupe ~62% en bleu
// plein, le secondaire en surface claire teintée. Même rangée, rôles clairs.
function V20() {
  const [active, setActive] = useState('devis');
  return (
    <div className="w-full">
      <div
        className="flex gap-2 rounded-[22px] p-2"
        style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}
      >
        <motion.button
          type="button"
          onClick={() => setActive('devis')}
          whileTap={{ scale: 0.97 }}
          className="group relative flex flex-[1.6] items-center justify-center gap-2 rounded-2xl px-4 py-4 font-semibold text-white cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
            boxShadow: '0 10px 22px -12px rgba(0,82,163,0.6)',
          }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 -translate-x-full"
            style={{
              background:
                'linear-gradient(110deg, transparent, rgba(255,255,255,0.28), transparent)',
            }}
            animate={{ x: active === 'devis' ? ['-100%', '180%'] : '-100%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
          <FileText size={18} className="relative z-10" strokeWidth={2.2} />
          <span className="relative z-10">Demander un devis</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setActive('mesure')}
          whileTap={{ scale: 0.97 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-4 font-semibold cursor-pointer transition-all duration-300"
          style={{
            background: active === 'mesure' ? '#fff' : 'transparent',
            color: 'var(--blue-deep)',
            border:
              active === 'mesure'
                ? '1.5px solid var(--blue)'
                : '1.5px solid transparent',
            boxShadow:
              active === 'mesure' ? '0 6px 16px -10px rgba(0,82,163,0.5)' : 'none',
          }}
        >
          <Ruler size={17} strokeWidth={2.2} />
          <span className="text-[0.95rem]">Sur mesure</span>
        </motion.button>
      </div>
      <p
        className="mt-3 text-center text-[0.82rem]"
        style={{ color: 'var(--blue)' }}
      >
        {active === 'devis'
          ? 'Devis personnalisé pour votre tente'
          : 'Dimensions et finitions à la demande'}
      </p>
    </div>
  );
}

// ── V21 — Action principale + carte pointillée "sur mesure" ─────────────
// Le primaire est un bouton plein classique. Le secondaire est une carte au
// contour pointillé (vocabulaire "personnalisé / atelier") nettement à part.
function V21() {
  const [done, setDone] = useState(false);
  return (
    <div className="w-full">
      <motion.button
        type="button"
        onClick={() => setDone(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 font-semibold text-white cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
          boxShadow: '0 14px 30px -14px rgba(0,82,163,0.7)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.span
              key="ok"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check size={19} strokeWidth={2.6} />
              Demande envoyée
            </motion.span>
          ) : (
            <motion.span
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5"
            >
              <Send
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              Demander un devis
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="my-3 flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--blue)' }}>
          ou
        </span>
        <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        className="group flex w-full items-center gap-4 rounded-[22px] px-5 py-4 text-left cursor-pointer transition-colors duration-300"
        style={{
          background: 'var(--blue-mist)',
          border: '1.5px dashed var(--blue-bright)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-soft)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: '#fff', border: '1px solid var(--line)' }}
        >
          <PencilRuler size={20} style={{ color: 'var(--blue)' }} strokeWidth={2.1} />
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--blue-deep)' }}>
            Dimensions personnalisées
            <Sparkles size={14} style={{ color: 'var(--blue-bright)' }} strokeWidth={2.2} />
          </span>
          <span className="block text-sm" style={{ color: 'var(--blue)' }}>
            Notre atelier conçoit votre format
          </span>
        </span>
        <ChevronRight
          size={20}
          style={{ color: 'var(--blue)' }}
          strokeWidth={2.3}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.button>
    </div>
  );
}

export const variants = [
  {
    n: 18,
    label: 'Plein vs Contour',
    note: 'Bleu plein illuminé contre un contour fin qui se teinte au survol.',
    Component: V18,
  },
  {
    n: 19,
    label: 'Vedette + lien fantôme',
    note: 'Grande carte bleue vedette et lien souligné discret en dessous.',
    Component: V19,
  },
  {
    n: 20,
    label: 'Duo segmenté',
    note: 'Deux pavés dans un rail, poids visuel asymétrique 62/38.',
    Component: V20,
  },
  {
    n: 21,
    label: 'Action + carte pointillée',
    note: 'Bouton plein puis carte au contour pointillé façon atelier.',
    Component: V21,
  },
];
