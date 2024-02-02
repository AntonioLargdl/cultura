import { IconBaseProps, IconContext, IconType } from 'react-icons';
import styles from '../comision';
import { ReactElement } from 'react';

interface FeaturesProps {
    imgUrl:  string, 
    title: string,
    subtitle: string
}

const NewFeatures = ({ imgUrl, title, subtitle }: FeaturesProps) => (
  <div className="flex flex-col">
    <div className={`${styles.flexCenter} mb-5`} >
      <img src={imgUrl } alt={title} className='w-72'/>
    </div>
    <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] text-white">
      {title}
    </h1>
    <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]">
      {subtitle}
    </p>
  </div>
);

export default NewFeatures;