import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  yachts: [],
  status: "idle",
  error: null,
};

export const fetchYachts = createAsyncThunk("yachts/fetchYachts", async () => {
  try {
    const response = await client.get("yachts/");
    return response.data;
  } catch (error) {
    // Handle the error, e.g., log it or return a default value
    console.error("Error fetching yachts:", error);
    throw error; // Rethrow the error if needed
  }
});

const yachtsSlice = createSlice({
  name: "yachts",
  initialState,
  reducers: {
    yachtAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        // omit prepare logic
      },
    },
    reactionAdded(state, action) {
      const { yachtId, reaction } = action.payload;
      const existingYacht = state.yachts.find((yacht) => yacht.id === yachtId);
      if (existingYacht) {
        existingYacht.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingYacht = state.yachts.find((yacht) => yacht.id === id);
      if (existingYacht) {
        existingYacht.title = title;
        existingYacht.content = content;
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
      // Check if the field is a file (e.g., "image") and append it accordingly
      if (fieldName === "image" && data[fieldName] instanceof File) {
        formData.append(fieldName, data[fieldName], data[fieldName].name);
      } else {
        // Append other non-file fields
        formData.append(fieldName, data[fieldName]);
      }
    }
    console.log(formData.get("image"));

    const response = await client.post("create_yacht/", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding yacht:", error);
    throw error;
  }
});

export const selectAllYachts = (state) => state.yachts.yachts;

export const selectYachtById = (state, yachtId) =>
  state.yachts.yachts.find((yacht) => yacht.id === yachtId);

export const { yachtAdded, yachtUpdated, reactionAdded } = yachtsSlice.actions;

export default yachtsSlice.reducer;
