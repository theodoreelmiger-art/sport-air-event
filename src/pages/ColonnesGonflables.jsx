import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Check,
  Minus,
  Plus,
  ArrowRight,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import { Reveal, RevealStagger, staggerChild } from '../lib/motion.jsx';
import DevisModal from '../components/DevisModal.jsx';

const HEIGHTS = [
  { id: '2.5m', label: '2.5m', dims: '250x60(diamètre)cm', price: 590 },
  { id: '3m', label: '3m', dims: '300x60(diamètre)cm', price: 670 },
  { id: '4m', label: '4m', dims: '400x70(diamètre)cm', price: 750 },
];

const LED_PRICE = 95;
const PUMP_PRICE = 60;

export default function ColonnesGonflables() {
  const navigate = useNavigate();
  const [selectedHeight, setSelectedHeight] = useState('3m');
  const [quantity, setQuantity] = useState(1);
  const [ledOn, setLedOn] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [devisOpen, setDevisOpen] = useState(false);

  const heightData = HEIGHTS.find((h) => h.id === selectedHeight) || HEIGHTS[1];
  const totalPrice =
    heightData.price * quantity + (ledOn ? LED_PRICE : 0) + (pumpOn ? PUMP_PRICE : 0);

  const devisLines = [{ label: heightData.label, qty: quantity, unit: heightData.price }];
  const devisExtras = [
    ...(ledOn ? [{ label: 'Éclairage LED RGB intégré', qty: 1, unit: LED_PRICE }] : []),
    ...(pumpOn ? [{ label: 'Pompe 220 volts', qty: 1, unit: PUMP_PRICE }] : []),
  ];

  return (
    <div className="overflow-x-hidden">
      <main>
        <div className="pt-24 md:pt-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <div className="hidden lg:flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] items-center justify-center">
                <Reveal className="relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-[4rem] blur-3xl"></div>
                  <div
                    className="relative rounded-3xl p-6"
                    style={{
                      background: 'rgb(255, 255, 255)',
                      borderRadius: '24px',
                      boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px',
                    }}
                  >
                    <img
                      src="images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png"
                      alt="Colonnes Gonflables Sport Air Event"
                      className="w-full h-auto object-contain"
                      style={{
                        maxHeight: '600px',
                        mixBlendMode: 'multiply',
                        background: 'transparent',
                        clipPath: 'inset(0px 6px 0px 0px)',
                      }}
                    />
                  </div>
                </Reveal>
              </div>
              <div className="lg:hidden">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgb(255, 255, 255)',
                    borderRadius: '24px',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px',
                  }}
                >
                  <img
                    src="images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png"
                    alt="Colonnes Gonflables Sport Air Event"
                    className="w-full h-auto object-contain max-h-60"
                    style={{
                      mixBlendMode: 'multiply',
                      background: 'transparent',
                      clipPath: 'inset(0px 6px 0px 0px)',
                    }}
                  />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 pb-2 md:pb-8">
                <Reveal>
                  <h1 className="text-xl md:text-4xl font-bold mb-1">Colonnes Gonflables</h1>
                  <p className="text-xs md:text-base text-gray-600 mb-1">
                    Balisage élégant pour vos événements
                  </p>
                  <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-lg">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    <p className="text-[10px] md:text-sm text-white font-bold">
                      Impression totale comprise
                    </p>
                  </div>
                </Reveal>
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 mb-2.5">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Hauteur</h3>
                    <div className="px-2 py-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full whitespace-nowrap">
                      ⭐ 3m POPULAIRE
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="">
                      <div
                        onClick={() => setSelectedHeight('2.5m')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${
                          selectedHeight === '2.5m'
                            ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedHeight === '2.5m'
                                ? 'border-[#0066CC] bg-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedHeight === '2.5m' && (
                              <Check className="w-3 h-3 text-[#0066CC]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">
                              2.5m
                            </div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">
                              250x60(diamètre)cm
                            </div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">590€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div
                        onClick={() => setSelectedHeight('3m')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${
                          selectedHeight === '3m'
                            ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent pointer-events-none rounded-2xl"></div>
                        <div className="relative flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedHeight === '3m'
                                ? 'border-[#0066CC] bg-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedHeight === '3m' && (
                              <Check className="w-3 h-3 text-[#0066CC]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">
                              3m
                            </div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">
                              300x60(diamètre)cm
                            </div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">670€</div>
                          </div>
                          <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-0.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuantity((q) => Math.max(1, q - 1));
                              }}
                              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuantity((q) => q + 1);
                              }}
                              className="w-7 h-7 rounded-lg bg-[#0066CC] hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => setSelectedHeight('4m')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${
                          selectedHeight === '4m'
                            ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedHeight === '4m'
                                ? 'border-[#0066CC] bg-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedHeight === '4m' && (
                              <Check className="w-3 h-3 text-[#0066CC]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">
                              4m
                            </div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">
                              400x70(diamètre)cm
                            </div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">750€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => navigate('/ColonnesSurMesure')}
                        role="button"
                        className="relative overflow-hidden rounded-2xl p-4 md:p-6 bg-gradient-to-br from-[#0066CC] to-blue-700 shadow-xl cursor-pointer group"
                        tabIndex={0}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                              <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg md:text-2xl font-bold text-white mb-1">
                                Sur Mesure
                              </h4>
                              <p className="text-white/90 text-xs md:text-sm">
                                Dimensions personnalisées
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:translate-x-2 transition-transform md:flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">
                    Option éclairage
                  </h3>
                  <button
                    onClick={() => setLedOn((v) => !v)}
                    className={`w-full p-4 md:p-6 rounded-2xl border-2 transition-all shadow-md ${
                      ledOn
                        ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                    }`}
                    tabIndex={0}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1 ${
                          ledOn ? 'border-[#0066CC] bg-white' : 'border-gray-300'
                        }`}
                      >
                        {ledOn && <Check className="w-3 h-3 md:w-4 md:h-4 text-[#0066CC]" />}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-gray-900 flex items-center gap-2 text-sm md:text-lg mb-1">
                          <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                          Éclairage LED RGB intégré
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 mb-2">
                          Illumination programmable multicolore
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-base md:text-xl font-bold text-[#0066CC]">+€ 95</div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Accessoires</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div
                      onClick={() => setPumpOn((v) => !v)}
                      role="button"
                      className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${
                        pumpOn
                          ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                      }`}
                    >
                      <div className="relative flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            pumpOn ? 'border-[#0066CC] bg-white' : 'border-gray-300'
                          }`}
                        >
                          {pumpOn && <Check className="w-3 h-3 text-[#0066CC]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 leading-tight">
                            Pompe 220 volts
                          </div>
                          <div className="text-sm font-bold text-[#0066CC] mt-1">60€</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 shadow-md border border-blue-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <h4 className="text-sm font-bold text-gray-900 mb-2.5">
                      Inclus dans le prix de base :
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">
                          Personnalisation complète avec votre logo
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Modélisation 3D gratuite</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">
                          Ventilateur électrique silencieux
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">
                          Base lestée pour stabilité maximale
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">
                          Sac de transport professionnel
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Design 3D gratuit</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block sticky bottom-6 mt-4 relative overflow-hidden bg-white rounded-3xl shadow-2xl border-2 border-[#0066CC]">
                  <div className="relative p-5 md:p-6">
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-0.5">Prix HT</div>
                      <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">€ {totalPrice}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDevisOpen(true)}
                      className="w-full bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                      tabIndex={0}
                      style={{ padding: '14px 24px', minHeight: '52px' }}
                    >
                      Demander un devis
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="h-20 md:hidden"></div>
              </div>
            </div>
          </div>
          <div
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden"
            style={{
              background:
                'linear-gradient(to top, rgba(255, 255, 255, 0.98) 70%, transparent)',
            }}
          >
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl border-2 border-[#0066CC]">
              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <div className="text-xs text-gray-500">Prix HT</div>
                  <div className="text-2xl font-bold text-[#0066CC]">€ {totalPrice}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setDevisOpen(true)}
                  className="flex-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{ padding: '12px 16px', minHeight: '48px' }}
                >
                  Demander un devis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal
                as="h2"
                className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center"
                style={{ letterSpacing: '-0.03em' }}
              >
                Caractéristiques techniques
              </Reveal>
              <Reveal className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Matériau</td>
                      <td className="px-5 py-3.5 text-gray-500">
                        PVC 650g/m² haute résistance
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">
                        Hauteurs disponibles
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">2.5m – 3m – 4m</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Impression</td>
                      <td className="px-5 py-3.5 text-gray-500">
                        Sublimation HD 360° UV résistant
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Éclairage</td>
                      <td className="px-5 py-3.5 text-gray-500">LED RGB intégré (option)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">
                        Temps de montage
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">3-5 minutes par colonne</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">
                        Base de lestage
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">Base lestée incluse</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Usage</td>
                      <td className="px-5 py-3.5 text-gray-500">Intérieur et extérieur</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Garantie</td>
                      <td className="px-5 py-3.5 text-gray-500">
                        2 ans structure + 3 ans impression
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Reveal>
            </div>
          </section>
          <section className="py-16 md:py-24 bg-[#f8fafc]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal
                as="h2"
                className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center"
                style={{ letterSpacing: '-0.03em' }}
              >
                Parfaites pour
              </Reveal>
              <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <span className="text-3xl flex-shrink-0">🏁</span>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Balisage sportif</div>
                    <div className="text-sm text-gray-500">
                      Circuits, parcours, zones de balisage
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <span className="text-3xl flex-shrink-0">🎪</span>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Entrées &amp; allées</div>
                    <div className="text-sm text-gray-500">
                      Créer des couloirs d&apos;honneur visuels
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <span className="text-3xl flex-shrink-0">🏢</span>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Salons &amp; expo</div>
                    <div className="text-sm text-gray-500">
                      Signalétique de stand, délimitation
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <span className="text-3xl flex-shrink-0">🎉</span>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Soirées &amp; événements</div>
                    <div className="text-sm text-gray-500">
                      Décoration lumineuse, ambiance unique
                    </div>
                  </div>
                </motion.div>
              </RevealStagger>
            </div>
          </section>
        </div>
      </main>
      <motion.a
        href="https://wa.me/41774835190"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full shadow-2xl flex items-center justify-center text-white"
        tabIndex={0}
      >
        <div>
          <MessageCircle className="w-7 h-7" />
        </div>
        <div className="absolute inset-0 rounded-full bg-[#0066CC] opacity-20"></div>
      </motion.a>
      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Colonnes Gonflables"
        groupLabel="Hauteurs"
        lines={devisLines}
        extras={devisExtras}
        total={totalPrice}
      />
    </div>
  );
}
