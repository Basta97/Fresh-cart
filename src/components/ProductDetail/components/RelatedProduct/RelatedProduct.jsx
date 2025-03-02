import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import ProductItem from '../../../Home/components/ProductItem/ProductItem';
import { CartContext } from '../../../../contexts/cartContext';

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let{addToCart}=useContext(CartContext)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axios.get(
          'https://ecommerce.routemisr.com/api/v1/products'
        );
        
    
        const filtered = data.data.filter(product => 
          product.category._id === categoryId && 
          product._id !== currentProductId
        );
        
        setRelatedProducts(filtered);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchRelatedProducts();
    }
  }, [categoryId, currentProductId]);

  const handleAddToCart = (product) => {
    // Implement your add to cart logic here
    addToCart(product._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <ImSpinner8 className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading related products: {error}
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null; 
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
                  <ProductItem 
                    key={product._id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
      </div>
    </section>
  );
};

export default RelatedProducts;