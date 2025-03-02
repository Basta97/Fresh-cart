import axios from 'axios';

const API_URL = 'https://ecommerce.routemisr.com/api/v1/products';

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch products';
  }
};