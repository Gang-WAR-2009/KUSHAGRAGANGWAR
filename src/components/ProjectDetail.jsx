import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectImage from './ProjectImage.jsx';
import { EASE, fadeUp, staggerContainer } from '../animations/variants.js';
import styles from './ProjectDetail.module.css';

// The exact required order: What I Built -> Why I Built It -> Challenges.
// GitHub Repository and Go Back are rendered separately below since they're
// actions, not read content.
function buildSections(project) {
  return [
    { heading: 'What I Built', content: project.description },
    { heading: 'Why I Built It', content: project.whyBuilt },
    { heading: 'Challenges', content: project.challenges },
  ];
}

export default function ProjectDetail({ project, index, onClose }) {
  const closeRef = useRef(null);
  const sections = buildSections(project);

  // Lock background scroll while the overlay is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Escape closes the overlay.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Move focus into the overlay on open.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <motion.button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Close project details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className={styles.panel}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close project details"
        >
          &times;
        </button>

        <div className={styles.imageBox}>
          <ProjectImage
            project={project}
            index={index}
            layoutId={`project-frame-${project.id}`}
          />
        </div>

        <motion.div
          className={styles.body}
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          animate="show"
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            {project.category}
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>
            {project.title}
          </motion.h2>

          {sections.map((section) => (
            <motion.div key={section.heading} className={styles.contentBlock} variants={fadeUp}>
              <h3 className={styles.sectionHeading}>{section.heading}</h3>
              <p className={styles.sectionText}>{section.content}</p>
            </motion.div>
          ))}

          <motion.div className={styles.actions} variants={fadeUp}>
            <a
              className={styles.githubButton}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} repository on GitHub (opens in a new tab)`}
            >
              View GitHub Repository
              <span aria-hidden="true">&rarr;</span>
            </a>

            <button type="button" className={styles.goBack} onClick={onClose}>
              <span aria-hidden="true">&larr;</span>
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
