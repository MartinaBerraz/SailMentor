import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BookingCard from "./BookingCard";
import { useDispatch } from "react-redux";

export const BookingStepper = ({ bookings }) => {
  const [activeStep, setActiveStep] = useState(0);
  const cardsPerPage = 3; // Set the number of cards to display per page

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const dispatch = useDispatch();

  const startIndex = activeStep * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  return (
    <div>
      <Grid sx={{ justifyContent: "center" }} container spacing={2}>
        {displayedBookings.map((booking, index) => (
          <Grid item md={10} key={booking.id}>
            <BookingCard booking={booking} />
          </Grid>
        ))}
      </Grid>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button disabled={endIndex >= bookings.length} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default BookingStepper;
