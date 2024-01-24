import { TextField, useTheme } from '@mui/material'
import { HeaderLocaciones } from '../../../components/comision/locaciones/header'
import { useTranslate } from '@refinedev/core'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import Carousel from '../../../components/comision/locaciones/carousel';
import LoadingAnimation from '../../../assets/loading.json';

import { IoIosSearch } from 'react-icons/io'
import { PiAperture, PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMapPin, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiPhone, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import { MdOutlineLocalHotel, MdOutlineFoodBank } from 'react-icons/md'; 
import { TbMapX } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { LocacionesProps } from '../../../interfaces/common';
import { FcGlobe } from 'react-icons/fc';


const LocacionesUser = () => {
    const [locaciones, setLocaciones] = useState<LocacionesProps[]>([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    // Search
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const filteredLocaciones = locaciones.filter((locacion) =>
        locacion.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || locacion.category === category)
    );
    // Theme
    const theme = useTheme();
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    const iconBg = theme.palette.mode === 'light' ? 'bg-white' : 'bg-black';
    // Translation
    const translate = useTranslate()
    // Category
    const categoryList = [
        { value: "", name: translate("forms.createLocation.fields.category.all","Todo"), icon: <PiAperture className='text-2xl'/> },
        { value: "parque", name: translate("forms.createLocation.fields.category.park","Parques"), icon: <PiPark className='text-2xl'/> },
        { value: "via", name: translate("forms.createLocation.fields.category.roads","Vías"), icon: <PiRoadHorizon className='text-2xl'/> },
        { value: "arquitectura", name: translate("forms.createLocation.fields.category.architecture","Arquitectura"), icon: <PiBank className='text-2xl'/> },
        { value: "industria", name: translate("forms.createLocation.fields.category.industry","Industria"), icon: <PiFactory className='text-2xl'/> },
        { value: "entretenimiento", name: translate("forms.createLocation.fields.category.entretainment","Entretenimiento"), icon: <PiMaskHappy className='text-2xl'/> },
        { value: "cultura", name: translate("forms.createLocation.fields.category.culture","Cultura"), icon: <PiPalette className='text-2xl'/> },
        { value: "salud", name: translate("forms.createLocation.fields.category.health","Salud"), icon: <PiHeartbeatBold className='text-2xl'/> },
        { value: "comercio", name: translate("forms.createLocation.fields.category.trade","Comercio"), icon: <PiBag className='text-2xl' /> },
        { value: "deportes", name: translate("forms.createLocation.fields.category.sports","Deportes"), icon: <PiDribbbleLogo className='text-2xl'/> },
        { value: "naturaleza", name: translate("forms.createLocation.fields.category.nature","Naturaleza"), icon: <PiMountains className='text-2xl'/> },
        { value: "recreación", name: translate("forms.createLocation.fields.category.recreation","Recreación"), icon: <PiMartini className='text-2xl'/> },
        { value: "oficinas", name: translate("forms.createLocation.fields.category.offices","Oficinas"), icon: <PiSuitcase className='text-2xl'/> },
        { value: "hoteles", name: translate("forms.createLocation.fields.category.hotels","Hoteles"), icon: <MdOutlineLocalHotel className='text-2xl'/> },
        { value: "restaurantes", name: translate("forms.createLocation.fields.category.restaurants","Restaurantes"), icon: <MdOutlineFoodBank className='text-2xl text-center'/> },
    ];
    const handleCategorySelect = (value: string) => {
        setCategory(value)
    };
    // Categorías
    const getCategoryIcon = (category:string) => {
        const categoryItem = categoryList.find((item) => item.value === category);
        if (categoryItem) {
            return categoryItem.icon;
        }      
        return null; 
    };
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
            const response = await axios.get('https://culltura.onrender.com/api/v1/locaciones');
            setEmpty(false)
            setLocaciones(response.data);
            setLoading(false)
          } catch (error) {
            setEmpty(true)
            setLoading(false)
            console.error('Error al obtener datos:', error);
          }
        };
        fetchData();
    }, []);

    return (
        <div className='overflow-hidden'>
            <HeaderLocaciones />
            <Link to="/cfm/locaciones/map" className='fixed z-20 bottom-7 left-1/2 transform -translate-x-1/2 hover:scale-105 duration-200'>
                <button type='button' className={`${background} shadow-xl px-6 py-4 rounded-2xl uppercase flex gap-2 items-center`}>
                    <FcGlobe className='text-xl'/>
                    <p className='text-sm'>{translate("pages.locations.maps")}</p>
                </button>
            </Link>
            <div className='w-full mt-20 px-4 pt-4'>
                <TextField
                    fullWidth
                    margin="normal"
                    label={translate("pages.locations.search.label")}
                    placeholder={translate("pages.locations.search.placeholder")}
                    InputProps={{
                    startAdornment: <IoIosSearch className="mx-2 text-lg"/>,
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mt: 2 }}
                />
            </div>
            <div className='border-b-[1px] shadow-lg'>
                <Carousel categoryList={categoryList} onSelectCategory={handleCategorySelect} />
            </div>
            { filteredLocaciones.length === 0 && !empty && !loading &&
                <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                    <TbMapX className='text-6xl'/>
                    <p className='font-light text-center'>{translate("pages.locations.error.404")}</p>
                </div>
            }
            <div className='px-4'>
                { loading ?
                    <div className='flex items-center justify-center h-full min-h-screen'>
                        <Lottie options={defaultOptions}/>
                    </div>
                    : empty ?
                    <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                        <TbMapX className='text-6xl'/>
                        <p className='font-light text-center'>{translate("pages.locations.error.401")}</p>
                    </div>
                    :
                    <div className="mt-5 flex flex-wrap gap-8 md:justify-start justify-center mb-32">
                        {filteredLocaciones.map((item, index) => (
                            <Link key={index} to={`/cfm/locaciones/${item._id}`}>
                                <div  className={`${background} md:w-64 shadow-xl rounded-[20px] hover:scale-95 duration-300 p-2 relative cursor-pointer`}>
                                    <img loading="lazy" src={item.photos[0]} alt={item.name} className="rounded-[15px] h-[15rem] w-full object-center object-cover"/>  
                                    <div className={`text-xl p-3 shadow-xl ${iconBg} rounded-lg absolute top-4 right-4 bg-opacity-80`}>
                                        {getCategoryIcon(item.category)}
                                    </div>
                                    <div className="p-3">
                                        <div className="flex">
                                            <h2 className="font-medium">{item.name}</h2>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <PiMapPin />
                                            <p className="font-light text-xs">{item.address}</p>
                                        </div>
        
                                    </div>  
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default LocacionesUser