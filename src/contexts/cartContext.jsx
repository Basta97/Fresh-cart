import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);

  const { token } = useContext(tokenContext);

  const Url = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = { token };

  const fetchCart = async () => {
    
    if (!token) return;
    
    try {
      setLoading(true);
      
      const { data } = await axios.get(Url, { headers });
      
      setCartData(data);
      

      
      
      
      
      if (data && data.data && data.data.products) {
        setCartCount(data.data.products.length);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch cart data");
      toast.error("Failed to fetch cart data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    token && fetchCart();
  }, [token]);

  const updateQuantity = async (id, count) => {
    if (isUpdatingCart) return; // Prevent multiple simultaneous updates
    
    try {
      setIsUpdatingCart(true);
      
      // Fix: Include the product ID in the URL
      const{data}=await axios.put(
        `${Url}/${id}`,
        { count },
        { headers }
      );
      
      // Refresh cart data
      setCartData(data);
      setCartCount(data.data.products.length)
      
      toast.success("Cart updated successfully", {
        position: "bottom-right",
      });
    } catch (err) {
      setError(err.message || "Failed to update quantity");
      toast.error(err.message || "Failed to update quantity", {
        position: "bottom-right",
      });
    } finally {
      setIsUpdatingCart(false);
    }
  };

  const removeItem = async (id) => {
    if (isRemovingItem) return; // Prevent multiple simultaneous removals
    
    try {
      setIsRemovingItem(true);
      
      const {data}=await axios.delete(`${Url}/${id}`, { headers });
      
      
      
      
      setCartData(data);
      setCartCount(data.data.products.length)
      
      toast.success("Item removed from cart", {
        position: "bottom-right",
      });
    } catch (err) {
      setError(err.message || "Failed to remove item");
      toast.error(err.message || "Failed to remove item", {
        position: "bottom-right",
      });
    } finally {
      setIsRemovingItem(false);
    }
  };

  const clearCart = async () => {
    if (isClearingCart) return;
    
    try {
      setIsClearingCart(true);
      
      await axios.delete(Url, { headers });
      
      setCartData({
        data: {
          products: [],
          totalCartPrice: 0,
        },
      });
      
      setCartCount(0)
      
      toast.success("Cart cleared successfully", {
        position: "bottom-right",
      });
    } catch (err) {
      setError(err.message || "Failed to clear cart");
      toast.error(err.message || "Failed to clear cart", {
        position: "bottom-right",
      });
    } finally {
      setIsClearingCart(false);
    }
  };

  const addToCart = async (productId) => {
   
    if (isAddingToCart) return; 
    
    try {
      setIsAddingToCart(true);
      
      const { data } = await axios.post(Url, { productId }, { headers });
      
      // Update both cartData and cartCount
      setCartData(data);
      setCartCount(data.data.products.length); // Add this line
      
      toast.success("Added product to cart successfully", {
        position: "bottom-right",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add product to cart";
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setIsAddingToCart(false);
      fetchCart(); // Refresh cart data
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartId: cartData?.data?._id,
        setCartCount,
        addToCart,
        cartData,
        loading,
        error,
        updateQuantity,
        removeItem,
        clearCart,
        isAddingToCart, // Export these states so components can disable buttons
        isUpdatingCart,
        isRemovingItem,
        isClearingCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}