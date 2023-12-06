import React from "react";
import { useDispatch } from "react-redux";
import {
  setCrewedFilter,
  setNoCabinsFilter,
} from "../../../features/filters/filtersSlice";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";

const CrewedFilter = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(false); // Use boolean state for a single Checkbox

  const handleCrewedChange = () => {
    setSelected((prevSelected) => !prevSelected); // Toggle the value

    dispatch(setCrewedFilter(!selected)); // Dispatch the updated value
  };

  return (
    <div>
      <FormControl sx={{ minWidth: "8vw" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selected}
              onChange={handleCrewedChange}
              color="primary"
              style={{
                color: "#3FB295",
              }}
            />
          }
          label={`Crewed`}
        />
      </FormControl>
    </div>
  );
};

export default CrewedFilter;
