import { motion } from 'framer-motion';
import {
  MessageCircle,
  CircleCheck,
  Star,
  Sparkles,
  Send,
  User,
  Package,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Reveal, RevealStagger } from '../lib/motion.jsx';

const reviews = [
  {
    initials: 'LD',
    name: 'Laurent Dubois',
    role: 'EventPro France',
    gradient: 'linear-gradient(135deg, rgb(26, 86, 219), rgb(59, 130, 246))',
    text: 'Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono, rendu visuel impressionnant et service client très réactif. Parfait pour nos événements professionnels.',
    date: '28 avril 2026',
  },
  {
    initials: 'SM',
    name: 'Sophie Martin',
    role: 'Marketing & Events',
    gradient: 'linear-gradient(135deg, rgb(8, 145, 178), rgb(6, 182, 212))',
    text: 'Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande vivement.',
    date: '17 juillet 2025',
  },
  {
    initials: 'JR',
    name: 'Jean-Pierre Rousseau',
    role: 'Sports & Festivals',
    gradient: 'linear-gradient(135deg, rgb(124, 58, 237), rgb(167, 139, 250))',
    text: 'Quatrième commande et toujours aussi satisfait. Produits haut de gamme, délais respectés, équipe professionnelle. Les structures résistent parfaitement aux conditions extérieures.',
    date: '15 décembre 2024',
  },
];

const faqs = [
  { emoji: '🚚', question: 'Quel est le délai de livraison ?' },
  { emoji: '🌍', question: 'Livrez-vous en dehors de la Suisse ?' },
  { emoji: '📋', question: 'Proposez-vous un service de location ?' },
  { emoji: '🛡️', question: 'Quelle est la garantie sur vos produits ?' },
  { emoji: '⚡', question: "L'installation est-elle facile ?" },
  { emoji: '🎨', question: 'Puis-je personnaliser totalement ma structure ?' },
];

const particles = Array.from({ length: 30 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
}));

export default function Contact() {
  return (
    <div className="pt-16 md:pt-20 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden min-h-screen">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full blur-sm"
          style={{ left: p.left, top: p.top }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3] }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Hero + form */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-200 rounded-full mb-6">
              <MessageCircle className="lucide lucide-message-circle w-5 h-5 text-[#0066CC]" />
              <span className="text-[#0066CC] font-bold">Parlons de votre projet</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-[#0066CC] via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Contactez-nous
              </span>
            </h1>
            <p className="text-base md:text-2xl text-gray-600">
              Demandez votre devis personnalisé gratuit
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              className="relative p-4 md:p-6 bg-white rounded-xl md:rounded-3xl shadow-lg border-2 border-blue-100 hover:border-[#0066CC] transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:flex-col md:text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0066CC] to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <CircleCheck className="lucide lucide-circle-check w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">Réponse sous 24h</h3>
                  <p className="text-xs md:text-sm text-gray-600">Notre équipe vous contacte rapidement</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              className="relative p-4 md:p-6 bg-white rounded-xl md:rounded-3xl shadow-lg border-2 border-blue-100 hover:border-[#0066CC] transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:flex-col md:text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0066CC] to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Star className="lucide lucide-star w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">Devis gratuit</h3>
                  <p className="text-xs md:text-sm text-gray-600">Sans engagement</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              className="relative p-4 md:p-6 bg-white rounded-xl md:rounded-3xl shadow-lg border-2 border-blue-100 hover:border-[#0066CC] transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3 md:flex-col md:text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0066CC] to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Sparkles className="lucide lucide-sparkles w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1">Accompagnement</h3>
                  <p className="text-xs md:text-sm text-gray-600">De la conception à la livraison</p>
                </div>
              </div>
            </motion.div>
          </RevealStagger>

          <Reveal className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-[3rem] blur-3xl" />
            <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-[2.5rem] shadow-2xl border-2 border-blue-100 p-4 md:p-12">
              <div className="text-center mb-6 md:mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full mb-3 md:mb-4">
                  <Send className="lucide lucide-send w-3 h-3 md:w-4 md:h-4 text-[#0066CC]" />
                  <span className="text-xs md:text-sm font-bold text-[#0066CC]">Formulaire de contact</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Décrivez votre projet</h2>
                <p className="text-sm md:text-base text-gray-600">
                  Remplissez le formulaire ci-dessous et recevez une réponse sous 24h
                </p>
              </div>

              <form className="relative">
                <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                  <div className="relative bg-gradient-to-br from-[#0066CC] to-blue-600 p-6 md:p-10 overflow-hidden">
                    <div className="relative z-10 text-center">
                      <h2 className="text-xl md:text-4xl font-bold text-white mb-2">Demandez votre devis</h2>
                      <p className="text-white/90 text-sm md:text-lg">Réponse garantie sous 24h</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:gap-4 mt-6 md:mt-8 relative z-10">
                      <div className="relative">
                        <div className="w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold transition-all bg-white text-[#0066CC] shadow-xl">
                          <User className="lucide lucide-user w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div className="text-[10px] md:text-xs mt-1 md:mt-2 text-center font-medium text-white">Informations</div>
                      </div>
                      <div className="w-8 md:w-16 h-0.5 md:h-1 rounded-full transition-all bg-white/20" />
                      <div className="relative">
                        <div className="w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold transition-all bg-white/20 text-white/60">
                          <Package className="lucide lucide-package w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div className="text-[10px] md:text-xs mt-1 md:mt-2 text-center font-medium text-white/60">Projet</div>
                      </div>
                      <div className="w-8 md:w-16 h-0.5 md:h-1 rounded-full transition-all bg-white/20" />
                      <div className="relative">
                        <div className="w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold transition-all bg-white/20 text-white/60">
                          <Send className="lucide lucide-send w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div className="text-[10px] md:text-xs mt-1 md:mt-2 text-center font-medium text-white/60">Envoi</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-10">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="text-xs md:text-sm font-bold mb-2 block text-gray-700">Entreprise *</label>
                          <div className="relative">
                            <Building2 className="lucide lucide-building2 absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                            <input
                              className="flex w-full border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 md:pl-12 h-11 md:h-14 text-sm md:text-base border-2 focus:border-[#0066CC] rounded-xl"
                              placeholder="Nom de votre entreprise"
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs md:text-sm font-bold mb-2 block text-gray-700">Nom complet *</label>
                          <div className="relative">
                            <User className="lucide lucide-user absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                            <input
                              className="flex w-full border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 md:pl-12 h-11 md:h-14 text-sm md:text-base border-2 focus:border-[#0066CC] rounded-xl"
                              placeholder="Votre nom"
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs md:text-sm font-bold mb-2 block text-gray-700">Email *</label>
                          <div className="relative">
                            <Mail className="lucide lucide-mail absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                            <input
                              type="email"
                              className="flex w-full border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 md:pl-12 h-11 md:h-14 text-sm md:text-base border-2 focus:border-[#0066CC] rounded-xl"
                              placeholder="email@entreprise.com"
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs md:text-sm font-bold mb-2 block text-gray-700">Téléphone *</label>
                          <div className="relative">
                            <Phone className="lucide lucide-phone absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                            <input
                              className="flex w-full border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 md:pl-12 h-11 md:h-14 text-sm md:text-base border-2 focus:border-[#0066CC] rounded-xl"
                              placeholder="06 XX XX XX XX"
                              defaultValue=""
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-full py-3 md:py-4 bg-[#0066CC] hover:bg-blue-700 text-white text-sm md:text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        Continuer
                        <ArrowRight className="lucide lucide-arrow-right w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-8 text-center space-y-4">
                <p className="text-gray-600 text-sm mb-2">Vous préférez nous écrire directement ?</p>
                <a
                  href="mailto:contact@sport-air-event.com"
                  className="text-[#0066CC] font-bold hover:underline inline-flex items-center gap-2"
                >
                  <Mail className="lucide lucide-mail w-4 h-4" />
                  contact@sport-air-event.com
                </a>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm mb-3">Ou contactez-nous sur WhatsApp</p>
                  <a
                    href="https://wa.me/41774835190"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="lucide lucide-message-circle w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-reviews" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-bold text-gray-700">Avis</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="lucide lucide-star w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-xl font-bold text-gray-900">4.9</span>
            </div>
            <p className="text-sm text-gray-500">
              Basé sur <strong className="text-gray-700">127</strong> avis
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <motion.div
                key={r.initials}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
                className="flex flex-col p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
                  borderRadius: '24px',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: r.gradient }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{r.text}</p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{r.date}</span>
                  <span className="text-xs text-gray-400">Publié sur Google</span>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#0066CC] rounded-full text-sm font-semibold mb-4">
              <Sparkles className="lucide lucide-sparkles w-4 h-4" />
              Questions fréquentes
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Tout ce que vous devez savoir</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal
                key={faq.question}
                delay={0.05 * i}
                className="rounded-2xl border overflow-hidden transition-all border-gray-200 hover:border-gray-300"
              >
                <button className="w-full flex items-center gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-xl flex-shrink-0">{faq.emoji}</span>
                  <span className="flex-1 font-semibold text-gray-900 text-sm md:text-base">{faq.question}</span>
                  <ChevronDown className="lucide lucide-chevron-down w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Floating chat button */}
      <motion.button
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full shadow-2xl flex items-center justify-center text-white"
        tabIndex={0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessageCircle className="lucide lucide-message-circle w-7 h-7" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full bg-[#0066CC] opacity-20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </div>
  );
}
