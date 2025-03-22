// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice"; // Correct default import
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    product: productReducer, // Use the default export from productSlice
    auth: authReducer,
    cart: cartReducer,
    order : orderReducer, // Use the default export from orderSlice.js file. This file contains the slice for the order feature.  // In the main store.js file, we import the order
    user: userReducer,
  },
});
