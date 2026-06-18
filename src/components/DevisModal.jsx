import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, User, Mail, Phone, Calendar, Send, MessageCircle } from 'lucide-react';

/**
 * Animated "Demande de devis" modal — faithful reproduction of the original product-page modal.
 * Opens over the product configurator with a "Votre configuration" recap + quote form.
 *
 * Props:
 *  - open, onClose
 *  - productName: string ("Arche Gonflable", "Tente Spider", ...)
 *  - groupLabel: "Tailles" | "Hauteurs" | null   (null for Sur Mesure pages with no size config)
 *  - lines: [{ label, qty, unit }]   selected sizes/heights
 *  - extras: [{ label, qty, unit }]  selected options/accessories
 *  - total: number | null
 */
export default function DevisModal({ open, onClose, productName, groupLabel = null, lines = [], extras = [], total = null }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', date: '', description: '' });
  const f = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const cfg = [
      `Produit : ${productName}`,
      ...(groupLabel ? lines.map((l) => `- ${l.label} × ${l.qty} = ${l.unit * l.qty}€`) : []),
      ...extras.map((x) => `- ${x.label} × ${x.qty} = ${x.unit * x.qty}€`),
      total != null ? `Prix total : ${total}€` : '',
    ].filter(Boolean).join('\n');
    const body = [
      'Votre configuration :', cfg, '',
      `Prénom et nom : ${form.nom}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.telephone}`,
      `Date du projet : ${form.date || '—'}`,
      '', 'Description :', form.description || '—',
    ].join('\n');
    window.location.href = `mailto:contact@sport-air-event.com?subject=${encodeURIComponent(
      'Demande de devis – ' + productName
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
            style={{ borderRadius: 28 }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] -mx-6 md:-mx-8 -mt-6 md:-mt-8 px-6 md:px-8 pt-8 pb-6 mb-6" style={{ borderRadius: '28px 28px 0 0' }}>
                <h2 className="text-2xl font-extrabold text-white">Demande de devis</h2>
                <p className="text-blue-100 text-sm mt-1">Réponse garantie sous 24h</p>
              </div>

              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Merci !</h3>
                  <p className="text-gray-600 text-sm">
                    Votre demande a bien été préparée. Nous vous répondons sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                    <h3 className="flex items-center gap-2 font-bold text-[#0066CC] mb-2 text-sm">
                      <Sparkles className="w-4 h-4" />
                      Votre configuration
                    </h3>
                    <div className="text-sm text-gray-700 space-y-0.5">
                      <div>
                        <strong>Produit :</strong> {productName}
                      </div>
                      {groupLabel && lines.length > 0 && (
                        <div>
                          <strong>{groupLabel} :</strong>
                          {lines.map((l, i) => (
                            <div key={i}>
                              - {l.label} × {l.qty} = {l.unit * l.qty}€
                            </div>
                          ))}
                        </div>
                      )}
                      {extras.length > 0 && (
                        <div>
                          <strong>Options :</strong>
                          {extras.map((x, i) => (
                            <div key={i}>
                              - {x.label} × {x.qty} = {x.unit * x.qty}€
                            </div>
                          ))}
                        </div>
                      )}
                      {total != null && (
                        <div className="font-bold text-[#0066CC] pt-1">Prix total : {total}€</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-green-500" /> Design 3D gratuit inclus
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-green-500" /> Impression totale comprise
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom et nom *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input required value={form.nom} onChange={f('nom')} placeholder="Votre nom" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" required value={form.email} onChange={f('email')} placeholder="email@exemple.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="tel" required value={form.telephone} onChange={f('telephone')} placeholder="06 XX XX XX XX" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date du projet</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input value={form.date} onChange={f('date')} placeholder="Ex: 15 juin 2026" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description du projet</label>
                      <textarea value={form.description} onChange={f('description')} placeholder="Décrivez votre projet..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0066CC] focus:ring-2 focus:ring-blue-100 outline-none text-sm resize-none" />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-6 flex items-center justify-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold rounded-full py-3 transition-colors">
                    <Send className="w-4 h-4" />
                    Envoyer
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-4">Ou alors nous contacter :</p>
                  <div className="flex items-center justify-center gap-4 mt-2 text-sm">
                    <a href="mailto:contact@sport-air-event.com" className="text-[#0066CC] hover:underline">
                      contact@sport-air-event.com
                    </a>
                    <a href="https://wa.me/41774835190" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-600 hover:underline">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
