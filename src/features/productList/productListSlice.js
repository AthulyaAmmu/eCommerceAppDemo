import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/products';
import { fetchCategories, fetchProductsByCategory } from '../../api/category';

const initialState = {
  products: [],
  allCategories:[],
  status: 'idle',
  error: null,
};

export const fetchProductsAsync = createAsyncThunk(
  'productList/fetchProducts',
  async (selectedCategory) => {    
    const response = await (selectedCategory === 'All' || selectedCategory === undefined )? fetchProducts() : fetchProductsByCategory(selectedCategory);
    return response;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'productList/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCategories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productListSlice.reducer;
