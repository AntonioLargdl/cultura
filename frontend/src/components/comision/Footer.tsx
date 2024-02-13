import { motion } from 'framer-motion';
import morelia from '../../assets/morelia_white.webp'
import styles from '.';
import { footerVariants } from '../../utils/motion';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { IoMail } from 'react-icons/io5';
import { GrInstagram } from 'react-icons/gr';
import { FaFacebookF } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useTranslate } from '@refinedev/core';

export const socials = [
    {
      name: 'mail',
      icon: <IoMail className='text-2xl'/> ,
      link: 'mailto:comision.filmica@morelia.gob.mx'
    },
    {
      name: 'location',
      icon: <FaLocationDot className='text-2xl'/> ,
      link: 'https://maps.app.goo.gl/PGan9bQv8Fzrqh6b7'
    },
    {
      name: 'facebook',
      icon: <FaFacebookF className='text-2xl'/>,
      link: 'https://facebook.com/SeCulturaMorelia'
    },
    {
      name: 'instagram',
      icon: <GrInstagram className='text-2xl'/>,
      link: 'https://www.instagram.com/secretariaculturademorelia/'
    },
];

const Footer = () => {
  const t = useTranslate()

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative overflow-hidden bg-[#121212]`}
    >
      <div className="footer-gradient" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <h4 className="font-semibold md:text-[34px] text-[24px] text-white">
          {t("pages.comision.footer.title")}
          </h4>
          <a href={`${socials[0].link}`} rel="noopener noreferrer" className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px] hover:bg-purple-700">
            <MdOutlineConnectWithoutContact className="text-2xl"/>
            <span className="font-normal text-[16px] text-white">
              {t("pages.comision.footer.contact")}
            </span>
          </a>
        </div>
        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="font-extrabold text-[24px] text-white">
              <img src={morelia} alt="comision" className='w-24 mb-5'/>
            </h4>
            <p className="font-normal text-[14px] text-white opacity-50">
              {t("pages.comision.footer.copy")}
            </p>

            <div className="flex gap-4">
              {socials.map((social) => (
                <a href={social.link} target="_blank" rel="noreferrer" key={social.name}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer;