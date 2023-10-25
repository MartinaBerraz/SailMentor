import { configureStore } from "@reduxjs/toolkit";
import yachtsReducer from "../features/yachts/yachtsSlice";
import usersReducer from "../features/users/usersSlice";
import filtersReducer from "../features/filters/filtersSlice";

import destinationsReducer from "../features/destinations/destinationsSlice";
import yachtTypesReducer from "../features/yachtTypes/yachtTypesSlice";
import availabilitiesReducer from "../features/availabilities/availabilitySlice";
import fieldInfoReducer from "../features/fieldInfo/fieldInfoSlice";

export default configureStore({
  reducer: {
    yachts: yachtsReducer,
    users: usersReducer,
    destinations: destinationsReducer,
    filters: filtersReducer,
    yachtTypes: yachtTypesReducer,
    availabilities: availabilitiesReducer,
    fieldInfo: fieldInfoReducer,
  },
});
