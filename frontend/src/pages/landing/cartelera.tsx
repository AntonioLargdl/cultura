import { HeaderInicio } from "../../components/inicio/header"
import { useTranslate } from '@refinedev/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarteleraProps } from '../../interfaces/common';
import { Link } from 'react-router-dom';
import { PiCalendarBlank, PiClock, PiMapPin, PiMaskSad } from 'react-icons/pi';
import { Box, MenuItem, Select, useTheme } from '@mui/material';

import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import morelia from '../../assets/brilla.webp'
import ayuntamiento from '../../assets/ayuntamiento.webp'
import { FaRegCalendar } from "react-icons/fa";
import Lottie from "react-lottie";


const CarteleraPage = () => {
    // Translation
    const translate = useTranslate()
    const dates = [
        { value: 1, text: translate("pages.billboards.fields.options.january") },
        { value: 2, text: translate("pages.billboards.fields.options.february") },
        { value: 3, text: translate("pages.billboards.fields.options.march") },
        { value: 4, text: translate("pages.billboards.fields.options.april") },
        { value: 5, text: translate("pages.billboards.fields.options.may") },
        { value: 6, text: translate("pages.billboards.fields.options.june") },
        { value: 7, text: translate("pages.billboards.fields.options.july") },
        { value: 8, text: translate("pages.billboards.fields.options.august") },
        { value: 9, text: translate("pages.billboards.fields.options.september") },
        { value: 10, text: translate("pages.billboards.fields.options.october") },
        { value: 11, text: translate("pages.billboards.fields.options.november") },
        { value: 12, text: translate("pages.billboards.fields.options.december") }
    ];
    const years = [ {year: 2024}, {year: 2025}, {year: 2026}, {year: 2027}, {year: 2028}, {year: 2029}, {year: 2030} ]

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; 
    const mesActualText = dates.find((item) => item.value === mesActual)?.text;
    const añoActual = fechaActual.getFullYear();
    // Date
    const [cartelera, setCartelera] = useState<CarteleraProps[]>([]);
    const [month, setMonth] = useState(mesActual);
    const [year, setYear] = useState(añoActual);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    // Theme
    const theme = useTheme();
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;
    // Lottie
    const defaultOptions = {
        loop: true, 
        autopaly: true,
        animationData: LoadingAnimation
    }


    //  Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://culltura.onrender.com/api/v1/carteleras', {
                    params: {
                        month: month,
                        year: year
                    }
                });
                setEmpty(false)
                setCartelera(response.data);
                setLoading(false)
            } catch (error) {
                setEmpty(true)
                setLoading(false)
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, [month, year]);

    // Función para obtener Fecha
    function formatearFecha(fecha: string) {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate().toString().padStart(2, '0');
        const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses en JavaScript comienzan desde 0
        const año = fechaObj.getFullYear();
    
        return `${dia}/${mes}/${año}`;
    }
    // Función para obtener Horario
    function obtenerHora(fecha: string) {
        const fechaObj = new Date(fecha);
        const horas = fechaObj.getHours().toString().padStart(2, '0');
        const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
        
        return `${horas}:${minutos}`;
    }

    const handleChange = (event: any) => {
        // Convierte el valor a número si es necesario
        const selectedMonth = parseInt(event.target.value, 10);
        setMonth(selectedMonth);
    };

    const handleChangeYear = (event: any) => {
        // Convierte el valor a número si es necesario
        const selectedYear = parseInt(event.target.value, 10);
        setYear(selectedYear);
    };
    return (
        <div className='my-10 mt-20 lg:p-8 p-4'>
            <HeaderInicio />
            {/* Título */}
            <div className="flex md:justify-between md:items-start flex-wrap justify-center gap-5">
                <div className='flex flex-col md:text-left text-center justify-center gap-2'>
                    <h2 className='text-5xl font-bold leading-[3.5rem]'>Cartelera <br /><span className='font-normal'>Cultural</span></h2>
                    <h3 className='mt-2 md:text-left text-center text-2xl text-[#8657b6] font-medium'>{mesActualText} {añoActual}</h3>
                </div>
                <div className="flex gap-2">
                    <img src={ayuntamiento} className='w-24'/>
                    <img src={morelia} className='w-24'/>
                </div>
            </div>
            <div className="flex gap-4 items-center mt-5 justify-center">
                <Select
                    color="info"
                    displayEmpty
                    defaultValue={month}
                    value={month}
                    onChange={handleChange}
                    inputProps={{ "aria-label" : "Whithouth label"}}
                >
                    <MenuItem value="" disabled className='flex gap-2'>
                        <Box display="flex" alignItems="center" gap={2}>
                            <FaRegCalendar />
                            <span>{translate("pages.billboards.fields.month")}</span>
                        </Box>
                    </MenuItem>
                    {dates.map((item,index) => (
                        <MenuItem value={item.value} key={index} className='flex gap-2'>
                            <Box display="flex" alignItems="center" gap={2}>
                                {item.text}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    color="info"
                    displayEmpty
                    defaultValue={year}
                    value={year}
                    onChange={handleChangeYear}
                    inputProps={{ "aria-label" : "Whithouth label"}}
                >
                    <MenuItem value="" disabled className='flex gap-2'>
                        <Box display="flex" alignItems="center" gap={2}>
                            <FaRegCalendar />
                            <span>{translate("pages.billboards.fields.year")}</span>
                        </Box>
                    </MenuItem>
                    {years.map((item,index) => (
                        <MenuItem value={item.year} key={index} className='flex gap-2'>
                            <Box display="flex" alignItems="center" gap={2}>
                                {item.year}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </div>
            {/* Contenido */}
            <div className='flex flex-wrap md:justify-evenly gap-4 mt-5'>
                    { loading ?
                    <div className='max-w-sm mt-10 ml-auto mr-auto'>
                        <Lottie options={defaultOptions}/>
                    </div>
                    : empty ?
                    <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                        <PiMaskSad className='text-6xl'/>
                        <p className='font-light text-center'>{translate("pages.billboards.error")}</p>
                    </div>
                    : cartelera && cartelera && cartelera.map((item,index) => (
                    <Link to={`/inicio/cartelera/${item._id}`} key={index} className={`flex flex-col md:w-auto md:max-w-[25rem] w-full shadow-xl gap-3 rounded-2xl p-4 items-center ${background} hover:scale-95 duration-300`}>
                        <img src={item.image} className="w-full h-[14rem] object-cover rounded-tr-3xl border-[1px]"/>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="font-medium text-lg mb-1">{item.name}</p>
                            { item.date &&
                                <div className="flex gap-2 items-center">
                                    <PiCalendarBlank />
                                    <p className="font-extralight">{formatearFecha(item.date)}</p>
                                </div>
                            }
                            { item.begin &&
                                <div className="flex gap-2 items-center">
                                    <PiClock />
                                    <p className="font-extralight">{obtenerHora(item.begin)} {item.end && "-"} {item.end && (obtenerHora(item.end))}</p>
                                </div>
                            }
                            <div className="flex gap-2 items-start">
                                <PiMapPin className="mt-1"/>
                                <p className="font-light flex-1">{item.location}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default CarteleraPage