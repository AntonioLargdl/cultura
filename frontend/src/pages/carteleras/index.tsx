import { useTranslate } from "@refinedev/core"
import { Box, Button, MenuItem, Select, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"

import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { CarteleraProps } from "../../interfaces/common";
import { FaRegCalendar } from "react-icons/fa";
import { PiCalendarBlank, PiClock, PiMapPin, PiMaskSad } from "react-icons/pi";
import Lottie from "react-lottie";


const Carteleras = () => {
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
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;
    // Date
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; 
    const añoActual = fechaActual.getFullYear();
    // UseState
    const [cartelera, setCartelera] = useState<CarteleraProps[]>([]);
    const [month, setMonth] = useState(mesActual);
    const [year, setYear] = useState(añoActual);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
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
                const response = await axios.get('http://localhost:8080/api/v1/carteleras', {
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
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcPlus className="text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.billboards.title", "Blogs")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <Link to="/carteleras/create">
                    <Button type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                        {translate("pages.directories.button")}
                    </Button>
                </Link>
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
            { loading ?
                <div className='max-w-sm mt-10 ml-auto mr-auto'>
                    <Lottie options={defaultOptions}/>
                </div>
                : empty && !loading?
                <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                    <PiMaskSad className='text-6xl'/>
                    <p className='font-light text-center'>{translate("pages.billboards.error")}</p>
                </div>
                :
                <div className="flex gap-4 items-center mt-5 flex-wrap justify-center">
                    {cartelera && cartelera.map((item,index) => (
                        <Link to={`/carteleras/show/${item._id}`} key={index} className={`flex w-[34rem] shadow-xl gap-3 rounded-2xl p-4 items-center ${background} hover:scale-95 duration-300`}>
                            <img src={item.image} className="w-[10rem] h-[10rem] object-cover rounded-tr-3xl flex-1 border-[1px]"/>
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
            }
        </div>
    )
}

export default Carteleras