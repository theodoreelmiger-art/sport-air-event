import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Check,
  Minus,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

const PRODUCT = 'Arches Gonflables';
const CONTACT_TARGET = '/Contact?product=Arches%20Gonflables';

const dimensions = [
  { id: '5m', title: '5m', dims: '500x320(H)x60cm', price: 1490, span: '' },
  { id: '6m', title: '6m', dims: '600x380(H)x60cm', price: 1590, span: '' },
  { id: '7m', title: '7m', dims: '700x430(H)x80cm', price: 1790, span: '' },
  { id: '8m', title: '8m', dims: '800x480(H)x90cm', price: 1990, span: '' },
  { id: '10m', title: '10m', dims: '1000x580(H)x90cm', price: 2490, span: 'sm:col-span-2' },
];

const POMPE_PRICE = 60;

function formatPrice(value) {
  return value.toLocaleString('en-US');
}

export default function ArchesGonflables() {
  const navigate = useNavigate();
  const [selectedDimension, setSelectedDimension] = useState('6m');
  const [quantity, setQuantity] = useState(1);
  const [pompeSelected, setPompeSelected] = useState(false);

  const selected = dimensions.find((d) => d.id === selectedDimension) ?? dimensions[1];
  const totalPrice =
    selected.price * quantity + (pompeSelected ? POMPE_PRICE : 0);

  const handleSelectDimension = (id) => {
    setSelectedDimension(id);
    if (quantity < 1) setQuantity(1);
  };

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  return (
    <div className="overflow-x-hidden">
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
                    src="images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png"
                    alt="Arche Gonflable Sport Air Event"
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
                  src="images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png"
                  alt="Arche Gonflable Sport Air Event"
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
                <h1 className="text-xl md:text-4xl font-bold mb-1">Arches Gonflables</h1>
                <p className="text-xs md:text-base text-gray-600 mb-1">
                  Lignes de départ/arrivée et événements sportifs
                </p>
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-lg">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  <p className="text-[10px] md:text-sm text-white font-bold">Impression totale comprise</p>
                </div>
              </Reveal>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 mb-2.5">
                  <h3 className="text-base md:text-lg font-bold text-gray-900">Dimensions</h3>
                  <div className="px-2 py-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full whitespace-nowrap">
                    ⭐ 6m POPULAIRE
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {dimensions.map((dim) => {
                    const isSelected = selectedDimension === dim.id;
                    return (
                      <div key={dim.id} className={dim.span}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleSelectDimension(dim.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectDimension(dim.id);
                            }
                          }}
                          className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${
                            isSelected
                              ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent pointer-events-none rounded-2xl"></div>
                          )}
                          <div className="relative flex items-center gap-2">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'border-[#0066CC] bg-white' : 'border-gray-300'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-[#0066CC]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-gray-900 leading-tight">{dim.title}</div>
                              <div className="text-xs text-gray-500 leading-tight mt-0.5">{dim.dims}</div>
                              <div className="text-sm font-bold text-[#0066CC] mt-1">{dim.price}€</div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-0.5 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    decrement();
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
                                    increment();
                                  }}
                                  className="w-7 h-7 rounded-lg bg-[#0066CC] hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-span-1 sm:col-span-2">
                    <div
                      role="button"
                      onClick={() => navigate(CONTACT_TARGET)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(CONTACT_TARGET);
                        }
                      }}
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
                            <h4 className="text-lg md:text-2xl font-bold text-white mb-1">Sur mesure</h4>
                            <p className="text-white/90 text-xs md:text-sm">Dimensions personnalisées</p>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:translate-x-2 transition-transform md:flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Accessoires</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setPompeSelected((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setPompeSelected((v) => !v);
                      }
                    }}
                    className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${
                      pompeSelected
                        ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="relative flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          pompeSelected ? 'border-[#0066CC] bg-white' : 'border-gray-300'
                        }`}
                      >
                        {pompeSelected && <Check className="w-3 h-3 text-[#0066CC]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 leading-tight">Pompe 220 volts</div>
                        <div className="text-sm font-bold text-[#0066CC] mt-1">60€</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 shadow-md border border-blue-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
                <div className="relative">
                  <h4 className="text-sm font-bold text-gray-900 mb-2.5">Inclus dans le prix de base :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Impression haute qualité de votre logo et design</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Modélisation 3D gratuite</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Ventilateur électrique professionnel fourni</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Kit de fixation et sac de transport inclus</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">Garantie 2 ans structure + 3 ans impression</span>
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
                    <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">€ {formatPrice(totalPrice)}</div>
                  </div>
                  <Link
                    to={CONTACT_TARGET}
                    className="w-full bg-[#0066CC] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    tabIndex={0}
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
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden"
          style={{ background: 'linear-gradient(to top, rgba(255, 255, 255, 0.98) 70%, transparent)' }}
        >
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl border-2 border-[#0066CC]">
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="text-xs text-gray-500">Prix HT</div>
                <div className="text-2xl font-bold text-[#0066CC]">€ {formatPrice(totalPrice)}</div>
              </div>
              <Link
                to={CONTACT_TARGET}
                className="flex-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                style={{ padding: '12px 16px', minHeight: '48px' }}
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                    <td className="px-5 py-3.5 text-gray-500">Oxford 600D haute résistance + soudure thermique</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Largeurs disponibles</td>
                    <td className="px-5 py-3.5 text-gray-500">5m – 6m – 7m – 8m – 10m</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Hauteur</td>
                    <td className="px-5 py-3.5 text-gray-500">3m à 5m selon largeur</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Impression</td>
                    <td className="px-5 py-3.5 text-gray-500">Sublimation HD 360° UV résistant</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Temps de gonflage</td>
                    <td className="px-5 py-3.5 text-gray-500">10-15 minutes</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Résistance au vent</td>
                    <td className="px-5 py-3.5 text-gray-500">Jusqu'à 60 km/h avec haubans</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Alimentation ventilateur</td>
                    <td className="px-5 py-3.5 text-gray-500">220V inclus</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Garantie</td>
                    <td className="px-5 py-3.5 text-gray-500">2 ans structure + 3 ans impression</td>
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
              Parfaite pour
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <span className="text-3xl flex-shrink-0">🏃</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Courses &amp; marathons</div>
                  <div className="text-sm text-gray-500">Lignes de départ et d'arrivée spectaculaires</div>
                </div>
              </motion.div>
              <motion.div
                className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <span className="text-3xl flex-shrink-0">🚴</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Sports cyclistes</div>
                  <div className="text-sm text-gray-500">Étapes de course, cols, critériums</div>
                </div>
              </motion.div>
              <motion.div
                className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <span className="text-3xl flex-shrink-0">🎪</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Entrées d'événements</div>
                  <div className="text-sm text-gray-500">Portiques, accueil, signalétique</div>
                </div>
              </motion.div>
              <motion.div
                className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <span className="text-3xl flex-shrink-0">🏪</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Animations commerciales</div>
                  <div className="text-sm text-gray-500">Ouvertures de magasins, promotions</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
