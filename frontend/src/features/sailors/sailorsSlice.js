import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import bcrypt from "bcryptjs";

const initialState = {
  sailors: [],
  status: "idle",
  error: null,
  current: {},
};

export const fetchSailors = createAsyncThunk(
  "sailors/fetchSailors",
  async () => {
    try {
      const response = await client.get("sailors/");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching sailors:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

export const fetchCurrentSailor = createAsyncThunk(
  "sailors/fetchCurrentSailor",
  async (sailorId) => {
    try {
      const response = await client.get(`sailors/${sailorId}/`);
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching sailor:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

export const addSailor = createAsyncThunk(
  "sailors/addSailor",
  async (formData) => {
    try {
      const formDataComplete = {
        ...formData,
        user_type: "Sailor",
      };

      const response = await client.post("create_user/", formDataComplete);
      // You can return the new sailor data from the response
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const sailorsSlice = createSlice({
  name: "sailors",
  initialState,
  reducers: {
    sailorAdded: {
      reducer(state, action) {
        state.sailors.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { sailorId, reaction } = action.payload;
      const existingSailor = state.sailors.find(
        (sailor) => sailor.id === sailorId
      );
      if (existingSailor) {
        existingSailor.reactions[reaction]++;
      }
    },
    sailorUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingSailor = state.sailors.find((sailor) => sailor.id === id);
      if (existingSailor) {
        existingSailor.title = title;
        existingSailor.content = content;
      }
    },
    setCurrentSailor: (state, action) => {
      console.log(action.payload);
      console.log(state.sailors);
      state.current = state.sailors.find(
        (sailor) => sailor.id === action.payload
      );

      console.log(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSailors.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSailors.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log(action.payload);
        state.sailors = action.payload;
      })
      .addCase(fetchSailors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSailor.pending, (state, action) => {})
      .addCase(addSailor.fulfilled, (state, action) => {
        // Add any fetched posts to the array
        console.log(action.payload);
      })
      .addCase(addSailor.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchCurrentSailor.pending, (state, action) => {})
      .addCase(fetchCurrentSailor.fulfilled, (state, action) => {
        // Add any fetched posts to the array
        state.current = action.payload;
      })
      .addCase(fetchCurrentSailor.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllSailors = (state) => state.sailors.sailors;
export const selectSailorsStatus = (state) => state.sailors.status;
export const selectSailorsErrors = (state) => state.sailors.error;

export const selectCurrentSailor = (state) => state.sailors.current;

export const selectSailorById = (state, sailorId) =>
  state.sailors.sailors.find((sailor) => sailor.id === sailorId);

export const { sailorAdded, sailorUpdated, reactionAdded, setCurrentSailor } =
  sailorsSlice.actions;

export const selectDestinationNameById = (state, sailorId) => {
  const sailor = state.sailors.sailors.find((sailor) => sailor.id === sailorId);
  return sailor?.name || "Unknown Sailor";
};

export default sailorsSlice.reducer;
