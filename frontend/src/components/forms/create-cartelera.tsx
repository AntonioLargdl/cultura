import { Box, Button, TextField, useTheme } from '@mui/material';
import { FormCarteleraProps } from '../../interfaces/common'
import { useTranslate } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { PiMapPin, PiMaskHappy } from 'react-icons/pi';
import { FcAddImage, FcConferenceCall, FcPlus, FcUndo } from 'react-icons/fc';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { useState } from 'react';
import Loading from '../loading';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { es } from 'date-fns/locale/es';
import { Controller } from 'react-hook-form';

const CarteleraForm = ({type, register, setValue, formLoading, handleSubmit, handleImageChange, onFinishHandler, userImage, control} : FormCarteleraProps) => {
    const [photo, setPhoto] = useState('');
    // Translation
    const translate = useTranslate();
    // Logo
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    // Image change para preview
    const handlePreviewImage = (file: File) => {
        const reader = (readFile: File) => new Promise<string>
        ((resolve,reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.readAsDataURL(readFile);
        })
        reader(file).then((result:string) => setPhoto(result));
    };  

    if(formLoading) {
        return <Loading />
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Box className="flex gap-4 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
                <div className='flex justify-between w-full'>
                    <div className="flex gap-4 items-center">
                        <Link to="/carteleras" className="flex items-center">
                            <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                                <FcUndo className="text-3xl"/>
                            </div>
                        </Link>
                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-xl">{translate("forms.createBillboard.title")}</h1>
                            <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                        </div>
                    </div>
                    <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                        <FcPlus className="text-3xl"/>
                    </div>
                </div>
                <TextField
                    {...register("name", {
                        required: true,
                    })}
                    id="name"
                    name="name"
                    fullWidth
                    margin="normal"
                    label={translate("forms.createBillboard.fields.name.label")}
                    placeholder={translate("forms.createBillboard.fields.name.placeholder")}
                    InputProps={{
                    startAdornment: <PiMaskHappy className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />
                <TextField
                    {...register("location", {
                        required: true,
                    })}
                    id="location"
                    name="location"
                    fullWidth
                    margin="normal"
                    label={translate("forms.createBillboard.fields.location.label")}
                    placeholder={translate("forms.createBillboard.fields.location.placeholder")}
                    InputProps={{
                    startAdornment: <PiMapPin className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 2 }}
                />
                <div className='flex gap-4 flex-wrap'>
                    <Controller 
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker 
                                {...field} 
                                label={translate("forms.createBillboard.fields.date")}
                            />
                        )}
                    />
                    <Controller 
                        name="begin"
                        control={control}
                        render={({ field }) => (
                            <TimePicker 
                                {...field} 
                                label={translate("forms.createBillboard.fields.begin")}
                            />
                        )}
                    />
                    <Controller 
                        name="end"
                        control={control}
                        render={({ field }) => (
                            <TimePicker 
                                {...field} 
                                label={translate("forms.createBillboard.fields.end")}
                            />
                        )}
                    />
                </div>
                <Button component='label' fullWidth sx={{mt:2}}>
                    { photo !== "" ?
                    <div className='flex flex-col items-center justify-center rounded-md border-[1px] border-dashed border-gray-300 px-8 py-4 w-full h-full'>
                        <img src={photo} alt="animal-preview" className='rounded-lg max-h-[12rem]'/> 
                        <p className='text-gray-400 normal-case font-light text-xs text-center mt-2'>{translate("forms.createUsers.fields.image.preview","Vista previa")}</p>
                        <h1 className='normal-case text-lg'>{translate("forms.createUsers.fields.image.modify","Modificar foto")}</h1>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center rounded-md border-[1px] border-dashed border-gray-300 py-6 w-full'>
                        <FcAddImage className='text-5xl'/>
                        <h1 className='normal-case text-lg mt-2'>{translate("forms.createUsers.fields.image.add","Agregar foto")}</h1>
                        <p className='text-gray-400 normal-case font-light text-xs'>{translate("forms.createUsers.fields.image.valid","Archivos válidos: jpg y png")}</p>
                    </div>
                    }
                    <input 
                    hidden
                    accept='image/*'
                    type="file"
                    onChange={(e) => {
                        // @ts-ignore
                        handleImageChange(e.target.files[0]);
                        // @ts-ignore
                        handlePreviewImage(e.target.files[0]);
                    }}
                    />
                </Button>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                    {translate("pages.directories.button")}
                </Button>
            </Box>
        </LocalizationProvider>
    )
}

export default CarteleraForm