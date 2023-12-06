import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllDestinations } from "../../../features/destinations/destinationsSlice";
import {
  setDestinationFilter,
  setMaxPeopleFilter,
} from "../../../features/filters/filtersSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, FormControl, Typography } from "@mui/material";

const DestinationFilter = () => {
  const dispatch = useDispatch();

  const initialDestination = useSelector((state) => state.filters.destination);
  const [selected, setSelected] = React.useState(initialDestination);

  const destinationOptions = useSelector(selectAllDestinations);

  const handleDestinationChange = (e) => {
    setSelected(e.target.value);
    const selectedDestination = e.target.value;

    dispatch(setDestinationFilter(selectedDestination));
  };

  useEffect(() => {
    setSelected(initialDestination);
  }, [initialDestination]);

  return (
    <div>
      <Box sx={{ display: "flex", alignSelf: "center" }}>
        <FormControl
          sx={{
            minWidth: "20vw",
            color: "white",

            borderColor: "white",
            borderBlock: 0,
          }}
        >
          {selected ? null : (
            <InputLabel
              sx={{
                "&.Mui-focused": {
                  color: "grey", // Change the color when focused
                },
              }}
              shrink={false}
            >
              Destinations
            </InputLabel>
          )}
          <Select
            sx={{
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                textDecorationColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: 5,
                color: "white",
              },
              // backgroundColor: "#3FB295",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            value={selected ? selected : ""}
            onChange={handleDestinationChange}
          >
            {destinationOptions.map((destination) => (
              <MenuItem value={destination.id}>{destination.name}</MenuItem>
            ))}{" "}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default DestinationFilter;
