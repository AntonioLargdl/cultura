import * as React from "react";
import {  ErrorComponent, UpdatePasswordFormTypes, UpdatePasswordPageProps, useActiveAuthProvider, useTranslate,} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import { layoutStyles, titleStyles } from "./styles";
import { UseFormProps } from "react-hook-form";
import { BaseRecord, HttpError, useUpdatePassword,} from "@refinedev/core";
import { AppIcon } from "../../components/app-icon";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RiLockPasswordLine } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import Loading from "../../components/loading";

export interface FormPropsType extends UseFormProps {
    onSubmit?: (values: UpdatePasswordFormTypes) => void;
}

type UpdatePasswordProps = UpdatePasswordPageProps<
    BoxProps,
    CardContentProps,
    FormPropsType
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({ wrapperProps, contentProps, renderContent, formProps,}) => {
    const { id, token } = useParams();
    const initialValues = {
        password: '', 
        confirmPassword: '',
        id: id || '', 
        token: token || '', 
    };
    const { onSubmit, ...useFormProps} = formProps || {};
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
        ...useFormProps,
        defaultValues: initialValues,
    });

    const authProvider = useActiveAuthProvider();
    const { mutate: update, isLoading, isError} =
        useUpdatePassword<UpdatePasswordFormTypes>({
            v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
        });

    const PageTitle = <AppIcon collapsed={false} />


    // Translate
    const translate = useTranslate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showSecondPassword, setShowSecondPassword] = React.useState(false);

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <ErrorComponent />
    }

    const Content = (
        <Card {...(contentProps ?? {})} sx={{backgroundColor:'transparent', border:'0', boxShadow:'none'}}>
            <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                    color="primary"
                    fontWeight={700}
                >
                    {translate("pages.updatePassword.title", "Ingresa una nueva contraseña")}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        if (onSubmit) {
                            return onSubmit(data);
                        }
                        return update(data);
                    })}
                >
                    <TextField
                        {...register("password", {
                            required: true,
                        })}
                        id="password"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={translate("pages.updatePassword.fields.password", "Contraseña")}
                        helperText={errors?.password?.message}
                        error={!!errors?.password}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="●●●●●●●●"
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
                        sx={{ mb: 0, "& fieldset": { border: 1.5, borderColor: '#1976D2', borderRadius:'10px'} }}
                    />

                    <TextField
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value?: string) => {
                                if (watch("password") !== value) {
                                    return translate("pages.updatePassword.errors.password", "Las contraseñas no coinciden");
                                }
                                return true;
                            },
                        })}
                        id="confirmPassword"
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label={translate("pages.updatePassword.fields.confirmPassword", "Confirmar contraseña")}
                        helperText={errors?.confirmPassword?.message}
                        error={!!errors?.confirmPassword}
                        type={showSecondPassword ? 'text' : 'password'}
                        placeholder="●●●●●●●●"
                        InputProps={{
                            startAdornment: <RiLockPasswordLine className="mx-2 text-lg"/>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowSecondPassword(!showSecondPassword)}
                                    >
                                        {showSecondPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        autoComplete="current-confirm-password"
                        sx={{ mb: 0, "& fieldset": { border: 1.5, borderColor: '#1976D2', borderRadius:'10px'} }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: "24px" , borderRadius: '10px'}}
                        disabled={isLoading}
                    >
                        {translate("pages.updatePassword.buttons.submit", "Actualizar contraseña")}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <div>
            <div>
                <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
                    <Container
                        component="main"
                        maxWidth="xs"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            height: "100vh",
                        }}
                    >
                        {renderContent ? (
                            renderContent(Content, PageTitle)
                        ) : (
                            <div className="flex flex-col gap-5">
                                {PageTitle}
                                {Content}
                            </div>
                        )}
                    </Container>
                </Box>
            </div>
        </div>
    );
};