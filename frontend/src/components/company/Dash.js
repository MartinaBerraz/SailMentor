import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SideBar from "./Tables/SideBar";
import GenericTable from "./Tables/GenericTable";
import Toolbar from "@mui/material/Toolbar";
import {
  fetchCompanyYachts,
  fetchYachts,
  selectAllYachts,
} from "../../features/yachts/yachtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  deleteSailorBooking,
  fetchCompanyBookings,
  selectAllBookings,
  updateBookings,
} from "../../features/bookings/bookingsSlice";
import { Alert } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";

export const Dash = (props) => {
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

  const yachtStatus = useSelector((state) => state.yachts.status);
  const yachtsList = useSelector(selectAllYachts);

  const bookingStatus = useSelector((state) => state.bookings.status);
  const bookingsList = useSelector(selectAllBookings);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  let items = [];
  if (props.category === "bookings") {
    items = bookingsList.filter((booking) => booking.status !== "Finished"); // Use bookingsList when the category is "bookings"
  } else if (props.category === "history") {
    items = bookingsList.filter((booking) => booking.status === "Finished"); // Use bookingsList when the category is "bookings"
    console.log("fetched");
  }

  const handleOnDelete = (id, action) => {
    const booking = bookingsList.filter(
      (booking) => String(booking.id) === String(id)
    );

    setSelectedBooking(booking[0]);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    dispatch(deleteSailorBooking(selectedBooking));
    setConfirmationModalOpen(false);
    setSuccessAlertOpen(true);

    dispatch(updateBookings());

    setTimeout(() => {
      setSuccessAlertOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (!loading) {
      if (bookingStatus === "idle") {
        dispatch(fetchCompanyBookings(companyFk));
      }
    }
  }, [props.category, yachtStatus, bookingStatus, dispatch, loading]);

  const handleModalClose = () => {
    setConfirmationModalOpen(false);
  };

  const handleAlertClose = () => {
    setSuccessAlertOpen(false);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", backgroundColor: "#FEFEFE", maxWidth: "93%" }}
      >
        <SideBar />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <GenericTable
            category={props.category}
            rowsPerPage={props.rowsPerPage ? props.rowsPerPage : null}
            items={items}
            onUpdateOrDelete={handleOnDelete}
          />
          {successAlertOpen && (
            <Alert
              sx={{
                width: "100%",
                height: "5vh",
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
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
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
    </>
  );
};

export default Dash;
