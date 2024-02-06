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
import LocacionesUser from "./pages/comision/locaciones";
import DirectoriosUser from "./pages/comision/directorio";
import LocacionUser from "./pages/comision/locaciones/show";
import LocacionesMap from "./pages/comision/locaciones/map";
import DirectorioId from "./pages/comision/directorio/show";
import ShowDirectorio from "./pages/directories/show";
import CreateCartelera from "./pages/carteleras/create";
import CarteleraShow from "./pages/carteleras/show";
import CreatePortfolio from "./pages/portfolios/create";
import ShowPortfolios from "./pages/portfolios/show";
import MoreliaCreativa from "./pages/creativa";
import TalentoDirectorio from "./pages/creativa/talento";
import TalentoShow from "./pages/creativa/talento/show";
import CarteleraPage from "./pages/landing/cartelera";
import CarteleraID from "./components/inicio/carteleraShow";
import CreateCategoria from "./pages/categories/create";
import CreateBlog from "./pages/blogs/create";
import BlogShow from "./pages/blogs/show";

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
                dataProvider={dataProvider("https://culltura.onrender.com/api/v1")}
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
                    list: "/usuarios",
                    // (user.rol === 'admin' || "") && "/usuarios" || "",
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
                    list: "/locaciones",
                    // (user?.rol === 'comision' || user?.rol === 'admin' || "") ?  "/locaciones" : "",
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
                    list: "/directorios",
                    // (user?.rol === 'comision' || user?.rol === 'admin' || "") ? "/directorios" : "",
                    create: "/directorios/create",
                    edit: "/directorios/edit/:id",
                    show: "/directorios/show/:id",
                    meta: {
                      icon: <FcFilmReel />,
                      canDelete: true,
                    },
                  },
                  {
                    name: 'Categorias',
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
                    name: "blog",
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
                    list: "/carteleras", 
                    // (user?.rol === 'cultura' || user?.rol === 'admin' || "") ? "/carteleras" : "",
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
                    list: "/portafolios",
                    // (user?.rol === 'cultura' || user?.rol === 'admin' || "") ? "/portafolios" : "",
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
                    element={ <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/inicio" />} >
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
                    {/* { (user?.rol === 'admin' || "") && */}
                      <Route path="/usuarios">
                        <Route index element={<Users />} />
                        <Route path="create" element={<CreateUsers />} />
                      </Route>
{/*  Locaciones -------------- */}
                    {/* { (user?.rol === 'admin' || user?.rol === 'comision' || "") && */}
                      <Route path="/locaciones">
                        <Route index element={<Locations />} />
                        <Route path="create" element={<CreateLocations />} />
                        <Route path="show/:id" element={<ShowLocations />} />
                      </Route>
{/*  Directorios -------------- */}
                    {/* { (user?.rol === 'admin' || user?.rol === 'comision' || "") && */}
                      <Route path="/directorios">
                        <Route index element={<Directories />} />
                        <Route path="create" element={<CreateDirectory />} />
                        <Route path="show/:id" element={<ShowDirectorio />} />
                      </Route>
{/*  Categorías -------------- */}
                    <Route path="/categorias">
                      <Route index element={<Categories />} />
                      <Route path="create" element={<CreateCategoria />} />
                    </Route>                    
{/*  Blogs -------------- */}
                    {/* TODO: Blog */}
                    <Route path="/blog">
                      <Route index element={<Blogs />} />
                      <Route path="create" element={<CreateBlog />} />
                    </Route>
{/*  Carteleras -------------- */}
                    {/* { (user?.rol === 'admin' || user?.rol === 'cultura' || "") && */}
                    <Route path="/carteleras">
                      <Route index element={<Carteleras />} />
                      <Route path="create" element={<CreateCartelera />} />
                      <Route path="show/:id" element={<CarteleraShow />} />
                    </Route>
{/*  Portafolios -------------- */}
                    {/* { (user?.rol === 'admin' || user?.rol === 'cultura' || "") && */}
                      <Route path="/portafolios">
                        <Route index element={<Portfolios />} />
                        <Route path="create" element={<CreatePortfolio />} />
                        <Route path="show/:id" element={<ShowPortfolios />} />
                      </Route>
{/*  Error -------------- */}
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
{/* -------------- Public -------------- */}
                  <Route
                    element={
                      <Authenticated key="authenticated-outer" fallback={<Outlet />} >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    {/* --------------- Cultura */}
                    <Route path="/inicio" element={<Landing />} />
                    <Route path="/inicio/blog/show/:id" element={<BlogShow />} />
                    {/* TODO: Blog */}
                    <Route path="/inicio/blog" element={<Landing />} />
                    <Route path="/inicio/blog/:category" element={<Landing />} />
                    {/* Cartelera */}
                    <Route path="/inicio/cartelera" element={<CarteleraPage />} />
                    <Route path="/inicio/cartelera/:id" element={<CarteleraID />} />
                    {/* --------------- Creativa */}
                    <Route path="/creativa" element={<MoreliaCreativa />} />
                    <Route path="/creativa/talento" element={<TalentoDirectorio />} />
                    <Route path="/creativa/talento/:id" element={<TalentoShow />} />
                    {/* --------------- Comisión */}
                    <Route path="/cfm" element={<Comision />} />
                    {/* Directorio */}
                    <Route path="/cfm/directorio" element={<DirectoriosUser />} />
                    <Route path="/cfm/directorio/:id" element={<DirectorioId />} />
                    {/* Locaciones */}
                    <Route path="/cfm/locaciones" element={<LocacionesUser />} />
                    <Route path="/cfm/locaciones/map" element={<LocacionesMap />} />
                    <Route path="/cfm/locaciones/:id" element={<LocacionUser />} />
                    {/* --------------- Auth */}
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
