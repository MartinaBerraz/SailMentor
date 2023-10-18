import React from "react";
import {
  selectAllYachtTypes,
  fetchYachtTypes,
} from "../../../features/yachtTypes/yachtTypesSlice";
import { setYachtTypesFilter } from "../../../features/filters/filtersSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const YachtTypesFilter = () => {
  const [selected, setSelected] = React.useState("");
  const yachtTypeStatus = useSelector((state) => state.yachtTypes.status);
  const error = useSelector((state) => state.yachtTypes.error);

  const dispatch = useDispatch();
  const yachtTypesOptions = useSelector(selectAllYachtTypes);

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchYachtTypes());
    }
  }, [yachtTypeStatus, dispatch]);

  const handleYachtTypeChange = (e) => {
    console.log(e);
    setSelected(e.target.value);
    const selectedYachtType = e.target.value;

    dispatch(setYachtTypesFilter(selectedYachtType));
  };

  return (
    <div>
      <FormControl sx={{ minWidth: "10vw" }}>
        <InputLabel id="demo-simple-select-label">Yacht Type</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="Yacht Type"
          onChange={handleYachtTypeChange}
        >
          {yachtTypesOptions.map((yachtType) => (
            <MenuItem value={yachtType.id}>{yachtType.description}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default YachtTypesFilter;
