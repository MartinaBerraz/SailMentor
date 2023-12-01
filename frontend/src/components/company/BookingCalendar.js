import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  fetchCompanyBookings,
  selectAllBookings,
} from "../../features/bookings/bookingsSlice";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, subDays } from "date-fns";

export const BookingsCalendar = (props) => {
  const initialDateRange = {
    startDate: subDays(new Date(), 1),
    endDate: addDays(new Date(), 1),
    key: "selection",
  };
  const [bookedPeriods, setBookedPeriods] = useState([]);
  const [unavailablePeriods, setUnavailablePeriods] = useState([]);
  const [state, setState] = useState([initialDateRange]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);
  };

  const handleOnButtonClick = () => {
    if (state[0].startDate !== null && state[0].endDate !== null) {
      setUnavailablePeriods([...unavailablePeriods, state[0]]);
      setState([initialDateRange]);
    }
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null;

  useEffect(() => {
    dispatch(fetchCompanyBookings(companyFk)).then(() => {
      setLoading(false);
    });
  }, [companyFk, dispatch]);

  const bookingStatus = useSelector((state) => state.bookings.status);
  const bookingsList = useSelector(selectAllBookings);

  let items = [];
  if (props.id) {
    items = bookingsList.filter(
      (booking) => booking.yacht_id === props.id.toString()
    );
  }

  useEffect(() => {
    if (!loading && bookingStatus === "idle") {
      dispatch(fetchCompanyBookings(companyFk));
    }
  }, [props.category, bookingStatus, dispatch, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const transformedBookedPeriods = items.map((booking) => {
    const startDate = new Date(booking.start_date);
    const endDate = new Date(booking.end_date);

    // Add 1 day to both startDate and endDate
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    return {
      startDate,
      endDate,
      key: booking.id.toString(),
      sailorName: booking.sailor_name,
      color: "#3FB295",
    };
  });

  const transformedUnavailablePeriods = unavailablePeriods.map((period) => ({
    startDate: period.startDate,
    endDate: period.endDate,
    key: `${period.startDate}-${period.endDate}`,
    color: "#FF6347", // Red color for unavailable periods
  }));

  // Create an array of disabled dates
  const disabledDates = [
    ...transformedBookedPeriods,
    ...transformedUnavailablePeriods,
  ].reduce(
    (dates, item) => [
      ...dates,
      ...getDatesBetween(item.startDate, item.endDate),
    ],
    []
  );

  function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "0.5vh",
      }}
    >
      <>
        <Grid container>
          <Grid
            item
            md={8}
            component={Paper}
            elevation={12}
            sx={{ width: "30vw", borderRadius: "10px" }}
          >
            <DateRangePicker
              onChange={handleOnChange}
              showSelectionPreview={false}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={state}
              disabledDates={disabledDates}
              direction="horizontal"
              renderStaticRangeLabel={(ranges) => (
                <Typography sx={{ color: "black" }}>
                  {ranges.range.sailorName}
                </Typography>
              )}
              editableDateInputs={false}
              rangeColors={["#3FB295", "#FF6347"]}
            />
          </Grid>
          <Grid
            item
            md={3.5}
            sx={{
              marginLeft: "4vh",
            }}
          >
            <Button
              onClick={handleOnButtonClick}
              variant="contained"
              sx={{
                width: "30vw",
                marginBottom: "2vh",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              Add Unavailable Period
            </Button>
            {unavailablePeriods.map((period, index) => (
              <Grid
                container
                display={"flex"}
                component={Paper}
                elevation={1}
                sx={{
                  flexDirection: "row",
                  width: "30vw",
                  height: "5vh",
                  marginBottom: "0.5vh",
                }}
                key={index}
              >
                <Grid
                  item
                  md={6}
                  sx={{
                    backgroundColor: "#3FB295",
                    color: "white",
                    opacity: "0.9",
                    paddingTop: "1vh",
                  }}
                >
                  <Typography>
                    {`${period.startDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    opacity: "0.5",
                    paddingTop: "1vh",
                  }}
                >
                  <Typography>
                    {`${period.endDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default BookingsCalendar;
