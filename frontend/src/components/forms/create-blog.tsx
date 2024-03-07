import { Box, Button, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { CategoriaProps, FormProps, IUser } from '../../interfaces/common'
import { useGetIdentity, useGetLocale, useTranslate } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GrUserAdmin } from 'react-icons/gr';
import { SiCultura } from 'react-icons/si';
import { PiAlignRightDuotone, PiFilmReel, PiMapPin } from 'react-icons/pi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FcAddImage, FcEditImage, FcUndo } from 'react-icons/fc';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { MdOutlineSubtitles, MdOutlineTitle } from 'react-icons/md';
import slugify from 'slugify';
import axios from 'axios';

const BlogForm = ({type, register, setValue, formLoading, handleSubmit, handleImageChange, onFinishHandler, userImage} : FormProps) => {
    const [photo, setPhoto] = useState('');
    const [slug, setSlug] = useState('');
    const [categorias, setCategorias] = useState<CategoriaProps[]>([])
    // Get User Data
    const { data: user } = useGetIdentity<IUser>();
    // Translation
    const translate = useTranslate();
    const locale = useGetLocale();
    const currentLocale = locale();
    // slug
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = event.target.value;
        const generatedSlug = slugify(nameValue, { lower: true }); // Genera el slug
        setSlug(generatedSlug); // Actualiza el estado del slug
        setValue('slug', generatedSlug); // Actualiza el valor del campo de slug (asegúrate de tener un campo 'slug' en tu formulario)
    };
    const date = new Date()

    //  Fetch Category
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://culltura.onrender.com/api/v1/categorias');
                setCategorias(response.data)
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    // SetSlug
    useEffect(() => {
        setValue('username', user?.username)
        setValue('date', date)
    }, [user, date])

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
        <Box className="flex gap-2 items-center flex-wrap lg:p-0 md:p-4 p-2" component="form" onSubmit={handleSubmit(onFinishHandler)}>
            <div className='flex justify-between w-full'>
                <div className="flex gap-4 items-center">
                    <Link to="/usuarios" className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcUndo className="text-3xl"/>
                        </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">Nuevo Blog</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                    <FcEditImage className="text-3xl"/>
                </div>
            </div>
            <TextField
                {...register("esT", {
                    required: true,
                })}
                id="esT"
                name="esT"
                fullWidth
                margin="normal"
                label="Título"
                placeholder="Escribe aquí el título"
                InputProps={{
                startAdornment: <MdOutlineTitle className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 4 }}
                onChange={handleNameChange}
            />
            <TextField
                {...register("place", {
                    required: true,
                })}
                id="place"
                name="place"
                fullWidth
                margin="normal"
                label="Ubicación"
                placeholder="Ciudad, Estado(opcional), País(opcional)"
                InputProps={{
                startAdornment: <PiMapPin className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
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
            <Select
                {...register('_id', {
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
                        <MdOutlineSubtitles />
                        <span>Seleccionar Categoría</span>
                    </Box>
                </MenuItem>
                {categorias && categorias.map((item, index) => (
                    <MenuItem value={item._id} key={index} className='flex gap-2'>
                        <span>{currentLocale === 'fr' ? item.name.fr : currentLocale === 'en' ? item.name.en : item.name.es}</span>
                    </MenuItem>
                ))}
            </Select>
            <TextField
                {...register("esA", {
                    required: true,
                })}
                id="esA"
                name="esA"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                label="Extracto"
                placeholder="Breve descripción de la nota"
                InputProps={{
                startAdornment: <MdOutlineTitle className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
            <TextField
                {...register("esC", {
                    required: true,
                })}
                id="esC"
                name="esC"
                fullWidth
                margin="normal"
                multiline
                rows={10}
                label="Contenido"
                placeholder="Contenido de la nota"
                InputProps={{
                startAdornment: <MdOutlineTitle className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
            />
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
                Crear nuevo
            </Button>
        </Box>
    )
}

export default BlogForm