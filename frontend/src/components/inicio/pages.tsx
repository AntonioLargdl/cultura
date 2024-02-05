import { Link } from 'react-router-dom';
import creativa from '../../assets/bg-creativa.webp';
import comision from '../../assets/bg-comision.webp';
import logoBlack from '../../assets/morelia.webp';
import logoWhite from '../../assets/morelia_white.webp';
import cityBlack from '../../assets/ciudad.webp';
import cityWhite from '../../assets/ciudad_white.webp';
import { useTheme } from '@mui/material';

const ButtonsPages = () => {
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
  const city = theme.palette.mode === 'dark' ? cityWhite : cityBlack;

  return (
    <div className='my-10 lg:p-8 p-4'>
      <img src={logo} alt="Morelia Ciudad Cultural" className='ml-auto mr-auto mb-20 w-56'/>
      <div className='flex justify-evenly gap-8 md:flex-nowrap flex-wrap'>
          <Link to='/creativa' >
              <img src={creativa} alt='Morelia Ciudad Creativa' className='shadow-2xl rounded-2xl hover:scale-95 duration-300'/>
          </Link>
          <Link to='/cfm'>
              <img src={comision} alt='Comisión Fílmica' className='shadow-2xl rounded-2xl hover:scale-95 duration-300'/>
          </Link>
      </div>
      <img src={city} alt="Morelia Ciudad Cultural" className='ml-auto mr-auto mt-20 w-56'/>
    </div>
  )
}

export default ButtonsPages