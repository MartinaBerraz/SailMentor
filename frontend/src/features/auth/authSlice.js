import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../api/client";
import { selectAllCompanies } from "../companies/companiesSlice";
import { getUserType } from "./authActions"; // Import the calculateUserType function

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
      });
  },
});

export const selectCurrentUserFk = (state) => state.auth.userFk;

export const selectAuthStatus = (state) => state.auth.status;

export const selectAuthData = (state) => state.auth;

export const isAuthenticated = (state) => state.auth.token;

export const selectUserType = (state) => state.auth.userType;

export const { clearToken, setLoginError } = authSlice.actions;

export default authSlice.reducer;
