import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setStartDateFilter,
  setNoNightsFilter,
} from "../../../features/filters/filtersSlice"; // Replace with your actual actions
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import { Grid } from "@mui/material";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");
const todayStartOfTheDay = dayjs();
const DateAndNightsPicker = () => {
  const MAX_NUMBER = 30;

  const noNightsOptions = Array.from(
    { length: MAX_NUMBER },
    (_, index) => index + 1
  );
  const [startDate, setStartDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(5); // Default to 1 night
  const dispatch = useDispatch();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Calculate and dispatch the number of nights based on your logic
    dispatch(setStartDateFilter(date.toISOString()));
    dispatch(setNoNightsFilter(numberOfNights));
  };

  const handleNoNightsChange = (event) => {
    const nights = parseInt(event.target.value, 10);
    setNumberOfNights(nights);
    dispatch(setNoNightsFilter(nights));
  };

  return (
    <div>
      <Grid container sx={{ marginTop: "2vh" }}>
        <Grid item md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                backgroundColor: "white",
                borderRadius: 0,

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                  border: 0,
                  borderBottom: 1,
                  color: "#3FB295",
                  textDecorationColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: 0,
                  borderBottom: 0,
                  color: "#3FB295",
                },
              }}
              label="Departure date"
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={todayStartOfTheDay} // Set the maximum selectable date
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={6}>
          <FormControl sx={{ minWidth: "10vw" }}>
            <InputLabel
              style={{ color: "black", opacity: "0.7" }}
              id="demo-simple-select-label"
            >
              No. Nights
            </InputLabel>

            <Select
              sx={{
                backgroundColor: "white",
                borderRadius: 0,

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
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
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={numberOfNights}
              label="No Nights"
              type="number"
              onChange={handleNoNightsChange}
            >
              {noNightsOptions.map((no) => (
                <MenuItem value={no}>{no}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default DateAndNightsPicker;
