import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import ProductItem from '../Home/components/ProductItem/ProductItem';
import { CartContext } from '../../contexts/cartContext';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  let{addToCart}=useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          'https://ecommerce.routemisr.com/api/v1/products'
        );
        setAllProducts(data.data);
        setFilteredProducts(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, allProducts]);

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
        Error loading products: {error}
      </div>
    );
  }
  const handleAddToCart = (id) => {
    addToCart(id);
  };
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Our Products</h1>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found matching "{searchQuery}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductItem 
                              key={product._id} 
                              product={product} 
                              onAddToCart={handleAddToCart}
                            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;