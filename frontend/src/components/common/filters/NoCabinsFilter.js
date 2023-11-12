import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllDestinations } from "../../../features/destinations/destinationsSlice";
import { setNoCabinsFilter } from "../../../features/filters/filtersSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";

const NoCabinsFilter = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("");
  const MAX_CABINS = 8;

  const NoCabinsOptions = Array.from(
    { length: MAX_CABINS },
    (_, index) => index + 1
  );

  const handleNoCabinsChange = (e) => {
    setSelected(e.target.value);
    const selectedNoCabins = e.target.value;

    dispatch(setNoCabinsFilter(selectedNoCabins));
  };

  return (
    <div>
      <FormControl sx={{ minWidth: "10vw" }}>
        {selected ? null : <InputLabel>No. Cabins</InputLabel>}

        <Select
          renderValue={(value) => (value ? `${value} cabins` : "No. Cabins")}
          sx={{ backgroundColor: "white", borderRadius: "10px" }}
          value={selected}
          onChange={handleNoCabinsChange}
        >
          {NoCabinsOptions.map((no) => (
            <MenuItem value={no}>{no}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default NoCabinsFilter;
