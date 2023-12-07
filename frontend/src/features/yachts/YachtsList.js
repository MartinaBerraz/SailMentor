import React from "react";
import { useState, useEffect } from "react";
import {
  selectAllYachts,
  fetchYachts,
  deselectYacht,
} from "../../features/yachts/yachtsSlice";
import {
  selectAllYachtTypes,
  fetchYachtTypes,
} from "../../features/yachtTypes/yachtTypesSlice";
import YachtsStepper from "./YachtsStepper";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import {
  fetchAvailabilities,
  selectAllAvailabilities,
} from "../availabilities/availabilitySlice";

export const YachtsList = () => {
  const yachtStatus = useSelector((state) => state.yachts.status);
  const error = useSelector((state) => state.yachts.error);

  const dispatch = useDispatch();
  const yachtsList = useSelector(selectAllYachts);
  const filters = useSelector((state) => state.filters);

  const availabilityStatus = useSelector(
    (state) => state.availabilities.status
  );

  const availabilities = useSelector(selectAllAvailabilities);

  useEffect(() => {
    if (availabilityStatus === "idle") {
      dispatch(fetchAvailabilities());
    }
  }, [availabilityStatus, dispatch]);

  const isYachtAvailable = (yacht, start, noNights) => {
    const startDate = new Date(start);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + noNights);

    const yachtAvailabilities = availabilities.filter(
      (availability) => availability.yacht === yacht.id
    );

    if (yachtAvailabilities.length === 0) {
      return true;
    }

    var flag = true;

    yachtAvailabilities.forEach((availability) => {
      flag = !isDateRangeOverlap(
        startDate,
        endDate,
        new Date(availability.start_date),
        new Date(availability.end_date)
      );

      if (!flag) {
        console.log("not available");
        console.log(!flag);

        return !flag;
      }
    });

    return flag;
  };

  // Helper function to check if two date ranges overlap
  function isDateRangeOverlap(start1, end1, start2, end2) {
    return start1 <= end2 && start2 <= end1;
  }

  // Filter yachts based on the filter criteria
  const filteredYachts = yachtsList.filter((yacht) => {
    // Apply destination filter
    if (
      filters.destination &&
      filters.destination !== "" &&
      filters.destination !== yacht.destination
    ) {
      return false;
    }
    if (filters.maxPeople && filters.maxPeople > yacht.max_people) {
      return false;
    }

    if (filters.noCabins && filters.noCabins !== yacht.no_cabins) {
      console.log(filters.noCabins);
      console.log(yacht.no_cabins);

      return false;
    }

    if (filters.crewed !== null && filters.crewed !== yacht.crewed) {
      return false;
    }

    if (filters.yachtType && filters.yachtType !== yacht.yacht_type) {
      return false;
    }

    if (
      filters.startDate &&
      filters.noNights &&
      !isYachtAvailable(yacht, filters.startDate, filters.noNights)
    ) {
      console.log(
        "Is yacht available:" +
          isYachtAvailable(yacht, filters.startDate, filters.noNights)
      );
      return false;
    }

    // Add more filter criteria here
    return true;
  });

  useEffect(() => {
    if (yachtStatus === "idle") {
      dispatch(fetchYachts());
    }
  }, [yachtStatus, dispatch]);

  useEffect(() => {
    // Dispatch the deselectYacht action whenever filter criteria are modified
    dispatch(deselectYacht());
  }, [filters, dispatch]);

  return (
    <>
      {filteredYachts && filteredYachts.length > 0 ? (
        <YachtsStepper yachts={filteredYachts} />
      ) : (
        <Typography>
          <p>No yachts match the selected filters.</p>
        </Typography>
      )}
    </>
  );
};

export default YachtsList;
