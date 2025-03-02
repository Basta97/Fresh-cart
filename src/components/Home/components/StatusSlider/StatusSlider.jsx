import React, { useMemo } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Main slider images
import slider1 from '../../../../assets/images/slider-image-1.jpeg'
import slider2 from '../../../../assets/images/slider-image-2.jpeg'
import slider3 from '../../../../assets/images/slider-image-3.jpeg'

// Static side images
import static1 from '../../../../assets/images/slider-image-1.jpeg'
import static2 from '../../../../assets/images/slider-image-2.jpeg'

export default function StatusSlider() {
  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    adaptiveHeight: true,
  }), [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:w-10/12  mx-auto p-4  ">
      {/* Main Slider */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Slider {...settings}>
          {[slider1, slider2, slider3].map((slider, index) => (
            <div key={index}>
              <img 
                src={slider} 
                alt={`Slide ${index + 1}`}
                className="w-full h-[300px] md:h-[400px] object-fit"
                loading="eager"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Static Images Sidebar */}
      <div className="flex flex-col gap-4">
        <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
          <img 
            src={static1} 
            alt="Featured product 1"
            className="w-full h-[145px] md:h-[192px] object-cover transform transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
          <img 
            src={static2} 
            alt="Featured product 2"
            className="w-full h-[145px] md:h-[192px] object-cover transform transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}