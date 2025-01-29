// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchCount from "./authAPI"
const initialState = {
  value: 0,
  status: "idle"
}

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount)=>{
    const response = await fetchCount(amount)
    return response.data;
  }
)

// Create a slice for the counter state
const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the counter
    },
  },
  extraReduers: (builder) => {
    builder.addCase(incrementAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(incrementAsync.fulfilled, (state, action)=>{
      state.status="idle"
      state.value += action.payload
    });
  },
});

// Export actions so they can be dispatched
export const { increment } = authSlice.actions;

export const selectCount = (state) => state.counter.value;

// Export the reducer to be used in the store
export default authSlice.reducer;
