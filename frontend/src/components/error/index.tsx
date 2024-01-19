import { useLink, useRouterContext, useRouterType, useTranslate } from '@refinedev/core';
import ErrorAnimation from '../../assets/error.json';
import Lottie from 'react-lottie';
import { Link as MuiLink } from "@mui/material";

const ErrorPage = () => {

    const translate = useTranslate()
    
    const defaultOptions = {
        loop: true, 
        autopaly: true,
        animationData: ErrorAnimation
    }
    
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
  
    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <div className='text-center h-full flex flex-col justify-center px-4'>
            <p className='font-extralight mb-1 text-center'>{translate("buttons.error", "La página que estás buscando no existe")}</p>
            <MuiLink
                variant="body2"
                component={ActiveLink}
                underline="none"
                to="/login"
                fontWeight="medium"
                fontSize="24px"
                color="primary.light"
            >
                {translate("buttons.menu", "Regresar al Inicio")}
            </MuiLink>
            <div className='ml-auto mr-auto w-72'>
                <Lottie options={defaultOptions}/>
            </div>
        </div>
    )
}

export default ErrorPage