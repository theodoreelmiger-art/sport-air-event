import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useInView, useTransform } from 'framer-motion';

/* ── Page transition: a sleek blue panel reveal on every route change ── */
export function PageTransition() {
  const { pathname } = useLocation();
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="fixed inset-0 z-[1300] pointer-events-none bg-deep flex items-center justify-center"
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: 0.05 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: [0, 1, 0], y: 0 }}
          transition={{ duration: 0.55, times: [0, 0.4, 1] }}
          className="font-display text-white/90 font-bold tracking-tightest text-2xl"
        >
          Sport Air Event
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Custom cursor: a fast dot + a lagging ring that grows over interactive elements ── */
export function CustomCursor() {
  const dotX = useMotionValue(-100); const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 750, damping: 32, mass: 0.35 });
  const ringY = useSpring(dotY, { stiffness: 750, damping: 32, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e) => { dotX.set(e.clientX); dotY.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      setHover(!!(t.closest && t.closest('a, button, [data-cursor], input, textarea, select, label')));
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [dotX, dotY]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
      <motion.div className={`cursor-ring ${hover ? 'is-hover' : ''}`} style={{ x: ringX, y: ringY }} />
    </>
  );
}

/* ── Top scroll-progress bar ── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ── Count-up number, triggered on view ── */
export function Counter({ to, duration = 1.6, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVal(to); return; }
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className={className}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

/* ── Mouse-reactive blue glow layer (for hero backgrounds) ── */
export function MouseGlow({ className = '', color = 'rgba(31,122,224,0.45)', size = 560 }) {
  const x = useMotionValue(0.5); const y = useMotionValue(0.4);
  const sx = useSpring(x, { stiffness: 50, damping: 20 });
  const sy = useSpring(y, { stiffness: 50, damping: 20 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener('mousemove', move, { passive: true });
    return () => el.removeEventListener('mousemove', move);
  }, [x, y]);
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        style={{
          position: 'absolute', left, top, width: size, height: size, borderRadius: '9999px',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          translateX: '-50%', translateY: '-50%', filter: 'blur(30px)',
        }}
      />
    </div>
  );
}
