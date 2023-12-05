import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, Paper, Stack, Alert } from "@mui/material";
import ExperienceModal from "./ExperienceModal";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../features/experiences/experiencesSlice";

const Experience = ({ experience, owner, onDeleteExperience }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setConfirmDelete(false);
  };

  useEffect(() => {
    console.log(experience.id);

    if (confirmDelete) {
      // Dispatch the action to delete the experience
      dispatch(deleteExperience(experience.id));
    }
    // Reset confirmDelete state for the next use
    setConfirmDelete(false);
  }, [confirmDelete, onDeleteExperience, experience.id]);

  return (
    <>
      <div onClick={handleOpenModal}>
        <Card
          sx={{
            width: "25vw",
            height: "50vh",
            margin: "1%",
            marginTop: "6%",
            marginBottom: "4%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {experience.sailor_first_name[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={experience.name}
            subheader={experience.destination_name}
          />
          <CardMedia
            component="img"
            height="194"
            image={`http://localhost:8000${experience.images[0]}`}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minHeight: "7vh", maxHeight: "7vh" }}
            >
              {experience.brief_description}
            </Typography>
          </CardContent>

          {owner ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "10vw", backgroundColor: "black", opacity: "0.8" }}
                onClick={handleOpenModal}
              >
                Delete
              </Button>
            </Box>
          ) : (
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          )}
        </Card>
      </div>
      {modalOpen && (
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400, // Adjust the width as needed
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center content vertically
            }}
          >
            <Stack spacing={2} p={2}>
              <Typography variant="h5">Confirm Deletion</Typography>
              <Typography>
                Are you sure you want to delete this experience?
              </Typography>
              <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Modal>
      )}
      {confirmDelete && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          Experience deleted successfully!
        </Alert>
      )}
    </>
  );
};

export default Experience;
