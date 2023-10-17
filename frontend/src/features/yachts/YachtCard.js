import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import Box from "@mui/material/Box";

export const YachtCard = ({ yacht }) => {
  const borderedGridItem = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: "40vh",
        minWidth: "25vw",
        margin: "2%",
        marginTop: "5%",
      }}
    >
      {console.log(yacht)}
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={yacht.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {yacht.company_name} - {yacht.length_in_feet}
          </Typography>

          <Grid container style={borderedGridItem}>
            <Grid item xs={6} md={4}>
              <Typography> {yacht.max_people}</Typography>
              <PeopleIcon> </PeopleIcon>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography> {yacht.no_cabins}</Typography>
              <HotelIcon> </HotelIcon>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography> {yacht.length_in_feet}</Typography>length
            </Grid>
          </Grid>
        </CardContent>
        <Button variant="contained" color="primary" sx={{ marginBottom: "1%" }}>
          Book Now
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default YachtCard;
