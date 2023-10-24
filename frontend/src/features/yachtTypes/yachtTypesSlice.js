import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  yachtTypes: [],
  status: "idle",
  error: null,
};

export const fetchYachtTypes = createAsyncThunk(
  "yachtTypes/fetchYachtTypes",
  async () => {
    try {
      const response = await client.get("yachtTypes/");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching yachtTypes:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

const yachtTypesSlice = createSlice({
  name: "yachtTypes",
  initialState,
  reducers: {
    destinationAdded: {
      reducer(state, action) {
        state.yachtTypes.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { destinationId, reaction } = action.payload;
      const existingDestination = state.yachtTypes.find(
        (destination) => destination.id === destinationId
      );
      if (existingDestination) {
        existingDestination.reactions[reaction]++;
      }
    },
    destinationUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingDestination = state.yachtTypes.find(
        (destination) => destination.id === id
      );
      if (existingDestination) {
        existingDestination.title = title;
        existingDestination.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchYachtTypes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchYachtTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log(action.payload);
        state.yachtTypes = action.payload;
      })
      .addCase(fetchYachtTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.yachtTypes.push(action.payload);
    // });
  },
});

export const selectAllYachtTypes = (state) => state.yachtTypes.yachtTypes;

export const selectDestinationById = (state, destinationId) =>
  state.yachtTypes.yachtTypes.find(
    (destination) => destination.id === destinationId
  );

export const { destinationAdded, destinationUpdated, reactionAdded } =
  yachtTypesSlice.actions;

export const selectDestinationNameById = (state, destinationId) => {
  const destination = state.yachtTypes.yachtTypes.find(
    (destination) => destination.id === destinationId
  );
  return destination?.name || "Unknown Destination";
};

export default yachtTypesSlice.reducer;
