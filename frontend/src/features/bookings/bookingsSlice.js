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
        console.log(action.payload);
        state.bookings = action.payload;
      })
      .addCase(fetchCompanyBookings.rejected, (state, action) => {
        state.status = "failed";
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

export const { bookingAdded, bookingUpdated, reactionAdded } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
