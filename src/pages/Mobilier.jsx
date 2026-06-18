import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Armchair, Table2, Wine, Check, ArrowRight } from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

export default function Mobilier() {
  return (
    <main>
      <div className="pt-24 md:pt-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Sticky image column (desktop) */}
            <div className="hidden lg:flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] items-center justify-center mb-8 lg:mb-0">
              <Reveal className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-[2rem] md:rounded-[4rem] blur-3xl"></div>
                <div
                  className="relative rounded-3xl p-6 flex items-center justify-center"
                  style={{ minHeight: '360px', background: 'rgb(255, 255, 255)', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px' }}
                >
                  <img
                    src="images/18_1fc91b287_ChatGPTImage17janv202616_40_27.png"
                    alt="Mobilier Gonflable Sport Air Event"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '320px', mixBlendMode: 'multiply', background: 'transparent', clipPath: 'inset(0px 6px 0px 0px)' }}
                  />
                </div>
              </Reveal>
            </div>

            {/* Image (mobile) */}
            <div className="lg:hidden">
              <div className="rounded-2xl p-4" style={{ background: 'rgb(255, 255, 255)', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px' }}>
                <img
                  src="images/18_1fc91b287_ChatGPTImage17janv202616_40_27.png"
                  alt="Mobilier Gonflable Sport Air Event"
                  className="w-full h-auto object-contain max-h-52"
                  style={{ mixBlendMode: 'multiply', background: 'transparent', clipPath: 'inset(0px 6px 0px 0px)' }}
                />
              </div>
            </div>

            {/* Content column */}
            <div className="space-y-4 md:space-y-6 pb-2 md:pb-8">
              <Reveal>
                <div className="inline-block mb-4 md:mb-6">
                  <div className="px-6 py-3 bg-[#0066CC] rounded-full">
                    <span className="text-white font-bold">Mobilier Événementiel</span>
                  </div>
                </div>
                <h1 className="text-xl md:text-4xl font-bold mb-1">Mobilier Gonflable</h1>
                <p className="text-xs md:text-base text-gray-600 mb-1">Complétez vos structures avec notre mobilier personnalisé</p>
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-lg">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  <p className="text-[10px] md:text-sm text-white font-bold">Impression totale comprise</p>
                </div>
              </Reveal>

              {/* Catégorie */}
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Catégorie</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <button type="button" className="relative overflow-hidden rounded-xl md:rounded-2xl p-3 md:p-5 transition-all bg-[#0066CC] text-white shadow-2xl" tabIndex={0}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex flex-col items-center gap-1.5 md:gap-2">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <Armchair className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="font-bold text-xs md:text-sm">Assises</span>
                      <div className="px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-white/20 backdrop-blur-sm">4</div>
                    </div>
                  </button>
                  <button type="button" className="relative overflow-hidden rounded-xl md:rounded-2xl p-3 md:p-5 transition-all bg-white text-gray-700 border-2 border-gray-200 hover:border-[#0066CC] shadow-lg hover:shadow-xl" tabIndex={0}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex flex-col items-center gap-1.5 md:gap-2">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-blue-50">
                        <Table2 className="w-4 h-4 md:w-6 md:h-6 text-[#0066CC]" />
                      </div>
                      <span className="font-bold text-xs md:text-sm">Tables</span>
                      <div className="px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-blue-50 text-[#0066CC]">2</div>
                    </div>
                  </button>
                  <button type="button" className="relative overflow-hidden rounded-xl md:rounded-2xl p-3 md:p-5 transition-all bg-white text-gray-700 border-2 border-gray-200 hover:border-[#0066CC] shadow-lg hover:shadow-xl" tabIndex={0}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex flex-col items-center gap-1.5 md:gap-2">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-blue-50">
                        <Wine className="w-4 h-4 md:w-6 md:h-6 text-[#0066CC]" />
                      </div>
                      <span className="font-bold text-xs md:text-sm">Bars</span>
                      <div className="px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-blue-50 text-[#0066CC]">1</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Type de mobilier */}
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Type de mobilier</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg">
                    <div className="relative flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 border-gray-300"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 leading-tight">Pouf gonflable imprimé</div>
                        <div className="text-sm font-bold text-[#0066CC] mt-1">180€</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg">
                    <div className="relative flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 border-gray-300"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 leading-tight">Chaise basse</div>
                        <div className="text-sm font-bold text-[#0066CC] mt-1">280€</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg">
                    <div className="relative flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 border-gray-300"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 leading-tight">Sofa 1 place</div>
                        <div className="text-sm font-bold text-[#0066CC] mt-1">290€</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg">
                    <div className="relative flex items-center gap-2">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 border-gray-300"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 leading-tight">Sofa 2 places</div>
                        <div className="text-sm font-bold text-[#0066CC] mt-1">460€</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessoires */}
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Accessoires</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="w-full">
                    <div className="relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg">
                      <div className="relative flex items-center gap-2">
                        <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 border-gray-300"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 leading-tight">Pompe 220 volts</div>
                          <div className="text-sm font-bold text-[#0066CC] mt-1">60€</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personnalisation complète */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 shadow-md border border-blue-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
                <div className="relative">
                  <h4 className="text-sm font-bold text-gray-900 mb-2.5">Personnalisation complète</h4>
                  <p className="text-xs text-gray-600 mb-2.5">Chaque élément de mobilier peut être entièrement personnalisé avec vos couleurs et votre logo</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Impression HD</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Matériaux premium</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Montage rapide</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Design 3D gratuit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prix HT card (desktop) */}
              <div className="hidden md:block sticky bottom-6 mt-4 relative overflow-hidden bg-white rounded-3xl shadow-2xl border-2 border-[#0066CC]">
                <div className="relative p-5 md:p-6">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-0.5">Prix HT</div>
                    <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">€ 0</div>
                  </div>
                  <Link
                    to="/Contact"
                    className="w-full bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                    style={{ padding: '14px 24px', minHeight: '52px' }}
                  >
                    Demander un devis
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="h-20 md:hidden"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky price bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden" style={{ background: 'linear-gradient(to top, rgba(255, 255, 255, 0.98) 70%, transparent)' }}>
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl border-2 border-[#0066CC]">
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="text-xs text-gray-500">Prix HT</div>
              <div className="text-2xl font-bold text-[#0066CC]">€ 0</div>
            </div>
            <Link
              to="/Contact"
              className="flex-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{ padding: '12px 16px', minHeight: '48px' }}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
