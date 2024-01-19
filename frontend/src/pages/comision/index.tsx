import { ParallaxProvider } from 'react-scroll-parallax'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdvancedBannerTop } from '../../components/parallax/banner'
import { HeaderComision } from '../../components/comision/header'
import MenuLanding from '../../components/comision/Menu';
import About from '../../components/comision/Nosotros';
import Info from '../../components/comision/Info';
import Services from '../../components/comision/Services';
import Footer from '../../components/comision/Footer';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Comision = () => {
  return (
    <ThemeProvider theme={darkTheme}>
        <div className='body-cfm text-white bg-[#121212]'>
            <ParallaxProvider>
                <HeaderComision />
                <AdvancedBannerTop />
                <MenuLanding />
                <About />
                <Info />
                <div className='bg-[#121212] overflow-hidden'>
                  <Services />
                  <Footer />
                </div>
            </ParallaxProvider>
        </div>
    </ThemeProvider>
  )
}

export default Comision