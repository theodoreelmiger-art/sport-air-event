import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Menu, ArrowRight, ArrowUpRight, Check,
  Package, Sparkles, Phone,
} from 'lucide-react';
import { NAV, LOGO } from './data.js';

const EASE = [0.22, 1, 0.36, 1];

/* The "Produits" item is index 1 in NAV; its sub-items live in .children. */
const PRODUITS = NAV[1];
const PRODUCTS = PRODUITS.children;

/* ── Shared logo lockup ─────────────────────────────────────────────── */
function Logo({ size = 30, tone = 'ink' }) {
  return (
    <div className="flex items-center gap-2 shrink-0 select-none">
      <img
        src={LOGO}
        alt="Sport Air Event"
        style={{
          height: size,
          width: 'auto',
          mixBlendMode: 'multiply',
          WebkitMaskImage:
            'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)',
          maskImage:
            'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)',
          clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
        }}
      />
      <span
        className="font-display leading-none hidden sm:block"
        style={{
          fontSize: '0.98rem',
          letterSpacing: '-0.02em',
          color: tone === 'light' ? '#fff' : 'var(--ink)',
        }}
      >
        Sport Air Event
      </span>
    </div>
  );
}

/* ── Shared dropdown panel (centered under the trigger) ─────────────────
   The wrapper that uses this MUST be `relative`. The panel is absolutely
   positioned, centered horizontally with left-1/2 + -translate-x-1/2, and
   anchored DIRECTLY BELOW (top-full) the "Produits" button. */
function ProduitsPanel({ open, sel, setSel, width = 268 }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: EASE }}
          role="menu"
          aria-label="Produits"
          className="absolute top-full left-1/2 z-30 pt-3"
          style={{ width, transform: 'translateX(-50%)' }}
        >
          <div
            className="rounded-[22px] overflow-hidden"
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              boxShadow: '0 18px 50px -22px rgba(11,28,63,0.28)',
            }}
          >
            {/* little caret */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: 6,
                width: 14,
                height: 14,
                background: '#fff',
                borderTop: '1px solid var(--line)',
                borderLeft: '1px solid var(--line)',
                transform: 'translateX(-50%) rotate(45deg)',
              }}
            />
            <div
              className="px-4 pt-3 pb-2 kicker relative"
              style={{ background: 'var(--blue-mist)' }}
            >
              Nos produits
            </div>
            <ul className="p-1.5">
              {PRODUCTS.map((p, i) => {
                const active = sel === p;
                return (
                  <li key={p}>
                    <motion.button
                      type="button"
                      role="menuitem"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSel(p)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-left transition-colors"
                      style={{
                        background: active ? 'var(--blue-soft)' : 'transparent',
                        color: active ? 'var(--blue-deep)' : 'var(--ink)',
                      }}
                    >
                      <span
                        className="grid place-items-center rounded-lg shrink-0"
                        style={{
                          width: 26,
                          height: 26,
                          background: active ? 'var(--blue)' : 'var(--blue-mist)',
                          color: active ? '#fff' : 'var(--blue)',
                        }}
                      >
                        {active ? (
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        ) : (
                          <span
                            className="font-display tabular-nums"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        )}
                      </span>
                      <span
                        className="flex-1 leading-tight"
                        style={{ fontSize: '0.88rem', fontWeight: active ? 600 : 500 }}
                      >
                        {p}
                      </span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: active ? 'var(--blue)' : 'var(--line)' }}
                        strokeWidth={2.4}
                      />
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hover/focus/click open behaviour, with a11y + outside-click close ── */
function useDropdown(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  const wrapRef = useRef(null);
  const closeT = useRef(null);

  const cancelClose = () => {
    if (closeT.current) {
      clearTimeout(closeT.current);
      closeT.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeT.current = setTimeout(() => setOpen(false), 110);
  };

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
      cancelClose();
    };
  }, []);

  /* Props for the relative wrapper around button + panel. */
  const wrapProps = {
    ref: wrapRef,
    onMouseEnter: () => {
      cancelClose();
      setOpen(true);
    },
    onMouseLeave: scheduleClose,
    onFocus: () => {
      cancelClose();
      setOpen(true);
    },
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
    },
  };
  const toggle = () => setOpen((o) => !o);
  return { open, setOpen, toggle, wrapProps };
}

/* A small reusable text nav-link (non-Produits items). */
function NavLink({ children, active, tone = 'ink' }) {
  const color =
    tone === 'light'
      ? active
        ? '#fff'
        : 'rgba(255,255,255,0.72)'
      : active
      ? 'var(--blue-deep)'
      : 'var(--ink)';
  return (
    <button
      type="button"
      className="relative px-1 py-1 cursor-pointer transition-opacity hover:opacity-80"
      style={{ fontSize: '0.9rem', fontWeight: active ? 600 : 500, color }}
    >
      {children}
    </button>
  );
}

/* The "Produits" trigger button — shared shape, themeable. */
function ProduitsTrigger({ open, onClick, tone = 'ink' }) {
  const lightTone = tone === 'light';
  const c = lightTone ? '#fff' : open ? 'var(--blue-deep)' : 'var(--ink)';
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={onClick}
      className="flex items-center gap-1 px-1 py-1 cursor-pointer transition-opacity hover:opacity-80"
      style={{ fontSize: '0.9rem', fontWeight: open ? 600 : 500, color: c }}
    >
      Produits
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
      </motion.span>
    </button>
  );
}

/* Shared "page frame" so each navbar sits on a small mock page. */
function Stage({ children, tint = 'var(--blue-mist)' }) {
  return (
    <div
      className="rounded-[22px] p-3 sm:p-4"
      style={{ background: tint, border: '1px solid var(--line)' }}
    >
      {children}
      <div className="px-1 pt-5 pb-2">
        <div
          className="h-2 rounded-full mb-2.5"
          style={{ background: 'var(--line)', width: '52%' }}
        />
        <div
          className="h-2 rounded-full"
          style={{ background: 'var(--line)', width: '34%' }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   #31 — Floating pill navbar
   ════════════════════════════════════════════════════════════════════ */
function V31() {
  const { open, toggle, wrapProps } = useDropdown(true);
  const [sel, setSel] = useState(PRODUCTS[0]);
  return (
    <Stage tint="var(--blue-soft)">
      <div className="flex justify-center pt-2">
        <nav
          className="flex items-center gap-2 sm:gap-3 pl-3 pr-2 py-2 rounded-full w-full"
          style={{
            background: '#fff',
            border: '1px solid var(--line)',
            boxShadow: '0 14px 40px -20px rgba(11,28,63,0.25)',
          }}
        >
          <Logo size={26} />
          <div className="hidden md:flex items-center gap-4 mx-auto">
            <NavLink>{NAV[0].label}</NavLink>
            <div className="relative" {...wrapProps}>
              <ProduitsTrigger open={open} onClick={toggle} />
              <ProduitsPanel open={open} sel={sel} setSel={setSel} />
            </div>
            <NavLink>{NAV[2].label}</NavLink>
          </div>
          {/* compact menu for narrow widths keeps Produits reachable */}
          <div className="md:hidden relative mx-auto" {...wrapProps}>
            <ProduitsTrigger open={open} onClick={toggle} />
            <ProduitsPanel open={open} sel={sel} setSel={setSel} width={240} />
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer shrink-0"
            style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}
          >
            Devis
            <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
          </motion.button>
        </nav>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════════════
   #32 — Full-width solid bar
   ════════════════════════════════════════════════════════════════════ */
function V32() {
  const { open, toggle, wrapProps } = useDropdown(true);
  const [sel, setSel] = useState(PRODUCTS[0]);
  return (
    <Stage tint="var(--blue-mist)">
      <nav
        className="rounded-2xl"
        style={{ background: '#fff', border: '1px solid var(--line)' }}
      >
        <div className="flex items-center gap-3 px-3.5 sm:px-5 py-3">
          <Logo size={28} />
          <div className="hidden md:flex items-center gap-5 mx-auto">
            <NavLink>{NAV[0].label}</NavLink>
            <div className="relative" {...wrapProps}>
              <ProduitsTrigger open={open} onClick={toggle} />
              <ProduitsPanel open={open} sel={sel} setSel={setSel} width={280} />
            </div>
            <NavLink>{NAV[2].label}</NavLink>
            <NavLink>{NAV[3].label}</NavLink>
          </div>
          <div className="md:hidden relative mx-auto" {...wrapProps}>
            <ProduitsTrigger open={open} onClick={toggle} />
            <ProduitsPanel open={open} sel={sel} setSel={setSel} width={240} />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="hidden sm:grid place-items-center w-9 h-9 rounded-full cursor-pointer transition-colors hover:opacity-90"
              style={{ border: '1px solid var(--line)', color: 'var(--blue)', background: 'var(--blue-mist)' }}
              aria-label="Appeler"
            >
              <Phone className="w-4 h-4" strokeWidth={2.2} />
            </button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-xl cursor-pointer"
              style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Demander un devis
            </motion.button>
          </div>
        </div>
        <div className="h-px" style={{ background: 'var(--line)' }} />
        <div className="px-5 py-2 flex items-center gap-2" style={{ fontSize: '0.74rem', color: 'var(--ink-2)' }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--blue)' }} strokeWidth={2.2} />
          Conception suisse · Livraison Europe · Garantie 5 ans
        </div>
      </nav>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════════════
   #33 — Soft tinted "glass" bar (NO real glassmorphism — solid tint)
   ════════════════════════════════════════════════════════════════════ */
function V33() {
  const { open, toggle, wrapProps } = useDropdown(true);
  const [sel, setSel] = useState(PRODUCTS[0]);
  return (
    <Stage tint="#fff">
      <nav
        className="rounded-[22px] px-3.5 sm:px-5 py-3 flex items-center gap-3"
        style={{
          background: 'var(--blue-mist)',
          border: '1px solid var(--blue-soft)',
        }}
      >
        <Logo size={28} />
        <div className="hidden md:flex items-center gap-1.5 mx-auto">
          {[NAV[0].label, null, NAV[2].label, NAV[3].label].map((label, idx) =>
            label === null ? (
              <div key="produits" className="relative" {...wrapProps}>
                <span
                  className="flex items-center rounded-full px-3 py-1.5 transition-colors"
                  style={{
                    background: open ? '#fff' : 'transparent',
                    border: open ? '1px solid var(--blue-soft)' : '1px solid transparent',
                  }}
                >
                  <ProduitsTrigger open={open} onClick={toggle} />
                </span>
                <ProduitsPanel open={open} sel={sel} setSel={setSel} width={280} />
              </div>
            ) : (
              <span
                key={label}
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-white"
              >
                <NavLink>{label}</NavLink>
              </span>
            )
          )}
        </div>
        <div className="md:hidden relative mx-auto" {...wrapProps}>
          <ProduitsTrigger open={open} onClick={toggle} />
          <ProduitsPanel open={open} sel={sel} setSel={setSel} width={240} />
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer shrink-0"
          style={{
            background: '#fff',
            color: 'var(--blue-deep)',
            border: '1px solid var(--blue-soft)',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Devis
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
        </motion.button>
      </nav>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════════════
   #34 — Minimal underline navbar
   ════════════════════════════════════════════════════════════════════ */
function V34() {
  const { open, toggle, wrapProps } = useDropdown(true);
  const [sel, setSel] = useState(PRODUCTS[0]);
  return (
    <Stage tint="#fff">
      <nav className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid var(--line)' }}>
        <Logo size={26} />
        <div className="hidden md:flex items-center gap-6 mx-auto">
          <UnderlineLink>{NAV[0].label}</UnderlineLink>
          <div className="relative" {...wrapProps}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={toggle}
              className="flex items-center gap-1 cursor-pointer pb-0.5"
              style={{
                fontSize: '0.9rem',
                fontWeight: open ? 600 : 500,
                color: open ? 'var(--blue-deep)' : 'var(--ink)',
                borderBottom: `2px solid ${open ? 'var(--blue)' : 'transparent'}`,
              }}
            >
              Produits
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
              </motion.span>
            </button>
            <ProduitsPanel open={open} sel={sel} setSel={setSel} width={272} />
          </div>
          <UnderlineLink>{NAV[2].label}</UnderlineLink>
          <UnderlineLink>{NAV[3].label}</UnderlineLink>
        </div>
        <div className="md:hidden relative mx-auto" {...wrapProps}>
          <ProduitsTrigger open={open} onClick={toggle} />
          <ProduitsPanel open={open} sel={sel} setSel={setSel} width={240} />
        </div>
        <button
          type="button"
          className="group flex items-center gap-1.5 cursor-pointer shrink-0"
          style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--blue)' }}
        >
          Devis gratuit
          <motion.span whileHover={{ x: 2 }}>
            <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
          </motion.span>
        </button>
      </nav>
    </Stage>
  );
}

function UnderlineLink({ children }) {
  return (
    <button
      type="button"
      className="relative cursor-pointer pb-0.5 transition-colors"
      style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink)', borderBottom: '2px solid transparent' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--line)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
    >
      {children}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════
   #35 — Centered-logo navbar (split nav, logo in the middle)
   ════════════════════════════════════════════════════════════════════ */
function V35() {
  const { open, toggle, wrapProps } = useDropdown(true);
  const [sel, setSel] = useState(PRODUCTS[0]);
  return (
    <Stage tint="var(--blue-mist)">
      <nav
        className="rounded-2xl px-4 sm:px-5 py-3"
        style={{ background: '#fff', border: '1px solid var(--line)' }}
      >
        {/* desktop: three columns, logo centered */}
        <div className="hidden md:grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          <div className="flex items-center gap-5 justify-start">
            <NavLink>{NAV[0].label}</NavLink>
            <div className="relative" {...wrapProps}>
              <ProduitsTrigger open={open} onClick={toggle} />
              <ProduitsPanel open={open} sel={sel} setSel={setSel} width={278} />
            </div>
          </div>
          <div className="px-4 flex justify-center">
            <Logo size={30} />
          </div>
          <div className="flex items-center gap-5 justify-end">
            <NavLink>{NAV[2].label}</NavLink>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-full cursor-pointer"
              style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.84rem', fontWeight: 600 }}
            >
              Contact
            </motion.button>
          </div>
        </div>

        {/* mobile: logo left, Produits dropdown + menu icon right */}
        <div className="md:hidden flex items-center gap-3">
          <Logo size={26} />
          <div className="relative ml-auto" {...wrapProps}>
            <ProduitsTrigger open={open} onClick={toggle} />
            <ProduitsPanel open={open} sel={sel} setSel={setSel} width={240} />
          </div>
          <button
            type="button"
            className="grid place-items-center w-9 h-9 rounded-full cursor-pointer shrink-0"
            style={{ border: '1px solid var(--line)', color: 'var(--blue)', background: 'var(--blue-mist)' }}
            aria-label="Menu"
          >
            <Menu className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>
      </nav>
    </Stage>
  );
}

export const variants = [
  { n: 31, label: 'Pilule flottante', note: 'Barre arrondie centrée, dropdown Produits sous le bouton', Component: V31 },
  { n: 32, label: 'Barre pleine largeur', note: 'Bandeau solide avec rangée de réassurance, menu déroulant centré', Component: V32 },
  { n: 33, label: 'Teinte douce', note: 'Liens en pastilles, fond bleu très clair, dropdown centré', Component: V33 },
  { n: 34, label: 'Minimal souligné', note: 'Liens soulignés au survol, Produits ouvre un panneau en dessous', Component: V34 },
  { n: 35, label: 'Logo centré', note: 'Nav scindée logo au centre, Produits à gauche déroule dessous', Component: V35 },
];
