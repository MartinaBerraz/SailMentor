import { configureStore } from "@reduxjs/toolkit";
import yachtsReducer from "../features/yachts/yachtsSlice";
import usersReducer from "../features/users/usersSlice";
import filtersReducer from "../features/filters/filtersSlice";

import destinationsReducer from "../features/destinations/destinationsSlice";

export default configureStore({
  reducer: {
    yachts: yachtsReducer,
    users: usersReducer,
    destinations: destinationsReducer,
    filters: filtersReducer,
  },
});
