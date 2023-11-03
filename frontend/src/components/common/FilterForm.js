import React from "react";
import DestinationFilter from "./filters/DestinationFilter";
import { Card, Divider, Grid, Typography } from "@mui/material";
import MaxPeopleFilter from "./filters/MaxPeopleFilter";
import NoCabinsFilter from "./filters/NoCabinsFilter";
import YachtTypesFilter from "./filters/YachtTypeFilter";
import DateAndNightsPicker from "./filters/DateAndNightsPicker";
import background from "../images/background.jpg";

const FilterForm = () => {
  return (
    <>
      <Card
        sx={{
          marginInline: "1vw",
          paddingTop: "2vh",
          borderColor: "#3FB295",
          borderRadius: "20px",
          backgroundImage: `url(${background})`, // Use the imported image
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
        }}
      >
        <Grid container>
          <Grid item xs={6} md={4} sx={{ marginBottom: "2vh" }}>
            <MaxPeopleFilter sx={{ paddingBlock: "2px" }} />
            <YachtTypesFilter sx={{ mt: "2vh" }} />
          </Grid>
          <Grid item xs={6} md={4} sx={{ marginBottom: "2vh" }}>
            <DestinationFilter sx={{ marginBottom: "2vh" }} />
          </Grid>
          <Grid item xs={6} md={4} sx={{ marginBottom: "2vh" }}>
            <NoCabinsFilter />
            <DateAndNightsPicker />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default FilterForm;
