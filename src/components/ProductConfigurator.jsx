import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, ArrowRight, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import DevisModal from './DevisModal.jsx';

const EASE = [0.16, 1, 0.3, 1];
const fmt = (n) => '€ ' + n.toLocaleString('fr-FR');

function Stepper({ qty, onInc, onDec }) {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex items-center gap-1 rounded-full bg-white border border-[var(--line)] p-1 shrink-0 overflow-hidden"
      onClick={(e) => e.preventDefault()}
    >
      <button type="button" aria-label="Diminuer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDec(); }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-[var(--blue-soft)] transition-colors cursor-pointer">
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-7 text-center font-display font-semibold text-ink tabular-nums select-none">{qty}</span>
      <button type="button" aria-label="Augmenter" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onInc(); }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[var(--blue)] hover:bg-[var(--blue-deep)] transition-colors cursor-pointer">
        <Plus className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function ProductConfigurator({ data }) {
  const { productName, image, sizeGroup, groups = [], included = [], surMesureTo, modalGroupLabel } = data;
  const defaultSize = sizeGroup ? Math.max(0, sizeGroup.items.findIndex((s) => s.popular)) : -1;
  const [sizeIdx, setSizeIdx] = useState(sizeGroup ? (defaultSize < 0 ? 0 : defaultSize) : -1);
  const [sizeQty, setSizeQty] = useState(1);
  const [optQty, setOptQty] = useState({}); // key `${gi}-${ii}` -> qty (0 = not selected)
  const [open, setOpen] = useState(false);

  const key = (gi, ii) => `${gi}-${ii}`;
  const setQ = (k, v) => setOptQty((m) => ({ ...m, [k]: Math.max(0, v) }));

  const total = useMemo(() => {
    let t = sizeGroup ? sizeGroup.items[sizeIdx].price * sizeQty : 0;
    groups.forEach((g, gi) => g.items.forEach((it, ii) => { t += (optQty[key(gi, ii)] || 0) * it.price; }));
    return t;
  }, [sizeGroup, sizeIdx, sizeQty, groups, optQty]);

  const lines = sizeGroup ? [{ label: sizeGroup.items[sizeIdx].name, qty: sizeQty, unit: sizeGroup.items[sizeIdx].price }] : [];
  const extras = [];
  groups.forEach((g, gi) => g.items.forEach((it, ii) => { const q = optQty[key(gi, ii)] || 0; if (q > 0) extras.push({ label: it.name, qty: q, unit: it.price }); }));

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 py-14 md:py-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* ── LEFT: sticky product image ── */}
        <div className="lg:sticky lg:top-28">
          <div className="relative rounded-[var(--radius-lg)] bg-[var(--blue-mist)] border border-[var(--line)] overflow-hidden flex items-center justify-center p-10 md:p-14" style={{ aspectRatio: '1 / 1' }}>
            <motion.img
              src={image} alt={productName} loading="eager"
              className="relative max-h-[78%] max-w-[82%] object-contain" style={{ mixBlendMode: 'multiply' }}
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}
            />
            {/* live price chip */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur border border-[var(--line)] px-5 py-3.5">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Prix HT estimé</div>
                <div className="font-display text-2xl font-bold text-ink leading-tight overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={total} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="inline-block">
                      {fmt(total)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(true)} data-cursor className="cta-iridescent inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold cursor-pointer">
                Devis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: controls ── */}
        <div className="space-y-10">
          {/* Size group (single select, qty on selected) */}
          {sizeGroup && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-display text-xl font-bold text-ink">{sizeGroup.label}</h2>
                {sizeGroup.items[sizeIdx]?.popular && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--blue-soft)] text-[var(--blue)] text-xs font-semibold">
                    <Star className="w-3 h-3 fill-[var(--blue)]" /> {sizeGroup.items[sizeIdx].name} populaire
                  </span>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {sizeGroup.items.map((s, i) => {
                  const sel = i === sizeIdx;
                  return (
                    <motion.div
                      key={s.name} role="button" tabIndex={0} aria-pressed={sel} data-cursor
                      onClick={() => setSizeIdx(i)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSizeIdx(i); } }}
                      whileTap={{ scale: 0.985 }}
                      className={`relative text-left rounded-2xl border p-4 transition-colors cursor-pointer outline-none ${sel ? 'border-[var(--blue)] bg-[var(--blue-mist)]' : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40'}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${sel ? 'bg-[var(--blue)] border-[var(--blue)]' : 'border-[var(--line)]'}`}>
                          <AnimatePresence>{sel && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-3.5 h-3.5 text-white" /></motion.span>}</AnimatePresence>
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-ink">{s.name}</div>
                          {s.sub && <div className="text-xs text-[var(--muted)] mt-0.5">{s.sub}</div>}
                          <div className="font-display font-bold text-[var(--blue)] mt-1.5">{s.price}€</div>
                        </div>
                        <AnimatePresence>
                          {sel && <Stepper qty={sizeQty} onInc={() => setSizeQty((q) => q + 1)} onDec={() => setSizeQty((q) => Math.max(1, q - 1))} />}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {surMesureTo && (
                <Link to={surMesureTo} data-cursor className="group mt-3 flex items-center justify-between rounded-2xl bg-deep text-white px-5 py-4 cursor-pointer">
                  <div><div className="font-semibold">Sur mesure</div><div className="text-xs text-white/60">Dimensions personnalisées</div></div>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              )}
            </div>
          )}

          {/* Multi-select groups (qty on selected) */}
          {groups.map((g, gi) => (
            <div key={g.label}>
              <h2 className="font-display text-xl font-bold text-ink mb-5">{g.label}</h2>
              <div className="space-y-3">
                {g.items.map((it, ii) => {
                  const k = key(gi, ii); const q = optQty[k] || 0; const sel = q > 0;
                  return (
                    <motion.div
                      key={it.name} role="button" tabIndex={0} aria-pressed={sel} data-cursor
                      onClick={() => setQ(k, sel ? 0 : 1)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setQ(k, sel ? 0 : 1); } }}
                      className={`w-full text-left rounded-2xl border p-4 transition-colors cursor-pointer outline-none ${sel ? 'border-[var(--blue)] bg-[var(--blue-mist)]' : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${sel ? 'bg-[var(--blue)] border-[var(--blue)]' : 'border-[var(--line)]'}`}>
                          <AnimatePresence>{sel && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-3.5 h-3.5 text-white" /></motion.span>}</AnimatePresence>
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-ink">{it.name}</div>
                          {it.sub && <div className="text-xs text-[var(--muted)] mt-0.5">{it.sub}</div>}
                        </div>
                        <div className="font-display font-bold text-[var(--blue)] whitespace-nowrap">+{it.price}€</div>
                        <AnimatePresence>
                          {sel && <Stepper qty={q} onInc={() => setQ(k, q + 1)} onDec={() => setQ(k, q - 1)} />}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Included */}
          {included.length > 0 && (
            <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--blue-mist)] p-6">
              <div className="kicker mb-4">Inclus dans le prix de base</div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {included.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check className="w-4 h-4 text-[var(--blue)] mt-0.5 flex-shrink-0" />{inc}
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm font-medium text-ink"><Sparkles className="w-4 h-4 text-[var(--blue)] mt-0.5 flex-shrink-0" />Design 3D gratuit</li>
              </ul>
            </div>
          )}

          {/* Price bar / CTA */}
          <div className="rounded-[var(--radius-lg)] bg-deep text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/55">Prix HT</div>
              <div className="font-display text-3xl font-bold leading-tight overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={total} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="inline-block">{fmt(total)}</motion.span>
                </AnimatePresence>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(true)} data-cursor className="inline-flex items-center gap-2 bg-white text-[var(--blue)] font-semibold rounded-full px-6 py-3.5 hover:bg-white/90 transition-colors cursor-pointer">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <DevisModal open={open} onClose={() => setOpen(false)} productName={productName} groupLabel={modalGroupLabel} lines={lines} extras={extras} total={total} />
    </section>
  );
}
