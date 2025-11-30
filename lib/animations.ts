import {Variants, Transition} from 'framer-motion'

// Premium easing curve - smooth and elegant
const premiumEase = [0.22, 1, 0.36, 1] as const

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

// Fade up with blur - premium reveal effect
export const fadeUpBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: premiumEase,
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

// Premium stagger container - slower, more elegant
export const staggerContainerPremium: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

// Premium stagger item with blur
export const staggerItemPremium: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: premiumEase,
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

// Premium hover with lift effect
export const hoverLift = {
  y: -8,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
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

// Scale reveal - items that scale up as they appear
export const scaleReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
}

// Text reveal with 3D rotation effect
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -80,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
}

// Card hover animation preset
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(212, 175, 55, 0.1)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

// Image zoom effect for product cards
export const imageZoom: Variants = {
  rest: {
    scale: 1,
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.1,
    filter: 'brightness(1.1)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Slide up from bottom (for modals, drawers)
export const slideUp: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Fade overlay for modals
export const fadeOverlay: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {duration: 0.3},
  },
  exit: {
    opacity: 0,
    transition: {duration: 0.2},
  },
}

// Spring configuration presets
export const springConfig = {
  smooth: {type: 'spring', stiffness: 100, damping: 30} as Transition,
  snappy: {type: 'spring', stiffness: 300, damping: 30} as Transition,
  bouncy: {type: 'spring', stiffness: 200, damping: 15} as Transition,
  gentle: {type: 'spring', stiffness: 80, damping: 20} as Transition,
}

// Parallax effect helper - returns transform values based on scroll
export const getParallaxY = (scrollY: number, speed: number = 0.5) => ({
  y: scrollY * speed,
})

// Staggered character animation for text
export const characterAnimation = {
  hidden: {opacity: 0, y: 50, rotateX: -90},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.03,
      ease: premiumEase,
    },
  }),
}

// Button tap animation
export const buttonTap = {
  scale: 0.98,
  transition: {duration: 0.1},
}

// Notification slide in
export const notificationSlide: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}
