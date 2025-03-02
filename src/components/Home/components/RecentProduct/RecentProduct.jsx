import React, { useContext, useEffect, useState } from 'react';

import ProductItem from '../ProductItem/ProductItem';

import { getProducts } from '../../../../service/productsAPI';
import { ProductItemSkeleton } from '../ProductItemSkeleton/ProductItemSkeleton';
import { CartContext } from '../../../../contexts/cartContext';
import { useWishlist } from '../../../../contexts/WishlistContext ';

const RecentProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { wishlist } = useWishlist();
  let{addToCart}=useContext(CartContext)
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
   
    fetchProducts();
  }, []);



  const handleAddToCart = (id) => {
    addToCart(id);
  };

  if (loading) return <div> <h1 className="text-3xl font-bold mb-8">Our Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, index) => (
      <ProductItemSkeleton key={index} />
    ))}
  </div></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem 
            key={product._id} 
            product={product} 
            onAddToCart={handleAddToCart}
            isFavorited={wishlist.includes(product._id)}
            onToggleFavorite={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentProduct;