import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SideBar from "./Tables/SideBar";
import GenericTable from "./Tables/GenericTable";
import Toolbar from "@mui/material/Toolbar";

export const Dash = (props) => {
  const drawerWidth = 240;

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
        <GenericTable category={props.category} />
      </Box>
    </Box>
  );
};

export default Dash;
