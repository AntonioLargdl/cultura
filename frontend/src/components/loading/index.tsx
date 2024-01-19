import LoadingAnimation from '../../assets/loading.json';
import Lottie from 'react-lottie'

const Loading = () => {

    const defaultOptions = {
        loop: true, 
        autopaly: true,
        animationData: LoadingAnimation
    }

  return (
    <div className='flex items-center justify-center h-full min-h-screen'>
         <Lottie options={defaultOptions}/>
    </div>
  )
}

export default Loading