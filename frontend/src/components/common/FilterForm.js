import React from "react";
import DestinationFilter from "./filters/DestinationFilter";
import { Divider, Grid } from "@mui/material";
import MaxPeopleFilter from "./filters/MaxPeopleFilter";
import NoCabinsFilter from "./filters/NoCabinsFilter";
import YachtTypesFilter from "./filters/YachtTypeFilter";

const FilterForm = () => {
  return (
    <>
      <Divider
        variant="middle"
        sx={{
          marginBottom: "3%",
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
        }}
      />

      <Grid container alignItems="center" sx={{ marginTop: "2%" }}>
        <Grid item xs={1} sx={{ marginLeft: "10%" }}>
          <MaxPeopleFilter />
        </Grid>
        <Grid item xs={2}>
          <NoCabinsFilter />
        </Grid>
        <Grid item xs={2}>
          <YachtTypesFilter />
        </Grid>
        <Grid item xs={1}>
          <DestinationFilter />
        </Grid>
      </Grid>
    </>
  );
};

export default FilterForm;
