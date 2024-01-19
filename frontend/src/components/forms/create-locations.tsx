import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { Link, useNavigate } from 'react-router-dom';

import AddLocation from '../location/map';
import { FormLocationProps } from '../../interfaces/common'
import Loading from '../loading';
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"

import { AiOutlineMail } from 'react-icons/ai';
import { FcGlobe, FcUndo } from 'react-icons/fc';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { BiCategory, BiParty } from 'react-icons/bi';
import { BsPinMap } from 'react-icons/bs';
import { FaRegBuilding } from 'react-icons/fa';
import { MdOutlineDoorFront, MdOutlineFoodBank, MdOutlineLightbulb, MdOutlineLocalHotel } from 'react-icons/md';
import { PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiPhone, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import DropFileInput from '../drop-file-input';


const LocationForm = ({type, register, setValue, formLoading, handleSubmit, onFinishHandler, fileRemove, onFileDrop, photoList, fileList} : FormLocationProps) => {
       
    // location
    const [location, setLocation] = useState({ lng:-101.1923185, lat:19.702423 })

    const navigate = useNavigate();
    const translate = useTranslate();

    // Cambiar a minúsculas
    const handleInputChange = (event:any) => {
        event.target.value = event.target.value.toLowerCase();
    };

    // Category
    const categoryList = [
        { value: "parque", name: translate("forms.createLocation.fields.category.park","Parques"), icon: <PiPark /> },
        { value: "via", name: translate("forms.createLocation.fields.category.roads","Vías"), icon: <PiRoadHorizon /> },
        { value: "arquitectura", name: translate("forms.createLocation.fields.category.architecture","Arquitectura"), icon: <PiBank /> },
        { value: "industria", name: translate("forms.createLocation.fields.category.industry","Industria"), icon: <PiFactory /> },
        { value: "entretenimiento", name: translate("forms.createLocation.fields.category.entretainment","Entretenimiento"), icon: <PiMaskHappy /> },
        { value: "cultura", name: translate("forms.createLocation.fields.category.culture","Cultura"), icon: <PiPalette /> },
        { value: "salud", name: translate("forms.createLocation.fields.category.health","Salud"), icon: <PiHeartbeatBold /> },
        { value: "comercio", name: translate("forms.createLocation.fields.category.trade","Comercio"), icon: <PiBag /> },
        { value: "deportes", name: translate("forms.createLocation.fields.category.sports","Deportes"), icon: <PiDribbbleLogo /> },
        { value: "naturaleza", name: translate("forms.createLocation.fields.category.nature","Naturaleza"), icon: <PiMountains /> },
        { value: "recreación", name: translate("forms.createLocation.fields.category.recreation","Recreación"), icon: <PiMartini /> },
        { value: "oficinas", name: translate("forms.createLocation.fields.category.offices","Oficinas"), icon: <PiSuitcase /> },
        { value: "hoteles", name: translate("forms.createLocation.fields.category.hotels","Hoteles"), icon: <MdOutlineLocalHotel /> },
        { value: "restaurantes", name: translate("forms.createLocation.fields.category.restaurants","Restaurantes"), icon: <MdOutlineFoodBank /> },
    ];

    // Logo
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;

    useEffect(() => {
        setValue('latitude',location.lat)
        setValue('longitude',location.lng)
    }, [setValue, location]);


    if(formLoading) {
        return <Loading />
    }

    return (
        <Box className="flex gap-4 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
            <div className='flex justify-between w-full'>
                <div className="flex gap-4 items-center">
                    <Link to="/locaciones" className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcUndo className="text-3xl"/>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("forms.createLocation.title", "Nueva locación")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                    <FcGlobe className="text-3xl"/>
                </div>
            </div>
{/* ------------- Name */}
            <TextField
                {...register("name", {
                    required: true,
                })}
                id="name"
                name="name"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.name.label","Nombre")}
                placeholder={translate("forms.createLocation.fields.name.placeholder", "Escribe el nombre aquí")}
                InputProps={{
                startAdornment: <IoLocationOutline className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Category */}
            <Select
                {...register('category', {
                    required: true
                })}
                sx={{ width: "100%"}}
                color="info"
                displayEmpty
                defaultValue=""
                inputProps={{ "aria-label" : "Whithouth label"}}
            >
                <MenuItem value="" disabled className='flex gap-2'>
                    <Box display="flex" alignItems="center" gap={2}>
                        <BiCategory />
                        <span>{translate( "forms.createLocation.fields.category.placeholder","Nombre")}</span>
                    </Box>
                </MenuItem>
                {categoryList.map((item,index) => (
                    <MenuItem value={item.value} key={index} className='flex gap-2'>
                        <Box display="flex" alignItems="center" gap={2}>
                            {item.icon}
                            <span>{item.name}</span>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
            <h2 className='font-medium text-xl mt-2'>
                {translate( "forms.createLocation.subtitle.contact","Contacto")}
            </h2>
{/* ------------- Phone */}
            <TextField
                {...register("phone")}
                id="phone"
                name="phone"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.phone.label","Teléfono")}
                placeholder={translate( "forms.createLocation.fields.phone.placeholder","Escribe aquí el teléfono")}
                InputProps={{
                startAdornment: <PiPhone className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Email */}
            <TextField
                {...register("email")}
                id="email"
                name="email"
                fullWidth
                margin="normal"
                label={translate( "forms.createLocation.fields.email.label","Correo")}
                placeholder={translate("forms.createUsers.fields.email.placeholder", "Escribe aquí el correo")}
                InputProps={{
                startAdornment: <AiOutlineMail className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
                onChange={handleInputChange}
            />
            <h2 className='font-medium text-xl mt-2'>
                {translate( "forms.createLocation.subtitle.location","Ubicación")}
            </h2>
{/* ------------- Address */}
            <TextField
                {...register("address", {
                    required: true,
                })}
                id="address"
                name="address"
                fullWidth
                margin="normal"
                label={translate( "forms.createLocation.fields.address.label","Dirección")}
                placeholder={translate("forms.createUsers.fields.address.placeholder", "Escribe la dirección completa")}
                InputProps={{
                startAdornment: <BsPinMap className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Coordinates */}
            <h2 className='font-light'>
                {translate( "forms.createLocation.subtitle.coordinates","Coordenadas")}
            </h2>
            <AddLocation location={location} setLocation={setLocation}/>
            <h2 className='font-medium text-xl mt-2'>
                {translate( "forms.createLocation.subtitle.information","Información")}
            </h2>
{/* ------------- Tiempo */}
            <TextField
                {...register("time")}
                id="time"
                name="time"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.time.label","Horarios")}
                placeholder={translate( "forms.createLocation.fields.time.placeholder","Escribe aquí los horarios")}
                InputProps={{
                startAdornment: <IoTimeOutline className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Servicios */}
            <TextField
                {...register("services")}
                id="services"
                name="services"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.services.label","Servicios")}
                placeholder={translate( "forms.createLocation.fields.services.placeholder","Escribe aquí los servicios")}
                InputProps={{
                startAdornment: <MdOutlineLightbulb className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Infraestructura */}
            <TextField
                {...register("infrastructure")}
                id="infrastructure"
                name="infrastructure"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.infrastructure.label","Infraestructura")}
                placeholder={translate( "forms.createLocation.fields.infrastructure.placeholder","Escribe aquí la infraestructura")}
                InputProps={{
                startAdornment: <FaRegBuilding className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Actividades de temporada */}
            <TextField
                {...register("seasons")}
                id="seasons"
                name="seasons"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.seasons.label","Actividades de temporada")}
                placeholder={translate( "forms.createLocation.fields.seasons.placeholder","Escribe aquí si hay actividades de temporada")}
                InputProps={{
                startAdornment: <BiParty className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Accesos */}
            <TextField
                {...register("access")}
                id="access"
                name="access"
                margin="normal"
                fullWidth
                label={translate( "forms.createLocation.fields.access.label","Accesos")}
                placeholder={translate( "forms.createLocation.fields.access.placeholder","Escribe los accesos")}
                InputProps={{
                startAdornment: <MdOutlineDoorFront className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Fotos */}
            <DropFileInput
                fileList={fileList}
                fileRemove={fileRemove}
                onFileDrop={onFileDrop}
                photoList={photoList}
            />
{/* ------------- Botón de enviar */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                {translate("forms.createLocation.title", "Nueva locación")}
            </Button>
        </Box>
    )
}

export default LocationForm