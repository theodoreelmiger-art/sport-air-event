import { variants as imageV } from '../lab/imageVariants.jsx';

export default function LabImages() {
  return (
    <div className="min-h-screen" style={{ background: '#eef3fb', color: 'var(--ink)' }}>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-xl font-bold text-ink">Image Lab · Sport Air Event <span className="text-[var(--blue)]">({imageV.length})</span></div>
            <div className="text-sm text-[var(--muted)]">Vote pour la présentation des images — environnements, cadrage, cotes. Donne-moi les <strong>#</strong>.</div>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href="lab" className="text-[var(--blue)] hover:underline">Widgets →</a>
            <a href="Home" className="text-[var(--blue)] hover:underline">← Site</a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="mb-8 p-5 rounded-2xl bg-white border border-[var(--line)] text-sm text-ink/80">
          🖼️ Ici tu peux mettre la structure dans de <strong>vrais environnements</strong> (prairie, ville, stade, salon, terrain), afficher les <strong>cotes directement sur la photo</strong>, et tester différents cadrages — tous fondus, sans bords carrés ni ombre de rectangle. <strong>#127</strong> et <strong>#128</strong> sont interactifs.
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {imageV.map((v) => {
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
                <div className="p-5 md:p-6"><C /></div>
              </div>
            );
          })}
        </div>
        <footer className="text-center text-sm text-[var(--muted)] pt-10 mt-10 border-t border-[var(--line)]">
          Dis-moi les numéros d'images préférés (ex. « 127, 128, 122 ») et je les applique au site.
        </footer>
      </div>
    </div>
  );
}
