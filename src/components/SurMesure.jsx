import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Send, CalendarDays, User, Mail, Phone,
  MessageSquare, PencilRuler, Sparkles, CheckCircle2,
} from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild, motion } from '../lib/motion.jsx';
import SectionHeader from './SectionHeader.jsx';
import { useT } from '../lib/i18n.jsx';

/* Shared "sur-mesure" page. No dimension inputs, no option checkboxes — a custom
   project is quote-only: the visitor sends a personalised request (date + the usual
   contact fields, NO quantity) and we get back to them. Same mailto mechanism as the
   Contact page (opens a pre-filled email to contact@sport-air-event.com). */
export default function SurMesure({ product }) {
  const t = useT();
  const { name, image, intro, specs = [], included = [] } = product;

  const [form, setForm] = useState({ nom: '', email: '', telephone: '', date: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildMailto = () => {
    const subject = `${t('Demande de devis sur mesure', 'Custom quote request')} – ${name}`;
    const body = [
      `${t('Produit', 'Product')} : ${name}`,
      `${t('Nom', 'Name')} : ${form.nom}`,
      `Email : ${form.email}`,
      `${t('Téléphone', 'Phone')} : ${form.telephone}`,
      `${t('Date souhaitée', 'Preferred date')} : ${form.date || '—'}`,
      '',
      `${t('Votre projet', 'Your project')} :`,
      form.message || '—',
    ].join('\n');
    return `mailto:contact@sport-air-event.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e) => {
    e.preventDefault();
    window.location.href = buildMailto();
    setSent(true);
  };

  const STEPS = [
    { icon: MessageSquare, title: t('Parlez-nous de votre projet', 'Tell us about your project'), desc: t('Décrivez votre événement, votre marque et vos envies — sans engagement.', 'Describe your event, your brand and your vision — with no commitment.') },
    { icon: PencilRuler, title: t('Conception & maquette 3D', 'Design & 3D mockup'), desc: t('Nos designers créent une maquette 3D personnalisée pour validation.', 'Our designers create a custom 3D mockup for your approval.') },
    { icon: Sparkles, title: t('Fabrication suisse sur mesure', 'Swiss custom manufacturing'), desc: t('Nous fabriquons votre structure unique, livrée prête à l’emploi.', 'We craft your one-of-a-kind structure, delivered ready to use.') },
  ];

  const field = 'w-full bg-white border border-[var(--line)] rounded-[var(--radius)] pl-11 pr-3.5 py-3 text-[15px] text-ink outline-none focus:border-[var(--blue)] transition-colors';

  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ SLIM HERO ░░ */}
      <section className="bg-paper pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-5">
                <span className="h-px w-10" style={{ background: 'var(--blue)' }} />
                <span className="kicker">{t('Création exclusive · Sur mesure', 'Exclusive creation · Custom-made')}</span>
              </Reveal>
              <h1 className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', lineHeight: 1.0 }}>
                {name}
              </h1>
              <Reveal as="p" delay={0.1} y={16} className="lead mt-4 max-w-md">{intro}</Reveal>
              <Reveal as="div" delay={0.18} className="mt-5 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white">
                  <Check className="w-4 h-4" style={{ color: 'var(--blue)' }} />
                  <span className="text-[13px] font-semibold text-ink">{t('Impression totale comprise', 'Full printing included')}</span>
                </span>
                {specs.map((s) => (
                  <span key={s} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-medium"
                    style={{ background: 'var(--blue-mist)', color: 'var(--blue-deep)', border: '1px solid var(--line)' }}>
                    {s}
                  </span>
                ))}
              </Reveal>
              <Reveal delay={0.24} className="mt-7">
                <Magnetic>
                  <a href="#devis" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                    {t('Demander un devis', 'Request a quote')} <ArrowRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={30}>
                <img src={image} alt={name} loading="eager" className="product-render w-full max-h-[340px] object-contain" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ COMMENT ÇA MARCHE (process) ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <SectionHeader
            kicker={t('Comment ça marche', 'How it works')}
            title={t('Un accompagnement sur mesure', 'A bespoke, guided process')}
            lead={t('Du premier échange à la livraison, on conçoit votre structure unique avec vous.', 'From the first conversation to delivery, we design your one-of-a-kind structure with you.')}
          />
          <RevealStagger className="mt-9 grid sm:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <motion.div variants={staggerChild} key={s.title}
                className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-6">
                <span className="inline-flex items-center justify-center rounded-2xl mb-4"
                  style={{ width: 44, height: 44, background: 'var(--blue-soft)', color: 'var(--blue)' }}>
                  <s.icon className="w-5 h-5" strokeWidth={2.2} />
                </span>
                <h3 className="font-display text-lg font-bold text-ink leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{s.desc}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ TOUJOURS INCLUS ░░ */}
      <section className="bg-paper py-12 md:py-16">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <SectionHeader
            kicker={t('Sans supplément', 'No extra cost')}
            title={t('Toujours inclus', 'Always included')}
            lead={t('Chaque création sur mesure comprend, de série, l’essentiel pour un résultat impeccable.', 'Every custom-made creation comes standard with everything needed for a flawless result.')}
          />
          <RevealStagger className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {included.map((item) => (
              <motion.div variants={staggerChild} key={item}
                className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-white border border-[var(--line)] px-5 py-4">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--blue)' }} />
                <span className="text-sm text-ink/80 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ DEMANDE DE DEVIS PERSONNALISÉ ░░ */}
      <section id="devis" className="bg-white border-t border-[var(--line)] py-12 md:py-16 scroll-mt-24">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                kicker={t('Devis personnalisé', 'Personalised quote')}
                title={t('Demandez votre devis', 'Request your quote')}
                lead={t('Un projet sur mesure se chiffre au cas par cas. Laissez-nous vos coordonnées et la date de votre événement — on vous recontacte rapidement.', 'A custom project is priced case by case. Leave us your details and your event date — we’ll get back to you quickly.')}
              />
              <ul className="mt-7 space-y-3">
                <li className="flex items-center gap-3 text-[15px] text-ink/80">
                  <Mail className="w-4 h-4" style={{ color: 'var(--blue)' }} />
                  <a href="mailto:contact@sport-air-event.com" className="hover:text-[var(--blue)] transition-colors">contact@sport-air-event.com</a>
                </li>
                <li className="flex items-center gap-3 text-[15px] text-ink/80">
                  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--blue)' }} />
                  {t('Réponse sous 24 h · Devis sans engagement', 'Reply within 24 h · No-obligation quote')}
                </li>
                <li className="flex items-center gap-3 text-[15px] text-ink/80">
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--blue)' }} />
                  {t('Conception suisse · Maquette 3D offerte', 'Swiss design · Free 3D mockup')}
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <Reveal y={24}>
                {sent ? (
                  <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-8 text-center">
                    <span className="inline-flex items-center justify-center rounded-full mb-4"
                      style={{ width: 56, height: 56, background: 'var(--blue-soft)', color: 'var(--blue)' }}>
                      <CheckCircle2 className="w-7 h-7" strokeWidth={2.2} />
                    </span>
                    <h3 className="font-display text-2xl font-bold text-ink">{t('Votre demande est prête !', 'Your request is ready!')}</h3>
                    <p className="mt-2 text-[var(--ink-2)] max-w-sm mx-auto">
                      {t('Votre logiciel de messagerie s’est ouvert avec votre demande pré-remplie. Envoyez-la et nous vous recontactons rapidement.', 'Your email app opened with your request pre-filled. Send it and we’ll get back to you shortly.')}
                    </p>
                    <button type="button" onClick={() => setSent(false)}
                      className="mt-5 inline-flex items-center gap-2 text-[var(--blue)] font-semibold hover:underline">
                      {t('Modifier ma demande', 'Edit my request')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-paper p-6 md:p-8 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                        <input required type="text" value={form.nom} onChange={set('nom')} placeholder={t('Nom complet', 'Full name')} className={field} />
                      </div>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                        <input type="tel" value={form.telephone} onChange={set('telephone')} placeholder={t('Téléphone', 'Phone')} className={field} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                        <input required type="email" value={form.email} onChange={set('email')} placeholder="Email" className={field} />
                      </div>
                      <div className="relative">
                        <CalendarDays className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted)' }} />
                        <input type="date" value={form.date} onChange={set('date')} aria-label={t('Date souhaitée', 'Preferred date')} className={field} />
                      </div>
                    </div>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 absolute left-4 top-4" style={{ color: 'var(--muted)' }} />
                      <textarea rows={4} value={form.message} onChange={set('message')}
                        placeholder={t('Décrivez votre projet sur mesure…', 'Describe your custom project…')}
                        className={`${field} pt-3 resize-none`} />
                    </div>
                    <Magnetic>
                      <button type="submit" className="cta-iridescent w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                        <Send className="w-4 h-4" /> {t('Demander un devis', 'Request a quote')}
                      </button>
                    </Magnetic>
                    <p className="text-center text-[12px] text-[var(--muted)]">
                      {t('En envoyant, votre messagerie s’ouvre avec votre demande pré-remplie.', 'On send, your email app opens with your request pre-filled.')}
                    </p>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
