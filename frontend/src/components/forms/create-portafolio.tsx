import { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, useTheme } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { Link, useNavigate } from 'react-router-dom';

import { FormPortafolioProps } from '../../interfaces/common'
import Loading from '../loading';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"

import { AiOutlineMail } from 'react-icons/ai';
import { FcBusinessContact, FcFilmReel, FcUndo } from 'react-icons/fc';
import { FaAmazon, FaApple, FaFacebookF, FaInstagram, FaLinkedin, FaRegUser, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import {  PiPersonArmsSpread, PiPhone } from 'react-icons/pi';  
import DropFileInput from '../drop-file-input';
import { RiTeamLine } from 'react-icons/ri';
import { IoIosCalendar } from 'react-icons/io';
import { GiBodyHeight, GiMusicalScore } from 'react-icons/gi';
import { TbWeight } from 'react-icons/tb';
import { TfiWorld } from 'react-icons/tfi';
import { BiCategory } from 'react-icons/bi';
import { MdLibraryMusic } from 'react-icons/md';
import { IoTrophy } from 'react-icons/io5';
import { GrDocumentPdf } from 'react-icons/gr';
import { FaCirclePlay } from 'react-icons/fa6';


const PortafolioForm = ({type, register, setValue, formLoading, handleSubmit, onFinishHandler, fileRemove, onFileDrop, photoList, fileList} : FormPortafolioProps) => {
       
    const navigate = useNavigate();
    const translate = useTranslate();

    // Cambiar a minúsculas
    const handleInputChange = (event:any) => {
        event.target.value = event.target.value.toLowerCase();
    };

    // Logo
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;

    if(formLoading) {
        return <Loading />
    }

    return (
        <Box className="flex gap-1 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
            <div className='flex justify-between w-full'>
                <div className="flex gap-4 items-center">
                    <Link to="/portafolios" className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcUndo className="text-3xl"/>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.portfolios.profile")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                    <FcBusinessContact className="text-3xl"/>
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
                label={translate("forms.createDirectory.fields.name.label")}
                placeholder={translate("forms.createDirectory.fields.name.placeholder")}
                InputProps={{
                startAdornment: <FaRegUser className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
{/* ------------- Type */}            
            <RadioGroup
                {...register("type", {
                    required: true,
                })}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="type"
            >
                <FormControlLabel value="group" control={<Radio />} label={translate("pages.portfolios.group")} />
                <FormControlLabel value="solo" control={<Radio />} label={translate("pages.portfolios.solo")} />
            </RadioGroup>
{/* ------------- Gender */}
            <TextField
                {...register("gender", {
                    required: true,
                })}
                id="gender"
                name="gender"
                margin="normal"
                fullWidth
                label={translate("pages.portfolios.fields.gender.label")}
                placeholder={translate("pages.portfolios.fields.gender.placeholder")}
                InputProps={{
                startAdornment: <MdLibraryMusic className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
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
                startAdornment: <GiMusicalScore className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            /> 
{/* ------------- CV */}
            <TextField
                {...register("esCV", {
                    required: true,
                })}
                id="esCV"
                name="esCV"
                margin="normal"
                fullWidth
                label={translate("pages.portfolios.fields.gender.label")}
                placeholder={translate("pages.portfolios.fields.gender.placeholder")}
                InputProps={{
                startAdornment: <IoTrophy className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2, mb:2 }}
            />             
{/* ------------- Photos */}
            <DropFileInput
                fileList={fileList}
                fileRemove={fileRemove}
                onFileDrop={onFileDrop}
                photoList={photoList}
            />                 
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
{/* ------------- Video */}
            <TextField
                {...register("video")}
                id="video"
                name="video"
                fullWidth
                margin="normal"
                label={translate("pages.portfolios.fields.video.label")}
                placeholder={translate("pages.portfolios.fields.video.placeholder")}
                InputProps={{
                startAdornment: <FaCirclePlay className="mx-2 text-lg"/>,
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
                    label="YouTube"
                    placeholder={translate("pages.portfolios.fields.youtube.placeholder")}
                    InputProps={{
                    startAdornment: <FaYoutube className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />                
{/* ------------- Linkedin */}
                <TextField
                    {...register("pdf")}
                    id="pdf"
                    name="pdf"
                    fullWidth
                    margin="normal"
                    label={translate("pages.portfolios.fields.pdf.label")}
                    placeholder={translate("pages.portfolios.fields.pdf.placeholder")}
                    InputProps={{
                    startAdornment: <GrDocumentPdf className="mx-2 text-lg"/>,
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
            <div className='w-full flex md:gap-4 gap-3'>
{/* ------------- Spotify */}
                <TextField
                    {...register("spotify")}
                    id="spotify"
                    name="spotify"
                    fullWidth
                    margin="normal"
                    label="Spotify"
                    placeholder={translate("forms.createDirectory.fields.tiktok.placeholder")}
                    InputProps={{
                    startAdornment: <FaSpotify className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                />    
{/* ------------- Amazon */}
                <TextField
                    {...register("amazon")}
                    id="amazon"
                    name="amazon"
                    fullWidth
                    margin="normal"
                    label="Amazon Music"
                    placeholder={translate("forms.createDirectory.fields.tiktok.placeholder")}
                    InputProps={{
                    startAdornment: <FaAmazon className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                /> 
{/* ------------- Apple */}
                <TextField
                    {...register("apple")}
                    id="apple"
                    name="apple"
                    fullWidth
                    margin="normal"
                    label="Apple Music"
                    placeholder={translate("forms.createDirectory.fields.tiktok.placeholder")}
                    InputProps={{
                    startAdornment: <FaApple className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                    onChange={handleInputChange}
                /> 
            </div>
{/* ------------- Botón de enviar */}               
            <Button type="submit" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                {translate("forms.createDirectory.buttons.submit")}
            </Button>
        </Box>
    )
}

export default PortafolioForm