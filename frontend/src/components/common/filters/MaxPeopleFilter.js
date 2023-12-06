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
      <FormControl
        sx={{ minWidth: "8vw", marginBottom: "1vh", marginRight: "1vw" }}
      >
        {!selected && (
          <InputLabel style={{ color: "black", opacity: "0.7" }} shrink={false}>
            No. People
          </InputLabel>
        )}

        <Select
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderBottom: 1,
              color: "#3FB295",
              textDecorationColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderBottom: 2,
              color: "#3FB295",
            },
            borderRadius: 0,
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
