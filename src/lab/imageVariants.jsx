import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Ruler } from 'lucide-react';

const PRODUCTS = [
  { name: 'Tente Spider', src: 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png', dark: true },
  { name: 'Arche Gonflable', src: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png', dark: false },
  { name: 'Colonnes', src: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png', dark: false },
];
const ENVS = [
  { key: 'prairie', label: 'Prairie', src: 'images/env/prairie.jpg' },
  { key: 'ville', label: 'Ville', src: 'images/env/ville.jpg' },
  { key: 'stade', label: 'Stade', src: 'images/env/stade.jpg' },
  { key: 'salon', label: 'Salon', src: 'images/env/salon.jpg' },
  { key: 'terrain', label: 'Terrain', src: 'images/env/terrain.jpg' },
];
const TENTE = PRODUCTS[0].src;
const FEATHER = {
  WebkitMaskImage: 'radial-gradient(130% 130% at 50% 50%, #000 56%, transparent 90%)',
  maskImage: 'radial-gradient(130% 130% at 50% 50%, #000 56%, transparent 90%)',
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

/* small reusable scene: environment backdrop + product composited in front */
function Scene({ env, product = TENTE, multiply = true, blur = 1 }) {
  return (
    <div className="relative rounded-[20px] overflow-hidden bg-[var(--blue-mist)]" style={{ aspectRatio: '4/3' }}>
      <img src={env} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: `saturate(1.05) brightness(0.98) blur(${blur}px)` }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(8,24,60,0.18))' }} />
      {/* contact shadow */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '11%', width: '52%', height: 26, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.32), transparent 70%)', filter: 'blur(6px)' }} />
      <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-center pb-[7%]">
        <img src={product} alt="Produit" className="max-h-[64%] max-w-[78%] object-contain" style={{ mixBlendMode: multiply ? 'multiply' : 'normal', ...FEATHER }} />
      </div>
    </div>
  );
}

// #120 Studio fondu (visible, no square edge)
function V120() {
  return (
    <div className="relative rounded-[20px] overflow-hidden flex items-center justify-center p-8" style={{ aspectRatio: '4/3', background: 'radial-gradient(120% 120% at 50% 30%, #ffffff, var(--blue-mist))' }}>
      <div className="absolute w-1/2 h-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.16), transparent 70%)', filter: 'blur(40px)' }} />
      <img src={TENTE} alt="Tente" className="relative max-h-[78%] object-contain" style={FEATHER} />
    </div>
  );
}
// #121 Ombre de contact
function V121() {
  return (
    <div className="relative rounded-[20px] overflow-hidden flex items-end justify-center pb-8 bg-white" style={{ aspectRatio: '4/3' }}>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-7" style={{ width: '46%', height: 22, background: 'radial-gradient(ellipse at center, rgba(0,40,90,0.28), transparent 70%)', filter: 'blur(6px)' }} />
      <img src={TENTE} alt="Tente" className="relative max-h-[74%] object-contain" style={FEATHER} />
    </div>
  );
}
const envScene = (k) => ENVS.find((e) => e.key === k).src;
const V122 = () => <Scene env={envScene('prairie')} />;
const V123 = () => <Scene env={envScene('ville')} />;
const V124 = () => <Scene env={envScene('stade')} />;
const V125 = () => <Scene env={envScene('salon')} multiply blur={1.5} />;
const V126 = () => <Scene env={envScene('terrain')} />;

// #127 Environnement interactif
function V127() {
  const [env, setEnv] = useState(ENVS[0]);
  const [pi, setPi] = useState(0);
  return (
    <div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div key={env.key + pi} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Scene env={env.src} product={PRODUCTS[pi].src} multiply={PRODUCTS[pi].dark} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {ENVS.map((e) => (
          <button key={e.key} onClick={() => setEnv(e)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${env.key === e.key ? 'bg-[var(--blue)] text-white' : 'bg-[var(--blue-mist)] text-ink hover:bg-[var(--blue-soft)]'}`}>{e.label}</button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {PRODUCTS.map((p, i) => (
          <button key={p.name} onClick={() => setPi(i)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${pi === i ? 'border-[var(--blue)] text-[var(--blue)] bg-[var(--blue-mist)]' : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--blue)]/40'}`}>{p.name}</button>
        ))}
      </div>
    </div>
  );
}

// #128 Cotes sur la photo (AR-style dimension overlay)
function V128() {
  const sizes = [{ n: '3×3m', w: 300, h: 300 }, { n: '4×4m', w: 400, h: 400 }, { n: '5×5m', w: 500, h: 500 }];
  const [si, setSi] = useState(1);
  const s = sizes[si];
  return (
    <div>
      <div className="relative rounded-[20px] overflow-hidden bg-[var(--blue-mist)] flex items-center justify-center p-8" style={{ aspectRatio: '4/3' }}>
        <img src={TENTE} alt="Tente" className="relative max-h-[76%] object-contain" style={FEATHER} />
        {/* width line */}
        <div className="absolute left-[14%] right-[14%]" style={{ bottom: '12%' }}>
          <div className="relative h-px bg-[var(--blue)]">
            <span className="absolute -left-0.5 -top-1 w-1.5 h-2.5 bg-[var(--blue)]" style={{ clipPath: 'polygon(0 50%,100% 0,100% 100%)' }} />
            <span className="absolute -right-0.5 -top-1 w-1.5 h-2.5 bg-[var(--blue)]" style={{ clipPath: 'polygon(100% 50%,0 0,0 100%)' }} />
            <AnimatePresence mode="wait"><motion.span key={s.w} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-1/2 -translate-x-1/2 top-1.5 px-2 py-0.5 rounded-full bg-[var(--blue)] text-white text-[11px] font-semibold whitespace-nowrap">{s.w} cm</motion.span></AnimatePresence>
          </div>
        </div>
        {/* height line */}
        <div className="absolute top-[16%] bottom-[14%] right-[10%] w-px bg-[var(--blue)]">
          <AnimatePresence mode="wait"><motion.span key={s.h} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-[var(--blue)] text-white text-[11px] font-semibold whitespace-nowrap">{s.h} cm</motion.span></AnimatePresence>
        </div>
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-ink text-xs font-semibold"><Ruler className="w-3.5 h-3.5 text-[var(--blue)]" /> {s.n}</div>
      </div>
      <div className="mt-3 flex gap-2">
        {sizes.map((z, i) => <button key={z.n} onClick={() => setSi(i)} className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${si === i ? 'bg-[var(--blue)] text-white' : 'bg-[var(--blue-mist)] text-ink hover:bg-[var(--blue-soft)]'}`}>{z.n}</button>)}
      </div>
    </div>
  );
}

// #129 Note de travers
function V129() {
  return (
    <div className="relative rounded-[20px] overflow-hidden flex items-center justify-center p-8 bg-[var(--blue-mist)]" style={{ aspectRatio: '4/3' }}>
      <img src={TENTE} alt="Tente" className="relative max-h-[74%] object-contain" style={FEATHER} />
      <motion.div initial={{ rotate: -6, y: 6 }} whileHover={{ rotate: -3, y: 0 }} className="absolute bottom-5 right-5 bg-white rounded-2xl px-4 py-3 shadow-lg" style={{ transform: 'rotate(-6deg)' }}>
        <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Conception</div>
        <div className="font-display font-bold text-ink">Suisse · 2 min</div>
      </motion.div>
    </div>
  );
}

// #130 Fond bleu assorti
function V130() {
  return (
    <div className="relative rounded-[20px] overflow-hidden flex items-center justify-center p-8" style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, var(--blue-soft), #cfe2fb)' }}>
      <img src={TENTE} alt="Tente" className="relative max-h-[76%] object-contain" style={{ ...FEATHER, mixBlendMode: 'multiply' }} />
    </div>
  );
}

// #131 Carousel auto (no blue filter, arrows, framed)
function V131() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % PRODUCTS.length), 3200); return () => clearInterval(t); }, []);
  const go = (d) => setI((v) => (v + d + PRODUCTS.length) % PRODUCTS.length);
  return (
    <div className="relative rounded-[20px] overflow-hidden bg-[var(--blue-mist)] flex items-center justify-center p-8" style={{ aspectRatio: '4/3' }}>
      <AnimatePresence mode="wait"><motion.img key={i} src={PRODUCTS[i].src} alt={PRODUCTS[i].name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="relative max-h-[74%] object-contain" style={FEATHER} /></AnimatePresence>
      <button onClick={() => go(-1)} aria-label="Précédent" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-ink hover:bg-white cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
      <button onClick={() => go(1)} aria-label="Suivant" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-ink hover:bg-white cursor-pointer"><ChevronRight className="w-5 h-5" /></button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">{PRODUCTS.map((_, k) => <span key={k} className="h-1.5 rounded-full transition-all" style={{ width: k === i ? 20 : 6, background: k === i ? 'var(--blue)' : 'rgba(0,102,204,0.25)' }} />)}</div>
    </div>
  );
}

export const variants = [
  { n: 120, label: 'Studio fondu', note: 'image visible, bords fondus (corrige #22-25)', Component: V120 },
  { n: 121, label: 'Ombre de contact', note: 'posé au sol, ombre douce', Component: V121 },
  { n: 122, label: 'En prairie', note: 'composite environnement extérieur', Component: V122 },
  { n: 123, label: 'En ville', note: 'composite environnement urbain', Component: V123 },
  { n: 124, label: 'Au stade', note: 'composite événement sportif', Component: V124 },
  { n: 125, label: 'Au salon', note: 'composite intérieur / expo', Component: V125 },
  { n: 126, label: 'Sur le terrain', note: 'environnement réel Sport Air Event', Component: V126 },
  { n: 127, label: 'Environnement interactif', note: 'change le décor ET le produit', Component: V127 },
  { n: 128, label: 'Cotes sur la photo', note: 'dimensions affichées en direct', Component: V128 },
  { n: 129, label: 'Note de travers', note: 'cadre + note inclinée', Component: V129 },
  { n: 130, label: 'Fond bleu assorti', note: 'fond à la couleur du produit', Component: V130 },
  { n: 131, label: 'Carrousel auto', note: 'défile seul + flèches, sans filtre', Component: V131 },
];
