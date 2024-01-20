import { useTranslate } from "@refinedev/core";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

export const AdvancedBannerTop = () => {
  const t = useTranslate()

  const background: BannerLayer = {
    image:
      "https://res.cloudinary.com/dg22urw5p/image/upload/v1705768181/WEB/banner_gcux5m.webp",
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true
  };

  const headline: BannerLayer = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="inset center">
        <h1 className="headline white tracking-wider lg:text-[8vw] text-[12vw]">{t("pages.comision.title", "MORELIA")} <span className="font-medium">{t("pages.comision.subtitle", "FILM")}</span>{t("pages.comision.letter", "A")}</h1>
      </div>
    )
  };

  const foreground: BannerLayer = {
    image:
      "https://res.cloudinary.com/dg22urw5p/image/upload/v1705768183/WEB/fondo_gcxms9.webp",
    translateY: [0, 15],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="gradient inset" />
  };

  return (
    <ParallaxBanner
      layers={[background, headline, foreground, gradientOverlay]}
      className="full"
    />
  );
};
