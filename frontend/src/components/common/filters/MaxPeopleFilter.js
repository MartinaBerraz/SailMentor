import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllDestinations } from "../../../features/destinations/destinationsSlice";
import { setMaxPeopleFilter } from "../../../features/filters/filtersSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";

const MaxPeopleFilter = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("");
  const MAX_PEOPLE = 15;

  const maxPeopleOptions = Array.from(
    { length: MAX_PEOPLE },
    (_, index) => index + 1
  );

  const handleMaxPeopleChange = (e) => {
    setSelected(e.target.value);
    const selectedMaxPeople = e.target.value;

    dispatch(setMaxPeopleFilter(selectedMaxPeople));
  };

  return (
    <div>
      <FormControl sx={{ minWidth: "10vw", backgroundColor: "white" }}>
        <InputLabel id="demo-simple-select-label">No. People</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="Destinations"
          onChange={handleMaxPeopleChange}
        >
          {maxPeopleOptions.map((no) => (
            <MenuItem value={no}>{no}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MaxPeopleFilter;
