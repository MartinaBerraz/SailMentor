import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DestinationFilter from "../common/filters/DestinationFilter";
import { Grid } from "@mui/material";
import placeholderImage from "../images/placeholder.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../features/experiences/experiencesSlice";

const ExperienceForm = ({ sailor, modalOpen, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    newImage: null,
    name: "",
    images: [],
    brief_description: "",
    detailed_description: "",
    recommendation: "",
    precautions: "",
  });

  const handleDeleteImage = (index) => {
    const newImages = [...formValues.images];
    newImages.splice(index, 1);
    setFormValues({
      ...formValues,
      images: newImages,
    });
  };

  const handleFileUpload = (e, fieldName) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = [...formValues.images];

      // Handle each selected file
      for (const file of files) {
        const reader = new FileReader();

        reader.onloadend = () => {
          newImages.push({
            file,
            preview: reader.result,
          });

          setFormValues({
            ...formValues,
            images: newImages,
          });
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const destination = useSelector((state) => state.filters.destination);

  const handleSubmit = () => {
    // Handle form submission, e.g., dispatch an action to save experienceData

    const formData = new FormData();

    // Add text fields to the FormData
    formData.append("name", formValues.name);
    formData.append("brief_description", formValues.brief_description);
    formData.append("detailed_description", formValues.detailed_description);
    formData.append("recommendation", formValues.recommendation);
    formData.append("precautions", formValues.precautions);

    // Add the sailor ID and destination to the FormData
    formData.append("sailor", sailor.id);
    formData.append("destination", destination);

    // Add each image file to the FormData
    formValues.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });

    console.log(formValues.images);

    // Dispatch the action with the FormData
    dispatch(addExperience(formData));
  };

  return (
    sailor && (
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          style={{
            marginInline: "25vw",
            marginBlock: "3vh",
            maxHeight: "90vh",
            width: "50vw",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <CardHeader
            style={{
              backgroundColor: "#3FB295",
              paddingInline: "3vw",
              paddingBlock: "4vh",
              color: "white",
            }}
            avatar={<Avatar aria-label="recipe">{sailor.avatar}</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={sailor.username}
            subheader="Author"
          />
          <Typography
            style={{
              color: "#3FB295",
              justifyContent: "center",
              display: "flex",
              marginTop: "3vh",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add Your Experience in
          </Typography>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DestinationFilter />
            {/* Display the preview images if available */}
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "2vh" }}
            >
              {formValues.images.map((image, index) => (
                <Grid item key={index} style={{ position: "relative" }}>
                  <img
                    src={image.preview}
                    alt={`Uploaded Preview ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "75px",
                      borderRadius: "10px",
                      justifyContent: "center",
                    }}
                  />
                  <IconButton
                    onClick={() => handleDeleteImage(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#000000",
                opacity: "0.8",
                minHeight: "5vh",
                marginTop: "3vh",
              }}
            >
              Upload file
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e, "images")}
                multiple // Allow multiple file selection
              />
            </Button>

            {/* Text Fields */}
            <TextField
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              margin="normal"
              style={{ minWidth: "95%" }}
            />
            <TextField
              label="Brief Description"
              name="brief_description"
              value={formValues.brief_description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
              style={{ minWidth: "95%" }}
            />
            <TextField
              label="Detailed Description"
              name="detailed_description"
              value={formValues.detailed_description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              style={{ width: "95%" }}
            />
            <TextField
              label="Recommendation"
              name="recommendation"
              value={formValues.recommendation}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              style={{ width: "95%" }}
            />
            <TextField
              label="Precautions"
              name="precautions"
              value={formValues.precautions}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              style={{ width: "95%" }}
            />

            {/* Submit Button */}
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </Modal>
    )
  );
};

export default ExperienceForm;
