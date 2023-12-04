import React from "react";
import DestinationFilter from "./filters/DestinationFilter";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import MaxPeopleFilter from "./filters/MaxPeopleFilter";
import NoCabinsFilter from "./filters/NoCabinsFilter";
import YachtTypesFilter from "./filters/YachtTypeFilter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";

const FilterForm = () => {
  return (
    <Box
      sx={{
        paddingBottom: "2vh",
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <DestinationFilter />
      <Accordion
        sx={{
          marginTop: "20vh",
          width: "20%",
          position: "absolute",
          right: "3%", // Align to the right
          zIndex: 1000, // Ensure the accordion is above other elements
        }}
        component={Paper}
        elevation={6}
      >
        <AccordionSummary
          expandIcon={<TuneIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              paddingTop: "4vh",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "0.5vh",
              borderTop: "0.1px solid white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "0.5vh",
              }}
            >
              <MaxPeopleFilter />
              <NoCabinsFilter />
            </Box>
            <YachtTypesFilter />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterForm;
