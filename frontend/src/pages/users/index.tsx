import { BaseRecord, useTable, useTranslate } from "@refinedev/core"
import { FcConferenceCall } from "react-icons/fc";
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import ErrorPage from "../../components/error";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { notification } from "antd";
import { GrUserAdmin } from "react-icons/gr";
import { SiCultura } from "react-icons/si";
import { PiFilmReel } from "react-icons/pi";
import { HiOutlineNewspaper } from "react-icons/hi";

const Users = () => {
    // Fetch Data
    const { tableQueryResult: {data, isLoading, isError} } = useTable()
    const allUsers = data?.data ?? [];
    // Loading / Open Modal / Row ID
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState<BaseRecord>();
    // Translate
    const translate = useTranslate();
    // Navigate
    const navigate = useNavigate()
    // Dark mode
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Delete
    const handleConfirm = async ({id}:{id:string}) => {
        setLoading(true);
        try {
          const response = await axios.delete(`https://culltura.onrender.com/api/v1/usuarios/eliminar/${id}`);
          if (response.data.success) {
            navigate('/usuarios')
            handleClose()
            setLoading(false);
            notification.success({
                message: "¡Listo!",
                description: `Usuario eliminado exitosamente`,
                placement: 'bottomRight',
            });
          }
        } catch (error) {
            notification.error({
                message: "Error",
                description: `No pudimos borrar el usuario, inténtalo de nuevo`,
                placement: 'bottomRight',
            });
            console.error(error);
            setLoading(false);
            handleClose()
        }
    };

    const handleOpen = ({user}:{user:BaseRecord}) => {
        setOpen(true);
        setRow(user)
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    if(loading || isLoading) {
        return <Loading />
    }

    if(isError) {
        return <ErrorPage />
    } 

    return (
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcConferenceCall className="text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.users.title", "Usuarios")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <Link to="/usuarios/create">
                    <Button  type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                        {translate("forms.createUsers.buttons.send","Crear nuevo usuario")}
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-2 mt-5">
                    <div className={`grid md:grid-cols-7 grid-cols-6 rounded-[10px] gap-2 items-center p-2 text-center uppercase font-light`}>
                        <p className="lg:col-span-1">{translate("pages.users.table.photo", "Foto")}</p>
                        <p className="lg:col-span-2 md:col-span-2 md:block hidden">{translate("pages.users.table.email", "Correo")}</p>
                        <p className="lg:col-span-2 md:col-span-2 col-span-3">{translate("pages.users.table.username", "Usuario")}</p>
                        <p className="lg:col-span-1">{translate("pages.users.table.role", "Rol")}</p>
                    </div>
                {allUsers.map((item,index) => (
                    <div className={`text-center grid md:grid-cols-7 grid-cols-6 rounded-[10px] gap-2 items-center ${background} p-4`} key={index}>
                        <Avatar className="col-span-1 ml-auto mr-auto" src={item.image} alt="image" sx={{ width: '50px', height: '50px' }} />
                        <p className="lg:col-span-2 md:col-span-2 md:block hidden">{item.email}</p>
                        <p className={`lg:col-span-2 md:col-span-2 col-span-3 ${background}`}>{item.username}</p>
                        <p className={`lg:col-span-1 col-span-1 text-center ml-auto mr-auto text-xl ${background}`}>
                            {
                                item.rol === 'admin' ? <GrUserAdmin /> 
                                : item.rol === 'cultura' ? <SiCultura />
                                : item.rol === 'comision' ? <PiFilmReel />
                                : item.rol === 'blog' && <HiOutlineNewspaper />
                            }
                        </p>
                        <div className={`flex items-center justify-center lg:col-span-1 col-span-1 ${background}`}>
                            <IconButton color="inherit" onClick={() => handleOpen({user: item})}>
                                <Delete />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{translate("pages.users.delete.title", "¿Estás seguro que deseas eliminar a")} {row?.username}?</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {translate("pages.users.delete.alert", "La información del usuario será borrada")} 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {translate("pages.users.delete.cancel", "Cancelar")} 
                </Button>
                <Button onClick={() => handleConfirm({ id: row?._id })} color="primary">
                    {translate("pages.users.delete.accept", "Confirmar")} 
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Users