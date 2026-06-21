import { variants as sizeV } from '../lab/sizeSelectors.jsx';
import { variants as optionV } from '../lab/optionSelectors.jsx';
import { variants as priceV } from '../lab/priceWidgets.jsx';
import { variants as includedV } from '../lab/includedWidgets.jsx';
import { variants as ctaV } from '../lab/ctaButtons.jsx';
import { variants as frameV } from '../lab/imageFrames.jsx';
import { variants as heroV } from '../lab/heroSections.jsx';
import { variants as navV } from '../lab/navbars.jsx';
import { variants as productV } from '../lab/productCards.jsx';
import { variants as featureV } from '../lab/featureCards.jsx';
import { variants as statsV } from '../lab/statsCounters.jsx';
import { variants as testimonialV } from '../lab/testimonials.jsx';
import { variants as faqV } from '../lab/faqWidgets.jsx';
import { variants as footerV } from '../lab/footers.jsx';
import { variants as specV } from '../lab/specWidgets.jsx';
import { variants as useCaseV } from '../lab/useCaseCards.jsx';
import { variants as devisV } from '../lab/devisModals.jsx';
import { variants as mobilierV } from '../lab/mobilierPickers.jsx';
import { variants as trustV } from '../lab/trustStrips.jsx';
import { variants as cookieV } from '../lab/cookieBanners.jsx';
import { variants as ctaBannerV } from '../lab/ctaBanners.jsx';
import { variants as buttonV } from '../lab/buttons.jsx';
import { variants as size2V } from '../lab/sizeSelectors2.jsx';
import { variants as option2V } from '../lab/optionSelectors2.jsx';
import { variants as price2V } from '../lab/priceWidgets2.jsx';
import { variants as frame2V } from '../lab/imageFrames2.jsx';

const groups = [
  { title: 'Section HÉROS', sub: 'haut de page produit / landing', items: heroV },
  { title: 'NAVBAR + menu Produits', sub: 'dropdown centré sous le bouton (survol/focus/clic)', items: navV },
  { title: 'Cartes PRODUIT', sub: 'showcase / catalogue', items: productV },
  { title: 'Cartes ATOUTS / features', sub: 'les 4 atouts', items: featureV },
  { title: 'Compteurs STATS', sub: '20 ans · 2 min · 100% (animés)', items: statsV },
  { title: 'TÉMOIGNAGES / avis Google', sub: 'renforcer la confiance', items: testimonialV },
  { title: 'FAQ / accordéon', sub: 'questions-réponses', items: faqV },
  { title: 'FOOTER', sub: 'bas de page + signature', items: footerV },
  { title: 'Sélecteur de TAILLE', sub: 'lot 1 — single-select + quantité', items: sizeV },
  { title: 'Sélecteur de TAILLE', sub: 'lot 2 — approches alternatives', items: size2V },
  { title: 'Choix des PAROIS / options', sub: 'lot 1 — multi-select + quantité', items: optionV },
  { title: 'Choix des PAROIS / options', sub: 'lot 2 — approches alternatives', items: option2V },
  { title: 'Widget PRIX', sub: 'lot 1 — résumé « Prix HT » + devis', items: priceV },
  { title: 'Widget PRIX', sub: 'lot 2 — approches alternatives', items: price2V },
  { title: 'INCLUS dans le prix de base', sub: '', items: includedV },
  { title: 'Boutons DEVIS vs SUR MESURE', sub: 'doivent être clairement différents', items: ctaV },
  { title: 'BOUTONS génériques', sub: 'primaire / secondaire / ghost', items: buttonV },
  { title: 'Cadre IMAGE produit', sub: 'lot 1 — fondu, sans ombre, sans bord noir', items: frameV },
  { title: 'Cadre IMAGE produit', sub: 'lot 2 — approches alternatives', items: frame2V },
  { title: 'CARACTÉRISTIQUES techniques', sub: 'fiche specs bento', items: specV },
  { title: 'PARFAITE POUR vos événements', sub: 'cartes use-case', items: useCaseV },
  { title: 'Modale DEVIS', sub: 'récap config + formulaire', items: devisV },
  { title: 'Sélecteur MOBILIER', sub: "image qui change selon l'article choisi", items: mobilierV },
  { title: 'Bandeau CONFIANCE / logos', sub: 'Ils nous font confiance', items: trustV },
  { title: 'Bandeau COOKIES', sub: '', items: cookieV },
  { title: 'Bannière CTA finale', sub: 'Prêt à marquer les esprits ?', items: ctaBannerV },
];

export default function Lab() {
  const total = groups.reduce((a, g) => a + (g.items?.length || 0), 0);
  return (
    <div className="min-h-screen" style={{ background: '#eef3fb', color: 'var(--ink)' }}>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-xl font-bold text-ink">Widget Lab · Sport Air Event <span className="text-[var(--blue)]">({total})</span></div>
            <div className="text-sm text-[var(--muted)]">Vote par numéro — dis-moi les <strong>#</strong> que tu préfères et je les implémente dans le site.</div>
          </div>
          <a href="Home" className="text-sm font-semibold text-[var(--blue)] hover:underline">← Retour au site</a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-12 space-y-20">
        {groups.map((g, gi) => (
          <section key={gi}>
            <div className="flex items-baseline gap-3 mb-7 border-b border-[var(--line)] pb-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tightest text-ink">{g.title}</h2>
              {g.sub && <span className="text-sm text-[var(--muted)]">{g.sub}</span>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {(g.items || []).map((v) => {
                const C = v.Component;
                return (
                  <div key={v.n} className="relative rounded-[24px] bg-white border border-[var(--line)] shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[var(--line)] bg-[var(--blue-mist)]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--blue)] text-white font-display font-bold text-lg flex-shrink-0">{v.n}</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-ink text-sm truncate">{v.label}</div>
                          {v.note && <div className="text-xs text-[var(--muted)] truncate">{v.note}</div>}
                        </div>
                      </div>
                      <span className="text-2xl font-display font-bold text-[var(--blue)]/30 flex-shrink-0">#{v.n}</span>
                    </div>
                    <div className="p-5 md:p-6">
                      <C />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <footer className="text-center text-sm text-[var(--muted)] pt-10 border-t border-[var(--line)]">
          Dis-moi simplement les numéros choisis (ex. « 27, 33, 38, 52, 59, 81, 95 ») — je les intègre au site.
        </footer>
      </div>
    </div>
  );
}
