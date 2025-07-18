// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, loginUser, signOut } from "./authAPI";

const initialState = {
  loggedInUserToken: null, // this is the user object, which is used to store the user data. both for login(fulfilled) and signup(fulfilled). this should only contain the identity information
  status: "idle",
  error: null,
  userChecked: false,
  justLoggedIn: false,
};

// code for creating a new user
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

// code for checking user login credentials
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const checkAuthAsync = createAsyncThunk(" user/checkAuth", async () => {
//   try {
//     const response = await checkAuth();
//     return response.data;
//   } catch (error) {
//     return console.log(error);
//   }
// });

export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    console.log("checkAuthAsync dispatched");
    try {
      const response = await checkAuth(); // must include credentials
      return response.data;
    } catch (error) {
      // ✅ Properly reject so reducer handles it
      return rejectWithValue(error.response?.data || error.message);
    }
  }
  // {
  //   condition: (_, { getState }) => {
  //     const { auth } = getState();
  //     return !auth.userChecked;
  //   },}
);

// export const updateUserAsync = createAsyncThunk(
//   "user/updateUser",
//   async (update) => {
//     const response = await updateUser(update);
//     return response.data;
//   }
// );
export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// Create a slice for the counter state
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the counter
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.loggedInUserToken += action.payload;// old code
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = "error";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.justLoggedIn = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
        // console.log("error")
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
        state.userChecked = false;  //the error for redirecting to / than to the older page because this was false
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
        state.justLoggedIn = false;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

// Export actions so they can be dispatched
export const { increment } = authSlice.actions;

// export const selectLoggedInUserToken = (state) => state.user.loggedInUser; // this throws an error, auth of the store should be mentioned
export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectJustLoggedIn = (state) => state.auth.justLoggedIn;

// export const selectCount = (state) => state.counter.value;

// Export the reducer to be used in the store
export default authSlice.reducer;
