import { Box, Button, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { FormProps } from '../../interfaces/common'
import { useTranslate } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GrUserAdmin } from 'react-icons/gr';
import { SiCultura } from 'react-icons/si';
import { PiFilmReel } from 'react-icons/pi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FcAddImage, FcConferenceCall, FcUndo } from 'react-icons/fc';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { useState } from 'react';
import Loading from '../loading';

const UserForm = ({type, register, setValue, formLoading, handleSubmit, handleImageChange, onFinishHandler, userImage} : FormProps) => {
    const [photo, setPhoto] = useState('');

    const translate = useTranslate();

    // Cambiar a minúsculas
    const handleInputChange = (event:any) => {
        event.target.value = event.target.value.toLowerCase();
    };

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
        <Box className="flex gap-4 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
            <div className='flex justify-between w-full'>
                <div className="flex gap-4 items-center">
                    <Link to="/usuarios" className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcUndo className="text-3xl"/>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("forms.createUsers.title", "Nuevo usuario")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                    <FcConferenceCall className="text-3xl"/>
                </div>
            </div>
            <TextField
                {...register("email", {
                    required: true,
                })}
                id="email"
                fullWidth
                margin="normal"
                label={translate( "forms.createUsers.fields.email.label","Correo electrónico")}
                placeholder={translate("forms.createUsers.fields.email.placeholder", "Escribe aquí tu correo")}
                InputProps={{
                startAdornment: <AiOutlineMail className="mx-2 text-lg"/>,
                }}
                name="email"
                sx={{ mt: 2 }}
                onChange={handleInputChange}
            />
            <TextField
                {...register("username", {
                    required: true,
                })}
                id="username"
                fullWidth
                margin="normal"
                label={translate( "forms.createUsers.fields.username.label","Usuario")}
                placeholder={translate("forms.createUsers.fields.username.placeholder", "Nombre de usuario sin espacios")}
                InputProps={{
                startAdornment: <AiOutlineUser className="mx-2 text-lg"/>,
                }}
                name="username"
                sx={{ mt: 2 }}
                onChange={handleInputChange}
            />
            <TextField
                {...register("password", {
                    required: true,
                })}
                id="password"
                fullWidth
                margin="normal"
                label={translate("forms.createUsers.fields.password.label","Contraseña")}
                placeholder="●●●●●●●●"
                InputProps={{
                startAdornment: <RiLockPasswordLine className="mx-2 text-lg"/>,
                }}
                name="password"
                sx={{ mt: 2 }}
            />
            <Select
                {...register('rol', {
                    required: true
                })}
                sx={{ mt: 2, width: "100%"}}
                color="info"
                displayEmpty
                defaultValue=""
                inputProps={{ "aria-label" : "Whithouth label"}}
            >
                <MenuItem value="" disabled className='flex gap-2'>
                    <Box display="flex" alignItems="center" gap={2}>
                        <AiOutlineUserAdd />
                        <span>{translate("forms.createUsers.fields.select.option1","Seleccionar rol")}</span>
                    </Box>
                </MenuItem>
                <MenuItem  value="admin" className="flex gap-2">
                    <Box display="flex" alignItems="center" gap={2}>
                        <GrUserAdmin />
                        <span>{translate("forms.createUsers.fields.select.option2","Administrador(a)")}</span>
                    </Box>
                </MenuItem>
                <MenuItem value="cultura" className="flex gap-2">
                    <Box display="flex" alignItems="center" gap={2}>
                        <SiCultura />
                        <span>{translate("forms.createUsers.fields.select.option3","Secretaría de Cultura")}</span>
                    </Box>
                </MenuItem>
                <MenuItem value="comision" className="flex gap-2">
                    <Box display="flex" alignItems="center" gap={2}>
                        <PiFilmReel />
                        <span>{translate("forms.createUsers.fields.select.option4","Comisión Fílmica")}</span>
                    </Box>
                </MenuItem>
                <MenuItem value="blog" className="flex gap-2">
                    <Box display="flex" alignItems="center" gap={2}>
                        <HiOutlineNewspaper />
                        <span>{translate("forms.createUsers.fields.select.option5","Escritor(a) de blog")}</span>
                    </Box>
                </MenuItem>
            </Select>
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
                {translate("forms.createUsers.buttons.send","Crear nuevo usuario")}
            </Button>
        </Box>
    )
}

export default UserForm