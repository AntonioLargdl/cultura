import { TextField } from '@mui/material'
import { IoIosSearch } from 'react-icons/io'
import { HeaderDirectorio } from '../../../components/comision/directorio/header'

const DirectoriosUser = () => {
  return (
    <>
        <HeaderDirectorio />
        <div className='w-full mt-20 p-4'>
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
    </>
  )
}

export default DirectoriosUser