import { Link } from 'react-router-dom';
import {
  Shield,
  Clock,
  Users,
  Maximize2,
  Wind,
  Zap,
  Package,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

export default function Products() {
  return (
    <div className="pt-20 bg-[#F5F5F5]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#0066CC] to-[#0052A3]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Structures gonflables événementielles<br />
              <span className="text-white/80">professionnelles suisses</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Impact maximum. Installation minimum.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Reveal className="text-center p-6 bg-[#F5F5F5] rounded-2xl">
              <div className="w-12 h-12 bg-[#0066CC]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div className="text-sm text-gray-500 mb-1">Matériaux</div>
              <div className="font-bold text-[#0A0A0A]">PVC 650g/m² anti-UV</div>
            </Reveal>
            <Reveal delay={0.1} className="text-center p-6 bg-[#F5F5F5] rounded-2xl">
              <div className="w-12 h-12 bg-[#0066CC]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div className="text-sm text-gray-500 mb-1">Montage</div>
              <div className="font-bold text-[#0A0A0A]">Moins de 15 minutes</div>
            </Reveal>
            <Reveal delay={0.2} className="text-center p-6 bg-[#F5F5F5] rounded-2xl">
              <div className="w-12 h-12 bg-[#0066CC]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div className="text-sm text-gray-500 mb-1">Installation</div>
              <div className="font-bold text-[#0A0A0A]">1 personne suffit</div>
            </Reveal>
            <Reveal delay={0.3} className="text-center p-6 bg-[#F5F5F5] rounded-2xl">
              <div className="w-12 h-12 bg-[#0066CC]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Maximize2 className="w-6 h-6 text-[#0066CC]" />
              </div>
              <div className="text-sm text-gray-500 mb-1">Tailles</div>
              <div className="font-bold text-[#0A0A0A]">De 3m à 20m</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {/* Dôme Premium */}
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
              <div className="relative ">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="images/19_f5298932f_Capturedecran2026-01-02a170657.png"
                    alt="Dôme Premium - Dômes gonflables SPORT AIR EVENT - Structures gonflables professionnelles fabriquées en Suisse pour événements, salons et expositions"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                      <Wind className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">Dômes gonflables</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-[#0066CC]/10 text-[#0066CC] text-sm font-semibold rounded-full mb-4">
                  Dômes gonflables
                </div>
                <h2 className="text-4xl font-bold text-[#0A0A0A] mb-4">Dôme Premium</h2>
                <p className="text-xl text-gray-600 mb-8">Visibilité 360° garantie</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Montage 10 minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Surface personnalisable complète</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Résistance vent 70 km/h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Diamètres 4m à 15m</span>
                  </div>
                </div>
                <div tabIndex={0}>
                  <Link
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066CC] text-white font-semibold rounded-full hover:bg-[#0052A3] transition-all shadow-lg shadow-blue-500/25"
                    to="/Contact?product=D%C3%B4me%20Premium"
                  >
                    Obtenir un devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Tente Spider */}
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:grid-flow-dense">
              <div className="relative lg:col-start-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="images/16_be94e4481_Capturedecran2026-01-02a170703.png"
                    alt="Tente Spider - Tentes professionnelles SPORT AIR EVENT - Structures gonflables professionnelles fabriquées en Suisse pour événements, salons et expositions"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                      <Zap className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">Tentes professionnelles</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-[#0066CC]/10 text-[#0066CC] text-sm font-semibold rounded-full mb-4">
                  Tentes professionnelles
                </div>
                <h2 className="text-4xl font-bold text-[#0A0A0A] mb-4">Tente Spider</h2>
                <p className="text-xl text-gray-600 mb-8">Design architectural unique</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Pieds courbes stabilisateurs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Montage ultra-rapide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Branding sur arches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Indoor &amp; Outdoor</span>
                  </div>
                </div>
                <div tabIndex={0}>
                  <Link
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066CC] text-white font-semibold rounded-full hover:bg-[#0052A3] transition-all shadow-lg shadow-blue-500/25"
                    to="/Contact?product=Tente%20Spider"
                  >
                    Obtenir un devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Structure Sur Mesure */}
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
              <div className="relative ">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="images/17_0aa557b4e_Capturedecran2026-01-02a170639.png"
                    alt="Structure Sur Mesure - Création exclusive SPORT AIR EVENT - Structures gonflables professionnelles fabriquées en Suisse pour événements, salons et expositions"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                      <Package className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">Création exclusive</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-[#0066CC]/10 text-[#0066CC] text-sm font-semibold rounded-full mb-4">
                  Création exclusive
                </div>
                <h2 className="text-4xl font-bold text-[#0A0A0A] mb-4">Structure Sur Mesure</h2>
                <p className="text-xl text-gray-600 mb-8">Votre vision, notre réalité</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Design unique</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Dimensions illimitées</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Formes personnalisées</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">Maquette 3D incluse</span>
                  </div>
                </div>
                <div tabIndex={0}>
                  <Link
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066CC] text-white font-semibold rounded-full hover:bg-[#0052A3] transition-all shadow-lg shadow-blue-500/25"
                    to="/Contact?product=Structure%20Sur%20Mesure"
                  >
                    Obtenir un devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <Reveal as="h2" className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à donner vie à votre projet ?
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-gray-400 text-lg mb-8">
            Obtenez un devis personnalisé en quelques clics
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <div tabIndex={0}>
              <Link
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066CC] text-white font-semibold rounded-full"
                to="/Calculator"
              >
                Calculer mon devis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div tabIndex={0}>
              <Link
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20"
                to="/Contact"
              >
                Parler à un expert
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
