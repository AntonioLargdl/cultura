import { motion } from 'framer-motion';
import styles from '.';
import { fadeIn, planetVariants, staggerContainer } from '../../utils/motion';
import { TitleText, TypingText } from './CustomTexts';
import StartSteps from './StartSteps';
import palomitas from '../../assets/palomitas.webp'
import morelia from '../../assets/morelia_white.webp'
import { useTranslate } from '@refinedev/core';

const Info = () => {
  const t = useTranslate()

  const startingFeatures = [
    t("pages.comision.do.description1"),
    t("pages.comision.do.description2"),
    t("pages.comision.do.description3"),
  ];
  return (
    <section className={`${styles.paddings} background-cfm relative min-h-screen flex flex-wrap overflow-hidden`}>
      <div className="gradient-04 z-0" />
      <motion.div
        variants={staggerContainer({ staggerChildren: 0.5, delayChildren: 2 })}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8 z-10`}
      >
        <motion.div
          variants={planetVariants({ direction: 'left' })}
          className={`flex-1 ${styles.flexCenter}`}
        >
          <img
            src={palomitas}
            alt="palomitas"
            className="w-[90%] h-[90%] object-contain"
          />
        </motion.div>
        <motion.div
          variants={fadeIn({ direction: 'left', type: 'tween', delay: 0.2, duration: 1 })}
          className="flex justify-center flex-col"
        >
          <div className='flex items-center gap-2'>
            <img src={morelia} alt="morelia" className='w-20 mb-5'/>
            <TypingText title={t("pages.comision.do.subtitle")} textStyles="text-left"/>
          </div>
          <TitleText title={`${t("pages.comision.do.title")}`} textStyles="text-left" />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
            {startingFeatures.map((feature, index) => (
              <StartSteps
                key={feature}
                number={`${index < 10 ? '0' : ''} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Info;