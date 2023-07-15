import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductById } from '../../api/products';

const initialState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProductByIdAsync = createAsyncThunk(
  'productDetails/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productDetailsSlice.reducer;
