import { Box, Button, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { FormCategoriaProps, IUser } from '../../interfaces/common'
import { useGetIdentity, useTranslate } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { PiAlignRightDuotone, PiAlignRightLight, PiFilmReel, PiMapPin, PiMaskHappy, PiMusicNote } from 'react-icons/pi';
import { FcTimeline, FcUndo } from 'react-icons/fc';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import Loading from '../loading';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale/es';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { SiCultura } from 'react-icons/si';
import { MdOutlineMenuOpen } from 'react-icons/md';

const CategoriaForm = ({type, register, setValue, formLoading, handleSubmit, onFinishHandler} : FormCategoriaProps) => {
    // Translation
    const translate = useTranslate();

    const { data: user } = useGetIdentity<IUser>();

    useEffect(() => {
        setValue('user', user?.username)
    }, [user])
    
    // Logo
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;

    const [slug, setSlug] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = event.target.value;
        const generatedSlug = slugify(nameValue, { lower: true }); // Genera el slug
        setSlug(generatedSlug); // Actualiza el estado del slug
        setValue('slug', generatedSlug); // Actualiza el valor del campo de slug (asegúrate de tener un campo 'slug' en tu formulario)
    };

    if(formLoading) {
        return <Loading />
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Box className="flex gap-2 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
                <div className='flex justify-between w-full'>
                    <div className="flex gap-4 items-center">
                        <Link to="/categorias" className="flex items-center">
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
                        <FcTimeline className="text-3xl"/>
                    </div>
                </div>
                <TextField
                    {...register("es", {
                        required: true,
                    })}
                    id="es"
                    name="es"
                    fullWidth
                    margin="normal"
                    label="Nombre"
                    placeholder="Nombre de la categoría"
                    InputProps={{
                    startAdornment: <PiAlignRightLight className="mx-2 text-lg"/>,
                    }}
                    sx={{ mt: 4 }}
                    onChange={handleNameChange}
                />
                <TextField
                    {...register("slug", {
                    required: true,
                    })}
                    disabled
                    id="slug"
                    name="slug"
                    fullWidth
                    margin="normal"
                    label="Slug"
                    placeholder="Slug generado automáticamente"
                    value={slug} // Muestra el valor del slug generado
                    InputProps={{
                    startAdornment: <PiAlignRightDuotone className="mx-2 text-lg" />,
                    }}
                    sx={{ mt: 2 }}
                    readOnly
                />
                <div className='w-full'>                
                    <Select
                        {...register('type', {
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
                                <MdOutlineMenuOpen />
                                <span>Seleccionar sección</span>
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
                        <MenuItem value="creativa" className="flex gap-2">
                            <Box display="flex" alignItems="center" gap={2}>
                                <PiMusicNote />
                                <span>Ciudad Creativa</span>
                            </Box>
                        </MenuItem>
                    </Select>
                </div>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                    {translate("pages.directories.button")}
                </Button>
            </Box>
        </LocalizationProvider>
    )
}

export default CategoriaForm