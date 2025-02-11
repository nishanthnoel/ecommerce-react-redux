// src/features/counter/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productAPI";

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
// Create a slice for the counter state
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle"
    
  },
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the counter
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled,  (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      }).addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        // Optional: Store the error message
        state.error = action.error.message;
      });
      
     ;
  },
});

// Export actions so they can be dispatched
export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;


// Export the reducer to be used in the store
export default productSlice.reducer;
