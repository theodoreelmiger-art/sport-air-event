import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Clock,
  Palette,
  CircleCheckBig,
  Factory,
  Truck,
  Headphones,
  ArrowDown,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

const steps = [
  {
    number: '1',
    title: 'Analyse du besoin',
    duration: '1-2 jours',
    description: 'Échange approfondi pour comprendre votre projet',
    gradient: 'from-blue-500 to-blue-600',
    Icon: MessageSquare,
    reverse: false,
  },
  {
    number: '2',
    title: 'Design 3D',
    duration: '3-5 jours',
    description: 'Maquette photoréaliste de votre structure',
    gradient: 'from-purple-500 to-purple-600',
    Icon: Palette,
    reverse: true,
  },
  {
    number: '3',
    title: 'Validation',
    duration: '2-3 jours',
    description: 'Révisions illimitées jusqu\'à votre satisfaction',
    gradient: 'from-green-500 to-green-600',
    Icon: CircleCheckBig,
    reverse: false,
  },
  {
    number: '4',
    title: 'Production',
    duration: '2-4 semaines',
    description: 'Fabrication avec contrôle qualité rigoureux',
    gradient: 'from-orange-500 to-orange-600',
    Icon: Factory,
    reverse: true,
  },
  {
    number: '5',
    title: 'Livraison',
    duration: '2-5 jours',
    description: 'Expédition sécurisée avec tout le matériel',
    gradient: 'from-red-500 to-red-600',
    Icon: Truck,
    reverse: false,
  },
  {
    number: '6',
    title: 'Support continu',
    duration: 'Illimité',
    description: 'Assistance technique et service après-vente',
    gradient: 'from-teal-500 to-teal-600',
    Icon: Headphones,
    reverse: true,
  },
];

const delais = [
  {
    big: '4-6 semaines',
    title: 'Standard',
    description: 'Structure classique personnalisée',
  },
  {
    big: '6-8 semaines',
    title: 'Sur mesure',
    description: 'Création unique sur cahier des charges',
  },
  {
    big: '2-3 semaines',
    title: 'Express',
    description: 'Production accélérée (supplément)',
  },
];

export default function Process() {
  return (
    <div className="pt-20">
      <section className="relative py-32 bg-gradient-to-br from-[#0066CC] to-[#0052A3] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Reveal as="h1" className="text-5xl md:text-6xl font-bold text-white mb-6">De l'idée à la réalité</Reveal>
            <Reveal as="p" delay={0.1} className="text-xl text-white/90 max-w-2xl mx-auto">Un processus transparent pour un résultat parfait</Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-[#0066CC] via-purple-500 to-green-500 transform -translate-x-1/2 hidden md:block" style={{ height: '100%' }}></div>
          <div className="space-y-32">
            {steps.map((step, i) => {
              const { Icon } = step;
              return (
                <Reveal key={step.number} className="relative">
                  <div className={`flex items-center gap-12 ${step.reverse ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-[#0A0A0A]">{step.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-lg">{step.description}</p>
                      </motion.div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-4 border-[#0066CC] items-center justify-center text-3xl font-bold text-[#0066CC] shadow-xl z-10">{step.number}</div>
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center mt-16">
                      <ArrowDown className="w-12 h-12 text-[#0066CC]/50" />
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A0A0A] mb-6">Délais de réalisation</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {delais.map((item, i) => (
              <Reveal key={item.title} delay={0.1 * i} className="bg-white p-8 rounded-3xl shadow-lg text-center">
                <div className="text-5xl font-bold text-[#0066CC] mb-4">{item.big}</div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <div tabIndex={0}>
              <Link
                to="/Contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066CC] text-white font-semibold rounded-full hover:bg-[#0052A3] transition-all shadow-lg"
              >
                Démarrer votre projet
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
