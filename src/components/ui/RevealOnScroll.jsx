import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function RevealOnScroll({ children, className = '' }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  React.useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={{
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
    }} className={className}>
      {children}
    </motion.div>
  );
}
