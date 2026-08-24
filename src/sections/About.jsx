import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import { fadeUp, staggerContainer, viewportOnce } from '../animations/variants';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-label="About">
      <motion.div
        className="section-inner"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.span className="eyebrow" variants={fadeUp}>
          About
        </motion.span>

        <div className={styles.grid}>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            About Me
          </motion.h2>

          <div className={styles.copy}>
            {siteConfig.about.map((paragraph, index) => (
              <motion.p
                key={index}
                className={styles.paragraph}
                variants={fadeUp}
                custom={index * 0.05}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
