// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";
const initialState = {
  orders: [],
  status: "idle"
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
    increment: (state) => {
      state.value += 1; // Increment the counter
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(createOrderAsync.fulfilled, (state, action)=>{
      state.status="idle"
      state.orders.push(action.payload)
    });
  },
});

// Export actions so they can be dispatched
export const { increment } = orderSlice.actions;

export const selectOrder = (state) => state.counter.value;

// Export the reducer to be used in the store
export default orderSlice.reducer;
