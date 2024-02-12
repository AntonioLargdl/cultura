import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["es", "en", "fr"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: ["es", "en", "fr"],
    load: "all", // Cargar todos los idiomas disponibles
    preload: ["es", "en", "fr"], // Especificar el orden de carga
  });

export default i18n;

