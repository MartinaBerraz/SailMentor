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
      <Card
        sx={{
          marginInline: "2vw",
          paddingBlock: "2vh",
          borderColor: "#3FB295",
          borderRadius: "20px",
          backgroundColor: "white",
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
