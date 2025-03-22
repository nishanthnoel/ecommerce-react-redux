// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";
const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null
}

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order)=>{
    const response = await createOrder(order)
    return response.data;
  }
)

// Create a slice for the counter state
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(createOrderAsync.fulfilled, (state, action)=>{
      state.status="idle"
      state.orders.push(action.payload)
      state.currentOrder = action.payload; // Order placed successfully, set the flag
    });
  },
});

// Export actions so they can be dispatched
export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;

// Export the reducer to be used in the store
export default orderSlice.reducer;
