import { motion } from 'framer-motion';
import morelia from '../../assets/morelia_white.webp'
import logoBlack from '../../assets/morelia.webp'
import logoWhite from '../../assets/morelia_white.webp'
import styles from '../comision';
import { footerVariants } from '../../utils/motion';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { IoMail } from 'react-icons/io5';
import { GrInstagram } from 'react-icons/gr';
import { FaFacebookF } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useTranslate } from '@refinedev/core';
import { useTheme } from '@mui/material';

export const socials = [
    {
      name: 'mail',
      icon: <IoMail className='text-2xl'/> ,
      link: 'mailto:cultura@morelia.gob.mx'
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

const FooterInicio = () => {
  const t = useTranslate()

  const theme = useTheme();
  const logo = theme.palette.mode === 'light' ? logoBlack : logoWhite;

  return (
    <footer
      className={`${styles.xPaddings} py-8 relative overflow-hidden`}
    >
      <div className="footer-gradient-2" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <a href={`${socials[0].link}`} rel="noopener noreferrer" className="flex items-center h-fit py-4 px-6 bg-[#8657b6] rounded-[32px] gap-[12px] hover:bg-purple-700">
            <MdOutlineConnectWithoutContact className='text-2xl text-white'/>
            <span className="font-normal text-[16px] text-white">
              {t("pages.comision.footer.contact")}
            </span>
          </a>
        </div>
        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="font-extrabold text-[24px] text-white">
              <img src={logo} alt="comision" className='w-24 mb-5'/>
            </h4>
            <p className="font-normal text-[14px] opacity-50">
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
    </footer>
  )
}

export default FooterInicio;