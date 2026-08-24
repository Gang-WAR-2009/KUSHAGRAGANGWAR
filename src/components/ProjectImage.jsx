import { motion } from 'framer-motion';
import styles from './ProjectImage.module.css';

const BORDER_DEFAULT = 'rgba(244, 243, 239, 0.1)';
const BORDER_STRONG = 'rgba(244, 243, 239, 0.22)';

/**
 * Renders a project image with a graceful placeholder underneath — if the
 * image file hasn't been added to /public/images yet, this shows a subtle
 * numbered placeholder instead of a broken image icon.
 *
 * Pass the same `layoutId` from a tile and its detail view to get a
 * connected "morph" transition between them (see PROJECT IMAGE TRANSITIONS).
 *
 * `hovered` and `parallaxX`/`parallaxY` are optional — omit them for static
 * contexts like the project detail view.
 */
export default function ProjectImage({
  project,
  layoutId,
  className = '',
  index,
  hovered = false,
  parallaxX = 0,
  parallaxY = 0,
}) {
  return (
    <motion.div
      layoutId={layoutId}
      className={`${styles.frame} ${className}`}
      animate={{ borderColor: hovered ? BORDER_STRONG : BORDER_DEFAULT }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className={styles.fallback} aria-hidden="true">
        {String(index ?? project.id).padStart(2, '0')}
      </div>
      <motion.img
        src={project.image}
        alt=""
        loading="lazy"
        className={styles.img}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{ x: parallaxX, y: parallaxY }}
        onError={(event) => {
          event.currentTarget.style.opacity = '0';
        }}
      />
    </motion.div>
  );
}
