import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "./Tables/SideBar";
import GenericTable from "./Tables/GenericTable";
import {
  deleteYacht,
  fetchCompanyYachts,
  selectAllYachts,
  updateYachts,
} from "../../features/yachts/yachtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import BookingsDashboard from "./BookingsDashboard";
import BookingCalendar from "./BookingCalendar";
import {
  fetchCompanyBookings,
  selectAllBookings,
} from "../../features/bookings/bookingsSlice";
import ErrorModal from "./ErrorModal";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { Alert } from "@mui/material";

export const YachtsDashboard = (props) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedYacht, setSelectedYacht] = useState(null);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedYachtId, setSelectedYachtId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (companyFk && yachtStatus === "idle") {
      dispatch(fetchCompanyYachts(companyFk)).then(() => {
        setLoading(false);
      });
    }
  }, [companyFk, dispatch]);

  const handleConfirmDelete = () => {
    dispatch(deleteYacht(selectedYachtId));
    setConfirmationModalOpen(false);
    setSuccessAlertOpen(true);

    console.log(yachtStatus);

    dispatch(updateYachts());
    setLoading(false);

    // Close the success alert automatically after 3 seconds (adjust as needed)
    setTimeout(() => {
      setSuccessAlertOpen(false);
    }, 3000);
  };

  useEffect(() => {
    console.log(companyFk);

    if (bookingStatus === "idle") {
      dispatch(fetchCompanyBookings(companyFk)).then(() => {
        setLoading(false);
      });
    }
  }, [companyFk, dispatch]);

  const bookingStatus = useSelector((state) => state.bookings.status);
  const bookingsList = useSelector(selectAllBookings);

  const handleYachtSelection = (selectedYachtData) => {
    setSelectedYacht(selectedYachtData.id);
    console.log(selectedYachtData);
  };

  const handleAlertClose = () => {
    setSuccessAlertOpen(false);
  };

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleUpdateOrDelete = (id, action) => {
    console.log(bookingsList);
    const UpcomingYachtBookings = bookingsList.filter(
      (booking) => booking.yacht_id === String(id)
    );
    console.log(UpcomingYachtBookings);

    if (UpcomingYachtBookings.length > 0) {
      setErrorModalOpen(true);
    } else {
      if (action === "update") {
        navigate(`/yachts/update/${id}`);
      } else {
        setSelectedYachtId(id);
        setConfirmationModalOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    setErrorModalOpen(false);
  };

  const handleConfirmationModalClose = () => {
    setConfirmationModalOpen(false);
  };

  const drawerWidth = 240;

  const yachtStatus = useSelector((state) => state.yachts.status);
  const yachtsList = useSelector(selectAllYachts);

  useEffect(() => {
    if (yachtStatus === "idle") {
      dispatch(fetchCompanyYachts(companyFk));
    }
  }, [dispatch, yachtStatus]);

  useEffect(() => {
    dispatch(fetchCompanyYachts(companyFk));
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#FEFEFE" }}>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column", // Set the flex direction to column
          alignItems: "flex-start", // Adjust alignment as needed
        }}
      >
        <GenericTable
          category="Yachts"
          items={yachtsList}
          onSelect={handleYachtSelection}
          onUpdateOrDelete={handleUpdateOrDelete} // Pass the custom handler
        />

        {selectedYacht && (
          <>
            <BookingsDashboard
              category="bookings"
              id={selectedYacht}
            ></BookingsDashboard>
          </>
        )}
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
            Yacht has been successfully deleted!
          </Alert>
        )}
      </Box>

      <ErrorModal open={errorModalOpen} onClose={handleModalClose} />
      {confirmationModalOpen && (
        <ConfirmationModal
          open={confirmationModalOpen}
          onClose={handleConfirmationModalClose}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this yacht?"
        />
      )}
    </Box>
  );
};

export default YachtsDashboard;
