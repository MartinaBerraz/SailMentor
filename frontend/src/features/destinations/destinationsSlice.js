import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  destinations: [],
  status: "idle",
  error: null,
};

export const fetchDestinations = createAsyncThunk(
  "destinations/fetchDestinations",
  async () => {
    try {
      const response = await client.get("destinations/");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching destinations:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    destinationAdded: {
      reducer(state, action) {
        state.destinations.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { destinationId, reaction } = action.payload;
      const existingDestination = state.destinations.find(
        (destination) => destination.id === destinationId
      );
      if (existingDestination) {
        existingDestination.reactions[reaction]++;
      }
    },
    destinationUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingDestination = state.destinations.find(
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
      .addCase(fetchDestinations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log(action.payload);
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.destinations.push(action.payload);
    // });
  },
});

export const selectAllDestinations = (state) => state.destinations.destinations;

export const selectDestinationById = (state, destinationId) =>
  state.destinations.destinations.find(
    (destination) => destination.id === destinationId
  );

export const { destinationAdded, destinationUpdated, reactionAdded } =
  destinationsSlice.actions;

export const selectDestinationNameById = (state, destinationId) => {
  const destination = state.destinations.destinations.find(
    (destination) => destination.id === destinationId
  );
  return destination?.name || "Unknown Destination";
};

export default destinationsSlice.reducer;
