import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "./Tables/SideBar";
import GenericTable from "./Tables/GenericTable";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  fetchCompanyBookings,
  selectAllBookings,
} from "../../features/bookings/bookingsSlice";
import { Typography } from "@mui/material";

export const BookingsDashboard = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  useEffect(() => {
    console.log(companyFk);

    dispatch(fetchCompanyBookings(companyFk)).then(() => {
      setLoading(false);
    });
  }, [companyFk, dispatch]);

  const drawerWidth = 240;

  const bookingStatus = useSelector((state) => state.bookings.status);
  const bookingsList = useSelector(selectAllBookings);

  let items = [];
  if (props.category === "bookings") {
    if (props.id) {
      items = bookingsList.filter(
        (booking) => booking.yacht_id === props.id.toString()
      );
    } else {
      items = bookingsList.filter((booking) => booking.status !== "Finished"); // Use bookingsList when the category is "bookings"
    }
  } else if (props.category === "history") {
    items = bookingsList.filter((booking) => booking.status === "Finished"); // Use bookingsList when the category is "bookings"
  }

  useEffect(() => {
    if (!loading && bookingStatus === "idle") {
      dispatch(fetchCompanyBookings(companyFk));
    }
  }, [props.category, bookingStatus, dispatch, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // BookingsDashboard.js
    items.length > 0 ? (
      <Box
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column", // Set the flex direction to column
          alignItems: "flex-start", // Adjust alignment as needed
        }}
      >
        <GenericTable category={props.category} items={items} />
      </Box>
    ) : (
      <>
        <Typography>No bookings found yet...</Typography>
      </>
    )
  );
};

export default BookingsDashboard;
