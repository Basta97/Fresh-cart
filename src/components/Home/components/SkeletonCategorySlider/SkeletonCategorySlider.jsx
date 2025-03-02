import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SkeletonCategorySlider = () => {
  const skeletonSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="category-slider container my-5">
      <h2 className='mb-4'><div className="h-8 bg-gray-300 w-1/4 animate-pulse rounded"></div></h2>
      <Slider {...skeletonSettings}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="category-item px-2">
            <div className="card">
              <div 
                className="card-img-top bg-gray-300 animate-pulse"
                style={{ height: '200px', width: '100%' }}
              ></div>
              <div className="card-body text-center">
                <div className="h-4 bg-gray-300 animate-pulse rounded mx-auto w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};