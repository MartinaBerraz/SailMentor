import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  availabilities: [],
  status: "idle",
  error: null,
};

export const fetchAvailabilities = createAsyncThunk(
  "availabilities/fetchAvailabilities",
  async () => {
    try {
      const response = await client.get("availabilities/");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching availabilities:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

const availabilitiesSlice = createSlice({
  name: "availabilities",
  initialState,
  reducers: {
    availabilityAdded: {
      reducer(state, action) {
        state.availabilities.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { availabilityId, reaction } = action.payload;
      const existingAvailability = state.availabilities.find(
        (availability) => availability.id === availabilityId
      );
      if (existingAvailability) {
        existingAvailability.reactions[reaction]++;
      }
    },
    availabilityUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingAvailability = state.availabilities.find(
        (availability) => availability.id === id
      );
      if (existingAvailability) {
        existingAvailability.title = title;
        existingAvailability.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAvailabilities.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAvailabilities.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log(action.payload);
        state.availabilities = action.payload;
      })
      .addCase(fetchAvailabilities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.availabilities.push(action.payload);
    // });
  },
});

export const selectAllAvailabilities = (state) =>
  state.availabilities.availabilities;

export const selectDestinationById = (state, availabilityId) =>
  state.availabilities.availabilities.find(
    (availability) => availability.id === availabilityId
  );

export const { availabilityAdded, availabilityUpdated, reactionAdded } =
  availabilitiesSlice.actions;

export default availabilitiesSlice.reducer;
