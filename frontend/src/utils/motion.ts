import { Transition } from 'framer-motion';
import { Variants } from 'framer-motion';

export const navVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 140,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: 1,
      },
    },
};
  
interface SlideInProps {
    direction: 'left' | 'right' | 'up' | 'down';
    type: string;
    delay: number;
    duration: number;
}

export const slideIn = ({ direction, type, delay, duration }: SlideInProps): Transition => ({
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
});
  
interface StaggerContainerProps {
staggerChildren: number;
delayChildren: number;
}
  
export const staggerContainer = ({ staggerChildren, delayChildren }: StaggerContainerProps): Variants => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
});

interface TextVariantProps {
    delay: number;
}

export const textVariant = ({ delay }: TextVariantProps): Transition => ({
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
});
  
export const textContainer = {
    hidden: {
      opacity: 0,
    },
    show: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
    }),
};
  
export const textVariant2 = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeIn',
      },
    },
};
  
interface FadeInOptions {
    direction: string;
    type: string;
    delay: number;
    duration: number;
}
  
  
export const fadeIn = ({ direction, type, delay, duration }: FadeInOptions): Variants => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
});
  
interface PlanetVariantsProps {
    direction: 'left' | 'right';
  }
  
export const planetVariants = ({ direction }: PlanetVariantsProps): Variants => ({
    hidden: {
      x: direction === 'left' ? '-100%' : '100%',
      rotate: 120,
    },
    show: {
      x: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        duration: 1.8,
        delay: 0.5,
      },
    },
});
  
interface ZoomInProps {
    delay: number;
    duration: number;
  }
  
export const zoomIn = ({ delay, duration }: ZoomInProps): Transition => ({
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut',
      },
    },
});
  
export const footerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 140,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: 0.5,
      },
    },
};  