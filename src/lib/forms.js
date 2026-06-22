/* Envoi des formulaires (Contact + devis sur-mesure) via Web3Forms.
 *
 * Les messages arrivent sur l'adresse liée à la clé Web3Forms — soit
 * contact@sport-air-event.com (c'est l'email saisi en créant la clé gratuite
 * sur https://web3forms.com).
 *
 * Pour activer l'envoi réel, renseigne la clé :
 *   - soit via la variable d'environnement Vercel  VITE_WEB3FORMS_KEY
 *   - soit en remplaçant '' ci-dessous par ta clé (la clé Web3Forms est publique
 *     par design, aucun risque à la mettre dans le code).
 *
 * Tant qu'aucune clé n'est configurée, les formulaires basculent automatiquement
 * sur un mailto pré-rempli (ouverture du logiciel mail du visiteur).
 */
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '9bb37168-b79f-4ae3-b320-ad43ff2cfd6f';

/* Envoie via Web3Forms si une clé existe. Renvoie true si l'envoi a abouti,
 * false sinon (le caller bascule alors sur le mailto). */
export async function sendViaWeb3Forms(fields) {
  if (!WEB3FORMS_KEY) return false;
  try {
    // FormData (méthode officielle Web3Forms) → requête "simple", pas de preflight CORS.
    const fd = new FormData();
    fd.append('access_key', WEB3FORMS_KEY);
    Object.entries(fields).forEach(([k, v]) => fd.append(k, v == null ? '' : v));
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.success !== false;
  } catch {
    return false;
  }
}
