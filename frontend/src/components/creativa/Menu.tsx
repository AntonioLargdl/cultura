import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../comision';
import { fadeIn, staggerContainer } from '../../utils/motion';
import ExploreCard from '../comision/exploreCard';
import { SubtitleText, TitleText, TypingText } from '../comision/CustomTexts';

import solo from '../../assets/solistas.webp'
import group from '../../assets/grupos.webp'
import comision from '../../assets/creativa_white.webp'
import { useTranslate } from '@refinedev/core';
import { IoMdLogIn } from 'react-icons/io';
import { RiSurveyLine } from 'react-icons/ri';

const MenuCreativa = () => {
  const [active, setActive] = useState('world-2');
  const t = useTranslate()

  const menuList = [
    {
        id: 'MORELIA-1',
        imgUrl: solo,
        text: t("pages.creative.soloText"),
        title: t("pages.creative.solo"),
        link: '/creativa/talento',
    },
    {
        id: 'MORELIA-2',
        imgUrl: group,
        text: t("pages.creative.groupText"),
        title: t("pages.creative.group"),
        link: '/creativa/talento',
    },
  ]

  return (
    <section className={`${styles.paddings} background-cfm mt-10`} id="explore">
      <motion.div
        variants={staggerContainer({ staggerChildren: 0.5, delayChildren: 2 })}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <motion.img
          src={comision}
          alt="comision"
          variants={fadeIn({ direction: 'right', type: 'spring', delay: 0.1, duration: 0.5 })}
          className='w-32 ml-auto mr-auto mb-10'
        />
        <TypingText title={`| ${t("pages.creative.city")}`} textStyles="text-center" />
        <TitleText
          title={t("pages.comision.menu.h1")}
          textStyles="text-center"
        />
        <SubtitleText
          title={t("pages.creative.nav")}
          textStyles="text-center"
        />
        <div className='my-12 flex gap-4 md:justify-between justify-center flex-wrap'>
          <a href="https://forms.gle/5qyMYykvBGEhHwuTA" target='_blank' rel='noreferrer' className='flex gap-2 items-center px-6 py-4 border-[1px] rounded-xl hover:bg-white duration-300 hover:text-black'>
            <IoMdLogIn className='text-xl'/>
            <p className='text-lg'>{t("pages.creative.register")}</p>
          </a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfqHDdUwqzhM0H65yKqvxA6_ilmW1pZaiObIBBVhESHpsr_HA/viewform?usp=send_form" target='_blank' rel='noreferrer' className='flex gap-2 items-center px-6 py-4 border-[1px] rounded-xl hover:bg-white duration-300 hover:text-black'>
            <RiSurveyLine className='text-xl'/>
            <p className='text-lg'>{t("pages.creative.opinion")}</p>
          </a>
        </div>
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {menuList.map((menu, index) => (
            <ExploreCard
              key={menu.id}
              {...menu}
              index={index}
              active={active}
              handleClick={setActive}
              link={menu.link}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MenuCreativa;