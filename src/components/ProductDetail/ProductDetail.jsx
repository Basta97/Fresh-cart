import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import RelatedProducts from "./components/RelatedProduct/RelatedProduct";
import { CartContext } from "../../contexts/cartContext";

const ProductDetails = () => {
  const { id, categoryId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let{addToCart}=useContext(CartContext)
  const fetchProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchProduct(id);
  }, [id]);

  const handleImageChange = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ImSpinner8 className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Product not found
      </div>
    );
  }
  

  const handleAddToCart = (id) => {
    addToCart(id);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Images */}
            <div className="relative mb-8 lg:mb-0">
              <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleImageChange("prev")}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex
                            ? "bg-red-600"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleImageChange("next")}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:pl-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.ratingsAverage
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>

              <p className="text-2xl font-bold text-red-600 mb-6">
                EGP{product.price.toLocaleString()}
                {product.priceAfterDiscount && (
                  <span className="ml-3 text-gray-400 line-through">
                    EGP{product.priceAfterDiscount.toLocaleString()}
                  </span>
                )}
              </p>

              <p className="text-gray-600 mb-8">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Brand</p>
                  <p className="font-medium">{product.brand.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{product.category.name}</p>
                </div>
              </div>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={() => handleAddToCart(product._id)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product && (
        <RelatedProducts
          categoryId={product.category._id}
          currentProductId={product._id}
        />
      )}
    </>
  );
};

export default ProductDetails;
