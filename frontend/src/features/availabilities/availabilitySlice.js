import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  availabilities: [],
  status: "idle",
  error: null,
  unbookedAvailabilities: [],
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

export const deleteUnbookedAvailability = createAsyncThunk(
  "availabilities/deleteUnbookedAvailability",
  async (availabilityId) => {
    try {
      await client.delete(`availabilities/${availabilityId}/`);
      return availabilityId;
    } catch (error) {
      console.error("Error deleting unbooked availability:", error);
      throw error;
    }
  }
);

export const fetchUnbookedAvailabilities = createAsyncThunk(
  "availabilities/fetchUnbookedAvailabilities",
  async (yachtId) => {
    try {
      const response = await client.get(
        `yachts/${yachtId}/unbooked-availabilities/`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching unbooked availabilities:", error);
      throw error;
    }
  }
);

export const addUnbookedAvailability = createAsyncThunk(
  "availabilities/addUnbookedAvailability",
  async (availabilityData) => {
    try {
      const response = await client.post("availabilities/", availabilityData);
      return response.data;
    } catch (error) {
      console.error("Error adding unbooked availability:", error);
      throw error;
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
    availabilityDeleted: {
      reducer(state, action) {
        const availabilityId = action.payload;
        state.unbookedAvailabilities = state.unbookedAvailabilities.filter(
          (availability) => availability.id !== availabilityId
        );
      },
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
      })
      .addCase(fetchUnbookedAvailabilities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnbookedAvailabilities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.unbookedAvailabilities = action.payload;
      })
      .addCase(fetchUnbookedAvailabilities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUnbookedAvailability.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.unbookedAvailabilities.push(action.payload);
      })
      .addCase(deleteUnbookedAvailability.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUnbookedAvailability.fulfilled, (state, action) => {
        state.status = "idle";
        const availabilityId = action.payload;
        state.unbookedAvailabilities = state.unbookedAvailabilities.filter(
          (availability) => availability.id !== availabilityId
        );
      });
  },
});

export const selectAllAvailabilities = (state) =>
  state.availabilities.availabilities;

export const selectUnbookedAvailabilities = (state) =>
  state.availabilities.unbookedAvailabilities;

export const selectDestinationById = (state, availabilityId) =>
  state.availabilities.availabilities.find(
    (availability) => availability.id === availabilityId
  );

export const {
  availabilityAdded,
  availabilityUpdated,
  reactionAdded,
  availabilityDeleted,
} = availabilitiesSlice.actions;

export default availabilitiesSlice.reducer;
