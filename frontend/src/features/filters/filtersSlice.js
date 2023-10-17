// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  maxPeople: 0,
  noCabins: 0,
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
  },
});

export const { setDestinationFilter, setMaxPeopleFilter, setNoCabinsFilter } =
  filtersSlice.actions;

export default filtersSlice.reducer;
