import { useTable, useTranslate } from "@refinedev/core"
import { Button, TextField, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"
import ErrorPage from "../../components/error";
import Loading from "../../components/loading";
import LoadingAnimation from '../../assets/loading.json';
import Carousel from '../../components/comision/locaciones/carousel';

import { FcGlobe } from "react-icons/fc";
import { PiAperture, PiMapPin } from "react-icons/pi";
import { MdOutlineFoodBank, MdOutlineLocalHotel } from 'react-icons/md';
import { PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TbMapX } from "react-icons/tb";
import Lottie from "react-lottie";

// Category
const categoryList = [
    { value: "parque", icon: <PiPark /> },
    { value: "via", icon: <PiRoadHorizon /> },
    { value: "arquitectura", icon: <PiBank /> },
    { value: "industria", icon: <PiFactory /> },
    { value: "entretenimiento", icon: <PiMaskHappy /> },
    { value: "cultura", icon: <PiPalette /> },
    { value: "salud", icon: <PiHeartbeatBold /> },
    { value: "comercio", icon: <PiBag /> },
    { value: "deportes", icon: <PiDribbbleLogo /> },
    { value: "naturaleza", icon: <PiMountains /> },
    { value: "recreación", icon: <PiMartini /> },
    { value: "oficinas", icon: <PiSuitcase /> },
    { value: "hoteles", icon: <MdOutlineLocalHotel /> },
    { value: "restaurantes", icon: <MdOutlineFoodBank /> },
];

const Locations = () => {
    // Fetch Data
    const { tableQueryResult: {data, isLoading, isError} } = useTable()
    const allLocations = data?.data ?? [];
    const [category, setCategory] = useState('');
    const [empty, setEmpty] = useState(false);
    // Translation
    const translate = useTranslate();
    // Search
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const filteredLocaciones = allLocations.filter((locacion) =>
        locacion.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || locacion.category === category)
    );
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
    // Image
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    const iconBg = theme.palette.mode === 'light' ? 'bg-white' : 'bg-black';

    // Categorías
    const getCategoryIcon = (category:string) => {
        const categoryItem = categoryList.find((item) => item.value === category);
        if (categoryItem) {
          return categoryItem.icon;
        }      
        return null; // Manejar el caso en el que no se encuentra el ícono
    };
    const handleCategorySelect = (value: string) => {
        setCategory(value)
    };
    // Lottie
    const defaultOptions = {
        loop: true, 
        autopaly: true,
        animationData: LoadingAnimation
    }
    // Loading
    if(isLoading) {
        return <Loading />
    }
    // Error
    if(isError) {
        return <ErrorPage />
    } 

    return (
        <div className="lg:p-0 md:p-4 p-2 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcGlobe className="text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.locations.title", "Locaciones")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <Link to="/locaciones/create">
                    <Button  type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                        {translate("pages.locations.button","Crear nueva locación")}
                    </Button>
                </Link>
            </div>
            <div className='w-full px-4 pt-4'>
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
            { filteredLocaciones.length === 0 && !empty && !isLoading &&
                <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                    <TbMapX className='text-6xl'/>
                    <p className='font-light text-center'>{translate("pages.locations.error.404")}</p>
                </div>
            }
            <div className='px-4'>
                { isLoading ?
                    <div className='max-w-sm mt-10 ml-auto mr-auto'>
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
                            <Link key={index} to={`/locaciones/show/${item._id}`}>
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

export default Locations