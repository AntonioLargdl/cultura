import { useGetLocale, useOne, useTranslate } from '@refinedev/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../../components/error';
import Loading from '../../components/loading';
import { useTheme } from '@mui/material';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { BlogProps, CategoriaProps } from '../../interfaces/common';
import { PiCalendar, PiMapPin } from 'react-icons/pi';
import { HeaderInicio } from '../../components/inicio/header';
import cityBlack from '../../assets/ciudad.webp';
import cityWhite from '../../assets/ciudad_white.webp';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogShow = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "blog/show",
        id: id as string,
    });

    const [categorias, setCategorias] = useState<CategoriaProps[]>([])
    const [blogs, setBlogs] = useState<BlogProps[]>([])
    const blog = (data?.data as unknown) as BlogProps ?? []
    // Translation
    const translate = useTranslate();
    // Translate
    const locale = useGetLocale();
    const currentLocale = locale();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const city = theme.palette.mode === 'dark' ? cityWhite : cityBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Navigate
    const navigate = useNavigate()
    // Formatear Fecha
    function formatearFecha(fechaString: string) {
        const fecha = new Date(fechaString);
        const fechaFormateada = fecha.toLocaleDateString();
        return fechaFormateada;
    }

    //  Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogsResponse, categoriasResponse] = await Promise.all([
                    axios.get('https://culltura.onrender.com/api/v1/blog/recent'),
                    axios.get('https://culltura.onrender.com/api/v1/categorias/recent')
                  ]);
                  const blogsData = blogsResponse.data;
                  const categoriasData = categoriasResponse.data;
                  setBlogs(blogsData);
                  setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    if(isLoading) {
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
            <HeaderInicio />
            <div className='flex gap-10 justify-center mb-10 md:mt-28 mt-24 lg:mx-20 flex-wrap'>
                {/* Cuerpo de la noticia */}
                <div className={`${background} max-w-[50rem] p-2 rounded-2xl mx-2`}>
                    <img src={blog.image} alt={blog.title.es} className='w-[50rem] rounded-2xl'/>
                    <div className='p-4'>
                        <h1 className='font-semibold text-2xl'>
                            {currentLocale === 'fr' ? blog.title.fr : currentLocale === 'en' ? blog.title.en : blog.title.es}
                        </h1>
                        <p className='font-light mt-2'>{blog.author[0].name}</p>
                        <div className='flex justify-between w-full mt-2'>
                            <div className='flex items-center gap-1'>
                                <PiCalendar className='text-xl'/>
                                <p className='font-extralight'>{formatearFecha(blog.date)}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <PiMapPin className='text-xl'/>
                                <p className='font-extralight'>{blog.place}</p>
                            </div>
                        </div>
                        <p className='mt-4 font-light leading-9'>
                            {currentLocale === 'fr' ? blog.content.fr : currentLocale === 'en' ? blog.content.en : blog.content.es}
                        </p>
                    </div>
                </div>
                {/* Categorías */}
                <div className='flex flex-col gap-7'>
                    <img src={city} alt='siente la cultura' className='w-56 mb-5'/>
                    <div className={`${background} shadow-xl p-6 rounded-xl max-w-[22rem] lg:block`}>
                        { categorias &&
                            <div className='flex flex-col justify-between h-full'>
                                <div>
                                    <h2 className='font-semibold text-2xl'>{translate("pages.landing.categories")}</h2>
                                    <div className='flex flex-col gap-2 my-2 mb-8'>
                                        { categorias.map((item,index) => (
                                            <Link to={`/inicio/blog/${item._id}`} key={index}>
                                                <p className='font-light text-lg'>{currentLocale === 'fr' ? item.name.fr : currentLocale === 'en' ? item.name.en : item.name.es}</p>
                                                <div className='h-[1px] w-full border-[1px] mt-2'/>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <Link to='/inicio/blog' className='bg-[#8657b6] text-white px-6 py-4 rounded-xl hover:bg-[#6a4590] duration-300 hover:scale-95'>
                                    <p className='text-center'>{translate("pages.landing.more")}</p>
                                </Link>
                            </div>
                        }
                    </div>
                    <h2 className='text-2xl font-semibold'>{translate("pages.landing.news")}</h2>
                    {blogs && blogs.map((item, index) => (
                        <Link to={`/inicio/blog/show/${item._id}`} key={index} className={`${background} shadow-2xl max-w-[20rem] rounded-2xl relative hover:scale-95 duration-300`}>
                            <img src={item.image} alt={item._id} className='w-[20rem] rounded-t-2xl'/>
                            <div className='p-4 flex flex-col gap-2 items-start'>
                                <h2 className='font-semibold text-lg'>{currentLocale === 'fr' ? item.title.fr : currentLocale === 'en' ? item.title.en : item.title.es}</h2>
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
                            <p className='absolute top-4 right-4 font-semibold bg-white px-3 py-2 text-sm rounded-lg border-[1px] border-[#8657b6] text-[#8657b6]'> {currentLocale === 'fr' ? item.category[0].name.fr : currentLocale === 'en' ? item.category[0].name.en : item.category[0].name.es} </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogShow