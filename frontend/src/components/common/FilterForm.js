import React from "react";
import DestinationFilter from "./filters/DestinationFilter";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import MaxPeopleFilter from "./filters/MaxPeopleFilter";
import NoCabinsFilter from "./filters/NoCabinsFilter";
import YachtTypesFilter from "./filters/YachtTypeFilter";
import DateAndNightsPicker from "./filters/DateAndNightsPicker";
import background from "../images/background.jpg";

const FilterForm = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: "4vh",
          marginTop: "7vh",
          // marginLeft: "40vw",
          paddingBottom: "0.5vh",
          borderTop: "0.1px solid white", // Add the bottom border with your desired color

          // backgroundImage: `url(${background})`, // Use the imported image
          // backgroundRepeat: "no-repeat",
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
          // backgroundSize: "cover",
        }}
      >
        <Grid container sx={{ marginBottom: "2vh" }}>
          <Grid item xs={6} md={1.6}>
            <MaxPeopleFilter />
          </Grid>
          <Grid item xs={6} md={1.6}>
            <YachtTypesFilter />
          </Grid>
          <Grid item xs={6} md={1.6}>
            <NoCabinsFilter />
            {/* <DateAndNightsPicker /> */}
          </Grid>

          <Grid item xs={6} md={7}>
            <DestinationFilter />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilterForm;
