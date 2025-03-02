import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { tokenContext } from '../../../../contexts/tokenContext';

const ProductItem = ({ product, onAddToCart, isFavorited, onToggleFavorite }) => {
  const [localIsFavorited, setLocalIsFavorited] = useState(isFavorited);
  const { token } = useContext(tokenContext);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalIsFavorited(isFavorited);
  }, [isFavorited]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      toast.error('Please login to manage favorites');
      return;
    }

    setIsProcessing(true);
    try {
      const config = { headers: { token } };
      
      if (localIsFavorited) {
        await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${product._id}`,
          config
        );
      } else {
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          { productId: product._id },
          config
        );
      }

      setLocalIsFavorited(!localIsFavorited);
      onToggleFavorite(product._id);
      toast.success(`Product ${localIsFavorited ? 'removed from' : 'added to'} favorites`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update favorites');
      setLocalIsFavorited(isFavorited); // Revert on error
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="product-card relative group overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
      <Link to={`/productDetail/${product._id}/${product.category._id}`}>
        <div className="image-container overflow-hidden h-48 bg-gray-200 relative">
          <img 
            src={product.imageCover} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={handleToggleFavorite}
            disabled={isProcessing}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-sm transition-all duration-300
              ${localIsFavorited ? 'bg-red-100 scale-110' : 'bg-white/90'}
              ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <svg 
              className={`w-6 h-6 ${localIsFavorited ? 'text-red-500' : 'text-gray-400'}`}
              fill={localIsFavorited ? 'currentColor' : 'none'}
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
          <div className="flex flex-wrap justify-between items-center mt-2">
            <span className="text-green-400">{product.category?.name}</span>
            <span className="font-bold">{product.price.toFixed(2)} EGP</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-300">★ {product.ratingsAverage?.toFixed(1)}</span>
            <span className="text-gray-600 ml-2">({product.ratingsQuantity})</span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => onAddToCart(product)}
        className="add-to-cart absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-2 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  transform translate-y-full group-hover:translate-y-0 disabled:opacity-50"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Add to Cart'}
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

ProductItem.defaultProps = {
  isFavorited: false,
  onToggleFavorite: () => {}
};

export default ProductItem;