import {
  Check,
  Sparkles,
  Printer,
  Shield,
  Box,
  Truck,
  Layers,
  BadgeCheck,
  Plus,
} from 'lucide-react';
import { INCLUDED, PRODUCT_NAME, fmt, EXAMPLE_TOTAL } from './data.js';

// Shared blue palette (no black anywhere)
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#15294a'; // deep blue-ink used instead of black for text

// One lucide icon per included line, in order.
const ICONS = [Printer, Layers, Sparkles, Box, Shield, Truck];

/* =====================================================================
   V15 — Checkmark grid (display-only)
   Soft 2-col grid of tiles, each showing an included line with a static
   blue check. Pure read-only confirmation of what the base price covers —
   nothing here is selectable or toggleable.
   ===================================================================== */
function V15() {
  return (
    <div style={{ color: INK }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker" style={{ color: BLUE }}>
            Inclus dans le prix
          </div>
          <h3
            className="font-display"
            style={{ fontSize: '1.35rem', lineHeight: 1.05, marginTop: 4 }}
          >
            Tout est compris
          </h3>
        </div>
        <div
          className="font-display"
          style={{
            background: BLUE_SOFT,
            color: BLUE_DEEP,
            borderRadius: 9999,
            padding: '6px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {INCLUDED.length}/{INCLUDED.length}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {INCLUDED.map((label) => (
          <div
            key={label}
            className="text-left flex items-start gap-3"
            style={{
              border: `1px solid ${BLUE}`,
              background: BLUE_MIST,
              borderRadius: 18,
              padding: '13px 14px',
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 26,
                height: 26,
                borderRadius: 9999,
                background: BLUE,
                color: '#ffffff',
                marginTop: 1,
              }}
            >
              <Check size={15} strokeWidth={3} />
            </span>
            <span
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.3,
                fontWeight: 600,
                color: INK,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   V16 — Soft badge grid (display-only)
   Pill-shaped badges laid out on a tidy, evenly-spaced grid — uniform
   sizing, aligned rows, no random wrap. Pure read-only listing of what
   is always included; nothing is hoverable or selectable.
   ===================================================================== */
function V16() {
  return (
    <div style={{ color: INK }}>
      <div className="flex items-center gap-2 mb-1">
        <BadgeCheck size={18} color={BLUE} strokeWidth={2.4} />
        <div className="kicker" style={{ color: BLUE }}>
          {PRODUCT_NAME} — toujours inclus
        </div>
      </div>
      <h3
        className="font-display"
        style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 16 }}
      >
        Le standard, sans supplément
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {INCLUDED.map((label) => (
          <div
            key={label}
            className="inline-flex items-center gap-2.5 w-full"
            style={{
              background: BLUE_MIST,
              border: `1px solid ${LINE}`,
              borderRadius: 9999,
              padding: '9px 16px 9px 10px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: BLUE_DEEP,
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 22,
                height: 22,
                borderRadius: 9999,
                background: BLUE,
                color: '#ffffff',
              }}
            >
              <Check size={13} strokeWidth={3} />
            </span>
            <span style={{ lineHeight: 1.25 }}>{label}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-5 flex items-center gap-3"
        style={{
          borderTop: `1px solid ${LINE}`,
          paddingTop: 14,
        }}
      >
        <Sparkles size={16} color={BLUE} />
        <p
          style={{ fontSize: '0.85rem', color: '#5b6f8e', margin: 0 }}
        >
          Tout est déjà compris dans le prix de base.
        </p>
      </div>
    </div>
  );
}

/* =====================================================================
   V17 — 2-col feature list with icon chips (display-only)
   A refined 2-column list: each row is a rounded icon "chip" + label
   with a static blue check. Read-only confirmation — no selection,
   keyboard nav, or highlight state. Footer reaffirms the example price.
   ===================================================================== */
function V17() {
  return (
    <div style={{ color: INK }}>
      <div className="mb-4">
        <div className="kicker" style={{ color: BLUE }}>
          Compris dans l'offre
        </div>
        <h3
          className="font-display"
          style={{ fontSize: '1.4rem', lineHeight: 1.05, marginTop: 4 }}
        >
          6 prestations, zéro extra
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5">
        {INCLUDED.map((label, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={label}
              className="relative flex items-center gap-3 overflow-hidden"
              style={{
                border: `1px solid ${LINE}`,
                background: BLUE_MIST,
                borderRadius: 16,
                padding: '11px 13px',
              }}
            >
              <span
                className="absolute left-0 top-0 bottom-0"
                style={{ width: 3, background: BLUE, borderRadius: 9999 }}
              />
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 11,
                  background: BLUE,
                  color: '#ffffff',
                }}
              >
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span
                style={{
                  fontSize: '0.84rem',
                  lineHeight: 1.25,
                  fontWeight: 600,
                  color: INK,
                }}
              >
                {label}
              </span>
              <span
                className="ml-auto flex items-center justify-center shrink-0"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  background: BLUE,
                  color: '#ffffff',
                }}
              >
                <Check size={12} strokeWidth={3.2} />
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="mt-5 flex items-center justify-between"
        style={{
          background: BLUE_SOFT,
          borderRadius: 16,
          padding: '12px 16px',
        }}
      >
        <span className="inline-flex items-center gap-2" style={{ fontSize: '0.82rem', color: BLUE_DEEP, fontWeight: 600 }}>
          <Plus size={15} strokeWidth={2.6} />
          Aucun frais caché
        </span>
        <span className="font-display" style={{ color: BLUE_DEEP, fontSize: '0.95rem', fontWeight: 700 }}>
          dès {fmt(EXAMPLE_TOTAL)}
        </span>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 15,
    label: 'Grille cochée',
    note: 'Grille 2 colonnes en lecture seule, coches bleues statiques.',
    Component: V15,
  },
  {
    n: 16,
    label: 'Grille de badges',
    note: 'Pastilles alignées sur une grille nette et régulière, affichage statique.',
    Component: V16,
  },
  {
    n: 17,
    label: 'Liste à chips',
    note: 'Liste 2 colonnes avec chips d’icône en lecture seule et rappel prix.',
    Component: V17,
  },
];
