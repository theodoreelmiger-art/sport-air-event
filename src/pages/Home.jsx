import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Clock, Shield, Sparkles, Truck, Star } from 'lucide-react';
import { Reveal, RevealStagger, WordsReveal, Magnetic, staggerChild } from '../lib/motion.jsx';
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
    to: '/ArchesGonflables', img: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png', alt: 'Arches Gonflables',
    kicker: 'Impact visuel immédiat', title: 'Arches Gonflables',
    desc: 'De 5m à 10m de large, impression totale incluse. Idéales pour départs de course et événements sportifs.',
    specs: ['5m à 10m de large', 'Impression totale', 'Installation 15 min'], price: 'Dès 1 490€', featured: false,
  },
  {
    to: '/Tente', img: 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png', alt: 'Tente Spider',
    kicker: 'Notre produit phare', title: 'Tente Spider',
    desc: 'Architecture moderne avec pieds courbes. De 3×3m à 5×5m, montage en 2 minutes. Design 100% personnalisable.',
    specs: ['3×3m à 5×5m', 'Montage 2 min', 'Usage indoor/outdoor'], price: 'Dès 1 180€', featured: true,
  },
  {
    to: '/ColonnesGonflables', img: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png', alt: 'Colonnes Gonflables',
    kicker: 'Balisage élégant', title: 'Colonnes Gonflables',
    desc: 'De 2.5m à 4m de hauteur. Option éclairage LED RGB intégré. Personnalisation 360° de votre marque.',
    specs: ['2.5m à 4m', 'LED RGB optionnel', 'Installation simple'], price: 'Dès 590€', featured: false,
  },
];

const reviews = [
  { ini: 'LD', grad: 'linear-gradient(135deg,#0066cc,#3b82f6)', name: 'Laurent Dubois', role: 'EventPro France', date: '28 avril 2026',
    text: 'Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono, rendu visuel impressionnant et service client très réactif. Parfait pour nos événements professionnels.' },
  { ini: 'SM', grad: 'linear-gradient(135deg,#0891b2,#06b6d4)', name: 'Sophie Martin', role: 'Marketing & Events', date: '17 juillet 2025',
    text: 'Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande vivement.' },
  { ini: 'JR', grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)', name: 'Jean-Pierre Rousseau', role: 'Sports & Festivals', date: '15 décembre 2024',
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="overflow-x-hidden bg-paper">
      {/* HERO */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: '100svh' }}>
        <div className="absolute inset-0">
          <motion.img
            src="images/01_352cf8bae_WhatsAppImage2026-01-17at132722.jpg"
            alt="Sport Air Event – Structures gonflables événementielles"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
            initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,13,18,0.35) 0%, rgba(11,13,18,0.25) 40%, rgba(11,13,18,0.82) 100%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-content mx-auto px-5 sm:px-8 pb-14 md:pb-20" style={{ paddingTop: 'clamp(110px,16vw,160px)' }}>
          <Reveal as="div" y={16} className="flex items-center gap-3 mb-6">
            <span className="h-px w-9 bg-white/50" />
            <span className="kicker text-white/90" style={{ color: 'rgba(255,255,255,0.9)' }}>🇨🇭 Conception Suisse · Swiss Quality</span>
          </Reveal>

          <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.5rem,7vw,6rem)', lineHeight: 0.98, maxWidth: '15ch' }}>
            <WordsReveal text="Structures gonflables" />{' '}
            <WordsReveal text="événementielles" delay={0.18} />{' '}
            <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>
              <WordsReveal text="pour professionnels" delay={0.42} />
            </span>
          </h1>

          <Reveal as="p" delay={0.55} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.78)' }}>
            Tentes gonflables, arches publicitaires, dômes événementiels et mobilier gonflable personnalisé.
            Conception Suisse, installation rapide 2 minutes.
          </Reveal>

          <Reveal as="div" delay={0.65} className="mt-9 flex flex-col sm:flex-row gap-3">
            <Magnetic>
              <Link to="/Contact" className="cta-iridescent inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px]">
                Obtenir un devis <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <Link to="/Tente" className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 text-[15px] rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
              Découvrir nos solutions
            </Link>
          </Reveal>

          <Reveal as="div" delay={0.8} className="mt-12 md:mt-16 flex items-stretch gap-6 sm:gap-10">
            {[['20', 'ans', "D'expérience"], ['2', 'min', 'Installation'], ['100', '%', 'Conception Suisse']].map(([n, u, l], i) => (
              <div key={i} className="flex items-stretch gap-6 sm:gap-10">
                {i > 0 && <span className="w-px self-stretch bg-white/20" />}
                <div>
                  <div className="font-display text-white font-bold leading-none flex items-baseline gap-0.5" style={{ fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', letterSpacing: '-0.03em' }}>
                    {n}<span className="text-white/55 text-[0.55em] font-semibold">{u}</span>
                  </div>
                  <div className="text-white/55 text-xs font-medium mt-1.5">{l}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 text-white/50 text-xs">
          <span className="uppercase tracking-[0.16em]">Scroll</span>
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white border-y border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--line)]">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.08} className="p-6 md:p-9 [&:nth-child(3)]:border-t lg:[&:nth-child(3)]:border-t-0 [&:nth-child(4)]:border-t lg:[&:nth-child(4)]:border-t-0 border-[var(--line)]">
              <div className="flex items-center justify-between mb-7">
                <f.icon className="w-5 h-5 text-[var(--blue)]" />
                <span className="text-xs font-semibold text-ink/25 tabular-nums">0{i + 1}</span>
              </div>
              <div className="font-display font-semibold text-ink text-[15px] mb-1.5">{f.title}</div>
              <div className="text-[13px] text-[var(--muted)] leading-relaxed">{f.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="structures" className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <SectionHeader kicker="Nos solutions" index="01"
            title={<>Des structures pensées<br />pour tous vos événements</>}
          />
          <Reveal as="div" delay={0.1} className="flex items-center gap-2 text-sm text-[var(--muted)] md:pb-2">
            <Sparkles className="w-4 h-4 text-[var(--blue)]" />
            Chaque produit disponible en version <span className="text-ink font-medium">Sur Mesure</span>
          </Reveal>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start auto-rows-fr">
          {products.map((p) => (
            <motion.div key={p.to} variants={staggerChild} style={{ gridRow: p.featured ? 'span 2' : 'span 1' }}>
              <Link to={p.to} className="group block h-full">
                <div className={`relative flex flex-col h-full rounded-[var(--radius-lg)] overflow-hidden bg-white transition-all duration-500 ${p.featured ? 'border border-[var(--blue)]/25 shadow-[0_24px_60px_-20px_rgba(0,102,204,0.35)]' : 'border border-[var(--line)] hover:border-ink/15'} group-hover:-translate-y-1`}>
                  {p.featured && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ background: 'var(--blue)' }}>
                      ⭐ Produit phare
                    </div>
                  )}
                  <div className="flex items-center justify-center p-6 md:p-8 flex-1 bg-[var(--paper-2)]" style={{ minHeight: p.featured ? 280 : 180 }}>
                    <img src={p.img} alt={p.alt} loading="lazy" className="max-h-44 md:max-h-56 object-contain transition-transform duration-700 group-hover:scale-[1.04]" style={{ mixBlendMode: 'multiply' }} />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="kicker mb-3">{p.kicker}</div>
                    <h3 className="font-display font-bold text-ink text-xl md:text-2xl mb-2.5">{p.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 flex-1">{p.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {p.specs.map((s) => (
                        <li key={s} className="flex items-center gap-2.5 text-sm text-ink/70">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />{s}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-5 border-t border-[var(--line)] mt-auto">
                      <span className="font-display text-xl font-bold text-ink">{p.price}</span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--blue)] group-hover:gap-2.5 transition-all">
                        Voir <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </RevealStagger>

        <Reveal className="mt-12">
          <Magnetic>
            <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      {/* LOGOS */}
      <section className="bg-white border-y border-[var(--line)] py-12">
        <p className="text-center kicker mb-8" style={{ color: 'var(--muted)' }}>Ils nous font confiance</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right,#fff,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left,#fff,transparent)' }} />
          <div className="logo-track">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div className="logo-item" key={i}><img src={logo.src} alt={logo.alt} loading="eager" width="120" height="40" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="flex flex-col items-center text-center mb-14">
          <Reveal as="div" y={14} className="flex items-center gap-2 mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm font-semibold text-ink/70">Avis</span>
          </Reveal>
          <Reveal as="div" delay={0.05} className="flex items-center justify-center gap-1 mb-2">
            <Stars size="w-5 h-5" /><span className="ml-2 font-display text-2xl font-bold text-ink">4.9</span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-sm text-[var(--muted)]">Basé sur <strong className="text-ink/70">127</strong> avis</Reveal>
        </div>
        <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <motion.div key={r.ini} variants={staggerChild} className="flex flex-col p-7 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] hover:border-ink/15 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: r.grad }}>{r.ini}</div>
                <div><div className="font-semibold text-sm text-ink">{r.name}</div><div className="text-xs text-[var(--muted)]">{r.role}</div></div>
              </div>
              <div className="flex items-center gap-0.5 mb-3"><Stars size="w-3.5 h-3.5" /></div>
              <p className="text-sm text-ink/70 leading-relaxed flex-1">{r.text}</p>
              <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">{r.date}</span>
                <span className="text-xs text-[var(--muted)]">Publié sur Google</span>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-[var(--line)] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeader align="center" kicker="Questions fréquentes" className="mb-12"
            title="Tout ce que vous devez savoir" lead="Des réponses claires à vos questions" />
          <RevealStagger className="border-t border-[var(--line)]">
            {faqs.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div key={i} variants={staggerChild} className="border-b border-[var(--line)]">
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-4 text-left py-6 group">
                    <h3 className="font-display text-[17px] md:text-lg font-semibold text-ink group-hover:text-[var(--blue)] transition-colors">{q}</h3>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--line)]">
                      <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                        <p className="text-[15px] text-[var(--muted)] leading-relaxed pb-6 max-w-2xl">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 py-20">
        <div className="relative max-w-content mx-auto rounded-[28px] overflow-hidden flex items-center justify-center" style={{ minHeight: 360 }}>
          <img src="images/01_352cf8bae_WhatsAppImage2026-01-17at132722.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(0,102,204,0.88), rgba(11,13,18,0.78))' }} />
          <div className="relative z-10 text-center px-6 py-20 max-w-2xl">
            <Reveal as="h2" className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2rem,4.5vw,3.6rem)', lineHeight: 1.02 }}>
              Prêt à marquer les esprits ?
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-white/75 text-lg">Conception Suisse. Livraison France et Europe.</Reveal>
            <Reveal delay={0.18} className="mt-8">
              <Magnetic>
                <Link to="/Contact" className="inline-flex items-center gap-2 bg-white text-ink font-semibold rounded-full px-8 py-4 text-[15px] hover:bg-white/90 transition-colors">
                  Demander un devis gratuit <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
