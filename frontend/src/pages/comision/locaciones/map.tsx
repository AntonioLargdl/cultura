import React, { useEffect, useMemo, useState } from 'react'
import { HeaderLocaciones } from '../../../components/comision/locaciones/header'
import { Box, Stack, useTheme } from '@mui/material';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LocacionesProps } from '../../../interfaces/common';
import axios from 'axios';
import { FcHighPriority } from 'react-icons/fc';
import { useTranslate } from '@refinedev/core';
import { PiAperture, PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMapPin, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiPhone, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';
import { MdOutlineFoodBank, MdOutlineLocalHotel } from 'react-icons/md';
import { IoMailOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';

const LocacionesMap = () => {
    const [locaciones, setLocaciones] = useState<LocacionesProps[]>([]);
    const [locacion, setLocacion] = useState<LocacionesProps | null>(null);
    // Theme
    const theme = useTheme();
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Translation
    const translate = useTranslate()
    // Category
    const categoryList = [
        { value: "", name: translate("forms.createLocation.fields.category.all","Todo"), icon: <PiAperture className='text-lg'/> },
        { value: "parque", name: translate("forms.createLocation.fields.category.park","Parques"), icon: <PiPark className='text-xl'/> },
        { value: "via", name: translate("forms.createLocation.fields.category.roads","Vías"), icon: <PiRoadHorizon className='text-xl'/> },
        { value: "arquitectura", name: translate("forms.createLocation.fields.category.architecture","Arquitectura"), icon: <PiBank className='text-xl'/> },
        { value: "industria", name: translate("forms.createLocation.fields.category.industry","Industria"), icon: <PiFactory className='text-xl'/> },
        { value: "entretenimiento", name: translate("forms.createLocation.fields.category.entretainment","Entretenimiento"), icon: <PiMaskHappy className='text-xl'/> },
        { value: "cultura", name: translate("forms.createLocation.fields.category.culture","Cultura"), icon: <PiPalette className='text-xl'/> },
        { value: "salud", name: translate("forms.createLocation.fields.category.health","Salud"), icon: <PiHeartbeatBold className='text-xl'/> },
        { value: "comercio", name: translate("forms.createLocation.fields.category.trade","Comercio"), icon: <PiBag className='text-xl' /> },
        { value: "deportes", name: translate("forms.createLocation.fields.category.sports","Deportes"), icon: <PiDribbbleLogo className='text-xl'/> },
        { value: "naturaleza", name: translate("forms.createLocation.fields.category.nature","Naturaleza"), icon: <PiMountains className='text-xl'/> },
        { value: "recreación", name: translate("forms.createLocation.fields.category.recreation","Recreación"), icon: <PiMartini className='text-xl'/> },
        { value: "oficinas", name: translate("forms.createLocation.fields.category.offices","Oficinas"), icon: <PiSuitcase className='text-xl'/> },
        { value: "hoteles", name: translate("forms.createLocation.fields.category.hotels","Hoteles"), icon: <MdOutlineLocalHotel className='text-xl'/> },
        { value: "restaurantes", name: translate("forms.createLocation.fields.category.restaurants","Restaurantes"), icon: <MdOutlineFoodBank className='text-xl text-center'/> },
    ];
    //  Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get('https://culltura.onrender.com/locaciones');
            setLocaciones(response.data);
            console.log(locaciones)
            } catch (error) {
            console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleMarkerClick = (location: LocacionesProps) => {
        setLocacion(location)
      };

    const getCategoryIcon = (category:string) => {
        const categoryItem = categoryList.find((item) => item.value === category);
        if (categoryItem) {
            return categoryItem.icon;
        }      
        return null; 
    };

    return (
        <div className='overflow-hidden'>
            <HeaderLocaciones />
            <Box     
                sx={{
                height:'100vh',
                width:'100%',
                minHeight: '100vw',
                minWidth:'100vw',
                position:'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                }}
                >
                <ReactMapGL
                mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
                initialViewState={{
                    longitude:-101.1923185,
                    latitude:19.702423 ,
                    zoom:12
                }}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                >
                {locaciones.map((item, index) => (
                    <Stack key={index} >
                        <Stack>
                            <Marker
                            longitude={item.location.longitude}
                            latitude={item.location.latitude}
                            onClick={() => handleMarkerClick(item)}
                            >
                            {/* Marker Icon */}
                            <Box className='p-1 rounded-full bg-[#67B7F7] text-white'>
                                {getCategoryIcon(item.category)}
                            </Box>
                            </Marker>
                        </Stack>
                    </Stack>
                    ))}
                    <NavigationControl position='bottom-right' />
                    <GeolocateControl position="top-left" trackUserLocation />
                </ReactMapGL>
            </Box>
            { locacion &&
                <div className={`fixed z-20 bottom-7 left-1/2 transform -translate-x-1/2 w-full`}>
                    <div className={`mx-5 ${background} flex gap-1 md:max-w-md ml-auto mr-auto rounded-xl items-center justify-between relative`}>
                        <div className='flex gap-1'>
                            <img src={locacion.photos[0]} alt="foto" loading='lazy' className='w-36 h-36 object-cover p-2 rounded-2xl'/>
                            <div className='flex flex-col items-start justify-center'>
                                <h2 className='font-medium text-xl'>{locacion.name}</h2>
                                <div className='flex gap-2 items-center'>
                                    {getCategoryIcon(locacion.category)}
                                    <p className='uppercase font-light'>{translate(`pages.locations.options.${locacion.category}`)}</p>
                                </div>
                                <div className='flex gap-2 mt-2'>
                                    { locacion.phone &&
                                        <a className="bg-[#67B7F7] text-white p-2 rounded-lg" href={`tel:${locacion.phone}`}><IoMailOutline /> </a>
                                    }
                                    { locacion.email &&
                                        <a className="bg-[#67B7F7] text-white p-2 rounded-lg" href={`mailto:${locacion.email}`}><PiPhone /></a>
                                    }
                                    <a className="bg-[#67B7F7] text-white p-2 rounded-lg" href={`https://maps.google.com/?q=${locacion.location.latitude},${locacion.location.longitude}`}><PiMapPin/></a>
                                </div>
                            </div>
                        </div>
                        <Link to={`/cfm/locaciones/${locacion._id}`}>
                            <IoIosArrowForward className='text-3xl'/>
                        </Link>
                        <button type='button' className='absolute top-2 right-1 cursor-pointer' onClick={() => setLocacion(null)}><Close /></button>
                    </div>
                </div>
            }
        </div>
    )
}

export   default LocacionesMap