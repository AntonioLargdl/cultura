import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { Link, useNavigate } from 'react-router-dom';

import { FormLocationProps } from '../../interfaces/common'
import Loading from '../loading';
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"

import { AiOutlineMail } from 'react-icons/ai';
import { FcFilmReel, FcUndo } from 'react-icons/fc';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { BiCategory, BiParty } from 'react-icons/bi';
import { BsPinMap } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedin, FaRegBuilding, FaRegUser, FaTiktok, FaYoutube } from 'react-icons/fa';
import { MdOutlineDoorFront, MdOutlineFoodBank, MdOutlineLightbulb, MdOutlineLocalHotel } from 'react-icons/md';
import { PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiPersonArmsSpread, PiPhone, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import DropFileInput from '../drop-file-input';
import { RiTeamLine } from 'react-icons/ri';
import { IoIosCalendar } from 'react-icons/io';
import { GiBodyHeight } from 'react-icons/gi';
import { TbWeight } from 'react-icons/tb';
import { TfiWorld } from 'react-icons/tfi';


const DirectoryForm = ({type, register, setValue, formLoading, handleSubmit, onFinishHandler, fileRemove, onFileDrop, photoList, fileList} : FormLocationProps) => {
       
    // type
    const [profileType, setProfileType] = useState('')

    const navigate = useNavigate();
    const translate = useTranslate();

    // Cambiar a minúsculas
    const handleInputChange = (event:any) => {
        event.target.value = event.target.value.toLowerCase();
    };

    // Logo
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;

    useEffect(() => {
        setValue('type', profileType)
    }, [setValue, profileType]);


    if(formLoading) {
        return <Loading />
    }

    return (
        <Box className="flex gap-4 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
            <div className='flex justify-between w-full'>
                <div className="flex gap-4 items-center">
                    <Link to="/directorios" className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcUndo className="text-3xl"/>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">Nuevo Perfil</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                    <FcFilmReel className="text-3xl"/>
                </div>
            </div>
{/* ------------- Type hover:bg- */}
            <div className='p-2 flex md:gap-3 gap-2 md:p-4 items-center justify-center w-full'>                
                <button type='button' onClick={() => setProfileType('talento')} className={`w-[7rem] md:w-[14rem] flex justify-center items-center md:gap-2 gap-1 border-[1px] shadow-xl py-5 rounded-2xl  hover:bg-[#67B7F7] hover:text-white  hover:font-medium duration-300 ${profileType === 'talento' && 'bg-[#1876D2] text-white font-medium'}`}>
                    <PiPersonArmsSpread className='text-xl'/>
                    <p className='md:text-lg text-sm uppercase tracking-wider'>Talento</p>
                </button>
                <button type='button' onClick={() => setProfileType('crew')} className={`w-[7rem] md:w-[14rem] flex justify-center items-center md:gap-2 gap-1 border-[1px] shadow-xl py-5 rounded-2xl hover:bg-[#67B7F7] hover:text-white  hover:font-medium duration-300 ${profileType === 'crew' && 'bg-[#1876D2] text-white font-medium'}`}>
                    <RiTeamLine className='text-xl'/>
                    <p className='md:text-lg text-sm uppercase tracking-wider'>Crew</p>
                </button>
                <button type='button' onClick={() => setProfileType('servicios')} className={`w-[7rem] md:w-[14rem] justify-center flex items-center md:gap-2 gap-1 border-[1px] shadow-xl py-5 rounded-2xl  hover:bg-[#67B7F7] hover:text-white  hover:font-medium duration-300 ${profileType === 'servicios' && 'bg-[#1876D2] text-white font-medium'}`}>
                    <PiSuitcase className='text-xl'/>
                    <p className='md:text-lg text-sm uppercase tracking-wider'>Servicios</p>
                </button>
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
                label={`Nombre *`}
                placeholder={`Escribe el nombre aquí`}
                InputProps={{
                startAdornment: <FaRegUser className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Photos */}
            <DropFileInput
                fileList={fileList}
                fileRemove={fileRemove}
                onFileDrop={onFileDrop}
                photoList={photoList}
            />
{/* ------------- Semblanza */}
            <TextField
                {...register("semblanza", {
                    required: true,
                })}
                id="semblanza"
                name="semblanza"
                margin="normal"
                fullWidth
                label={`Semblanza / Descripción *`}
                placeholder={`Escribe la descripción aquí`}
                InputProps={{
                startAdornment: <FaRegUser className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
            { profileType === 'talento' &&
            <div className='w-full flex md:gap-4 gap-3'>
{/* ------------- Edad */}
                <TextField
                    {...register("edad", {
                        required: true,
                    })}
                    id="edad"
                    name="edad"
                    margin="normal"
                    fullWidth
                    type='number'
                    label={`Edad`}
                    placeholder={`Edad`}
                    InputProps={{
                    startAdornment: <IoIosCalendar className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />  
{/* ------------- Altura */}
                <TextField
                    {...register("altura", {
                        required: true,
                    })}
                    id="altura"
                    name="altura"
                    margin="normal"
                    fullWidth
                    type='number'
                    label={`Altura`}
                    placeholder={`(cm)`}
                    InputProps={{
                    startAdornment: <GiBodyHeight className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />
{/* ------------- Peso */}
                <TextField
                    {...register("peso", {
                        required: true,
                    })}
                    id="peso"
                    name="peso"
                    margin="normal"
                    fullWidth
                    type='number'
                    label={`Peso`}
                    placeholder={`(kg)`}
                    InputProps={{
                    startAdornment: <TbWeight className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />                        
            </div>
            }
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
            <div className='w-full flex md:gap-4 gap-3'>
{/* ------------- Youtube */}
            <TextField
                {...register("youtube")}
                id="youtube"
                name="youtube"
                fullWidth
                margin="normal"
                label="Portafolio"
                placeholder="Enlace de youtube con vídeo portafolio"
                InputProps={{
                startAdornment: <FaYoutube className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
                onChange={handleInputChange}
            />                
{/* ------------- Linkedin */}
                <TextField
                    {...register("linkedin")}
                    id="linkedin"
                    name="linkedin"
                    fullWidth
                    margin="normal"
                    label="Linkedin"
                    placeholder="Enlace del perfil"
                    InputProps={{
                    startAdornment: <FaLinkedin className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />
{/* ------------- Web */}
                <TextField
                    {...register("web")}
                    id="web"
                    name="web"
                    fullWidth
                    margin="normal"
                    label="Página web"
                    placeholder="Escribe aquí el enlace"
                    InputProps={{
                    startAdornment: <TfiWorld className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />
            </div>
            <div className='w-full flex md:gap-4 gap-3'>
{/* ------------- Facebook */}
                <TextField
                    {...register("fb")}
                    id="fb"
                    name="fb"
                    fullWidth
                    margin="normal"
                    label="Facebook"
                    placeholder="Enlace del perfil"
                    InputProps={{
                    startAdornment: <FaFacebookF className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />
{/* ------------- Instagram */}
                <TextField
                    {...register("ig")}
                    id="ig"
                    name="ig"
                    fullWidth
                    margin="normal"
                    label="Instagram"
                    placeholder="Enlace del perfil"
                    InputProps={{
                    startAdornment: <FaInstagram className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />
{/* ------------- Tiktok */}
                <TextField
                    {...register("tiktok")}
                    id="tiktok"
                    name="tiktok"
                    fullWidth
                    margin="normal"
                    label="TikTok"
                    placeholder="Enlace del perfil"
                    InputProps={{
                    startAdornment: <FaTiktok className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />
            </div>
{/* ------------- Botón de enviar */}
            { profileType !== '' &&
                <div className='w-full'>                    
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                        Crear Perfil
                    </Button>
                </div>
            }
        </Box>
    )
}

export default DirectoryForm