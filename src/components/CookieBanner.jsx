import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';
import { useT } from '../lib/i18n.jsx';

export default function CookieBanner() {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sae-cookie-consent');
    if (!stored) setShow(true);
  }, []);

  const decide = (value) => {
    localStorage.setItem('sae-cookie-consent', value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cookie-card"
          initial={{ opacity: 0, x: 24, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 24, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[300px] z-[1001] overflow-x-clip rounded-2xl bg-white p-4"
          style={{ border: '1px solid var(--line)', boxShadow: '0 8px 32px rgba(11,28,63,0.12)' }}
        >
          <div className="flex items-start gap-3">
            <span
              className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full"
              style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}
            >
              <Shield size={18} strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <h4 className="font-display text-[0.98rem] font-bold leading-tight" style={{ color: 'var(--ink)' }}>
                {t('Cookies et confidentialité', 'Cookies & privacy')}
              </h4>
            </div>
            <button
              type="button"
              aria-label={t('Fermer', 'Close')}
              onClick={() => decide('refused')}
              className="ml-auto cursor-pointer rounded-full p-1 transition-colors"
              style={{ color: 'var(--ink-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-soft)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <X size={16} strokeWidth={2.4} />
            </button>
          </div>
          <p className="mt-2.5 text-[0.8rem] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            {t(
              'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez notre utilisation des cookies.',
              'We use cookies to enhance your experience on our site. By continuing, you agree to our use of cookies.'
            )}
          </p>
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => decide('refused')}
              className="cursor-pointer rounded-xl py-2 text-[0.82rem] font-semibold transition-colors"
              style={{ border: '1px solid var(--line)', color: 'var(--ink)', background: 'white' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-mist)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
            >
              {t('Refuser', 'Decline')}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => decide('accepted')}
              className="cursor-pointer rounded-xl py-2 text-[0.82rem] font-semibold text-white transition-transform"
              style={{ background: 'var(--blue)' }}
            >
              {t('Accepter', 'Accept')}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
