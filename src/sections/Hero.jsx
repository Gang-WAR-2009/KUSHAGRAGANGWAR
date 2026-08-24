import { useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useScroll,
} from 'framer-motion';
import { useReducedMotion } from '../animations/useReducedMotion';
import { useIsTouchDevice } from '../animations/useIsTouchDevice';
import { EASE } from '../animations/variants';
import styles from './Hero.module.css';

const NAME = 'GANGWAR';

export default function Hero() {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const interactive = !reducedMotion && !isTouch;

  // ---- Scroll-linked exit (Hero -> About) --------------------------------
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const exitOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0, 0]
  );
  const exitScale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [1, 1.18]
  );
  const exitY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -60]
  );

  // ---- Cursor interaction --------------------------------------------------
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.6 });

  const moveX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

  const glowXPercent = useTransform(springX, [-0.5, 0.5], [32, 68]);
  const glowYPercent = useTransform(springY, [-0.5, 0.5], [24, 56]);
  const glowX = useMotionTemplate`${glowXPercent}%`;
  const glowY = useMotionTemplate`${glowYPercent}%`;

  const handleMouseMove = useCallback(
    (event) => {
      if (!interactive || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [interactive, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Intro"
    >
      <motion.div
        className={styles.glow}
        style={{ '--glow-x': glowX, '--glow-y': glowY }}
        aria-hidden="true"
      />

      <motion.div
        className={styles.eyebrowRow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      >
        <span className="eyebrow">Portfolio</span>
        <span className="eyebrow">2026</span>
      </motion.div>

      <motion.div
        className={styles.titleWrap}
        style={{ opacity: exitOpacity, scale: exitScale, y: exitY }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          style={{ x: moveX, rotateX, rotateY }}
          whileHover={interactive ? { scale: 1.03 } : undefined}
        >
          {NAME}
        </motion.h1>
      </motion.div>

      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
