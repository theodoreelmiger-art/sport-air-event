import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { LOGO, PRODUCT_LINKS } from '../data/site.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [deskProd, setDeskProd] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setProdOpen(false);
    setDeskProd(false);
  }, [location.pathname]);

  const isActive = (p) => location.pathname === p;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 16,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'calc(100% - 48px)',
          maxWidth: 1100,
          zIndex: 1000,
          borderRadius: 9999,
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: 'rgba(0, 0, 0, 0.08) 0px 8px 32px',
        }}
      >
        <div style={{ flexShrink: 0, width: 120 }}>
          <Link className="flex items-center" to="/Home">
            <img src={LOGO} alt="SPORT AIR EVENT" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-1 flex-1">
          <Link
            className={`px-3 py-2 text-[13px] font-medium rounded-full transition-colors ${
              isActive('/Home') ? 'text-[#1a56db] bg-blue-50' : 'text-gray-700 hover:text-[#1a56db] hover:bg-gray-50'
            }`}
            to="/Home"
          >
            Accueil
          </Link>

          <div className="nav-item relative">
            <button
              onClick={() => setDeskProd((v) => !v)}
              className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-full transition-colors text-gray-700 hover:text-[#1a56db] hover:bg-gray-50"
            >
              Produits
              <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${deskProd ? 'rotate-180' : ''}`} />
            </button>
            <div
              className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 py-2"
              style={{
                borderRadius: 20,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 32px',
                ...(deskProd ? { opacity: 1, visibility: 'visible', transform: 'translateX(-50%) translateY(0)' } : {}),
              }}
            >
              {PRODUCT_LINKS.map((p) => (
                <Link
                  key={p.to}
                  className="block px-5 py-2.5 text-sm transition-colors rounded-lg mx-1 text-gray-700 hover:bg-gray-50 hover:text-[#1a56db]"
                  to={p.to}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            className={({ isActive }) =>
              `px-3 py-2 text-[13px] font-medium rounded-full transition-colors ${
                isActive ? 'text-[#1a56db] bg-blue-50' : 'text-gray-700 hover:text-[#1a56db] hover:bg-gray-50'
              }`
            }
            to="/About"
          >
            À propos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `px-3 py-2 text-[13px] font-medium rounded-full transition-colors ${
                isActive ? 'text-[#1a56db] bg-blue-50' : 'text-gray-700 hover:text-[#1a56db] hover:bg-gray-50'
              }`
            }
            to="/Contact"
          >
            Contact
          </NavLink>
        </nav>

        <div className="hidden lg:flex items-center justify-end gap-2 flex-shrink-0">
          <button
            className="flex items-center gap-1.5 px-3 py-2 font-medium text-gray-600 hover:text-[#1a56db] rounded-full hover:bg-gray-50 transition-colors"
            style={{ fontSize: 13 }}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>FR</span>
          </button>
          <Link
            className="cta-iridescent inline-flex items-center text-white font-semibold rounded-full transition-all hover:scale-[1.02]"
            to="/Contact"
            style={{ fontSize: 13, padding: '8px 16px' }}
          >
            Demander un devis
          </Link>
        </div>

        <button
          className="lg:hidden flex items-center justify-center text-gray-900"
          aria-label="Menu"
          style={{ width: 44, height: 44, borderRadius: '50%' }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[999]"
          style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen gap-1 px-8 text-center">
            <Link to="/Home" className="py-3 text-lg font-medium text-gray-900">
              Accueil
            </Link>
            <button
              className="py-3 text-lg font-medium text-gray-900 flex items-center gap-1"
              onClick={() => setProdOpen((v) => !v)}
            >
              Produits <ChevronDown className={`w-4 h-4 transition-transform ${prodOpen ? 'rotate-180' : ''}`} />
            </button>
            {prodOpen &&
              PRODUCT_LINKS.map((p) => (
                <Link key={p.to} to={p.to} className="py-2 text-base text-gray-600">
                  {p.label}
                </Link>
              ))}
            <Link to="/About" className="py-3 text-lg font-medium text-gray-900">
              À propos
            </Link>
            <Link to="/Contact" className="py-3 text-lg font-medium text-gray-900">
              Contact
            </Link>
            <Link
              to="/Contact"
              className="cta-iridescent mt-4 inline-flex items-center text-white font-semibold rounded-full px-6 py-3"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
