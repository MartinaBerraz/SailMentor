import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

export const fetchCompanyBookings = createAsyncThunk(
  "bookings/fetchCompanyBookings",
  async (companyId) => {
    try {
      const response = await client.get(`bookings/company/${companyId}/`);
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching bookings:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

export const fetchSailorBookings = createAsyncThunk(
  "bookings/fetchSailorBookings",
  async (sailorFk) => {
    try {
      const response = await client.get(`bookings/sailor/${sailorFk}/`);
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching bookings:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (data) => {
    try {
      const response = await client.post("create_booking/", data);
      return response.data;
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (availabilityFk) => {
    try {
      const response = await client.delete(`availabilities/${availabilityFk}/`);
      return response.data;
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  }
);

export const deleteSailorBooking = createAsyncThunk(
  "bookings/deleteSailorBooking",
  async (booking) => {
    console.log(booking);
    try {
      const response = await client.delete(
        `availabilities/${booking.availability}/`
      );
      return response.data;
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    bookingAdded: {
      reducer(state, action) {
        state.bookings.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { bookingId, reaction } = action.payload;
      const existingBooking = state.bookings.find(
        (booking) => booking.id === bookingId
      );
      if (existingBooking) {
        existingBooking.reactions[reaction]++;
      }
    },
    updateBookings: (state, action) => {
      state.status = "idle";
    },
    bookingUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingBooking = state.bookings.find(
        (booking) => booking.id === id
      );
      if (existingBooking) {
        existingBooking.title = title;
        existingBooking.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompanyBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.bookings = action.payload;
      })
      .addCase(fetchCompanyBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSailorBookings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSailorBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.bookings = action.payload;
      })
      .addCase(fetchSailorBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBooking.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        // Add any fetched posts to the array
        state.status = "idle";
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteSailorBooking.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteSailorBooking.fulfilled, (state, action) => {
        // Add any fetched posts to the array
        state.status = "idle";
      })
      .addCase(deleteSailorBooking.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.availabilities.push(action.payload);
    // });
  },
});

export const selectAllBookings = (state) => state.bookings.bookings;

export const selectDestinationById = (state, bookingId) =>
  state.bookings.bookings.find((booking) => booking.id === bookingId);

export const selectBookingsByYachtId = (state, yachtId) =>
  state.bookings.bookings.find((booking) => booking.id === yachtId);

export const { bookingAdded, bookingUpdated, reactionAdded, updateBookings } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
