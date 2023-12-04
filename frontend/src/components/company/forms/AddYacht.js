import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
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
import {
  Box,
  FormControlLabel,
  Grid,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import placeholderImage from "../../images/placeholder.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AvailabilityCalendar from "../AvailabilityCalendar";

const AddYacht = ({ formData }) => {
  const yachtTypes = useSelector(selectAllYachtTypes);
  const yachtTypeStatus = useSelector((state) => state.yachtTypes.status);
  const error = useSelector((state) => state.yachtTypes.error);

  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();

  const [showCalendarModal, setShowCalendarModal] = useState(false);

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchYachtTypes());
    }
    console.log(formData);
  }, [yachtTypeStatus, dispatch]);

  const destinations = useSelector(selectAllDestinations);
  const destinationStatus = useSelector((state) => state.destinations.status);

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchDestinations());
    }
  }, [destinationStatus, dispatch]);

  const [formValues, setFormValues] = useState(formData || {});
  const yearsRange = Array.from(
    { length: currentYear - 1849 },
    (_, index) => currentYear - index
  );
  const handleChange = (e, fieldName) => {
    const updatedFormValues = {
      ...formValues,
      [fieldName]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    setFormValues(updatedFormValues);
    console.log(updatedFormValues);
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

    // Use FileReader to read the file and set the preview image
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
      setFormValues({
        ...formValues,
        [fieldName]: file,
      });
    }
  };
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exclude unwanted fields from formValues
    const { destination_name, yacht_type_description, ...filteredFormValues } =
      formValues;

    // Add the company field to the filtered form values
    const data = { ...filteredFormValues, company: company };
    console.log(data);

    dispatch(addYacht(data));
    setShowCalendarModal(true);
  };

  const handleCloseCalendarModal = () => {
    setShowCalendarModal(false);
  };

  const customButtonStyle = {
    backgroundColor: "#3FB295", // Replace with your desired color
    color: "white", // Text color
    margin: "1px",
    marginBottom: "3vh",
    width: "20vw",
    minHeight: "7vh",
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={16}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          borderRadius: "10px",
          marginInline: "15vw",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "#3FB295",
            width: "100%",
            color: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            marginBottom: "5vh",
            paddingBlock: "1vh",
          }}
        >
          <Typography>
            <h3>Insert yacht data</h3>
          </Typography>
        </Paper>

        <Grid container>
          <Grid item md={6}>
            <FormControl
              variant="standard"
              sx={{
                minWidth: "15vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Display the preview image if available */}
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Uploaded Preview"
                  style={{
                    width: "200px",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                <img
                  src={formValues["image"] || placeholderImage}
                  alt="Default Image"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "150px",
                    borderRadius: "10px",
                  }}
                />
              )}
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: "#000000",
                  opacity: "0.8",
                  minHeight: "5vh",
                }}
              >
                Upload file
                <input
                  type="file"
                  accept="image/*" // You can specify the accepted file types
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, "newImage")} // Replace "fileField" with the actual field name
                />
              </Button>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl
              variant="standard"
              sx={{ minWidth: 12, width: "20vw", marginTop: "5vh" }}
            >
              <TextField
                type="text"
                label="name"
                value={formValues["name"] || ""}
                onChange={(e) => handleChange(e, "name")}
              />
            </FormControl>
            <FormControl sx={{ marginTop: "3vh", opacity: "0.8" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formValues["crewed"] || false}
                    onChange={(e) => handleChange(e, "crewed")}
                    style={{ color: "#3FB295" }}
                  />
                }
                label="Crewed"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          container
          md={9}
          sx={{ marginTop: "5vh", display: "flex", alignItems: "center" }}
        >
          <Grid item md={4}>
            <FormControl variant="standard" sx={{ width: "12vw" }}>
              <TextField
                labelId="input-label"
                label="Year Built"
                type="number"
                value={formValues["year_built"] || ""}
                onChange={(e) => handleChange(e, "year_built")}
                inputProps={{
                  step: "1", // Set the step attribute for float precision (e.g., 2 decimal places)
                  min: 1900, // Set a minimum value if needed
                  max: 2023,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={4}>
            <FormControl variant="standard" sx={{ width: "12vw" }}>
              <TextField
                labelId="input-label"
                label="Max people"
                type="number"
                value={formValues["max_people"] || ""}
                onChange={(e) => handleChange(e, "max_people")}
                inputProps={{
                  step: "1", // Set the step attribute for float precision (e.g., 2 decimal places)
                  min: 1, // Set a minimum value if needed
                  max: 20,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl variant="standard" sx={{ width: "12vw" }}>
              <TextField
                label="Price per Night"
                type="number" // Set the input type to "number" for float values
                value={formValues["price_per_night"] || ""}
                onChange={(e) => handleChange(e, "price_per_night")}
                inputProps={{
                  step: "0.01", // Set the step attribute for float precision (e.g., 2 decimal places)
                  min: 0, // Set a minimum value if needed
                  max: 100000000,
                  defaultValue: "100",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container md={8} sx={{ marginTop: "8vh", marginBottom: "5vh" }}>
          <Grid item md={6} sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl
              variant="standard"
              sx={{ width: "12vw", marginBottom: "2vh" }}
            >
              <TextField
                label="Length in feet"
                type="number" // Set the input type to "number" for float values
                value={formValues["length_in_feet"] || ""}
                onChange={(e) => handleChange(e, "length_in_feet")}
                inputProps={{
                  step: "0.01", // Set the step attribute for float precision (e.g., 2 decimal places)
                  min: 0, // Set a minimum value if needed
                  max: 100,
                  defaultValue: "28",
                }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ width: "12vw" }}>
              <TextField
                labelId="input-label"
                label="No. cabins"
                type="number"
                value={formValues["no_cabins"] || ""}
                onChange={(e) => handleChange(e, "no_cabins")}
                inputProps={{
                  step: "1", // Set the step attribute for float precision (e.g., 2 decimal places)
                  min: 1, // Set a minimum value if needed
                  max: 20,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={5}>
            <FormControl
              variant="standard"
              sx={{ minWidth: "15vw", marginBottom: "3vh" }}
            >
              <InputLabel id="input-label">Yacht Type</InputLabel>

              <Select
                labelId="input-label"
                label="yacht_type"
                value={formValues["yacht_type"] || ""}
                onChange={(e) => handleChange(e, "yacht_type")}
              >
                {yachtTypes.map((yachtType) => (
                  <MenuItem key={yachtType.id} value={yachtType.id}>
                    {yachtType.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: "15vw" }}>
              <InputLabel id="input-label">Destination</InputLabel>

              <Select
                labelId="input-label"
                label="Destination"
                value={formValues["destination"] || ""}
                onChange={(e) => handleChange(e, "destination")}
              >
                {console.log(destinations)}
                {destinations.map((destination) => (
                  <MenuItem key={destination.id} value={destination.id}>
                    {destination.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" style={customButtonStyle}>
          Submit
        </Button>
      </Paper>
      {/* Conditionally render the AvailabilityCalendar modal */}
      {
        //   showCalendarModal && (
        //     <Modal onClose={handleCloseCalendarModal} open={showCalendarModal}>
        //       {/* Container element with necessary styles */}
        //       <Paper
        //         sx={{
        //           position: "absolute",
        //           top: "50%",
        //           left: "50%",
        //           padding: "10px",
        //           transform: "translate(-50%, -50%)",
        //           borderRadius: "5px",
        //           display: "flex",
        //         }}
        //       >
        //         {/* You can pass any props or content to your modal */}
        //         <AvailabilityCalendar />
        //       </Paper>
        //     </Modal>
        //   )
      }
    </form>
  );
};

export default AddYacht;
