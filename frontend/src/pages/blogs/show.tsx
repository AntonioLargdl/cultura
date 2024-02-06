import { useOne, useTranslate } from '@refinedev/core';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorPage from '../../components/error';
import Loading from '../../components/loading';
import { useTheme } from '@mui/material';
import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import { BlogProps } from '../../interfaces/common';
import { PiCalendarBlank, PiClock, PiMapPin } from 'react-icons/pi';
import { HeaderInicio } from '../../components/inicio/header';

const BlogShow = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "blog/show",
        id: id as string,
    });

    const blog = (data?.data as unknown) as BlogProps ?? []
    // Translation
    const translate = useTranslate();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    // Navigate
    const navigate = useNavigate()

    if(isLoading) {
        return  (
            <Loading />
        )
    }

    if(isError) {
        return (
            <ErrorPage />
        )
    }

    return (
        <div>
            <HeaderInicio />
            <div className='flex'>
                {/* Header */}
                <div className={`mt-20 lg:mx-20 ${background}`}>
                    <img src={blog.image} alt={blog.title.es} className='w-[50rem] rounded-2xl'/>
                </div>
            </div>
        </div>
    )
}

export default BlogShow