import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { AddForm } from "../forms/AddForm";

const GenericTable = (props) => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [resources, setResources] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData(baseUrl + `/${props.category}/`);
  }, [props.category]);

  const customButtonStyle = {
    backgroundColor: "#3FB295", // Replace with your desired color
    color: "white", // Text color
    margin: "1px",
  };

  const addButtonStyle = {
    backgroundColor: "#3FB295", // Replace with your desired color
    color: "white", // Text color
    marginTop: "5px",
    alignContent: "start",
  };

  const handleUpdate = (id) => {
    // Implement your update logic here
    console.log(`Update item with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Delete item with ID ${id}`);
  };

  const handleAdd = () => {
    // Implement your delete logic here
    console.log(`Add item`);
  };

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (resources && resources.length > 0) {
      const newColumns = Object.keys(resources[0]).map((key) => ({
        headerName: key.toUpperCase(),
        field: key,
        width: 170,
      }));

      newColumns.push({
        headerName: "ACTIONS",
        field: "actions",
        width: 200,
        renderCell: (params) => (
          <>
            {props.category !== "bookings" && (
              <Button
                size="small"
                style={customButtonStyle}
                onClick={() => handleUpdate(params.row.id)}
                variant="contained"
              >
                Update
              </Button>
            )}
            <Button
              size="small"
              style={customButtonStyle}
              onClick={() => handleDelete(params.row.id)}
              variant="contained"
            >
              Delete
            </Button>
          </>
        ),
      });

      setColumns(newColumns);
    }
  }, [resources]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={resources}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        autoHeight
      />
      {props.category !== "bookings" && (
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            style={addButtonStyle}
            onClick={() => handleAdd()}
            variant="contained"
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              sx={{ color: "white" }}
              to={`/${props.category}/add/`}
            >
              Add {props.category}
            </Link>
          </Button>
        </Box>
      )}
    </div>
  );
};

export default GenericTable;
