// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"; // Correct default import
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer, // Use the default export from productSlice
    auth: authReducer,
  },
});
