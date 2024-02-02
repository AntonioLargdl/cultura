import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import Lottie from 'react-lottie'
import { useTheme } from '@mui/material';

const Loading = () => {
  const theme = useTheme();
  const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;

  const defaultOptions = {
      loop: true, 
      autopaly: true,
      animationData: LoadingAnimation
  }

  return (
    <div className='flex items-center justify-center h-full p-10'>
         <Lottie options={defaultOptions}/>
    </div>
  )
}

export default Loading