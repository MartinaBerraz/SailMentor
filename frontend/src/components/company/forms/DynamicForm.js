import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DynamicForm = ({ formData }) => {
  const currentYear = new Date().getFullYear();

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
  const handleFileUpload = (e, fieldName) => {
    // Handle file upload here
    const file = e.target.files[0];
    // You can process the file as needed
    console.log("File uploaded:", file);
    // You can also set it in the formValues state if necessary
    setFormValues({
      ...formValues,
      [fieldName]: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with the collected formValues
    console.log(formValues);
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
                        onChange={(e) => handleFileUpload(e, "fileField")} // Replace "fileField" with the actual field name
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
