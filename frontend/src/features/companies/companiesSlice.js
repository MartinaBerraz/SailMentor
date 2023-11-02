import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import bcrypt from "bcryptjs";
import { useSelector } from "react-redux"; // Import the useSelector hook

const initialState = {
  companies: [],
  status: "idle",
  error: null,
  current: {},
};

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    try {
      const response = await client.get("companies/");
      return response.data;
    } catch (error) {
      // Handle the error, e.g., log it or return a default value
      console.error("Error fetching companies:", error);
      throw error; // Rethrow the error if needed
    }
  }
);

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (formData) => {
    try {
      const response = await client.post("create_user/", {
        ...formData,
        user_type: "Company",
      });

      // You can return the new sailor data from the response
      return response.data;
    } catch (error) {
      console.error("Error adding companies:", error);
      throw error;
    }
  }
);

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    companiesAdded: {
      reducer(state, action) {
        state.companies.push(action.payload);
      },
    },
    setCurrentCompany: (state, action) => {
      state.current = state.companies.find(
        (company) => company.id === action.payload
      );
      console.log(action.payload);
    },
    reactionAdded(state, action) {
      const { companyId, reaction } = action.payload;
      const existingCompanies = state.companies.find(
        (company) => company.id === companyId
      );
      if (existingCompanies) {
        existingCompanies.reactions[reaction]++;
      }
    },
    companyUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingCompany = state.companies.find(
        (company) => company.id === id
      );
      if (existingCompany) {
        existingCompany.title = title;
        existingCompany.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log(action.payload);
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addNewDestination.fulfilled, (state, action) => {
    //   state.destinations.push(action.payload);
    // });
  },
});

export const selectCompaniesStatus = (state) => state.companies.status;

export const selectAllCompanies = (state) => state.companies.companies;

export const selectCurrentCompany = (state) => state.companies.current;

export const selectCurrentCompanyId = (state) => state.companies.current.id;

export const selectCompanyById = (state, companyId) =>
  state.companies.companies.find((company) => company.id === companyId);

export const {
  companyAdded,
  companyUpdated,
  reactionAdded,
  setCurrentCompany,
} = companiesSlice.actions;

export const selectDestinationNameById = (state, companyId) => {
  const company = state.companies.companies.find(
    (company) => company.id === companyId
  );
  return company?.name || "Unknown Company";
};

export default companiesSlice.reducer;
