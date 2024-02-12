import { useGetIdentity, useGetLocale, useTranslate } from "@refinedev/core"
import { FcEditImage } from "react-icons/fc";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { BlogProps, IUser } from "../../interfaces/common";
import { useEffect, useState } from "react";

import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import axios from "axios";
import Lottie from "react-lottie";
import { PiCalendar, PiMapPin, PiNewspaper } from "react-icons/pi";

const Blogs = () => {
    const [blog, setBlog] = useState<BlogProps[] | null>(null)
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    // User Rol
    const { data: user } = useGetIdentity<IUser>();
    //  Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://culltura.onrender.com/api/v1/blog/user/${user?.username}}`);
                setEmpty(false)
                setBlog(response.data);
                setLoading(false)
            } catch (error) {
                setEmpty(true)
                setLoading(false)
                console.error('Error al obtener datos:', error);
            }
        };
        const fetchAllData = async () => {
            try {
                const response = await axios.get('https://culltura.onrender.com/api/v1/blog');
                setEmpty(false)
                setBlog(response.data);
                setLoading(false)
            } catch (error) {
                setEmpty(true)
                setLoading(false)
                console.error('Error al obtener datos:', error);
            }
        };
        if(user?.rol !== 'admin'){
            fetchData();
        } else {
            fetchAllData();
        }
    }, [user]);
    // Translate
    const translate = useTranslate();
    const locale = useGetLocale();
    const currentLocale = locale();
    // Formatear Fecha
    function formatearFecha(fechaString: string) {
        const fecha = new Date(fechaString);
        const fechaFormateada = fecha.toLocaleDateString();
        return fechaFormateada;
    }
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Lottie
    const defaultOptions = {
        loop: true, 
        autopaly: true,
        animationData: LoadingAnimation
    }

    return (
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                        <FcEditImage className="text-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-xl">{translate("pages.blog.title", "Blogs")}</h1>
                    <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                </div>
            </div>
            <Link to="/blog/create">
                <Button type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                    {translate("pages.directories.button")}
                </Button>
            </Link>
            <div className="flex flex-wrap gap-4 mt-10 items-center justify-center">
                { loading ? 
                    <div className='max-w-sm mt-10 ml-auto mr-auto'>
                        <Lottie options={defaultOptions}/>
                    </div>
                    : empty && !loading ?
                    <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                        <PiNewspaper className='text-6xl'/>
                        <p className='font-light text-center'>Aún no has creado ninguna nota</p>
                    </div>
                    : blog && blog.map((item, index) => (
                        <Link to={`/blog/show/${item._id}`} key={index} className={`${background} shadow-2xl max-w-[20rem] rounded-2xl relative hover:scale-95 duration-300`}>
                            <img src={item.image} alt={item._id} className='w-[20rem] max-h-[12rem] rounded-t-2xl object-cover'/>
                            <div className='p-4 flex flex-col gap-2 items-start'>
                                <h2 className='font-semibold'>{currentLocale === 'fr' ? item.title.fr : currentLocale === 'en' ? item.title.en : item.title.es}</h2>
                                <div className='flex justify-between w-full'>
                                    <div className='flex items-center gap-1'>
                                        <PiCalendar className='text-xl'/>
                                        <p className='font-extralight'>{formatearFecha(item.date)}</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <PiMapPin className='text-xl'/>
                                        <p className='font-extralight'>{item.place}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Blogs