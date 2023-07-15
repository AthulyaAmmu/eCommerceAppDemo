import axios from 'axios';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

