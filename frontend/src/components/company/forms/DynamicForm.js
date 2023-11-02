import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { addYacht } from "../../../features/yachts/yachtsSlice";
import {
  fetchYachtTypes,
  selectAllYachtTypes,
} from "../../../features/yachtTypes/yachtTypesSlice";
import { selectCurrentCompanyId } from "../../../features/companies/companiesSlice";
import { selectCurrentUserFk } from "../../../features/auth/authSlice";
import { selectAllDestinations } from "../../../features/destinations/destinationsSlice";
import { fetchDestinations } from "../../../features/destinations/destinationsSlice";

const DynamicForm = ({ formData }) => {
  const yachtTypes = useSelector(selectAllYachtTypes);
  const yachtTypeStatus = useSelector((state) => state.yachtTypes.status);
  const error = useSelector((state) => state.yachtTypes.error);

  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchYachtTypes());
    }
  }, [yachtTypeStatus, dispatch]);

  const destinations = useSelector(selectAllDestinations);
  const destinationStatus = useSelector((state) => state.destinations.status);

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchDestinations());
    }
  }, [destinationStatus, dispatch]);

  const [formValues, setFormValues] = useState({});
  const yearsRange = Array.from(
    { length: currentYear - 1849 },
    (_, index) => currentYear - index
  );
  const handleChange = (e, fieldName) => {
    setFormValues({
      ...formValues,
      [fieldName]: e.target.value,
    });
  };

  const company = useSelector(selectCurrentUserFk);

  const handleFileUpload = (e, fieldName) => {
    // Handle file upload

    var formData = new FormData();

    const file = e.target.files[0];

    formData.append(fieldName, file);
    if (file) {
      // Update your component state with the FormData object
      setFormValues({
        ...formValues,
        [fieldName]: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with the collected formValues
    const data = { ...formValues, company: company };
    console.log(data);

    dispatch(addYacht(data));
  };

  const customButtonStyle = {
    backgroundColor: "#3FB295", // Replace with your desired color
    color: "white", // Text color
    margin: "1px",
  };

  return (
    <form onSubmit={handleSubmit}>
      {formData.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {(() => {
            switch (field.type) {
              case "CharField":
                return (
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 12, mt: "2%" }}
                  >
                    <TextField
                      type="text"
                      label={field.name}
                      value={formValues[field.name] || ""}
                      onChange={(e) => handleChange(e, field.name)}
                    />
                  </FormControl>
                );
              case "select":
                return (
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, mt: "2%" }}
                  >
                    <Select
                      label={field.label}
                      value={formValues[field.name] || ""}
                      onChange={(e) => handleChange(e, field.name)}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              case "FloatField":
                return (
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, mt: "2%" }}
                  >
                    <TextField
                      label={field.name.replace(/_/g, " ")}
                      type="number" // Set the input type to "number" for float values
                      value={formValues[field.name] || ""}
                      onChange={(e) => handleChange(e, field.name)}
                      inputProps={{
                        step: "0.01", // Set the step attribute for float precision (e.g., 2 decimal places)
                        min: field.minValue || 0, // Set a minimum value if needed
                      }}
                    />
                  </FormControl>
                );
              case "FileField":
                return (
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, mt: "2%" }}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ backgroundColor: "black" }}
                    >
                      Upload file
                      <input
                        type="file"
                        accept="image/*" // You can specify the accepted file types
                        style={{ display: "none" }}
                        onChange={(e) => handleFileUpload(e, "image")} // Replace "fileField" with the actual field name
                      />
                    </Button>
                  </FormControl>
                );
              case "IntegerField":
                if (!field.name.includes("year")) {
                  // Render a Select with numbers from 0 to 20
                  return (
                    <>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120, mt: "2%" }}
                      >
                        <InputLabel id="input-label">
                          {field.name.replace(/_/g, " ")}
                        </InputLabel>

                        <Select
                          labelId="input-label"
                          label={field.name.replace(/_/g, " ")}
                          value={formValues[field.name] || ""}
                          onChange={(e) => handleChange(e, field.name)}
                        >
                          {Array.from({ length: 21 }, (_, index) => (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          ))}
                          {console.log(field.name.replace(/_/g, " "))}
                        </Select>
                      </FormControl>
                    </>
                  );
                } else {
                  return (
                    <>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="input-label">
                          {field.name.replace(/_/g, " ")}
                        </InputLabel>

                        <Select
                          labelId="input-label"
                          label={field.name.replace(/_/g, " ")}
                          value={formValues[field.name] || ""}
                          onChange={(e) => handleChange(e, field.name)}
                        >
                          {yearsRange.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                          {console.log(field.name.replace(/_/g, " "))}
                        </Select>
                      </FormControl>
                    </>
                  );
                }
              case "ForeignKey": {
                if (field.name === "yacht_type") {
                  return (
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120, mt: "2%" }}
                    >
                      <InputLabel id="input-label">
                        {field.name.replace(/_/g, " ")}
                      </InputLabel>

                      <Select
                        labelId="input-label"
                        label={field.name.replace(/_/g, " ")}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleChange(e, field.name)}
                      >
                        {console.log(yachtTypes)}
                        {yachtTypes.map((yachtType) => (
                          <MenuItem key={yachtType.id} value={yachtType.id}>
                            {yachtType.description}
                          </MenuItem>
                        ))}
                        {console.log(field.name.replace(/_/g, " "))}
                      </Select>
                    </FormControl>
                  );
                } else if (field.name === "destination") {
                  return (
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120, mt: "2%" }}
                    >
                      <InputLabel id="input-label">
                        {field.name.replace(/_/g, " ")}
                      </InputLabel>

                      <Select
                        labelId="input-label"
                        label={field.name.replace(/_/g, " ")}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleChange(e, field.name)}
                      >
                        {console.log(destinations)}
                        {destinations.map((destination) => (
                          <MenuItem key={destination.id} value={destination.id}>
                            {destination.name}
                          </MenuItem>
                        ))}
                        {console.log(field.name.replace(/_/g, " "))}
                      </Select>
                    </FormControl>
                  );
                }
              }

              // Add more cases for other data types as needed
              default:
                return null; // Default case
            }
          })()}
        </div>
      ))}
      <Button type="submit" variant="contained" style={customButtonStyle}>
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
