import { motion } from 'framer-motion';
import { Award, Leaf, Recycle, Factory, Shield, Clock, TrendingUp, Package, Zap, CircleCheckBig } from 'lucide-react';
import { Reveal, RevealStagger } from '../lib/motion.jsx';

const durabilityItems = [
  {
    Icon: Leaf,
    title: 'Matériaux durables',
    text: 'Sélection rigoureuse de matières premières certifiées',
  },
  {
    Icon: Recycle,
    title: 'Réutilisation optimale',
    text: "Conçues pour des centaines d'utilisations",
  },
  {
    Icon: Factory,
    title: 'Production responsable',
    text: 'Processus optimisés, déchets minimisés',
  },
];

const swissCards = [
  {
    Icon: Award,
    title: 'Conception suisse',
    text: "Bureau d'études basé en Suisse, rigueur absolue",
  },
  {
    Icon: Shield,
    title: 'Tests rigoureux',
    text: 'Chaque structure testée avant expédition',
  },
  {
    Icon: Clock,
    title: 'Longévité garantie',
    text: 'Durée de vie exceptionnelle prouvée',
  },
];

const stats = [
  { Icon: TrendingUp, value: '10+', label: "Années d'expérience" },
  { Icon: Package, value: '500+', label: 'Structures produites' },
  { Icon: Award, value: '99%', label: 'Satisfaction client' },
  { Icon: Zap, value: '5', label: 'Ans de durée de vie' },
];

const certifications = [
  'ISO 9001 - Management de la qualité',
  'Certification ignifugation M2/B1',
  'Conformité CE',
  'Traitement anti-UV certifié',
  'Tests résistance traction',
];

export default function Quality() {
  return (
    <div className="pt-20">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#0066CC]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <Reveal className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8">
              <Award className="w-6 h-6 text-[#0066CC]" />
              <span className="text-white font-semibold">Swiss Quality Certified</span>
            </Reveal>
            <Reveal as="h1" className="text-5xl md:text-7xl font-bold text-white mb-6">
              Qualité &amp; Durabilité
            </Reveal>
            <Reveal as="p" className="text-2xl text-gray-300 max-w-3xl mx-auto">
              L'excellence suisse au service de l'environnement
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="relative">
                <img
                  src="images/20_photo-1473496169904-658ba7c44d8a.img"
                  alt="Durabilité"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-green-600 text-white p-8 rounded-2xl shadow-2xl">
                  <div className="text-5xl font-bold">90%</div>
                  <div className="text-sm opacity-90 mt-2">matériaux recyclables</div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-8">Durabilité par conception</h2>
              <div className="space-y-6">
                {durabilityItems.map(({ Icon, title, text }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="flex gap-6 p-6 bg-[#F5F5F5] rounded-2xl"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{title}</h3>
                      <p className="text-gray-600">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-[#0066CC] to-[#0052A3] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Swiss Made Excellence</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">La précision suisse dans chaque produit</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {swissCards.map(({ Icon, title, text }, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="relative group">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl"></div>
                <div className="relative p-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-10 h-10 text-[#0066CC]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                  <p className="text-white/70 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">Les chiffres parlent d'eux-mêmes</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ Icon, value, label }, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="text-center p-8 bg-white rounded-3xl shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold text-[#0066CC] mb-2">{value}</div>
                <div className="text-gray-600 font-medium">{label}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <h2 className="text-4xl font-bold text-[#0A0A0A] mb-8">Certifications &amp; Conformités</h2>
              <div className="space-y-4">
                {certifications.map((text, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-5 bg-[#F5F5F5] rounded-2xl"
                  >
                    <div>
                      <CircleCheckBig className="w-6 h-6 text-[#0066CC]" />
                    </div>
                    <span className="text-lg text-gray-700">{text}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <img
                src="images/21_photo-1581092918056-0c4c3acd3789.img"
                alt="Qualité"
                className="rounded-3xl shadow-2xl"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
