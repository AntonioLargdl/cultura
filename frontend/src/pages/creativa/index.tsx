import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax';
import { HeaderCreativa } from '../../components/creativa/header';
import { AdvancedBannerTopCreativa } from '../../components/creativa/banner';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const MoreliaCreativa = () => {
  return (
    <ThemeProvider theme={darkTheme}>
        <div className='body-cfm'>
            <ParallaxProvider>
                <HeaderCreativa  />
                <AdvancedBannerTopCreativa />

            </ParallaxProvider>
        </div>
    </ThemeProvider>
  )
}

export default MoreliaCreativa