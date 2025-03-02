import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SkeletonCategorySlider } from '../SkeletonCategorySlider/SkeletonCategorySlider';

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  if (loading) return <div><SkeletonCategorySlider /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-slider container my-5 ">
      <h2 className='mb-4 text-2xl font-bold '>Shop by Category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="category-item ">
            <div className="card">
              <img 
                src={category.image} 
                alt={category.name} 
                className="card-img-top h-[300px] md:h-[250px] w-full object-cover"
                
              />
              <div className="card-body text-center">
                <h5 className="card-title">{category.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;