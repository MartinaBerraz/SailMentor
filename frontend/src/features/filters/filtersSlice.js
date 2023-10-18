// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  maxPeople: 0,
  noCabins: 0,
  yachtType: "",
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
  },
});

export const {
  setDestinationFilter,
  setMaxPeopleFilter,
  setNoCabinsFilter,
  setYachtTypesFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
