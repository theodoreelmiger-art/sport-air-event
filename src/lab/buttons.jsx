import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Send,
  Check,
  Ruler,
  ChevronRight,
  Zap,
  FileText,
} from 'lucide-react';

/*
  CATEGORY: BOUTONS (primaire / secondaire / ghost / magnétique)
  Chaque variante affiche UNE RANGÉE de styles ensemble :
  primaire bleu plein · secondaire contour · ghost · pill fléché · dégradé.
  Micro-interactions au survol (transform/opacity uniquement, zéro layout shift).
  Sélection cliquable : le style choisi est mis en avant sous la rangée.
*/

// Petit libellé de label réutilisable pour la rangée
const ROW_LABEL = 'mb-4 kicker';

// ── V97 — Panel classique (les 5 rôles alignés) ────────────────────────
// Cinq boutons sur une rangée fluide. Chacun cliquable -> sélectionné mis en
// avant. Hover sobre : élévation, teinte de remplissage, flèche qui glisse.
function V97() {
  const [picked, setPicked] = useState('primaire');

  const ring = (id) =>
    picked === id ? { boxShadow: '0 0 0 2px var(--blue), 0 0 0 5px var(--blue-soft)' } : {};

  return (
    <div className="w-full">
      <p className={ROW_LABEL}>Cinq styles, un clic</p>
      <div className="flex flex-wrap items-center gap-2.5">
        {/* primaire plein */}
        <motion.button
          type="button"
          onClick={() => setPicked('primaire')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="group relative flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
            boxShadow: '0 12px 26px -14px rgba(0,82,163,0.7)',
            ...ring('primaire'),
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
          <span className="relative z-10">Demander un devis</span>
          <ArrowRight
            size={17}
            strokeWidth={2.3}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>

        {/* secondaire contour */}
        <motion.button
          type="button"
          onClick={() => setPicked('secondaire')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue-deep)',
            background: '#fff',
            border: '1.5px solid var(--line)',
            ...ring('secondaire'),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--blue)';
            e.currentTarget.style.background = 'var(--blue-mist)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = picked === 'secondaire' ? 'var(--blue)' : 'var(--line)';
            e.currentTarget.style.background = '#fff';
          }}
        >
          <Ruler size={16} strokeWidth={2.2} />
          Sur mesure
        </motion.button>

        {/* ghost */}
        <motion.button
          type="button"
          onClick={() => setPicked('ghost')}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-1.5 rounded-2xl px-4 py-3 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue)',
            background: picked === 'ghost' ? 'var(--blue-mist)' : 'transparent',
            ...ring('ghost'),
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = picked === 'ghost' ? 'var(--blue-mist)' : 'transparent')
          }
        >
          En savoir plus
          <ChevronRight
            size={16}
            strokeWidth={2.4}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </motion.button>

        {/* pill fléché */}
        <motion.button
          type="button"
          onClick={() => setPicked('pill')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="group flex items-center gap-2 rounded-full py-3 pl-5 pr-2 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue-deep)',
            background: 'var(--blue-soft)',
            ...ring('pill'),
          }}
        >
          Configurer
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ background: 'var(--blue)' }}
          >
            <ArrowRight size={15} strokeWidth={2.5} className="text-white" />
          </span>
        </motion.button>

        {/* dégradé */}
        <motion.button
          type="button"
          onClick={() => setPicked('degrade')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="relative flex items-center gap-2 overflow-hidden rounded-2xl px-5 py-3 font-semibold text-white cursor-pointer"
          style={{
            background: 'linear-gradient(110deg, #0891b2, #1f7ae0 55%, #0052a3)',
            boxShadow: '0 12px 26px -14px rgba(8,82,163,0.6)',
            ...ring('degrade'),
          }}
        >
          <Sparkles size={16} strokeWidth={2.2} />
          Premium
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={picked}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 text-sm"
          style={{ color: 'var(--blue)' }}
        >
          Style sélectionné : <span className="font-semibold">{picked}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ── V98 — Rangée pleine largeur empilée (rôles hiérarchisés) ────────────
// Les cinq styles empilés, chacun pleine largeur, pour juger la hiérarchie
// verticale. Hover : balayage lumineux sur le plein, remplissage sur l'outline.
function V98() {
  const [picked, setPicked] = useState('primaire');
  const sel = (id) =>
    picked === id
      ? { boxShadow: '0 0 0 2px var(--blue), 0 0 0 5px var(--blue-soft)' }
      : {};

  return (
    <div className="w-full">
      <p className={ROW_LABEL}>Hiérarchie verticale</p>
      <div className="flex flex-col gap-2.5">
        {/* primaire */}
        <motion.button
          type="button"
          onClick={() => setPicked('primaire')}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 font-semibold text-white cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
            boxShadow: '0 12px 26px -14px rgba(0,82,163,0.7)',
            ...sel('primaire'),
          }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 -translate-x-full"
            style={{
              background:
                'linear-gradient(110deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            whileHover={{ x: ['-100%', '180%'] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <Send size={17} strokeWidth={2.2} className="relative z-10" />
          <span className="relative z-10">Demander un devis</span>
        </motion.button>

        {/* secondaire */}
        <motion.button
          type="button"
          onClick={() => setPicked('secondaire')}
          whileTap={{ scale: 0.985 }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue-deep)',
            background: '#fff',
            border: '1.5px solid var(--line)',
            ...sel('secondaire'),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--blue)';
            e.currentTarget.style.background = 'var(--blue-mist)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = picked === 'secondaire' ? 'var(--blue)' : 'var(--line)';
            e.currentTarget.style.background = '#fff';
          }}
        >
          <Ruler size={16} strokeWidth={2.2} />
          Dimensions sur mesure
        </motion.button>

        {/* ghost */}
        <motion.button
          type="button"
          onClick={() => setPicked('ghost')}
          whileTap={{ scale: 0.985 }}
          className="group flex w-full items-center justify-center gap-1.5 rounded-2xl px-6 py-3.5 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue)',
            background: picked === 'ghost' ? 'var(--blue-mist)' : 'transparent',
            ...sel('ghost'),
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = picked === 'ghost' ? 'var(--blue-mist)' : 'transparent')
          }
        >
          Voir le catalogue
          <ArrowRight
            size={16}
            strokeWidth={2.3}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>

        {/* pill fléché */}
        <motion.button
          type="button"
          onClick={() => setPicked('pill')}
          whileTap={{ scale: 0.985 }}
          className="group flex w-full items-center justify-between gap-2 rounded-full py-2.5 pl-6 pr-2.5 font-semibold cursor-pointer transition-colors duration-300"
          style={{ color: 'var(--blue-deep)', background: 'var(--blue-soft)', ...sel('pill') }}
        >
          Lancer la configuration
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ background: 'var(--blue)' }}
          >
            <ArrowRight size={16} strokeWidth={2.5} className="text-white" />
          </span>
        </motion.button>

        {/* dégradé */}
        <motion.button
          type="button"
          onClick={() => setPicked('degrade')}
          whileTap={{ scale: 0.985 }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold text-white cursor-pointer"
          style={{
            background: 'linear-gradient(110deg, #0891b2, #1f7ae0 55%, #0052a3)',
            boxShadow: '0 12px 26px -14px rgba(8,82,163,0.6)',
            ...sel('degrade'),
          }}
        >
          <Sparkles size={16} strokeWidth={2.2} />
          Offre premium
        </motion.button>
      </div>
    </div>
  );
}

// ── V99 — Magnétique (le curseur attire les boutons) ────────────────────
// Chaque bouton suit légèrement le pointeur (effet aimant). Transform pur :
// translation douce vers le curseur, retour ressort à la sortie.
function MagButton({ children, variant, selected, onClick }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    'relative flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold cursor-pointer select-none';
  const styles = {
    primaire: {
      color: '#fff',
      background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
      boxShadow: '0 12px 26px -14px rgba(0,82,163,0.7)',
    },
    secondaire: {
      color: 'var(--blue-deep)',
      background: '#fff',
      border: '1.5px solid var(--blue-bright)',
    },
    ghost: { color: 'var(--blue)', background: 'var(--blue-mist)' },
    degrade: {
      color: '#fff',
      background: 'linear-gradient(110deg, #0891b2, #1f7ae0 55%, #0052a3)',
      boxShadow: '0 12px 26px -14px rgba(8,82,163,0.6)',
    },
  };
  const ring = selected
    ? { boxShadow: '0 0 0 2px var(--blue), 0 0 0 5px var(--blue-soft)' }
    : {};

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.5 }}
      className={base}
      style={{ ...styles[variant], ...ring }}
    >
      {children}
    </motion.button>
  );
}

function V99() {
  const [picked, setPicked] = useState('primaire');
  return (
    <div className="w-full">
      <p className={ROW_LABEL}>Boutons magnétiques</p>
      <div className="flex flex-wrap items-center gap-3 py-2">
        <MagButton variant="primaire" selected={picked === 'primaire'} onClick={() => setPicked('primaire')}>
          <Send size={16} strokeWidth={2.2} />
          Devis
        </MagButton>
        <MagButton variant="secondaire" selected={picked === 'secondaire'} onClick={() => setPicked('secondaire')}>
          <Ruler size={16} strokeWidth={2.2} />
          Sur mesure
        </MagButton>
        <MagButton variant="ghost" selected={picked === 'ghost'} onClick={() => setPicked('ghost')}>
          Détails
          <ChevronRight size={15} strokeWidth={2.4} />
        </MagButton>
        {/* pill magnétique */}
        <MagButtonPill selected={picked === 'pill'} onClick={() => setPicked('pill')} />
        <MagButton variant="degrade" selected={picked === 'degrade'} onClick={() => setPicked('degrade')}>
          <Sparkles size={15} strokeWidth={2.2} />
          Premium
        </MagButton>
      </div>
      <p className="mt-3 text-sm" style={{ color: 'var(--blue)' }}>
        Survolez : les boutons suivent le curseur.{' '}
        <span className="font-semibold">{picked}</span> sélectionné.
      </p>
    </div>
  );
}

// pill magnétique séparé (forme arrondie + pastille fléchée)
function MagButtonPill({ selected, onClick }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.28,
      y: (e.clientY - (r.top + r.height / 2)) * 0.4,
    });
  };
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.5 }}
      className="group flex items-center gap-2 rounded-full py-2.5 pl-5 pr-2 font-semibold cursor-pointer select-none"
      style={{
        color: 'var(--blue-deep)',
        background: 'var(--blue-soft)',
        ...(selected ? { boxShadow: '0 0 0 2px var(--blue), 0 0 0 5px var(--blue-soft)' } : {}),
      }}
    >
      Config
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: 'var(--blue)' }}
      >
        <ArrowRight size={15} strokeWidth={2.5} className="text-white" />
      </span>
    </motion.button>
  );
}

// ── V100 — Rangée compacte sur panneau bleu profond ─────────────────────
// Les cinq styles posés sur un panneau bg-deep pour valider le contraste sur
// fond foncé : versions inversées (texte clair, contours translucides).
function V100() {
  const [picked, setPicked] = useState('primaire');
  const ring = (id) =>
    picked === id ? { boxShadow: '0 0 0 2px #fff, 0 0 0 5px rgba(255,255,255,0.25)' } : {};

  return (
    <div className="w-full">
      <div className="bg-deep rounded-[22px] p-6">
        <p
          className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#bcd6f7' }}
        >
          Sur fond profond
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          {/* primaire (blanc plein) */}
          <motion.button
            type="button"
            onClick={() => setPicked('primaire')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="group flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold cursor-pointer"
            style={{ color: 'var(--blue-deep)', ...ring('primaire') }}
          >
            Demander un devis
            <ArrowRight
              size={16}
              strokeWidth={2.3}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>

          {/* secondaire (contour clair translucide) */}
          <motion.button
            type="button"
            onClick={() => setPicked('secondaire')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white cursor-pointer transition-colors duration-300"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.35)',
              ...ring('secondaire'),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Ruler size={16} strokeWidth={2.2} />
            Sur mesure
          </motion.button>

          {/* ghost (texte clair) */}
          <motion.button
            type="button"
            onClick={() => setPicked('ghost')}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-1.5 rounded-2xl px-4 py-3 font-semibold text-white cursor-pointer transition-colors duration-300"
            style={{
              background: picked === 'ghost' ? 'rgba(255,255,255,0.12)' : 'transparent',
              ...ring('ghost'),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                picked === 'ghost' ? 'rgba(255,255,255,0.12)' : 'transparent')
            }
          >
            Détails
            <ChevronRight
              size={15}
              strokeWidth={2.4}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </motion.button>

          {/* pill fléché (pastille blanche) */}
          <motion.button
            type="button"
            onClick={() => setPicked('pill')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="group flex items-center gap-2 rounded-full py-2.5 pl-5 pr-2 font-semibold text-white cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.14)', ...ring('pill') }}
          >
            Configurer
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={15} strokeWidth={2.5} style={{ color: 'var(--blue-deep)' }} />
            </span>
          </motion.button>

          {/* dégradé (cyan->bleu) */}
          <motion.button
            type="button"
            onClick={() => setPicked('degrade')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white cursor-pointer"
            style={{
              background: 'linear-gradient(110deg, #22d3ee, #3b82f6 60%, #1f7ae0)',
              ...ring('degrade'),
            }}
          >
            <Zap size={15} strokeWidth={2.3} />
            Premium
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ── V101 — Rangée à états (idle -> envoi -> validé) ─────────────────────
// Les cinq styles, mais le primaire et le dégradé jouent un cycle d'état au
// clic (envoi puis validé), le reste reste sélectionnable. Démontre le retour.
function V101() {
  const [picked, setPicked] = useState('primaire');
  const [state, setState] = useState('idle'); // idle | sending | done

  const fire = (id) => {
    setPicked(id);
    if (state !== 'idle') return;
    setState('sending');
    setTimeout(() => setState('done'), 900);
    setTimeout(() => setState('idle'), 2400);
  };

  const ring = (id) =>
    picked === id ? { boxShadow: '0 0 0 2px var(--blue), 0 0 0 5px var(--blue-soft)' } : {};

  const Label = () => (
    <AnimatePresence mode="wait" initial={false}>
      {state === 'done' ? (
        <motion.span
          key="done"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2"
        >
          <Check size={17} strokeWidth={2.6} />
          Envoyé
        </motion.span>
      ) : state === 'sending' ? (
        <motion.span
          key="sending"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2"
        >
          <motion.span
            aria-hidden
            className="block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
          />
          Envoi…
        </motion.span>
      ) : (
        <motion.span
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2"
        >
          <FileText size={16} strokeWidth={2.2} />
          Demander un devis
        </motion.span>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full">
      <p className={ROW_LABEL}>Rangée à états</p>
      <div className="flex flex-wrap items-center gap-2.5">
        {/* primaire animé */}
        <motion.button
          type="button"
          onClick={() => fire('primaire')}
          whileTap={{ scale: 0.97 }}
          className="flex min-w-[12rem] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #1f7ae0, #0052a3)',
            boxShadow: '0 12px 26px -14px rgba(0,82,163,0.7)',
            ...ring('primaire'),
          }}
        >
          <Label />
        </motion.button>

        {/* secondaire */}
        <motion.button
          type="button"
          onClick={() => setPicked('secondaire')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue-deep)',
            background: '#fff',
            border: '1.5px solid var(--line)',
            ...ring('secondaire'),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--blue)';
            e.currentTarget.style.background = 'var(--blue-mist)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = picked === 'secondaire' ? 'var(--blue)' : 'var(--line)';
            e.currentTarget.style.background = '#fff';
          }}
        >
          <Ruler size={16} strokeWidth={2.2} />
          Sur mesure
        </motion.button>

        {/* ghost */}
        <motion.button
          type="button"
          onClick={() => setPicked('ghost')}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-1.5 rounded-2xl px-4 py-3 font-semibold cursor-pointer transition-colors duration-300"
          style={{
            color: 'var(--blue)',
            background: picked === 'ghost' ? 'var(--blue-mist)' : 'transparent',
            ...ring('ghost'),
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = picked === 'ghost' ? 'var(--blue-mist)' : 'transparent')
          }
        >
          En savoir plus
          <ChevronRight
            size={15}
            strokeWidth={2.4}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </motion.button>

        {/* pill fléché */}
        <motion.button
          type="button"
          onClick={() => setPicked('pill')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="group flex items-center gap-2 rounded-full py-2.5 pl-5 pr-2 font-semibold cursor-pointer"
          style={{ color: 'var(--blue-deep)', background: 'var(--blue-soft)', ...ring('pill') }}
        >
          Configurer
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ background: 'var(--blue)' }}
          >
            <ArrowRight size={15} strokeWidth={2.5} className="text-white" />
          </span>
        </motion.button>

        {/* dégradé animé */}
        <motion.button
          type="button"
          onClick={() => fire('degrade')}
          whileTap={{ scale: 0.97 }}
          className="flex min-w-[12rem] items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white cursor-pointer"
          style={{
            background: 'linear-gradient(110deg, #0891b2, #1f7ae0 55%, #0052a3)',
            boxShadow: '0 12px 26px -14px rgba(8,82,163,0.6)',
            ...ring('degrade'),
          }}
        >
          <Label />
        </motion.button>
      </div>
      <p className="mt-3 text-sm" style={{ color: 'var(--blue)' }}>
        Cliquez le primaire ou le dégradé : envoi → validé.
      </p>
    </div>
  );
}

export const variants = [
  {
    n: 97,
    label: 'Panel classique',
    note: 'Les cinq rôles alignés, sélection mise en avant et flèches qui glissent.',
    Component: V97,
  },
  {
    n: 98,
    label: 'Empilé pleine largeur',
    note: 'Hiérarchie verticale avec balayage lumineux sur le bouton plein.',
    Component: V98,
  },
  {
    n: 99,
    label: 'Magnétiques',
    note: 'Chaque bouton suit le curseur (effet aimant) avec retour ressort.',
    Component: V99,
  },
  {
    n: 100,
    label: 'Sur fond profond',
    note: 'Versions inversées posées sur un panneau bleu profond.',
    Component: V100,
  },
  {
    n: 101,
    label: 'Rangée à états',
    note: 'Primaire et dégradé jouent un cycle envoi → validé au clic.',
    Component: V101,
  },
];
