import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");
const todayStartOfTheDay = today.startOf("day");

const theme = createTheme({
  //   customDatePicker: {
  //     "& .MuiIconButton-root.MuiPickersCalendarHeader-iconButton": {
  //       color: "white", // Change the color of the calendar icon
  //     },
  //     "& .MuiInputBase-input": {
  //       color: "white", // Change the color of the text input
  //     },
  //     // Add other styles as needed
  //   },
});

const InputDatePicker = ({ label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} />
    </LocalizationProvider>
  );
};

export default InputDatePicker;
