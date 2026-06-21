import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  CircleCheck,
  Star,
  Send,
  User,
  Package,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

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
  {
    question: 'Quel est le délai de livraison ?',
    answer:
      'Entre 4 et 6 semaines pour une production standard, avec option express en 2-3 semaines.',
  },
  {
    question: 'Livrez-vous en dehors de la Suisse ?',
    answer:
      "Oui, nous livrons dans toute l'Europe et à l'international avec nos partenaires logistiques de confiance.",
  },
  {
    question: 'Proposez-vous un service de location ?',
    answer:
      'Oui, nous proposons la location de structures pour les événements ponctuels. Contactez-nous pour un devis personnalisé.',
  },
  {
    question: 'Quelle est la garantie sur vos produits ?',
    answer:
      "2 ans sur la structure gonflable, 3 ans sur l'impression et la personnalisation graphique. Un service après-vente dédié est inclus.",
  },
  {
    question: "L'installation est-elle facile ?",
    answer:
      "Absolument. Nos tentes Spider s'installent en 2 minutes par une seule personne. Chaque structure est livrée avec une notice détaillée et un support vidéo.",
  },
  {
    question: 'Puis-je personnaliser totalement ma structure ?',
    answer:
      'Oui, impression 360° HD de votre logo, couleurs et visuels. Une maquette 3D gratuite est incluse avant production pour valider votre design.',
  },
];

const structureTypes = ['Tente Spider', 'Arches', 'Colonnes', 'Mobilier', 'Sur Mesure'];

const promises = [
  { icon: CircleCheck, title: 'Réponse sous 24h', desc: 'Notre équipe vous contacte rapidement' },
  { icon: Star, title: 'Devis gratuit', desc: 'Sans engagement' },
  { icon: Package, title: 'Accompagnement', desc: 'De la conception à la livraison' },
];

const steps = [
  { icon: User, label: 'Informations' },
  { icon: Package, label: 'Projet' },
  { icon: Send, label: 'Envoi' },
];

// Map a decoded ?product=… value onto one of the structureTypes options.
function matchStructureType(product) {
  if (!product) return '';
  const p = product.toLowerCase();
  if (p.includes('spider') || p.includes('tente')) return 'Tente Spider';
  if (p.includes('arche')) return 'Arches';
  if (p.includes('colonne')) return 'Colonnes';
  if (p.includes('mobilier')) return 'Mobilier';
  if (p.includes('mesure') || p.includes('dôme') || p.includes('dome') || p.includes('premium'))
    return 'Sur Mesure';
  return '';
}

// Shared input styling — flat, hairline border, blue focus ring (editorial system).
const inputCls =
  'w-full bg-white h-12 md:h-14 pl-11 md:pl-12 pr-4 text-sm md:text-base text-ink rounded-[14px] border border-[var(--line)] placeholder:text-[var(--muted)]/70 focus:border-[var(--blue)] focus-visible:outline-none transition-colors';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') || '';

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    entreprise: '',
    nom: '',
    email: '',
    telephone: '',
    structure: matchStructureType(productParam),
    dimensions: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Pre-select / pre-fill the project type from the URL query param.
  useEffect(() => {
    const matched = matchStructureType(productParam);
    if (matched) {
      setForm((f) => ({ ...f, structure: matched }));
    }
  }, [productParam]);

  const updateField = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
  };

  const validateStep1 = () => {
    const next = {};
    if (!form.entreprise.trim()) next.entreprise = true;
    if (!form.nom.trim()) next.nom = true;
    if (!form.email.trim()) next.email = true;
    if (!form.telephone.trim()) next.telephone = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  // To send silently in-page (no mail client), get a free key at https://web3forms.com
  // (enter contact@sport-air-event.com, they email you a key) and paste it below.
  const WEB3FORMS_ACCESS_KEY = '';
  const [sending, setSending] = useState(false);

  const buildMailto = () => {
    const subject = `Demande de devis${form.entreprise ? ' – ' + form.entreprise : ''}`;
    const body = [
      `Entreprise : ${form.entreprise}`,
      `Nom complet : ${form.nom}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.telephone}`,
      `Type de structure : ${form.structure || '—'}`,
      `Dimensions / quantité : ${form.dimensions || '—'}`,
      '',
      'Message :',
      form.message || '—',
    ].join('\n');
    return `mailto:contact@sport-air-event.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async () => {
    if (WEB3FORMS_ACCESS_KEY) {
      try {
        setSending(true);
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Demande de devis${form.entreprise ? ' – ' + form.entreprise : ''}`,
            from_name: form.nom || 'Site Sport Air Event',
            entreprise: form.entreprise,
            nom: form.nom,
            email: form.email,
            telephone: form.telephone,
            structure: form.structure,
            dimensions: form.dimensions,
            message: form.message,
          }),
        });
      } catch (e) {
        /* fall through to success UI regardless */
      } finally {
        setSending(false);
      }
    } else {
      // No backend configured: open the visitor's mail client, pre-filled and addressed.
      window.location.href = buildMailto();
    }
    setSubmitted(true);
  };

  const errorBorder = '#ef4444';

  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO + FORM ░░ */}
      <section className="bg-paper pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          {/* Editorial intro */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-6">
                <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Parlons de votre projet</span>
              </Reveal>
              <h1
                className="font-display font-bold text-ink tracking-tightest"
                style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 0.96, maxWidth: '14ch' }}
              >
                Contactez-nous
                <br />
                <span className="serif-accent text-ink/45" style={{ fontWeight: 500 }}>
                  pour votre devis
                </span>
              </h1>
            </div>
            <Reveal as="p" delay={0.1} className="lg:col-span-5 lead">
              Demandez votre devis personnalisé gratuit. Notre équipe vous accompagne de la
              conception à la livraison, avec une réponse garantie sous 24h.
            </Reveal>
          </div>

          {/* Promises — flat hairline grid */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden mb-14 md:mb-20">
            {promises.map((p, i) => (
              <motion.div variants={staggerChild} key={p.title} className="bg-white p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <p.icon className="w-5 h-5 text-[var(--blue)]" />
                  <span className="text-xs font-semibold text-ink/25 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-[15px] text-ink mb-1.5">{p.title}</h3>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </RevealStagger>

          {/* Form card — flat editorial */}
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left rail */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="kicker mb-4">Formulaire de contact</div>
                <h2
                  className="font-display font-bold text-ink tracking-tightest"
                  style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)', lineHeight: 1.05 }}
                >
                  Décrivez votre projet
                </h2>
                <p className="lead mt-5">
                  Remplissez le formulaire ci-dessous et recevez une réponse sous 24h
                </p>

                <div className="mt-8 pt-8 border-t border-[var(--line)] space-y-5">
                  <div>
                    <p className="text-sm text-[var(--muted)] mb-2">Vous préférez nous écrire directement ?</p>
                    <a
                      href="mailto:contact@sport-air-event.com"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      contact@sport-air-event.com
                    </a>
                  </div>
                  <div className="pt-5 border-t border-[var(--line)]">
                    <p className="text-sm text-[var(--muted)] mb-3">Ou contactez-nous sur WhatsApp</p>
                    <a
                      href="https://wa.me/41774835190"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-ink border border-[var(--line)] hover:border-ink/15 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-8">
                <form className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                  {/* Step header */}
                  <div className="px-6 md:px-10 pt-7 md:pt-9 pb-8 border-b border-[var(--line)]">
                    <div className="flex items-baseline justify-between mb-7">
                      <h3 className="font-display text-lg md:text-xl font-bold text-ink">Demandez votre devis</h3>
                      <span className="text-sm text-[var(--muted)]">Réponse sous 24h</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      {steps.map((s, i) => {
                        const num = i + 1;
                        const reached = step >= num;
                        return (
                          <div key={s.label} className="flex items-center gap-2 md:gap-4 flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-colors ${
                                  reached
                                    ? 'bg-deep text-white'
                                    : 'bg-paper text-[var(--muted)] border border-[var(--line)]'
                                }`}
                              >
                                <s.icon className="w-4 h-4 md:w-5 md:h-5" />
                              </div>
                              <span
                                className={`text-[10px] md:text-xs font-medium ${
                                  reached ? 'text-ink' : 'text-[var(--muted)]'
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                            {i < steps.length - 1 && (
                              <div
                                className={`flex-1 h-px transition-colors ${
                                  step >= num + 1 ? 'bg-ink' : 'bg-[var(--line)]'
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 md:p-10">
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">Entreprise *</label>
                            <div className="relative">
                              <Building2 className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[var(--muted)]" />
                              <input
                                className={inputCls}
                                placeholder="Nom de votre entreprise"
                                value={form.entreprise}
                                onChange={updateField('entreprise')}
                                style={errors.entreprise ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">Nom complet *</label>
                            <div className="relative">
                              <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[var(--muted)]" />
                              <input
                                className={inputCls}
                                placeholder="Votre nom"
                                value={form.nom}
                                onChange={updateField('nom')}
                                style={errors.nom ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">Email *</label>
                            <div className="relative">
                              <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[var(--muted)]" />
                              <input
                                type="email"
                                className={inputCls}
                                placeholder="email@entreprise.com"
                                value={form.email}
                                onChange={updateField('email')}
                                style={errors.email ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">Téléphone *</label>
                            <div className="relative">
                              <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[var(--muted)]" />
                              <input
                                className={inputCls}
                                placeholder="06 XX XX XX XX"
                                value={form.telephone}
                                onChange={updateField('telephone')}
                                style={errors.telephone ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                        </div>
                        <Magnetic className="w-full">
                          <button
                            type="button"
                            onClick={handleContinue}
                            className="cta-iridescent w-full px-7 py-3.5 text-[15px] font-semibold inline-flex items-center justify-center gap-2"
                          >
                            Continuer
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Magnetic>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="text-xs font-semibold mb-3 block text-ink/70 uppercase tracking-wide">Type de structure</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                            {structureTypes.map((type) => {
                              const active = form.structure === type;
                              return (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setForm((f) => ({ ...f, structure: type }))}
                                  className={`py-3 px-3 rounded-[14px] border text-sm md:text-base font-semibold transition-colors ${
                                    active
                                      ? 'border-ink bg-deep text-white'
                                      : 'border-[var(--line)] bg-white text-ink hover:border-ink/20'
                                  }`}
                                >
                                  {type}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">Dimensions / quantité</label>
                          <div className="relative">
                            <Package className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[var(--muted)]" />
                            <input
                              className={inputCls}
                              placeholder="Ex : 3x3m, 2 unités…"
                              value={form.dimensions}
                              onChange={updateField('dimensions')}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">Votre message</label>
                          <textarea
                            rows={4}
                            className="w-full bg-white px-4 py-3 text-sm md:text-base text-ink rounded-[14px] border border-[var(--line)] placeholder:text-[var(--muted)]/70 focus:border-[var(--blue)] focus-visible:outline-none transition-colors"
                            placeholder="Décrivez votre projet, vos besoins, vos délais…"
                            value={form.message}
                            onChange={updateField('message')}
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-5 py-3.5 rounded-full text-[15px] font-semibold text-ink border border-[var(--line)] hover:border-ink/20 inline-flex items-center justify-center gap-2 transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                          </button>
                          <Magnetic className="flex-1">
                            <button
                              type="button"
                              onClick={handleContinue}
                              className="cta-iridescent w-full px-7 py-3.5 text-[15px] font-semibold inline-flex items-center justify-center gap-2"
                            >
                              Continuer
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </Magnetic>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        {submitted ? (
                          <div className="text-center py-8 md:py-12">
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 rounded-full flex items-center justify-center border border-[var(--line)] bg-paper">
                              <CircleCheck className="w-7 h-7 md:w-8 md:h-8 text-[var(--blue)]" />
                            </div>
                            <p className="font-display text-lg md:text-xl font-semibold text-ink max-w-md mx-auto">
                              Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24h.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-5 md:p-7">
                              <h3 className="font-display text-base md:text-lg font-semibold text-ink mb-4">Récapitulatif</h3>
                              <dl className="divide-y divide-[var(--line)]">
                                <div className="flex justify-between gap-4 text-sm md:text-base py-2.5">
                                  <dt className="text-[var(--muted)]">Entreprise</dt>
                                  <dd className="font-semibold text-ink text-right">{form.entreprise}</dd>
                                </div>
                                <div className="flex justify-between gap-4 text-sm md:text-base py-2.5">
                                  <dt className="text-[var(--muted)]">Nom complet</dt>
                                  <dd className="font-semibold text-ink text-right">{form.nom}</dd>
                                </div>
                                <div className="flex justify-between gap-4 text-sm md:text-base py-2.5">
                                  <dt className="text-[var(--muted)]">Email</dt>
                                  <dd className="font-semibold text-ink text-right">{form.email}</dd>
                                </div>
                                <div className="flex justify-between gap-4 text-sm md:text-base py-2.5">
                                  <dt className="text-[var(--muted)]">Téléphone</dt>
                                  <dd className="font-semibold text-ink text-right">{form.telephone}</dd>
                                </div>
                                {form.structure && (
                                  <div className="flex justify-between gap-4 text-sm md:text-base py-2.5">
                                    <dt className="text-[var(--muted)]">Type de structure</dt>
                                    <dd className="font-semibold text-ink text-right">{form.structure}</dd>
                                  </div>
                                )}
                                {form.dimensions && (
                                  <div className="flex justify-between gap-4 text-sm md:text-base py-2.5">
                                    <dt className="text-[var(--muted)]">Dimensions / quantité</dt>
                                    <dd className="font-semibold text-ink text-right">{form.dimensions}</dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={handleBack}
                                className="px-5 py-3.5 rounded-full text-[15px] font-semibold text-ink border border-[var(--line)] hover:border-ink/20 inline-flex items-center justify-center gap-2 transition-colors"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                Retour
                              </button>
                              <Magnetic className="flex-1">
                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  disabled={sending}
                                  className="cta-iridescent w-full px-7 py-3.5 text-[15px] font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                  Envoyer ma demande
                                  <Send className="w-4 h-4" />
                                </button>
                              </Magnetic>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ░░ REVIEWS (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeader light kicker="Témoignages" index="01" title={<>Ils nous font<br />confiance</>} />
            <Reveal as="div" delay={0.1} className="flex items-center gap-4 md:pb-2">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-display text-xl font-bold text-white ml-1">4.9</span>
              </div>
              <span className="text-sm text-white/55">Basé sur <strong className="text-white/80">127</strong> avis</span>
            </Reveal>
          </div>

          <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {reviews.map((r) => (
              <motion.div key={r.initials} variants={staggerChild} className="flex flex-col bg-deep p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: r.gradient }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{r.name}</div>
                    <div className="text-xs text-white/50">{r.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed flex-1">{r.text}</p>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/40">{r.date}</span>
                  <span className="text-xs text-white/40">Publié sur Google</span>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ FAQ ░░ */}
      <section className="bg-white border-t border-[var(--line)] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeader align="center" kicker="Questions fréquentes" index="02" className="mb-12" title="Tout ce que vous devez savoir" />
          <RevealStagger className="border-t border-[var(--line)]">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div key={faq.question} variants={staggerChild} className="border-b border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-6 group"
                  >
                    <h3 className="font-display text-[17px] md:text-lg font-semibold text-ink group-hover:text-[var(--blue)] transition-colors">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--line)]"
                    >
                      <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="c"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="text-[15px] text-[var(--muted)] leading-relaxed pb-6 max-w-2xl">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
