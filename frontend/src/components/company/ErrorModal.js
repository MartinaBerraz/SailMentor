import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ErrorModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Error
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, marginBottom: "3vh" }}
        >
          Cannot update or delete. Please cancel the upcoming bookings first.
        </Typography>
        <Button variant="contained" onClick={onClose}>
          Ok
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
