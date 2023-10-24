import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllDestinations, fetchDestinations } from "./destinationsSlice";
import InputAutocomplete from "../../components/common/InputAutocomplete";

const DestinationsList = () => {
  const destinationStatus = useSelector((state) => state.destinations.status);
  const destinationsList = useSelector(selectAllDestinations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (destinationStatus === "idle") {
      dispatch(fetchDestinations());
    }
  }, [destinationStatus, dispatch]);

  return <InputAutocomplete label="Destinations" options={destinationsList} />;
};

export default DestinationsList;
