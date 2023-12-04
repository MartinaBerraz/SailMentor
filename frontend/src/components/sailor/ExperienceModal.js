import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Carrousel from "./Carrousel";
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
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExperienceModal = ({ experience, modalOpen, handleCloseModal }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          marginInline: "25vw",
          marginBlock: "3vh",
          maxHeight: "90vh",
          width: "50vw",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <CardHeader
          sx={{
            backgroundColor: "#3FB295",
            paddingInline: "3vw",
            paddingBlock: "4vh",
            color: "white",
          }}
          avatar={
            <Avatar
              sx={{
                bgcolor: "red",
                opacity: "0.8",
              }}
              aria-label="recipe"
            >
              {experience.sailor_first_name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${experience.sailor_first_name} ${experience.sailor_last_name}`}
          subheader="Author"
        />
        <CardContent
          sx={{
            paddingBlock: "4vh",
          }}
        >
          <Typography
            sx={{
              color: "#3FB295",
              justifyContent: "center",
              display: "flex",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {experience.name}
          </Typography>
          <Typography
            sx={{
              justifyContent: "center",
              display: "flex",
              marginBottom: "4vh",
            }}
            id="modal-modal-description"
          >
            in {experience.destination_name}
          </Typography>
          <CardMedia
            sx={{
              justifyContent: "center",
              display: "flex",
              marginBottom: "4vh",
            }}
          >
            <Carrousel images={experience.images} />
          </CardMedia>
          <Typography
            sx={{
              justifyContent: "center",
              display: "flex",
              marginBottom: "4vh",
            }}
            variant="body2"
            color="text.secondary"
          >
            {experience.brief_description}
          </Typography>
          <Typography
            sx={{
              justifyContent: "center",
              display: "flex",
              marginBottom: "4vh",
            }}
            id="modal-modal-description"
          >
            {experience.detailed_description}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: "2vh", fontWeight: "bold" }}
          >
            Precautions:
          </Typography>
          <Typography id="modal-modal-description" sx={{ marginBottom: "2vh" }}>
            {experience.precautions}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: "2vh", fontWeight: "bold" }}
          >
            Recommendation:
          </Typography>
          <Typography id="modal-modal-description" sx={{ marginBottom: "2vh" }}>
            {experience.recommendation}
          </Typography>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ExperienceModal;
