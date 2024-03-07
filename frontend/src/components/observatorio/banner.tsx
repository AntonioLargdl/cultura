import { useTranslate } from "@refinedev/core";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";
import creativa from '../../assets/creativa_white.webp'

export const AdvancedBannerTopObservatorio = () => {
  const t = useTranslate()

  const background: BannerLayer = {
    image:
      "https://res.cloudinary.com/dg22urw5p/image/upload/v1706881761/WEB/bg-creativa_ieasko.webp",
    translateY: [0, 20],
    opacity: [0.5, 0.2],
    scale: [1.2, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true
  };

  const headline: BannerLayer = {
    translateY: [0, 50],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="inset center">
        <h1 className="headline white text-center tracking-wider lg:text-[8vw] text-[12vw] uppercase"><span className="lg:text-[4vw] font-extralight text-[12vw]">{t("pages.observatory.h1")}</span><br /> <span className="font-medium">{t("pages.observatory.h2")}</span></h1>
      </div>
    )
  };

  const image: BannerLayer = {
    translateY: [10, 20],
    opacity: [1, -10],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="inset center">
        <img src={creativa} alt='ciudad creativa'/>
      </div>
    )
  };

  return (
    <ParallaxBanner
      layers={[background, headline]}
      className="full"
    />
  );
};