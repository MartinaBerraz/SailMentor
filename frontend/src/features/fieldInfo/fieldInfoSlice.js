import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to fetch data types from your API
export const fetchFieldInfo = createAsyncThunk(
  "fieldInfo/fetchFieldInfo",
  async (modelName) => {
    const response = await fetch(`field-info/${modelName}`);
    const data = await response.json();
    return data;
  }
);

const fieldInfoSlice = createSlice({
  name: "fieldInfo",
  initialState: {
    fieldInfo: [],
    status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFieldInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFieldInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fieldInfo = action.payload;
      })
      .addCase(fetchFieldInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectFieldInfo = (state) => state.fieldInfo.fieldInfo;
export const selectFieldInfoStatus = (state) => state.fieldInfo.status;

export default fieldInfoSlice.reducer;
