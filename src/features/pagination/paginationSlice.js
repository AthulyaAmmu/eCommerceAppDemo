import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
    itemsPerPage: import.meta.env.VITE_PAGINATION_COUNT,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setCurrentPage, setItemsPerPage } = paginationSlice.actions;

export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectItemsPerPage = (state) => state.pagination.itemsPerPage;

export default paginationSlice.reducer;
