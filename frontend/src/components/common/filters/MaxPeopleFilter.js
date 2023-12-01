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
      <FormControl sx={{ minWidth: "10vw" }}>
        {!selected && <InputLabel shrink={false}>No. People</InputLabel>}

        <Select
          sx={{
            backgroundColor: "white",
            "&.Mui-focused": {
              borderColor: "red", // Set your desired border color here
            },
            borderRadius: "10px",
          }}
          value={selected}
          onChange={handleMaxPeopleChange}
          renderValue={(value) => (value ? `${value} people` : "No. People")}
        >
          {maxPeopleOptions.map((no) => (
            <MenuItem value={no}>{no}</MenuItem>
            // {`${no}+ "people"`}
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MaxPeopleFilter;
