import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Carrousel from "../../components/sailor/Carrousel";
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

const YachtModal = ({ yacht, modalOpen, handleCloseModal }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          marginInline: "18vw",
          marginBlock: "3vh",
          maxHeight: "90vh",
          width: "64vw",
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
            textAlign: "center",
          }}
          title={`${yacht.name}`}
          subheader="Author"
        />
        {console.log(yacht)}

        <CardContent
          sx={{
            paddingInline: "3vw",
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
            {yacht.destination_name}
          </Typography>
          <CardMedia
            sx={{
              justifyContent: "center",
              display: "flex",
              marginBottom: "4vh",
            }}
          >
            {/* <Carrousel images={yacht.images} /> */}
          </CardMedia>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default YachtModal;
