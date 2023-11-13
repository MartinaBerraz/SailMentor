import React from "react";
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

  return (
    <div>
      <Box>
        <FormControl
          sx={{
            minWidth: "20vw",
            color: "white",
            borderColor: "white",
            borderBlock: 0,
          }}
        >
          {selected ? null : <InputLabel>Destinations</InputLabel>}
          <Select
            sx={{
              // backgroundColor: "#3FB295",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            value={selected}
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
