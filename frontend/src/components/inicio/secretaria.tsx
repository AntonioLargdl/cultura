import fatima from '../../assets/fatima.webp'

const Secretaria = () => {
  return (
    <div className='my-10 mt-10 lg:p-8 lg:px-32 p-4 overflow-hidden md:flex md:gap-14 md:justify-center md:items-center'>
        <img src={fatima} alt="secretaria" className='rounded-full shadow-2xl md:block ml-16 md:ml-0 md:w-96 '/>
        <div>
            <h2 className='text-2xl uppercase tracking-wider font-semibold mt-5'>Fátima Chávez Alcaraz</h2>
            <h3 className='mt-2 text-lg font-medium text-[#8657b6] uppercase'>Secretaria de Cultura Municipal</h3>
            <h4 className='mt-2 text-lg'>Doctora en Gobierno y Administración Pública</h4>
            <p className='text-lg font-extralight mt-5 leading-8'>Su trayectoria incluye colaboraciones en proyectos académicos y vinculación social, como con la fundación Trust for the Américas y el Real Colegio Complutense at Harvard. Además, ha sido consultora en el Instituto Interamericano de Cooperación para la agricultura (IICA) y ha contribuido al ámbito académico como docente e investigadora. Actualmente, participa en talleres literarios, incluyendo el de creación literaria en Casa Lamm, Centro de Cultura.</p>
        </div>
    </div>
  )
}

export default Secretaria