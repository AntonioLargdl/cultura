import { Link } from 'react-router-dom';
import creativa from '../../assets/bg-creativa.webp';
import comision from '../../assets/bg-comision.webp';
import logoBlack from '../../assets/morelia.webp';
import logoWhite from '../../assets/morelia_white.webp';
import cityBlack from '../../assets/ciudad.webp';
import cityWhite from '../../assets/ciudad_white.webp';
import morelia from '../../assets/brilla.webp'
import ayuntamiento from '../../assets/ayuntamiento.webp'
import { useTheme } from '@mui/material';

const ButtonsPages = () => {
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
  const city = theme.palette.mode === 'dark' ? cityWhite : cityBlack;

  return (
    <div className='my-10 mt-24 lg:p-8 p-4'>
      <div className='flex md:items-center md:justify-evenly justify-center flex-wrap md:mb-14 mb-10'>
        <img src={logo} alt="Morelia Ciudad Cultural" className='md:w-56 w-40'/>
        <div className='flex items-center gap-4 md:mt-0 mt-5'>
          <img src={ayuntamiento} className='w-32 lg:w-44'/>
          <img src={morelia} className='w-32 lg:w-44'/>
        </div>
      </div>
      <div className='flex justify-evenly gap-8 md:flex-nowrap flex-wrap'>
          <a href='/creativa' >
              <img src={creativa} alt='Morelia Ciudad Creativa' className='shadow-2xl rounded-2xl hover:scale-95 duration-300'/>
          </a>
          <a href='/cfm'>
              <img src={comision} alt='Comisión Fílmica' className='shadow-2xl rounded-2xl hover:scale-95 duration-300'/>
          </a>
      </div>
      <img src={city} alt="Morelia Ciudad Cultural" className='ml-auto mr-auto mt-20 w-56'/>
    </div>
  )
}

export default ButtonsPages