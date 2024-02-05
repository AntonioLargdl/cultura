import { useTable, useTranslate } from "@refinedev/core"
import { Button, TextField, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import LoadingAnimationWhite from '../../assets/loading.json';
import LoadingAnimationBlack from '../../assets/loading-black.json';
import cfmBlack from "../../assets/cfm.webp"
import cfmWhite from "../../assets/cfm_white.webp"

import { FcFilmReel } from "react-icons/fc";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { PiPersonArmsSpread } from "react-icons/pi";
import { RiTeamLine, RiUserUnfollowLine } from "react-icons/ri";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";

const Directories = () => {
    // Fetch Data
    const { tableQueryResult: {data, isLoading, isError} } = useTable()
    const directorio = data?.data ?? [];
    const [category, setCategory] = useState('');
    const [empty, setEmpty] = useState(false);
    // Translation
    const translate = useTranslate();
    // Theme
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? cfmBlack : cfmWhite;
    const LoadingAnimation = theme.palette.mode === 'dark' ? LoadingAnimationWhite : LoadingAnimationBlack;
    // Lottie
    const defaultOptions = {
        loop: true, 
        autopaly: true,
        animationData: LoadingAnimation
    }
    // Search
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const filteredDirectory = directorio.filter((dir) =>
        dir.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || dir.type === category)
    );

    return (
        <div className="lg:p-0 md:p-4 p-2">
            <div className="flex justify-between md:items-center md:flex-row flex-col">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        <div className="m-2 shadow-lg p-4 rounded-2xl border-[1px]">
                            <FcFilmReel className="text-3xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{translate("pages.directories.title", "Directorios")}</h1>
                        <img src={logo} alt="secretaria" className="w-24 h-auto"/>
                    </div>
                </div>
                <Link to="/directorios/create">
                    <Button type="button" fullWidth variant="contained" sx={{ mt: "24px", borderRadius:'10px' }}>
                        {translate("pages.directories.button")}
                    </Button>
                </Link>
            </div>
            <div className='w-full md:mt-0 mt-5'>
                <TextField
                    fullWidth
                    margin="normal"
                    label={translate("pages.directories.search.label")}
                    placeholder={translate("pages.directories.search.placeholder")}
                    InputProps={{
                    startAdornment: <IoIosSearch className="mx-2 text-lg"/>,
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mt: 2 }}
                />
                <div className='flex gap-2 max-w-sm ml-auto mr-auto'>
                <button type='button' onClick={() => setCategory('talento')} className={`${category === 'talento' && 'bg-[#67B7F7] font-medium text-white duration-300 border-0'} border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2 flex-1`}>
                    <PiPersonArmsSpread />
                    <p>{translate("pages.directories.talent")}</p>
                </button>
                <button type='button' onClick={() => setCategory('crew')} className={`${category === 'crew' && 'bg-[#67B7F7] font-medium text-white duration-300 border-0'} border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2 flex-1`}>
                    <RiTeamLine />
                    <p>{translate("pages.directories.crew")}</p>
                </button>
                <button type='button' onClick={() => setCategory('')} className={`hover:bg-[#67B7F7] hover:font-medium hover:text-white duration-300 hover:border-0 border-[1px] px-4 lg:py-4 py-2 rounded-lg flex items-center justify-center gap-1 mt-2`}>
                    <Close />
                </button>
                </div>
            </div>
            <div>
                { filteredDirectory.length === 0 && !empty && !isLoading &&
                    <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                    <RiUserUnfollowLine className='text-6xl'/>
                    <p className='font-light text-center'>{translate("pages.directories.error")}</p>
                    </div>
                }
                { isLoading ?
                    <div className='max-w-sm mt-10 ml-auto mr-auto'>
                        <Lottie options={defaultOptions} />
                    </div>
                    :
                    empty ?
                    <div className='flex flex-col gap-4 items-center justify-center mt-10'>
                        <RiUserUnfollowLine className='text-6xl'/>
                        <p className='font-light text-center'>{translate("pages.directories.error")}</p>
                    </div>
                    :
                    <div className='flex md:px-4 flex-wrap gap-4 justify-center mb-10 mt-4'>
                        {filteredDirectory.map((item, index) => (
                            <Link to={`/directorios/show/${item._id}`} key={index} className={`w-full max-w-[22rem] flex p-2 gap-2 rounded-lg border-[1px] justify-between items-center`}>
                            <div className='flex gap-4'>
                                <img src={item.photos[0]} alt="foto" className='w-20 h-20 rounded-lg object-top object-cover'/>
                                <div className='flex flex-col gap-1 justify-center'>
                                <p className='font-medium'>{item.name}</p>
                                <div className='flex gap-1'>
                                    <div className={`p-1 ${item.type === 'talento' ? 'bg-orange-700' : 'bg-orange-500'} text-white rounded-lg`}>
                                    {item.type === 'crew' ? <RiTeamLine /> : <PiPersonArmsSpread />}
                                    </div>
                                    <p className='font-light'>{translate(`pages.directories.${item.type === 'crew' ? 'crew' : 'talent'}`)}</p>
                                </div>
                                </div>
                            </div>
                            <IoIosArrowForward className='text-3xl'/>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default Directories