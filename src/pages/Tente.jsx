import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, Minus, Plus, ArrowRight, MessageCircle } from 'lucide-react';
import { Reveal, RevealStagger, staggerChild } from '../lib/motion.jsx';
import DevisModal from '../components/DevisModal.jsx';

const SIZES = [
  { id: '3x3', label: '3x3m', price: 1180 },
  { id: '4x4', label: '4x4m', price: 1490 },
  { id: '5x5', label: '5x5m', price: 1790 },
];

const PAROIS = [
  { id: 'simple', label: 'Paroi simple', price: 170 },
  { id: 'porte', label: 'Paroi avec porte (zipp central)', price: 190 },
  { id: 'petite-fenetre', label: 'Paroi avec petite fenêtre', price: 180 },
  { id: 'grande-fenetre', label: 'Paroi grande fenêtre', price: 180 },
  { id: 'double', label: 'Paroi double (impression recto - verso doublée)', price: 290 },
];

const OPTIONS = [
  { id: 'auvent', label: 'Auvent', price: 280 },
  { id: 'connexion', label: 'Connexion inter-tente', price: 180 },
];

const ACCESSOIRES = [
  { id: 'pompe', label: 'Pompe 220 volts', price: 60 },
];

export default function Tente() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('4x4');
  const [quantity, setQuantity] = useState(1);
  const [parois, setParois] = useState([]);
  const [options, setOptions] = useState([]);
  const [accessoires, setAccessoires] = useState([]);
  const [devisOpen, setDevisOpen] = useState(false);

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const size = SIZES.find((s) => s.id === selectedSize);
  const sizePrice = size?.price ?? 0;
  const paroisPrice = PAROIS.filter((p) => parois.includes(p.id)).reduce((a, p) => a + p.price, 0);
  const optionsPrice = OPTIONS.filter((o) => options.includes(o.id)).reduce((a, o) => a + o.price, 0);
  const accessoiresPrice = ACCESSOIRES.filter((a) => accessoires.includes(a.id)).reduce((acc, a) => acc + a.price, 0);
  const total = sizePrice * quantity + paroisPrice + optionsPrice + accessoiresPrice;
  const totalFormatted = total.toLocaleString('en-US');

  const devisLines = size ? [{ label: size.label, qty: quantity, unit: size.price }] : [];
  const devisExtras = [
    ...PAROIS.filter((p) => parois.includes(p.id)).map((p) => ({ label: p.label, qty: 1, unit: p.price })),
    ...OPTIONS.filter((o) => options.includes(o.id)).map((o) => ({ label: o.label, qty: 1, unit: o.price })),
    ...ACCESSOIRES.filter((a) => accessoires.includes(a.id)).map((a) => ({ label: a.label, qty: 1, unit: a.price })),
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="pt-24 md:pt-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              <div className="hidden lg:flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-[4rem] blur-3xl"></div>
                  <div className="relative rounded-3xl p-4" style={{ background: 'rgb(255, 255, 255)', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px' }}>
                    <img
                      src="images/03_330206aa0_ChatGPTImage17janv202613_32_29.png"
                      alt="Tente Sport Air Event"
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: '500px', mixBlendMode: 'multiply', background: 'transparent', clipPath: 'inset(0px 6px 0px 0px)' }}
                    />
                  </div>
                </motion.div>
              </div>
              <div className="lg:hidden">
                <div className="relative">
                  <div className="rounded-2xl p-3" style={{ background: 'rgb(255, 255, 255)', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 24px' }}>
                    <img
                      src="images/03_330206aa0_ChatGPTImage17janv202613_32_29.png"
                      alt="Tente Sport Air Event"
                      className="w-full h-auto object-contain max-h-56"
                      style={{ mixBlendMode: 'multiply', background: 'transparent', clipPath: 'inset(0px 6px 0px 0px)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 pb-2 md:pb-8">
                <Reveal>
                  <h1 className="text-xl md:text-4xl font-bold mb-1">Tente Spider Gonflable</h1>
                  <p className="text-xs md:text-base text-gray-600 mb-1">Installation en 2 minutes • Conception Suisse</p>
                  <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-lg">
                    <Sparkles className="lucide lucide-sparkles w-3 h-3 md:w-4 md:h-4 text-white" />
                    <p className="text-[10px] md:text-sm text-white font-bold">Impression totale comprise</p>
                  </div>
                </Reveal>

                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 mb-2.5">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Taille</h3>
                    <div className="px-2 py-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full whitespace-nowrap">⭐ 4x4m POPULAIRE</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="">
                      <div
                        onClick={() => setSelectedSize('3x3')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${selectedSize === '3x3' ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedSize === '3x3' ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {selectedSize === '3x3' && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">3x3m</div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">300x300(H)x300cm</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">1180€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div
                        onClick={() => setSelectedSize('4x4')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${selectedSize === '4x4' ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent pointer-events-none rounded-2xl"></div>
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedSize === '4x4' ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {selectedSize === '4x4' && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">4x4m</div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">400x400(H)x400cm</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">1490€</div>
                          </div>
                          <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-0.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setQuantity((q) => Math.max(1, q - 1)); }}
                              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Minus className="lucide lucide-minus w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setQuantity((q) => q + 1); }}
                              className="w-7 h-7 rounded-lg bg-[#0066CC] hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                            >
                              <Plus className="lucide lucide-plus w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => setSelectedSize('5x5')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${selectedSize === '5x5' ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedSize === '5x5' ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {selectedSize === '5x5' && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">5x5m</div>
                            <div className="text-xs text-gray-500 leading-tight mt-0.5">500x500(H)x500cm</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">1790€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => navigate('/TenteSurMesure')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/TenteSurMesure'); } }}
                        className="relative overflow-hidden rounded-2xl p-4 md:p-6 bg-gradient-to-br from-[#0066CC] to-blue-700 shadow-xl cursor-pointer group"
                        tabIndex={0}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                              <Sparkles className="lucide lucide-sparkles w-5 h-5 md:w-8 md:h-8 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg md:text-2xl font-bold text-white mb-1">Sur Mesure</h4>
                              <p className="text-white/90 text-xs md:text-sm">Dimensions personnalisées</p>
                            </div>
                          </div>
                          <ArrowRight className="lucide lucide-arrow-right w-6 h-6 md:w-8 md:h-8 text-white group-hover:translate-x-2 transition-transform md:flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Parois</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="">
                      <div
                        onClick={() => toggle(parois, setParois, 'simple')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${parois.includes('simple') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${parois.includes('simple') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {parois.includes('simple') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">Paroi simple</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">170€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div
                        onClick={() => toggle(parois, setParois, 'porte')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${parois.includes('porte') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${parois.includes('porte') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {parois.includes('porte') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">Paroi avec porte (zipp central)</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">190€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div
                        onClick={() => toggle(parois, setParois, 'petite-fenetre')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${parois.includes('petite-fenetre') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${parois.includes('petite-fenetre') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {parois.includes('petite-fenetre') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">Paroi avec petite fenêtre</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">180€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div
                        onClick={() => toggle(parois, setParois, 'grande-fenetre')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${parois.includes('grande-fenetre') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${parois.includes('grande-fenetre') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {parois.includes('grande-fenetre') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">Paroi grande fenêtre</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">180€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div
                        onClick={() => toggle(parois, setParois, 'double')}
                        className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${parois.includes('double') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                      >
                        <div className="relative flex items-center gap-2">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${parois.includes('double') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                            {parois.includes('double') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 leading-tight">Paroi double (impression recto - verso doublée)</div>
                            <div className="text-sm font-bold text-[#0066CC] mt-1">290€</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Options supplémentaires</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div
                      onClick={() => toggle(options, setOptions, 'auvent')}
                      className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${options.includes('auvent') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                    >
                      <div className="relative flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${options.includes('auvent') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                          {options.includes('auvent') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 leading-tight">Auvent</div>
                          <div className="text-sm font-bold text-[#0066CC] mt-1">280€</div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => toggle(options, setOptions, 'connexion')}
                      className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${options.includes('connexion') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                    >
                      <div className="relative flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${options.includes('connexion') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                          {options.includes('connexion') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 leading-tight">Connexion inter-tente</div>
                          <div className="text-sm font-bold text-[#0066CC] mt-1">180€</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2.5">Accessoires</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div
                      onClick={() => toggle(accessoires, setAccessoires, 'pompe')}
                      className={`relative rounded-2xl border-2 transition-colors shadow-md cursor-pointer p-4 ${accessoires.includes('pompe') ? 'border-[#0066CC] bg-gradient-to-br from-blue-50 to-white shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'}`}
                    >
                      <div className="relative flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${accessoires.includes('pompe') ? 'border-[#0066CC] bg-white' : 'border-gray-300'}`}>
                          {accessoires.includes('pompe') && <Check className="lucide lucide-check w-3 h-3 text-[#0066CC]" />}
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
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Impression de la partie haute de la tente</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Structure portante haute pression</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Modélisation 3D gratuite</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Sac de transport sur roulettes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Sacs de lest, cordages et sardines à visser</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">5 ans de garantie</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Envoi gratuit</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="lucide lucide-check w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700">Design 3D gratuit</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block sticky bottom-6 mt-4 relative overflow-hidden bg-white rounded-3xl shadow-2xl border-2 border-[#0066CC]">
                  <div className="relative p-5 md:p-6">
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-0.5">Prix HT</div>
                      <div className="text-3xl md:text-4xl font-bold text-[#0066CC]">€ {totalFormatted}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDevisOpen(true)}
                      className="w-full bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                      style={{ padding: '14px 24px', minHeight: '52px' }}
                    >
                      Demander un devis
                      <ArrowRight className="lucide lucide-arrow-right w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="h-20 md:hidden"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:hidden bg-gradient-to-t from-white/95 via-white/80 to-transparent pt-6">
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl border-2 border-[#0066CC]">
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <div className="text-xs text-gray-500">Prix HT</div>
                <div className="text-2xl font-bold text-[#0066CC]">€ {totalFormatted}</div>
              </div>
              <button
                type="button"
                onClick={() => setDevisOpen(true)}
                className="flex-1 bg-gradient-to-r from-[#0066CC] to-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                style={{ padding: '12px 16px', minHeight: '48px' }}
              >
                Demander un devis
                <ArrowRight className="lucide lucide-arrow-right w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal as="h2" className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center" style={{ letterSpacing: '-0.03em' }}>Caractéristiques techniques</Reveal>
            <Reveal className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Matériau</td>
                    <td className="px-5 py-3.5 text-gray-500">Oxford 600D haute résistance + TPU</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Pression de gonflage</td>
                    <td className="px-5 py-3.5 text-gray-500">Haute pression 0.35 bar</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Résistance au vent</td>
                    <td className="px-5 py-3.5 text-gray-500">Jusqu'à 70 km/h</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Temps de gonflage</td>
                    <td className="px-5 py-3.5 text-gray-500">60-90 secondes</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Impression</td>
                    <td className="px-5 py-3.5 text-gray-500">Sublimation HD 360° résistante aux UV</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Certification</td>
                    <td className="px-5 py-3.5 text-gray-500">Anti-feu M2, Anti-UV</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Garantie</td>
                    <td className="px-5 py-3.5 text-gray-500">5 ans structure + impression</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-5 py-3.5 font-semibold text-gray-700 w-1/2">Poids (4x4m)</td>
                    <td className="px-5 py-3.5 text-gray-500">~12 kg</td>
                  </tr>
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal as="h2" className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center" style={{ letterSpacing: '-0.03em' }}>Parfaite pour</Reveal>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={staggerChild} whileHover={{ y: -4 }} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-3xl flex-shrink-0">🏅</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Événements sportifs</div>
                  <div className="text-sm text-gray-500">Marathons, trails, salons sport, zones VIP</div>
                </div>
              </motion.div>
              <motion.div variants={staggerChild} whileHover={{ y: -4 }} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-3xl flex-shrink-0">🏢</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Salons professionnels</div>
                  <div className="text-sm text-gray-500">Stands B2B, expositions, conventions</div>
                </div>
              </motion.div>
              <motion.div variants={staggerChild} whileHover={{ y: -4 }} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-3xl flex-shrink-0">🎪</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Festivals &amp; concerts</div>
                  <div className="text-sm text-gray-500">Zones presse, accueil VIP, backstage</div>
                </div>
              </motion.div>
              <motion.div variants={staggerChild} whileHover={{ y: -4 }} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-3xl flex-shrink-0">🏪</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Points de vente</div>
                  <div className="text-sm text-gray-500">Pop-up stores, démonstrations, promotions</div>
                </div>
              </motion.div>
            </RevealStagger>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/41774835190"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full shadow-2xl flex items-center justify-center text-white"
      >
        <div style={{ transform: 'rotate(-8.27316deg)' }}>
          <MessageCircle className="lucide lucide-message-circle w-7 h-7" />
        </div>
        <div className="absolute inset-0 rounded-full bg-[#0066CC] opacity-20" style={{ transform: 'scale(1.14581)' }}></div>
      </a>

      <DevisModal
        open={devisOpen}
        onClose={() => setDevisOpen(false)}
        productName="Tente Spider"
        groupLabel="Tailles"
        lines={devisLines}
        extras={devisExtras}
        total={total}
      />
    </div>
  );
}
