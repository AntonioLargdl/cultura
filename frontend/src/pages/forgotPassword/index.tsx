import { Box,BoxProps,Button,Card, CardContent,CardContentProps, Container, Link as MuiLink, TextField, Typography } from "@mui/material";
import { ForgotPasswordFormTypes, ForgotPasswordPageProps, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import { BaseRecord, HttpError, useForgotPassword, useLink, useRouterContext, useRouterType} from "@refinedev/core";
import { layoutStyles, titleStyles } from "./styles";
import { AppIcon } from "../../components/app-icon"
import { UseFormProps } from "@refinedev/react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import Loading from "../../components/loading";

export interface FormPropsType extends UseFormProps {
  onSubmit?: (values: ForgotPasswordFormTypes) => void;
}

type ForgotPasswordProps = ForgotPasswordPageProps< BoxProps, CardContentProps, FormPropsType >;

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ loginLink, wrapperProps, contentProps, renderContent, formProps,}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
      ...useFormProps,
  });

  const { mutate, isLoading } = useForgotPassword<ForgotPasswordFormTypes>();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const PageTitle = <AppIcon collapsed={false} />

  // Translate
  const translate = useTranslate();

  if(isLoading) {
    return <Loading />
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
                  {translate("pages.forgotPassword.title", "Olvidaste tu contraseña")}
              </Typography>
              <Box
                  component="form"
                  onSubmit={handleSubmit((data) => {
                      if (onSubmit) {
                          return onSubmit(data);
                      }

                      return mutate(data);
                  })}
              >
                  <TextField
                      {...register("email", {
                          required: true,
                          pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Correo inválido"
                          },
                      })}
                      id="email"
                      margin="normal"
                      placeholder={translate("pages.forgotPassword.placeholder.email", "Escribe aquí tu correo elextrónico")}
                      fullWidth
                      label={translate("pages.forgotPassword.fields.email", "Escribe aquí")}
                      name="email"
                      type="email"
                    //   error={!!errors.email}
                      InputProps={{
                        startAdornment: <AiOutlineUser className="mx-2 text-lg"/>,
                      }}
                      sx={{ mt: 0, "& fieldset": { border: 1.5, borderColor: '#1976D2', borderRadius:'10px'} }}
                  />
                  {loginLink ?? (
                      <Box textAlign="right" sx={{ mt: "24px" }}>
                          <MuiLink
                              variant="body2"
                              component={ActiveLink}
                              underline="none"
                              to="/login"
                              fontWeight="light"
                              fontSize="12px"
                              color="primary.light"
                          >
                              {translate("pages.forgotPassword.buttons.login", "¿Ya tienes una cuenta? Iniciar sesión")}
                          </MuiLink>
                      </Box>
                  )}
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: "24px" , borderRadius: '10px'}}
                      disabled={isLoading}
                  >
                      {translate("pages.forgotPassword.buttons.submit", "Enviar instrucciones")}
                  </Button>
              </Box>
          </CardContent>
      </Card>
  );

  return (
        <div >
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