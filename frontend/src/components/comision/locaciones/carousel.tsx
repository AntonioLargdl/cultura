// Componente Carousel.tsx

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IconType } from 'react-icons/lib';

interface CarouselProps {
    categoryList: { value: string; name: string; icon: React.ReactElement<IconType> }[];
    onSelectCategory: (value: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ categoryList, onSelectCategory }) => {
    const [value, setValue] = useState<string | null>(null)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        variableWidth: true,
        centerMode: true,
    };

  return (
    <div>
        <div className='lg:flex justify-center hidden'>
            {categoryList.map((category) => (
                <div
                    key={category.value}
                    className="cursor-pointer px-3"
                    onClick={() => {
                        onSelectCategory(category.value)
                        setValue(category.value)
                    }}
                >
                    <div className={`flex flex-col justify-center items-center py-4 ${value === category.value && 'border-b-4'}`}>
                        {category.icon}
                        <p className="mt-2 text-xs">{category.name}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='lg:hidden'>
            <Slider {...settings}>
            {categoryList.map((category) => (
                <div
                    key={category.value}
                    className="cursor-pointer px-3"
                    onClick={() => {
                        onSelectCategory(category.value)
                        setValue(category.value)
                    }}
                >
                    <div className={`flex flex-col justify-center items-center py-4 ${value === category.value && 'border-b-4'}`}>
                        {category.icon}
                        <p className="mt-2 text-xs">{category.name}</p>
                    </div>
                </div>
            ))}
            </Slider>
        </div>
    </div>
  );
};

export default Carousel;
