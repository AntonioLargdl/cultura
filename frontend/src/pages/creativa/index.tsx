import { ThemeProvider, createTheme } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { HeaderCreativa } from '../../components/creativa/header';
import { AdvancedBannerTopCreativa } from '../../components/creativa/banner';
import MenuCreativa from '../../components/creativa/Menu';
import AboutCreativa from '../../components/creativa/Nosotros';
import FooterCreativa from '../../components/creativa/footer';
import ServicesCreativa from '../../components/creativa/services';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const MoreliaCreativa = () => {
  return (
    <ThemeProvider theme={darkTheme}>
        <div className='body-cfm text-white'>
            <ParallaxProvider>
                <HeaderCreativa  />
                <AdvancedBannerTopCreativa />
                <MenuCreativa />
                <AboutCreativa />
                <div className='bg-[#121212] overflow-hidden'>
                  <ServicesCreativa />
                  <FooterCreativa />
                </div>
            </ParallaxProvider>
        </div>
    </ThemeProvider>
  )
}

export default MoreliaCreativa