import FooterInicio from "../../components/inicio/footerMain"
import { HeaderInicio } from "../../components/inicio/header"
import { Link, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import { useTheme } from '@mui/material';
import { PiCalendar, PiMapPin, PiNewspaper } from 'react-icons/pi';
import { useGetLocale, useOne, useTranslate } from '@refinedev/core';

import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import cityBlack from '../../assets/ciudad.webp';
import cityWhite from '../../assets/ciudad_white.webp';
import { useEffect, useState } from "react";
import { BlogProps, CategoriaProps } from "../../interfaces/common";
import Loading from "../../components/loading";
import ErrorPage from "../../components/error";

const CategoriasInicio = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
      resource: "categorias/all",
      id: id as string,
  });

  const categorias = data?.data[0] as CategoriaProps
  console.log(categorias)

  const [empty, setEmpty] = useState(true);
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
      <div className='lg:mx-20 md:mx-6 mx-5 md:mt-28 mt-24 mb-10 min-h-[55vh]'>
        <h1 className='text-4xl font-semibold'>
          {currentLocale === 'fr' ? categorias?.name.fr : currentLocale === 'en' ? categorias?.name.en : categorias?.name.es}
        </h1>
        <h2 className='text-xl font-light mt-2 mb-5'>{translate("pages.creative.footer")}</h2>
        { categorias.blogs.length === 0 ?
          <div className='flex flex-col gap-4 items-center justify-center mt-10'>
            <PiNewspaper className='text-6xl'/>
            <p className='font-light text-center'>{translate("pages.landing.not")}</p>
          </div>
          :
          <div className='flex gap-7 flex-wrap'>
            { categorias.blogs.map((item, index) => (
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
              ))
            }
          </div>
        }
        <div className="flex mt-10">
          <Link to='/inicio/blog' className='bg-[#8657b6] text-white px-6 py-4 rounded-xl hover:bg-[#6a4590] duration-300 hover:scale-95'>
            <p className='text-center'>{translate("pages.landing.more")}</p>
          </Link>
        </div>
      </div>
      <FooterInicio />
    </div>
  )
}

export default CategoriasInicio