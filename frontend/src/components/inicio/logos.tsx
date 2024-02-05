import morelia from '../../assets/brilla.webp'
import ayuntamiento from '../../assets/ayuntamiento.webp'

const Logos = () => {
  return (
    <div className='mt-20 lg:p-8 p-4 flex lg:gap-16 gap-5 justify-center items-center'>
        <img src={ayuntamiento} className='w-36 lg:w-44'/>
        <img src={morelia} className='w-36 lg:w-44'/>
    </div>
  )
}

export default Logos