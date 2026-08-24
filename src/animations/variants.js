// ============================================================================
// SHARED MOTION VARIANTS
// ----------------------------------------------------------------------------
// One motion language for the whole site. Sections import these instead of
// hand-rolling their own durations/easings, so everything feels consistent.
// ============================================================================

export const EASE = [0.16, 1, 0.3, 1]; // ease-out-expo — smooth, decisive settle

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay },
  }),
};

/** Applies a staggered reveal to direct motion children. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const viewportOnce = { once: true, margin: '-15% 0px -15% 0px' };
