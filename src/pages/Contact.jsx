import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  CircleCheck,
  Check,
  Star,
  Send,
  User,
  Package,
  Building2,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useT } from '../lib/i18n.jsx';
import { WEB3FORMS_KEY, sendViaWeb3Forms } from '../lib/forms.js';

const makeReviews = (t) => [
  {
    ini: 'CM',
    grad: 'linear-gradient(135deg,#0066cc,#3b82f6)',
    name: 'Camille Mercier',
    role: 'Trail Évasion Annecy',
    date: t('12 mai 2026', 'May 12, 2026'),
    text: t(
      'Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono, rendu visuel impressionnant et service client très réactif. Parfait pour nos événements professionnels.',
      'Outstanding-quality inflatable structures. Set up in two minutes flat, striking visual impact and a highly responsive support team. Perfect for our corporate events.',
    ),
  },
  {
    ini: 'YB',
    grad: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    name: 'Yanis B.',
    role: 'Agence Lumen — Lyon',
    date: t('3 juillet 2025', 'July 3, 2025'),
    text: t(
      'Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande vivement.',
      'Flawless Spider Tent for our trade show. Modern design, lightning-fast setup and spot-on branding. Swiss-engineered, with quality to match. Highly recommended.',
    ),
  },
  {
    ini: 'FN',
    grad: 'linear-gradient(135deg,#2563eb,#60a5fa)',
    name: 'Farida Nasri',
    role: 'Comité Marathon du Léman',
    date: t('21 décembre 2024', 'December 21, 2024'),
    text: t(
      'Quatrième commande et toujours aussi satisfait. Produits haut de gamme, délais respectés, équipe professionnelle. Les structures résistent parfaitement aux conditions extérieures.',
      'Fourth order and still just as happy. Premium products, deadlines met, a professional team. The structures hold up perfectly in outdoor conditions.',
    ),
  },
];

const makeFaqs = (t) => [
  {
    question: t('Quel est le délai de livraison ?', 'What is the delivery time?'),
    answer: t(
      'Entre 4 et 6 semaines pour une production standard, avec option express en 2-3 semaines.',
      'Between 4 and 6 weeks for standard production, with an express option in 2–3 weeks.',
    ),
  },
  {
    question: t('Livrez-vous en dehors de la Suisse ?', 'Do you deliver outside Switzerland?'),
    answer: t(
      "Oui, nous livrons dans toute l'Europe et à l'international avec nos partenaires logistiques de confiance.",
      'Yes, we ship across Europe and worldwide through our trusted logistics partners.',
    ),
  },
  {
    question: t('Proposez-vous un service de location ?', 'Do you offer a rental service?'),
    answer: t(
      'Oui, nous proposons la location de structures pour les événements ponctuels. Contactez-nous pour un devis personnalisé.',
      'Yes, we rent out structures for one-off events. Get in touch for a tailored quote.',
    ),
  },
  {
    question: t('Quelle est la garantie sur vos produits ?', 'What warranty do your products carry?'),
    answer: t(
      "2 ans sur la structure gonflable, 3 ans sur l'impression et la personnalisation graphique. Un service après-vente dédié est inclus.",
      '2 years on the inflatable structure and 3 years on printing and graphic customisation. Dedicated after-sales support is included.',
    ),
  },
  {
    question: t("L'installation est-elle facile ?", 'Is setup easy?'),
    answer: t(
      "Absolument. Nos tentes Spider s'installent en 2 minutes par une seule personne. Chaque structure est livrée avec une notice détaillée et un support vidéo.",
      'Absolutely. Our Spider Tents go up in two minutes by a single person. Every structure ships with a detailed manual and a video guide.',
    ),
  },
  {
    question: t(
      'Puis-je personnaliser totalement ma structure ?',
      'Can I fully customise my structure?',
    ),
    answer: t(
      'Oui, impression 360° HD de votre logo, couleurs et visuels. Une maquette 3D gratuite est incluse avant production pour valider votre design.',
      'Yes — full 360° HD printing of your logo, colours and artwork. A free 3D mock-up is included before production so you can approve your design.',
    ),
  },
];

const makeStructureTypes = (t) => [
  { value: 'Tente Spider', label: t('Tente Spider', 'Spider Tent') },
  { value: 'Arches', label: t('Arches', 'Arches') },
  { value: 'Colonnes', label: t('Colonnes', 'Columns') },
  { value: 'Mobilier', label: t('Mobilier', 'Furniture') },
  { value: 'Sur Mesure', label: t('Sur Mesure', 'Custom-made') },
];

const makePromises = (t) => [
  {
    icon: Clock,
    title: t('Réponse sous 24h', 'Reply within 24 hours'),
    desc: t('Notre équipe vous contacte rapidement.', 'Our team gets back to you promptly.'),
  },
  {
    icon: Star,
    title: t('Devis gratuit', 'Free quote'),
    desc: t('Sans aucun engagement de votre part.', 'With no obligation whatsoever.'),
  },
  {
    icon: Package,
    title: t('Accompagnement', 'End-to-end support'),
    desc: t('De la conception à la livraison.', 'From design to delivery.'),
  },
  {
    icon: ShieldCheck,
    title: t('Conception Suisse', 'Swiss-engineered'),
    desc: t('Garantie qualité, finitions premium.', 'Guaranteed quality, premium finishes.'),
  },
];

const makeSteps = (t) => [
  { icon: User, label: t('Informations', 'Details') },
  { icon: Package, label: t('Projet', 'Project') },
  { icon: Send, label: t('Envoi', 'Submit') },
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
  'w-full bg-white h-12 md:h-13 pl-11 md:pl-12 pr-4 text-sm md:text-[15px] text-ink rounded-[14px] border border-[var(--line)] placeholder:text-[var(--muted)]/70 focus:border-[var(--blue)] focus-visible:outline-none transition-colors';

// Authentic multicolor Google "G" logo (vector, no black).
function GoogleG({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-label="Google"
      role="img"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

export default function Contact() {
  const t = useT();
  const reviews = makeReviews(t);
  const faqs = makeFaqs(t);
  const structureTypes = makeStructureTypes(t);
  const promises = makePromises(t);
  const steps = makeSteps(t);

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
  const [openFaq, setOpenFaq] = useState(0);

  // Reviews carousel (one review at a time, directional transitions).
  const [[reviewIdx, reviewDir], setReviewState] = useState([0, 0]);
  const goReview = (d) =>
    setReviewState(([i]) => {
      const next = (i + d + reviews.length) % reviews.length;
      return [next, d];
    });
  const jumpReview = (i) => setReviewState(([cur]) => [i, i > cur ? 1 : -1]);
  const review = reviews[reviewIdx];

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
  const WEB3FORMS_ACCESS_KEY = WEB3FORMS_KEY;
  const [sending, setSending] = useState(false);

  const buildMailto = () => {
    const subject = `${t('Demande de devis', 'Quote request')}${form.entreprise ? ' – ' + form.entreprise : ''}`;
    const body = [
      `${t('Entreprise', 'Company')} : ${form.entreprise}`,
      `${t('Nom complet', 'Full name')} : ${form.nom}`,
      `Email : ${form.email}`,
      `${t('Téléphone', 'Phone')} : ${form.telephone}`,
      `${t('Type de structure', 'Structure type')} : ${form.structure || '—'}`,
      `${t('Dimensions / quantité', 'Dimensions / quantity')} : ${form.dimensions || '—'}`,
      '',
      `${t('Message', 'Message')} :`,
      form.message || '—',
    ].join('\n');
    return `mailto:contact@sport-air-event.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async () => {
    setSending(true);
    // Envoi réel via Web3Forms (FormData → contact@sport-air-event.com) ; sinon mailto.
    const ok = await sendViaWeb3Forms({
      subject: `${t('Demande de devis', 'Quote request')}${form.entreprise ? ' – ' + form.entreprise : ''}`,
      from_name: form.nom || t('Site Sport Air Event', 'Sport Air Event Website'),
      entreprise: form.entreprise,
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
      structure: form.structure,
      dimensions: form.dimensions,
      message: form.message,
    });
    setSending(false);
    if (!ok) window.location.href = buildMailto();
    setSubmitted(true);
  };

  const errorBorder = '#ef4444';

  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="bg-paper pt-28 md:pt-32 pb-9 md:pb-12">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-3xl">
            <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
              <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
              <span className="kicker">{t('Parlons de votre projet', "Let's talk about your project")}</span>
            </Reveal>
            <h1
              className="font-display font-bold text-ink tracking-tightest"
              style={{ fontSize: 'clamp(2.4rem,5.4vw,4rem)', lineHeight: 1, maxWidth: '16ch' }}
            >
              {t('Contactez-nous', 'Get in touch')}{' '}
              <span className="serif-accent text-ink/45" style={{ fontWeight: 500 }}>
                {t('pour votre devis', 'for your quote')}
              </span>
            </h1>
            <Reveal as="p" delay={0.1} className="lead mt-5 max-w-xl">
              {t(
                'Demandez votre devis personnalisé gratuit. Notre équipe vous accompagne de la conception à la livraison, avec une réponse garantie sous 24h.',
                'Request your free, tailored quote. Our team supports you from design to delivery, with a guaranteed reply within 24 hours.',
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ TWO-COLUMN : INFO + FORM ░░ */}
      <section className="bg-paper pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* ── Left rail : reassurance + contact ── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <Reveal>
                <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6 md:p-7">
                  <div className="kicker mb-3">{t('Pourquoi nous', 'Why us')}</div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-ink mb-5">
                    {t('Un interlocuteur dédié', 'A single dedicated contact')}
                  </h2>
                  <div className="space-y-px bg-[var(--line)] border border-[var(--line)] rounded-[14px] overflow-hidden">
                    {promises.map((p) => (
                      <div key={p.title} className="flex items-start gap-3.5 bg-white p-4">
                        <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-[var(--blue-soft)] flex-shrink-0">
                          <p.icon className="w-4 h-4 text-[var(--blue)]" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold text-[14px] text-ink leading-tight">
                            {p.title}
                          </h3>
                          <p className="text-[12.5px] text-[var(--muted)] leading-snug mt-0.5">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Direct contact card */}
              <Reveal delay={0.08}>
                <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6 md:p-7">
                  <p className="text-[13px] text-[var(--muted)] mb-2">
                    {t('Vous préférez nous écrire directement ?', 'Prefer to email us directly?')}
                  </p>
                  <a
                    href="mailto:contact@sport-air-event.com"
                    data-cursor
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:underline break-all"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    contact@sport-air-event.com
                  </a>
                  <div className="mt-5 pt-5 border-t border-[var(--line)]">
                    <p className="text-[13px] text-[var(--muted)] mb-3">
                      {t('Ou contactez-nous sur WhatsApp', 'Or reach us on WhatsApp')}
                    </p>
                    <a
                      href="https://wa.me/41774835190"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-ink border border-[var(--line)] hover:border-ink/15 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      WhatsApp
                    </a>
                  </div>
                  <div className="mt-5 pt-5 border-t border-[var(--line)] flex items-center gap-2 text-[13px] text-[var(--muted)]">
                    <span>{t('Conception Suisse', 'Swiss-engineered')}</span>
                    <span aria-hidden>🇨🇭</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Form ── */}
            <div className="lg:col-span-7">
              <Reveal delay={0.04}>
                <form
                  className="rounded-[var(--radius-lg)] bg-white border border-[var(--line)] overflow-hidden"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Step header */}
                  <div className="px-6 md:px-9 pt-6 md:pt-8 pb-6 border-b border-[var(--line)]">
                    <div className="flex items-baseline justify-between mb-6">
                      <h3 className="font-display text-lg md:text-xl font-bold text-ink">
                        {t('Demandez votre devis', 'Request your quote')}
                      </h3>
                      <span className="text-[13px] text-[var(--muted)]">
                        {t('Réponse sous 24h', 'Reply within 24 hours')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      {steps.map((s, i) => {
                        const num = i + 1;
                        const reached = step >= num;
                        return (
                          <div
                            key={s.label}
                            className="flex items-center gap-2 md:gap-4 flex-1 last:flex-none"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${
                                  reached
                                    ? 'bg-deep text-white'
                                    : 'bg-paper text-[var(--muted)] border border-[var(--line)]'
                                }`}
                              >
                                <s.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                              </div>
                              <span
                                className={`text-[10px] md:text-[11px] font-medium ${
                                  reached ? 'text-ink' : 'text-[var(--muted)]'
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                            {i < steps.length - 1 && (
                              <div
                                className={`flex-1 h-px transition-colors ${
                                  step >= num + 1 ? 'bg-[var(--blue)]' : 'bg-[var(--line)]'
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 md:p-9">
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">
                              {t('Entreprise *', 'Company *')}
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] text-[var(--muted)]" />
                              <input
                                className={inputCls}
                                placeholder={t('Nom de votre entreprise', 'Your company name')}
                                value={form.entreprise}
                                onChange={updateField('entreprise')}
                                style={errors.entreprise ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">
                              {t('Nom complet *', 'Full name *')}
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] text-[var(--muted)]" />
                              <input
                                className={inputCls}
                                placeholder={t('Votre nom', 'Your name')}
                                value={form.nom}
                                onChange={updateField('nom')}
                                style={errors.nom ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">
                              Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] text-[var(--muted)]" />
                              <input
                                type="email"
                                className={inputCls}
                                placeholder={t('email@entreprise.com', 'email@company.com')}
                                value={form.email}
                                onChange={updateField('email')}
                                style={errors.email ? { borderColor: errorBorder } : undefined}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">
                              {t('Téléphone *', 'Phone *')}
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] text-[var(--muted)]" />
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
                            data-cursor
                            className="cta-iridescent w-full px-7 py-3.5 text-[15px] font-semibold inline-flex items-center justify-center gap-2"
                          >
                            {t('Continuer', 'Continue')}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Magnetic>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <label className="text-xs font-semibold mb-3 block text-ink/70 uppercase tracking-wide">
                            {t('Type de structure', 'Structure type')}
                          </label>
                          <div className="space-y-px bg-[var(--line)] border border-[var(--line)] rounded-[14px] overflow-hidden">
                            {structureTypes.map((type) => {
                              const active = form.structure === type.value;
                              const toggle = () =>
                                setForm((f) => ({
                                  ...f,
                                  structure: f.structure === type.value ? '' : type.value,
                                }));
                              return (
                                <div
                                  key={type.value}
                                  role="button"
                                  tabIndex={0}
                                  data-cursor
                                  onClick={toggle}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      toggle();
                                    }
                                  }}
                                  className="cursor-pointer flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-[var(--blue-mist)]"
                                >
                                  <span
                                    className="grid place-items-center flex-shrink-0 transition-colors"
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: 7,
                                      background: active ? 'var(--blue)' : '#fff',
                                      border: active ? 'none' : '1.5px solid var(--line)',
                                    }}
                                  >
                                    {active && <Check size={15} strokeWidth={3} color="#fff" />}
                                  </span>
                                  <span
                                    className={`text-sm md:text-[15px] font-semibold ${
                                      active ? 'text-ink' : 'text-ink/80'
                                    }`}
                                  >
                                    {type.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">
                            {t('Dimensions / quantité', 'Dimensions / quantity')}
                          </label>
                          <div className="relative">
                            <Package className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] text-[var(--muted)]" />
                            <input
                              className={inputCls}
                              placeholder={t('Ex : 3x3m, 2 unités…', 'e.g. 3x3m, 2 units…')}
                              value={form.dimensions}
                              onChange={updateField('dimensions')}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-2 block text-ink/70 uppercase tracking-wide">
                            {t('Votre message', 'Your message')}
                          </label>
                          <textarea
                            rows={4}
                            className="w-full bg-white px-4 py-3 text-sm md:text-[15px] text-ink rounded-[14px] border border-[var(--line)] placeholder:text-[var(--muted)]/70 focus:border-[var(--blue)] focus-visible:outline-none transition-colors"
                            placeholder={t(
                              'Décrivez votre projet, vos besoins, vos délais…',
                              'Tell us about your project, your needs and your timeline…',
                            )}
                            value={form.message}
                            onChange={updateField('message')}
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleBack}
                            data-cursor
                            className="px-5 py-3.5 rounded-full text-[15px] font-semibold text-ink border border-[var(--line)] hover:border-ink/20 inline-flex items-center justify-center gap-2 transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            {t('Retour', 'Back')}
                          </button>
                          <Magnetic className="flex-1">
                            <button
                              type="button"
                              onClick={handleContinue}
                              data-cursor
                              className="cta-iridescent w-full px-7 py-3.5 text-[15px] font-semibold inline-flex items-center justify-center gap-2"
                            >
                              {t('Continuer', 'Continue')}
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </Magnetic>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-5">
                        {submitted ? (
                          <div className="text-center py-8 md:py-12">
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 rounded-full flex items-center justify-center border border-[var(--line)] bg-paper">
                              <CircleCheck className="w-7 h-7 md:w-8 md:h-8 text-[var(--blue)]" />
                            </div>
                            <p className="font-display text-lg md:text-xl font-semibold text-ink max-w-md mx-auto">
                              {t(
                                'Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24h.',
                                'Thank you! Your request has been sent. We will get back to you within 24 hours.',
                              )}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="rounded-[14px] border border-[var(--line)] bg-paper p-5 md:p-6">
                              <h3 className="font-display text-base md:text-lg font-semibold text-ink mb-3">
                                {t('Récapitulatif', 'Summary')}
                              </h3>
                              <dl className="divide-y divide-[var(--line)]">
                                <div className="flex justify-between gap-4 text-sm md:text-[15px] py-2.5">
                                  <dt className="text-[var(--muted)]">{t('Entreprise', 'Company')}</dt>
                                  <dd className="font-semibold text-ink text-right">
                                    {form.entreprise}
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-4 text-sm md:text-[15px] py-2.5">
                                  <dt className="text-[var(--muted)]">{t('Nom complet', 'Full name')}</dt>
                                  <dd className="font-semibold text-ink text-right">{form.nom}</dd>
                                </div>
                                <div className="flex justify-between gap-4 text-sm md:text-[15px] py-2.5">
                                  <dt className="text-[var(--muted)]">Email</dt>
                                  <dd className="font-semibold text-ink text-right break-all">
                                    {form.email}
                                  </dd>
                                </div>
                                <div className="flex justify-between gap-4 text-sm md:text-[15px] py-2.5">
                                  <dt className="text-[var(--muted)]">{t('Téléphone', 'Phone')}</dt>
                                  <dd className="font-semibold text-ink text-right">
                                    {form.telephone}
                                  </dd>
                                </div>
                                {form.structure && (
                                  <div className="flex justify-between gap-4 text-sm md:text-[15px] py-2.5">
                                    <dt className="text-[var(--muted)]">
                                      {t('Type de structure', 'Structure type')}
                                    </dt>
                                    <dd className="font-semibold text-ink text-right">
                                      {structureTypes.find((s) => s.value === form.structure)
                                        ?.label || form.structure}
                                    </dd>
                                  </div>
                                )}
                                {form.dimensions && (
                                  <div className="flex justify-between gap-4 text-sm md:text-[15px] py-2.5">
                                    <dt className="text-[var(--muted)]">
                                      {t('Dimensions / quantité', 'Dimensions / quantity')}
                                    </dt>
                                    <dd className="font-semibold text-ink text-right">
                                      {form.dimensions}
                                    </dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={handleBack}
                                data-cursor
                                className="px-5 py-3.5 rounded-full text-[15px] font-semibold text-ink border border-[var(--line)] hover:border-ink/20 inline-flex items-center justify-center gap-2 transition-colors"
                              >
                                <ArrowLeft className="w-4 h-4" />
                                {t('Retour', 'Back')}
                              </button>
                              <Magnetic className="flex-1">
                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  disabled={sending}
                                  data-cursor
                                  className="cta-iridescent w-full px-7 py-3.5 text-[15px] font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                  {t('Envoyer ma demande', 'Send my request')}
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
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ REVIEWS (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9 md:mb-12">
            <SectionHeader
              light
              kicker={t('Témoignages', 'Testimonials')}
              title={
                <>
                  {t('Ils nous font', 'Trusted by')}
                  <br />
                  {t('confiance', 'our clients')}
                </>
              }
            />
            <Reveal as="div" delay={0.1} className="flex items-center gap-4 md:pb-2">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-display text-xl font-bold text-white ml-1">4.9</span>
              </div>
              <span className="text-sm text-white/55">
                {t('Basé sur', 'Based on')} <strong className="text-white/80">127</strong>{' '}
                {t('avis', 'reviews')}
              </span>
            </Reveal>
          </div>

          {/* Carrousel : un avis à la fois, panneau bleu, flèches préc./suiv. et points */}
          <Reveal className="max-w-2xl mx-auto">
            <div className="relative overflow-hidden" style={{ borderRadius: 22 }}>
              <AnimatePresence mode="wait" custom={reviewDir}>
                <motion.div
                  key={reviewIdx}
                  custom={reviewDir}
                  initial={{ opacity: 0, x: reviewDir >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reviewDir >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.28 }}
                  className="bg-deep border border-white/10"
                  style={{ borderRadius: 22, padding: '22px 22px 20px', color: '#fff' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Quote size={26} color="#9fc6ff" fill="#9fc6ff" style={{ opacity: 0.85 }} />
                    <span
                      className="inline-flex items-center gap-1.5"
                      style={{
                        background: 'rgba(255,255,255,.12)',
                        borderRadius: 9999,
                        padding: '3px 9px 3px 7px',
                        fontSize: '0.66rem',
                        fontWeight: 600,
                      }}
                    >
                      <GoogleG size={12} /> {t('Publié sur Google', 'Posted on Google')}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.55,
                      margin: '0 0 16px',
                      color: '#eaf2ff',
                    }}
                  >
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: review.grad }}
                    >
                      {review.ini}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{review.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#a8c2e6' }}>{review.role}</div>
                    </div>
                    <span className="ml-auto flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                {[-1, 1].map((d) => (
                  <motion.button
                    key={d}
                    type="button"
                    onClick={() => goReview(d)}
                    whileTap={{ scale: 0.9 }}
                    aria-label={d < 0 ? t('Précédent', 'Previous') : t('Suivant', 'Next')}
                    data-cursor
                    className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 text-white hover:border-white/35 transition-colors"
                  >
                    {d < 0 ? (
                      <ChevronLeft size={18} strokeWidth={2.4} />
                    ) : (
                      <ChevronRight size={18} strokeWidth={2.4} />
                    )}
                  </motion.button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => jumpReview(i)}
                    aria-label={t(`Avis ${i + 1}`, `Review ${i + 1}`)}
                    data-cursor
                    className="cursor-pointer"
                    style={{
                      width: i === reviewIdx ? 22 : 8,
                      height: 8,
                      borderRadius: 9999,
                      background: i === reviewIdx ? 'var(--blue-bright)' : 'rgba(255,255,255,0.25)',
                      border: 'none',
                      transition: 'width .25s, background .25s',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ░░ FAQ ░░ */}
      <section className="bg-white border-t border-[var(--line)] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <SectionHeader
            align="center"
            kicker={t('Questions fréquentes', 'Frequently asked questions')}
            className="mb-9 md:mb-12"
            title={t('Tout ce que vous devez savoir', 'Everything you need to know')}
          />
          {/* Accordéon hairline : liste sobre séparée par des filets bleus, chevron qui pivote, ouverture unique */}
          <RevealStagger style={{ borderTop: '1px solid var(--line)' }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.question}
                  variants={staggerChild}
                  style={{ borderBottom: '1px solid var(--line)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    data-cursor
                    className="cursor-pointer w-full flex items-center gap-3.5 text-left"
                    style={{ padding: '16px 2px', background: 'transparent', border: 'none' }}
                  >
                    <span
                      className="font-display flex-1 text-base md:text-[17px] font-semibold"
                      style={{
                        color: isOpen ? 'var(--blue-deep)' : 'var(--ink)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="grid place-items-center flex-shrink-0"
                      style={{
                        width: 26,
                        height: 26,
                        color: isOpen ? 'var(--blue)' : 'var(--muted)',
                      }}
                    >
                      <ChevronDown size={18} strokeWidth={2.2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="c"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          className="leading-relaxed"
                          style={{
                            margin: 0,
                            padding: '0 40px 18px 2px',
                            fontSize: '0.95rem',
                            color: 'var(--muted)',
                          }}
                        >
                          {faq.answer}
                        </p>
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
