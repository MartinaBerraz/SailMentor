import React from "react";
import DestinationFilter from "./filters/DestinationFilter";
import { Card, Divider, Grid, Typography } from "@mui/material";
import MaxPeopleFilter from "./filters/MaxPeopleFilter";
import NoCabinsFilter from "./filters/NoCabinsFilter";
import YachtTypesFilter from "./filters/YachtTypeFilter";
import DateAndNightsPicker from "./filters/DateAndNightsPicker";

const FilterForm = () => {
  return (
    <>
      <Typography sx={{ color: "#3FB295" }}>
        <h3>Plan Your Trip</h3>
      </Typography>
      <Card
        sx={{
          marginInline: "2vw",
          marginBlock: "2vh",
          paddingBlock: "2vh",
          borderColor: "#3FB295",
        }}
      >
        <YachtTypesFilter sx={{ marginBottom: "2vh" }} />
        <DestinationFilter sx={{ marginBottom: "2vh" }} />

        <Grid container>
          <Grid item xs={6} md={6} sx={{ marginBottom: "2vh" }}>
            <MaxPeopleFilter />
          </Grid>
          <Grid item xs={6} md={6} sx={{ marginBottom: "2vh" }}>
            <NoCabinsFilter />
          </Grid>
        </Grid>

        <DateAndNightsPicker />
      </Card>
    </>
  );
};

export default FilterForm;
