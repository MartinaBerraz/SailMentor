import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setDestinationFilter } from "../../features/filters/filtersSlice";
import { useDispatch } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: "Kotta One, sans-serif",
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white", // Change the label color when focused
          },
          "& label": {
            color: "white", // Text color for the label
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            borderColor: "white !important", // Change the border color when focused
          },
        },
      },
    },
  },
});

export const InputAutocomplete = ({ label, options, parentCallback }) => {
  const [selected, setSelected] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelected(event.target.value);
    parentCallback(event.target.value);
  };
  {
    console.log(selected);
  }
  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined" sx={{ width: "20%" }}>
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          {label}
        </InputLabel>
        <Select
          sx={{
            marginLeft: "1%",
            borderRadius: "10px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              opacity: "0.6",
              color: "white",
              textDecorationColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              color: "white",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected ? selected : ""}
          style={{ color: "white" }} // Change the color of the selected item
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default InputAutocomplete;
