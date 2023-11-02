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
import { FormControl } from "@mui/material";

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
      <FormControl
        sx={{ minWidth: "20vw", marginBottom: "2vh", marginTop: "4vh" }}
      >
        <InputLabel id="demo-simple-select-label">Destinations</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="Destinations"
          onChange={handleDestinationChange}
        >
          {destinationOptions.map((destination) => (
            <MenuItem value={destination.id}>{destination.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DestinationFilter;
