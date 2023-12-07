import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  fetchCompanyBookings,
  selectAllBookings,
} from "../../features/bookings/bookingsSlice";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, subDays } from "date-fns";
import {
  addUnbookedAvailability,
  deleteUnbookedAvailability,
  fetchUnbookedAvailabilities,
  selectUnbookedAvailabilities,
} from "../../features/availabilities/availabilitySlice";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

export const BookingsCalendar = (props) => {
  const dispatch = useDispatch();

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const [unavailablePeriods, setUnavailablePeriods] = useState([]);
  const [state, setState] = useState([initialDateRange]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);
  };
  const unbookedAvailabilities = useSelector(selectUnbookedAvailabilities);

  // Fetch unbooked availabilities when the component mounts
  useEffect(() => {
    setUnavailablePeriods([]);

    dispatch(fetchUnbookedAvailabilities(props.id));
  }, [dispatch, props.id]);

  useEffect(() => {
    if (unbookedAvailabilities.length > 0) {
      const periods = unbookedAvailabilities.map((period) => ({
        startDate: addDays(new Date(period.start_date), 1),
        endDate: addDays(new Date(period.end_date), 1),
        key: period.id,
        color: "#FF6347", // Red color for unavailable periods
      }));
      console.log(unbookedAvailabilities);
      setUnavailablePeriods(periods);
    }
  }, [unbookedAvailabilities]);

  console.log(unbookedAvailabilities);

  const handleOnButtonClick = () => {
    if (state[0].startDate !== null && state[0].endDate !== null) {
      setUnavailablePeriods([...unavailablePeriods, state[0]]);
      setState([initialDateRange]);

      const availabilityData = {
        yacht: props.id,
        start_date: state[0].startDate.toISOString().split("T")[0],
        end_date: state[0].endDate.toISOString().split("T")[0],
      };
      dispatch(addUnbookedAvailability(availabilityData));
    }
  };

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

  const handleDeleteAvailability = (availabilityId) => {
    // Dispatch the delete action
    dispatch(deleteUnbookedAvailability(availabilityId))
      .then(() => {
        // Fetch updated unbooked availabilities after deletion
        dispatch(fetchUnbookedAvailabilities(props.id)).then(() => {
          // Filter out the deleted availability from the local state
          setUnavailablePeriods((prevUnavailablePeriods) =>
            prevUnavailablePeriods.filter(
              (period) => period.key !== availabilityId
            )
          );
        });
      })
      .catch((error) => {
        // Handle errors if necessary
        console.error("Error deleting unbooked availability:", error);
      });
  };

  useEffect(() => {
    if (!loading && bookingStatus === "idle") {
      dispatch(fetchCompanyBookings(companyFk));
    }
  }, [props.category, bookingStatus, dispatch, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const transformedBookedPeriods = items.map((booking) => {
    return {
      startDate: addDays(new Date(booking.start_date), 1),
      endDate: addDays(new Date(booking.end_date), 1),
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

  console.log(transformedUnavailablePeriods);

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
      currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
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
              minDate={new Date()} // Set minDate to the current date
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
              <>
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
                    md={5.5}
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
                    md={5.5}
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
                  <Grid item md={1}>
                    <IconButton
                      onClick={() => handleDeleteAvailability(period.key)}
                    >
                      <DisabledByDefaultIcon sx={{ color: "grey" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default BookingsCalendar;
