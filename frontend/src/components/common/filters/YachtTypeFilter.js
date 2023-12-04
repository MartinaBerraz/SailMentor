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
      <FormControl sx={{ minWidth: "17vw" }}>
        {selected ? null : <InputLabel shrink={false}>Yacht Type</InputLabel>}
        <Select
          value={selected}
          onChange={handleYachtTypeChange}
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
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
