import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';
import DevisModal from '../components/DevisModal.jsx';

export default function TenteSurMesure() {
  const [devisOpen, setDevisOpen] = useState(false);

  return (
    <div className="pt-24 md:pt-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <div className="hidden lg:flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] items-center justify-center">
            <Reveal className="relative w-full">
              <div
                style={{
                  background: 'rgb(255, 255, 255)',
                  borderRadius: '24px',
                  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px',
                  padding: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                }}
              >
                <img
                  src="images/22_4887239cb_ChatGPTImage16janv202616_52_44.png"
                  alt="Tente Sur Mesure Sport Air Event"
                  style={{
                    mixBlendMode: 'multiply',
                    background: 'transparent',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    clipPath: 'inset(0px 8px 0px 0px)',
                  }}
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:hidden">
            <div
              style={{
                background: 'rgb(255, 255, 255)',
                borderRadius: '24px',
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px',
                padding: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
              }}
            >
              <img
                src="images/22_4887239cb_ChatGPTImage16janv202616_52_44.png"
                alt="Tente Sur Mesure Sport Air Event"
                style={{
                  mixBlendMode: 'multiply',
                  background: 'transparent',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  clipPath: 'inset(0px 8px 0px 0px)',
                }}
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 pb-24">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full mb-6 border border-blue-200">
                <Sparkles className="w-5 h-5 text-[#0066CC]" />
                <span className="text-[#0066CC] font-bold">Création exclusive</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-3">Tente Sur Mesure</h1>
              <p className="text-base md:text-xl text-gray-700 font-semibold mb-3">Tentes de 6 à 20 mètres de diamètre</p>
              <p className="text-sm md:text-base text-gray-600 mb-3">Votre vision, notre expertise. Conception et fabrication sur mesure.</p>
              <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-lg">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                <p className="text-[10px] md:text-sm text-white font-bold">Impression totale comprise</p>
              </div>
            </Reveal>

            <Reveal className="relative overflow-hidden bg-white rounded-xl shadow-lg border-2 border-blue-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"></div>
              <div className="relative p-4 md:p-6">
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-3">Dimensions personnalisées</h3>
                <p className="text-gray-600 text-xs md:text-base mb-4">De 6 à 20 mètres de diamètre selon vos besoins</p>
                <ul className="space-y-2 md:space-y-4">
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0066CC] rounded-full flex-shrink-0"></div>
                    <span className="text-xs md:text-base text-gray-800">Design 100% personnalisé</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0066CC] rounded-full flex-shrink-0"></div>
                    <span className="text-xs md:text-base text-gray-800">Maquette 3D incluse</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0066CC] rounded-full flex-shrink-0"></div>
                    <span className="text-xs md:text-base text-gray-800">Conception suisse</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0066CC] rounded-full flex-shrink-0"></div>
                    <span className="text-xs md:text-base text-gray-800">Délai : 8-12 semaines</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 md:p-6 shadow-md border border-blue-100">
              <h3 className="text-base md:text-xl font-bold text-gray-900 mb-4">Pourquoi choisir la version Sur Mesure ?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-[#0066CC]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Dimensions exactes</h4>
                    <p className="text-xs text-gray-600">De 6 à 20m — adaptée à votre espace unique</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-[#0066CC]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Design 100% personnel</h4>
                    <p className="text-xs text-gray-600">Votre vision devient réalité sans compromis</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-[#0066CC]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Impression totale 360°</h4>
                    <p className="text-xs text-gray-600">Logo, couleurs, design sur tous les panneaux</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-[#0066CC]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Formes spéciales</h4>
                    <p className="text-xs text-gray-600">Dôme, géodésique, polygone — possibilités infinies</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="relative overflow-hidden bg-white rounded-xl p-4 md:p-6 shadow-lg border-2 border-blue-100">
              <h3 className="text-base md:text-xl font-bold text-gray-900 mb-4">Processus et délais</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0066CC] text-white font-bold flex items-center justify-center text-sm">1</div>
                    <div className="w-0.5 h-12 bg-blue-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-bold text-gray-900 text-sm">Consultation</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Présentez votre projet et vos besoins. Réponse sous 24h.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0066CC] text-white font-bold flex items-center justify-center text-sm">2</div>
                    <div className="w-0.5 h-12 bg-blue-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-bold text-gray-900 text-sm">Design &amp; Maquette 3D</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Nous créons votre vision en 3D (2-3 semaines)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0066CC] text-white font-bold flex items-center justify-center text-sm">3</div>
                    <div className="w-0.5 h-12 bg-blue-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-bold text-gray-900 text-sm">Fabrication</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Construction et impression (6-10 semaines)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0066CC] text-white font-bold flex items-center justify-center text-sm">4</div>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-bold text-gray-900 text-sm">Livraison &amp; Support</h4>
                    <p className="text-xs text-gray-600 mt-0.5">Installation, garantie, et support technique inclus</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="sticky bottom-4 mt-4 relative overflow-hidden bg-white rounded-xl shadow-2xl border-2 border-[#0066CC]">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-0.5">Prix HT</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#0066CC]">Sur devis</div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setDevisOpen(true)}
                      className="bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-base flex items-center gap-2 hover:shadow-xl transition-all"
                      style={{ padding: '12px 20px', minHeight: '48px' }}
                    >
                      Demander un devis
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Tente Sur Mesure"
        groupLabel={null}
        lines={[]}
        extras={[]}
        total={null}
      />
    </div>
  );
}
