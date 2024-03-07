import { useOne, useTranslate } from '@refinedev/core';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../../components/error';
import Loading from '../../components/loading';
import { notification } from 'antd';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, useTheme } from '@mui/material';

import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import axios from 'axios';
import { CarteleraProps } from '../../interfaces/common';
import { FcUndo } from 'react-icons/fc';
import { Delete } from '@mui/icons-material';
import { PiCalendarBlank, PiClock, PiMapPin } from 'react-icons/pi';

const CarteleraShow = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "carteleras/show",
        id: id as string,
    });

    const cartelera = (data?.data as unknown) as CarteleraProps ?? []
    // Translation
    const translate = useTranslate();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Navigate
    const navigate = useNavigate()
    // Location
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // Delete
    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/carteleras/delete/${id}`);
            if (response.data.success) {
                navigate('/carteleras')
                setLoading(false);
                notification.success({
                    message: "¡Listo!",
                    description: `Locación eliminada exitosamente`,
                    placement: 'bottomRight',
                });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: `No pudimos borrar la locación`,
                placement: 'bottomRight',
            });
            console.error(error);
            setLoading(false);
            handleClose()
        }
    };
    // Función para obtener Fecha
    function formatearFecha(fecha: string) {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate().toString().padStart(2, '0');
        const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses en JavaScript comienzan desde 0
        const año = fechaObj.getFullYear();
    
        return `${dia}/${mes}/${año}`;
    }
    // Función para obtener Horario
    function obtenerHora(fecha: string) {
        const fechaObj = new Date(fecha);
        const horas = fechaObj.getHours().toString().padStart(2, '0');
        const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
        
        return `${horas}:${minutos}`;
    }

    // Dialog
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if(isLoading || loading) {
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
        <div>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <Link to="/carteleras" className="flex items-center">
                            <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                                <FcUndo className="text-3xl"/>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.billboards.title", "Blogs")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <IconButton color="inherit" sx={{width:'50px', height:'50px'}} onClick={() => handleOpen()}>
                    <Delete sx={{color:'red', width:'30px', height:'30px'}}/>
                </IconButton>
            </div>
            <div className='flex flex-wrap gap-10 items-center justify-center p-4 mb-10'>
                <img src={cartelera.image} alt='cartelera' className='max-h-[30rem]'/>
                <div className="flex-1 flex flex-col gap-2">
                    <p className="font-medium text-2xl lg:text-3xl mb-1">{cartelera.name}</p>
                    { cartelera.date &&
                        <div className="flex gap-2 items-center text-xl lg:text-2xl">
                            <PiCalendarBlank />
                            <p className="font-extralight">{formatearFecha(cartelera.date)}</p>
                        </div>
                    }
                    { cartelera.begin &&
                        <div className="flex gap-2 items-center text-xl lg:text-2xl">
                            <PiClock />
                            <p className="font-extralight">{obtenerHora(cartelera.begin)} {cartelera.end && "-"} {cartelera.end && (obtenerHora(cartelera.end))}</p>
                        </div>
                    }
                    <div className="flex gap-2 items-start text-xl lg:text-2xl">
                        <PiMapPin className="mt-1"/>
                        <p className="font-light flex-1">{cartelera.location}</p>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{translate("pages.users.delete.title", "¿Estás seguro que deseas eliminar a")} {cartelera.name}?</DialogTitle>
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

export default CarteleraShow