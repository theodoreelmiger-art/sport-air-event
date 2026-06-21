import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Clock, Shield, Sparkles, Truck, Star, Award, Timer, Flag, Gauge, Wind, ShieldCheck, Quote } from 'lucide-react';
import { Reveal, RevealStagger, WordsReveal, Magnetic, staggerChild, ClipReveal, Rise, MaskHeading } from '../lib/motion.jsx';
import { Counter, MouseGlow } from '../lib/interactions.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const logos = [
  { src: 'images/05_8424c8189_689347.jpg', alt: 'Adidas' },
  { src: 'images/06_a14c02a28_Aero41.jpg', alt: 'Aero41' },
  { src: 'images/07_89afe45d9_bmw-logo-1963.webp', alt: 'BMW' },
  { src: 'images/08_5a39ff037_original-0abbbcef53d5e3f30b9b852328ac5bb2.webp', alt: 'Carrefour' },
  { src: 'images/09_02717e765_Coca-Cola-Logo-Design1.jpg', alt: 'Coca-Cola' },
  { src: 'images/10_bf3d38cba_fia-federation-internationale-de-lautomobile.svg', alt: 'FIA' },
  { src: 'images/11_3712d16e9_logo_groupegrisoni_horizontal_positif_rvb-1.jpg', alt: 'Groupe Grisoni' },
  { src: 'images/12_8df77204e_Hyundai-Logo.jpg', alt: 'Hyundai' },
  { src: 'images/13_on-running-logo-vector.png', alt: 'On Running' },
];

const features = [
  { icon: Clock, title: 'Installation 2 min', desc: 'Montage ultra-rapide par une seule personne' },
  { icon: Shield, title: 'Garantie 5 ans', desc: 'Structure + impression garanties 5 ans' },
  { icon: Sparkles, title: '100% Personnalisable', desc: 'Impression HD, couleurs et formes sur mesure' },
  { icon: Truck, title: 'Livraison Europe', desc: "Livraison rapide en France et toute l'Europe" },
];

const products = [
  {
    n: '01', to: '/ArchesGonflables', img: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png', alt: 'Arches Gonflables',
    kicker: 'Impact visuel immédiat', title: 'Arches Gonflables',
    desc: 'De 5m à 10m de large, impression totale incluse. Idéales pour départs de course et événements sportifs.',
    specs: ['5m à 10m de large', 'Impression totale', 'Installation 15 min'], price: 'Dès 1 490€',
  },
  {
    n: '02', to: '/Tente', img: 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png', alt: 'Tente Spider',
    kicker: 'Notre produit phare', title: 'Tente Spider',
    desc: 'Architecture moderne avec pieds courbes. De 3×3m à 5×5m, montage en 2 minutes. Design 100% personnalisable.',
    specs: ['3×3m à 5×5m', 'Montage 2 min', 'Usage indoor/outdoor'], price: 'Dès 1 180€',
  },
  {
    n: '03', to: '/ColonnesGonflables', img: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png', alt: 'Colonnes Gonflables',
    kicker: 'Balisage élégant', title: 'Colonnes Gonflables',
    desc: 'De 2.5m à 4m de hauteur. Option éclairage LED RGB intégré. Personnalisation 360° de votre marque.',
    specs: ['2.5m à 4m', 'LED RGB optionnel', 'Installation simple'], price: 'Dès 590€',
  },
];

const reviews = [
  { ini: 'CM', grad: 'linear-gradient(135deg,#0066cc,#3b82f6)', name: 'Camille Mercier', role: 'Trail Évasion Annecy', date: '12 mai 2026',
    text: 'Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono, rendu visuel impressionnant et service client très réactif. Parfait pour nos événements professionnels.' },
  { ini: 'YB', grad: 'linear-gradient(135deg,#0891b2,#06b6d4)', name: 'Yanis B.', role: 'Agence Lumen — Lyon', date: '3 juillet 2025',
    text: 'Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande vivement.' },
  { ini: 'FN', grad: 'linear-gradient(135deg,#2563eb,#60a5fa)', name: 'Farida Nasri', role: 'Comité Marathon du Léman', date: '21 décembre 2024',
    text: 'Quatrième commande et toujours aussi satisfait. Produits haut de gamme, délais respectés, équipe professionnelle. Les structures résistent parfaitement aux conditions extérieures.' },
];

const faqs = [
  { q: 'Quel est le délai de livraison ?', a: '2 à 3 semaines pour tous nos produits avec livraison suivie.' },
  { q: 'Livrez-vous en dehors de la France ?', a: "Oui, nous livrons dans toute l'Europe avec des partenaires logistiques de confiance." },
  { q: 'Proposez-vous la location de structures ?', a: 'Non, nous nous concentrons sur la vente de structures gonflables de haute qualité pour garantir une expérience client optimale et une personnalisation complète de chaque produit.' },
  { q: 'Quelle est la garantie sur vos produits ?', a: '5 ans de garantie sur toutes nos structures gonflables.' },
  { q: "Comment se déroule l'installation ?", a: 'Installation ultra-rapide en 2 minutes seulement ! Notre système de gonflage intuitif permet une mise en place simple et efficace, réalisable par une seule personne.' },
  { q: 'Peut-on personnaliser entièrement la structure ?', a: 'Absolument ! Nous offrons une personnalisation complète 360° avec impression HD de votre logo, couleurs corporate et design sur mesure.' },
];

const Stars = ({ size }) => (
  <>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${size} fill-amber-400 text-amber-400`} />)}</>
);

/* ── Stats (animated counters · design #50) ───────────────────────────── */
const STATS = [
  { value: 20, suffix: ' ans', label: "D'expérience" },
  { value: 2, suffix: ' min', label: 'Installation' },
  { value: 100, suffix: '%', label: 'Conception Suisse' },
];
const STAT_ICONS = [Award, Timer, Flag];

/* useCountUp — count-up on mount via requestAnimationFrame (easeOutCubic). */
function useCountUp(target, { duration = 1500 } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  useEffect(() => {
    let start = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * ease(p)));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    setValue(0);
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return value;
}

/* Progress-ring stat (design #50) — arc fills while the number counts up;
   clicking a ring promotes it (active selection). */
function StatRing({ stat, Icon, active, onSelect, duration }) {
  const value = useCountUp(stat.value, { duration });
  const ratio = Math.min(value / stat.value, 1);
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      data-cursor
      className="cursor-pointer text-center outline-none"
      style={{
        border: `1px solid ${active ? 'var(--blue)' : 'var(--line)'}`,
        background: active ? 'var(--blue-mist)' : '#ffffff',
        borderRadius: 18,
        padding: '16px 8px 14px',
        transition: 'background .2s, border-color .2s',
      }}
    >
      <div style={{ position: 'relative', width: 84, height: 84, margin: '0 auto' }}>
        <svg width="84" height="84" viewBox="0 0 84 84">
          <circle cx="42" cy="42" r={R} fill="none" stroke="var(--blue-soft)" strokeWidth="8" />
          <circle cx="42" cy="42" r={R} fill="none" stroke="var(--blue)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - ratio)} transform="rotate(-90 42 42)" />
        </svg>
        <span className="inline-flex items-center justify-center" style={{ position: 'absolute', inset: 0, margin: 'auto', width: 28, height: 28, color: 'var(--blue)' }}>
          <Icon size={18} strokeWidth={2.2} />
        </span>
      </div>
      <div className="font-display" style={{ marginTop: 10, fontSize: '1.6rem', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
        {value}<span style={{ color: 'var(--blue)', fontSize: '0.6em' }}>{stat.suffix}</span>
      </div>
      <div style={{ marginTop: 5, fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-2)' }}>{stat.label}</div>
    </motion.div>
  );
}

/* Stats section (animated progress-ring counters · design #50). */
function StatsRings() {
  const [active, setActive] = useState(1);
  const durations = [1500, 1100, 1800];
  return (
    <section className="bg-white border-b border-[var(--line)] py-16 md:py-20">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <div className="kicker" style={{ color: 'var(--blue)' }}>Performance</div>
            <h3 className="font-display font-bold text-ink tracking-tight" style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)', lineHeight: 1.05, marginTop: 6 }}>Nos repères</h3>
          </div>
          <span className="inline-flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--blue-soft)', color: 'var(--blue)' }}>
            <Gauge size={20} strokeWidth={2.2} />
          </span>
        </div>
        <RevealStagger className="grid grid-cols-3 gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <motion.div variants={staggerChild} key={s.label}>
              <StatRing stat={s} Icon={STAT_ICONS[i]} active={i === active} onSelect={() => setActive(i)} duration={durations[i]} />
            </motion.div>
          ))}
        </RevealStagger>
        <Reveal as="div" delay={0.1} className="flex items-center gap-2 mt-4" style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--blue-mist)', padding: '10px 14px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-2)' }}>
          <Wind size={16} strokeWidth={2.2} style={{ color: 'var(--blue)', flexShrink: 0 }} />
          <span>{STATS[active].label} — sélectionné</span>
        </Reveal>
      </div>
    </section>
  );
}

/* Soft radial feather mask (design #87) so each logo dissolves into its
   white chip with no visible square edge. */
const logoMask = {
  WebkitMaskImage: 'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)',
  maskImage: 'radial-gradient(130% 130% at 50% 48%, #000 60%, transparent 92%)',
  clipPath: 'inset(0.5% 2.2% 0.5% 0.5%)',
};

/* Reviews carousel (design #53) — one deep-blue framed slide at a time,
   animated directional transitions, prev/next buttons + clickable dots. */
function ReviewsCarousel() {
  const [[idx, dir], setState] = useState([0, 0]);
  const go = (d) => setState(([i]) => [(i + d + reviews.length) % reviews.length, d]);
  const jump = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);
  const r = reviews[idx];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-sm font-bold text-ink"><Counter to={4.9} decimals={1} /> / <Counter to={127} /> avis</span>
        </div>
        <div className="flex items-center gap-1"><Stars size="w-4 h-4" /></div>
      </div>

      <div className="relative overflow-hidden" style={{ borderRadius: 22 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={idx} custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
            transition={{ duration: 0.28 }} className="bg-deep" style={{ borderRadius: 22, padding: '26px 26px 22px', color: '#fff' }}>
            <div className="flex items-center justify-between mb-4">
              <Quote size={28} color="#9fc6ff" fill="#9fc6ff" style={{ opacity: 0.85 }} />
              <span className="inline-flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,.12)', borderRadius: 9999, padding: '4px 11px 4px 8px', fontSize: '0.72rem', fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Publié sur Google
              </span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.55, margin: '0 0 20px', color: '#eaf2ff' }}>{r.text}</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center font-display shrink-0 text-white font-bold" style={{ width: 44, height: 44, borderRadius: 9999, background: r.grad, fontSize: '0.95rem' }}>{r.ini}</span>
              <div>
                <div className="text-sm font-bold">{r.name}</div>
                <div className="text-xs" style={{ color: '#a8c2e6' }}>{r.role}</div>
              </div>
              <span className="ml-auto flex items-center gap-0.5"><Stars size="w-3.5 h-3.5" /></span>
            </div>
            <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="text-xs" style={{ color: '#a8c2e6' }}>{r.date}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {[-1, 1].map((d) => (
            <motion.button key={d} type="button" onClick={() => go(d)} whileTap={{ scale: 0.9 }} data-cursor
              aria-label={d < 0 ? 'Précédent' : 'Suivant'} className="cursor-pointer inline-flex items-center justify-center"
              style={{ width: 40, height: 40, borderRadius: 9999, border: '1px solid var(--line)', background: '#ffffff', color: 'var(--blue)' }}>
              {d < 0 ? <ChevronLeft size={18} strokeWidth={2.4} /> : <ChevronRight size={18} strokeWidth={2.4} />}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button key={i} type="button" onClick={() => jump(i)} aria-label={`Avis ${i + 1}`} data-cursor className="cursor-pointer"
              style={{ width: i === idx ? 22 : 8, height: 8, borderRadius: 9999, background: i === idx ? 'var(--blue)' : 'var(--line)', border: 'none', transition: 'width .25s, background .25s', padding: 0 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Sticky scrollytelling product showcase (desktop) + stacked (mobile) */
function ProductShowcase() {
  return (
    <section id="structures" className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9 md:mb-12">
        <SectionHeader kicker="Nos solutions" index="01" title={<>Des structures pensées<br />pour tous vos événements</>} />
        <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
          <Sparkles className="w-4 h-4 text-[var(--blue)]" />
          Chaque produit disponible en version <span className="text-ink font-medium">Sur Mesure</span>
        </Reveal>
      </div>

      <div className="space-y-14 md:space-y-20">
        {products.map((p, i) => (
          <div key={p.to} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <ClipReveal className="rounded-[28px]" scaleFrom={1.18}>
                <div className="relative bg-gradient-to-br from-[var(--blue-mist)] to-[var(--blue-soft)] border border-[var(--line)] flex items-center justify-center p-10 md:p-16 group" style={{ aspectRatio: '4 / 3' }}>
                  <span className="absolute top-5 left-7 font-display font-bold leading-none text-[var(--blue)]/[0.07] select-none" style={{ fontSize: 'clamp(6rem,12vw,11rem)' }}>{p.n}</span>
                  <div className="absolute w-1/2 h-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.16), transparent 70%)', filter: 'blur(40px)' }} />
                  <motion.img src={p.img} alt={p.alt} loading="eager" className="relative max-h-[86%] object-contain product-render"
                    whileHover={{ scale: 1.05, rotate: -1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </ClipReveal>
            </div>
            <div className={i % 2 ? 'md:order-1' : ''}>
              <Reveal as="div" y={20} className="flex items-center gap-3 mb-5">
                <span className="font-display text-4xl font-bold text-[var(--blue)]/20">{p.n}</span><span className="kicker">{p.kicker}</span>
              </Reveal>
              <h3 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2rem,3.6vw,3.2rem)', lineHeight: 1.0 }}><MaskHeading text={p.title} /></h3>
              <Rise as="p" y={26} delay={0.1} className="lead mt-5 max-w-md">{p.desc}</Rise>
              <Reveal as="ul" y={20} delay={0.16} className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
                {p.specs.map((s) => <li key={s} className="flex items-center gap-2 text-sm text-ink/75"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />{s}</li>)}
              </Reveal>
              <Reveal as="div" y={20} delay={0.22} className="mt-9 flex items-center gap-7">
                <span className="font-display text-2xl font-bold text-ink">{p.price}</span>
                <Magnetic>
                  <Link to={p.to} data-cursor className="group inline-flex items-center gap-2 text-sm font-semibold text-ink border-b-2 border-[var(--blue)]/25 hover:border-[var(--blue)] hover:text-[var(--blue)] pb-1 transition-colors">
                    Découvrir <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        ))}
      </div>

      <Reveal className="mt-20 pt-12 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="font-display text-xl md:text-2xl font-semibold text-ink max-w-md tracking-tight">Un projet sur mesure ? Parlons-en.</p>
        <Magnetic>
          <Link to="/Contact" data-cursor className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
            Demander un devis <ArrowRight className="w-4 h-4" />
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-x-clip bg-white">
      {/* ░░ HERO ░░ */}
      <section ref={heroRef} className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: '100svh' }}>
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <motion.img src="images/01_352cf8bae_WhatsAppImage2026-01-17at132722.jpg" alt="Sport Air Event – Structures gonflables événementielles"
            className="w-full h-[124%] object-cover object-center" fetchpriority="high"
            initial={{ scale: 1.16 }} animate={{ scale: 1 }} transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(175deg, rgba(6,36,95,0.30) 0%, rgba(0,102,204,0.20) 36%, rgba(4,23,63,0.90) 100%)' }} />
        </motion.div>
        <MouseGlow color="rgba(70,150,255,0.40)" size={620} />
        <motion.div style={{ y: orb1Y }} className="absolute -top-10 right-[12%] w-72 h-72 rounded-full pointer-events-none" />
        <motion.div style={{ y: orb2Y, background: 'radial-gradient(circle, rgba(31,122,224,0.5), transparent 70%)', filter: 'blur(40px)' }} className="absolute top-1/4 left-[8%] w-80 h-80 rounded-full pointer-events-none" />

        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block z-10">
          <div className="text-white/40 text-[11px] font-semibold tracking-[0.34em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Structures gonflables · Suisse</div>
        </div>

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full max-w-content mx-auto px-5 sm:px-8 lg:px-16 pb-14 md:pb-20" >
          <div style={{ paddingTop: 'clamp(120px,18vw,180px)' }}>
            <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-white/50" />
              <span className="kicker" style={{ color: 'rgba(255,255,255,0.92)' }}>🇨🇭 Conception Suisse · Swiss Quality</span>
            </Reveal>
            <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.6rem,7.5vw,6.4rem)', lineHeight: 0.95, maxWidth: '16ch' }}>
              <WordsReveal text="Structures gonflables" />{' '}
              <WordsReveal text="événementielles" delay={0.16} />{' '}
              <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}><WordsReveal text="pour professionnels" delay={0.4} /></span>
            </h1>
            <Reveal as="p" delay={0.55} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Tentes gonflables, arches publicitaires, dômes événementiels et mobilier gonflable personnalisé. Conception Suisse, installation rapide 2 minutes.
            </Reveal>
            <Reveal as="div" delay={0.66} className="mt-9 flex flex-col sm:flex-row gap-3">
              <Magnetic>
                <Link to="/Contact" data-cursor className="cta-iridescent inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px]">Obtenir un devis <ArrowRight className="w-4 h-4" /></Link>
              </Magnetic>
              <Link to="/Tente" data-cursor className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">Découvrir nos solutions</Link>
            </Reveal>
            <Reveal as="div" delay={0.8} className="mt-12 md:mt-16 flex items-stretch gap-6 sm:gap-10">
              {[[20, '', 'ans', "D'expérience", 0], [2, '', 'min', 'Installation', 0], [100, '%', '', 'Conception Suisse', 0]].map(([num, suf, unit, label], i) => (
                <div key={i} className="flex items-stretch gap-6 sm:gap-10">
                  {i > 0 && <span className="w-px self-stretch bg-white/20" />}
                  <div>
                    <div className="font-display text-white font-bold leading-none flex items-baseline gap-0.5" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.7rem)', letterSpacing: '-0.03em' }}>
                      <Counter to={num} suffix={suf} />{unit && <span className="text-white/55 text-[0.55em] font-semibold ml-0.5">{unit}</span>}
                    </div>
                    <div className="text-white/55 text-xs font-medium mt-1.5">{label}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </motion.div>
        <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 text-white/45 text-xs z-10">
          <span className="uppercase tracking-[0.2em]">Scroll</span>
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ChevronDown className="w-4 h-4" /></motion.span>
        </div>
      </section>

      {/* ░░ PRODUCTS — sticky scrollytelling (le plus important, juste après le héros) ░░ */}
      <ProductShowcase />

      {/* ░░ TRUST / LOGOS — marquee infini (design #87) ░░ */}
      <section className="bg-white border-b border-[var(--line)] py-10">
        <div className="flex items-center justify-center gap-2 mb-7">
          <ShieldCheck size={18} className="text-[var(--blue)]" strokeWidth={2.4} />
          <p className="kicker" style={{ color: 'var(--blue)' }}>Ils nous font confiance</p>
        </div>
        <div className="relative">
          {/* Fade edges so logos slide in/out softly (white → transparent) */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right,#fff,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left,#fff,transparent)' }} />
          {/* .logo-track scrolls continuously and never pauses (no hover pause) */}
          <div className="logo-track">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                aria-hidden={i >= logos.length ? true : undefined}
                className="shrink-0 flex items-center justify-center"
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  height: 56,
                  margin: '0 11px',
                  padding: '0 20px',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="eager"
                  width="120"
                  height="40"
                  draggable={false}
                  style={{ height: 30, width: 'auto', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.72, pointerEvents: 'none', ...logoMask }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ REVIEWS ░░ */}
      <section className="bg-[var(--blue-mist)] border-y border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeader kicker="Témoignages" index="02" title={<>Ils nous font<br />confiance</>} />
            <Reveal as="div" delay={0.1} className="flex items-center gap-4 md:pb-2">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <div className="flex items-center gap-1"><Stars size="w-4 h-4" /></div>
                <span className="font-display text-xl font-bold text-ink ml-1"><Counter to={4.9} decimals={1} /></span>
              </div>
              <span className="text-sm text-[var(--muted)]">Basé sur <strong className="text-ink/70"><Counter to={127} /></strong> avis</span>
            </Reveal>
          </div>
          {/* Carousel (prev / next + dots · design #53) */}
          <Reveal as="div" className="max-w-2xl mx-auto">
            <ReviewsCarousel />
          </Reveal>
        </div>
      </section>

      {/* ░░ MANIFESTO (Pourquoi) — repoussé en bas ░░ */}
      <section className="bg-deep text-white relative overflow-hidden">
        <MouseGlow color="rgba(70,150,255,0.22)" size={680} />
        <div className="relative max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-9 md:mb-12">
            <div className="lg:col-span-7">
              <SectionHeader light kicker="Pourquoi Sport Air Event" index="—" title={<>Conçues en Suisse.<br />Montées en deux minutes.<br /><span className="serif-accent text-white/55">Pensées pour votre marque.</span></>} />
            </div>
            <Reveal as="p" delay={0.1} className="lg:col-span-5 text-white/65 leading-relaxed">
              Depuis 20 ans, nous fabriquons des structures gonflables événementielles haut de gamme : impact visuel maximal, durabilité et personnalisation complète, pour les marques et les événements les plus exigeants.
            </Reveal>
          </div>
          {/* Hairline divided rows w/ index (design #42) — display only, no quantity controls */}
          <RevealStagger style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
            {features.map((f, i) => (
              <motion.div
                variants={staggerChild}
                key={i}
                data-cursor
                className="group relative flex items-center gap-4 overflow-hidden hover:bg-white/[0.04] transition-colors duration-200"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', padding: '15px 14px 15px 12px' }}
              >
                <span className="font-display shrink-0 tabular-nums" style={{ fontSize: '0.95rem', fontWeight: 700, width: 26, color: 'rgba(125,180,240,0.65)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex items-center justify-center shrink-0 text-[#7db4f0]">
                  <f.icon size={20} strokeWidth={2.1} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display" style={{ fontSize: '0.96rem', lineHeight: 1.2, fontWeight: 600, color: '#ffffff' }}>{f.title}</span>
                  <span className="block" style={{ fontSize: '0.82rem', lineHeight: 1.35, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{f.desc}</span>
                </span>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ STATS — Nos performances, repoussées en bas (design #50) ░░ */}
      <StatsRings />

      {/* ░░ FAQ ░░ */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeader align="center" kicker="Questions fréquentes" className="mb-12" title="Tout ce que vous devez savoir" lead="Des réponses claires à vos questions" />
          {/* Accordéon hairline (design #57) — ultra-sober, single-open */}
          <RevealStagger style={{ borderTop: '1px solid var(--line)' }}>
            {faqs.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div key={i} variants={staggerChild} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-cursor
                    className="cursor-pointer w-full flex items-center gap-3.5 text-left"
                    style={{ padding: '16px 2px', background: 'transparent', border: 'none' }}
                  >
                    <h3 className="font-display flex-1" style={{ fontSize: '1rem', fontWeight: 600, color: isOpen ? 'var(--blue-deep)' : 'var(--ink)', transition: 'color 0.2s' }}>{q}</h3>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'grid', placeItems: 'center', width: 26, height: 26, flexShrink: 0, color: isOpen ? 'var(--blue)' : 'var(--ink-2)' }}>
                      <ChevronDown size={18} strokeWidth={2.2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                        <p style={{ margin: 0, padding: '0 40px 18px 2px', fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--ink-2)' }}>{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ CTA — dégradé bleu profond, action unique centrée (design #94) ░░ */}
      <section className="px-5 sm:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-deep relative max-w-content mx-auto overflow-hidden rounded-[28px] text-white"
        >
          <MouseGlow color="rgba(70,150,255,0.3)" size={560} />
          {/* Soft radial accent */}
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% -10%, rgba(59,130,246,0.45) 0%, rgba(10,30,66,0) 60%)' }} />
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.12]">
              <Sparkles className="h-5 w-5" />
            </div>
            <Reveal as="h2" delay={0.05} className="font-display font-bold tracking-tightest mt-5" style={{ fontSize: 'clamp(2.1rem,5vw,4rem)', lineHeight: 1.05, maxWidth: '16ch' }}>Prêt à marquer les esprits ?</Reveal>
            <Reveal as="p" delay={0.12} className="mt-3 text-white/75 text-lg max-w-md">Conception Suisse. Livraison France et Europe.</Reveal>
            {/* Single prominent action, centered at the bottom — no call/message split */}
            <Reveal delay={0.2} className="mt-9 w-full flex justify-center">
              <Magnetic>
                <Link to="/Contact" data-cursor className="inline-flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-white text-[var(--blue)] font-semibold px-8 py-4 text-[15px] hover:bg-white/90 transition-colors">
                  Demander un devis <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] text-white/55">
              <ShieldCheck className="h-3.5 w-3.5" />
              Réponse sous 24 h — devis sans engagement
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
