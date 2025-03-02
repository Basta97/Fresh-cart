import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { tokenContext } from '../../contexts/tokenContext';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(tokenContext);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { headers: { token } }
      );
      setWishlist(data.data);
      
      
      
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load wishlist');
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );
      setWishlist(prev => prev.filter(item => item._id !== productId));
      toast.success('Product removed from wishlist');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item');
    }
  };

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setLoading(false);
      setError('Please login to view your wishlist');
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        {!token && (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login Now
          </Link>
        )}
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">Your wishlist is empty</h2>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative group">
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-red-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold truncate">{item.title}</h2>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">EGP {item.price}</span>
                <Link
                  to={`/productDetail/${item.id}/${item.category._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;