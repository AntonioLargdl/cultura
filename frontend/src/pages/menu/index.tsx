import { useGetIdentity, useTranslate } from "@refinedev/core"
import { useTheme } from "@mui/material";
import { FcHome } from "react-icons/fc";
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import cfmWhite from "../../assets/cfm.webp"
import Usuarios from '../../assets/usuarios.webp';
import Categorias from '../../assets/categorias.webp';
import Locaciones from '../../assets/locaciones.webp';
import Directorios from '../../assets/directorios.webp';
import Blogs from '../../assets/blogs.webp';
import Carteleras from '../../assets/carteleras.webp';
import Portafolios from '../../assets/portafolios.webp';
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/common";

const Menu = () => {
    const { data: user } = useGetIdentity<IUser>();

    const translate = useTranslate();
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;

    const MenuOptions = [
        {
            image: Usuarios,
            to: "/usuarios",
            logo: logoWhite,
            title: translate("navigation.users", "Usuarios"),
            show: user?.rol === 'admin' ? 'block' : 'hidden'
        },
        {
            image: Locaciones,
            to: "/locaciones",
            logo: cfmWhite,
            title: translate("navigation.locations", "Locaciones"),
            show: (user?.rol === 'comision' || user?.rol === 'admin') ? 'block' : 'hidden'
        },
        {
            image: Directorios,
            to: "/directorios",
            logo: cfmWhite,
            title: translate("navigation.directories", "Directorios"),
            show: (user?.rol === 'comision' || user?.rol === 'admin') ? 'block' : 'hidden'
        },
        {
            image: Categorias,
            to: "/categorias",
            logo: logoWhite,
            title: translate("navigation.categories", "Categorías"),
            show: "block"
        },
        {
            image: Blogs,
            to: "/blog",
            logo: logoWhite,
            title: translate("navigation.blogs", "Blogs"),
            show: "block"
        },
        {
            image: Carteleras,
            to: "/carteleras",
            logo: logoWhite,
            title: translate("navigation.billboards", "Carteleras"),
            show: (user?.rol === 'cultura' || user?.rol === 'admin') ? 'block' : 'hidden'
        },
        {
            image: Portafolios,
            to: "/portafolios",
            logo: logoWhite,
            title: translate("navigation.portfolios", "Portafolios"),
            show: (user?.rol === 'cultura' || user?.rol === 'admin') ? 'block' : 'hidden'
        },
    ]

    return (
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                        <FcHome className="text-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-xl">{translate("pages.menu.title", "Menú")}</h1>
                    <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                </div>
            </div>
            <div className="flex lg:gap-6 md:gap-7 gap-4 flex-wrap p-2">
                { MenuOptions.map((item, index) => (
                    <Link to={item.to} key={index} className={`lg:w-[16rem] md:w-[14.5rem] md:h-full h-[10rem] w-full rounded-2xl relative ${item.show}`}>
                        <img src={item.image} alt={item.title} className="rounded-2xl shadow-xl hover:scale-105 duration-200 md:h-full h-[10rem] w-full object-top object-cover"/>
                        <h2 className="absolute md:bottom-4 md:left-4 bottom-6 left-6 text-white md:text-xl text-2xl font-medium">{item.title}</h2>
                        <img src={item.logo} alt="logo" className="absolute top-4 right-4 md:w-32 w-32"/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Menu