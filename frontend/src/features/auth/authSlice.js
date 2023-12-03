import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  user: {},
  userType: "",
  token: null, // Initial token state
  error: "",
  userFk: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await client.post("login/", credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.message; // Throw an error to be handled in the rejected action
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      // Assume you have an API endpoint for password reset
      const response = await client.post("send_reset_password_code/", email);
      return response;
    } catch (error) {
      // Handle network errors or other exceptions
      return rejectWithValue(error.message);
    }
  }
);

export const verifyCodeAndResetPassword = createAsyncThunk(
  "auth/verifyCodeAndResetPassword",
  async (data, { rejectWithValue }) => {
    try {
      // Call your API or service to verify the code and reset the password
      const response = await client.post("verify_code/", data);

      // Return the response data or handle it as needed
      return response.data;
    } catch (error) {
      console.log(error.message);
      // Use rejectWithValue to include the error message in the rejected action
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      console.log("CLEAR");
      state.user = null; // Clear the token
      state.token = null;
      state.userType = null;
    },
    setLoginError: (state, error) => {
      state.error = error; // Clear the token
    },
    resetStatus: (state, error) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Add any fetched posts to the array

        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.error = "";
        state.userType = action.payload.user_type;
        state.userFk = action.payload.user_fk;
        state.status = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // Add any fetched posts to the array

        state.status = "success";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(verifyCodeAndResetPassword.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(verifyCodeAndResetPassword.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.error.message);
        state.status = "failed";
      })
      .addCase(verifyCodeAndResetPassword.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export const selectCurrentUserFk = (state) => state.auth.userFk;

export const selectAuthStatus = (state) => state.auth.status;

export const selectAuthError = (state) => state.auth.error;

export const selectAuthData = (state) => state.auth;

export const isAuthenticated = (state) => state.auth.token;

export const selectUserType = (state) => state.auth.userType;

export const { clearToken, setLoginError, resetStatus } = authSlice.actions;

export default authSlice.reducer;
