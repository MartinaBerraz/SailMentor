import AppNavbar from "./AppNavbar";
import Box from "@mui/material/Box";
import Experience from "./Experience";
import React, { useState, useEffect } from "react";
import ExperiencesStepper from "./ExperiencesStepper";
import Typography from "@mui/material/Typography";
import InputAutocomplete from "../common/InputAutocomplete";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import Yachts from "./Yachts";
import { setDestinationFilter } from "../../features/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../images/background.jpg";
import {
  fetchExperiences,
  selectAllExperiences,
  selectFilteredExperiences,
  selectSailorFilteredExperiences,
} from "../../features/experiences/experiencesSlice";
import {
  fetchDestinations,
  selectAllDestinations,
} from "../../features/destinations/destinationsSlice";
import ExperienceForm from "./ExperienceForm";
import { selectAuthData } from "../../features/auth/authSlice";
import {
  fetchCurrentSailor,
  selectCurrentSailor,
} from "../../features/sailors/sailorsSlice";
export const SailorExperiences = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [resources, setResources] = useState([]);
  const dispatch = useDispatch();
  const initialDestination = useSelector((state) => state.filters.destination);

  const [selectedOption, setSelectedOption] = useState(initialDestination);

  const authData = useSelector(selectAuthData);
  const userFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  const sailorExperiences = useSelector((state) =>
    selectSailorFilteredExperiences(state, userFk)
  );

  console.log(userFk);
  const experiencesState = useSelector((state) => state.experiences.status);

  const destinationsList = useSelector(selectAllDestinations);
  const destinationsState = useSelector((state) => state.destinations.status);
  const currentSailor = useSelector(selectCurrentSailor);

  const handleCallback = (childData) => {
    const destination = destinationsList.find(
      (item) => item.name === childData
    );
    console.log("destination id:" + destination.id);
    dispatch(setDestinationFilter(destination.id));
  };

  useEffect(() => {
    dispatch(fetchCurrentSailor(userFk));
  }, [userFk, dispatch]);

  useEffect(() => {
    if (experiencesState === "idle") {
      dispatch(fetchExperiences());
    }

    if (destinationsState === "idle") {
      dispatch(fetchDestinations());
    }
  }, [experiencesState, dispatch]);

  const handleOnClick = (e) => {
    if (selectedOption) {
      dispatch(setDestinationFilter(selectedOption.id));
    }
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "33vh", // Set the height to 40% of the viewport height
            flexGrow: 1,
            backgroundColor: "#3FB295", // Replace with your desired color
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppNavbar />
          <Typography sx={{ marginTop: "3vh" }}>
            <h2>Share your adventures!</h2>
          </Typography>

          <InputAutocomplete
            options={destinationsList}
            label="Where did you sail?"
            parentCallback={handleCallback}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "20vw",
          }}
          onClick={setModalOpen}
        >
          Create a new one
        </Button>
        {sailorExperiences.length > 0 && (
          <ExperiencesStepper experiences={sailorExperiences} />
        )}
      </Box>
      <ExperienceForm
        sailor={currentSailor}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default SailorExperiences;
