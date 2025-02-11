// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"; // Correct default import

export const store = configureStore({
  reducer: {
    product: productReducer, // Use the default export from productSlice
  },
});
