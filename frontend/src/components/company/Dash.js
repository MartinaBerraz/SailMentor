import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SideBar from "./Tables/SideBar";
import GenericTable from "./Tables/GenericTable";
import Toolbar from "@mui/material/Toolbar";
import {
  fetchCompanyYachts,
  fetchYachts,
  selectAllYachts,
} from "../../features/yachts/yachtsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthData } from "../../features/auth/authSlice";

export const Dash = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const authData = useSelector(selectAuthData);
  const companyFk = authData ? authData.userFk : null; // Replace with the correct path to the company foreign key in your Redux state

  useEffect(() => {
    console.log(companyFk);

    if (companyFk) {
      dispatch(fetchCompanyYachts(companyFk)).then(() => {
        setLoading(false);
      }); // Pass the company foreign key as an argument
    }
  }, [companyFk, dispatch]);

  const drawerWidth = 240;

  const yachtStatus = useSelector((state) => state.yachts.status);
  const yachtsList = useSelector(selectAllYachts);

  useEffect(() => {
    if (props.category === "yachts" && !loading) {
      console.log(yachtStatus);
      if (yachtStatus === "idle") {
        dispatch(fetchYachts());
      }
    }
  }, [props.category, yachtStatus, dispatch, loading]);

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
        }}
      >
        <GenericTable category={props.category} items={yachtsList} />
      </Box>
    </Box>
  );
};

export default Dash;
