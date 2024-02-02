import { useGetLocale, useOne, useTranslate } from '@refinedev/core';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DirectorioProps } from '../../interfaces/common';
import { Delete, PlayCircle } from '@mui/icons-material';
import ErrorPage from '../../components/error';
import Loading from '../../components/loading';
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"

import { GiBodyHeight, GiFilmProjector } from 'react-icons/gi';
import { Dialog, DialogActions, DialogTitle, IconButton, useTheme } from '@mui/material';
import { IoIosCalendar } from 'react-icons/io';
import { TbWeight } from 'react-icons/tb';
import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { MdEmail, MdOutlineLightbulb } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { RiGlobalLine } from 'react-icons/ri';
import { AiFillInstagram } from 'react-icons/ai';
import { FcUndo } from 'react-icons/fc';
import { Button, notification } from 'antd';
import axios from 'axios';

const ShowDirectorio = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "directorios/show",
        id: id as string,
    });
    const directorio = (data?.data as unknown) as DirectorioProps ?? []
    // Translation
    const locale = useGetLocale();
    const currentLocale = locale();
    const translate = useTranslate();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;
    // Use State
    const [photo, setPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    // Navigate
    const navigate = useNavigate()
    // Value
    useEffect(() => {
        if (directorio.photos && directorio.photos.length > 0) {
            setPhoto(directorio.photos[0]);
        }
    }, [data, location]);
    // Dialog
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // Delete
    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://culltura.onrender.com/api/v1/directorios/delete/${id}`);
            if (response.data.success) {
                navigate('/directorios')
                setLoading(false);
                notification.success({
                    message: "¡Listo!",
                    description: `Perfil eliminado exitosamente`,
                    placement: 'bottomRight',
                });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: `No pudimos borrar el perfil`,
                placement: 'bottomRight',
            });
            console.error(error);
            setLoading(false);
            handleClose()
        }
    };

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
        <>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <Link to="/directorios" className="flex items-center">
                            <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                                <FcUndo className="text-3xl"/>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.directories.title", "Directorios")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <IconButton color="inherit" sx={{width:'50px', height:'50px'}} onClick={() => handleOpen()}>
                    <Delete sx={{color:'red', width:'30px', height:'30px'}}/>
                </IconButton>
            </div>
            <div className='lg:p-4 lg:flex gap-2 overflow-hidden'>
                {/* Imágenes */}
                <div className='w-full mt-2'>
                    { photo &&
                        <div className='ml-auto lg:mr-auto lg:w-[350px] h-[50vh] w-[90vw] relative  rounded-3xl lg:rounded-3xl'>
                            <img src={photo} alt='foto' loading='lazy' className='rounded-3xl w-[90vw] h-[50vh] object-cover lg:rounded-3xl lg:object-top'/>
                            <div className={`absolute bottom-0 left-0 z-10 rounded-bl-3xl rounded-tr-3xl ${directorio.type === 'talento' ? 'bg-orange-700' : 'bg-orange-500'}  p-6`}>
                                <GiFilmProjector  className='text-3xl text-white'/>
                            </div>
                        </div>
                    }
                    <div className='flex gap-4 items-center justify-center mt-4'>
                        {directorio.photos.map((item, index) => (
                            <button key={index} onClick={() => setPhoto(item)}>
                                <img src={item} className={`md:w-10 md:h-10 w-6 h-6 object-cover rounded-full ${item === photo && 'border-4 border-blue-500'}`}/>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Contenido */}
                {/* Edad / Peso / Altura */}
                <div className='ml-6 mt-3 p-4 mb-10 flex flex-col items-start'>
                    <h1 className='font-medium text-3xl'>{directorio.name}</h1>
                    { directorio.type === 'talento' &&
                        <div className='flex mt-8 gap-10'>
                            <div className='flex flex-col gap-1 items-center'>
                                <div className='flex items-center'>
                                    <p className='text-4xl'>{directorio.age}</p>
                                    <IoIosCalendar className='text-3xl'/>
                                </div>
                                <p className='font-light text-sm'>{translate("pages.directories.age")}</p>
                            </div>
                            <div className='flex flex-col gap-1 items-center'>
                                <div className='flex items-center'>
                                    <p className='text-4xl'>{directorio.height}</p>
                                    <GiBodyHeight className='text-3xl'/>
                                </div>
                                <p className='font-light text-sm'>{translate("pages.directories.height")}</p>
                            </div>
                            <div className='flex flex-col gap-1 items-center'>
                                <div className='flex items-center'>
                                    <p className='text-4xl'>{directorio.weight}</p>
                                    <TbWeight className='text-3xl'/>
                                </div>
                                <p className='font-light text-sm'>{translate("pages.directories.weight")}</p>
                            </div>
                        </div>
                    }
                    {/* Semblanza */}
                    <p className='font-light mt-10 pr-4'>{currentLocale === 'fr' ? directorio.semblanza.fr : currentLocale === 'en' ? directorio.semblanza.en : directorio.semblanza.es}</p>
                    {/* Servicios */}
                    { directorio.services &&
                        <div className='mt-10'>
                            <div className='flex items-center justify-start gap-2 mb-3'>
                                <MdOutlineLightbulb className='text-2xl'/>
                                <h3 className='font-medium text-2xl'>{translate("pages.locations.services", "Servicios")}</h3>
                            </div>
                            <ul className='list-disc list-inside leading-7 font-light'>
                                {Object.entries(directorio?.services || {}).map(([key, value], index) => (
                                    key !== '_id' && value && (
                                    <li key={index}>
                                        {translate(`forms.createDirectory.category.${key}`)}
                                    </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    }
                    {/* Portafolio */}
                    { directorio.youtube &&
                        <a href={directorio.youtube} target='_blank' rel='noreferrer' className='flex gap-2 mt-5 bg-red-700 rounded-full items-center hover:bg-red-500'>
                            <p className='font-light text-white pl-4'>{translate("pages.directories.portfolio")}</p>
                            <PlayCircle className='text-white' sx={{height:30, width:30}}/>
                        </a>
                    }
                    {/* Redes */}
                    <div className='flex mt-8 gap-4 items-center'>
                        { directorio.email &&
                            <a href={`mailto:${directorio.email}`} target='_blank' rel='noreferrer'>
                                <MdEmail className='text-2xl'/>
                            </a>
                        }
                        { directorio.phone &&
                            <a href={`tel:${directorio.phone}`} target='_blank' rel='noreferrer'>
                                <BsFillTelephoneFill className='text-xl'/>
                            </a>
                        }
                        { directorio.web &&
                            <a href={directorio.web} target='_blank' rel='noreferrer'>
                                <RiGlobalLine className='text-2xl'/>
                            </a>
                        }
                        { directorio.fb &&
                            <a href={directorio.fb} target='_blank' rel='noreferrer'>
                                <FaFacebookF className='text-2xl'/>
                            </a>
                        }
                        { directorio.ig &&
                            <a href={directorio.ig} target='_blank' rel='noreferrer'>
                                <AiFillInstagram className='text-2xl'/>
                            </a>
                        }
                        { directorio.tiktok &&
                            <a href={directorio.tiktok} target='_blank' rel='noreferrer'>
                                <FaTiktok className='text-2xl'/>
                            </a>
                        }
                        { directorio.linkedin &&
                            <a href={directorio.linkedin} target='_blank' rel='noreferrer'>
                                <FaLinkedinIn className='text-2xl'/>
                            </a>
                        }
                    </div>
                </div>
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{translate("pages.users.delete.title", "¿Estás seguro que deseas eliminar a")} {directorio.name}?</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {translate("pages.users.delete.cancel", "Cancelar")} 
                </Button>
                <Button onClick={() => handleConfirm()} color="primary">
                    {translate("pages.users.delete.accept", "Confirmar")} 
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        </>
    )
}

export default ShowDirectorio