import React, { useEffect, useState } from 'react'
import { PortafolioProps } from '../../../interfaces/common';
import { HeaderTalento } from '../../../components/creativa/talento/header'

import LoadingAnimationWhite from '../../../assets/loading.json';
import LoadingAnimationBlack from '../../../assets/loading-black.json';
import { TextField, useTheme, useThemeProps } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import axios from 'axios';
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io';
import { GiMusicalNotes } from 'react-icons/gi';
import { MdMusicNote } from 'react-icons/md';
import { Close } from '@mui/icons-material';
import { RiUserUnfollowLine } from 'react-icons/ri';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

const TalentoDirectorio = () => {
    const [portafolios, setPortafolios] = useState<PortafolioProps[]>([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    // Theme
    const theme = useTheme();
    const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;
    // Lottie
    const defaultOptions = {
      loop: true, 
      autopaly: true,
      animationData: LoadingAnimation
    }
    // Translation
    const translate = useTranslate()
    //  Fetch Data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/portafolios');
          setEmpty(false)
          setPortafolios(response.data);
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
    const filteredDirectory = portafolios.filter((dir) =>
        dir.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || dir.type === category)
    );

    return (
        <div className="md:px-8 px-4">
            <HeaderTalento />
            <div className='w-full md:mt-32 mt-28'>
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
                <div className='flex gap-2 max-w-md ml-auto mr-auto'>
                <button type='button' onClick={() => setCategory('group')} className={`${category === 'group' && 'bg-[#67B7F7] font-medium text-white duration-300 border-0'} border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2 flex-1`}>
                    <GiMusicalNotes />
                    <p>{translate("pages.portfolios.group")}</p>
                </button>
                <button type='button' onClick={() => setCategory('solo')} className={`${category === 'solo' && 'bg-[#67B7F7] font-medium text-white duration-300 border-0'} border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2 flex-1`}>
                    <MdMusicNote />
                    <p>{translate("pages.portfolios.solo")}</p>
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
                    <div className='max-w-sm mt-10 ml-auto mr-auto'>
                    <Lottie options={defaultOptions}/>
                    </div>
                    :
                    empty ?
                    <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                        <RiUserUnfollowLine className='text-6xl'/>
                        <p className='font-light text-center'>{translate("pages.directories.error")}</p>
                    </div>
                    :
                    <div className='flex md:px-4 flex-wrap gap-4 justify-center mb-10 mt-4'>
                        {filteredDirectory.map((item, index) => (
                            <Link to={`/creativa/talento/${item._id}`} key={index} className={`w-full md:max-w-[22rem] flex p-2 gap-2 rounded-lg border-[1px] justify-between items-center`}>
                            <div className='flex gap-4'>
                                <img src={item.photos[0]} alt="foto" className='w-20 h-20 rounded-lg object-top object-cover'/>
                                <div className='flex flex-col gap-1 justify-center'>
                                <p className='font-medium'>{item.name}</p>
                                <div className='flex gap-2 items-start'>
                                    <div className={`p-1 ${item.type === 'group' ? 'bg-orange-700' : 'bg-orange-500'} text-white rounded-lg`}>
                                    {item.type === 'group' ? <GiMusicalNotes /> : <MdMusicNote />}
                                    </div>
                                    <p className='font-light'>{item.gender}</p>
                                </div>
                                </div>
                            </div>
                            <IoIosArrowForward className='text-3xl'/>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default TalentoDirectorio