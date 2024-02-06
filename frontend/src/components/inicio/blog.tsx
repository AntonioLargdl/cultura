import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BlogProps, CategoriaProps } from '../../interfaces/common';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { format } from 'date-fns';
import { useGetLocale, useTranslate } from '@refinedev/core';
import { PiCalendar, PiMapPin } from 'react-icons/pi';

const BlogsLanding = () => {
    const [blogs, setBlogs] = useState<BlogProps[]>([])
    const [categorias, setCategorias] = useState<CategoriaProps[]>([])
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
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';

    return (
        <div className='lg:p-8 p-4'>
            <div className='flex lg:gap-2 gap-8 items-start justify-evenly flex-wrap lg:flex-nowrap'>
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
                <div className={`${background} shadow-xl p-6 rounded-xl max-w-[22rem] lg:block hidden`}>
                    { categorias &&
                    <div className='flex flex-col justify-between h-full'>
                        <div>
                            <h2 className='font-semibold text-2xl'>Categorías</h2>
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
                            Ver más
                        </Link>
                    </div>
                    }
                </div>
            </div>
            <div className='flex justify-center items-center mt-10 lg:hidden'>
                <Link to='/inicio/blog' className='bg-[#8657b6] text-white px-6 py-4 rounded-xl hover:bg-[#6a4590] duration-300 hover:scale-95 ml-auto mr-auto'>
                    Ver más
                </Link>
            </div>
        </div>
    )
}

export default BlogsLanding