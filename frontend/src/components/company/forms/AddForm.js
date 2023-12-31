import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SideBar from "../Tables/SideBar";
import AddYacht from "./AddYacht";

export const AddForm = (props) => {
  const drawerWidth = 240;

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
        <AddYacht />
      </Box>
    </Box>
  );
};
