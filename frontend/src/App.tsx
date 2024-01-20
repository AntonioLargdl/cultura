import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";
import routerBindings, { CatchAllNavigate, NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { UpdatePasswordPage } from "./pages/updatePassword";
import { authProvider } from "./authProvider";
import { FcBusinessContact, FcConferenceCall, FcEditImage, FcFilmReel, FcGlobe, FcHome, FcPlus, FcTimeline, FcViewDetails } from 'react-icons/fc'
import { Authenticated, Refine } from "@refinedev/core";
import ErrorPage from "./components/error";
import Menu from "./pages/menu";
import Users from "./pages/users";
import Categories from "./pages/categories";
import Locations from "./pages/locaciones";
import Directories from "./pages/directories";
import Blogs from "./pages/blogs";
import Carteleras from "./pages/carteleras";
import Portfolios from "./pages/portfolios";
import CreateUsers from "./pages/users/create";
import CreateLocations from "./pages/locaciones/create";
import ShowLocations from "./pages/locaciones/show";
import Landing from "./pages/landing";
import Comision from "./pages/comision";
import CreateDirectory from "./pages/directories/create";

function App() {
  const { t, i18n } = useTranslation();
  
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const token = localStorage.getItem('user');
  const user = token ? JSON.parse(token) : null;

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:8080/api/v1")}
                notificationProvider={notificationProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                routerProvider={routerBindings}
                resources={[
                  { 
                    name: t("navigation.menu", "Menú"),
                    list: "/",
                    meta: {
                      icon: <FcHome />,
                    },
                  },
                  { 
                    name: "usuarios",
                    list: (user.rol === 'admin' || "") && "/usuarios" || "",
                    create: "/usuarios/create",
                    edit: "/usuarios/edit/:id",
                    show: "/usuarios/show/:id",
                    meta: {
                      icon: <FcConferenceCall />,
                      canDelete: true,
                    },
                  },
                  {
                    name: "locaciones",
                    list: (user?.rol === 'comision' || user?.rol === 'admin' || "") ?  "/locaciones" : "",
                    create: "/locaciones/create",
                    edit: "/locaciones/edit/:id",
                    show: "/locaciones/show/:id",
                    meta: {
                      icon: <FcGlobe />,
                      canDelete: true,
                    },
                  },
                  {
                    name: "directorios",
                    list: (user?.rol === 'comision' || user?.rol === 'admin' || "") ? "/directorios" : "",
                    create: "/directorios/create",
                    edit: "/directorios/edit/:id",
                    show: "/directorios/show/:id",
                    meta: {
                      icon: <FcFilmReel />,
                      canDelete: true,
                    },
                  },
                  {
                    name: 'Categorías',
                    list: "/categorias",
                    create: "/categorias/create",
                    edit: "/categorias/edit/:id",
                    show: "/categorias/show/:id",
                    meta: {
                      icon: <FcTimeline />,
                      canDelete: true,
                    },
                  },
                  {
                    name: "blogs",
                    list: "/blog",
                    create: "/blog/create",
                    edit: "/blog/edit/:id",
                    show: "/blog/show/:id",
                    meta: {
                      icon: <FcEditImage />,
                      canDelete: true,
                    },
                  },
                  {
                    name: "carteleras",
                    list: (user?.rol === 'cultura' || user?.rol === 'admin' || "") ? "/carteleras" : "",
                    create: "/carteleras/create",
                    edit: "/carteleras/edit/:id",
                    show: "/carteleras/show/:id",
                    meta: {
                      icon: <FcPlus />,
                      canDelete: true,
                    },
                  },
                  {
                    name: "portafolios",
                    list: (user?.rol === 'cultura' || user?.rol === 'admin' || "") ? "/portafolios" : "",
                    create: "/portafolios/create",
                    edit: "/portafolios/edit/:id",
                    show: "/portafolios/show/:id",
                    meta: {
                      icon: <FcBusinessContact />,
                      canDelete: true,
                    },
                  },

                ]}
                options={{ syncWithLocation: true, warnWhenUnsavedChanges: true, useNewQueryKeys: true, projectId: "xPy1Rd-09Y0Qe-GuKBUR", }}>
                <Routes>
{/* -------------- Dashboard -------------- */}
                  <Route
                    element={ <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/cfm" />} >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Title={({ collapsed }) => (<AppIcon collapsed={collapsed}/>)}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
{/*  Menú -------------- */}
                    <Route path="/">
                      <Route index element={<Menu />} />
                    </Route>
{/*  Usuarios -------------- */}
                    { (user?.rol === 'admin' || "") &&
                      <Route path="/usuarios">
                        <Route index element={<Users />} />
                        <Route path="create" element={<CreateUsers />} />
                      </Route>
                    }
{/*  Locaciones -------------- */}
                    { (user?.rol === 'admin' || user?.rol === 'comision' || "") &&
                      <Route path="/locaciones">
                        <Route index element={<Locations />} />
                        <Route path="create" element={<CreateLocations />} />
                        <Route path="show/:id" element={<ShowLocations />} />
                      </Route>
                    }
{/*  Directorios -------------- */}
                    { (user?.rol === 'admin' || user?.rol === 'comision' || "") &&
                      <Route path="/directorios">
                        <Route index element={<Directories />} />
                        <Route path="create" element={<CreateDirectory />} />
                      </Route>
                    }
{/*  Categorías -------------- */}
                    <Route path="/categorias">
                      <Route index element={<Categories />} />
                    </Route>                    
{/*  Blogs -------------- */}
                    <Route path="/blog">
                      <Route index element={<Blogs />} />
                    </Route>
{/*  Carteleras -------------- */}
                    { (user?.rol === 'admin' || user?.rol === 'cultura' || "") &&
                    <Route path="/carteleras">
                      <Route index element={<Carteleras />} />
                    </Route>
                    }
{/*  Portafolios -------------- */}
                    { (user?.rol === 'admin' || user?.rol === 'cultura' || "") &&
                      <Route path="/portafolios">
                        <Route index element={<Portfolios />} />
                      </Route>
                    }
{/*  Error -------------- */}
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
{/* -------------- Autenticación -------------- */}
                  <Route
                    element={
                      <Authenticated key="authenticated-outer" fallback={<Outlet />} >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/cfm" element={<Comision />} />
                    <Route path="/cfm/directorio" element={<Comision />} />
                    <Route path="/cfm/locaciones" element={<Comision />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/update-password/:id/:token" element={<UpdatePasswordPage />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
              </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
