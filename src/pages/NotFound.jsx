import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';

const links = [
  { to: '/Home', label: 'Accueil', desc: 'Retour à la page principale' },
  { to: '/Tente', label: 'Tente Spider', desc: 'Notre produit phare' },
  { to: '/ArchesGonflables', label: 'Arches Gonflables', desc: 'Impact visuel immédiat' },
  { to: '/Contact', label: 'Contact', desc: 'Obtenir un devis' },
];

export default function NotFound() {
  const { pathname } = useLocation();
  const pageName = pathname.replace(/^\//, '') || 'Home';

  return (
    <div className="overflow-x-clip bg-deep text-white">
      <section className="relative min-h-screen flex items-center">
        {/* oversized editorial 404 watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 bottom-0 font-display font-bold leading-none text-white/[0.04]"
          style={{ fontSize: 'clamp(16rem,42vw,40rem)', letterSpacing: '-0.05em' }}
        >
          404
        </span>

        <div className="relative z-10 w-full max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-24 md:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
                <span className="text-xs font-semibold tabular-nums text-white/40">—</span>
                <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.3)' }} />
                <span className="kicker" style={{ color: '#7db4f0' }}>Erreur 404</span>
              </Reveal>

              <h1
                className="font-display font-bold tracking-tightest text-white"
                style={{ fontSize: 'clamp(2.6rem,6.5vw,5.4rem)', lineHeight: 0.96 }}
              >
                Cette page s&apos;est<br />
                <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>envolée.</span>
              </h1>

              <Reveal as="p" delay={0.1} y={18} className="lead mt-7 max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
                The page &quot;{pageName}&quot; could not be found in this application.
              </Reveal>

              <Reveal as="div" delay={0.2} className="mt-9 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <Link
                    to="/Home"
                    className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                    style={{ background: '#fff', color: 'var(--ink)', borderColor: '#fff' }}
                  >
                    Go Home <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Link
                  to="/Contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  Nous contacter
                </Link>
              </Reveal>
            </div>

            {/* quick navigation — flat, hairline-separated rows */}
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal as="p" delay={0.15} className="kicker mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Pages populaires
              </Reveal>
              <RevealStagger className="border-t border-white/10">
                {links.map((l, i) => (
                  <motion.div key={l.to} variants={staggerChild} className="border-b border-white/10">
                    <Link to={l.to} className="group flex items-center justify-between gap-4 py-5">
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-semibold tabular-nums text-white/25">0{i + 1}</span>
                        <div>
                          <div className="font-display text-[17px] font-semibold text-white group-hover:text-[#7db4f0] transition-colors">
                            {l.label}
                          </div>
                          <div className="text-[13px] text-white/45">{l.desc}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-white/40 group-hover:text-[#7db4f0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </RevealStagger>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
