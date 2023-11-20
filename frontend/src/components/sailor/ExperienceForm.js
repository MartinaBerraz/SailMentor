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
import { blue, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DestinationFilter from "../common/filters/DestinationFilter";

const ExperienceForm = ({ sailor, modalOpen, handleCloseModal }) => {
  return (
    sailor && (
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
            avatar={<Avatar aria-label="recipe">{sailor.avatar}</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={sailor.username}
            subheader="Author"
          />
          <CardContent
            sx={{
              paddingBlock: "4vh",
              display: "flex",
              flexDirection: "column", // or row, depending on your layout
              alignItems: "center", // this property aligns children along the cross axis
              justifyContent: "center", // this property aligns children along the main axis
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
            ></Typography>
            <Typography
              sx={{
                justifyContent: "center",
                display: "flex",
                marginBottom: "4vh",
              }}
              id="modal-modal-description"
            >
              Your Experience in
            </Typography>
            <DestinationFilter
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            />
          </CardContent>
        </Card>
      </Modal>
    )
  );
};

export default ExperienceForm;
