import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Globe } from 'lucide-react';
import { LOGO, CONTACT, FOOTER_NAV, FOOTER_PRODUCTS } from '../data/site.js';

export default function Footer() {
  const [open, setOpen] = useState('Produits');

  // Accordion sections wired to the real footer data. Each item carries its
  // own link kind so we render the right element (React-Router Link, mailto,
  // external WhatsApp, or plain text) while keeping the V64 row visual.
  const sections = [
    {
      title: 'Produits',
      items: FOOTER_PRODUCTS.map((l) => ({ kind: 'route', to: l.to, label: l.label })),
    },
    {
      title: 'Navigation',
      items: FOOTER_NAV.map((l) => ({ kind: 'route', to: l.to, label: l.label })),
    },
    {
      title: 'Contact',
      items: [
        { kind: 'mailto', href: `mailto:${CONTACT.email}`, label: CONTACT.email },
        { kind: 'external', href: CONTACT.whatsapp, label: 'WhatsApp' },
        { kind: 'text', label: 'Suisse 🇨🇭' },
      ],
    },
  ];

  const itemInnerCls =
    'group inline-flex items-center gap-1.5 text-[0.82rem] text-white/65 transition-colors hover:text-white';
  const chevron = (
    <ChevronRight
      size={13}
      strokeWidth={2.4}
      style={{ color: 'var(--blue-bright)' }}
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    />
  );

  return (
    <footer className="bg-deep overflow-x-clip w-full text-white">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-2.5">
          <img
            src={LOGO}
            alt="SPORT AIR EVENT"
            className="h-9 w-9 rounded-xl object-contain brightness-0 invert opacity-90"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <span className="font-display text-[1.1rem] font-bold">Sport Air Event</span>
        </div>
        <p className="mt-3 max-w-[340px] text-[0.84rem] leading-relaxed text-white/65">
          Structures gonflables événementielles premium. Conception Suisse 🇨🇭
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
                          <li key={it.label}>
                            {it.kind === 'route' && (
                              <Link to={it.to} className={itemInnerCls}>
                                {chevron}
                                <span className="truncate">{it.label}</span>
                              </Link>
                            )}
                            {it.kind === 'mailto' && (
                              <a href={it.href} className={itemInnerCls}>
                                {chevron}
                                <span className="truncate">{it.label}</span>
                              </a>
                            )}
                            {it.kind === 'external' && (
                              <a
                                href={it.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={itemInnerCls}
                              >
                                {chevron}
                                <span className="truncate">{it.label}</span>
                              </a>
                            )}
                            {it.kind === 'text' && (
                              <span className={itemInnerCls}>
                                {chevron}
                                <span className="truncate">{it.label}</span>
                              </span>
                            )}
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
        <div className="max-w-6xl mx-auto flex w-full flex-col items-center gap-1.5 sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[0.78rem] text-white/55">© 2026 SPORT AIR EVENT. Tous droits réservés.</p>
          <Link
            to="/cgv"
            className="text-[0.78rem] text-white/55 transition-colors hover:text-white"
          >
            Conditions Générales de Vente
          </Link>
          <a
            href="https://switzerweb.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.78rem] text-white/55 transition-colors hover:text-white"
          >
            <Globe size={13} strokeWidth={2.2} style={{ color: 'var(--blue-bright)' }} />
            Site créé par{' '}
            <span className="font-semibold" style={{ color: 'var(--blue-bright)' }}>
              SwitzerWeb
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
