import { Reveal } from '../lib/motion.jsx';

/**
 * Editorial section intro: small tracked kicker + large display heading + lead.
 * Signature pattern reused across the site for a confident, non-generic rhythm.
 */
export default function SectionHeader({
  kicker, title, lead, align = 'left', index, className = '', titleClassName = '', light = false,
}) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : align === 'right' ? 'text-right items-end ml-auto' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${alignCls} max-w-2xl ${className}`}>
      {kicker && (
        <Reveal as="div" y={14} className={`flex items-center gap-3 mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8" style={{ background: light ? 'rgba(255,255,255,0.3)' : 'var(--blue)' }} />
          <span className="kicker" style={light ? { color: '#7db4f0' } : undefined}>{kicker}</span>
        </Reveal>
      )}
      <Reveal as="h2" y={26} delay={0.05}
        className={`font-display font-bold leading-[1.02] tracking-tightest ${light ? 'text-white' : 'text-ink'} text-[clamp(1.9rem,4.4vw,3.4rem)] ${titleClassName}`}>
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" y={20} delay={0.12} className={`lead mt-5 ${light ? 'text-white/70' : ''}`} style={light ? { color: 'rgba(255,255,255,0.72)' } : undefined}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}
