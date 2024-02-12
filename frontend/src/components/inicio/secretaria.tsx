import { FaInstagram } from 'react-icons/fa'
import fatima from '../../assets/fatima.webp'
import { useTranslate } from '@refinedev/core'

const Secretaria = () => {
  // Translation
  const translate = useTranslate()

  return (
    <div className='my-10 mt-10 lg:p-8 lg:px-32 p-4 overflow-hidden md:flex md:gap-14 md:justify-center md:items-center'>
        <img src={fatima} alt="secretaria" className='rounded-full shadow-2xl md:block ml-16 md:ml-0 md:w-96 '/>
        <div className='flex flex-col items-start'>
            <h2 className='text-2xl uppercase tracking-wider font-semibold mt-5'>Fátima Chávez Alcaraz</h2>
            <h3 className='mt-2 text-lg font-medium text-[#8657b6] uppercase'>{translate("pages.landing.position")}</h3>
            <h4 className='mt-2 text-lg'>{translate("pages.landing.grade")}</h4>
            <p className='text-lg font-extralight mt-2 leading-8'>{translate("pages.landing.abstract")}</p>
            <a href="https://www.instagram.com/fatima.chavezal" target='_blank' rel='noreferrer' className='border-[1px] p-4 rounded-2xl flex items-center justify-center mt-2'>
              <FaInstagram className='text-3xl text-[#8657b6]'/>
            </a>
        </div>
    </div>
  )
}

export default Secretaria