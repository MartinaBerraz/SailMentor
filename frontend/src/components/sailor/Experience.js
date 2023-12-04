import React from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import ExperienceModal from "./ExperienceModal";

const Experience = ({ experience }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div onClick={handleOpenModal}>
        <Card
          sx={{
            maxWidth: "25vw",
            minHeight: "50vh",
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
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
      <ExperienceModal
        experience={experience}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Experience;
