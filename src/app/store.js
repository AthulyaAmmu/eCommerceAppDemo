import { configureStore } from '@reduxjs/toolkit';
import productListReducer from '../features/productList/productListSlice';
import productDetailsReducer from '../features/productDetails/productDetailsSlice';
import paginationSlice from '../features/pagination/paginationSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    pagination: paginationSlice,
  },
});

export default store;
