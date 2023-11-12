import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
import { fetchSailorBookings, selectAllBookings } from "./bookingsSlice";
import BookingCard from "./BookingCard";
import { selectAuthData } from "../auth/authSlice";
import BookingStepper from "./BookingStepper";

export const BookingList = () => {
  const bookingStatus = useSelector((state) => state.bookings.status);
  const error = useSelector((state) => state.bookings.error);

  const authData = useSelector(selectAuthData);
  const userFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  const dispatch = useDispatch();
  const bookingList = useSelector(selectAllBookings);

  useEffect(() => {
    if (bookingStatus === "idle" && userFk) {
      dispatch(fetchSailorBookings(userFk));
    }
  }, [userFk, authData, dispatch]);

  return (
    <>
      {console.log(bookingList)}
      {bookingList && bookingList.length > 0 ? (
        <Container>
          <BookingStepper bookings={bookingList}></BookingStepper>
        </Container>
      ) : (
        <Typography>
          <p>Yo have no bookings.</p>
        </Typography>
      )}
    </>
  );
};

export default BookingList;
