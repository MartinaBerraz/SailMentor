import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  fetchAvailabilities,
  selectAllAvailabilities,
} from "../availabilities/availabilitySlice";
import {
  deleteBooking,
  fetchSailorBookings,
  selectAllBookings,
  updateBookings,
} from "./bookingsSlice";
import { fetchYachts, selectYachtByName } from "../yachts/yachtsSlice";
import { useNavigate } from "react-router-dom";

export const BookingCard = ({ booking }) => {
  const bookingStatus = useSelector((state) => state.bookings.status);
  const error = useSelector((state) => state.bookings.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const yachtsStatus = useSelector((state) => state.yachts.status);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmCancel = () => {
    dispatch(deleteBooking(booking.availability));
    dispatch(updateBookings());
    navigate("/home");
    setOpenDialog(false);
  };

  const handleCancelDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (yachtsStatus === "idle") {
      dispatch(fetchYachts());
    }
  }, [yachtsStatus, dispatch]);

  const yacht = useSelector((state) =>
    selectYachtByName(state, booking.yacht_name)
  );
  console.log(booking);
  console.log(yacht);

  if (!yacht) {
    // Return a loading state or handle the case where yacht or yacht.images is undefined
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card
        elevation={12}
        sx={{
          display: "flex",
          borderRadius: "10px",
          maxWidth: "90vw",
          height: "20vh",
          marginInline: "5vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "35%", height: "100%", marginRight: "3vw" }}
          image={yacht.image}
          alt="Live from space album cover"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {yacht.destination_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {booking.start_date}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "5vw",
          }}
        >
          <CardContent>
            {/* <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "grey" }}
            >
              Review details
            </Button> */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Status: {booking.status}</Typography>
            </Box>
            {booking.status !== "Confirmed" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: "5vh", width: "10vw" }}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Dialog open={openDialog} onClose={handleCancelDialogClose}>
                  <DialogTitle sx={{ marginInline: "5vw" }}>
                    Cancel Booking
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to cancel the booking?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      sx={{
                        width: "80%",
                        marginInline: "5vw",
                      }}
                      color="primary"
                      align="center"
                      autoFocus
                      onClick={handleConfirmCancel}
                      onClose={handleCancelDialogClose}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default BookingCard;
