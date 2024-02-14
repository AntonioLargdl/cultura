import { BaseRecord, useGetIdentity, useGetLocale, useTable, useTranslate } from "@refinedev/core"
import { FcTimeline } from "react-icons/fc";
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { notification } from "antd";
import Loading from "../../components/loading";
import ErrorPage from "../../components/error";
import { Delete } from "@mui/icons-material";
import { PiFilmReel, PiMusicNote } from "react-icons/pi";
import { SiCultura } from "react-icons/si";
import { IUser } from "../../interfaces/common";

const Categories = () => {
    // Fetch Data
    const { tableQueryResult: {data, isLoading, isError} } = useTable()
    const allCategorys = data?.data ?? [];
    // User Data
    const { data: user } = useGetIdentity<IUser>();
    // Loading / Open Modal / Row ID
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState<BaseRecord>();
    // Translate
    const translate = useTranslate();
    const locale = useGetLocale();
    const currentLocale = locale();
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
            const response = await axios.delete(`https://culltura.onrender.com/api/v1/categorias/delete/${id}`);
            if (response.data.success) {
            navigate('/categorias')
            handleClose()
            setLoading(false);
            notification.success({
                message: "¡Listo!",
                description: `Categoría eliminada exitosamente`,
                placement: 'bottomRight',
            });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: `No pudimos borrar la categoría, inténtalo de nuevo`,
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
                            <FcTimeline className="text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.categories.title", "Categorías")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                { user?.rol !== 'blog' &&
                    <Link to="/categorias/create">
                        <Button type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                            {translate("pages.directories.button")}
                        </Button>
                    </Link>
                }
            </div>
            <div className="flex flex-col gap-2 mt-5">
                <div className={`grid grid-cols-4 rounded-[10px] gap-2 items-center p-2 text-center uppercase font-light`}>
                    <p className="col-span-1">{translate("pages.categories.name")}</p>
                    <p className="col-span-1">{translate("pages.categories.create")}</p>
                    <p className="col-span-1">{translate("pages.categories.area")}</p>
                </div>
                {allCategorys.map((item,index) => (
                    <div className={`text-center grid grid-cols-4 rounded-[10px] gap-2 items-center ${background} p-4`} key={index}>
                        <p className="col-span-1">{currentLocale === 'fr' ? item.name.fr : currentLocale === 'en' ? item.name.en : item.name.es}</p>
                        <p className={`col-span-1 ${background}`}>{item.user[0].username}</p>
                        <p className={`col-span-1 ${background} flex items-center justify-center`}>
                            {
                                item.type === 'cultura' ? <SiCultura className="text-2xl text-center"/>
                                : item.type === 'comision' ? <PiFilmReel className="text-2xl"/>
                                : item.type === 'creativa' && <PiMusicNote className="text-2xl"/>
                            }
                        </p>
                        { user?.rol === 'admin' ?
                            <div className={`flex items-center justify-center col-span-1 ${background}`}>
                                <IconButton color="inherit" onClick={() => handleOpen({user: item})}>
                                    <Delete />
                                </IconButton>
                            </div>
                            :
                            <FcTimeline className="text-xl ml-auto mr-auto my-3"/>
                        }
                    </div>
                ))}
            </div>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>¿Estás seguro que deseas eliminar esta categoría?</DialogTitle>
                <DialogContent>
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

export default Categories