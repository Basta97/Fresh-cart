// contexts/wishlistContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { tokenContext } from './tokenContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useContext(tokenContext);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { headers: { token } }
      );
      setWishlist(data.data.map(item => item._id));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    }
  };

  const updateWishlist = async (productId) => {
    try {
      if (wishlist.includes(productId)) {
        await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          { headers: { token } }
        );
      } else {
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          { productId },
          { headers: { token } }
        );
      }
      await fetchWishlist(); // Refresh list after update
    } catch (error) {
      console.error('Error updating wishlist:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setWishlist([]); // Clear wishlist when logged out
    }
  }, [token]);

  return (
    <WishlistContext.Provider value={{ 
      wishlist,
      wishListCount: wishlist.length,
      updateWishlist,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);