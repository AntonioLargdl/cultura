import { useTranslate } from "@refinedev/core"
import { FcPlus } from "react-icons/fc";
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { useTheme } from "@mui/material";

const Carteleras = () => {
    const translate = useTranslate();
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;

    return (
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex gap-4 items-center">
                <div className="flex items-center">
                    <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                        <FcPlus className="text-3xl"/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-xl">{translate("pages.billboards.title", "Blogs")}</h1>
                    <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                </div>
            </div>
        </div>
    )
}

export default Carteleras