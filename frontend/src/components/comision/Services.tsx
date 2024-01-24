import { motion } from 'framer-motion';
import styles from '.';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { SubtitleText, TitleText, TypingText } from './CustomTexts';
import ciudad from '../../assets/ciudad_white.webp'
import comision from '../../assets/comision.webp'
import NewFeatures from './NewFeatures';
import {GoLaw} from 'react-icons/go'
import { GrMapLocation } from 'react-icons/gr';
import { ImFileOpenoffice } from 'react-icons/im';
import { AiOutlineSafety } from 'react-icons/ai';
import { useTranslate } from '@refinedev/core';

const Services = () => {
  const t = useTranslate()

  const newFeatures = [
    {
      imgUrl: <GoLaw className='text-2xl'/>,
      title: t("pages.comision.services.subtitle1"),
      subtitle: t("pages.comision.services.text1"),
    },
    {
      imgUrl: <GrMapLocation className='text-2xl'/>,
      title: t("pages.comision.services.subtitle2"),
      subtitle: t("pages.comision.services.text2"),
    },  
    {
        imgUrl: <ImFileOpenoffice className='text-2xl'/>,
        title: t("pages.comision.services.subtitle3"),
        subtitle: t("pages.comision.services.text3"),
    },     
    {
        imgUrl: <AiOutlineSafety className='text-2xl'/>,
        title: t("pages.comision.services.subtitle4"),
        subtitle: t("pages.comision.services.text4"),
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
            <TypingText title={`| ${t("pages.comision.do.subtitle")}`} textStyles="text-left" />
          </div>
          <TitleText title={t("pages.comision.services.title")} textStyles="text-left" />
          <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
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

export default Services;