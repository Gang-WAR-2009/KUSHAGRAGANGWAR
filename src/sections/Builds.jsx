import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/projects.js';
import ProjectTile from '../components/ProjectTile.jsx';
import ProjectDetail from '../components/ProjectDetail.jsx';
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants.js';
import styles from './Builds.module.css';

// Aspect ratios per grid position — keeps the mosaic from feeling like a
// uniform card grid. Falls back to 4:3 if there are ever more than five.
const RATIOS = ['4 / 3', '3 / 4', '4 / 5', '4 / 3', '21 / 9'];

export default function Builds() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const triggerRef = useRef(null);

  const handleOpen = (project, index, event) => {
    triggerRef.current = event?.currentTarget ?? null;
    setActiveProject(project);
    setActiveIndex(index);
  };

  const handleClose = () => {
    setActiveProject(null);
    triggerRef.current?.focus();
  };

  return (
    <section id="builds" className={`section ${styles.builds}`} aria-label="Builds">
      <motion.div
        className="section-inner"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className={styles.header}>
          <motion.span className="eyebrow" variants={fadeUp}>
            Builds
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Builds
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectTile
              key={project.id}
              project={project}
              index={index}
              ratio={RATIOS[index] ?? '4 / 3'}
              onOpen={(p, event) => handleOpen(p, index, event)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            key={activeProject.id}
            project={activeProject}
            index={activeIndex + 1}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
