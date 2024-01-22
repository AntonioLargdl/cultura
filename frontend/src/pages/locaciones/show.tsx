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
import { IoMailOutline } from 'react-icons/io5';
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
        return null; 
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
            <div className='mt-6 m-2 flex gap-5 lg:flex-nowrap flex-wrap md:mb-0 mb-5'>
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
                            <p className='uppercase font-light'>{translate(`pages.locations.options.${location.category}`)}</p>
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
                </div>
            </div>
            <h1 className='font-semibold text-2xl px-4 py-3 md:text-center'>{translate(`forms.createLocation.subtitle.information`)}</h1>
{/* Servicios / Infraestructura */}
            <div className={`flex md:gap-10 gap-7 mt-2 flex-wrap justify-center p-2`}>
                {/* Servicios */}
                <div className={`${background} shadow-xl p-5 rounded-2xl md:w-[18rem] w-full`}>
                    <div className='flex items-center justify-center gap-2 mb-3'>
                        <MdOutlineLightbulb className='text-xl'/>
                        <h3 className='font-medium text-xl'>{translate("pages.locations.services", "Servicios")}</h3>
                    </div>
                    <ul className='list-disc list-inside leading-7'>
                        {Object.entries(location?.services || {}).map(([key, value], index) => (
                            key !== '_id' && value && (
                            <li key={index}>
                                {translate(`forms.createLocation.services.${key}`)}
                            </li>
                            )
                        ))}
                    </ul>
                </div>
                {/* Infraestructura */}
                <div className={`${background} shadow-xl p-5 rounded-2xl md:w-[18rem] w-full`}>
                    <div className='flex items-center justify-center gap-2 mb-3'>
                        <FaRegBuilding className='text-xl'/>
                        <h3 className='font-medium text-xl'>{translate("pages.locations.infrastructure", "Infraestructura")}</h3>
                    </div>
                    <ul className='list-disc list-inside leading-7'>
                        {Object.entries(location?.infrastructure || {}).map(([key, value], index) => (
                            key !== '_id' && value && (
                            <li key={index}>
                                {translate(`forms.createLocation.infrastructure.${key}`)}
                            </li>
                            )
                        ))}
                    </ul>
                </div>
                {/* Accesos */}
                <div className={`${background} shadow-xl p-5 rounded-2xl md:w-[18rem] w-full`}>
                    <div className='flex items-center justify-center gap-2 mb-3'>
                        <MdOutlineDoorFront className='text-xl'/>
                        <h3 className='font-medium text-xl'>{translate("pages.locations.access", "Accesos")}</h3>
                    </div>
                    <ul className='list-disc list-inside leading-7'>
                        {Object.entries(location?.access || {}).map(([key, value], index) => (
                            key !== '_id' && value && (
                            <li key={index}>
                                {translate(`forms.createLocation.access.${key}`)}
                            </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ShowLocations