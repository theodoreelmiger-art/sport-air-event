import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CookieBanner from './CookieBanner.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
