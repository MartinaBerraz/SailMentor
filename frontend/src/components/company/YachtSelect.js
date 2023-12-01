import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  fetchCompanyYachts,
  selectAllYachts,
} from "../../features/yachts/yachtsSlice";

export const YachtSelect = (props) => {
  const dispatch = useDispatch();
  const yachtStatus = useSelector((state) => state.yachts.status);
  const [loading, setLoading] = useState(true);
  const [selectedYacht, setSelectedYacht] = useState(null);
  const yachtsList = useSelector(selectAllYachts);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null;

  const handleYachtSelection = (event) => {
    const selectedYachtId = event.target.value;
    setSelectedYacht(selectedYachtId);
    console.log(selectedYachtId);
    props.onYachtSelection(selectedYachtId);
  };

  useEffect(() => {
    if (yachtStatus === "idle") {
      dispatch(fetchCompanyYachts(companyFk));
    }
  }, [yachtStatus, loading]);

  return (
    <>
      <FormControl sx={{ width: "25vw", marginBottom: "0.5vh" }}>
        <InputLabel
          id="yacht-select-label"
          sx={{
            "&.Mui-focused": {
              color: "inherit", // Set the focused color to inherit
            },
          }}
        >
          Select a Yacht
        </InputLabel>
        <Select
          label="yacht_type"
          labelId="yacht-select-label"
          value={selectedYacht || ""}
          onChange={handleYachtSelection}
          sx={{
            marginLeft: "1%",
            borderRadius: "10px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
        >
          {yachtsList.map((yacht) => (
            <MenuItem key={yacht.id} value={yacht.id}>
              {yacht.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
