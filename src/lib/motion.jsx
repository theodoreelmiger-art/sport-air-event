import { motion } from 'framer-motion';

/**
 * Faithful reproduction of the site's scroll-reveal system.
 * Original used `.reveal { opacity:0; translateY(24px) } -> visible` plus
 * framer-motion whileInView fade-ups (duration ~0.6s, y 20-40, staggered delays).
 */

export function Reveal({ children, y = 30, delay = 0, duration = 0.6, className = '', as = 'div', once = true, ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function RevealStagger({ children, className = '', once = true, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
