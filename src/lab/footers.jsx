import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Send,
  Check,
  Sparkles,
  ShieldCheck,
  Globe,
  Heart,
} from 'lucide-react';
import { NAV, CONTACT, LOGO } from './data.js';

/*
  CATEGORY: FOOTER (bas de page + phrase de signature)
  5 footers sur fond bleu profond (.bg-deep), blanc & bleu uniquement.
  Marque, colonnes de navigation, contact, ligne de signature,
  "© 2026 SPORT AIR EVENT" et la mention "Site créé par SwitzerWeb".
  Interactions: liens actifs surlignés, accordéons mobiles, newsletter
  avec état envoyé, sélection de colonne. Animations transform/opacity.
*/

// Helpers ────────────────────────────────────────────────────────────────
const PRODUCTS = NAV.find((n) => n.children)?.children ?? [];
const SIMPLE = NAV.filter((n) => !n.children).map((n) => n.label);

// ── V62 — Pleine largeur, 4 colonnes, barre signature ──────────────────────
// Marque à gauche, trois colonnes de liens à droite; chaque lien se surligne
// au survol/clic. Barre du bas avec copyright et signature SwitzerWeb.
function V62() {
  const [active, setActive] = useState(null);
  const cols = [
    { title: 'Produits', items: PRODUCTS.slice(0, 5) },
    { title: 'Société', items: ['À propos', 'Réalisations', 'Conception suisse', 'Garantie 5 ans'] },
    { title: 'Liens', items: SIMPLE },
  ];
  return (
    <div className="bg-deep w-full overflow-hidden rounded-[22px] text-white">
      <div className="px-6 pt-8 pb-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="max-w-[200px]">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO}
                alt="Sport Air Event"
                className="h-9 w-9 rounded-xl object-cover"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
              <span className="font-display text-[1.05rem] font-bold leading-tight">
                Sport Air<br />Event
              </span>
            </div>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-white/65">
              Structures gonflables premium, conçues en Suisse pour vos événements.
            </p>
            <div
              className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-semibold"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <ShieldCheck size={13} strokeWidth={2.4} />
              Garantie 5 ans
            </div>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-6 sm:max-w-[300px] sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="mb-2.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">
                  {c.title}
                </p>
                <ul className="space-y-1.5">
                  {c.items.map((it) => {
                    const id = c.title + it;
                    const on = active === id;
                    return (
                      <li key={it}>
                        <button
                          type="button"
                          onClick={() => setActive(on ? null : id)}
                          className="group relative inline-flex max-w-full cursor-pointer items-center text-left text-[0.82rem] leading-snug transition-colors"
                          style={{ color: on ? '#fff' : 'rgba(255,255,255,0.7)' }}
                        >
                          <motion.span
                            aria-hidden
                            className="absolute -left-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
                            style={{ background: 'var(--blue-bright)' }}
                            animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                          />
                          <span className="truncate group-hover:text-white">{it}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature bar */}
      <div
        className="flex flex-col items-center gap-2 px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
      >
        <p className="text-[0.78rem] text-white/55">© 2026 SPORT AIR EVENT</p>
        <p className="text-[0.78rem] text-white/55">
          Site créé par{' '}
          <span className="font-semibold" style={{ color: 'var(--blue-bright)' }}>
            SwitzerWeb
          </span>
        </p>
      </div>
    </div>
  );
}

// ── V63 — Newsletter en vedette + contact ──────────────────────────────────
// Bloc d'inscription newsletter interactif (état envoyé) au-dessus, rangée
// de contacts cliquables, puis ligne de copyright/signature centrée.
function V63() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };
  const contacts = [
    { icon: Mail, label: CONTACT.email, sub: 'Écrivez-nous' },
    { icon: Phone, label: '+41 77 483 51 90', sub: 'WhatsApp' },
    { icon: MapPin, label: 'Suisse romande', sub: 'Conception suisse' },
  ];
  return (
    <div className="bg-deep w-full overflow-hidden rounded-[22px] px-6 py-8 text-white">
      {/* Brand row */}
      <div className="flex items-center gap-2.5">
        <img
          src={LOGO}
          alt="Sport Air Event"
          className="h-9 w-9 rounded-xl object-cover"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />
        <span className="font-display text-[1.1rem] font-bold">Sport Air Event</span>
      </div>

      {/* Newsletter */}
      <div
        className="mt-5 rounded-[18px] p-4"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <p className="flex items-center gap-1.5 font-display text-[0.98rem] font-semibold">
          <Sparkles size={15} style={{ color: 'var(--blue-bright)' }} strokeWidth={2.3} />
          Restez informé
        </p>
        <p className="mt-1 text-[0.8rem] text-white/60">
          Nouveautés et inspirations événementielles.
        </p>
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-2 rounded-xl px-3 py-3 text-[0.85rem] font-medium"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: 'var(--blue-bright)' }}
              >
                <Check size={14} strokeWidth={3} />
              </span>
              Inscription confirmée, merci !
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-[0.85rem] text-white outline-none placeholder:text-white/40"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)' }}
              />
              <motion.button
                type="submit"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-xl px-3.5"
                style={{ background: 'linear-gradient(135deg, #2f8cf0, #0066cc)' }}
                aria-label="S'inscrire"
              >
                <Send size={17} strokeWidth={2.3} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Contacts */}
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {contacts.map(({ icon: Icon, label, sub }) => (
          <motion.button
            key={label}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="group flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <Icon size={15} style={{ color: 'var(--blue-bright)' }} strokeWidth={2.2} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.78rem] font-semibold">{label}</span>
              <span className="block text-[0.68rem] text-white/50">{sub}</span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Signature */}
      <div
        className="mt-6 flex flex-col items-center gap-1 pt-4 text-center text-[0.78rem] text-white/55"
        style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
      >
        <p>© 2026 SPORT AIR EVENT</p>
        <p>
          Site créé par{' '}
          <span className="font-semibold" style={{ color: 'var(--blue-bright)' }}>
            SwitzerWeb
          </span>
        </p>
      </div>
    </div>
  );
}

// ── V64 — Accordéons repliables (mobile-first) ─────────────────────────────
// Marque + accroche en haut; colonnes de liens en accordéons ouvrables un à
// un. Bandeau signature avec copyright et SwitzerWeb mis en avant.
function V64() {
  const [open, setOpen] = useState('Produits');
  const sections = [
    { title: 'Produits', items: PRODUCTS },
    { title: 'Navigation', items: SIMPLE },
    { title: 'Contact', items: [CONTACT.email, '+41 77 483 51 90', 'Suisse romande'] },
  ];
  return (
    <div className="bg-deep w-full overflow-hidden rounded-[22px] text-white">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2.5">
          <img
            src={LOGO}
            alt="Sport Air Event"
            className="h-9 w-9 rounded-xl object-cover"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <span className="font-display text-[1.1rem] font-bold">Sport Air Event</span>
        </div>
        <p className="mt-3 max-w-[340px] text-[0.84rem] leading-relaxed text-white/65">
          L'inflatable premium, blanc &amp; bleu, conçu en Suisse pour marquer vos
          événements sportifs et professionnels.
        </p>

        {/* Accordions */}
        <div className="mt-5 space-y-1">
          {sections.map((s) => {
            const on = open === s.title;
            return (
              <div key={s.title} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : s.title)}
                  className="flex w-full cursor-pointer items-center justify-between py-3 text-left"
                >
                  <span className="font-display text-[0.95rem] font-semibold">{s.title}</span>
                  <motion.span animate={{ rotate: on ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={18} className="text-white/60" strokeWidth={2.2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 pb-3 pl-1">
                        {s.items.map((it) => (
                          <li key={it}>
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="group inline-flex items-center gap-1.5 text-[0.82rem] text-white/65 transition-colors hover:text-white"
                            >
                              <ChevronRight
                                size={13}
                                strokeWidth={2.4}
                                style={{ color: 'var(--blue-bright)' }}
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                              />
                              <span className="truncate">{it}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Signature band */}
      <div
        className="flex flex-col items-center gap-1.5 px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="text-[0.78rem] text-white/55">© 2026 SPORT AIR EVENT</p>
        <p className="inline-flex items-center gap-1.5 text-[0.78rem] text-white/55">
          <Globe size={13} strokeWidth={2.2} style={{ color: 'var(--blue-bright)' }} />
          Site créé par{' '}
          <span className="font-semibold" style={{ color: 'var(--blue-bright)' }}>
            SwitzerWeb
          </span>
        </p>
      </div>
    </div>
  );
}

// ── V65 — Marque XL + grand CTA, signature en bas ─────────────────────────
// Wordmark surdimensionné, bouton "Demander un devis" interactif, mini-nav
// horizontale sélectionnable, puis ligne signature avec coeur SwitzerWeb.
function V65() {
  const [tab, setTab] = useState('Accueil');
  const [sent, setSent] = useState(false);
  const links = ['Accueil', ...SIMPLE.filter((s) => s !== 'Accueil'), 'Produits'];
  return (
    <div className="bg-deep relative w-full overflow-hidden rounded-[22px] px-6 py-8 text-white">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(47,140,240,0.35), transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative">
        <p className="kicker text-white/55">Prêt à marquer les esprits ?</p>
        <h3 className="font-display mt-2 text-[2rem] font-bold leading-[0.95] tracking-tight sm:text-[2.4rem]">
          SPORT AIR
          <br />
          <span style={{ color: 'var(--blue-bright)' }}>EVENT</span>
        </h3>

        <motion.button
          type="button"
          onClick={() => setSent(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          className="group mt-5 inline-flex cursor-pointer items-center gap-2.5 rounded-full px-5 py-3 font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #2f8cf0, #0052a3)',
            boxShadow: '0 12px 28px -12px rgba(0,82,163,0.8)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check size={18} strokeWidth={2.7} />
                Demande envoyée
              </motion.span>
            ) : (
              <motion.span
                key="ask"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                Demander un devis
                <ArrowRight
                  size={17}
                  strokeWidth={2.3}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mini nav */}
        <div className="mt-6 flex flex-wrap gap-2">
          {links.map((l) => {
            const on = tab === l;
            return (
              <motion.button
                key={l}
                type="button"
                onClick={() => setTab(l)}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-full px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors"
                style={{
                  background: on ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.05)',
                  color: on ? '#fff' : 'rgba(255,255,255,0.6)',
                  border: on
                    ? '1px solid rgba(255,255,255,0.28)'
                    : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {l}
              </motion.button>
            );
          })}
        </div>

        {/* Signature */}
        <div
          className="mt-7 flex flex-col items-start gap-1.5 pt-4 text-[0.78rem] text-white/55"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <p>© 2026 SPORT AIR EVENT</p>
          <p className="inline-flex items-center gap-1.5">
            <span>Site créé avec</span>
            <Heart size={12} strokeWidth={2.4} style={{ color: 'var(--blue-bright)' }} />
            <span>
              par{' '}
              <span className="font-semibold" style={{ color: 'var(--blue-bright)' }}>
                SwitzerWeb
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── V66 — Compact deux colonnes + sélecteur de contact ─────────────────────
// Colonne marque/contact à gauche avec onglets de contact qui changent la
// ligne d'action; colonne liens à droite. Ruban signature inférieur épuré.
function V66() {
  const [mode, setMode] = useState('email');
  const modes = {
    email: { icon: Mail, value: CONTACT.email, cta: 'Envoyer un email' },
    phone: { icon: Phone, value: '+41 77 483 51 90', cta: 'Appeler / WhatsApp' },
    place: { icon: MapPin, value: 'Suisse romande', cta: 'Voir la zone' },
  };
  const cur = modes[mode];
  const CurIcon = cur.icon;
  return (
    <div className="bg-deep w-full overflow-hidden rounded-[22px] text-white">
      <div className="grid grid-cols-1 gap-6 px-6 pt-8 pb-6 sm:grid-cols-[1.1fr_0.9fr]">
        {/* Left: brand + contact switcher */}
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={LOGO}
              alt="Sport Air Event"
              className="h-9 w-9 rounded-xl object-cover"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <span className="font-display text-[1.05rem] font-bold">Sport Air Event</span>
          </div>

          <div className="mt-4 flex gap-1.5">
            {Object.entries(modes).map(([k, m]) => {
              const Icon = m.icon;
              const on = mode === k;
              return (
                <motion.button
                  key={k}
                  type="button"
                  onClick={() => setMode(k)}
                  whileTap={{ scale: 0.94 }}
                  aria-label={k}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors"
                  style={{
                    background: on ? 'var(--blue-bright)' : 'rgba(255,255,255,0.08)',
                    border: on
                      ? '1px solid var(--blue-bright)'
                      : '1px solid rgba(255,255,255,0.14)',
                  }}
                >
                  <Icon size={16} strokeWidth={2.3} className="text-white" />
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-3"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-white/45">Contact</p>
              <p className="mt-1 truncate text-[0.92rem] font-semibold">{cur.value}</p>
              <button
                type="button"
                className="group mt-2 inline-flex cursor-pointer items-center gap-1.5 text-[0.8rem] font-medium"
                style={{ color: 'var(--blue-bright)' }}
              >
                <CurIcon size={14} strokeWidth={2.3} />
                {cur.cta}
                <ArrowUpRight
                  size={14}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: links */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-1">
          <div>
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">
              Produits
            </p>
            <ul className="space-y-1.5">
              {PRODUCTS.slice(0, 4).map((p) => (
                <li key={p}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-block max-w-full truncate text-[0.82rem] text-white/65 transition-colors hover:text-white"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">
              Société
            </p>
            <ul className="space-y-1.5">
              {SIMPLE.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-block text-[0.82rem] text-white/65 transition-colors hover:text-white"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Signature ribbon */}
      <div
        className="flex flex-col items-center gap-1 px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
      >
        <p className="text-[0.78rem] text-white/55">© 2026 SPORT AIR EVENT</p>
        <p className="text-[0.78rem] text-white/55">
          Site créé par{' '}
          <span className="font-semibold" style={{ color: 'var(--blue-bright)' }}>
            SwitzerWeb
          </span>
        </p>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 62,
    label: 'Pleine largeur 4 colonnes',
    note: 'Marque à gauche, trois colonnes de liens surlignables, barre signature.',
    Component: V62,
  },
  {
    n: 63,
    label: 'Newsletter vedette',
    note: 'Inscription newsletter avec état envoyé et rangée de contacts cliquables.',
    Component: V63,
  },
  {
    n: 64,
    label: 'Accordéons mobiles',
    note: 'Sections de liens repliables une à une, idéal petit écran.',
    Component: V64,
  },
  {
    n: 65,
    label: 'Wordmark XL + CTA',
    note: 'Grande marque, bouton devis interactif et mini-nav sélectionnable.',
    Component: V65,
  },
  {
    n: 66,
    label: 'Compact + sélecteur contact',
    note: 'Deux colonnes; onglets de contact qui changent la ligne d\'action.',
    Component: V66,
  },
];
