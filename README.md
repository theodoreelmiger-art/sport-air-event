# Sport Air Event — site recréé

Reproduction fidèle en **code source réel** (React + Vite) du site Sport Air Event,
initialement construit sur base44. Tout le contenu, les photos, la mise en page et les
animations ont été recréés à l'identique. Site créé par SwitzerWeb.

## Lancer le site

```bash
npm install
npm run dev      # → http://localhost:5173
```

Build de production :

```bash
npm run build    # → dossier dist/
npm run preview  # prévisualiser le build
```

## Stack

- **Vite** + **React 18** + **React Router** (18 pages)
- **Tailwind CSS** (mêmes tokens que l'original : primary `#1a56db`, Inter)
- **framer-motion** (animations de scroll-reveal, hover, marquee logos)
- **lucide-react** (icônes)

## Structure

```
index.html                 # <head> SEO (title, meta, schema.org)
public/images/             # 23 visuels téléchargés en local
src/
  index.css                # tokens :root + CSS custom (cta-iridescent, nav-dropdown, marquee)
  App.jsx                  # routeur (toutes les routes)
  components/
    Layout.jsx             # enveloppe globale
    Header.jsx             # nav pilule glassmorphique + dropdown Produits + menu mobile
    Footer.jsx             # pied de page
    CookieBanner.jsx       # bandeau cookies
  lib/motion.jsx           # composants Reveal / RevealStagger (scroll animations)
  data/site.js             # navigation, produits, logos partenaires, contact
  pages/                   # 18 pages reconstruites
```

## Pages (routes)

`/Home` · `/About` · `/Contact` · `/ModernProducts` · `/Products` · `/Tente` ·
`/TenteSurMesure` · `/SpiderTent` · `/ArchesGonflables` · `/ArchesSurMesure` ·
`/ColonnesGonflables` · `/ColonnesSurMesure` · `/Mobilier` · `/Customization` ·
`/Process` · `/Quality` · `/cgv` · `/guide-structures-gonflables`

## Notes

- Le badge éditeur « base44 » de la plateforme d'origine n'a pas été repris (il ne fait
  pas partie du site lui-même).
- Le dossier `_recon/` contient les captures d'analyse (DOM, screenshots, scripts de
  vérification) et peut être supprimé.
