import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, Check, Sparkles } from 'lucide-react';
import { Magnetic, motion } from '../lib/motion.jsx';
import { useT } from '../lib/i18n.jsx';

// "Assistant SPORT AIR EVENT" — keyword-scripted answers grounded in the real
// products, prices, delivery, warranty and customization info from the site.

const makeGreeting = (t) =>
  t(
    "Bonjour ! Je suis l'assistant SPORT AIR EVENT. Posez-moi une question sur nos structures gonflables, nos tarifs ou nos délais — ou demandez directement un devis personnalisé.",
    "Hello! I'm the SPORT AIR EVENT assistant. Ask me anything about our inflatable structures, pricing or lead times — or request a tailored quote right away."
  );

// Tappable quick-reply chips (the user taps, we answer).
const makeQuickReplies = (t) => [
  t('Vos produits et tarifs ?', 'Your products and pricing?'),
  t('Délais de livraison ?', 'Delivery times?'),
  t('Garantie ?', 'Warranty?'),
  t('Personnalisation ?', 'Customization?'),
  t('Installation ?', 'Setup?'),
];

// Smart canned answers — real products & prices.
const makeRules = (t) => [
  {
    re: /(tente|spider|3x3|4x4|5x5)/i,
    a: t(
      "La Tente Spider gonflable existe en 3x3m, 4x4m et 5x5m, dès 1180€. Installation en 2 minutes par une seule personne, garantie 5 ans et personnalisation 360° incluse.",
      "The inflatable Spider Tent comes in 3x3m, 4x4m and 5x5m, from 1180€. Set up in two minutes by a single person, 5-year warranty and full 360° customization included."
    ),
  },
  {
    re: /(arche|arch)/i,
    a: t(
      "Nos arches gonflables démarrent à 1490€ (plusieurs tailles disponibles). Idéales pour les lignes de départ/arrivée et les entrées d'événement. Personnalisation complète incluse.",
      "Our inflatable arches start at 1490€ (several sizes available). Perfect for start/finish lines and event entrances. Full customization included."
    ),
  },
  {
    re: /(colonne|colon|totem)/i,
    a: t(
      "Les colonnes gonflables sont disponibles dès 590€ — parfaites pour baliser un parcours ou habiller un stand. Personnalisation 360° en couleur incluse.",
      "Inflatable columns start at 590€ — ideal for marking out a course or dressing up a stand. Full-color 360° customization included."
    ),
  },
  {
    re: /(mobilier|canap|fauteuil|table|comptoir|meuble)/i,
    a: t(
      "Notre mobilier gonflable (canapés, fauteuils, comptoirs, tables) démarre à 180€. Léger, transportable et entièrement personnalisable à vos couleurs.",
      "Our inflatable furniture (sofas, armchairs, counters, tables) starts at 180€. Lightweight, easy to transport and fully customizable in your colors."
    ),
  },
  {
    re: /(produit|gamme|catalogue|que vendez|que proposez|qu'est-ce|structures?)/i,
    a: t(
      "Notre gamme : Tente Spider (dès 1180€), Arches gonflables (dès 1490€), Colonnes gonflables (dès 590€) et Mobilier gonflable (dès 180€). Tout est personnalisable à 360°.",
      "Our range: Spider Tent (from 1180€), inflatable arches (from 1490€), inflatable columns (from 590€) and inflatable furniture (from 180€). Everything is fully 360° customizable."
    ),
  },
  {
    re: /(prix|tarif|coût|cout|cher|combien|budget)/i,
    a: t(
      "Nos tarifs de départ : Tente Spider dès 1180€, Arches dès 1490€, Colonnes dès 590€, Mobilier dès 180€. Le prix final dépend de la taille et de la personnalisation — demandez un devis gratuit pour un chiffrage précis.",
      "Our starting prices: Spider Tent from 1180€, arches from 1490€, columns from 590€, furniture from 180€. The final price depends on size and customization — request a free quote for an exact figure."
    ),
  },
  {
    re: /(locat|louer|location)/i,
    a: t(
      "Nous proposons uniquement la vente (pas de location) de structures personnalisées à vos couleurs. Pour un devis adapté à votre événement, contactez-nous.",
      "We only sell (no rentals) structures customized in your colors. Get in touch for a quote tailored to your event."
    ),
  },
  {
    re: /(europe|situé|situe|où êtes|ou etes|pays|basé|base|suisse|livr|expédi|expedi)/i,
    a: t(
      "Basés en Suisse, nous livrons dans toute l'Europe. Comptez 2 à 3 semaines de production (délai minimum de 2 semaines avant l'événement).",
      "Based in Switzerland, we ship across Europe. Allow 2 to 3 weeks for production (minimum 2 weeks before your event)."
    ),
  },
  {
    re: /(délai|delai|combien de temps|quand|production|rapide|urgent)/i,
    a: t(
      "Délai de production : 2 à 3 semaines, avec un minimum de 2 semaines avant la livraison. Pour une demande urgente, contactez-nous afin que l'on étudie la faisabilité.",
      "Production time: 2 to 3 weeks, with a minimum of 2 weeks before delivery. For a rush order, contact us so we can assess feasibility."
    ),
  },
  {
    re: /(garantie|garanti|durée de vie|duree de vie|solide|résist|resist)/i,
    a: t(
      "Garanties selon le produit : 5 ans sur les tentes Spider, 2 ans sur les arches gonflables et 3 ans sur les impressions. Des matériaux pensés pour durer.",
      "Warranties by product: 5 years on Spider Tents, 2 years on inflatable arches and 3 years on the printing. Materials built to last."
    ),
  },
  {
    re: /(install|montage|monter|gonfl|2 min|facile|rapide à)/i,
    a: t(
      "L'installation est ultra simple : la tente Spider se monte en 2 minutes par une seule personne, sans outil. Un souffleur suffit à gonfler la structure.",
      "Setup couldn't be simpler: the Spider Tent goes up in two minutes by one person, with no tools. A single blower is all it takes to inflate the structure."
    ),
  },
  {
    re: /(personnalis|logo|couleur|imprim|design|marque|360|maquette|3d)/i,
    a: t(
      "Personnalisation 360° en couleur incluse dans tous nos produits. Vous validez le rendu grâce à une maquette 3D gratuite avant production.",
      "Full-color 360° customization is included on every product. You sign off on the look with a free 3D mock-up before production."
    ),
  },
  {
    re: /(devis|commander|acheter|comment obtenir|demande)/i,
    a: t(
      "Pour un devis gratuit et personnalisé, utilisez le bouton « Demander un devis » ci-dessous (page Contact). Nous répondons sous 24h !",
      "For a free, tailored quote, use the “Request a quote” button below (Contact page). We reply within 24 hours!"
    ),
    cta: true,
  },
  {
    re: /(contact|email|e-mail|mail|téléphone|telephone|appeler|joindre|whatsapp)/i,
    a: t(
      "Vous pouvez nous écrire via la page Contact, par email ou WhatsApp. Toutes les demandes reçoivent une réponse sous 24h.",
      "You can reach us through the Contact page, by email or on WhatsApp. Every enquiry gets a reply within 24 hours."
    ),
    cta: true,
  },
  {
    re: /(merci|super|génial|genial|parfait|top|nickel)/i,
    a: t(
      "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.",
      "My pleasure! Feel free to reach out if you have any other questions."
    ),
  },
  {
    re: /(bonjour|salut|coucou|hello|bonsoir|hey|hi)/i,
    a: t(
      "Bonjour ! Ravi de vous accueillir. Posez-moi votre question sur nos structures gonflables, ou demandez un devis personnalisé.",
      "Hello! Great to have you here. Ask me anything about our inflatable structures, or request a tailored quote."
    ),
  },
];

const makeFallback = (t) => ({
  a: t(
    "Je peux vous renseigner sur nos produits (Tente Spider, Arches, Colonnes, Mobilier), les tarifs, les délais, la garantie ou la personnalisation. Pour une réponse sur mesure, demandez un devis gratuit.",
    "I can tell you about our products (Spider Tent, arches, columns, furniture), pricing, lead times, warranty or customization. For a tailored answer, request a free quote."
  ),
  cta: true,
});

function answerFor(text, t) {
  const found = makeRules(t).find((r) => r.re.test(text));
  return found || makeFallback(t);
}

// 24px checkbox-style confirmation tick reused for the "online" indicator.
function Bubble({ from, text, cta }) {
  const t = useT();
  const isUser = from === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[86%]">
        <div
          className="px-3.5 py-2.5 text-[13.5px] leading-relaxed"
          style={
            isUser
              ? {
                  background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))',
                  color: '#fff',
                  borderRadius: '16px 16px 4px 16px',
                  boxShadow: '0 6px 16px rgba(0,102,204,0.22)',
                }
              : {
                  background: '#fff',
                  color: 'var(--ink-2)',
                  borderRadius: '16px 16px 16px 4px',
                  border: '1px solid var(--line)',
                  boxShadow: '0 4px 14px rgba(11,28,63,0.05)',
                }
          }
        >
          {text}
        </div>
        {cta && !isUser && (
          <Link
            to="/Contact"
            data-cursor
            className="cursor-pointer mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-white rounded-full transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))',
              boxShadow: '0 8px 20px rgba(0,102,204,0.28)',
            }}
          >
            <Sparkles size={14} strokeWidth={2.5} />
            {t('Demander un devis', 'Request a quote')}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: makeGreeting(t) }]);
  const [showQuick, setShowQuick] = useState(true);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open, showQuick]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: 'user', text: trimmed }]);
    setShowQuick(false);
    setInput('');
    setTyping(true);
    const reply = answerFor(trimmed, t);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: reply.a, cta: reply.cta }]);
    }, 800);
  };

  return (
    <>
      {/* Floating launcher */}
      <Magnetic strength={0.2} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("Fermer l'assistant", 'Close the assistant') : t('Ouvrir l’assistant SPORT AIR EVENT', 'Open the SPORT AIR EVENT assistant')}
          aria-expanded={open}
          data-cursor
          className="cursor-pointer relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 focus-visible:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))',
            boxShadow: '0 14px 34px rgba(0,102,204,0.40)',
          }}
        >
          {!open && (
            <span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: '0 0 0 0 rgba(31,122,224,0.55)', animation: 'sae-ping 2.4s ease-out infinite' }}
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.span>
            ) : (
              <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageSquareText className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </Magnetic>

      <style>{`@keyframes sae-ping{0%{box-shadow:0 0 0 0 rgba(31,122,224,0.45)}70%{box-shadow:0 0 0 16px rgba(31,122,224,0)}100%{box-shadow:0 0 0 0 rgba(31,122,224,0)}}`}</style>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t('Assistant SPORT AIR EVENT', 'SPORT AIR EVENT assistant')}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] flex flex-col overflow-hidden"
            style={{
              width: 'min(384px, calc(100vw - 2rem))',
              height: 'min(572px, calc(100vh - 8rem))',
              borderRadius: 22,
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              boxShadow: '0 28px 70px rgba(6,36,95,0.28)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 text-white"
              style={{ background: 'radial-gradient(120% 140% at 15% 0%, var(--navy-2) 0%, var(--blue-deep) 60%, var(--blue) 100%)' }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.28)' }}
                >
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: '#34d399', borderColor: 'var(--blue-deep)' }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[15px] leading-tight">{t('Assistant SPORT AIR EVENT', 'SPORT AIR EVENT Assistant')}</h3>
                <p className="text-[11.5px] text-white/80 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }} />
                  {t('En ligne · réponse instantanée', 'Online · instant reply')}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t('Fermer', 'Close')}
                data-cursor
                className="cursor-pointer text-white/75 hover:text-white transition-colors p-1 -mr-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-3.5 py-4 space-y-3"
            >
              {messages.map((m, i) => (
                <Bubble key={i} from={m.from} text={m.text} cta={m.cta} />
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 flex items-center gap-1"
                    style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '16px 16px 16px 4px' }}
                  >
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: 'var(--blue)', animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showQuick && !typing && (
                <div className="pt-1">
                  <p className="text-[11px] uppercase tracking-wide font-semibold mb-2" style={{ color: 'var(--muted)' }}>
                    {t('Suggestions', 'Suggestions')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {makeQuickReplies(t).map((q) => (
                      <span
                        key={q}
                        role="button"
                        tabIndex={0}
                        data-cursor
                        onClick={() => send(q)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            send(q);
                          }
                        }}
                        className="cursor-pointer select-none text-[12.5px] font-medium px-3 py-1.5 rounded-full transition-colors"
                        style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--blue)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--blue-soft)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick devis shortcut + input */}
            <div className="px-3.5 pt-2.5 pb-1.5" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
              <Link
                to="/Contact"
                data-cursor
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center justify-center gap-2 w-full py-2.5 text-[13.5px] font-semibold text-white rounded-full transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))',
                  boxShadow: '0 10px 24px rgba(0,102,204,0.30)',
                }}
              >
                <Check size={15} strokeWidth={3} />
                {t('Demander un devis gratuit', 'Request a free quote')}
              </Link>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 px-3.5 pb-3 pt-1.5"
              style={{ background: '#fff' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('Écrivez votre message…', 'Type your message…')}
                aria-label={t('Votre message', 'Your message')}
                className="flex-1 px-4 py-2.5 rounded-full text-[13.5px] outline-none transition-shadow"
                style={{ background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--blue-soft)'; e.currentTarget.style.borderColor = 'var(--blue)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label={t('Envoyer', 'Send')}
                data-cursor
                className="cursor-pointer w-10 h-10 flex-shrink-0 rounded-full text-white flex items-center justify-center disabled:opacity-40 transition-transform hover:scale-105 focus-visible:scale-105"
                style={{ background: 'linear-gradient(135deg, var(--blue-bright), var(--blue-deep))' }}
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
