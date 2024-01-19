import { useTable, useTranslate } from "@refinedev/core"
import { Button, TextField, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"
import ErrorPage from "../../components/error";
import Loading from "../../components/loading";

import { FcGlobe } from "react-icons/fc";
import { PiMapPin } from "react-icons/pi";
import { MdOutlineFoodBank, MdOutlineLocalHotel } from 'react-icons/md';
import { PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import { useMemo } from "react";

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
    const { tableQueryResult: {data, isLoading, isError}, 
        current, setCurrent, 
        setPageSize, pageCount, 
        sorters, setSorters,
        filters, setFilters,
    } = useTable()
    const allLocations = data?.data ?? [];
    // Translation
    const translate = useTranslate();
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
    // Filtros
    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );
        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
        };
    }, [filters]);


    // Loading
    if(isLoading) {
        return <Loading />
    }
    // Error
    if(isError) {
        return <ErrorPage />
    } 

    return (
        <div className="lg:p-0 md:p-4 p-2">
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
            {/* <div className="mt-5">
                <TextField
                    variant="outlined"
                    color="info"
                    placeholder="Search by title"
                    value={currentFilterValues.title}
                    onChange={(e) => {
                        setFilters([
                            {
                                field: "title",
                                operator: "contains",
                                value: e.currentTarget.value
                                    ? e.currentTarget.value
                                    : undefined,
                            },
                        ]);
                    }}
                />
            </div> */}
            {/* Locations */}
            <div className="mt-5 flex flex-wrap gap-2 md:justify-start justify-center">
                {allLocations.map((item, index) => (
                    <Link key={index} to={`show/${item._id}`}>
                        <div  className={`${background} w-72 shadow-xl rounded-[20px] hover:scale-95 duration-300 p-2 relative cursor-pointer`}>
                            <img src={item.photos[0]} alt={item.name} className="rounded-[15px]"/>  
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
        </div>
    )
}

export default Locations