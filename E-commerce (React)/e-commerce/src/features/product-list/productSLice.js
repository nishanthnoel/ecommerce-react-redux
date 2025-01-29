// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for the counter state
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;  // Increment the counter
    }
 
  },
});

// Export actions so they can be dispatched
export const { increment} = counterSlice.actions;

export const selectCount = (state)=> state.counter.value

// Export the reducer to be used in the store
export default counterSlice.reducer;
