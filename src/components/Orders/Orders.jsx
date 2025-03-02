import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { tokenContext } from '../../contexts/tokenContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {token}=useContext(tokenContext);
  
  function getId(token){
    const {id} = jwtDecode(token);
    fetchOrders(id);
   
  }
  const fetchOrders = async (id) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
    
      
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    
    
    token && getId(token);
   
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
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Helmet>
        <title>My Orders</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-xl mb-4">No orders found</p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.details}
                  </p>
                  <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
                  {order.isPaid ? <p className="text-green-600">Paid</p>:<p className="text-red-600">NotPaid</p>}
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Order Info</h2>
                  <p className="text-gray-600">
                    Payment Method: {order.paymentMethodType}
                  </p>
                  <p className="text-gray-600">
                    Total Price: ${order.totalOrderPrice}
                  </p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <span className="text-green-600 font-medium">Delivered</span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div>
                        <h4 className="font-medium">{item.product.title}</h4>
                        <p className="text-gray-600">
                          Quantity: {item.count}
                        </p>
                        <p className="text-gray-600">
                          Price: ${item.price * item.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;