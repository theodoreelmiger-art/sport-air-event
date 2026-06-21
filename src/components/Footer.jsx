import { Link } from 'react-router-dom';
import { LOGO, CONTACT, FOOTER_NAV, FOOTER_PRODUCTS } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="bg-deep">
      <div className="text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center sm:text-left">
            <div className="sm:col-span-2 lg:col-span-1">
              <img src={LOGO} alt="SPORT AIR EVENT" className="h-16 w-auto object-contain mb-4 brightness-0 invert opacity-90" />
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Structures gonflables événementielles premium. Conception Suisse 🇨🇭
              </p>
              <a href={`mailto:${CONTACT.email}`} className="text-slate-400 hover:text-white text-sm transition-colors">
                {CONTACT.email}
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-5 text-slate-400">Navigation</h4>
              <ul className="space-y-3">
                {FOOTER_NAV.map((l) => (
                  <li key={l.to}>
                    <Link className="text-slate-300 hover:text-white transition-colors text-sm" to={l.to}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-5 text-slate-400">Produits</h4>
              <ul className="space-y-3">
                {FOOTER_PRODUCTS.map((l) => (
                  <li key={l.to}>
                    <Link className="text-slate-300 hover:text-white transition-colors text-sm" to={l.to}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-5 text-slate-400">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li className="text-slate-500 text-xs">Suisse 🇨🇭</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-500 text-xs">© 2026 SPORT AIR EVENT. Tous droits réservés.</p>
            <Link className="text-slate-500 hover:text-slate-300 text-xs transition-colors" to="/cgv">
              Conditions Générales de Vente
            </Link>
            <a
              href="https://switzerweb.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[#1a56db] text-xs transition-colors"
            >
              Site créé par <span className="font-semibold">SwitzerWeb</span>
            </a>
            <div className="text-slate-500 text-xs">Conception Suisse · Conception Suisse 🇨🇭</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
