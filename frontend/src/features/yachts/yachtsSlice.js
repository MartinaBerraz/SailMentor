import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  yachts: [],
  status: "idle",
  error: null,
  selectedYacht: null,
  detailedYacht: {},
};

export const fetchYachts = createAsyncThunk("yachts/fetchYachts", async () => {
  try {
    const response = await client.get("yachts/");
    console.log("FETCHED");
    return response.data;
  } catch (error) {
    // Handle the error, e.g., log it or return a default value
    console.error("Error fetching yachts:", error);
    throw error; // Rethrow the error if needed
  }
});

export const fetchYachtDetails = createAsyncThunk(
  "yachts/fetchYachtDetails",
  async (pk) => {
    try {
      const response = await client.get(`yachts/${pk}`);
      console.log("FETCHED");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching yachts:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

export const fetchCompanyYachts = createAsyncThunk(
  "yachts/fetchCompanyYachts",
  async (companyFk) => {
    try {
      const response = await client.get(`yachts/company/${companyFk}/`);
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching yachts:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

const yachtsSlice = createSlice({
  name: "yachts",
  initialState,
  reducers: {
    yachtAdded: {
      reducer(state, action) {
        state.yachts.push(action.payload);
      },
      prepare(title, content, userId) {
        // omit prepare logic
      },
    },
    updateYachts: (state, action) => {
      state.status = "idle";
    },
    selectYacht: (state, action) => {
      state.selectedYacht = action.payload;
    },
    deselectYacht: (state) => {
      state.selectedYacht = null; // Set selected yacht to null
    },
    reactionAdded(state, action) {
      const { yachtId, reaction } = action.payload;
      const existingYacht = state.yachts.find((yacht) => yacht.id === yachtId);
      if (existingYacht) {
        existingYacht.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchYachts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchYachts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.yachts = action.payload;
      })
      .addCase(fetchYachts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCompanyYachts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyYachts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.yachts = action.payload;
      })
      .addCase(fetchCompanyYachts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchYachtDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchYachtDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.detailedYacht = action.payload;
      })
      .addCase(fetchYachtDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addYacht.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addYacht.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.detailedYacht = action.payload;
      })
      .addCase(addYacht.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewYacht.fulfilled, (state, action) => {
    //   state.yachts.push(action.payload);
    // });
  },
});

export const addYacht = createAsyncThunk("yachts/addYacht", async (data) => {
  try {
    const formData = new FormData();

    // Iterate over the form values and append them to the FormData object
    for (const fieldName in data) {
      // Check if the field is a file (e.g., "newImage") and append it accordingly
      if (fieldName === "newImage" && data[fieldName] instanceof File) {
        formData.append("image", data["newImage"], data["newImage"].name);
      } else if (fieldName === "image") {
        // If you want to handle "image" separately, you can add specific logic here
      } else {
        // Append other non-file fields
        formData.append(fieldName, data[fieldName]);
      }
    }

    if (formData.get("id")) {
      const response = await client.put(
        `update_yacht/${formData.get("id")}/`,
        formData
      );
      return response.data;
    } else {
      const response = await client.post("create_yacht/", formData);
      return response.data;
    }
  } catch (error) {
    console.error("Error adding yacht:", error);
    throw error;
  }
});

export const selectYachtStatus = (state) => state.yachts.status;

export const selectSelectedYacht = (state) => state.yachts.selectedYacht;

export const selectAllYachts = (state) => state.yachts.yachts;

export const selectYachtById = (state, id) =>
  state.yachts.yachts.find((yacht) => yacht.id === id);

export const selectYachtByName = (state, yachtName) =>
  state.yachts.yachts.find((yacht) => yacht.name === yachtName);

export const {
  yachtAdded,
  yachtUpdated,
  reactionAdded,
  selectYacht,
  deselectYacht,
  updateYachts,
} = yachtsSlice.actions;

export default yachtsSlice.reducer;
