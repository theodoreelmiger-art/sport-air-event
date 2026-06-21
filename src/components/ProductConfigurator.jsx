import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, ArrowRight, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import { Reveal, RevealStagger, staggerChild } from '../lib/motion.jsx';
import DevisModal from './DevisModal.jsx';

const EASE = [0.16, 1, 0.3, 1];
const fmt = (n) => '€ ' + n.toLocaleString('fr-FR');

function Stepper({ qty, onInc, onDec, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, width: 0 }} animate={{ opacity: 1, scale: 1, width: 'auto' }} exit={{ opacity: 0, scale: 0.8, width: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className={`flex items-center gap-0.5 rounded-full p-1 shrink-0 ${dark ? 'bg-white/10' : 'bg-white border border-[var(--line)] shadow-sm'}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <button type="button" aria-label="Diminuer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDec(); }}
        className="w-7 h-7 rounded-full flex items-center justify-center text-ink hover:bg-[var(--blue-soft)] transition-colors cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
      <span className="w-6 text-center text-sm font-display font-bold text-ink tabular-nums select-none">{qty}</span>
      <button type="button" aria-label="Augmenter" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onInc(); }}
        className="w-7 h-7 rounded-full flex items-center justify-center text-white bg-[var(--blue)] hover:bg-[var(--blue-deep)] transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
    </motion.div>
  );
}

function CheckBox({ on, round }) {
  return (
    <span className={`w-6 h-6 ${round ? 'rounded-full' : 'rounded-lg'} border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${on ? 'bg-[var(--blue)] border-[var(--blue)] scale-100' : 'border-[var(--line)] bg-white'}`}>
      <AnimatePresence>{on && <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ duration: 0.25, ease: EASE }}><Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /></motion.span>}</AnimatePresence>
    </span>
  );
}

export default function ProductConfigurator({ data }) {
  const { productName, image, sizeGroup, groups = [], included = [], surMesureTo, modalGroupLabel } = data;
  const defaultSize = sizeGroup ? Math.max(0, sizeGroup.items.findIndex((s) => s.popular)) : -1;
  const [sizeIdx, setSizeIdx] = useState(sizeGroup ? (defaultSize < 0 ? 0 : defaultSize) : -1);
  const [sizeQty, setSizeQty] = useState(1);
  const [optQty, setOptQty] = useState({});
  const [open, setOpen] = useState(false);

  const key = (gi, ii) => `${gi}-${ii}`;
  const setQ = (k, v) => setOptQty((m) => ({ ...m, [k]: Math.max(0, v) }));
  const selectedCount = Object.values(optQty).filter((v) => v > 0).length;

  const total = useMemo(() => {
    let t = sizeGroup ? sizeGroup.items[sizeIdx].price * sizeQty : 0;
    groups.forEach((g, gi) => g.items.forEach((it, ii) => { t += (optQty[key(gi, ii)] || 0) * it.price; }));
    return t;
  }, [sizeGroup, sizeIdx, sizeQty, groups, optQty]);

  const lines = sizeGroup ? [{ label: sizeGroup.items[sizeIdx].name, qty: sizeQty, unit: sizeGroup.items[sizeIdx].price }] : [];
  const extras = [];
  groups.forEach((g, gi) => g.items.forEach((it, ii) => { const q = optQty[key(gi, ii)] || 0; if (q > 0) extras.push({ label: it.name, qty: q, unit: it.price }); }));

  const AnimPrice = ({ value, className }) => (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="inline-block">{fmt(value)}</motion.span>
      </AnimatePresence>
    </span>
  );

  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 py-14 md:py-20">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16">
        {/* ── LEFT: sticky, following image ── */}
        <div>
          <div className="lg:sticky lg:top-24">
            <motion.div
              className="relative rounded-[28px] bg-gradient-to-br from-[var(--blue-mist)] to-[var(--blue-soft)] border border-[var(--line)] overflow-hidden flex items-center justify-center p-10 md:p-14"
              style={{ aspectRatio: '1 / 1' }}
              initial={{ opacity: 0, scale: 0.96, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute w-2/3 h-2/3 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.18), transparent 70%)', filter: 'blur(40px)' }} />
              <motion.img
                src={image} alt={productName} loading="eager"
                className="relative max-h-[82%] max-w-[88%] object-contain product-render"
                animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg px-5 py-3.5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">Configuration</div>
                  <AnimPrice value={total} className="font-display text-2xl font-bold text-ink leading-tight" />
                </div>
                <button type="button" onClick={() => setOpen(true)} data-cursor className="cta-iridescent inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold cursor-pointer">
                  Devis <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: controls ── */}
        <div className="space-y-12">
          {/* Size group */}
          {sizeGroup && (
            <Reveal y={30}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="kicker">{sizeGroup.label}</span>
                  {sizeGroup.items[sizeIdx]?.popular && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--blue)] text-white text-[11px] font-semibold">
                      <Star className="w-3 h-3 fill-white" /> populaire
                    </span>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {sizeGroup.items.map((s, i) => {
                  const sel = i === sizeIdx;
                  return (
                    <motion.div key={s.name} role="button" tabIndex={0} aria-pressed={sel} data-cursor
                      onClick={() => setSizeIdx(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSizeIdx(i); } }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-2xl border-2 p-4 cursor-pointer outline-none transition-all duration-300 ${sel ? 'border-[var(--blue)] bg-[var(--blue-mist)] shadow-[0_8px_30px_-12px_rgba(0,102,204,0.45)]' : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40'}`}>
                      <div className="flex items-start gap-3">
                        <CheckBox on={sel} round />
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-bold text-ink text-lg leading-none">{s.name}</div>
                          {s.sub && <div className="text-xs text-[var(--muted)] mt-1">{s.sub}</div>}
                          <div className="font-display font-bold text-[var(--blue)] mt-2">{s.price}€</div>
                        </div>
                      </div>
                      <AnimatePresence>
                        {sel && (
                          <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 14 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.3, ease: EASE }} className="flex items-center justify-between overflow-hidden">
                            <span className="text-xs font-medium text-[var(--muted)]">Quantité</span>
                            <Stepper qty={sizeQty} onInc={() => setSizeQty((q) => q + 1)} onDec={() => setSizeQty((q) => Math.max(1, q - 1))} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
              {surMesureTo && (
                <Link to={surMesureTo} data-cursor className="group mt-3 flex items-center justify-between rounded-2xl bg-deep text-white px-5 py-4 cursor-pointer overflow-hidden relative">
                  <div className="relative z-10"><div className="font-semibold">Sur mesure</div><div className="text-xs text-white/60">Dimensions 100% personnalisées</div></div>
                  <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              )}
            </Reveal>
          )}

          {/* Multi groups */}
          {groups.map((g, gi) => (
            <Reveal key={g.label} y={30} delay={0.05}>
              <div className="flex items-center gap-3 mb-5">
                <span className="kicker">{g.label}</span>
                <span className="h-px flex-1 bg-[var(--line)]" />
              </div>
              <div className="space-y-2.5">
                {g.items.map((it, ii) => {
                  const k = key(gi, ii); const q = optQty[k] || 0; const sel = q > 0;
                  return (
                    <motion.div key={it.name} role="button" tabIndex={0} aria-pressed={sel} data-cursor
                      onClick={() => setQ(k, sel ? 0 : 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setQ(k, sel ? 0 : 1); } }}
                      className={`group flex items-center gap-4 rounded-2xl border p-3.5 pr-4 cursor-pointer outline-none transition-all duration-300 ${sel ? 'border-[var(--blue)] bg-[var(--blue-mist)]' : 'border-[var(--line)] bg-white hover:border-[var(--blue)]/40 hover:bg-[var(--blue-mist)]/40'}`}>
                      <CheckBox on={sel} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ink leading-snug">{it.name}</div>
                        {it.sub && <div className="text-xs text-[var(--muted)] mt-0.5">{it.sub}</div>}
                      </div>
                      <div className={`font-display font-bold whitespace-nowrap transition-colors ${sel ? 'text-[var(--blue)]' : 'text-ink/60'}`}>+{it.price}€</div>
                      <AnimatePresence>{sel && <Stepper qty={q} onInc={() => setQ(k, q + 1)} onDec={() => setQ(k, q - 1)} />}</AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>
          ))}

          {/* Included */}
          {included.length > 0 && (
            <Reveal y={24}>
              <div className="rounded-[22px] border border-[var(--line)] bg-gradient-to-br from-[var(--blue-mist)] to-white p-6">
                <div className="kicker mb-4">Inclus dans le prix de base</div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {included.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <span className="w-5 h-5 rounded-full bg-[var(--blue-soft)] flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-3 h-3 text-[var(--blue)]" strokeWidth={3} /></span>{inc}
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 text-sm font-semibold text-ink"><span className="w-5 h-5 rounded-full bg-[var(--blue)] flex items-center justify-center flex-shrink-0 mt-0.5"><Sparkles className="w-3 h-3 text-white" /></span>Design 3D gratuit</li>
                </ul>
              </div>
            </Reveal>
          )}

          {/* Price bar */}
          <Reveal y={20}>
            <div className="rounded-[22px] bg-deep text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden">
              <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(70,150,255,0.35), transparent 70%)', filter: 'blur(40px)' }} />
              <div className="relative">
                <div className="text-[11px] uppercase tracking-widest text-white/55 mb-1">Prix HT{selectedCount > 0 ? ` · ${selectedCount} option${selectedCount > 1 ? 's' : ''}` : ''}</div>
                <AnimPrice value={total} className="font-display text-3xl font-bold leading-tight" />
              </div>
              <button type="button" onClick={() => setOpen(true)} data-cursor className="relative inline-flex items-center gap-2 bg-white text-[var(--blue)] font-semibold rounded-full px-6 py-3.5 hover:scale-[1.03] transition-transform cursor-pointer">
                Demander un devis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <DevisModal open={open} onClose={() => setOpen(false)} productName={productName} groupLabel={modalGroupLabel} lines={lines} extras={extras} total={total} />
    </section>
  );
}
