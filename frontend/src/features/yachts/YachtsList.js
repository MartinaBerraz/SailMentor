import React from "react";
import { useState, useEffect } from "react";
import {
  selectAllYachts,
  fetchYachts,
} from "../../features/yachts/yachtsSlice";
import YachtsStepper from "./YachtsStepper";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";

export const YachtsList = () => {
  const yachtStatus = useSelector((state) => state.yachts.status);
  const error = useSelector((state) => state.yachts.error);

  const dispatch = useDispatch();
  const yachtsList = useSelector(selectAllYachts);
  const filters = useSelector((state) => state.filters);

  // Filter yachts based on the filter criteria
  const filteredYachts = yachtsList.filter((yacht) => {
    // Apply destination filter
    if (filters.destination && filters.destination !== yacht.destination) {
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

    // Add more filter criteria here
    return true;
  });

  useEffect(() => {
    if (yachtStatus === "idle") {
      dispatch(fetchYachts());
    }
  }, [yachtStatus, dispatch]);

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
