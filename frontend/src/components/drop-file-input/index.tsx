import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';
import filePng from '../../assets/file-png-solid-240.png';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { FcAddImage } from 'react-icons/fc';

interface DropFileInputProps {
    fileRemove: (file: File) => void;
    onFileDrop: (file: File) => void;
    fileList: File[];
    photoList: String[];
}

const DropFileInput: React.FC<DropFileInputProps> = ({ fileRemove, onFileDrop, fileList, photoList }) => {
    const theme = useTheme();
    const background = theme.palette.mode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900';
    const translate = useTranslate()
    
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onDragEnter = () => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.add('dragover');
        }
    };

    const onDragLeave = () => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.remove('dragover');
        }
    };

    const onDrop = () => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.remove('dragover');
        }
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input md:w-[400px] w-full"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <FcAddImage className='text-5xl text-center ml-auto mr-auto'/>
                    <h1 className='normal-case text-lg mt-2'>{translate("forms.createUsers.fields.image.add","Agregar foto")}</h1>
                    <p className='text-gray-400 normal-case font-light text-xs'>{translate("forms.createUsers.fields.image.valid","Archivos válidos: jpg y png")}</p>
                </div>
                <input 
                    type="file" 
                    onChange={(e) =>
                        // @ts-ignore 
                        onFileDrop(e.target.files[0])
                    } 
                />
            </div>
            {fileList.length > 0 ? (
                <div className="drop-file-preview">
                    {fileList.map((item, index) => (
                        <div key={index} className={`drop-file-preview__item flex items-center ${background}`}>
                            <img src={filePng} alt="filepng" />
                            <div className="drop-file-preview__item__info">
                                <p className='font-light text-sm mr-4'>{item.name}</p>
                                <p className='font-extralight text-xs'>{item.size} Bytes</p>
                            </div>
                            <span 
                                className="drop-file-preview__item__del bg-red-300 hover:bg-red-500 flex items-center justify-center absolute -right-2 -top-2" 
                                onClick={() => fileRemove(item)}
                            >
                                <Close />
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

DropFileInput.propTypes = {
    fileRemove: PropTypes.func.isRequired,
    onFileDrop: PropTypes.func.isRequired,
};

export default DropFileInput;
