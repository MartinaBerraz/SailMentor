import React from "react";
import {
  selectAllYachtTypes,
  fetchYachtTypes,
} from "../../../features/yachtTypes/yachtTypesSlice";
import { setYachtTypesFilter } from "../../../features/filters/filtersSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, FormControl } from "@mui/material";
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
      <FormControl sx={{ width: "15vw" }}>
        {selected ? null : (
          <Box
            sx={{
              color: "black",
              textAlign: "center", // Center the label
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputLabel
              style={{
                color: "black",
                opacity: 0.8,
                justifyContent: "center",
                display: "flex",
                alignSelf: "center",
                justifySelf: "center",
              }}
              shrink={false}
            >
              Yacht Type
            </InputLabel>
          </Box>
        )}
        <Select
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              textDecorationColor: "white",
              border: 0,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 0,
              color: "white",
            },
            alignContent: "center",
            alignItems: "center",
            // backgroundColor: "#3FB295",
            backgroundColor: "white",
            borderRadius: "0",
          }}
          value={selected}
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
