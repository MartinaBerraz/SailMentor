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
import { Grid } from "@mui/material";

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
          height: "50vh",
          width: "64vw",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20vh",
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
          title={yacht.destination_name}
          subheader={yacht.yacht_type_description}
        />
        {console.log(yacht)}

        <CardContent
          sx={{
            paddingBlock: "5vh",
          }}
        >
          <CardMedia
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* <Carrousel images={yacht.images} /> */}
          </CardMedia>
          <Grid container>
            <Grid item md={6}>
              <div>
                <Box
                  component="img"
                  sx={{
                    height: 200,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  src={yacht.image}
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <Typography
                sx={{
                  color: "#3FB295",
                  justifyContent: "center",
                  display: "flex",
                }}
                id="modal-modal-title"
              >
                <h2 style={{ lineHeight: "0.5" }}>{yacht.name}</h2>{" "}
              </Typography>
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
                id="modal-modal-title"
              >
                <p style={{ lineHeight: "0" }}>{yacht.company_name}</p>
              </Typography>
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <p style={{ lineHeight: "0", color: "grey" }}>
                  Price per night: ${yacht.price_per_night}
                </p>
              </Typography>

              <Typography
                sx={{
                  color: "grey",
                  justifyContent: "center",
                  display: "flex",
                  textAlign: "center",
                  marginInline: "3vw",
                }}
                id="modal-modal-subtitle"
              >
                <p>{`This yacht was built in ${yacht.year_built} and it is ${yacht.length_in_feet} ft. long. It has ${yacht.no_cabins} cabins and up to ${yacht.max_people} people can be on board.`}</p>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default YachtModal;
