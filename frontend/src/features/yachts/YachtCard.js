import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchYachtTypes,
  selectAllYachtTypes,
} from "../yachtTypes/yachtTypesSlice";
import { selectSelectedYacht, selectYacht } from "./yachtsSlice";
import YachtModal from "./YachtModal";

export const YachtCard = ({ yacht }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch();

  const selectedYacht = useSelector(selectSelectedYacht);

  // Function to handle yacht selection
  const handleSelectYacht = () => {
    dispatch(
      selectYacht({ ...yacht, price: numberOfNights * yacht.price_per_night })
    ); // Dispatch the selectYacht action with the selected yacht
  };

  const numberOfNights = useSelector((state) => state.filters.noNights);

  const yachtTypeStatus = useSelector((state) => state.yachtTypes.status);
  const yachtTypes = useSelector(selectAllYachtTypes);

  React.useEffect(() => {
    if (yachtTypeStatus === "idle") {
      dispatch(fetchYachtTypes());
    }
    console.log(yachtTypes);
  }, [yachtTypeStatus, dispatch]);

  React.useEffect(() => {
    console.log(yachtTypes);
  }, [yachtTypes]);

  const borderedGridItem = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10%",
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: "40vh",
          minWidth: "25vw",
          margin: "4%",
          marginTop: "5%",
        }}
      >
        <CardActionArea onClick={handleOpenModal}>
          {console.log(numberOfNights)}
          <CardMedia component="img" height="200" image={yacht.image} />
          <CardContent>
            <Typography variant="h5" component="div">
              {yacht.name} - {yacht.length_in_feet}
            </Typography>
            <Typography color="grey">
              {yachtTypes.find((type) => type.id === yacht.yacht_type)
                ?.description || "Description not found"}
            </Typography>

            <Grid container style={borderedGridItem}>
              <Grid item xs={3} md={4}>
                <Typography> {yacht.max_people}</Typography>
                <PeopleIcon> </PeopleIcon>
              </Grid>
              <Grid item xs={3} md={4}>
                <Typography> {yacht.no_cabins}</Typography>
                <HotelIcon> </HotelIcon>
              </Grid>
              <Grid item xs={3} md={4}>
                <Typography>{yacht.length_in_feet}</Typography>

                <Typography>length</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>

        <Button
          variant="contained"
          color={
            selectedYacht && selectedYacht.id === yacht.id
              ? "secondary"
              : "primary"
          }
          onClick={handleSelectYacht}
          sx={{ marginBottom: "1vh", minWidth: "95%" }}
        >
          <Typography sx={{ textTransform: "none" }}>
            {selectedYacht && selectedYacht.id === yacht.id
              ? "Selected"
              : `Select for €${numberOfNights * yacht.price_per_night}`}
          </Typography>
        </Button>
      </Card>

      <YachtModal
        yacht={yacht}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default YachtCard;
