import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartData,
    
    loading,
    error,
    updateQuantity,
    removeItem,
    clearCart
  } = useContext(CartContext);

 // Add this line

  if (loading) return <div className="text-center p-6">Loading cart...</div>;

  if (error)
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;

  if (!cartData?.data?.products?.length) {
    return <div className="text-center p-6 flex flex-col items-center gap-4">
       <Link
            to={`/allorders`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Orders
          </Link>
      <div>Your cart is empty</div>
      </div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-4 flex justify-between items-center">
        <span className="text-lg">
          Total:{" "}
          <span className="font-bold">EGP {cartData.data.totalCartPrice}</span>
        </span>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <Link
            to={`/allorders`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Orders
          </Link>
          <Link
            to="/checkout"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Checkout
          </Link>
        </div>
      </div>

      {/* Rest of the cart items rendering remains the same */}
      <div className="border rounded-lg overflow-hidden">
        {cartData.data.products.map((item) => (
         <div
         key={item._id}
         className="border-b p-4 flex flex-col md:flex-row md:items-center"
       >
         <div className="md:w-1/4 mb-4 md:mb-0">
           <img
             src={item.product?.imageCover || '/placeholder-product.jpg'}
             alt={item.product?.title || 'Product image'}
             className="w-full h-32 object-contain"
           />
         </div>

         <div className="md:w-2/4 md:px-4">
           <h3 className="font-semibold text-lg">
             {item.product?.title || 'Untitled Product'}
           </h3>
           <p className="text-gray-600">
             {item.product?.category?.name || 'Uncategorized'}
           </p>
           <p className="text-green-600 font-bold">
             EGP {item.price || 0}{" "}
             <span className="text-sm text-gray-500">per unit</span>
           </p>
           <p className="text-sm text-gray-500">
             Item Total: EGP {(item.price || 0) * (item.count || 0)}
           </p>
         </div>

         <div className="md:w-1/4 flex flex-col items-start md:items-end">
           <div className="flex items-center mb-2">
             <button
               onClick={() =>
                 updateQuantity(item.product?._id, Math.max(1, item.count - 1))
               }
               className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
             >
               -
             </button>
             <span className="bg-gray-100 px-4 py-1">{item.count}</span>
             <button
               onClick={() => updateQuantity(item.product?._id, item.count + 1)}
               className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
             >
               +
             </button>
           </div>
           <button
             onClick={() => removeItem(item.product?._id)}
             className="text-red-500 hover:text-red-700"
           >
             Remove
           </button>
         </div>
       </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;