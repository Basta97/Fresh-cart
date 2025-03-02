import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import styles from './Brands.module.css'

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(
          'https://ecommerce.routemisr.com/api/v1/brands'
        );
        setBrands(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <ImSpinner8 className="animate-spin text-4xl text-main" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading brands: {error}
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Brands</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div 
            key={brand._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            
              <div className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                  
                </div>
              </div>
          
          </div>
        ))}
      </div>
    </section>
  );
};