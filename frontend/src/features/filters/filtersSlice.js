// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  maxPeople: 0,
  noCabins: 0,
  yachtType: "",
  availability: false,
  startDate: null, // Add the start date filter
  noNights: 1,
  // Add more filter criteria here
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDestinationFilter: (state, action) => {
      state.destination = action.payload;
    },
    setMaxPeopleFilter: (state, action) => {
      state.maxPeople = action.payload;
    },
    setNoCabinsFilter: (state, action) => {
      state.noCabins = action.payload;
    },
    setYachtTypesFilter: (state, action) => {
      state.yachtType = action.payload;
    },
    setStartDateFilter: (state, action) => {
      state.startDate = action.payload;
    },
    setNoNightsFilter: (state, action) => {
      state.noNights = action.payload;
    },
  },
});

export const {
  setDestinationFilter,
  setMaxPeopleFilter,
  setNoCabinsFilter,
  setYachtTypesFilter,
  setStartDateFilter,
  setNoNightsFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
