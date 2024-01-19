import { useTranslate } from "@refinedev/core"
import { FcFilmReel } from "react-icons/fc";
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Directories = () => {
    const translate = useTranslate();
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;

    return (
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcFilmReel className="text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.directories.title", "Directorios")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <Link to="/directorios/create">
                    <Button type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                        Crear nuevo
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Directories