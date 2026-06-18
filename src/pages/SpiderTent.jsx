import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  Zap,
  Wind,
  Droplet,
  Sun,
  Shield,
  Clock,
} from 'lucide-react';
import { Reveal, RevealStagger, staggerChild } from '../lib/motion.jsx';

const features = [
  {
    Icon: Zap,
    title: 'Montage ultra-rapide',
    desc: 'Installation en 10 minutes par 1 personne',
  },
  {
    Icon: Wind,
    title: 'Résistance au vent',
    desc: "Jusqu'à 70 km/h",
  },
  {
    Icon: Droplet,
    title: 'Étanche',
    desc: '100% imperméable, PVC 650g/m²',
  },
  {
    Icon: Sun,
    title: 'Anti-UV',
    desc: 'Protection UV50+',
  },
  {
    Icon: Shield,
    title: 'Garantie 2 ans',
    desc: 'Sur structure et impression',
  },
  {
    Icon: Clock,
    title: 'Livraison rapide',
    desc: '4-6 semaines',
  },
];

const sizes = [
  {
    title: '3x3m',
    people: '8-10 personnes',
    dimensions: '3m x 3m',
    hauteur: '2.8m',
    poids: '45kg',
    prix: 'CHF 4,500',
    popular: false,
    borderClass: 'border-gray-100',
  },
  {
    title: '4x4m',
    people: '12-15 personnes',
    dimensions: '4m x 4m',
    hauteur: '3.2m',
    poids: '60kg',
    prix: 'CHF 6,500',
    popular: true,
    borderClass: 'border-[#0066CC]',
  },
  {
    title: '5x5m',
    people: '20-25 personnes',
    dimensions: '5m x 5m',
    hauteur: '3.5m',
    poids: '75kg',
    prix: 'CHF 8,500',
    popular: false,
    borderClass: 'border-gray-100',
  },
];

const specs = [
  { label: 'Matériau', value: 'PVC 650g/m² anti-UV' },
  { label: 'Structure', value: '4 pieds gonflables courbes' },
  { label: 'Pression', value: '0.3 bar' },
  { label: 'Personnalisation', value: 'Impression haute définition' },
  { label: 'Accessoires', value: 'Pompe électrique incluse' },
  { label: 'Usage', value: 'Intérieur et extérieur' },
];

export default function SpiderTent() {
  const [selectedSize, setSelectedSize] = useState(
    sizes.find((s) => s.popular)?.title ?? sizes[0].title
  );
  return (
    <div className="pt-20 bg-gradient-to-br from-white via-blue-50/20 to-white">
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC]/10 rounded-full blur-3xl"
          style={{ transform: 'scale(1.11424)' }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-block px-4 py-2 bg-[#0066CC]/10 text-[#0066CC] text-sm font-semibold rounded-full mb-6">
                Tente professionnelle
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Tente Spider<br />
                <span className="text-[#0066CC]">X-Gloo Style</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Design architectural unique avec 4 pieds courbes gonflables. Parfaite pour salons, événements sportifs et stands promotionnels.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Montage 10 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Design moderne</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Branding 360°</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/Calculator">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="px-8 py-4 bg-[#0066CC] text-white font-bold rounded-full flex items-center gap-3 shadow-lg"
                    tabIndex={0}
                  >
                    Calculer mon prix
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/Contact?product=Tente%20Spider">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-full"
                    tabIndex={0}
                  >
                    Demander un devis
                  </motion.button>
                </Link>
              </div>
            </Reveal>
            <Reveal className="relative">
              <img
                src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                alt="Tente Spider X-Gloo"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="text-sm text-gray-600 mb-1">À partir de</div>
                <div className="text-3xl font-bold text-[#0066CC]">CHF 4,500</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Caractéristiques principales</h2>
            <p className="text-xl text-gray-600">Conçue pour l'efficacité et l'impact visuel</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerChild}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-[#0066CC] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tailles disponibles</h2>
            <p className="text-xl text-gray-600">Choisissez la dimension adaptée à votre événement</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sizes.map((size) => (
              <motion.div
                key={size.title}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedSize(size.title)}
                className={`relative bg-white rounded-3xl shadow-xl border-3 cursor-pointer transition-all ${
                  selectedSize === size.title
                    ? 'border-[#0066CC] ring-2 ring-[#0066CC]/40'
                    : size.borderClass
                }`}
              >
                {size.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0066CC] text-white text-sm font-bold rounded-full">
                    Plus populaire
                  </div>
                )}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{size.title}</div>
                    <div className="text-gray-600">{size.people}</div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dimensions</span>
                      <span className="font-semibold">{size.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hauteur</span>
                      <span className="font-semibold">{size.hauteur}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Poids</span>
                      <span className="font-semibold">{size.poids}</span>
                    </div>
                  </div>
                  <div className="text-center pt-6 border-t border-gray-200">
                    <div className="text-3xl font-bold text-[#0066CC] mb-4">{size.prix}</div>
                    <Link to="/Calculator">
                      <button className="w-full py-3 bg-[#0066CC] text-white font-bold rounded-full" tabIndex={0}>
                        Configurer
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Spécifications techniques</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec) => (
              <motion.div
                key={spec.label}
                variants={staggerChild}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-white/60 text-sm mb-2">{spec.label}</div>
                <div className="text-xl font-bold">{spec.value}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Prêt à commander votre Tente Spider ?</h2>
            <p className="text-xl text-gray-600 mb-8">Obtenez un devis personnalisé en quelques clics</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Calculator">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-4 bg-[#0066CC] text-white font-bold rounded-full flex items-center gap-3"
                  tabIndex={0}
                >
                  Calculer mon prix
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/Contact?product=Tente%20Spider">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-full"
                  tabIndex={0}
                >
                  Contacter un expert
                </motion.button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
