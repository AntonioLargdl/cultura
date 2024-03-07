import { Box, Button, IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { useTranslate } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { authProvider } from "../../authProvider";
import { Link } from "react-router-dom";
import axios from "axios";

import logoDark from '../../assets/logo.webp'
import logoLight from '../../assets/logo_white.webp'
import secretaria from '../../assets/secretaria_white.webp'
import catedral from '../../assets/catedral.webp'
import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';

import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { notification } from "antd";
import Lottie from "react-lottie";

interface LoginFormValues {
  access: string;
  password: string;
}

export const Login = () => {
  // Formulario
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  // Translate
  const translate = useTranslate();

  // Theme
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? logoLight : logoDark;
  const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;

  // Lottie Animation
  const defaultOptions = {
    loop: true, 
    autopaly: true,
    animationData: LoadingAnimation
  }

  // Formulario
  const onSubmit = async (data: LoginFormValues) => {
    try {
        setLoading(true)
        const response = await axios.post("https://culltura.onrender.com/api/v1/usuarios/login", data);
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        await authProvider.login({ access: data.access, password: data.password });
        // Redirigir a la página de inicio después del inicio de sesión exitoso
        window.location.href = "/";
    } catch (error) {
      setLoading(false)
      setError(true);
      notification.error({
      message: translate("pages.login.errors.login", "Error"),
      description: translate("pages.login.errors.loginError", "Credenciales incorrectas"),
    });
    setLoading(false)
    }
  };

  // Cambiar a minúsculas
  const handleInputChange = (event:any) => {
    event.target.value = event.target.value.toLowerCase();
  };

  return (
    <div className="flex md:flex-row flex-col-reverse md:justify-between">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:h-screen justify-center mx-10">
        <img src={logo} alt="Morelia" className="w-32 hidden md:block" />
        <h1 className="font-semibold text-4xl my-4 max-w-sm leading-[50px]">{translate("pages.login.title", "Panel de Administrador")}</h1>
        { !loading ?
        <Box className="max-w-sm">
          <TextField
            {...register("access", {
                required: true,
            })}
            id="access"
            fullWidth
            margin="normal"
            label={translate( "pages.login.fields.username","Usuario",)}
            placeholder={translate("pages.login.placeholder.username", "Nombre de usuario")}
            InputProps={{
              startAdornment: <AiOutlineUser className="mx-2 text-lg"/>,
            }}
            error={!!errors.access || error}
            name="access"
            sx={{ mt: 2 }}
            onChange={handleInputChange}
          />
          <TextField
            {...register("password", {
                required: true,
            })}
            id="password"
            fullWidth
            margin="normal"
            label={translate( "pages.login.fields.password","Contraseña",)}
            placeholder="●●●●●●●●"
            error={error}
            InputProps={{
              startAdornment: <RiLockPasswordLine className="mx-2 text-lg"/>,
              endAdornment: (
                  <InputAdornment position="end">
                      <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                      >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
              ),
          }}
            name="password"
            sx={{ mt: 2 }}
            type={showPassword ? 'text' : 'password'}
          />
          <Link
              color="primary"
              to="/forgot-password"
              className="font-extralight text-sm"
          >
              {translate(
                  "pages.login.buttons.forgotPassword",
                  "¿Olvidaste tu contraseña?",
              )}
          </Link>
            <Button  type="submit" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
              {translate("pages.login.buttons.submit", "Inciar Sesión")}
            </Button>
        </Box>
        :
        <div className="ml-auto mr-auto max-w-sm">
          <Lottie options={defaultOptions} />
        </div>
        }
      </Box>
      <Box className="relative shadow-xl">
        <img src={catedral} alt="catedral" className="lg:max-h-screen md:h-full object-left object-cover"/>
        <img src={secretaria} alt="catedral" className="w-[20rem] absolute bottom-10 right-10"/>
      </Box>
    </div>
  );
};
