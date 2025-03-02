import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../../contexts/cartContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductItem from '../../../Home/components/ProductItem/ProductItem';
import { ProductItemSkeleton } from '../../../Home/components/ProductItemSkeleton/ProductItemSkeleton';

const SubCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext);
  const { categoryId } = useParams();

  const fetchProducts = async (catId) => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
        { params: { category: catId } }
      );
      setProducts(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProducts(categoryId);
    }
  }, [categoryId]);

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No products found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategory;