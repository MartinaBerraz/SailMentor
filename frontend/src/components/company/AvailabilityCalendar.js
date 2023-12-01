import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { addDays, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const MyComponent = () => {
  const initialDateRange = {
    startDate: subDays(new Date(), 7),
    endDate: addDays(new Date(), 1),
    key: "selection",
  };
  const [periods, setPeriods] = useState([]);
  const [state, setState] = useState([initialDateRange]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);
  };

  const handleOnButtonClick = (props) => {
    if (state[0].startDate !== null && state[0].endDate !== null) {
      setPeriods([...periods, state[0]]);
      setState([initialDateRange]);
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DateRangePicker
        onChange={handleOnChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
      <Button
        onClick={handleOnButtonClick}
        variant="contained"
        sx={{
          width: "15vw",
          marginBottom: "2vh",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        Add Unavailable Period
      </Button>
      {periods.map((period, index) => (
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
            marginBottom: "0.5vh",
            alignItems: "center", // Center the text horizontally
          }}
        >
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "center", // Center the content within the grid
              display: "flex",
              color: "black",
              width: "60%",
              backgroundColor: "#3FB295",
              height: "6vh",
              marginBottom: "0.5vh",
              paddingInline: "0.5vw",
              paddingBlock: "1vh",
              opacity: "0.5",
              borderRadius: "5px",
              alignContent: "center",
            }}
          >
            <Grid
              elevation={1}
              component={Paper}
              item
              md={5}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
                marginRight: "2vw",
                height: "4vh",
                lineHeight: "1vh",
                paddingInline: "4vw",
                justifyContent: "center", // Center the content within the grid
                alignItems: "center", // Center the text horizontally
              }}
            >
              <p key={index}>{`${period.startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}`}</p>
            </Grid>
            <Grid
              item
              elevation={1}
              component={Paper}
              md={5}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
                height: "4vh",
                paddingInline: "4vw",
                justifyContent: "center", // Center the content within the grid
                alignItems: "center", // Center the text horizontally
                alignContent: "center",
                lineHeight: "0.5vh",
              }}
            >
              <p>{`${period.endDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}`}</p>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MyComponent;
