import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SideBar from "../Tables/SideBar";
import AddYacht from "./AddYacht";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedYacht,
  selectYachtById,
} from "../../../features/yachts/yachtsSlice";

export const UpdateForm = () => {
  const drawerWidth = 240;

  const yacht = useSelector(selectSelectedYacht);

  return (
    <Box sx={{ display: "flex", backgroundColor: "FEFEFE" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <AddYacht formData={yacht} />
      </Box>
    </Box>
  );
};
