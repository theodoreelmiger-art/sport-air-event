import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Menu, X, Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { LOGO, PRODUCT_LINKS } from '../data/site.js';
import { useLang, useT } from '../lib/i18n.jsx';

const EASE = [0.22, 1, 0.36, 1];

// EN labels for the product names rendered from PRODUCT_LINKS (../data/site.js).
const PRODUCT_EN = {
  'Tente Spider': 'Spider Tent',
  'Tente Sur Mesure': 'Custom-Made Tent',
  'Arches Gonflables': 'Inflatable Arches',
  'Arches Sur Mesure': 'Custom-Made Arches',
  'Colonnes Gonflables': 'Inflatable Columns',
  'Colonnes Sur Mesure': 'Custom-Made Columns',
  'Mobilier Gonflable': 'Inflatable Furniture',
};

export default function Header() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [deskProd, setDeskProd] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

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
    closeT.current = setTimeout(() => setDeskProd(false), 110);
  };

  // Outside-click + Escape close for the "Produits" dropdown.
  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setDeskProd(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setDeskProd(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
      cancelClose();
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setProdOpen(false);
    setDeskProd(false);
    setLangOpen(false);
  }, [location.pathname]);

  const isProductActive = PRODUCT_LINKS.some((p) => p.to === location.pathname);

  // Hover / focus / click open behaviour for the centered "Produits" dropdown.
  const wrapProps = {
    ref: wrapRef,
    onMouseEnter: () => {
      cancelClose();
      setDeskProd(true);
    },
    onMouseLeave: scheduleClose,
    onFocus: () => {
      cancelClose();
      setDeskProd(true);
    },
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setDeskProd(false);
    },
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 16,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'calc(100% - 48px)',
          maxWidth: 1100,
          zIndex: 1000,
        }}
      >
        <nav
          className="flex items-center gap-2 sm:gap-3 pl-3 pr-2 py-2 rounded-full overflow-x-clip"
          style={{
            background: '#fff',
            border: '1px solid var(--line)',
            boxShadow: '0 14px 40px -20px rgba(11,28,63,0.25)',
          }}
        >
          {/* Logo */}
          <div className="shrink-0" style={{ width: 120 }}>
            <Link className="flex items-center select-none" to="/Home">
              <img
                src={LOGO}
                alt="SPORT AIR EVENT"
                style={{ height: 30, width: 'auto', objectFit: 'contain' }}
              />
            </Link>
          </div>

          {/* Desktop centered nav group */}
          <div className="hidden lg:flex items-center gap-4 mx-auto">
            <Link
              to="/Home"
              className="relative px-1 py-1 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                fontSize: '0.9rem',
                fontWeight: isActive('/Home', location) ? 600 : 500,
                color: isActive('/Home', location) ? 'var(--blue-deep)' : 'var(--ink)',
              }}
            >
              {t('Accueil', 'Home')}
            </Link>

            {/* "Produits" — NOT a link. Dropdown opens directly below, centered. */}
            <div className="relative" {...wrapProps}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={deskProd}
                onClick={() => setDeskProd((v) => !v)}
                className="flex items-center gap-1 px-1 py-1 cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: deskProd || isProductActive ? 600 : 500,
                  color: deskProd || isProductActive ? 'var(--blue-deep)' : 'var(--ink)',
                }}
              >
                {t('Produits', 'Products')}
                <motion.span animate={{ rotate: deskProd ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
                </motion.span>
              </button>

              <AnimatePresence>
                {deskProd && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    role="menu"
                    aria-label={t('Produits', 'Products')}
                    className="absolute top-full left-0 z-30 pt-3"
                    style={{ width: 268 }}
                  >
                    <div
                      className="rounded-[22px] overflow-hidden"
                      style={{
                        background: '#fff',
                        border: '1px solid var(--line)',
                        boxShadow: '0 18px 50px -22px rgba(11,28,63,0.28)',
                      }}
                    >
                      {/* little caret — directly under the "Produits" label */}
                      <div
                        className="absolute"
                        style={{
                          top: 6,
                          left: 34,
                          width: 14,
                          height: 14,
                          background: '#fff',
                          borderTop: '1px solid var(--line)',
                          borderLeft: '1px solid var(--line)',
                          transform: 'rotate(45deg)',
                        }}
                      />
                      <div
                        className="px-4 pt-3 pb-2 kicker relative"
                        style={{ background: 'var(--blue-mist)' }}
                      >
                        {t('Nos produits', 'Our products')}
                      </div>
                      <ul className="p-1.5">
                        {PRODUCT_LINKS.map((p, i) => {
                          const active = location.pathname === p.to;
                          return (
                            <li key={p.to}>
                              <Link
                                to={p.to}
                                role="menuitem"
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-left transition-colors group/item"
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
                                    <span className="font-display tabular-nums" style={{ fontSize: '0.7rem' }}>
                                      {String(i + 1).padStart(2, '0')}
                                    </span>
                                  )}
                                </span>
                                <span
                                  className="flex-1 leading-tight"
                                  style={{ fontSize: '0.88rem', fontWeight: active ? 600 : 500 }}
                                >
                                  {t(p.label, PRODUCT_EN[p.label] || p.label)}
                                </span>
                                <ArrowUpRight
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: active ? 'var(--blue)' : 'var(--line)' }}
                                  strokeWidth={2.4}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/About"
              className="relative px-1 py-1 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                fontSize: '0.9rem',
                fontWeight: isActive('/About', location) ? 600 : 500,
                color: isActive('/About', location) ? 'var(--blue-deep)' : 'var(--ink)',
              }}
            >
              {t('À propos', 'About')}
            </Link>
            <Link
              to="/Contact"
              className="relative px-1 py-1 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                fontSize: '0.9rem',
                fontWeight: isActive('/Contact', location) ? 600 : 500,
                color: isActive('/Contact', location) ? 'var(--blue-deep)' : 'var(--ink)',
              }}
            >
              Contact
            </Link>
          </div>

          {/* Desktop right controls: FR + Devis CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer transition-opacity hover:opacity-80"
                style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)' }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'EN' : 'FR'}</span>
                <ChevronDown
                  className={`w-3 h-3 opacity-60 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-40 py-1.5 text-left"
                  style={{
                    borderRadius: 16,
                    background: '#fff',
                    border: '1px solid var(--line)',
                    boxShadow: '0 18px 50px -22px rgba(11,28,63,0.28)',
                  }}
                >
                  {[
                    { code: 'fr', label: '🇫🇷 Français' },
                    { code: 'en', label: '🇬🇧 English' },
                  ].map((o) => (
                    <button
                      key={o.code}
                      type="button"
                      onClick={() => { setLang(o.code); setLangOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-[var(--blue-mist)]"
                      style={{ color: lang === o.code ? 'var(--blue-deep)' : 'var(--ink-2)' }}
                    >
                      <span>{o.label}</span>
                      {lang === o.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/Contact" className="shrink-0">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer"
                style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}
              >
                {t('Demander un devis', 'Request a quote')}
                <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
              </motion.span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center ml-auto cursor-pointer"
            aria-label={t('Menu', 'Menu')}
            style={{ width: 40, height: 40, borderRadius: '50%', color: 'var(--ink)' }}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[999]"
          style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen gap-1 px-8 text-center">
            <Link to="/Home" className="py-3 text-lg font-medium" style={{ color: 'var(--ink)' }}>
              {t('Accueil', 'Home')}
            </Link>
            <button
              type="button"
              className="py-3 text-lg font-medium flex items-center gap-1 cursor-pointer"
              style={{ color: 'var(--ink)' }}
              onClick={() => setProdOpen((v) => !v)}
            >
              {t('Produits', 'Products')} <ChevronDown className={`w-4 h-4 transition-transform ${prodOpen ? 'rotate-180' : ''}`} />
            </button>
            {prodOpen &&
              PRODUCT_LINKS.map((p) => (
                <Link key={p.to} to={p.to} className="py-2 text-base" style={{ color: 'var(--ink-2)' }}>
                  {t(p.label, PRODUCT_EN[p.label] || p.label)}
                </Link>
              ))}
            <Link to="/About" className="py-3 text-lg font-medium" style={{ color: 'var(--ink)' }}>
              {t('À propos', 'About')}
            </Link>
            <Link to="/Contact" className="py-3 text-lg font-medium" style={{ color: 'var(--ink)' }}>
              Contact
            </Link>
            <Link
              to="/Contact"
              className="mt-4 inline-flex items-center gap-1.5 text-white font-semibold rounded-full px-6 py-3"
              style={{ background: 'var(--blue)' }}
            >
              {t('Demander un devis', 'Request a quote')}
              <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function isActive(path, location) {
  return location.pathname === path;
}
