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
    document.title = PAGE_TITLES[pathname] || DEFAULT_TITLE;
    const desc = PAGE_DESCRIPTIONS[pathname] || DEFAULT_DESCRIPTION;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
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
