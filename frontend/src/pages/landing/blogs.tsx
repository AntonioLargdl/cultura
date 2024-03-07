import { useEffect, useState } from 'react'
import { BlogProps, CategoriaProps } from '../../interfaces/common';
import { useGetLocale, useTranslate } from '@refinedev/core';
import axios from 'axios';
import { HeaderInicio } from '../../components/inicio/header';
import FooterInicio from '../../components/inicio/footerMain';
import { useTheme } from '@mui/material';
import cityBlack from '../../assets/ciudad.webp';
import cityWhite from '../../assets/ciudad_white.webp';
import { Link } from 'react-router-dom';
import { PiCalendar, PiMapPin } from 'react-icons/pi';
import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import Lottie from 'react-lottie';

const BlogsInicio = () => {
  const [categorias, setCategorias] = useState<CategoriaProps[]>([])
  const [blogs, setBlogs] = useState<BlogProps[]>([])

  const [loading, setLoading] = useState(true);
  // Translation
  const translate = useTranslate();
  // Translate
  const locale = useGetLocale();
  const currentLocale = locale();
  // Theme
  const theme = useTheme();
  const city = theme.palette.mode === 'dark' ? cityWhite : cityBlack;
  const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;
  const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
  // Formatear Fecha
  function formatearFecha(fechaString: string) {
    const fecha = new Date(fechaString);
    const fechaFormateada = fecha.toLocaleDateString();
    return fechaFormateada;
  }
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
            const [blogsResponse, categoriasResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/v1/blog'),
                axios.get('http://localhost:8080/api/v1/categorias')
              ]);
              const blogsData = blogsResponse.data;
              const categoriasData = categoriasResponse.data;
              setLoading(false)
              setBlogs(blogsData);
              setCategorias(categoriasData);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    fetchData();
  }, []);

  return (
    <div className='min-h-[100vh]'>
      <HeaderInicio /> 
      { loading ? 
          <div className='max-w-sm md:mt-24 mt-10 ml-auto mr-auto min-h-[60vh]'>
            <Lottie options={defaultOptions}/>
          </div>
        :
        <div className='lg:mx-20 md:mx-6 mx-5 md:mt-28 mt-24 mb-10'>
          {/* Categorías */}
          <div className='flex flex-row-reverse md:gap-8 gap-16 lg:flex-nowrap flex-wrap-reverse justify-center'>
              <div>
                <img src={city} alt='siente la cultura' className='w-56 mb-8 lg:mb-12'/>
                <div className={`${background} shadow-xl p-6 rounded-xl max-w-[22rem] lg:block`}>
                    { categorias &&
                        <div className='flex flex-col justify-between h-full'>
                            <div className='flex flex-col gap-2'>
                                <h2 className='font-semibold text-2xl'>{translate("pages.landing.categories")}</h2>
                                <div className='flex flex-col gap-2 my-2 mb-2'>
                                    { categorias.map((item,index) => (
                                        <Link to={`/inicio/blog/${item._id}`} key={index}>
                                            <p className='font-light text-lg'>{currentLocale === 'fr' ? item.name.fr : currentLocale === 'en' ? item.name.en : item.name.es}</p>
                                            <div className='h-[1px] w-full border-[1px] mt-2'/>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>
              </div>
              <div className='flex flex-col gap-8'>
                <div>
                  <h1 className='text-4xl font-semibold'>{translate("pages.landing.news")}</h1>
                  <h2 className='text-xl font-light'>{translate("pages.creative.footer")}</h2>
                </div>
                <div className='flex gap-10 flex-wrap lg:justify-between justify-center'>
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
                      </Link>
                  ))}
                </div>
              </div>
          </div>
        </div>  
      }
      <FooterInicio/>
    </div>
  )
}

export default BlogsInicio