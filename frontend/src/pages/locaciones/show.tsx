import { useEffect, useState } from 'react'
import { BaseRecord, useOne, useTranslate } from '@refinedev/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, useTheme } from '@mui/material';
import { notification } from 'antd';
import axios from 'axios';

import { LocacionesProps } from '../../interfaces/common';
import Loading from '../../components/loading';
import ErrorPage from '../../components/error';
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"

import { FcUndo } from 'react-icons/fc';
import { MdOutlineDoorFront, MdOutlineFoodBank, MdOutlineLightbulb, MdOutlineLocalHotel } from 'react-icons/md';
import { PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMapPin, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiPhone, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import { IoMailOutline, IoTimeOutline } from 'react-icons/io5';
import { BiParty } from 'react-icons/bi';
import { FaRegBuilding } from 'react-icons/fa';


// Category
const categoryList = [
    { value: "parque", icon: <PiPark /> },
    { value: "via", icon: <PiRoadHorizon /> },
    { value: "arquitectura", icon: <PiBank /> },
    { value: "industria", icon: <PiFactory /> },
    { value: "entretenimiento", icon: <PiMaskHappy /> },
    { value: "cultura", icon: <PiPalette /> },
    { value: "salud", icon: <PiHeartbeatBold /> },
    { value: "comercio", icon: <PiBag /> },
    { value: "deportes", icon: <PiDribbbleLogo /> },
    { value: "naturaleza", icon: <PiMountains /> },
    { value: "recreación", icon: <PiMartini /> },
    { value: "oficinas", icon: <PiSuitcase /> },
    { value: "hoteles", icon: <MdOutlineLocalHotel /> },
    { value: "restaurantes", icon: <MdOutlineFoodBank /> },
];

const ShowLocations = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "locaciones/show",
        id: id as string,
    });
    const location = (data?.data as unknown) as LocacionesProps ?? []
    // Translation
    const translate = useTranslate();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Navigate
    const navigate = useNavigate()
    // Location
    const [photo, setPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState<BaseRecord>();

    useEffect(() => {
        if (location.photos && location.photos.length > 0) {
            setPhoto(location.photos[0]);
        }
    }, [data, location]);
    
    
    const getCategoryIcon = (category:string) => {
        const categoryItem = categoryList.find((item) => item.value === category);
        if (categoryItem) {
          return categoryItem.icon;
        }      
        return null; // Manejar el caso en el que no se encuentra el ícono
    };

    // Delete
    const handleConfirm = async ({id}:{id:string}) => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/usuarios/eliminar/${id}`);
            if (response.data.success) {
            navigate('/usuarios')
            setLoading(false);
            notification.success({
                message: "¡Listo!",
                description: `Locación eliminada exitosamente`,
                placement: 'bottomRight',
            });
            } else {
            notification.success({
                message: "Error",
                description: `No pudimos borrar la locación`,
                placement: 'bottomRight',
            });
            handleClose()
            setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            handleClose()
        }
    };

    // Dialog
    const handleOpen = ({user}:{user:BaseRecord}) => {
        setOpen(true);
        setRow(user)
    };
    const handleClose = () => {
        setOpen(false);
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
        <div>
            {/* Header */}
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <Link to="/locaciones" className="flex items-center">
                            <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                                <FcUndo className="text-3xl"/>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.locations.title", "Locaciones")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
            </div>
            {/* Contenido */}
            <div className='mt-6 m-2 flex gap-5 lg:flex-nowrap flex-wrap md:mb-0 mb-10'>
                {/* Imágenes */}
                <div className='lg:w-[30rem] w-full'>
                    { photo &&
                        <img src={photo} alt='foto' className='rounded-[10px] shadow-xl lg:w-[30rem] w-full h-[14rem] md:h-[17rem] lg:h-[24rem] object-cover'/>
                    }
                    <div className='flex gap-3 items-center mt-4'>
                        {location.photos.map((item, index) => (
                            <button key={index} onClick={() => setPhoto(item)}>
                                <img src={item} className={`md:w-24 md:h-24 w-16 h-16 object-cover rounded-[10px] ${item === photo && 'border-4 border-blue-500'}`}/>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Datos */}
                <div className='flex flex-col items-start lg:mt-0 mt-3'>
                    {/* Nombre y categoría */}
                    <div className='flex items-center gap-3'>
                        <div className='p-5 text-2xl shadow-lg border-[1px] rounded-[10px]'>
                            {getCategoryIcon(location.category)}
                        </div>
                        <div>
                            <h1 className='font-semibold text-3xl'>{location.name}</h1>
                            <p className='uppercase font-light'>{location.category}</p>
                        </div>
                    </div>
                    {/* Locación */}
                    <div className="flex items-center gap-2 my-2">
                        <PiMapPin className='text-xl'/>
                        <p className="font-light">{location.address}</p>
                    </div>
                    <a href={`https://maps.google.com/?q=${location.location.latitude},${location.location.longitude}`} target='_blank' rel='noreferrer'>
                        <Button sx={{mb:2}} variant="contained">
                            {translate("pages.locations.map", "Ver en mapa")}
                        </Button>
                    </a>
                    {/* Contacto */}
                    { (location.phone || location. email) &&
                        <div className={`rounded-[10px] shadow-xl p-5 ${background}`}>
                            <h3 className='font-medium text-lg mb-3'>{translate("pages.locations.contact", "Contacto")}</h3>
                            <div className='flex flex-col gap-2'>
                                { location.phone &&
                                    <a href={`tel:${location.phone}`} className='flex items-center gap-3 font-light'>
                                        <PiPhone className='text-xl'/>
                                        <p>{location.phone}</p>
                                    </a>
                                }
                                { location.email &&
                                    <a href={`mailto:${location.email}`} className='flex items-center gap-3 font-light'>
                                        <IoMailOutline className='text-xl'/>
                                        <p>{location.email}</p>
                                    </a>
                                }
                            </div>
                        </div>
                    }
                    { location.time &&
                        <div className='mt-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <IoTimeOutline className='text-xl'/>
                                <h3 className='font-medium text-lg'>{translate("pages.locations.time", "Horarios")}</h3>
                            </div>
                            <p className='font-light'>{location.time}</p>
                        </div>
                    }
                    { location.services &&
                        <div className='mt-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <MdOutlineLightbulb className='text-xl'/>
                                <h3 className='font-medium text-lg'>{translate("pages.locations.services", "Servicios")}</h3>
                            </div>
                            <p className='font-light'>{location.services}</p>
                        </div>
                    }
                    { location.infrastructure &&
                        <div className='mt-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <FaRegBuilding className='text-xl'/>
                                <h3 className='font-medium text-lg'>{translate("pages.locations.infrastructure", "Infraestructura")}</h3>
                            </div>
                            <p className='font-light'>{location.infrastructure}</p>
                        </div>
                    }
                    { location.seasons &&
                        <div className='mt-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <BiParty className='text-xl'/>
                                <h3 className='font-medium text-lg'>{translate("pages.locations.seasons", "Actividades de temporada")}</h3>
                            </div>
                            <p className='font-light'>{location.seasons}</p>
                        </div>
                    }
                    { location.access &&
                        <div className='mt-3'>
                            <div className='flex items-center gap-2 mb-1'>
                                <MdOutlineDoorFront className='text-xl'/>
                                <h3 className='font-medium text-lg'>{translate("pages.locations.access", "Accesos")}</h3>
                            </div>
                            <p className='font-light'>{location.access}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowLocations