import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CookieBanner from './CookieBanner.jsx';
import ChatWidget from './ChatWidget.jsx';
import { ScrollProgress, PageTransition } from '../lib/interactions.jsx';
import { PAGE_TITLES, DEFAULT_TITLE, PAGE_DESCRIPTIONS, DEFAULT_DESCRIPTION } from '../lib/seo.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const title = PAGE_TITLES[pathname] || DEFAULT_TITLE;
    const desc = PAGE_DESCRIPTIONS[pathname] || DEFAULT_DESCRIPTION;
    document.title = title;

    // Crée l'élément <head> s'il n'existe pas, puis met à jour son attribut.
    const upsert = (selector, make, attr, value) => {
      let el = document.head.querySelector(selector);
      if (!el) { el = make(); document.head.appendChild(el); }
      el.setAttribute(attr, value);
    };
    const metaName = (n) => () => { const m = document.createElement('meta'); m.setAttribute('name', n); return m; };
    const metaProp = (p) => () => { const m = document.createElement('meta'); m.setAttribute('property', p); return m; };

    // URL canonique par page (auto-référencée : vercel.app aujourd'hui, le domaine custom ensuite).
    const canon = window.location.origin + (pathname === '/Home' ? '/' : pathname);

    upsert('meta[name="description"]', metaName('description'), 'content', desc);
    upsert('link[rel="canonical"]', () => { const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); return l; }, 'href', canon);
    upsert('meta[property="og:url"]', metaProp('og:url'), 'content', canon);
    upsert('meta[property="og:title"]', metaProp('og:title'), 'content', title);
    upsert('meta[property="og:description"]', metaProp('og:description'), 'content', desc);
    upsert('meta[name="twitter:title"]', metaName('twitter:title'), 'content', title);
    upsert('meta[name="twitter:description"]', metaName('twitter:description'), 'content', desc);
  }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollProgress />
      <PageTransition />
      {/* Curseur système normal (curseur personnalisé retiré à la demande du client) */}
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
    </>
  );
}
