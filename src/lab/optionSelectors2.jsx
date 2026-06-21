import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Plus, Minus, X, ChevronUp, Layers,
  PanelTop, DoorOpen, Frame, Maximize2, Settings, Package,
} from 'lucide-react';
import { OPTIONS, fmt } from './data.js';

const EASE = [0.22, 1, 0.36, 1];

/* Icons matched by index to OPTIONS (no emoji). */
const OPTION_ICONS = [PanelTop, DoorOpen, Frame, Maximize2, Layers];
const iconFor = (i) => OPTION_ICONS[i % OPTION_ICONS.length];

/* ── Shared selection hook: { [name]: qty } map ── */
function useSelection() {
  const [sel, setSel] = useState({});
  const toggle = (name) =>
    setSel((s) => {
      const next = { ...s };
      if (next[name]) delete next[name];
      else next[name] = 1;
      return next;
    });
  const setQty = (name, q) =>
    setSel((s) => ({ ...s, [name]: Math.max(1, q) }));
  const remove = (name) =>
    setSel((s) => {
      const next = { ...s };
      delete next[name];
      return next;
    });
  const total = OPTIONS.reduce(
    (sum, o) => (sel[o.name] ? sum + o.price * sel[o.name] : sum),
    0
  );
  const count = Object.keys(sel).length;
  const units = Object.values(sel).reduce((a, b) => a + b, 0);
  return { sel, toggle, setQty, remove, total, count, units };
}

function onKeyActivate(fn) {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };
}

/* ── Compact stepper (used inside selected rows) ── */
function Stepper({ qty, onDec, onInc, tone = 'soft' }) {
  const base =
    'w-7 h-7 grid place-items-center rounded-full cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed';
  const style =
    tone === 'solid'
      ? { border: '1px solid var(--blue)', color: 'var(--blue)', background: '#fff' }
      : { border: '1px solid var(--line)', color: 'var(--blue)', background: 'var(--blue-mist)' };
  const stop = (e) => e.stopPropagation();
  return (
    <div className="flex items-center gap-1.5" onClick={stop} onKeyDown={stop}>
      <motion.button
        type="button"
        aria-label="Diminuer la quantité"
        whileTap={{ scale: 0.85 }}
        onClick={onDec}
        disabled={qty <= 1}
        className={base}
        style={style}
      >
        <Minus className="w-3 h-3" strokeWidth={2.5} />
      </motion.button>
      <div
        className="w-6 text-center font-display tabular-nums select-none"
        style={{ color: 'var(--blue-deep)', fontSize: '0.9rem' }}
        aria-live="polite"
      >
        {qty}
      </div>
      <motion.button
        type="button"
        aria-label="Augmenter la quantité"
        whileTap={{ scale: 0.85 }}
        onClick={onInc}
        className={base}
        style={style}
      >
        <Plus className="w-3 h-3" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

/* Animated total value (popLayout swap). */
function AnimatedTotal({ total, size = '1.05rem' }) {
  return (
    <span className="font-display tabular-nums" style={{ color: 'var(--blue)', fontSize: size }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={total}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="inline-block"
        >
          {fmt(total)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   #107 — Interrupteurs (toggle switches). Each option is a row with an iOS-style
          switch; flipping ON reveals an inline quantity stepper underneath.
   ────────────────────────────────────────────────────────────────────────── */
function V107() {
  const { sel, toggle, setQty, total, count } = useSelection();
  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 4 }}>
        Activez vos parois
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 18 }}>
        Un interrupteur par option — la quantité apparaît une fois activée.
      </p>

      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((o, i) => {
          const on = !!sel[o.name];
          const qty = sel[o.name] || 0;
          const Icon = iconFor(i);
          return (
            <motion.div
              key={o.name}
              layout
              transition={{ layout: { duration: 0.3, ease: EASE } }}
              className="rounded-2xl"
              style={{
                border: on ? '1.5px solid var(--blue)' : '1px solid var(--line)',
                background: on ? 'var(--blue-mist)' : '#fff',
                overflow: 'hidden',
              }}
            >
              <div
                role="button"
                tabIndex={0}
                aria-pressed={on}
                onClick={() => toggle(o.name)}
                onKeyDown={onKeyActivate(() => toggle(o.name))}
                className="cursor-pointer flex items-center gap-3"
                style={{ padding: '12px 14px' }}
              >
                <span
                  className="grid place-items-center shrink-0 transition-colors"
                  style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: on ? 'var(--blue)' : 'var(--blue-soft)',
                  }}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} style={{ color: on ? '#fff' : 'var(--blue)' }} />
                </span>

                <div className="flex-1 min-w-0">
                  <div
                    className="leading-snug truncate"
                    style={{ fontSize: '0.88rem', fontWeight: on ? 600 : 500, color: on ? 'var(--ink)' : '#33425a' }}
                  >
                    {o.name}
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 600 }}>
                    {fmt(o.price)}
                  </div>
                </div>

                {/* iOS-style switch */}
                <motion.span
                  aria-hidden
                  className="shrink-0 relative cursor-pointer"
                  style={{
                    width: 44, height: 26, borderRadius: 9999,
                    background: on ? 'var(--blue)' : '#d6e2f3',
                    transition: 'background .25s',
                  }}
                >
                  <motion.span
                    className="absolute"
                    style={{ top: 3, left: 3, width: 20, height: 20, borderRadius: 9999, background: '#fff' }}
                    animate={{ x: on ? 18 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{ padding: '10px 14px', borderTop: '1px solid var(--line)' }}
                    >
                      <span style={{ fontSize: '0.78rem', color: '#5a6b82' }}>Quantité</span>
                      <Stepper qty={qty} onDec={() => setQty(o.name, qty - 1)} onInc={() => setQty(o.name, qty + 1)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
        <span style={{ color: '#5a6b82', fontSize: '0.85rem' }}>
          {count} active{count > 1 ? 's' : ''}
        </span>
        <AnimatedTotal total={total} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   #108 — Pastilles compactes (image-less chips). Dense pill grid, no icons.
          Selected pill flips to host a minus / qty / plus inline control.
   ────────────────────────────────────────────────────────────────────────── */
function V108() {
  const { sel, toggle, setQty, total, count } = useSelection();
  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 4 }}>
        Parois en un coup d'œil
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 18 }}>
        Pastilles compactes — touchez pour ajouter, ajustez sur place.
      </p>

      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((o) => {
          const on = !!sel[o.name];
          const qty = sel[o.name] || 0;
          return (
            <motion.div
              key={o.name}
              layout
              role={on ? undefined : 'button'}
              tabIndex={on ? undefined : 0}
              aria-pressed={on}
              onClick={on ? undefined : () => toggle(o.name)}
              onKeyDown={on ? undefined : onKeyActivate(() => toggle(o.name))}
              whileTap={on ? undefined : { scale: 0.985 }}
              transition={{ layout: { duration: 0.3, ease: EASE } }}
              className={on ? 'flex items-center gap-3' : 'cursor-pointer flex items-center gap-3'}
              style={{
                padding: on ? '8px 10px 8px 14px' : '12px 14px',
                borderRadius: 9999,
                border: on ? '1.5px solid var(--blue)' : '1px solid var(--line)',
                background: on ? 'var(--blue-soft)' : '#fff',
              }}
            >
              <motion.span layout="position" className="flex items-center gap-2 flex-1 min-w-0">
                <span
                  className="grid place-items-center shrink-0"
                  style={{
                    width: 18, height: 18, borderRadius: 9999,
                    border: on ? 'none' : '1.5px solid var(--line)',
                    background: on ? 'var(--blue)' : '#fff',
                  }}
                >
                  {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                <span
                  className="truncate"
                  style={{ fontSize: '0.85rem', fontWeight: on ? 600 : 500, color: on ? 'var(--blue-deep)' : '#33425a' }}
                >
                  {o.name}
                </span>
              </motion.span>

              {on ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 shrink-0"
                >
                  <Stepper qty={qty} tone="solid" onDec={() => setQty(o.name, qty - 1)} onInc={() => setQty(o.name, qty + 1)} />
                  <motion.button
                    type="button"
                    aria-label={`Retirer ${o.name}`}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.stopPropagation(); toggle(o.name); }}
                    className="w-7 h-7 grid place-items-center rounded-full cursor-pointer shrink-0"
                    style={{ background: 'var(--blue)', color: '#fff' }}
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </motion.button>
                </motion.div>
              ) : (
                <span className="tabular-nums shrink-0" style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--blue)' }}>
                  {fmt(o.price)}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
        <span style={{ color: '#5a6b82', fontSize: '0.85rem' }}>
          {count === 0 ? 'Aucune sélection' : `${count} sélectionnée${count > 1 ? 's' : ''}`}
        </span>
        <AnimatedTotal total={total} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   #109 — Sections groupées avec compteurs (always-open). Two labelled sections
          each with a live count badge; rows reveal a stepper when selected.
   ────────────────────────────────────────────────────────────────────────── */
function V109() {
  const { sel, toggle, setQty, total, count } = useSelection();

  const groups = [
    { id: 'plein', label: 'Parois pleines', items: OPTIONS.filter((o) => !/fenêtre/i.test(o.name)) },
    { id: 'vit', label: 'Vitrées & spéciales', items: OPTIONS.filter((o) => /fenêtre/i.test(o.name)) },
  ];
  const gc = (items) => items.filter((o) => sel[o.name]).length;

  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 4 }}>
        Parois par catégorie
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 16 }}>
        Tout est visible — un compteur par groupe se met à jour en direct.
      </p>

      <div className="flex flex-col gap-4">
        {groups.map((g) => {
          const c = gc(g.items);
          return (
            <div key={g.id}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span
                  className="font-display"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8493a8' }}
                >
                  {g.label}
                </span>
                <span className="flex-1 h-px" style={{ background: 'var(--line)' }} />
                <motion.span
                  className="tabular-nums grid place-items-center"
                  animate={{ scale: c > 0 ? 1 : 0.9, opacity: c > 0 ? 1 : 0.45 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    minWidth: 24, height: 22, padding: '0 8px', borderRadius: 9999,
                    background: c > 0 ? 'var(--blue)' : 'var(--blue-soft)',
                    color: c > 0 ? '#fff' : 'var(--blue)',
                    fontSize: '0.72rem', fontWeight: 700,
                  }}
                >
                  {c}/{g.items.length}
                </motion.span>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                {g.items.map((o, i) => {
                  const on = !!sel[o.name];
                  const qty = sel[o.name] || 0;
                  return (
                    <div
                      key={o.name}
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      onClick={() => toggle(o.name)}
                      onKeyDown={onKeyActivate(() => toggle(o.name))}
                      className="cursor-pointer flex items-center gap-3 transition-colors"
                      style={{
                        padding: '12px 14px',
                        background: on ? 'var(--blue-mist)' : '#fff',
                        borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                      }}
                    >
                      <motion.span
                        whileTap={{ scale: 0.85 }}
                        className="grid place-items-center shrink-0"
                        style={{
                          width: 21, height: 21, borderRadius: 7,
                          border: on ? '1px solid var(--blue)' : '1.5px solid var(--line)',
                          background: on ? 'var(--blue)' : '#fff',
                        }}
                      >
                        <AnimatePresence>
                          {on && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.2, ease: EASE }}
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.span>

                      <span
                        className="flex-1 leading-snug"
                        style={{ fontSize: '0.86rem', fontWeight: on ? 600 : 500, color: on ? 'var(--ink)' : '#33425a' }}
                      >
                        {o.name}
                      </span>

                      <AnimatePresence mode="wait" initial={false}>
                        {on ? (
                          <motion.div
                            key="st"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="shrink-0"
                          >
                            <Stepper qty={qty} onDec={() => setQty(o.name, qty - 1)} onInc={() => setQty(o.name, qty + 1)} />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="pr"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="tabular-nums shrink-0"
                            style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--blue)' }}
                          >
                            {fmt(o.price)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
        <span style={{ color: '#5a6b82', fontSize: '0.85rem' }}>
          {count} option{count > 1 ? 's' : ''}
        </span>
        <AnimatedTotal total={total} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   #110 — Tiroir (drawer). A compact summary bar; tapping "Configurer" slides up
          an overlay drawer with the full option list. Steppers on selected rows.
   ────────────────────────────────────────────────────────────────────────── */
function V110() {
  const { sel, toggle, setQty, total, count, units } = useSelection();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" style={{ minHeight: 132 }}>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 4 }}>
        Configurateur tiroir
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 16 }}>
        Un panneau coulissant pour choisir vos parois sans encombrer la page.
      </p>

      {/* Summary trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full cursor-pointer flex items-center gap-3 rounded-2xl text-left"
        style={{ padding: '14px 16px', border: '1.5px solid var(--blue)', background: 'var(--blue-mist)' }}
      >
        <span className="grid place-items-center shrink-0" style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--blue)' }}>
          <Settings className="w-4.5 h-4.5" strokeWidth={2} style={{ color: '#fff', width: 18, height: 18 }} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-display" style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
            {count === 0 ? 'Choisir mes parois' : `${count} option${count > 1 ? 's' : ''} · ${units} unité${units > 1 ? 's' : ''}`}
          </div>
          <div className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 600 }}>
            {count === 0 ? 'Ouvrir le tiroir' : fmt(total)}
          </div>
        </div>
        <ChevronUp className="w-4 h-4 shrink-0" strokeWidth={2.5} style={{ color: 'var(--blue)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{ background: 'rgba(11,28,63,0.28)', borderRadius: 16 }}
            />
            <motion.div
              className="absolute left-0 right-0 bottom-0 z-20"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.36, ease: EASE }}
              style={{
                background: '#fff',
                borderRadius: '20px 20px 16px 16px',
                border: '1px solid var(--line)',
                maxHeight: '90%',
                overflowY: 'auto',
              }}
            >
              <div className="flex items-center justify-between" style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
                <span className="font-display" style={{ fontSize: '1rem', color: 'var(--ink)' }}>
                  Vos parois
                </span>
                <motion.button
                  type="button"
                  aria-label="Fermer le tiroir"
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 grid place-items-center rounded-full cursor-pointer"
                  style={{ border: '1px solid var(--line)', color: 'var(--blue)' }}
                >
                  <X className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </div>

              <div style={{ padding: '8px 10px' }}>
                {OPTIONS.map((o, i) => {
                  const on = !!sel[o.name];
                  const qty = sel[o.name] || 0;
                  const Icon = iconFor(i);
                  return (
                    <div
                      key={o.name}
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      onClick={() => toggle(o.name)}
                      onKeyDown={onKeyActivate(() => toggle(o.name))}
                      className="cursor-pointer flex items-center gap-3 rounded-xl transition-colors"
                      style={{ padding: '11px 12px', background: on ? 'var(--blue-mist)' : 'transparent' }}
                    >
                      <span
                        className="grid place-items-center shrink-0"
                        style={{ width: 30, height: 30, borderRadius: 9, background: on ? 'var(--blue)' : 'var(--blue-soft)' }}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2} style={{ color: on ? '#fff' : 'var(--blue)' }} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="leading-snug truncate" style={{ fontSize: '0.85rem', fontWeight: on ? 600 : 500, color: on ? 'var(--ink)' : '#33425a' }}>
                          {o.name}
                        </div>
                        <div className="tabular-nums" style={{ fontSize: '0.76rem', color: 'var(--blue)', fontWeight: 600 }}>
                          {fmt(o.price)}
                        </div>
                      </div>
                      <AnimatePresence mode="wait" initial={false}>
                        {on ? (
                          <motion.div
                            key="st"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="shrink-0"
                          >
                            <Stepper qty={qty} onDec={() => setQty(o.name, qty - 1)} onInc={() => setQty(o.name, qty + 1)} />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="grid place-items-center shrink-0"
                            style={{ width: 26, height: 26, borderRadius: 9999, border: '1.5px solid var(--line)', color: 'var(--blue)' }}
                          >
                            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between" style={{ padding: '14px 16px', borderTop: '1px solid var(--line)' }}>
                <AnimatedTotal total={total} size="1.1rem" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer font-display flex items-center gap-1.5"
                  style={{ padding: '10px 18px', borderRadius: 9999, background: 'var(--blue)', color: '#fff', fontSize: '0.9rem' }}
                >
                  Valider <Check className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   #111 — Récapitulatif au fil de l'eau (summary-as-you-go). Left list of options,
          a live "panier" summary on the right that fills as you add, with per-line
          steppers and removable rows.
   ────────────────────────────────────────────────────────────────────────── */
function V111() {
  const { sel, toggle, setQty, remove, total, count } = useSelection();
  const chosen = OPTIONS.filter((o) => sel[o.name]);

  return (
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 4 }}>
        Composez & visualisez
      </h3>
      <p style={{ color: '#5a6b82', fontSize: '0.85rem', marginBottom: 16 }}>
        Ajoutez à gauche — votre récapitulatif se construit à droite.
      </p>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.92fr)' }}>
        {/* Picker column */}
        <div className="flex flex-col gap-2">
          {OPTIONS.map((o, i) => {
            const on = !!sel[o.name];
            const Icon = iconFor(i);
            return (
              <motion.div
                key={o.name}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                onClick={() => toggle(o.name)}
                onKeyDown={onKeyActivate(() => toggle(o.name))}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer flex items-center gap-2.5 rounded-xl transition-colors"
                style={{
                  padding: '10px 11px',
                  border: on ? '1.5px solid var(--blue)' : '1px solid var(--line)',
                  background: on ? 'var(--blue-soft)' : '#fff',
                }}
              >
                <span
                  className="grid place-items-center shrink-0"
                  style={{ width: 26, height: 26, borderRadius: 8, background: on ? 'var(--blue)' : 'var(--blue-soft)' }}
                >
                  {on
                    ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    : <Icon className="w-3.5 h-3.5" strokeWidth={2} style={{ color: 'var(--blue)' }} />}
                </span>
                <span
                  className="flex-1 leading-tight"
                  style={{ fontSize: '0.78rem', fontWeight: on ? 600 : 500, color: on ? 'var(--blue-deep)' : '#33425a' }}
                >
                  {o.name}
                </span>
                <span className="tabular-nums shrink-0" style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--blue)' }}>
                  {fmt(o.price)}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Live summary column */}
        <div className="rounded-2xl flex flex-col" style={{ border: '1px solid var(--line)', background: 'var(--blue-mist)', overflow: 'hidden' }}>
          <div className="flex items-center gap-2" style={{ padding: '11px 13px', borderBottom: '1px solid var(--line)' }}>
            <Package className="w-4 h-4" strokeWidth={2} style={{ color: 'var(--blue)' }} />
            <span className="font-display" style={{ fontSize: '0.82rem', color: 'var(--ink)' }}>Récapitulatif</span>
            <span className="ml-auto tabular-nums" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)' }}>{count}</span>
          </div>

          <div className="flex-1" style={{ padding: '8px 10px', minHeight: 92 }}>
            {chosen.length === 0 ? (
              <div className="h-full grid place-items-center text-center" style={{ minHeight: 84 }}>
                <span style={{ fontSize: '0.76rem', color: '#8493a8', lineHeight: 1.5 }}>
                  Sélectionnez des parois pour les voir apparaître ici.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {chosen.map((o) => {
                    const qty = sel[o.name];
                    return (
                      <motion.div
                        key={o.name}
                        layout
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.24, ease: EASE }}
                        className="rounded-xl"
                        style={{ background: '#fff', border: '1px solid var(--line)', padding: '8px 9px' }}
                      >
                        <div className="flex items-start gap-1.5">
                          <span className="flex-1 leading-tight" style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink)' }}>
                            {o.name}
                          </span>
                          <motion.button
                            type="button"
                            aria-label={`Retirer ${o.name}`}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => remove(o.name)}
                            className="w-5 h-5 grid place-items-center rounded-full cursor-pointer shrink-0"
                            style={{ color: '#8493a8' }}
                          >
                            <X className="w-3 h-3" strokeWidth={2.5} />
                          </motion.button>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <Stepper qty={qty} onDec={() => setQty(o.name, qty - 1)} onInc={() => setQty(o.name, qty + 1)} />
                          <span className="tabular-nums" style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--blue)' }}>
                            {fmt(o.price * qty)}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between" style={{ padding: '11px 13px', borderTop: '1px solid var(--line)', background: '#fff' }}>
            <span style={{ fontSize: '0.74rem', color: '#5a6b82' }}>Total</span>
            <AnimatedTotal total={total} size="1rem" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const variants = [
  { n: 107, label: 'Interrupteurs', note: 'Switchs iOS par option, quantité dévoilée à l\'activation', Component: V107 },
  { n: 108, label: 'Pastilles compactes', note: 'Pills denses sans image, stepper inline au clic', Component: V108 },
  { n: 109, label: 'Sections + compteurs', note: 'Groupes toujours ouverts avec badges de comptage en direct', Component: V109 },
  { n: 110, label: 'Tiroir coulissant', note: 'Barre récap + panneau qui glisse pour configurer', Component: V110 },
  { n: 111, label: 'Récap au fil de l\'eau', note: 'Liste à gauche, panier vivant à droite, lignes retirables', Component: V111 },
];
