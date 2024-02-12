import { useGetIdentity, useGetLocale, useOne, useTranslate } from '@refinedev/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../../components/error';
import Loading from '../../components/loading';
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import { BlogProps, IUser } from '../../interfaces/common';
import { PiCalendar, PiMapPin } from 'react-icons/pi';
import { FcUndo } from 'react-icons/fc';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import { IoIosCopy } from 'react-icons/io';

const BlogShowID = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "blog/show",
        id: id as string,
    });
    const blog = (data?.data as unknown) as BlogProps ?? []
    // User Rol
    const { data: user } = useGetIdentity<IUser>();
    // Data
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    // Translation
    const translate = useTranslate();
    // Translate
    const locale = useGetLocale();
    const currentLocale = locale();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Navigate
    const navigate = useNavigate()
    // Formatear Fecha
    function formatearFecha(fechaString: string) {
        const fecha = new Date(fechaString);
        const fechaFormateada = fecha.toLocaleDateString();
        return fechaFormateada;
    }

    // Delete
    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://culltura.onrender.com/api/v1/blog/delete/${id}`);
            if (response.data.success) {
                navigate('/blog')
                setLoading(false);
                notification.success({
                    message: "¡Listo!",
                    description: `Blog eliminado exitosamente`,
                    placement: 'bottomRight',
                });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: `No pudimos borrar el blog`,
                placement: 'bottomRight',
            });
            console.error(error);
            setLoading(false);
            handleClose()
        }
    };

    const text = 'https://cultura.morelia.gob.mx/inicio/blog/show/'+blog._id
    const handleCopy = () => {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Texto copiado al portapapeles:', text);
          // Puedes mostrar una notificación o realizar otras acciones aquí
        })
        .catch((error) => {
          console.error('Error al copiar el texto:', error);
          // Puedes mostrar una notificación de error o manejar el error de otra manera aquí
        });
    };

    // Dialog
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if(isLoading) {
        return  (
            <Loading />
        )
    }

    if(isError) {
        return (
            <ErrorPage />
        )
    }

    return (
        <div className='flex flex-col gap-2 items-center'>
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <Link to="/blog" className="flex items-center">
                            <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                                <FcUndo className="text-3xl"/>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">Blogs</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                { (user?.rol === 'admin') &&
                    <IconButton color="inherit" sx={{width:'50px', height:'50px'}} onClick={() => handleOpen()}>
                        <Delete sx={{color:'red', width:'30px', height:'30px'}}/>
                    </IconButton>
                }
            </div>
            <Box className='shadow-md rounded-full bg-gray-100 text-gray-500 text-sm flex gap-2 items-center pr-6 mb-4'>
                <button onClick={handleCopy} className='bg-gray-200 rounded-full p-5 hover:bg-gray-400 text-xl'><IoIosCopy /></button>
                <Typography fontWeight={200} fontSize={18}>{text}</Typography>
            </Box>
            <div className='flex gap-10 justify-center mb-10 lg:mx-20 flex-wrap'>
                {/* Cuerpo de la noticia */}
                <div className={`${background} max-w-[50rem] p-2 rounded-2xl mx-2`}>
                    <img src={blog.image} alt={blog.title.es} className='w-[50rem] rounded-2xl'/>
                    <div className='p-4'>
                        <h1 className='font-semibold text-2xl'>
                            {currentLocale === 'fr' ? blog.title.fr : currentLocale === 'en' ? blog.title.en : blog.title.es}
                        </h1>
                        <p className='font-light mt-2'>{blog.author[0].name}</p>
                        <div className='flex justify-between w-full mt-2'>
                            <div className='flex items-center gap-1'>
                                <PiCalendar className='text-xl'/>
                                <p className='font-extralight'>{formatearFecha(blog.date)}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <PiMapPin className='text-xl'/>
                                <p className='font-extralight'>{blog.place}</p>
                            </div>
                        </div>
                        <p className='mt-4 font-light leading-9'>
                            {currentLocale === 'fr' ? blog.content.fr : currentLocale === 'en' ? blog.content.en : blog.content.es}
                        </p>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{translate("pages.users.delete.title", "¿Estás seguro que deseas eliminar a")} {currentLocale === 'fr' ? blog.title.fr : currentLocale === 'en' ? blog.title.en : blog.title.es}?</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {translate("pages.users.delete.cancel", "Cancelar")} 
                </Button>
                <Button onClick={() => handleConfirm()} color="primary">
                    {translate("pages.users.delete.accept", "Confirmar")} 
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BlogShowID