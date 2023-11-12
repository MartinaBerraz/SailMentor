import React, { useState } from "react";
import DestinationFilter from "./filters/DestinationFilter";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import MaxPeopleFilter from "./filters/MaxPeopleFilter";
import NoCabinsFilter from "./filters/NoCabinsFilter";
import YachtTypesFilter from "./filters/YachtTypeFilter";
import DateAndNightsPicker from "./filters/DateAndNightsPicker";
import background from "../images/background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedYacht } from "../../features/yachts/yachtsSlice";
import { selectAllFilters } from "../../features/filters/filtersSlice";
import { selectAuthData } from "../../features/auth/authSlice";
import { addBooking } from "../../features/bookings/bookingsSlice";
import { fetchAvailabilities } from "../../features/availabilities/availabilitySlice";

const BookForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector(selectAllFilters);

  const authData = useSelector(selectAuthData);
  const sailorFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  const handleOnClick = (e) => {
    const info = {
      yacht: selectedYacht.id,
      start_date: new Date(filters.startDate).toISOString().split("T")[0],
      end_date: new Date(
        new Date(filters.startDate).getTime() +
          filters.noNights * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      sailor_id: sailorFk,
    };

    console.log(info);

    // Dispatch the addBooking action
    try {
      dispatch(addBooking(info));
      // The dispatch was successful, show the success modal
      setShowSuccessModal(true);

      dispatch(fetchAvailabilities());
    } catch (error) {
      // The dispatch encountered an error, show the error modal
      setShowErrorModal(true);
    }
  };

  const selectedYacht = useSelector(selectSelectedYacht);
  return selectedYacht ? (
    <Card
      elevation={6}
      sx={{
        marginTop: "3vh",
        marginInline: "2vw",
        paddingTop: "1vh",
        position: "sticky",
        height: "52vh",
        borderRadius: "10px",
        top: "3vh",
        minHeight: "15vh",
        backgroundColor: "white", // Optional: Add a background color if needed
        zIndex: 100, // Optional: Adjust the z-index as needed
      }}
    >
      <Grid container sx={{ marginBottom: "2vh" }}>
        <Grid item xs={6} md={12}>
          <DateAndNightsPicker />
        </Grid>
      </Grid>
      <Paper
        sx={{
          //   backgroundColor: "#3FB295",
          backgroundColor: "black",
          height: "3vh",
        }}
      >
        <Typography sx={{ color: "white" }}>Booking Details</Typography>
      </Paper>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={selectedYacht.image}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {selectedYacht.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Company Name
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Box sx={{ color: "grey", marginTop: "4vh" }}>
        {filters.startDate && filters.noNights && (
          <>
            <Typography sx={{ fontSize: "15px", marginBottom: "5vh" }}>
              Start Date: {new Date(filters.startDate).toLocaleDateString()}
              <br />
              End Date:{" "}
              {new Date(
                new Date(filters.startDate).getTime() +
                  filters.noNights * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </Typography>

            <Typography
              sx={{ fontSize: "1.2rem", marginBottom: "2vh", color: "black" }}
            >
              Price: €{selectedYacht.price}
            </Typography>
          </>
        )}
      </Box>
      {filters.startDate && filters.noNights && selectedYacht && (
        <Button
          onClick={handleOnClick}
          sx={{ width: "30vw" }}
          variant="contained"
          color="secondary"
        >
          Book Now
        </Button>
      )}

      {/* <Typography variant="h5">Price: </Typography> */}
    </Card>
  ) : (
    <Card
      sx={{
        marginTop: "3vh",
        marginInline: "2vw",
        paddingTop: "1vh",
        position: "sticky",
        top: "3vh",
        backgroundColor: "white", // Optional: Add a background color if needed
        zIndex: 100, // Optional: Adjust the z-index as needed
      }}
    >
      <Grid container sx={{ marginBottom: "2vh" }}>
        <Grid item xs={6} md={12}>
          <DateAndNightsPicker />
        </Grid>
      </Grid>
      <Paper sx={{ backgroundColor: "#3FB295" }}>
        <Typography sx={{ color: "white" }}>Select a yacht</Typography>
      </Paper>
    </Card>
  );
};

export default BookForm;
