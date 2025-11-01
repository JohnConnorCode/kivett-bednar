import {Variants} from 'framer-motion'

// Fade in animation
export const fadeIn: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger item animation
export const staggerItem: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Scale on hover
export const scaleOnHover = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: 'easeInOut',
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {opacity: 0, x: -30},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: {opacity: 0, x: 30},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}
