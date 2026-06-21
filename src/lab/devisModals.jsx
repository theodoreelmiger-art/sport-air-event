import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  CircleCheck,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MessageCircle,
  Send,
  FileText,
  Package,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { PRODUCT_NAME, INCLUDED, fmt, EXAMPLE_TOTAL } from './data.js';

/* Shared blue palette — no black anywhere. Text uses a deep blue-ink. */
const BLUE = '#0066cc';
const BLUE_DEEP = '#0052a3';
const BLUE_SOFT = '#e8f1fd';
const BLUE_MIST = '#f3f8ff';
const LINE = '#e4ecf7';
const INK = '#15294a';
const MUTE = '#5b6f8e';

/* The recap rows shown under "Votre configuration". A small, realistic
   summary of a built config so the form has something to quote. */
const CONFIG = [
  { label: 'Produit', value: `${PRODUCT_NAME} 4×4m`, price: 1490 },
  { label: 'Paroi avec porte (zipp central)', value: '×2', price: 380 },
  { label: 'Paroi grande fenêtre', value: '×1', price: 180 },
];

/* =====================================================================
   #77 — Classique
   The canonical quote modal: fixed header bar with title + close, a
   scrollable body holding the "Votre configuration" recap and the
   contact fields, then a sticky-feeling footer with the total and the
   Envoyer button. Submitting flips the body to a confirmation state.
   ===================================================================== */
function V77() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', date: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const total = CONFIG.reduce((s, r) => s + r.price, 0);

  const field = (key, Icon, ph, type = 'text') => (
    <div
      className="flex items-center gap-2.5"
      style={{
        border: `1px solid ${LINE}`,
        background: BLUE_MIST,
        borderRadius: 14,
        padding: '11px 13px',
      }}
    >
      <Icon size={16} color={BLUE} strokeWidth={2.2} className="shrink-0" />
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={ph}
        className="w-full bg-transparent outline-none"
        style={{ fontSize: '0.9rem', color: INK }}
      />
    </div>
  );

  return (
    <div
      style={{
        border: `1px solid ${LINE}`,
        borderRadius: 22,
        overflow: 'hidden',
        background: '#fff',
        color: INK,
      }}
    >
      {/* Fixed header */}
      <div
        className="flex items-center justify-between"
        style={{ background: BLUE_DEEP, padding: '15px 18px' }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,.16)' }}
          >
            <FileText size={17} color="#fff" strokeWidth={2.2} />
          </span>
          <div>
            <div className="font-display" style={{ color: '#fff', fontSize: '1.02rem', lineHeight: 1 }}>
              Demande de devis
            </div>
            <div style={{ color: '#bcd4f4', fontSize: '0.72rem', marginTop: 3 }}>
              Réponse sous 24 h
            </div>
          </div>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          whileHover={{ background: 'rgba(255,255,255,.28)' }}
          className="cursor-pointer flex items-center justify-center"
          style={{ width: 30, height: 30, borderRadius: 9999, background: 'rgba(255,255,255,.16)', color: '#fff' }}
          aria-label="Fermer"
        >
          <X size={16} strokeWidth={2.4} />
        </motion.button>
      </div>

      {/* Scrollable body */}
      <div style={{ maxHeight: 360, overflowY: 'auto', padding: '18px' }}>
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
              style={{ padding: '24px 8px' }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className="inline-flex items-center justify-center mb-3"
                style={{ width: 56, height: 56, borderRadius: 9999, background: BLUE_SOFT, color: BLUE }}
              >
                <Check size={28} strokeWidth={3} />
              </motion.span>
              <h4 className="font-display" style={{ fontSize: '1.2rem', marginBottom: 6 }}>
                Demande envoyée
              </h4>
              <p style={{ fontSize: '0.86rem', color: MUTE, margin: 0 }}>
                Merci {form.nom || ''}, nous revenons vers vous très vite.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Recap */}
              <div className="kicker" style={{ color: BLUE, marginBottom: 8 }}>
                Votre configuration
              </div>
              <div
                style={{ border: `1px solid ${LINE}`, borderRadius: 16, overflow: 'hidden', marginBottom: 18 }}
              >
                {CONFIG.map((r, i) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-3"
                    style={{
                      padding: '10px 13px',
                      borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                      background: i === 0 ? BLUE_MIST : '#fff',
                    }}
                  >
                    <div className="min-w-0">
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: INK }} className="truncate">
                        {r.label}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: MUTE }}>{r.value}</div>
                    </div>
                    <span className="font-display tabular-nums shrink-0" style={{ fontSize: '0.86rem', color: BLUE_DEEP }}>
                      {fmt(r.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fields */}
              <div className="grid gap-2.5">
                {field('nom', User, 'Nom complet')}
                {field('email', Mail, 'Adresse e-mail', 'email')}
                <div className="grid grid-cols-2 gap-2.5">
                  {field('tel', Phone, 'Téléphone', 'tel')}
                  {field('date', Calendar, 'Date événement', 'date')}
                </div>
                <div
                  className="flex gap-2.5"
                  style={{ border: `1px solid ${LINE}`, background: BLUE_MIST, borderRadius: 14, padding: '11px 13px' }}
                >
                  <MessageCircle size={16} color={BLUE} strokeWidth={2.2} className="shrink-0 mt-0.5" />
                  <textarea
                    value={form.msg}
                    onChange={set('msg')}
                    placeholder="Votre message (facultatif)"
                    rows={2}
                    className="w-full bg-transparent outline-none resize-none"
                    style={{ fontSize: '0.9rem', color: INK }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!sent && (
        <div
          className="flex items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${LINE}`, background: '#fff', padding: '13px 18px' }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: MUTE }}>Estimation</div>
            <div className="font-display tabular-nums" style={{ fontSize: '1.15rem', color: BLUE_DEEP, lineHeight: 1 }}>
              {fmt(total)}
            </div>
          </div>
          <motion.button
            type="button"
            onClick={() => setSent(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer inline-flex items-center gap-2 font-display"
            style={{ background: BLUE, color: '#fff', borderRadius: 9999, padding: '12px 22px', fontSize: '0.92rem' }}
          >
            Envoyer la demande
            <Send size={15} strokeWidth={2.4} />
          </motion.button>
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   #78 — Split (recap à gauche / formulaire à droite)
   A two-pane layout: a deep-blue recap rail on the left listing the
   config + total + a few "inclus" reassurances, and the contact form on
   the right. Collapses to a single column under ~420px.
   ===================================================================== */
function V78() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', date: '', msg: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const total = CONFIG.reduce((s, r) => s + r.price, 0);

  const field = (key, Icon, ph, type = 'text') => (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={13} color={BLUE} strokeWidth={2.4} />
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: MUTE, letterSpacing: '.02em' }}>{ph}</span>
      </div>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        className="w-full outline-none"
        style={{
          border: `1px solid ${LINE}`,
          borderRadius: 11,
          padding: '9px 11px',
          fontSize: '0.88rem',
          color: INK,
          background: '#fff',
        }}
        onFocus={(e) => (e.target.style.borderColor = BLUE)}
        onBlur={(e) => (e.target.style.borderColor = LINE)}
      />
    </div>
  );

  return (
    <div
      style={{ border: `1px solid ${LINE}`, borderRadius: 22, overflow: 'hidden', background: '#fff', color: INK }}
    >
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
        <div className="flex flex-wrap" style={{ alignItems: 'stretch' }}>
          {/* Left recap rail */}
          <div
            style={{
              background: BLUE_DEEP,
              color: '#fff',
              padding: '20px 18px',
              flex: '1 1 200px',
              minWidth: 0,
            }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Package size={16} color="#bcd4f4" strokeWidth={2.2} />
              <span style={{ fontSize: '0.74rem', color: '#bcd4f4', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
                Votre configuration
              </span>
            </div>

            <div className="grid gap-2.5 mb-4">
              {CONFIG.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate" style={{ fontSize: '0.84rem', fontWeight: 600 }}>{r.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9fc0ec' }}>{r.value}</div>
                  </div>
                  <span className="font-display tabular-nums shrink-0" style={{ fontSize: '0.82rem', color: '#dbe9fb' }}>
                    {fmt(r.price)}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 12 }}
            >
              <span style={{ fontSize: '0.78rem', color: '#bcd4f4' }}>Total estimé</span>
              <span className="font-display tabular-nums" style={{ fontSize: '1.3rem' }}>{fmt(total)}</span>
            </div>

            <div className="grid gap-1.5 mt-4">
              {INCLUDED.slice(0, 3).map((t) => (
                <div key={t} className="flex items-start gap-2" style={{ fontSize: '0.74rem', color: '#cfe0f7' }}>
                  <Check size={13} strokeWidth={3} color="#9fc0ec" className="shrink-0 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form pane */}
          <div style={{ flex: '2 1 240px', minWidth: 0, padding: '20px 18px' }}>
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                  style={{ minHeight: 220 }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="inline-flex items-center justify-center mb-3"
                    style={{ width: 52, height: 52, borderRadius: 9999, background: BLUE_SOFT, color: BLUE }}
                  >
                    <CircleCheck size={26} strokeWidth={2.4} />
                  </motion.span>
                  <h4 className="font-display" style={{ fontSize: '1.1rem', marginBottom: 4 }}>C'est parti</h4>
                  <p style={{ fontSize: '0.82rem', color: MUTE, margin: 0 }}>
                    Votre demande nous est parvenue.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h4 className="font-display" style={{ fontSize: '1.12rem', marginBottom: 14 }}>
                    Recevez votre devis
                  </h4>
                  <div className="grid gap-3" style={{ maxHeight: 230, overflowY: 'auto', paddingRight: 2 }}>
                    {field('nom', User, 'Nom complet')}
                    {field('email', Mail, 'E-mail', 'email')}
                    {field('tel', Phone, 'Téléphone', 'tel')}
                    {field('date', Calendar, "Date de l'événement", 'date')}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MessageCircle size={13} color={BLUE} strokeWidth={2.4} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: MUTE }}>Message</span>
                      </div>
                      <textarea
                        value={form.msg}
                        onChange={set('msg')}
                        rows={2}
                        className="w-full outline-none resize-none"
                        style={{ border: `1px solid ${LINE}`, borderRadius: 11, padding: '9px 11px', fontSize: '0.88rem', color: INK }}
                        onFocus={(e) => (e.target.style.borderColor = BLUE)}
                        onBlur={(e) => (e.target.style.borderColor = LINE)}
                      />
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setSent(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer w-full inline-flex items-center justify-center gap-2 font-display mt-4"
                    style={{ background: BLUE, color: '#fff', borderRadius: 13, padding: '12px', fontSize: '0.92rem' }}
                  >
                    Envoyer
                    <ArrowRight size={16} strokeWidth={2.4} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   #79 — Stepped (assistant en 3 étapes)
   A wizard: step 1 confirms the config recap, step 2 collects contact
   info, step 3 reviews + sends. A progress rail tracks position;
   back/next buttons drive the flow; the final step shows a confirmation.
   ===================================================================== */
function V79() {
  const STEPS = ['Récap', 'Coordonnées', 'Envoi'];
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', tel: '', date: '', msg: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const total = CONFIG.reduce((s, r) => s + r.price, 0);

  const field = (key, Icon, ph, type = 'text') => (
    <div
      className="flex items-center gap-2.5"
      style={{ border: `1px solid ${LINE}`, background: BLUE_MIST, borderRadius: 13, padding: '10px 12px' }}
    >
      <Icon size={15} color={BLUE} strokeWidth={2.2} className="shrink-0" />
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={ph}
        className="w-full bg-transparent outline-none"
        style={{ fontSize: '0.88rem', color: INK }}
      />
    </div>
  );

  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 22, overflow: 'hidden', background: '#fff', color: INK }}>
      {/* Header + progress */}
      <div style={{ padding: '16px 18px 14px', borderBottom: `1px solid ${LINE}` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="font-display" style={{ fontSize: '1.05rem' }}>Demande de devis</div>
          <span className="font-display tabular-nums" style={{ fontSize: '0.78rem', color: MUTE }}>
            {sent ? STEPS.length : step + 1}/{STEPS.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => {
            const done = sent || i < step;
            const active = !sent && i === step;
            return (
              <div key={s} className="flex-1 flex items-center gap-1.5">
                <div className="flex-1" style={{ height: 4, borderRadius: 9999, background: LINE, overflow: 'hidden' }}>
                  <motion.div
                    initial={false}
                    animate={{ width: done || active ? '100%' : '0%' }}
                    transition={{ duration: 0.35 }}
                    style={{ height: '100%', background: BLUE, borderRadius: 9999 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              style={{
                fontSize: '0.68rem',
                fontWeight: (sent || i <= step) ? 600 : 500,
                color: (sent || i <= step) ? BLUE_DEEP : MUTE,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ minHeight: 220, padding: '18px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center flex flex-col items-center justify-center"
              style={{ minHeight: 184 }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className="inline-flex items-center justify-center mb-3"
                style={{ width: 54, height: 54, borderRadius: 9999, background: BLUE_SOFT, color: BLUE }}
              >
                <Check size={27} strokeWidth={3} />
              </motion.span>
              <h4 className="font-display" style={{ fontSize: '1.15rem', marginBottom: 5 }}>Devis demandé</h4>
              <p style={{ fontSize: '0.84rem', color: MUTE, margin: 0 }}>
                Confirmation envoyée à {form.email || 'votre e-mail'}.
              </p>
            </motion.div>
          ) : step === 0 ? (
            <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <div className="kicker" style={{ color: BLUE, marginBottom: 8 }}>Vérifiez votre configuration</div>
              <div className="grid gap-2">
                {CONFIG.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-3"
                    style={{ border: `1px solid ${LINE}`, borderRadius: 13, padding: '10px 13px', background: BLUE_MIST }}
                  >
                    <div className="min-w-0">
                      <div className="truncate" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{r.label}</div>
                      <div style={{ fontSize: '0.74rem', color: MUTE }}>{r.value}</div>
                    </div>
                    <span className="font-display tabular-nums shrink-0" style={{ fontSize: '0.86rem', color: BLUE_DEEP }}>
                      {fmt(r.price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3" style={{ background: BLUE_SOFT, borderRadius: 13, padding: '11px 14px' }}>
                <span className="inline-flex items-center gap-1.5" style={{ fontSize: '0.78rem', color: BLUE_DEEP, fontWeight: 600 }}>
                  <ShieldCheck size={15} strokeWidth={2.2} /> Total estimé
                </span>
                <span className="font-display tabular-nums" style={{ fontSize: '1.05rem', color: BLUE_DEEP }}>{fmt(total)}</span>
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="grid gap-2.5">
              {field('nom', User, 'Nom complet')}
              {field('email', Mail, 'Adresse e-mail', 'email')}
              <div className="grid grid-cols-2 gap-2.5">
                {field('tel', Phone, 'Téléphone', 'tel')}
                {field('date', Calendar, 'Date', 'date')}
              </div>
            </motion.div>
          ) : (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <div className="kicker" style={{ color: BLUE, marginBottom: 8 }}>Un dernier mot ?</div>
              <div
                className="flex gap-2.5 mb-3"
                style={{ border: `1px solid ${LINE}`, background: BLUE_MIST, borderRadius: 13, padding: '10px 12px' }}
              >
                <MessageCircle size={15} color={BLUE} strokeWidth={2.2} className="shrink-0 mt-0.5" />
                <textarea
                  value={form.msg}
                  onChange={set('msg')}
                  placeholder="Message (facultatif)"
                  rows={2}
                  className="w-full bg-transparent outline-none resize-none"
                  style={{ fontSize: '0.88rem', color: INK }}
                />
              </div>
              <div style={{ border: `1px solid ${LINE}`, borderRadius: 13, padding: '11px 13px' }}>
                <div className="flex items-center justify-between" style={{ fontSize: '0.8rem' }}>
                  <span style={{ color: MUTE }}>Destinataire</span>
                  <span style={{ fontWeight: 600, color: INK }} className="truncate ml-3">{form.nom || '—'}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5" style={{ fontSize: '0.8rem' }}>
                  <span style={{ color: MUTE }}>Total estimé</span>
                  <span className="font-display tabular-nums" style={{ color: BLUE_DEEP }}>{fmt(total)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      {!sent && (
        <div className="flex items-center justify-between gap-3" style={{ borderTop: `1px solid ${LINE}`, padding: '13px 18px' }}>
          <motion.button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            whileTap={step === 0 ? {} : { scale: 0.96 }}
            className="cursor-pointer inline-flex items-center gap-1.5"
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 9999,
              padding: '9px 16px',
              fontSize: '0.85rem',
              color: step === 0 ? '#aebed6' : BLUE_DEEP,
              background: '#fff',
              fontWeight: 600,
              cursor: step === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ArrowLeft size={14} strokeWidth={2.4} /> Retour
          </motion.button>
          {step < STEPS.length - 1 ? (
            <motion.button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer inline-flex items-center gap-2 font-display"
              style={{ background: BLUE, color: '#fff', borderRadius: 9999, padding: '10px 20px', fontSize: '0.9rem' }}
            >
              Continuer <ArrowRight size={15} strokeWidth={2.4} />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={() => setSent(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer inline-flex items-center gap-2 font-display"
              style={{ background: BLUE, color: '#fff', borderRadius: 9999, padding: '10px 20px', fontSize: '0.9rem' }}
            >
              Envoyer <Send size={15} strokeWidth={2.4} />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   #80 — Compact
   A tight, dense card for inline placement: a slim header, a collapsible
   one-line recap that expands to the full breakdown, then stacked
   minimal fields and a single full-width Envoyer button.
   ===================================================================== */
function V80() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', date: '', msg: '' });
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const total = CONFIG.reduce((s, r) => s + r.price, 0);

  const field = (key, ph, type = 'text') => (
    <input
      type={type}
      value={form[key]}
      onChange={set(key)}
      placeholder={ph}
      className="w-full outline-none"
      style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: '9px 11px', fontSize: '0.86rem', color: INK, background: '#fff' }}
      onFocus={(e) => (e.target.style.borderColor = BLUE)}
      onBlur={(e) => (e.target.style.borderColor = LINE)}
    />
  );

  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 18, overflow: 'hidden', background: '#fff', color: INK }}>
      {/* Slim fixed header */}
      <div className="flex items-center justify-between" style={{ background: BLUE_MIST, borderBottom: `1px solid ${LINE}`, padding: '11px 14px' }}>
        <div className="inline-flex items-center gap-2">
          <Sparkles size={15} color={BLUE} strokeWidth={2.2} />
          <span className="font-display" style={{ fontSize: '0.95rem' }}>Devis express</span>
        </div>
        <span className="font-display tabular-nums" style={{ fontSize: '0.92rem', color: BLUE_DEEP }}>{fmt(total)}</span>
      </div>

      <div style={{ padding: '14px' }}>
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
              style={{ background: BLUE_SOFT, borderRadius: 12, padding: '14px' }}
            >
              <span className="inline-flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 9999, background: BLUE, color: '#fff' }}>
                <Check size={19} strokeWidth={3} />
              </span>
              <div>
                <div className="font-display" style={{ fontSize: '0.95rem' }}>Envoyé !</div>
                <div style={{ fontSize: '0.78rem', color: MUTE }}>Réponse sous 24 h.</div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Collapsible recap */}
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="cursor-pointer w-full flex items-center justify-between"
                style={{ border: `1px solid ${LINE}`, borderRadius: 11, padding: '10px 12px', background: '#fff', marginBottom: 10 }}
              >
                <span className="inline-flex items-center gap-2" style={{ fontSize: '0.82rem', fontWeight: 600, color: INK }}>
                  <Package size={15} color={BLUE} strokeWidth={2.2} />
                  Votre configuration
                  <span style={{ fontSize: '0.72rem', color: MUTE, fontWeight: 500 }}>· {CONFIG.length} lignes</span>
                </span>
                <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ color: BLUE }}>
                  <ChevronRight size={16} strokeWidth={2.4} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="recap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="grid gap-1.5" style={{ marginBottom: 10, padding: '2px' }}>
                      {CONFIG.map((r) => (
                        <div key={r.label} className="flex items-center justify-between gap-3" style={{ fontSize: '0.8rem' }}>
                          <span className="truncate" style={{ color: MUTE }}>{r.label} <span style={{ color: '#aebed6' }}>{r.value}</span></span>
                          <span className="font-display tabular-nums shrink-0" style={{ color: BLUE_DEEP }}>{fmt(r.price)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Minimal stacked fields */}
              <div className="grid gap-2">
                {field('nom', 'Nom complet')}
                {field('email', 'E-mail', 'email')}
                <div className="grid grid-cols-2 gap-2">
                  {field('tel', 'Téléphone', 'tel')}
                  {field('date', 'Date', 'date')}
                </div>
                <textarea
                  value={form.msg}
                  onChange={set('msg')}
                  placeholder="Message (facultatif)"
                  rows={2}
                  className="w-full outline-none resize-none"
                  style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: '9px 11px', fontSize: '0.86rem', color: INK }}
                  onFocus={(e) => (e.target.style.borderColor = BLUE)}
                  onBlur={(e) => (e.target.style.borderColor = LINE)}
                />
              </div>

              <motion.button
                type="button"
                onClick={() => setSent(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 font-display mt-3"
                style={{ background: BLUE, color: '#fff', borderRadius: 11, padding: '11px', fontSize: '0.9rem' }}
              >
                Envoyer ma demande <Send size={15} strokeWidth={2.4} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const variants = [
  {
    n: 77,
    label: 'Classique',
    note: 'En-tête fixe, récap configuration, formulaire complet et pied avec total + envoi.',
    Component: V77,
  },
  {
    n: 78,
    label: 'Split',
    note: 'Rail récap bleu profond à gauche, formulaire à droite, repli en une colonne.',
    Component: V78,
  },
  {
    n: 79,
    label: 'Assistant',
    note: 'Parcours en 3 étapes (récap, coordonnées, envoi) avec barre de progression.',
    Component: V79,
  },
  {
    n: 80,
    label: 'Compact',
    note: 'Carte dense : en-tête mince, récap dépliable et champs minimalistes empilés.',
    Component: V80,
  },
];
