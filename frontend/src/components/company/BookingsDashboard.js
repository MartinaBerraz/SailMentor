import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import GenericTable from "./Tables/GenericTable";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  fetchCompanyBookings,
  selectAllBookings,
  deleteSailorBooking,
  updateBookings,
} from "../../features/bookings/bookingsSlice";
import ConfirmationModal from "./ConfirmationModal";
import { Alert } from "@mui/material";
import BookingList from "../../features/bookings/BookingList";
// ... (imports remain the same)

export const BookingsDashboard = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [items, setItems] = useState([]); // Use state for items

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null;
  const bookingStatus = useSelector((state) => state.bookings.status);

  useEffect(() => {
    console.log(companyFk);

    dispatch(fetchCompanyBookings(companyFk)).then(() => {
      setLoading(false);
    });
  }, [companyFk, dispatch]);

  const drawerWidth = 240;

  const bookingsList = useSelector(selectAllBookings);

  const handleOnDelete = (id, action) => {
    const booking = bookingsList.filter(
      (booking) => String(booking.id) === String(id)
    );
    console.log(id);
    console.log(BookingList);
    setSelectedBooking(booking[0]);
    setConfirmationModalOpen(true);
  };

  useEffect(() => {
    if (props.category === "bookings") {
      if (props.id) {
        setItems(
          bookingsList.filter(
            (booking) =>
              booking.yacht_id === props.id.toString() &&
              booking.status !== "Finished"
          )
        );
      } else {
        setItems(
          bookingsList.filter((booking) => booking.status !== "Finished")
        );
      }
    } else if (props.category === "history") {
      setItems(bookingsList.filter((booking) => booking.status === "Finished"));
    }
  }, [props.id, props.category, bookingsList]); // Update items when props.id or props.category changes

  useEffect(() => {
    if (!loading && bookingStatus === "idle") {
      dispatch(fetchCompanyBookings(companyFk));
    }
  }, [props.category, bookingStatus, dispatch, loading, companyFk]);

  const handleConfirmDelete = async () => {
    dispatch(deleteSailorBooking(selectedBooking));
    setConfirmationModalOpen(false);
    setSuccessAlertOpen(true);

    dispatch(updateBookings());

    setTimeout(() => {
      setSuccessAlertOpen(false);
    }, 3000);
  };

  const handleModalClose = () => {
    setConfirmationModalOpen(false);
  };

  const handleAlertClose = () => {
    setSuccessAlertOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <GenericTable
        category={props.category}
        items={items}
        rowsPerPage={props.rowsPerPage ? props.rowsPerPage : 5}
        onSelect={null}
        onUpdateOrDelete={handleOnDelete}
      />

      {successAlertOpen && (
        <Alert
          sx={{
            width: "90%",
            bgcolor: "#3FB295",
            opacity: "0.6",
            color: "black",
          }}
          open={successAlertOpen}
          onClose={handleAlertClose}
        >
          Booking has been successfully deleted!
        </Alert>
      )}

      {confirmationModalOpen && (
        <ConfirmationModal
          open={confirmationModalOpen}
          onClose={handleModalClose}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this booking?"
        />
      )}
    </Box>
  );
};

export default BookingsDashboard;
