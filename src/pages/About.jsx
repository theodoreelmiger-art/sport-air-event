import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Award, Zap, Heart, Shield, Target, Rocket, CircleCheck, ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, staggerChild } from '../lib/motion.jsx';

const values = [
  { Icon: Award, title: 'Excellence', text: 'Chaque structure fabriquée au standard suisse le plus exigeant.' },
  { Icon: Zap, title: 'Innovation', text: 'Des solutions gonflables pensées pour les événements modernes.' },
  { Icon: Heart, title: 'Passion', text: "20 ans d'engagement pour faire de chaque événement un succès." },
  { Icon: Shield, title: 'Qualité', text: 'Matériaux certifiés, non-feu, anti-UV, testés pour durer.' },
  { Icon: Target, title: 'Précision', text: 'Maquettes 3D et suivi de production à chaque étape.' },
  { Icon: Rocket, title: 'Ambition', text: "Nous accompagnons les marques les plus exigeantes d'Europe." },
];

const reasons = [
  'Conception 100% suisse',
  'Certifié non-feu et anti-UV',
  'Installation en 2 minutes',
  'Garantie et support inclus',
];

export default function About() {
  return (
    <div className="pt-24 md:pt-28 bg-gradient-to-br from-white via-blue-50/20 to-white">
      <section className="relative py-10 md:py-32 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Reveal className="inline-flex items-center gap-2 px-5 py-2 bg-blue-100 text-[#0066CC] rounded-full mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Notre histoire</span>
            </Reveal>
            <Reveal as="h1" className="text-2xl sm:text-3xl md:text-7xl font-black text-gray-900 mb-4 md:mb-6 px-2" style={{ letterSpacing: '-0.03em' }}>
              Créateurs de structures<br /><span style={{ color: 'rgb(26, 86, 219)' }}>événementielles d'exception</span>
            </Reveal>
            <Reveal as="p" className="text-sm md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 px-4">
              Sport Air Event est votre partenaire de confiance pour des structures gonflables événementielles de haute qualité. Basée sur une conception suisse rigoureuse, notre entreprise allie innovation, design et performance pour donner vie à vos projets les plus ambitieux.
            </Reveal>
            <Reveal as="p" className="text-xs md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Depuis plus de 20 ans, nous accompagnons professionnels et entreprises dans la création d'espaces événementiels uniques. Nos structures gonflables – tentes, dômes, arches, colonnes et mobilier – sont conçues pour résister aux conditions les plus exigeantes tout en offrant un design moderne et une personnalisation totale.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <motion.div variants={staggerChild} className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">D'expérience</span>
                <span className="text-3xl md:text-4xl font-black text-[#0066CC]">20 ans</span>
              </div>
              <div className="relative h-3 bg-blue-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0066CC] to-blue-400 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                <span>0 an</span>
                <span className="text-[#0066CC] font-bold">20 ans</span>
              </div>
            </motion.div>
            <motion.div variants={staggerChild} className="p-6 md:p-8 bg-gradient-to-br from-amber-50 to-white rounded-3xl border border-amber-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Clients satisfaits</span>
                <span className="text-3xl md:text-4xl font-black text-amber-500">100%</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-6 h-6 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="ml-2 text-xl font-bold text-gray-800">4.9 / 5</span>
              </div>
              <p className="text-xs text-gray-500">Basé sur 127 avis Google vérifiés</p>
            </motion.div>
          </RevealStagger>
        </div>
      </section>

      <section className="py-10 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Reveal as="h2" className="text-4xl font-bold mb-8 text-gray-900">Notre mission</Reveal>
            <Reveal as="p" className="text-sm md:text-xl text-gray-600 leading-relaxed mb-4 md:mb-6">
              Nous croyons que chaque événement mérite une structure à la hauteur de son ambition. C'est pourquoi nous mettons un point d'honneur à offrir des produits durables, esthétiques et faciles à installer.
            </Reveal>
            <Reveal as="p" className="text-sm md:text-xl text-gray-600 leading-relaxed">
              Notre équipe d'experts vous accompagne de la conception à la livraison, en passant par la création de maquettes 3D pour visualiser votre projet avant sa réalisation.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <Reveal as="h2" className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 px-4 text-gray-900">Nos valeurs</Reveal>
            <Reveal as="p" className="text-sm md:text-xl text-gray-600 px-4">Ce qui nous guide au quotidien</Reveal>
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4">
            {values.map(({ Icon, title, text }) => (
              <motion.div
                key={title}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                className="relative flex items-start gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#0066CC]/30"
              >
                <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#0066CC]" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-10 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal as="h2" className="text-2xl md:text-5xl font-bold mb-4 px-4 text-gray-900">Pourquoi nous choisir ?</Reveal>
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
            {reasons.map((reason) => (
              <motion.div
                key={reason}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                className="relative flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg border-2 border-gray-100 hover:border-[#0066CC] transition-all overflow-hidden"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#0066CC] rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 relative z-10">
                  <CircleCheck className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs md:text-base font-bold text-gray-900">{reason}</span>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-10 md:py-20 bg-gradient-to-br from-[#0066CC] to-blue-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">Prêt à créer ensemble ?</h2>
            <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-10">Transformons votre vision en réalité</p>
            <Link to="/Contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-white text-[#0066CC] text-sm md:text-base font-bold rounded-full shadow-lg inline-flex items-center justify-center gap-2"
              >
                Nous contacter
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
