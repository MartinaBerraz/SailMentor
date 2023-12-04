// ConfirmationModal.js

import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="secondary"
            sx={{ opacity: "0.7" }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
