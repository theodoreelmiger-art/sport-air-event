import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Eye,
  Zap,
  Layers,
  Palette,
  Sparkles,
  MessageSquare,
  Clock,
  CircleCheckBig,
  Printer,
  ArrowDown,
  Check,
} from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

export default function Customization() {
  const features = [
    {
      badge: 'Premium',
      Icon: Eye,
      title: 'Visibilité maximale',
      text: "Jusqu'à 200m² de surface personnalisable pour un impact visuel garanti.",
    },
    {
      badge: 'Qualité',
      Icon: Zap,
      title: 'Impression HD',
      text: 'Technologie sublimation pour des couleurs vives qui durent dans le temps.',
    },
    {
      badge: 'Unique',
      Icon: Layers,
      title: 'Design 360°',
      text: 'Personnalisation complète sur toutes les faces de votre structure.',
    },
    {
      badge: 'Précision',
      Icon: Palette,
      title: 'Couleurs Pantone',
      text: 'Reproduction exacte de votre charte graphique professionnelle.',
    },
  ];

  const steps = [
    {
      Icon: MessageSquare,
      title: 'Brief',
      num: '1',
      text: 'Analyse approfondie de vos besoins',
      duration: 'Durée estimée : 1-2 jours',
      reverse: false,
    },
    {
      Icon: Palette,
      title: 'Design',
      num: '2',
      text: 'Création maquette 3D photoréaliste',
      duration: 'Durée estimée : 3-5 jours',
      reverse: true,
    },
    {
      Icon: CircleCheckBig,
      title: 'Validation',
      num: '3',
      text: 'Révisions & approbation finale',
      duration: 'Durée estimée : 2-3 jours',
      reverse: false,
    },
    {
      Icon: Printer,
      title: 'Production',
      num: '4',
      text: 'Fabrication avec contrôle qualité',
      duration: 'Durée estimée : 2-4 semaines',
      reverse: false,
    },
  ];

  const impacts = [
    "Jusqu'à 200m² de surface imprimable",
    'Visibilité à 360° garantie',
    'Forme unique qui attire le regard',
    'Couleurs vives qui durent dans le temps',
    'ROI publicitaire supérieur',
  ];

  return (
    <div className="pt-20">
      <section className="min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0066CC]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-[#0066CC] text-sm font-semibold uppercase tracking-wider">Personnalisation</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Votre marque,<br />
                <span className="text-[#0066CC]">amplifiée</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transformez chaque centimètre carré en support de communication ultra-visible.
              </p>
              <div>
                <Link
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066CC] text-white font-semibold rounded-full hover:bg-[#0052A3] transition-all"
                  to="/Contact"
                >
                  Démarrer un projet
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>
            <Reveal className="relative" delay={0.2}>
              <img
                src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                alt="Personnalisation complète structures gonflables - Impression HD sublimation, couleurs Pantone, design sur mesure SPORT AIR EVENT Suisse"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold text-[#0066CC]">360°</div>
                <div className="text-sm text-gray-500">de visibilité</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-0 w-64 h-64 bg-[#0066CC]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">Possibilités infinies</h2>
            <p className="text-xl text-gray-600">
              Chaque structure devient une œuvre unique qui reflète votre identité
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.1 * i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/10 to-transparent rounded-3xl blur-xl" />
                <div className="relative p-8 bg-white rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white text-xs font-bold rounded-full shadow-lg">
                    {f.badge}
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <f.Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{f.text}</p>
                  <div
                    className="h-1 bg-gradient-to-r from-[#0066CC] to-transparent rounded-full mt-6"
                    style={{ width: '100%' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F5] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#0066CC]/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-20">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">Du concept à la réalité</h2>
            <p className="text-xl text-gray-600">Un processus simple et transparent</p>
          </Reveal>
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-[#0066CC] via-purple-500 to-[#0052A3] transform -translate-x-1/2 hidden md:block"
              style={{ height: '100%' }}
            />
            <div className="space-y-24">
              {steps.map((s, i) => (
                <div key={s.title}>
                  <Reveal className="relative">
                    <div className={`flex items-center gap-8 ${s.reverse ? 'flex-row-reverse' : ''}`}>
                      <div className="flex-1">
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border-2 border-[#0066CC]/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center flex-shrink-0">
                              <s.Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-[#0A0A0A]">{s.title}</h3>
                                <span className="px-3 py-1 bg-[#0066CC]/10 text-[#0066CC] text-xs font-bold rounded-full">
                                  {s.num}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3">{s.text}</p>
                              <div className="flex items-center gap-2 text-sm text-[#0066CC]">
                                <Clock className="w-4 h-4" />
                                <span className="font-semibold">{s.duration}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-16 h-16 bg-white rounded-full border-4 border-[#0066CC] flex items-center justify-center shadow-lg">
                          <span className="text-2xl font-bold text-[#0066CC]">{s.num}</span>
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </Reveal>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center mt-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-[#0066CC] to-transparent" />
                        <ArrowDown className="w-8 h-8 text-[#0066CC]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <img
                src="images/17_0aa557b4e_Capturedecran2026-01-02a170639.png"
                alt="Impact visuel structures gonflables événementielles - Visibilité maximale 360 degrés pour salons professionnels et événements corporatifs"
                className="rounded-3xl shadow-2xl"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl font-bold text-[#0A0A0A] mb-6">Un impact visuel incomparable</h2>
              <div className="space-y-4">
                {impacts.map((item, i) => (
                  <Reveal key={item} delay={0.1 * i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
