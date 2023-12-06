import React from "react";
import { useDispatch } from "react-redux";
import { setNoCabinsFilter } from "../../../features/filters/filtersSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

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
      <FormControl sx={{ minWidth: "8vw" }}>
        {!selected ? (
          <InputLabel
            style={{ color: "black", opacity: "0.7" }}
            shrink={false}
            id="demo-simple-select-label"
          >
            No. Cabins
          </InputLabel>
        ) : null}

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
          renderValue={(value) => (value ? `${value} cabins` : "No. Cabins")}
          value={selected}
          onChange={handleNoCabinsChange}
        >
          {NoCabinsOptions.map((no) => (
            <MenuItem key={no} value={no}>
              {no}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default NoCabinsFilter;
