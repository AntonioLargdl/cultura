import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { Link, useNavigate } from 'react-router-dom';

import { FormLocationProps } from '../../interfaces/common'
import Loading from '../loading';
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"

import { AiOutlineMail } from 'react-icons/ai';
import { FcFilmReel, FcUndo } from 'react-icons/fc';
import { FaFacebookF, FaInstagram, FaLinkedin, FaRegUser, FaTiktok, FaYoutube } from 'react-icons/fa';
import {  PiPersonArmsSpread, PiPhone } from 'react-icons/pi';  
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

    // Servicios
    const ServiceList = [
        { value: "script", text: translate("forms.createDirectory.category.script") },
        { value: "rights", text: translate("forms.createDirectory.category.rights") },
        { value: "translators", text: translate("forms.createDirectory.category.translators") },
        { value: "creative", text: translate("forms.createDirectory.category.creative") },
        { value: "casting", text: translate("forms.createDirectory.category.casting") },
        { value: "academies", text: translate("forms.createDirectory.category.academies") },
        { value: "actors", text: translate("forms.createDirectory.category.actors") },
        { value: "voice", text: translate("forms.createDirectory.category.voice") },
        { value: "models", text: translate("forms.createDirectory.category.models") },
        { value: "production", text: translate("forms.createDirectory.category.production") },
        { value: "direction", text: translate("forms.createDirectory.category.direction") },
        { value: "photography", text: translate("forms.createDirectory.category.photography") },
        { value: "design", text: translate("forms.createDirectory.category.design") },
        { value: "makeup", text: translate("forms.createDirectory.category.makeup") },
        { value: "technicalServices", text: translate("forms.createDirectory.category.technicalServices") },
        { value: "productionHouses", text: translate("forms.createDirectory.category.productionHouses") },
        { value: "catering", text: translate("forms.createDirectory.category.catering") },
        { value: "studios", text: translate("forms.createDirectory.category.studios") },
        { value: "insurance", text: translate("forms.createDirectory.category.insurance") },
        { value: "locations", text: translate("forms.createDirectory.category.locations") },
        { value: "generalServices", text: translate("forms.createDirectory.category.generalServices") },
        { value: "postProduction", text: translate("forms.createDirectory.category.postProduction") },
        { value: "visualEffects", text: translate("forms.createDirectory.category.visualEffects") },
        { value: "labs", text: translate("forms.createDirectory.category.labs") },
        { value: "sound", text: translate("forms.createDirectory.category.sound") },
        { value: "advertising", text: translate("forms.createDirectory.category.advertising") },
        { value: "distribution", text: translate("forms.createDirectory.category.distribution") },
    ];

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
                        <h1 className="font-semibold text-xl">{translate("forms.createDirectory.title")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                    <FcFilmReel className="text-3xl"/>
                </div>
            </div>
{/* ------------- Type hover:bg- */}
            <div className='p-2 flex md:gap-3 gap-2 md:p-4 items-center justify-center w-full'>                
                <button type='button' onClick={() => setProfileType('talento')} className={`w-[10rem] md:w-[14rem] flex justify-center items-center md:gap-2 gap-1 border-[1px] shadow-xl py-5 rounded-2xl  hover:bg-[#67B7F7] hover:text-white  hover:font-medium duration-300 ${profileType === 'talento' && 'bg-[#1876D2] text-white font-medium'}`}>
                    <PiPersonArmsSpread className='text-xl'/>
                    <p className='md:text-lg text-sm uppercase tracking-wider'>{translate("forms.createDirectory.buttons.talent")}</p>
                </button>
                <button type='button' onClick={() => setProfileType('crew')} className={`w-[10rem] md:w-[14rem] flex justify-center items-center md:gap-2 gap-1 border-[1px] shadow-xl py-5 rounded-2xl hover:bg-[#67B7F7] hover:text-white  hover:font-medium duration-300 ${profileType === 'crew' && 'bg-[#1876D2] text-white font-medium'}`}>
                    <RiTeamLine className='text-xl'/>
                    <p className='md:text-lg text-sm uppercase tracking-wider'>{translate("forms.createDirectory.buttons.crew")}</p>
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
                label={translate("forms.createDirectory.fields.name.label")}
                placeholder={translate("forms.createDirectory.fields.name.placeholder")}
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
                {...register("es", {
                    required: true,
                })}
                id="es"
                name="es"
                margin="normal"
                fullWidth
                label={translate("forms.createDirectory.fields.semblanza.label")}
                placeholder={translate("forms.createDirectory.fields.semblanza.placeholder")}
                InputProps={{
                startAdornment: <FaRegUser className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />      
{/* ------------- Services */}
            { profileType === 'crew' &&
                <div>
                    <h2 className='font-medium text-xl mt-2 w-full'>
                        {translate( "forms.createLocation.fields.services.label")}
                    </h2> 
                    <div className='flex gap-2 flex-wrap'>
                        {ServiceList.map((item, index) => (
                            <FormGroup key={index}>
                                <FormControlLabel control={<Checkbox {...register(item.value)}/>} label={item.text} />
                            </FormGroup>
                        ))}   
                    </div>
                </div>
            }
{/* ------------- Edad */}
            { profileType === 'talento' &&
            <div className='w-full flex md:gap-4 gap-3'>
                <TextField
                    {...register("age", {
                        required: true,
                    })}
                    id="age"
                    name="age"
                    margin="normal"
                    fullWidth
                    type='number'
                    label={translate("forms.createDirectory.fields.age.label")}
                    placeholder={translate("forms.createDirectory.fields.age.placeholder")}
                    InputProps={{
                    startAdornment: <IoIosCalendar className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />  
{/* ------------- Altura */}
                <TextField
                    {...register("height", {
                        required: true,
                    })}
                    id="height"
                    name="height"
                    margin="normal"
                    fullWidth
                    type='number'
                    label={translate("forms.createDirectory.fields.height.label")}
                    placeholder={translate("forms.createDirectory.fields.height.placeholder")}
                    InputProps={{
                    startAdornment: <GiBodyHeight className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />
{/* ------------- Peso */}
                <TextField
                    {...register("weight", {
                        required: true,
                    })}
                    id="weight"
                    name="weight"
                    margin="normal"
                    fullWidth
                    type='number'
                    label={translate("forms.createDirectory.fields.weight.label")}
                    placeholder={translate("forms.createDirectory.fields.weight.placeholder")}
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
                label={translate("forms.createDirectory.fields.portfolio.label")}
                placeholder={translate("forms.createDirectory.fields.portfolio.placeholder")}
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
                    label={translate("forms.createDirectory.fields.linkedin.label")}
                    placeholder={translate("forms.createDirectory.fields.linkedin.placeholder")}
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
                    label={translate("forms.createDirectory.fields.web.label")}
                    placeholder={translate("forms.createDirectory.fields.web.placeholder")}
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
                    label={translate("forms.createDirectory.fields.facebook.label")}
                    placeholder={translate("forms.createDirectory.fields.facebook.placeholder")}
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
                    label={translate("forms.createDirectory.fields.instagram.label")}
                    placeholder={translate("forms.createDirectory.fields.instagram.placeholder")}
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
                    label={translate("forms.createDirectory.fields.tiktok.label")}
                    placeholder={translate("forms.createDirectory.fields.tiktok.placeholder")}
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
                        {translate("forms.createDirectory.buttons.submit")}
                    </Button>
                </div>
            }
        </Box>
    )
}

export default DirectoryForm