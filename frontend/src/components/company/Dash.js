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
  fetchCompanyBookings,
  selectAllBookings,
} from "../../features/bookings/bookingsSlice";

export const Dash = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  useEffect(() => {
    console.log(companyFk);

    if (companyFk && props.category === "yachts") {
      dispatch(fetchCompanyYachts(companyFk)).then(() => {
        setLoading(false);
      });
    } else if (
      (companyFk && props.category === "bookings") ||
      props.category === "history"
    ) {
      dispatch(fetchCompanyBookings(companyFk)).then(() => {
        setLoading(false);
      });
    }
  }, [companyFk, dispatch]);

  const drawerWidth = 240;

  const yachtStatus = useSelector((state) => state.yachts.status);
  const yachtsList = useSelector(selectAllYachts);

  const bookingStatus = useSelector((state) => state.bookings.status);
  const bookingsList = useSelector(selectAllBookings);

  let items = [];
  if (props.category === "yachts") {
    console.log("WHAT");
    items = yachtsList; // Use yachtsList when the category is "yachts"
  } else if (props.category === "bookings") {
    items = bookingsList.filter((booking) => booking.status !== "Finished"); // Use bookingsList when the category is "bookings"
  } else if (props.category === "history") {
    items = bookingsList.filter((booking) => booking.status === "Finished"); // Use bookingsList when the category is "bookings"
    console.log("fetched");
  }

  useEffect(() => {
    if (!loading) {
      if (props.category === "yachts") {
        console.log(yachtStatus);
        if (yachtStatus === "idle") {
          dispatch(fetchCompanyYachts(companyFk));
        }
      } else if (
        props.category === "bookings" ||
        props.category === "history"
      ) {
        if (bookingStatus === "idle") {
          dispatch(fetchCompanyBookings(companyFk));
        }
      }
    }
  }, [props.category, yachtStatus, bookingStatus, dispatch, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "#FEFEFE", maxWidth: "93%" }}>
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
        />
      </Box>
    </Box>
  );
};

export default Dash;
