import { motion } from 'framer-motion';
import styles from '../comision';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { TitleText, TypingText } from '../comision/CustomTexts';
import { useTranslate } from '@refinedev/core';

import ciudad from '../../assets/ciudad_white.webp'
import comision from '../../assets/creativa_white.webp'
import red from '../../assets/red.webp';
import unesco from '../../assets/unesco.webp';
import NewFeatures from './NewFeatures';


const ServicesCreativa = () => {
  const t = useTranslate()

  const newFeatures = [
    {
      imgUrl: unesco,
      title: t("pages.creative.unesco"),
      subtitle: t("pages.creative.unescoText")
    },
    {
      imgUrl: red,
      title: t("pages.creative.red"),
      subtitle: t("pages.creative.redText")
    },     
  ];

  return (
    <section className={`${styles.paddings} relative bg-gradient-to-b from-[#000] to-[#121212]`}>
      <motion.div
        variants={staggerContainer({ staggerChildren: 0.5, delayChildren: 2 })}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8 mb-20`}
      >
        <motion.div
          variants={fadeIn({ direction: 'right', type: 'tween', delay: 0.2, duration: 1 })}
          className="flex-[0.95] flex justify-center flex-col"
        >
          <div className='flex items-center gap-2'>
            <img src={ciudad} alt="comision" className='w-36 mb-5'/>
            <TypingText title={`| ${t("pages.creative.culture")}`} textStyles="text-left" />
          </div>
          <TitleText title={t("pages.creative.city")} textStyles="text-left" />
          <div className="mt-[48px] flex md:flex-nowrap flex-wrap items-center justify-start lg:gap-[56px] gap-[20px]">
            {newFeatures.map((feature) => (
              <NewFeatures key={feature.title} {...feature} />
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.img
            src={comision}
            alt="comision"
            variants={fadeIn({ direction: 'right', type: 'spring', delay: 0.1, duration: 0.5 })}
            className='w-48 ml-auto mr-auto my-10'
      />
    </section>
  )
}

export default ServicesCreativa;