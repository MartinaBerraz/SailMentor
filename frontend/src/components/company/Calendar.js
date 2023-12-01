// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchBookings,
//   updateAvailability,
// } from "../../features/bookings/bookingsSlice";

// const BookingCalendar = () => {
//   const dispatch = useDispatch();
//   const bookings = useSelector((state) => state.bookings.bookings);

//   useEffect(() => {
//     // Fetch bookings when the component mounts
//     dispatch(fetchBookings());
//   }, [dispatch]);

//   const handleDateClick = (arg) => {
//     // Handle date click (add/update availability, show modal, etc.)
//     const date = arg.date;

//     // For example, update availability (dispatch action)
//     dispatch(updateAvailability({ date }));
//   };

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin]}
//       initialView="dayGridMonth"
//       events={bookings} // Assuming bookings have properties like 'start', 'end', 'title', etc.
//       dateClick={handleDateClick}
//     />
//   );
// };

// export default BookingCalendar;
