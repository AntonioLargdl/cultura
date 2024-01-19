import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../../utils/motion';

interface TypingProps {
    title: string,
    textStyles: string
}

export const TypingText = ({ title, textStyles }:TypingProps) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
    initial="hidden"
    whileInView="show"
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }:TypingProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[54px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);

export const SubtitleText = ({ title, textStyles }:TypingProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-medium md:text-[32px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);