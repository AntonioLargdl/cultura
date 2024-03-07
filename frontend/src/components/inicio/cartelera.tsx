import { useTranslate } from '@refinedev/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarteleraProps } from '../../interfaces/common';
import { Link } from 'react-router-dom';
import { PiCalendarBlank, PiClock, PiMapPin } from 'react-icons/pi';
import { useTheme } from '@mui/material';

const CarteleraCultural = () => {
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
    // Date
    const [cartelera, setCartelera] = useState<CarteleraProps[]>([]);
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; 
    const mesActualText = dates.find((item) => item.value === mesActual)?.text;
    const añoActual = fechaActual.getFullYear();

    const theme = useTheme();
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';

    //  Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/carteleras', {
                    params: {
                        month: mesActual,
                        year: añoActual
                    }
                });
                // Obtener solo los primeros 3 resultados
                const primerosTresResultados = response.data.slice(0, 3);
                setCartelera(primerosTresResultados);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, [mesActual, añoActual]);

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

    return (
        <div className='my-10 lg:p-8 p-4'>
            {/* Título */}
            <div className='flex md:justify-evenly gap-2 flex-wrap'>
                <h2 className='text-5xl font-bold leading-[3.5rem]'>{translate("pages.landing.billboard")} <br /><span className='font-normal'>{translate("pages.landing.culture")}</span></h2>
                <div className='flex flex-col md:items-center items-start gap-3'>
                    <h3 className='mt-2 text-2xl text-[#8657b6] font-medium'>{mesActualText} {añoActual}</h3>
                    <Link to='/inicio/cartelera' className='bg-[#8657b6] text-white px-6 py-4 rounded-xl hover:bg-[#6a4590] duration-300 hover:scale-95'>
                        {translate("pages.landing.more")}
                    </Link>
                </div>
            </div>
            {/* Contenido */}
            <div className='flex lg:flex-nowrap flex-wrap md:justify-evenly gap-4 mt-5'>
                { cartelera && cartelera && cartelera.map((item,index) => (
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

export default CarteleraCultural