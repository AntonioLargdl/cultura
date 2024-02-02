import { useTranslate } from "@refinedev/core";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";
import creativa from '../../assets/creativa_white.webp'

export const AdvancedBannerTopCreativa = () => {
  const t = useTranslate()

  const background: BannerLayer = {
    image:
      "https://res.cloudinary.com/dg22urw5p/image/upload/v1706881761/WEB/bg-creativa_ieasko.webp",
    translateY: [0, 20],
    opacity: [1, 0.3],
    scale: [1.2, 0.9, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true
  };

  const headline: BannerLayer = {
    translateY: [40, 0],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="inset center">
        <h1 className="headline white text-center tracking-wider lg:text-[8vw] text-[12vw] md:mt-0 mt-44">DESCUBRE <br /> <span className="font-medium">MORELIA</span></h1>
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

  const foreground: BannerLayer = {
    image:
      "https://res.cloudinary.com/dg22urw5p/image/upload/v1706881098/WEB/right_q1nb8g.webp",
    translateX: [0, 100],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true
  };

  const foregroundTwo: BannerLayer = {
    image:
      "https://res.cloudinary.com/dg22urw5p/image/upload/v1706881100/WEB/left_izi2s5.webp",
    translateX: [0, -100],
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
      layers={[background, headline, foreground, foregroundTwo, image, gradientOverlay]}
      className="full"
    />
  );
};