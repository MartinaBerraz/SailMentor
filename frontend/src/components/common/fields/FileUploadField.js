import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";

function FileUploadField({ handleFileUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mt: "2%" }}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ backgroundColor: "black" }}
      >
        Upload file
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
    </FormControl>
  );
}

export default FileUploadField;
