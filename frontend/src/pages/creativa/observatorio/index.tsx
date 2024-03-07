import { ThemeProvider, createTheme } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AdvancedBannerTopObservatorio } from '../../../components/observatorio/banner';
import { HeaderCreativa } from '../../../components/creativa/header';
import AboutObservatorio from '../../../components/observatorio/about';
import FooterCreativa from '../../../components/creativa/footer';
import MenuObservatorio from '../../../components/observatorio/menu';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const ObservatorioCultural = () => {
  return (
    <ThemeProvider theme={darkTheme}>
        <div className='body-cfm text-white'>
            <ParallaxProvider>
                <HeaderCreativa  />
                <AdvancedBannerTopObservatorio />
                <AboutObservatorio />
                <MenuObservatorio />
                <div className='bg-[#121212] overflow-hidden'>
                  <FooterCreativa />
                </div>
            </ParallaxProvider>
        </div>
    </ThemeProvider>
  )
}

export default ObservatorioCultural