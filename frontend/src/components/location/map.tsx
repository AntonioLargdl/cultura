import { Box } from "@mui/material"
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { AddLocationProps } from "../../interfaces/common"
import Geocoder from "./Geocoder"

const AddLocation = ({location, setLocation}: AddLocationProps) => {
    
    return (
    <Box 
    sx={{
        height:400,
        width: "100%",
        position:'relative',
        overflow: 'hidden',
        borderRadius: '20px',
    }}
    >
        <ReactMapGL
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
        initialViewState={{
            longitude:location.lng,
            latitude:location.lat,
            zoom:12
        }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        >
        <Marker 
            longitude={location.lng}
            latitude={location.lat}
            draggable
            onDragEnd={(e) => {
                const newLocation = { lng: e.lngLat.lng, lat: e.lngLat.lat };
                setLocation(newLocation);
              }}
        />
        <NavigationControl position='bottom-right' />
        <GeolocateControl position="top-left" trackUserLocation onGeolocate={(e) => setLocation({lng:e.coords.longitude, lat: e.coords.latitude})}/>
        <Geocoder setLocation={setLocation}/>
        </ReactMapGL>
    </Box>
  )
}

export default AddLocation