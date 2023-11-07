import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  experiences: [],
  status: "idle",
  error: null,
};

export const fetchExperiences = createAsyncThunk(
  "experiences/fetchExperiences",
  async () => {
    try {
      const response = await client.get("experiences/");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching experiences:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

const experiencesSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {
    experienceAdded: {
      reducer(state, action) {
        state.experiences.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { experienceId, reaction } = action.payload;
      const existingExperience = state.experiences.find(
        (experience) => experience.id === experienceId
      );
      if (existingExperience) {
        existingExperience.reactions[reaction]++;
      }
    },
    experienceUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingExperience = state.experiences.find(
        (experience) => experience.id === id
      );
      if (existingExperience) {
        existingExperience.title = title;
        existingExperience.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExperiences.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.destinations.push(action.payload);
    // });
  },
});

export const selectAllExperiences = (state) => state.experiences.experiences;

export const selectDestinationById = (state, experienceId) =>
  state.experiences.experiences.find(
    (experience) => experience.id === experienceId
  );

export const { experienceAdded, experienceUpdated, reactionAdded } =
  experiencesSlice.actions;

export const selectExperienceById = (state, experienceId) => {
  const experience = state.experiences.experiences.find(
    (experience) => experience.id === experienceId
  );
  return experience?.name || "Unknown Experience";
};

export default experiencesSlice.reducer;
