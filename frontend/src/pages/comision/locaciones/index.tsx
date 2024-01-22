import { TextField } from '@mui/material'
import { HeaderLocaciones } from '../../../components/comision/locaciones/header'
import { useTranslate } from '@refinedev/core'

import { IoIosSearch } from 'react-icons/io'
import { PiBag, PiBank, PiDribbbleLogo, PiFactory, PiHeartbeatBold, PiMartini, PiMaskHappy, PiMountains, PiPalette, PiPark, PiPhone, PiRoadHorizon, PiSuitcase } from 'react-icons/pi';  
import { MdOutlineLocalHotel, MdOutlineFoodBank } from 'react-icons/md'; 
import Carousel from '../../../components/comision/locaciones/carousel';

const LocacionesUser = () => {
    const translate = useTranslate()
    // Category
    const categoryList = [
        { value: "parque", name: translate("forms.createLocation.fields.category.park","Parques"), icon: <PiPark className='text-2xl'/> },
        { value: "via", name: translate("forms.createLocation.fields.category.roads","Vías"), icon: <PiRoadHorizon className='text-2xl'/> },
        { value: "arquitectura", name: translate("forms.createLocation.fields.category.architecture","Arquitectura"), icon: <PiBank className='text-2xl'/> },
        { value: "industria", name: translate("forms.createLocation.fields.category.industry","Industria"), icon: <PiFactory className='text-2xl'/> },
        { value: "entretenimiento", name: translate("forms.createLocation.fields.category.entretainment","Entretenimiento"), icon: <PiMaskHappy className='text-2xl'/> },
        { value: "cultura", name: translate("forms.createLocation.fields.category.culture","Cultura"), icon: <PiPalette className='text-2xl'/> },
        { value: "salud", name: translate("forms.createLocation.fields.category.health","Salud"), icon: <PiHeartbeatBold className='text-2xl'/> },
        { value: "comercio", name: translate("forms.createLocation.fields.category.trade","Comercio"), icon: <PiBag className='text-2xl' /> },
        { value: "deportes", name: translate("forms.createLocation.fields.category.sports","Deportes"), icon: <PiDribbbleLogo className='text-2xl'/> },
        { value: "naturaleza", name: translate("forms.createLocation.fields.category.nature","Naturaleza"), icon: <PiMountains className='text-2xl'/> },
        { value: "recreación", name: translate("forms.createLocation.fields.category.recreation","Recreación"), icon: <PiMartini className='text-2xl'/> },
        { value: "oficinas", name: translate("forms.createLocation.fields.category.offices","Oficinas"), icon: <PiSuitcase className='text-2xl'/> },
        { value: "hoteles", name: translate("forms.createLocation.fields.category.hotels","Hoteles"), icon: <MdOutlineLocalHotel className='text-2xl'/> },
        { value: "restaurantes", name: translate("forms.createLocation.fields.category.restaurants","Restaurantes"), icon: <MdOutlineFoodBank className='text-2xl text-center'/> },
    ];

    const handleCategorySelect = (value: string) => {
        console.log(`Categoría seleccionada: ${value}`);
    };

    return (
        <div className='overflow-hidden'>
            <HeaderLocaciones />
            <div className='w-full mt-20 px-4 pt-4'>
                <TextField
                    id="access"
                    fullWidth
                    margin="normal"
                    label="Buscar"
                    placeholder="Buscar Locaciones"
                    InputProps={{
                    startAdornment: <IoIosSearch className="mx-2 text-lg"/>,
                    }}
                    name="access"
                    sx={{ mt: 2 }}
                />
            </div>
            <div className='border-b-[1px] shadow-lg'>
                <Carousel categoryList={categoryList} onSelectCategory={handleCategorySelect} />
            </div>
        </div>
    )
}

export default LocacionesUser