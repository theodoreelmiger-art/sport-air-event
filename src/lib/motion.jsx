import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Choreographed scroll reveal. Supports directional offsets + optional blur.
 * Backwards-compatible with the previous API ({ y, delay, duration, className, as }).
 */
export function Reveal({
  children, y = 28, x = 0, delay = 0, duration = 0.7, blur = false,
  className = '', as = 'div', once = true, amount = 0.25, ...rest
}) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  );
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealStagger({ children, className = '', once = true, amount = 0.15, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word display reveal for hero headlines. */
export function WordsReveal({ text, className = '', delay = 0, stagger = 0.05, y = '0.9em' }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

/** Cursor-following magnetic wrapper for buttons / interactive accents. */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Dramatic clip-path "curtain" reveal — content wipes up into view (useInView + animate, reliable). */
export function ClipReveal({ children, className = '', duration = 0.9, delay = 0, amount = 0.25, scaleFrom = 1.12 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div initial={{ scale: scaleFrom }} animate={inView ? { scale: 1 } : { scale: scaleFrom }} transition={{ duration: duration + 0.3, delay, ease: EASE }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Cinematic fade + slide + blur lift. Stronger than Reveal. */
export function Rise({ children, y = 60, delay = 0, duration = 0.9, className = '', as = 'div', once = true, amount = 0.25, ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M className={className}
      initial={{ opacity: 0, y, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}>
      {children}
    </M>
  );
}

/** Per-word mask reveal for big headlines (cinematic, useInView + animate). */
export function MaskHeading({ text, className = '', delay = 0, stagger = 0.06 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            animate={inView ? { y: 0 } : { y: '115%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export { motion, useMotionValue, useSpring, useTransform };
