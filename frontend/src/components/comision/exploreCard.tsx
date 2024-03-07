'use client';
import { motion } from 'framer-motion';
import styles from '.';
import { fadeIn } from '../../utils/motion';

import cultura from '../../assets/morelia_white.webp'

interface ExploreCardProps {
    id: string;
    imgUrl: string;
    title: string;
    index: number;
    active: string;
    text:string
    handleClick: (id: string) => void;
    link: string;
  }

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick, link, text}: ExploreCardProps) => (
  <motion.div
    variants={fadeIn({ direction: 'right', type: 'spring', delay: index * 0.5, duration: 0.75 })}
    className={`relative ${
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[200px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
        <a href={link} target="_blank" rel="noreferrer">
        <div
          className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] mb-[16px]`}
        >
          <img
            src={cultura}
            alt="logo"
            className="w-24 h-24 object-contain"
          />
        </div>
        <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">
          {text}
        </p>
        <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
          {title}
        </h2>
        </a>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;