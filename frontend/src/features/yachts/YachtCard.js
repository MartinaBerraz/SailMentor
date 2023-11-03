import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchYachtTypes,
  selectAllYachtTypes,
} from "../yachtTypes/yachtTypesSlice";

export const YachtCard = ({ yacht }) => {
  const dispatch = useDispatch();

  const numberOfNights = useSelector((state) => state.filters.noNights);

  const yachtTypeStatus = useSelector((state) => state.yachtTypes.status);
  const yachtTypes = useSelector(selectAllYachtTypes);

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchYachtTypes());
    }
  }, [yachtTypeStatus, dispatch]);

  const borderedGridItem = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10%",
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
      {console.log(numberOfNights)}
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={yacht.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {yacht.company_name} - {yacht.length_in_feet}
          </Typography>
          <Typography color="grey">
            {
              yachtTypes.find((type) => type.id === yacht.yacht_type)
                .description
            }
          </Typography>

          <Grid container style={borderedGridItem}>
            <Grid item xs={3} md={4}>
              <Typography> {yacht.max_people}</Typography>
              <PeopleIcon> </PeopleIcon>
            </Grid>
            <Grid item xs={3} md={4}>
              <Typography> {yacht.no_cabins}</Typography>
              <HotelIcon> </HotelIcon>
            </Grid>
            <Grid item xs={3} md={4}>
              <Typography> {yacht.length_in_feet}</Typography>length
            </Grid>
          </Grid>
        </CardContent>
        <Button variant="contained" color="primary" sx={{ marginBottom: "1%" }}>
          <Typography sx={{ textTransform: "none" }}>
            Book for ${numberOfNights * yacht.price_per_night}
          </Typography>
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default YachtCard;
