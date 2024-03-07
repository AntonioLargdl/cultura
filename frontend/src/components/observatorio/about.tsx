import { motion } from 'framer-motion';
import arrow from '../../assets/arrow-down.svg'
import comision from '../../assets/ciudad_white.webp'
import styles from '../comision';
import { TypingText } from '../comision/CustomTexts';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { useTranslate } from '@refinedev/core';

const AboutObservatorio = () => {
  const t = useTranslate();
  return (
    <section className={`${styles.paddings} background-cfm min-h-screen flex relative`}>
      <div className="gradient-02 z-0" />
      <div className='z-10'>
        <motion.div
          variants={staggerContainer({ staggerChildren: 0.5, delayChildren: 2 })}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
        >
        <motion.img
            src={comision}
            alt="comision"
            variants={fadeIn({ direction: 'right', type: 'spring', delay: 0.1, duration: 0.5 })}
            className='w-48 ml-auto mr-auto mb-10'
        />
          <TypingText title={`| ${t("pages.creative.city")}`} textStyles="text-center" />
          <motion.p
            variants={fadeIn({ direction: 'up', type: 'tween', delay: 0.2, duration: 1 })}
            className="mt-[20px] font-extralight sm:text-[32px] text-[20px] text-center text-secondary-white"
          >
            {t("pages.observatory.about")}
            <br /><br />
          </motion.p>
          <motion.img
            variants={fadeIn({ direction: 'up', type: 'tween', delay: 0.3, duration: 1 })}
            src={arrow}
            alt="arrow down"
            className="w-[18px] h-[28px] object-contain mt-[28px]"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutObservatorio;
