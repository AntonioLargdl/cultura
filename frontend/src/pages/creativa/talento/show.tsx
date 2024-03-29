import { useGetLocale, useOne, useTranslate } from '@refinedev/core';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PortafolioProps } from '../../../interfaces/common';
import { useTheme } from '@mui/material';
import { HeaderTalento } from '../../../components/creativa/talento/header';
import Loading from '../../../components/loading';
import ErrorPage from '../../../components/error';
import { GiFilmProjector, GiGrandPiano, GiMusicalScore } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import { MdEmail, MdMusicNote, MdOutlineLibraryMusic } from 'react-icons/md';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { FaAmazon, FaApple, FaFacebookF, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { RiGlobalLine } from 'react-icons/ri';
import { BsFillTelephoneFill } from 'react-icons/bs';

const TalentoShow = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "portafolios/show",
        id: id as string,
    });
    const portafolio = (data?.data as unknown) as PortafolioProps ?? []
    // Translation
    const locale = useGetLocale();
    const currentLocale = locale();
    const translate = useTranslate();
    // Theme
    const theme = useTheme();
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Use State
    const [photo, setPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    // Navigate
    const navigate = useNavigate()
    // Value
    useEffect(() => {
        if (portafolio.photos && portafolio.photos.length > 0) {
            setPhoto(portafolio.photos[0]);
        }
    }, [data, location]);

    if(isLoading || loading) {
        return  (
            <Loading />
        )
    }

    if(isError) {
        return (
            <ErrorPage />
        )
    }

    return (
        <div>
            <HeaderTalento />
            <div className='lg:p-4 lg:flex gap-2 overflow-hidden'>
                {/* Imágenes */}
                <div className='w-full mt-24 lg:mt-20'>
                    { photo &&
                        <div className='ml-auto lg:mr-auto lg:w-[350px] h-[50vh] w-[90vw] relative shadow-2xl rounded-bl-3xl lg:rounded-b-3xl'>
                            <img src={photo} alt='foto' loading='lazy' className='rounded-bl-3xl w-[90vw] h-[50vh] object-cover lg:rounded-b-3xl lg:object-top'/>
                            <div className={`absolute bottom-0 left-0 z-10 rounded-bl-3xl rounded-tr-3xl ${portafolio.type === 'talento' ? 'bg-orange-700' : 'bg-orange-500'}  p-6`}>
                                <GiGrandPiano  className='text-3xl text-white'/>
                            </div>
                            <Link to="/creativa/talento" className={`absolute top-20 -left-5 z-10 rounded-full p-2 shadow-xl ${background}`}>
                                <IoIosArrowBack className='text-xl'/>
                            </Link>
                        </div>
                    }
                    <div className='flex gap-4 items-center justify-center mt-4'>
                        {portafolio.photos.map((item, index) => (
                            <button key={index} onClick={() => setPhoto(item)}>
                                <img src={item} className={`md:w-10 md:h-10 w-6 h-6 object-cover rounded-full ${item === photo && 'border-4 border-blue-500'}`}/>
                            </button>
                        ))}
                    </div>
                </div>
                <div className='mt-3 p-4 mb-10 flex flex-col items-center'>
                    {/* Nombre */}
                    <h1 className='font-medium text-3xl px-8 mb-2 text-center'>{portafolio.name}</h1>
                    {/* Género */}
                    <div className='flex gap-5 items-center justify-center mt-2 mb-4 flex-wrap'>
                        <div className='flex items-center gap-1 text-lg py-3 px-4 border-[1px] rounded-2xl'>
                            <MdMusicNote />
                            <p>{portafolio.gender}</p>
                        </div>
                        <div className='flex items-center gap-1 text-lg py-3 px-4 border-[1px] rounded-2xl'>
                            <GiMusicalScore />
                            <p className='capitalize'>{translate(`pages.portfolios.${portafolio.type === "group" ? "group" : "solo"}`)}</p>
                        </div>
                    </div>
                    {/* Redes */}
                    <div className='flex items-center justify-center gap-5 m-4 flex-wrap'>
                        { portafolio.email &&
                            <a href={`mailto:${portafolio.email}`}>
                                <MdEmail className='text-2xl'/>
                            </a>
                        }
                        { portafolio.phone &&
                            <a href={`tel:${portafolio.phone}`} target='_blank' rel='noreferrer'>
                                <BsFillTelephoneFill className='text-xl'/>
                            </a>
                        }
                        { portafolio?.social?.web &&
                            <a href={portafolio?.social?.web} target='_blank' rel='noreferrer'>
                                <RiGlobalLine className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.fb &&
                            <a href={portafolio?.social?.fb} target='_blank' rel='noreferrer'>
                                <FaFacebookF className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.ig &&
                            <a href={portafolio?.social?.ig} target='_blank' rel='noreferrer'>
                                <AiFillInstagram className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.tiktok &&
                            <a href={portafolio?.social?.tiktok} target='_blank' rel='noreferrer'>
                                <FaTiktok className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.youtube &&
                            <a href={portafolio?.social?.youtube} target='_blank' rel='noreferrer'>
                                <FaYoutube className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.spotify &&
                            <a href={portafolio?.social?.spotify} target='_blank' rel='noreferrer'>
                                <FaSpotify className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.amazon &&
                            <a href={portafolio?.social?.amazon} target='_blank' rel='noreferrer'>
                                <FaAmazon className='text-2xl'/>
                            </a>
                        }
                        { portafolio?.social?.apple &&
                            <a href={portafolio?.social?.apple} target='_blank' rel='noreferrer'>
                                <FaApple className='text-2xl'/>
                            </a>
                        }
                    </div>
                    {/* Semblanza */}
                    <div className='mt-2 text-left'>
                        <h2 className='text-xl text-left mt-5 mb-2'>{translate("pages.portfolios.about")}</h2>
                        <p className='font-light'>{currentLocale === 'fr' ? portafolio.semblanza.fr : currentLocale === 'en' ? portafolio.semblanza.en : portafolio.semblanza.es}</p>
                    </div>
                    <div className='flex items-center gap-4 mt-5'>
                        {/* Vídeo */}
                        { portafolio.video &&
                            <a href={portafolio.video} target='_blank' rel='noreferrer' className='flex items-center gap-1 text-lg py-3 px-4 border-[1px] rounded-2xl'>
                                <FaRegCirclePlay />
                                <p>{translate("pages.portfolios.video")}</p>
                            </a>
                        }
                        {/* Portafolio */}
                        { portafolio?.social?.pdf &&
                        <a href={portafolio?.social?.pdf} target='_blank' rel='noreferrer' className='flex items-center gap-1 text-lg py-3 px-4 border-[1px] rounded-2xl'>
                            <MdOutlineLibraryMusic />
                            <p>{translate("pages.portfolios.pdf")}</p>
                        </a>
                        }
                    </div>
                    {/* Apariciones */}
                    { portafolio.cv &&
                        <div className='mt-2 text-left'>
                            <h2 className='text-xl text-left mt-5 mb-2'>{translate("pages.portfolios.awards")}</h2>
                            <p className='font-light'>{currentLocale === 'fr' ? portafolio.cv.fr : currentLocale === 'en' ? portafolio.cv.en : portafolio.cv.es}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TalentoShow