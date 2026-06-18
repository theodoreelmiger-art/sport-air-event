import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Shield,
  Sparkles,
  Truck,
  Star,
} from 'lucide-react';
import { Reveal, RevealStagger } from '../lib/motion.jsx';
import { staggerChild } from '../lib/motion.jsx';

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

const faqs = [
  {
    q: 'Quel est le délai de livraison ?',
    a: '2 à 3 semaines pour tous nos produits avec livraison suivie.',
  },
  {
    q: 'Livrez-vous en dehors de la France ?',
    a: "Oui, nous livrons dans toute l'Europe avec des partenaires logistiques de confiance.",
  },
  {
    q: 'Proposez-vous la location de structures ?',
    a: 'Non, nous nous concentrons sur la vente de structures gonflables de haute qualité pour garantir une expérience client optimale et une personnalisation complète de chaque produit.',
  },
  {
    q: 'Quelle est la garantie sur vos produits ?',
    a: '5 ans de garantie sur toutes nos structures gonflables.',
  },
  {
    q: "Comment se déroule l'installation ?",
    a: 'Installation ultra-rapide en 2 minutes seulement ! Notre système de gonflage intuitif permet une mise en place simple et efficace, réalisable par une seule personne.',
  },
  {
    q: 'Peut-on personnaliser entièrement la structure ?',
    a: 'Absolument ! Nous offrons une personnalisation complète 360° avec impression HD de votre logo, couleurs corporate et design sur mesure.',
  },
];

const StarRow = ({ size }) => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`lucide lucide-star ${size} fill-amber-400 text-amber-400`} />
    ))}
  </>
);

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="min-h-screen bg-white">
      <main>
        <div>
          {/* HERO */}
          <section
            className="relative flex flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: '100svh' }}
          >
            <div className="absolute inset-0">
              <img
                src="images/01_352cf8bae_WhatsAppImage2026-01-17at132722.jpg"
                alt="Sport Air Event – Structures gonflables événementielles"
                className="w-full h-full object-cover object-center"
                fetchpriority="high"
              />
              <div
                className="absolute inset-0 md:hidden"
                style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.72))' }}
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.65))' }}
              />
            </div>
            <div
              className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center"
              style={{ padding: 'clamp(80px, 15vw, 128px) clamp(16px, 5vw, 32px) clamp(24px, 6vw, 96px)' }}
            >
              <Reveal
                className="inline-flex items-center gap-2 rounded-full mb-4 md:mb-10"
                style={{
                  padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <span className="text-base">🇨🇭</span>
                <span
                  className="text-white font-semibold tracking-wide"
                  style={{ fontSize: 'clamp(11px, 2.5vw, 14px)' }}
                >
                  Conception Suisse · Swiss Quality
                </span>
              </Reveal>
              <Reveal
                as="h1"
                delay={0.05}
                className="text-white font-black leading-[1.0] tracking-tight mb-3 md:mb-6"
                style={{
                  fontSize: 'clamp(30px, 5.5vw, 88px)',
                  letterSpacing: '-0.04em',
                  maxWidth: '820px',
                  lineHeight: 1,
                }}
              >
                Structures gonflables événementielles
                <br />
                <span style={{ opacity: 0.6, fontSize: 'clamp(26px, 4.5vw, 72px)' }}>
                  pour professionnels
                </span>
              </Reveal>
              <Reveal
                as="p"
                delay={0.1}
                className="text-white/80 leading-relaxed mb-6 md:mb-12 mx-auto"
                style={{ fontSize: 'clamp(13px, 2.5vw, 20px)', maxWidth: '560px' }}
              >
                Tentes gonflables, arches publicitaires, dômes événementiels et mobilier gonflable
                personnalisé. Conception Suisse, installation rapide 2 minutes.
              </Reveal>
              <Reveal
                delay={0.15}
                className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full"
              >
                <div className="sm:w-auto" tabIndex={0} style={{ width: 'clamp(260px, 85%, 320px)' }}>
                  <Link className="sm:w-auto w-full" to="/Contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="cta-iridescent w-full sm:w-auto flex items-center justify-center gap-2 font-semibold text-white"
                      style={{
                        borderRadius: '9999px',
                        padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
                        fontSize: 'clamp(14px, 2vw, 16px)',
                        minHeight: '48px',
                      }}
                    >
                      Obtenir un devis
                      <span>
                        <ArrowRight className="lucide lucide-arrow-right w-4 h-4 flex-shrink-0" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
                <div className="sm:w-auto" tabIndex={0} style={{ width: 'clamp(260px, 85%, 320px)' }}>
                  <Link className="sm:w-auto w-full" to="/Tente">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 font-semibold text-white"
                      style={{
                        borderRadius: '9999px',
                        backdropFilter: 'blur(20px)',
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 32px)',
                        fontSize: 'clamp(14px, 2vw, 16px)',
                        minHeight: '48px',
                      }}
                    >
                      Découvrir nos solutions
                    </motion.button>
                  </Link>
                </div>
              </Reveal>
              <Reveal
                delay={0.2}
                className="mt-8 md:mt-20 flex items-center relative z-10"
                style={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(0, 0, 0, 0.32)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '9999px',
                  padding: 'clamp(8px, 1.5vw, 12px) clamp(4px, 1vw, 8px)',
                }}
              >
                <div className="text-center px-3 sm:px-6">
                  <div
                    className="text-white font-black leading-tight"
                    style={{ fontSize: 'clamp(16px, 3.5vw, 30px)', letterSpacing: '-0.03em' }}
                  >
                    20 ans
                  </div>
                  <div
                    className="text-white/60 font-medium mt-0.5"
                    style={{ fontSize: 'clamp(9px, 1.5vw, 12px)' }}
                  >
                    {"D'expérience"}
                  </div>
                </div>
                <div className="w-px self-stretch bg-white/20 mx-2 sm:mx-4" />
                <div className="text-center px-3 sm:px-6">
                  <div
                    className="text-white font-black leading-tight"
                    style={{ fontSize: 'clamp(16px, 3.5vw, 30px)', letterSpacing: '-0.03em' }}
                  >
                    2 min
                  </div>
                  <div
                    className="text-white/60 font-medium mt-0.5"
                    style={{ fontSize: 'clamp(9px, 1.5vw, 12px)' }}
                  >
                    Installation
                  </div>
                </div>
                <div className="w-px self-stretch bg-white/20 mx-2 sm:mx-4" />
                <div className="text-center px-3 sm:px-6">
                  <div
                    className="text-white font-black leading-tight"
                    style={{ fontSize: 'clamp(16px, 3.5vw, 30px)', letterSpacing: '-0.03em' }}
                  >
                    100%
                  </div>
                  <div
                    className="text-white/60 font-medium mt-0.5"
                    style={{ fontSize: 'clamp(9px, 1.5vw, 12px)' }}
                  >
                    Conception Suisse
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:block">
              <ChevronDown className="lucide lucide-chevron-down w-6 h-6 text-white" />
            </div>
          </section>

          {/* FEATURES */}
          <section
            className="section-features py-16 md:py-24"
            style={{ paddingTop: '60px', paddingBottom: '60px' }}
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl p-5 md:p-7 transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-4 rounded-xl"
                    style={{ background: 'rgba(26, 86, 219, 0.08)' }}
                  >
                    <Clock className="lucide lucide-clock w-5 h-5" style={{ color: 'rgb(26, 86, 219)' }} />
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1.5">Installation 2 min</div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Montage ultra-rapide par une seule personne
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl p-5 md:p-7 transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-4 rounded-xl"
                    style={{ background: 'rgba(26, 86, 219, 0.08)' }}
                  >
                    <Shield className="lucide lucide-shield w-5 h-5" style={{ color: 'rgb(26, 86, 219)' }} />
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1.5">Garantie 5 ans</div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Structure + impression garanties 5 ans
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl p-5 md:p-7 transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-4 rounded-xl"
                    style={{ background: 'rgba(26, 86, 219, 0.08)' }}
                  >
                    <Sparkles className="lucide lucide-sparkles w-5 h-5" style={{ color: 'rgb(26, 86, 219)' }} />
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1.5">100% Personnalisable</div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Impression HD, couleurs et formes sur mesure
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl p-5 md:p-7 transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-4 rounded-xl"
                    style={{ background: 'rgba(26, 86, 219, 0.08)' }}
                  >
                    <Truck className="lucide lucide-truck w-5 h-5" style={{ color: 'rgb(26, 86, 219)' }} />
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1.5">Livraison Europe</div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Livraison rapide en France et toute l&apos;Europe
                  </div>
                </motion.div>
              </RevealStagger>
            </div>
          </section>

          {/* PRODUCTS */}
          <section
            id="structures"
            className="section-products"
            style={{ paddingTop: '60px', paddingBottom: '96px' }}
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <Reveal className="text-center mb-12 md:mb-16">
                <h2
                  className="font-extrabold text-gray-900 mb-4"
                  style={{ fontSize: 'clamp(30px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
                >
                  Nos Solutions
                </h2>
                <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
                  Des solutions innovantes pour tous vos événements
                </p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-full">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm md:text-base font-bold text-amber-900">
                    Chaque produit disponible en version Sur Mesure personnalisée
                  </span>
                </div>
              </Reveal>
              <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start auto-rows-fr">
                {/* Arches */}
                <motion.div variants={staggerChild}>
                  <Link className="group block" to="/ArchesGonflables" style={{ textDecoration: 'none' }}>
                    <div
                      className="relative flex flex-col h-full rounded-3xl overflow-hidden cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '24px',
                        gridArea: 'span 1 / span 1',
                        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                      }}
                    >
                      <div
                        className="flex items-center justify-center p-6 md:p-8 flex-1"
                        style={{ background: 'rgb(248, 249, 250)', minHeight: '180px' }}
                      >
                        <img
                          src="images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png"
                          alt="Arches Gonflables"
                          className="max-h-44 md:max-h-52 object-contain"
                          loading="lazy"
                          style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 2px 0px 0px)' }}
                        />
                      </div>
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <div
                          className="text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: 'rgb(26, 86, 219)' }}
                        >
                          Impact visuel immédiat
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg md:text-xl" style={{ letterSpacing: '-0.02em' }}>
                          Arches Gonflables
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                          De 5m à 10m de large, impression totale incluse. Idéales pour départs de course
                          et événements sportifs.
                        </p>
                        <ul className="space-y-1.5 mb-5">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            5m à 10m de large
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            Impression totale
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            Installation 15 min
                          </li>
                        </ul>
                        <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-lg md:text-xl font-bold" style={{ color: 'rgb(26, 86, 219)' }}>
                              Dès 1 490€
                            </span>
                            <span
                              className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                              style={{ color: 'rgb(26, 86, 219)' }}
                            >
                              Voir <ArrowRight className="lucide lucide-arrow-right w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                {/* Tente */}
                <motion.div variants={staggerChild}>
                  <Link className="group block" to="/Tente" style={{ textDecoration: 'none' }}>
                    <div
                      className="relative flex flex-col h-full rounded-3xl overflow-hidden cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(20px)',
                        border: '1.5px solid rgba(26, 86, 219, 0.2)',
                        borderRadius: '24px',
                        gridArea: 'span 2 / span 1',
                        boxShadow: 'rgba(26, 86, 219, 0.15) 0px 16px 48px, rgba(0, 0, 0, 0.1) 0px 32px 64px',
                      }}
                    >
                      <div
                        className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-bold"
                        style={{ background: 'rgb(26, 86, 219)' }}
                      >
                        ⭐ Produit phare
                      </div>
                      <div
                        className="flex items-center justify-center p-6 md:p-8 flex-1"
                        style={{ background: 'rgb(248, 249, 250)', minHeight: '280px' }}
                      >
                        <img
                          src="images/03_330206aa0_ChatGPTImage17janv202613_32_29.png"
                          alt="Tente Spider"
                          className="max-h-44 md:max-h-52 object-contain"
                          loading="lazy"
                          style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 2px 0px 0px)' }}
                        />
                      </div>
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <div
                          className="text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: 'rgb(26, 86, 219)' }}
                        >
                          Notre produit phare
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg md:text-xl" style={{ letterSpacing: '-0.02em' }}>
                          Tente Spider
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                          Architecture moderne avec pieds courbes. De 3×3m à 5×5m, montage en 2 minutes.
                          Design 100% personnalisable.
                        </p>
                        <ul className="space-y-1.5 mb-5">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            3×3m à 5×5m
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            Montage 2 min
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            Usage indoor/outdoor
                          </li>
                        </ul>
                        <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-lg md:text-xl font-bold" style={{ color: 'rgb(26, 86, 219)' }}>
                              Dès 1 180€
                            </span>
                            <span
                              className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                              style={{ color: 'rgb(26, 86, 219)' }}
                            >
                              Voir <ArrowRight className="lucide lucide-arrow-right w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                {/* Colonnes */}
                <motion.div variants={staggerChild}>
                  <Link className="group block" to="/ColonnesGonflables" style={{ textDecoration: 'none' }}>
                    <div
                      className="relative flex flex-col h-full rounded-3xl overflow-hidden cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '24px',
                        gridArea: 'span 1 / span 1',
                        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                      }}
                    >
                      <div
                        className="flex items-center justify-center p-6 md:p-8 flex-1"
                        style={{ background: 'rgb(248, 249, 250)', minHeight: '180px' }}
                      >
                        <img
                          src="images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png"
                          alt="Colonnes Gonflables"
                          className="max-h-44 md:max-h-52 object-contain"
                          loading="lazy"
                          style={{ mixBlendMode: 'multiply', clipPath: 'inset(0px 2px 0px 0px)' }}
                        />
                      </div>
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <div
                          className="text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: 'rgb(26, 86, 219)' }}
                        >
                          Balisage élégant
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg md:text-xl" style={{ letterSpacing: '-0.02em' }}>
                          Colonnes Gonflables
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                          De 2.5m à 4m de hauteur. Option éclairage LED RGB intégré. Personnalisation 360°
                          de votre marque.
                        </p>
                        <ul className="space-y-1.5 mb-5">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            2.5m à 4m
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            LED RGB optionnel
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgb(26, 86, 219)' }} />
                            Installation simple
                          </li>
                        </ul>
                        <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-lg md:text-xl font-bold" style={{ color: 'rgb(26, 86, 219)' }}>
                              Dès 590€
                            </span>
                            <span
                              className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                              style={{ color: 'rgb(26, 86, 219)' }}
                            >
                              Voir <ArrowRight className="lucide lucide-arrow-right w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </RevealStagger>
              <Reveal className="text-center mt-12">
                <div tabIndex={0}>
                  <Link to="/Contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="cta-iridescent inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-semibold"
                      style={{ borderRadius: '9999px' }}
                    >
                      Demander un devis
                      <span>
                        <ArrowRight className="lucide lucide-arrow-right w-4 h-4" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          {/* LOGOS */}
          <section style={{ background: 'rgb(255, 255, 255)', paddingTop: '32px', paddingBottom: '32px' }}>
            <p
              style={{
                textAlign: 'center',
                color: 'rgb(107, 114, 128)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Ils nous font confiance
            </p>
            <div className="relative">
              <div
                className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgb(255, 255, 255), transparent)' }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, rgb(255, 255, 255), transparent)' }}
              />
              <div className="logo-track">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <div className="logo-item" key={i}>
                    <img src={logo.src} alt={logo.alt} loading="eager" width="120" height="40" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="section-reviews" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <Reveal className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm font-bold text-gray-700">Avis</span>
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <StarRow size="w-5 h-5" />
                  <span className="ml-2 text-xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-sm text-gray-500">
                  Basé sur <strong className="text-gray-700">127</strong> avis
                </p>
              </Reveal>
              <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Review 1 */}
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex flex-col p-6 rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgb(26, 86, 219), rgb(59, 130, 246))' }}
                    >
                      LD
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Laurent Dubois</div>
                      <div className="text-xs text-gray-500">EventPro France</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    <StarRow size="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono,
                    rendu visuel impressionnant et service client très réactif. Parfait pour nos
                    événements professionnels.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">28 avril 2026</span>
                    <span className="text-xs text-gray-400">Publié sur Google</span>
                  </div>
                </motion.div>
                {/* Review 2 */}
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex flex-col p-6 rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgb(8, 145, 178), rgb(6, 182, 212))' }}
                    >
                      SM
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Sophie Martin</div>
                      <div className="text-xs text-gray-500">Marketing &amp; Events</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    <StarRow size="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et
                    personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande
                    vivement.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">17 juillet 2025</span>
                    <span className="text-xs text-gray-400">Publié sur Google</span>
                  </div>
                </motion.div>
                {/* Review 3 */}
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex flex-col p-6 rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                    borderRadius: '24px',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgb(124, 58, 237), rgb(167, 139, 250))' }}
                    >
                      JR
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">Jean-Pierre Rousseau</div>
                      <div className="text-xs text-gray-500">Sports &amp; Festivals</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-3">
                    <StarRow size="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    Quatrième commande et toujours aussi satisfait. Produits haut de gamme, délais
                    respectés, équipe professionnelle. Les structures résistent parfaitement aux
                    conditions extérieures.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">15 décembre 2024</span>
                    <span className="text-xs text-gray-400">Publié sur Google</span>
                  </div>
                </motion.div>
              </RevealStagger>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ paddingTop: '96px', paddingBottom: '96px', background: 'rgb(255, 255, 255)' }}>
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
              <Reveal className="text-center mb-12">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                  style={{ background: 'rgba(26, 86, 219, 0.07)', border: '1px solid rgba(26, 86, 219, 0.12)' }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'rgb(26, 86, 219)' }}
                  >
                    Questions fréquentes
                  </span>
                </div>
                <h2
                  className="font-extrabold text-gray-900 mb-3"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em' }}
                >
                  Tout ce que vous devez savoir
                </h2>
                <p className="text-gray-500">Des réponses claires à vos questions</p>
              </Reveal>
              <RevealStagger className="space-y-3">
                {faqs.map(({ q, a }, i) => {
                  const isOpen = openFaq === i;
                  return (
                  <motion.div
                    key={i}
                    variants={staggerChild}
                    className="overflow-hidden"
                    style={{
                      borderRadius: '0px',
                      background: 'transparent',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      padding: '0px',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left"
                      style={{ padding: '24px 0px' }}
                    >
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'rgb(10, 10, 10)', lineHeight: 1.4 }}>
                        {q}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                      >
                        <ChevronDown className="lucide lucide-chevron-down w-4 h-4" style={{ color: 'rgb(107, 114, 128)' }} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p
                            style={{
                              fontSize: '15px',
                              color: 'rgb(107, 114, 128)',
                              lineHeight: 1.6,
                              padding: '0px 0px 24px',
                            }}
                          >
                            {a}
                          </p>
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
          <section
            style={{
              margin: '80px 24px',
              borderRadius: '32px',
              overflow: 'hidden',
              height: '60vh',
              minHeight: '320px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="images/01_352cf8bae_WhatsAppImage2026-01-17at132722.jpg"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '0px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '0px',
                background: 'linear-gradient(135deg, rgba(26, 86, 219, 0.85), rgba(10, 10, 10, 0.7))',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0px 24px', maxWidth: '700px' }}>
              <Reveal
                as="h2"
                style={{
                  color: 'rgb(255, 255, 255)',
                  fontWeight: 900,
                  fontSize: 'clamp(36px, 4vw, 64px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '16px',
                }}
              >
                Prêt à marquer les esprits ?
              </Reveal>
              <Reveal
                as="p"
                delay={0.1}
                style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}
              >
                Conception Suisse. Livraison France et Europe.
              </Reveal>
              <Link to="/Contact">
                <button
                  className="cta-iridescent inline-flex items-center gap-2 text-white font-semibold hover:scale-[1.03] transition-transform"
                  style={{ borderRadius: '9999px', padding: '16px 36px', fontSize: '16px', minHeight: '52px' }}
                >
                  Demander un devis gratuit
                  <ArrowRight className="lucide lucide-arrow-right w-4 h-4 flex-shrink-0" />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
