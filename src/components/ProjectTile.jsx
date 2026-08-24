import { useCallback, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProjectImage from './ProjectImage.jsx';
import { useReducedMotion } from '../animations/useReducedMotion.js';
import { useIsTouchDevice } from '../animations/useIsTouchDevice.js';
import { fadeUp } from '../animations/variants.js';
import styles from './ProjectTile.module.css';

export default function ProjectTile({ project, index, ratio, onOpen }) {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const interactive = !reducedMotion && !isTouch;

  const tileRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.4 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback(
    (event) => {
      if (!interactive || !tileRef.current) return;
      const rect = tileRef.current.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [interactive, rawX, rawY]
  );

  const resetTilt = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div className={styles.entrance} variants={fadeUp} custom={0.05}>
      <button
        ref={tileRef}
        type="button"
        className={styles.tile}
        style={{ '--tile-ratio': ratio }}
        onClick={(event) => onOpen(project, event)}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHovered(false);
          resetTilt();
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-haspopup="dialog"
      >
        <div className={styles.imageBox}>
          <ProjectImage
            project={project}
            index={index + 1}
            layoutId={`project-frame-${project.id}`}
            hovered={hovered}
            parallaxX={interactive ? parallaxX : 0}
            parallaxY={interactive ? parallaxY : 0}
          />
        </div>

        <div className={styles.meta}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.category}</span>
        </div>

        <h3 className={styles.title}>
          {project.title}
          <span className={styles.arrow} aria-hidden="true">
            &rarr;
          </span>
        </h3>
      </button>
    </motion.div>
  );
}
