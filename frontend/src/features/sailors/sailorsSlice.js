import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  destinations: [],
  status: "idle",
  error: null,
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

export const addSailor = createAsyncThunk(
  "sailors/addSailor",
  async (formData) => {
    try {
      // Here, you can submit the formData to the server using the client or perform any other logic.
      // Replace this with the actual API call or logic for adding a sailor.

      // For example:
      const response = await client.post("sailors/", formData);

      // You can return the new sailor data from the response
      return response.data;
    } catch (error) {
      console.error("Error adding sailor:", error);
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
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.destinations.push(action.payload);
    // });
  },
});

export const selectAllSailors = (state) => state.sailors.sailors;

export const selectSailorById = (state, sailorId) =>
  state.sailors.sailors.find((sailor) => sailor.id === sailorId);

export const { sailorAdded, sailorUpdated, reactionAdded } =
  sailorsSlice.actions;

export const selectDestinationNameById = (state, sailorId) => {
  const sailor = state.sailors.sailors.find((sailor) => sailor.id === sailorId);
  return sailor?.name || "Unknown Sailor";
};

export default sailorsSlice.reducer;
