import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

// Faithful reproduction of the original "Assistant SPORT AIR EVENT" chatbot.
// Keyword-scripted answers captured from the live site.

const GREETING =
  'Bonjour ! 👋 Je suis l\'assistant virtuel de SPORT AIR EVENT. Comment puis-je vous aider avec nos structures gonflables événementielles ?';

const QUICK_REPLIES = [
  'Quels sont vos délais de livraison ?',
  'Quelles tailles de tentes sont disponibles ?',
  'Faites-vous de la location ?',
  'Comment obtenir un devis ?',
];

const RULES = [
  { re: /(locat|louer|location)/i, a: "Nous ne proposons pas de location de structures, uniquement des ventes. Pour un devis personnalisé, n'hésitez pas à nous contacter par email ou téléphone." },
  { re: /(europe|situé|situe|où êtes|ou etes|pays|basé|base|suisse)/i, a: "Nous sommes basés en Suisse et assurons la livraison dans toute l'Europe. Pour plus de détails ou pour un devis personnalisé, n'hésitez pas à nous contacter par email ou téléphone." },
  { re: /(délai|delai|livraison|combien de temps|quand|production)/i, a: "Nos délais de production sont de 2 à 3 semaines, avec un délai minimum requis de 2 semaines avant la livraison. Pour des informations spécifiques ou des demandes urgentes, n'hésitez pas à nous contacter par email ou téléphone." },
  { re: /(taille|dimension|format|3x3|4x4|5x5|grand|spider)/i, a: "Les tentes Spider gonflables sont disponibles en trois tailles : 3x3m, 4x4m et 5x5m. Pour des détails sur les tarifs, je vous recommande de consulter la page produit ou de demander un devis via notre formulaire de contact." },
  { re: /(garantie|garanti)/i, a: "La garantie varie selon les produits : 5 ans pour les tentes Spider, 2 ans pour les arches gonflables et 3 ans pour les impressions. Pour plus de détails sur un produit spécifique, n'hésitez pas à demander un devis ou à consulter la page correspondante." },
  { re: /(install|montage|monter|gonfl|2 min)/i, a: "L'installation de nos structures gonflables, comme la tente Spider, se fait en seulement 2 minutes par une personne. Pour des conseils spécifiques ou un accompagnement, n'hésitez pas à nous contacter. Vous pouvez aussi utiliser notre page produit pour plus d'informations." },
  { re: /(personnalis|logo|couleur|imprim|design|marque)/i, a: "La personnalisation de votre logo en couleur est incluse dans tous nos produits. Vous pouvez visualiser la personnalisation avec notre maquette 3D gratuite. Pour un devis précis, n'hésitez pas à nous contacter !" },
  { re: /(prix|tarif|coût|cout|cher|combien)/i, a: "Les prix varient selon la configuration choisie. Je vous recommande de consulter la page produit correspondante ou de demander un devis personnalisé via notre formulaire de contact." },
  { re: /(devis|commander|acheter|comment obtenir)/i, a: "Pour obtenir un devis gratuit et personnalisé, cliquez sur le bouton « Demander un devis » ou rendez-vous sur notre page Contact. Nous vous répondons sous 24h !" },
  { re: /(contact|email|e-mail|mail|téléphone|telephone|appeler|joindre|whatsapp)/i, a: "Vous pouvez nous contacter par email à contact@sport-air-event.com ou via WhatsApp. Nous répondons à toutes les demandes sous 24h !" },
  { re: /(merci|super|génial|genial|parfait)/i, a: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. 😊" },
  { re: /(bonjour|salut|coucou|hello|bonsoir|hey)/i, a: "Bonjour ! 👋 Ravi de vous accueillir. Posez-moi votre question sur nos structures gonflables, ou demandez un devis personnalisé !" },
];

const FALLBACK =
  "Je suis là pour vous renseigner sur nos structures gonflables ! Pour une réponse précise, n'hésitez pas à demander un devis personnalisé ou à nous contacter par email ou téléphone.";

function answerFor(text) {
  const found = RULES.find((r) => r.re.test(text));
  return found ? found.a : FALLBACK;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }]);
  const [showQuick, setShowQuick] = useState(true);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: 'user', text: t }]);
    setShowQuick(false);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: answerFor(t) }]);
    }, 900);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Assistant SPORT AIR EVENT"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full shadow-2xl flex items-center justify-center text-white transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-7 h-7" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-7 h-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 sm:right-6 z-50 flex flex-col bg-white overflow-hidden"
            style={{
              width: 'min(380px, calc(100vw - 2.5rem))',
              height: 'min(560px, calc(100vh - 8rem))',
              borderRadius: 24,
              boxShadow: '0 24px 64px rgba(0,0,0,0.24)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-[#0066CC] to-[#0052A3] text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm leading-tight">Assistant SPORT AIR EVENT</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" /> En ligne
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-[#0066CC] text-white rounded-2xl rounded-br-md'
                        : 'bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-sm'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {showQuick && (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-gray-400 font-medium">Questions fréquentes :</p>
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="block w-full text-left text-sm text-[#0066CC] bg-white border border-blue-100 hover:bg-blue-50 rounded-xl px-3.5 py-2.5 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md shadow-sm px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-3.5 py-2.5 rounded-full bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Envoyer"
                className="w-10 h-10 flex-shrink-0 rounded-full bg-[#0066CC] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0052A3] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
