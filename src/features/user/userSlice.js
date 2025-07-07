// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
} from "./userAPI";
const initialState = {
  // userOrders: [], //the ordersare set inside userInfo.orders
  status: "idle",
  userInfo: null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data; //this info will be used n case of detailed user info, while auth will only be used for loggedInUser
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

// Create a slice for the counter state
//this user slice to get all the user information like name, email, orders, etc
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the counter
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more form the logged-in user
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more form the logged-in user
        state.userInfo.orders = action.payload; //in action.payload updated user comes. so, user.Orders cannot be action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more form the logged-in user
        state.userInfo = action.payload;
      })
  }
});

// Export actions so they can be dispatched
export const { increment } = userSlice.actions;
//TOdo: change the orders and addresses independent of each other. my code works fine and is independent
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo   = (state) => state.user.userInfo;
export const selectUserInfoStatus   = (state) => state.status;

// Export the reducer to be used in the store
export default userSlice.reducer;
