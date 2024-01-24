import { TextField, useTheme } from '@mui/material'
import { IoIosSearch } from 'react-icons/io'
import { HeaderDirectorio } from '../../../components/comision/directorio/header'
import { useTranslate } from '@refinedev/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DirectorioProps } from '../../../interfaces/common';
import { Link } from 'react-router-dom';
import { PiPersonArmsSpread } from 'react-icons/pi';
import { RiTeamLine, RiUserUnfollowLine } from 'react-icons/ri';
import Lottie from 'react-lottie';
import LoadingAnimation from '../../../assets/loading.json';
import { Close } from '@mui/icons-material';

const DirectoriosUser = () => {
  const [directorio, setDirectorio] = useState<DirectorioProps[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  // Lottie
  const defaultOptions = {
    loop: true, 
    autopaly: true,
    animationData: LoadingAnimation
  }
  // Theme
  const theme = useTheme();
  const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
  // Translation
  const translate = useTranslate()
  //  Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://culltura.onrender.com/api/v1/directorios');
        setEmpty(false)
        setDirectorio(response.data);
        setLoading(false)
      } catch (error) {
        setEmpty(true)
        setLoading(false)
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

    // Search
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const filteredDirectory = directorio.filter((dir) =>
        dir.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || dir.type === category)
    );

  return (
    <>
        <HeaderDirectorio />
        <div className='w-full mt-20 p-4'>
            <TextField
                fullWidth
                margin="normal"
                label={translate("pages.directories.search.label")}
                placeholder={translate("pages.directories.search.placeholder")}
                InputProps={{
                startAdornment: <IoIosSearch className="mx-2 text-lg"/>,
                }}
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mt: 2 }}
            />
            <div className='flex gap-2 max-w-sm ml-auto mr-auto'>
              <button type='button' onClick={() => setCategory('talento')} className={`${category === 'talento' && 'bg-[#67B7F7] font-medium text-white duration-300 border-0'} border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2 flex-1`}>
                <PiPersonArmsSpread />
                <p>{translate("pages.directories.talent")}</p>
              </button>
              <button type='button' onClick={() => setCategory('crew')} className={`${category === 'crew' && 'bg-[#67B7F7] font-medium text-white duration-300 border-0'} border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2 flex-1`}>
                <RiTeamLine />
                <p>{translate("pages.directories.crew")}</p>
              </button>
              <button type='button' onClick={() => setCategory('')} className={`hover:bg-[#67B7F7] hover:font-medium hover:text-white duration-300 hover:border-0 border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2`}>
                <Close />
              </button>
            </div>
        </div>
        <div>
          { filteredDirectory.length === 0 && !empty && !loading &&
            <div className='flex flex-col gap-4 items-center justify-center mt-10'>
              <RiUserUnfollowLine className='text-6xl'/>
              <p className='font-light text-center'>{translate("pages.directories.error")}</p>
            </div>
          }
          { loading ?
            <div className='flex items-center justify-center h-full min-h-screen'>
              <Lottie options={defaultOptions}/>
            </div>
            : empty ?
            <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                <RiUserUnfollowLine className='text-6xl'/>
                <p className='font-light text-center'>{translate("pages.directories.error")}</p>
            </div>
            :
            <div className='flex flex-col lg:flex-row px-4 flex-wrap gap-5 justify-center'>
              {filteredDirectory.map((item, index) => (
                <Link to={`/cfm/directorio/${item._id}`} key={index} className={`${background} rounded-lg shadow-xl hover:bg-[#67B7F7] hover:text-white font-medium hover:font-light duration-300 w-40`}>
                  <img src={item.photos[0]} alt="foto" className='w-40 h-20 hover:h-40 object-cover rounded-lg filter brightness-75 grayscale blur-[1px] hover:grayscale-0 hover:blur-[0px] duration-300'/>
                  <div>
                    <p className='px-2 py-4 text-center text-sm'>{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          }
        </div>
    </>
  )
}

export default DirectoriosUser