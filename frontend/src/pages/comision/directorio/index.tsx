import { TextField } from '@mui/material'
import { IoIosSearch } from 'react-icons/io'
import { HeaderDirectorio } from '../../../components/comision/directorio/header'

const DirectoriosUser = () => {
  return (
    <>
        <HeaderDirectorio />
        <div className='w-full mt-20 p-4'>
            <TextField
                fullWidth
                margin="normal"
                label="Buscar"
                placeholder="Buscar directorio"
                InputProps={{
                startAdornment: <IoIosSearch className="mx-2 text-lg"/>,
                }}
                sx={{ mt: 2 }}
                
            />
        </div>
    </>
  )
}

export default DirectoriosUser