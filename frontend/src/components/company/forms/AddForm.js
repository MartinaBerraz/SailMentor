import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import Box from "@mui/material/Box";
import SideBar from "../Tables/SideBar";
import Toolbar from "@mui/material/Toolbar";
import AddYachtForm from "./AddYachtForm";
import AddYacht from "./AddYacht";

export const AddForm = (props) => {
  const baseUrl = "http://127.0.0.1:8000/api";

  const formData = [
    {
      name: "id",
      type: "BigAutoField",
    },
    {
      name: "name",
      type: "CharField",
    },
    {
      name: "year_built",
      type: "IntegerField",
    },
    {
      name: "max_people",
      type: "IntegerField",
    },
    {
      name: "price_per_night",
      type: "FloatField",
    },
    {
      name: "no_cabins",
      type: "IntegerField",
    },
    {
      name: "length_in_feet",
      type: "FloatField",
    },

    {
      name: "yacht_type",
      type: "ForeignKey",
    },

    {
      name: "destination",
      type: "ForeignKey",
    },
    {
      name: "image",
      type: "FileField",
    },
  ];

  // useEffect(() => {
  //   fetchData(baseUrl + `/${props.category}-fields/`);
  // }, [props.category]);

  // const fetchData = (url) => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFormData(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

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
