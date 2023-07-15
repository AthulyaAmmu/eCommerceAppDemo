import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?sort=desc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
