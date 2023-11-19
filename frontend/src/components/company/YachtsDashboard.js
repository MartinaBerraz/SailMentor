import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "./Tables/SideBar";
import GenericTable from "./Tables/GenericTable";
import {
  fetchCompanyYachts,
  selectAllYachts,
} from "../../features/yachts/yachtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import BookingsDashboard from "./BookingsDashboard";

export const YachtsDashboard = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedYacht, setSelectedYacht] = useState(null);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  useEffect(() => {
    if (companyFk) {
      dispatch(fetchCompanyYachts(companyFk)).then(() => {
        setLoading(false);
      });
    }
  }, [companyFk, dispatch]);

  const handleYachtSelection = (selectedYachtData) => {
    setSelectedYacht(selectedYachtData.id);
    console.log(selectedYachtData);
  };

  const drawerWidth = 240;

  const yachtStatus = useSelector((state) => state.yachts.status);
  const yachtsList = useSelector(selectAllYachts);

  useEffect(() => {
    if (!loading && yachtStatus === "idle") {
      dispatch(fetchCompanyYachts(companyFk));
    }
  }, [props.category, yachtStatus, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        />

        {selectedYacht && (
          <BookingsDashboard
            category="bookings"
            id={selectedYacht}
          ></BookingsDashboard>
        )}
      </Box>
    </Box>
  );
};

export default YachtsDashboard;
