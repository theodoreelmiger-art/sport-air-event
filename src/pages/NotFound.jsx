import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import { useT } from '../lib/i18n.jsx';

const makeLinks = (t) => [
  { to: '/Home', label: t('Accueil', 'Home'), desc: t('Retour à la page principale', 'Back to the main page') },
  { to: '/Tente', label: t('Tente Spider', 'Spider Tent'), desc: t('Notre produit phare', 'Our flagship product') },
  { to: '/ArchesGonflables', label: t('Arches Gonflables', 'Inflatable Arches'), desc: t('Impact visuel immédiat', 'Immediate visual impact') },
  { to: '/Contact', label: t('Contact', 'Contact'), desc: t('Obtenir un devis', 'Get a quote') },
];

export default function NotFound() {
  const t = useT();
  const { pathname } = useLocation();
  const pageName = pathname.replace(/^\//, '') || 'Home';
  const links = makeLinks(t);

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
                <span className="kicker" style={{ color: '#7db4f0' }}>{t('Erreur 404', 'Error 404')}</span>
              </Reveal>

              <h1
                className="font-display font-bold tracking-tightest text-white"
                style={{ fontSize: 'clamp(2.6rem,6.5vw,5.4rem)', lineHeight: 0.96 }}
              >
                {t('Cette page s’est', 'This page has')}<br />
                <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>{t('envolée.', 'flown away.')}</span>
              </h1>

              <Reveal as="p" delay={0.1} y={18} className="lead mt-7 max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t(`La page « ${pageName} » est introuvable sur ce site.`, `The page “${pageName}” could not be found on this site.`)}
              </Reveal>

              <Reveal as="div" delay={0.2} className="mt-9 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <Link
                    to="/Home"
                    className="cta-iridescent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold"
                    style={{ background: '#fff', color: 'var(--ink)', borderColor: '#fff' }}
                  >
                    {t('Retour à l’accueil', 'Back home')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Link
                  to="/Contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  {t('Nous contacter', 'Contact us')}
                </Link>
              </Reveal>
            </div>

            {/* quick navigation — flat, hairline-separated rows */}
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal as="p" delay={0.15} className="kicker mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {t('Pages populaires', 'Popular pages')}
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
