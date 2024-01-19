import MabBoxGeocoder from '@mapbox/mapbox-gl-geocoder/'
import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { GeocoderProps } from '../../interfaces/common';

const Geocoder = ({setLocation}: GeocoderProps) => {
    const accessToken: string = import.meta.env.VITE_MAP_TOKEN ?? '';

    const ctrl = new MabBoxGeocoder({
        accessToken,
        marker:false,
        collapsed: true
    })

    useControl(() => ctrl)
    ctrl.on('result', (e) => {
        setLocation({lng: e.result.geometry.coordinates[0], lat: e.result.geometry.coordinates[1]})
    })

    return (
    null 
    )
}

export default Geocoder