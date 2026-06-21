import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check, ShieldCheck, Settings, ChevronRight } from 'lucide-react';

/*
  CATEGORY: BANDEAU COOKIES (consentement)
  3 bandeaux de consentement (Accepter / Refuser), blanc & bleu uniquement.
  Titre "Cookies et confidentialité" + texte standard. Variantes de mise en
  page: carte d'angle, barre du bas, centré (modale). Tous interactifs:
  on peut accepter / refuser / fermer et le bandeau réapparaît via "Revoir".
  Animations transform/opacity uniquement.
*/

const TEXT =
  "Nous utilisons des cookies pour améliorer votre navigation, analyser le trafic et personnaliser votre expérience. Vous pouvez accepter ou refuser à tout moment.";

// Petit panneau de rappel quand le bandeau est fermé ───────────────────────
function Replay({ choice, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
      style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}
    >
      <div className="flex items-center gap-2.5 text-[0.82rem]" style={{ color: 'var(--ink-2)' }}>
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}
        >
          {choice === 'accept' ? <Check size={15} strokeWidth={2.6} /> : <X size={15} strokeWidth={2.6} />}
        </span>
        <span>
          {choice === 'accept' ? 'Cookies acceptés.' : 'Cookies refusés.'}
        </span>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors"
        style={{ color: 'var(--blue)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-soft)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        Revoir le choix
      </button>
    </motion.div>
  );
}

// ── V90 — Carte d'angle ────────────────────────────────────────────────────
// Carte compacte ancrée en bas à droite d'un aperçu de page, avec icône
// ronde, croix de fermeture et deux boutons. Apparition en glissé.
function V90() {
  const [open, setOpen] = useState(true);
  const [choice, setChoice] = useState(null);
  const decide = (c) => { setChoice(c); setOpen(false); };

  return (
    <div
      className="relative h-[340px] w-full overflow-hidden rounded-[22px]"
      style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}
    >
      {/* Faux contenu de page */}
      <div className="p-5">
        <div className="h-2.5 w-24 rounded-full" style={{ background: 'var(--blue-soft)' }} />
        <div className="mt-3 h-2 w-44 rounded-full" style={{ background: 'var(--line)' }} />
        <div className="mt-2 h-2 w-36 rounded-full" style={{ background: 'var(--line)' }} />
        <div className="mt-2 h-2 w-40 rounded-full" style={{ background: 'var(--line)' }} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="card"
            initial={{ opacity: 0, x: 24, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="absolute bottom-4 right-4 w-[270px] rounded-2xl bg-white p-4"
            style={{ border: '1px solid var(--line)' }}
          >
            <div className="flex items-start gap-3">
              <span
                className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full"
                style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}
              >
                <Shield size={18} strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <h4 className="font-display text-[0.98rem] font-bold leading-tight" style={{ color: 'var(--ink)' }}>
                  Cookies et confidentialité
                </h4>
              </div>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => decide('refuse')}
                className="ml-auto cursor-pointer rounded-full p-1 transition-colors"
                style={{ color: 'var(--ink-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            </div>
            <p className="mt-2.5 text-[0.8rem] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              {TEXT}
            </p>
            <div className="mt-3.5 grid grid-cols-2 gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => decide('refuse')}
                className="cursor-pointer rounded-xl py-2 text-[0.82rem] font-semibold transition-colors"
                style={{ border: '1px solid var(--line)', color: 'var(--ink)', background: 'white' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
              >
                Refuser
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => decide('accept')}
                className="cursor-pointer rounded-xl py-2 text-[0.82rem] font-semibold text-white transition-transform"
                style={{ background: 'var(--blue)' }}
              >
                Accepter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.div
            key="replay"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <Replay choice={choice} onReset={() => setOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── V91 — Barre du bas ─────────────────────────────────────────────────────
// Bandeau pleine largeur ancré en bas, texte à gauche et actions à droite,
// liseré bleu supérieur. Glisse depuis le bas.
function V91() {
  const [open, setOpen] = useState(true);
  const [choice, setChoice] = useState(null);
  const decide = (c) => { setChoice(c); setOpen(false); };

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden rounded-[22px]"
      style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}
    >
      {/* Faux contenu */}
      <div className="p-5">
        <div className="h-2.5 w-28 rounded-full" style={{ background: 'var(--blue-soft)' }} />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-white" style={{ border: '1px solid var(--line)' }} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="bar"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-white"
            style={{ borderTop: '2px solid var(--blue)' }}
          >
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full"
                  style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}
                >
                  <ShieldCheck size={18} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <h4
                    className="font-display text-[0.92rem] font-bold leading-tight"
                    style={{ color: 'var(--ink)' }}
                  >
                    Cookies et confidentialité
                  </h4>
                  <p className="mt-1 text-[0.78rem] leading-snug" style={{ color: 'var(--ink-2)' }}>
                    {TEXT}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-2 sm:ml-auto">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => decide('refuse')}
                  className="flex-1 cursor-pointer rounded-xl px-4 py-2 text-[0.82rem] font-semibold transition-colors sm:flex-none"
                  style={{ border: '1px solid var(--line)', color: 'var(--ink)', background: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                >
                  Refuser
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => decide('accept')}
                  className="flex-1 cursor-pointer rounded-xl px-5 py-2 text-[0.82rem] font-semibold text-white sm:flex-none"
                  style={{ background: 'var(--blue)' }}
                >
                  Accepter
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.div
            key="replay"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <Replay choice={choice} onReset={() => setOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── V92 — Centré (modale) ──────────────────────────────────────────────────
// Modale centrée sur fond voilé bleu, icône en bandeau, deux boutons et un
// lien "Personnaliser" qui révèle un rappel de réglages. Zoom à l'entrée.
function V92() {
  const [open, setOpen] = useState(true);
  const [choice, setChoice] = useState(null);
  const [more, setMore] = useState(false);
  const decide = (c) => { setChoice(c); setOpen(false); setMore(false); };

  return (
    <div
      className="relative grid h-[360px] w-full place-items-center overflow-hidden rounded-[22px]"
      style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}
    >
      {/* Faux contenu flou en fond */}
      <div className="absolute inset-0 p-6">
        <div className="h-2.5 w-32 rounded-full" style={{ background: 'var(--blue-soft)' }} />
        <div className="mt-3 h-2 w-48 rounded-full" style={{ background: 'var(--line)' }} />
        <div className="mt-2 h-2 w-44 rounded-full" style={{ background: 'var(--line)' }} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid place-items-center px-5"
            style={{ background: 'rgba(11,28,63,0.32)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="w-full max-w-[320px] overflow-hidden rounded-[22px] bg-white"
              style={{ border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-center pt-6">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}
                >
                  <Shield size={24} strokeWidth={2.1} />
                </span>
              </div>
              <div className="px-6 pb-6 pt-3 text-center">
                <h4 className="font-display text-[1.05rem] font-bold" style={{ color: 'var(--ink)' }}>
                  Cookies et confidentialité
                </h4>
                <p className="mt-2 text-[0.8rem] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {TEXT}
                </p>

                <AnimatePresence initial={false}>
                  {more && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-3 space-y-1.5 rounded-xl p-3 text-left"
                        style={{ background: 'var(--blue-mist)', border: '1px solid var(--line)' }}
                      >
                        {['Cookies essentiels (requis)', 'Mesure d’audience', 'Personnalisation'].map((l, i) => (
                          <div
                            key={l}
                            className="flex items-center justify-between text-[0.76rem]"
                            style={{ color: 'var(--ink-2)' }}
                          >
                            <span>{l}</span>
                            <span
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                              style={{
                                background: i === 0 ? 'var(--blue)' : 'var(--blue-soft)',
                                color: i === 0 ? 'white' : 'var(--blue)',
                              }}
                            >
                              <Check size={12} strokeWidth={3} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => decide('refuse')}
                    className="cursor-pointer rounded-xl py-2.5 text-[0.82rem] font-semibold transition-colors"
                    style={{ border: '1px solid var(--line)', color: 'var(--ink)', background: 'white' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                  >
                    Refuser
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => decide('accept')}
                    className="cursor-pointer rounded-xl py-2.5 text-[0.82rem] font-semibold text-white"
                    style={{ background: 'var(--blue)' }}
                  >
                    Accepter
                  </motion.button>
                </div>
                <button
                  type="button"
                  onClick={() => setMore((m) => !m)}
                  className="mx-auto mt-3 inline-flex cursor-pointer items-center gap-1 text-[0.76rem] font-semibold"
                  style={{ color: 'var(--blue)' }}
                >
                  <Settings size={13} strokeWidth={2.3} />
                  Personnaliser
                  <motion.span animate={{ rotate: more ? 90 : 0 }} className="inline-flex">
                    <ChevronRight size={13} strokeWidth={2.6} />
                  </motion.span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.div
            key="replay"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <Replay choice={choice} onReset={() => setOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const variants = [
  {
    n: 90,
    label: "Carte d'angle",
    note: "Carte compacte en bas à droite, icône cookie, croix et deux boutons.",
    Component: V90,
  },
  {
    n: 91,
    label: 'Barre du bas',
    note: 'Bandeau pleine largeur ancré en bas avec liseré bleu et actions à droite.',
    Component: V91,
  },
  {
    n: 92,
    label: 'Centré (modale)',
    note: 'Modale centrée sur fond voilé avec lien Personnaliser dépliable.',
    Component: V92,
  },
];
