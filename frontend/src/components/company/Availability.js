import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { addDays, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import SideBar from "./Tables/SideBar";
import BookingCard from "../../features/bookings/BookingCard";
import BookingsCalendar from "./BookingCalendar";
import BookingsDashboard from "./BookingsDashboard";
import { YachtSelect } from "./YachtSelect";
import { selectSelectedYacht } from "../../features/yachts/yachtsSlice";
import { useSelector } from "react-redux";

const Availability = () => {
  const drawerWidth = 240;
  const [selectedYacht, setSelectedYacht] = useState(null);

  const handleYachtSelection = (selectedYachtId) => {
    setSelectedYacht(selectedYachtId);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#FEFEFE" }}>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <YachtSelect onYachtSelection={handleYachtSelection} />
        {selectedYacht && (
          <>
            <BookingsDashboard
              category="bookings"
              rowsPerPage={3}
              id={selectedYacht}
            />
            <BookingsCalendar id={selectedYacht} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Availability;
