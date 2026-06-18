import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-[1001]"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 20,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '20px',
          }}
        >
          <h4 className="font-semibold text-[#0a0a0a] mb-2 text-sm">Cookies et confidentialité</h4>
          <p className="text-gray-600 text-xs leading-relaxed mb-4">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez notre
            utilisation des cookies.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => decide('accepted')}
              className="flex-1 bg-[#1a56db] text-white text-sm font-semibold rounded-full py-2.5 hover:bg-[#1240a8] transition-colors"
            >
              Accepter
            </button>
            <button
              onClick={() => decide('refused')}
              className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full py-2.5 hover:bg-gray-200 transition-colors"
            >
              Refuser
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
