import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../contexts/cartContext';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../contexts/tokenContext';

const CheckOut = () => {
  const { cartData, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token, user } = useContext(tokenContext);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const [formData, setFormData] = useState({
    details: '',
    phone: '',
    city: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(cartData)

    try {
      if (paymentMethod === 'cash') {
        // Cash on delivery flow
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartData.cartId}`,
          { shippingAddress: formData },
          { headers: { token } }
        );

        await clearCart();
        navigate(`/allorders`, { 
          state: { 
            order: data.data,
            cartId: cartData.cartId 
          }
        });
      } else {

        console.log(cartData.cartId);
        
        // Online payment flow
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartData.cartId}?url=${window.location.origin}`,
          {
            shippingAddress: formData,
          
          },
          { headers: { token } }
        );

        // Redirect to Stripe checkout
        window.location.href = data.session.url;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process order');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!cartData?.data?.products?.length) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping & Payment Details</h2>
          
          {/* Shipping Details */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Address Details</label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="01[0125][0-9]{8}"
                  title="Egyptian phone number format (11 digits)"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="form-radio text-blue-500"
                />
                <span>Cash on Delivery</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="form-radio text-blue-500"
                />
                <span>Online Payment (Credit/Debit Card)</span>
              </label>
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 
              paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order'}
          </button>
        </form>

       
        <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 space-y-4">
            {cartData.data.products.map(item => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.count} × EGP {item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-medium">EGP {(item.price * item.count).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>EGP {cartData.data.totalCartPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;