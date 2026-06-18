import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Wind,
  Sparkles,
  TrendingUp,
  Star,
  Check,
  ArrowRight,
  Award,
} from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

const products = [
  {
    icon: Wind,
    badge: 'Bestseller',
    label: 'Visibilité maximale à 360°',
    title: 'Dôme Premium',
    specs: [
      { k: 'Matériau', v: 'PVC 650g/m²' },
      { k: 'Montage', v: '< 15 min' },
      { k: 'Personnes', v: '1 seule' },
    ],
    features: [
      'Visibilité totale 360°',
      'Installation express 10min',
      'Diamètres 4m à 15m',
      'Résistance vent 70km/h',
      'Personnalisation complète',
      'Garantie 2 ans',
    ],
    price: "À partir de CHF 3'500",
    href: '/Contact?product=D%C3%B4me%20Premium',
    reverse: false,
  },
  {
    icon: Sparkles,
    badge: 'Innovation',
    label: 'Architecture unique et moderne',
    title: 'Tente Spider',
    specs: [
      { k: 'Stabilité', v: 'Pieds courbes' },
      { k: 'Surface', v: "Jusqu'à 60m²" },
      { k: 'Usage', v: 'Tout terrain' },
    ],
    features: [
      'Design architectural unique',
      'Pieds courbes stabilisateurs',
      'Branding sur toutes faces',
      'Usage indoor & outdoor',
      'Montage ultra-rapide',
      'Garantie structure 2 ans',
    ],
    price: "À partir de CHF 4'500",
    href: '/Contact?product=Tente%20Spider',
    reverse: true,
  },
  {
    icon: TrendingUp,
    badge: 'Exclusif',
    label: 'Votre vision unique réalisée',
    title: 'Sur Mesure',
    specs: [
      { k: 'Design', v: '100% unique' },
      { k: 'Dimensions', v: 'Illimitées' },
      { k: 'Délai', v: '4-6 semaines' },
    ],
    features: [
      'Design 100% personnalisé',
      'Formes et tailles illimitées',
      'Maquette 3D photoréaliste',
      'Dimensions sur demande',
      'Conception suisse exclusive',
      'Support projet dédié',
    ],
    price: 'Sur devis personnalisé',
    href: '/Contact?product=Sur%20Mesure',
    reverse: false,
  },
];

export default function ModernProducts() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white relative overflow-hidden">
      {/* Hero */}
      <section className="py-10 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-3 md:mb-6">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#0066CC] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl">
                <Shield className="w-7 h-7 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-[#0066CC] to-blue-600 bg-clip-text text-transparent">Nos produits</span>
            </h1>
            <p className="text-base md:text-2xl text-gray-600 max-w-3xl mx-auto px-2">Solutions gonflables professionnelles • Fabrication Suisse</p>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="pb-8 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 md:space-y-32">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Reveal
                  key={product.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center ${product.reverse ? 'lg:grid-flow-dense' : ''}`}
                >
                  <div className={`relative ${product.reverse ? 'lg:col-start-2' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="relative h-48 sm:h-64 md:h-[500px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-50 to-white overflow-hidden flex items-center justify-center border-2 border-gray-100"
                      style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 40px' }}
                    >
                      <div className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-[#0066CC]" style={{ transform: 'scale(1.8063)' }}></div>
                      <div className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-[#0066CC]" style={{ transform: 'scale(1.47474)' }}></div>
                      <div className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-[#0066CC]" style={{ transform: 'scale(1.03844)' }}></div>
                      <div className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-[#0066CC]" style={{ transform: 'scale(1.11253)' }}></div>
                      <div className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-[#0066CC]" style={{ transform: 'scale(1.40206)' }}></div>
                      <div className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-48 bg-[#0066CC] rounded-[2rem] md:rounded-[3rem] flex items-center justify-center shadow-2xl">
                        <Icon className="w-14 h-14 md:w-24 md:h-24 text-white" />
                      </div>
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 md:px-5 md:py-3 bg-gradient-to-r from-[#0066CC] to-blue-600 rounded-full shadow-xl">
                        <span className="text-white font-bold flex items-center gap-1.5 text-xs md:text-base">
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-white" />
                          {product.badge}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  <div>
                    <div>
                      <div className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6 bg-[#0066CC]">
                        <span className="font-bold text-white text-sm md:text-base">{product.label}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold text-[#0A0A0A] mb-3 md:mb-8">{product.title}</h2>
                      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-5 md:mb-8">
                        {product.specs.map((spec) => (
                          <div key={spec.k} className="p-3 md:p-4 bg-blue-50 rounded-xl md:rounded-2xl border border-blue-100">
                            <div className="text-[10px] md:text-xs text-gray-500 mb-0.5">{spec.k}</div>
                            <div className="font-bold text-[#0066CC] text-xs md:text-base">{spec.v}</div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 md:space-y-3 mb-5 md:mb-8">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 md:gap-4">
                            <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#0066CC]/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-[#0066CC]" />
                            </div>
                            <span className="text-sm md:text-lg text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-2xl md:text-4xl font-bold mb-5 md:mb-8 text-[#0066CC]">{product.price}</div>
                      <Link className="block sm:inline-block" to={product.href}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-8 py-4 bg-[#0066CC] hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center gap-3 transition-all"
                          tabIndex={0}
                        >
                          Demander un devis
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-32 bg-gradient-to-br from-[#0066CC] to-blue-600 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
              <Award className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8">Besoin d&apos;aide pour choisir ?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link className="w-full sm:w-auto" to="/Contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-white text-[#0066CC] font-bold rounded-full shadow-2xl"
                  tabIndex={0}
                >
                  Parler à un expert
                </motion.button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
