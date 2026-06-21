import { variants as sizeV } from '../lab/sizeSelectors.jsx';
import { variants as optionV } from '../lab/optionSelectors.jsx';
import { variants as priceV } from '../lab/priceWidgets.jsx';
import { variants as includedV } from '../lab/includedWidgets.jsx';
import { variants as ctaV } from '../lab/ctaButtons.jsx';
import { variants as frameV } from '../lab/imageFrames.jsx';

const groups = [
  { title: 'Sélecteur de TAILLE', sub: 'single-select + quantité sur le choisi', items: sizeV },
  { title: 'Choix des PAROIS / options', sub: 'multi-select + quantité sur le choisi', items: optionV },
  { title: 'Widget PRIX', sub: 'résumé « Prix HT » + bouton devis', items: priceV },
  { title: 'INCLUS dans le prix de base', sub: '', items: includedV },
  { title: 'Boutons DEVIS vs SUR MESURE', sub: 'doivent être clairement différents', items: ctaV },
  { title: 'Cadre IMAGE produit', sub: 'fondu, sans ombre, sans bord noir', items: frameV },
];

export default function Lab() {
  return (
    <div className="min-h-screen" style={{ background: '#eef3fb', color: 'var(--ink)' }}>
      {/* header */}
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-xl font-bold text-ink">Widget Lab · Sport Air Event</div>
            <div className="text-sm text-[var(--muted)]">Vote par numéro — dis-moi les <strong>#</strong> que tu préfères et je les implémente dans le site.</div>
          </div>
          <a href="Home" className="text-sm font-semibold text-[var(--blue)] hover:underline">← Retour au site</a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-12 space-y-20">
        {groups.map((g) => (
          <section key={g.title}>
            <div className="flex items-baseline gap-3 mb-7 border-b border-[var(--line)] pb-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tightest text-ink">{g.title}</h2>
              {g.sub && <span className="text-sm text-[var(--muted)]">{g.sub}</span>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {g.items.map((v) => {
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
          Dis-moi simplement les numéros choisis (ex. « 2, 9, 11, 16, 19, 23 ») — je les intègre au site et je règle ensuite le reste (mobilier avec images, footer, FAQ, témoignages, mobile…).
        </footer>
      </div>
    </div>
  );
}
