import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '.';
import { fadeIn, staggerContainer } from '../../utils/motion';
import ExploreCard from './exploreCard';
import { SubtitleText, TitleText, TypingText } from './CustomTexts';

import locacion from '../../assets/loc.webp'
import talento from '../../assets/dir.webp'
import crew from '../../assets/crew.webp'
import comision from '../../assets/comision_white.webp'
import convocatoria from '../../assets/convocatoria-seccion-talento.pdf'
import { useTranslate } from '@refinedev/core';
import { IoMdLogIn } from 'react-icons/io';
import { IoDocumentOutline } from 'react-icons/io5';

const MenuLanding = () => {
  const [active, setActive] = useState('world-2');
  const t = useTranslate()

  const menuList = [
    {
        id: 'MORELIA-1',
        imgUrl: locacion,
        title: t("pages.comision.menu.buttons.locations"),
        text: t("pages.comision.menu.description.locations"),
        link: '/cfm/locaciones',
    },
    {
        id: 'MORELIA-2',
        imgUrl: talento,
        title: t("pages.comision.menu.buttons.talent"),
        text: t("pages.comision.menu.description.talent"),
        link: '/cfm/directorio',
    },
    {
        id: 'MORELIA-3',
        imgUrl: crew,
        title: t("pages.comision.menu.buttons.crew"),
        text: t("pages.comision.menu.description.crew"),
        link: '/cfm/directorio',
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
          className='w-48 ml-auto mr-auto mb-10'
        />
        <TypingText title={`| ${t("pages.comision.menu.title")}`} textStyles="text-center" />
        <TitleText
          title={t("pages.comision.menu.h1")}
          textStyles="text-center"
        />
        <SubtitleText
          title={t("pages.comision.menu.h2")}
          textStyles="text-center"
        />
        <div className='my-12 flex gap-4 justify-center flex-wrap'>
          <a href="mailto:comision.filmica@morelia.gob.mx?subject=Solicitud de registro de talento" className='flex gap-2 items-center px-6 py-4 border-[1px] rounded-xl hover:bg-white duration-300 hover:text-black'>
            <IoMdLogIn className='text-xl'/>
            <p className='text-lg'>{t("pages.creative.register")}</p>
          </a>
          {/* TODO: Texto Temporal */}
          <a href={convocatoria} target='_blank' rel='nonreferrer' className='flex gap-2 items-center px-6 py-4 border-[1px] rounded-xl hover:bg-white duration-300 hover:text-black'>
            <IoDocumentOutline className='text-xl'/>
            <p className='text-lg'>{t("pages.temporal.cfm")}</p>
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

export default MenuLanding;