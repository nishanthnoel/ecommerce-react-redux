// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"; // Correct default import
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    product: productReducer, // Use the default export from productSlice
    auth: authReducer,
    cart: cartReducer,
  },
});
