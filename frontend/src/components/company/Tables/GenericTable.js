import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { AddForm } from "../forms/AddForm";
import { Paper } from "@mui/material";
import { selectYacht } from "../../../features/yachts/yachtsSlice";
import { useDispatch } from "react-redux";

const GenericTable = ({ items, category, onSelect }) => {
  const [columns, setColumns] = useState([]);
  const columnsToExclude = [
    "id",
    "image",
    "year_built",
    "destination",
    "yacht_type",
    "max_people",
    "length_in_feet",
    "yacht_id",
  ]; // Add the column names you want to exclude
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ... other code ...

  const handleUpdate = (id) => {
    const yacht = items.find((item) => item.id === id);
    dispatch(selectYacht(yacht));
    navigate(`/${category}/update/${id}`);
  };

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

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Delete item with ID ${id}`);
  };

  const handleAdd = () => {
    // Implement your delete logic here
    console.log(`Add item`);
  };

  const handleRowClick = (params) => {
    const selectedYachtData = params.row;
    console.log(selectedYachtData);
    onSelect(selectedYachtData); // Call the callback function with selected yacht data
  };

  useEffect(() => {
    if (items && items.length > 0) {
      const newColumns = Object.keys(items[0])
        .filter((key) => !columnsToExclude.includes(key))
        .map((key) => ({
          headerName: key.replace(/_/g, " ").toUpperCase(),
          field: key,
          width: 170,
        }));

      {
        category !== "history" &&
          newColumns.push({
            headerName: "ACTIONS",
            field: "actions",
            width: 200,
            renderCell: (params) => (
              <>
                {category !== "bookings" && (
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
      }

      setColumns(newColumns);
    } else {
      setColumns([]);
    }
  }, [items]);

  return (
    <>
      <Paper
        elevation={16}
        sx={{ display: "flex", borderRadius: "20px", marginBottom: "3vh" }}
      >
        <DataGrid
          sx={{ border: "none", paddingLeft: "1vw" }}
          rows={items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          autoHeight
          onRowClick={handleRowClick}
        />
      </Paper>
      {category !== "bookings" && category !== "history" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            style={addButtonStyle}
            onClick={() => {
              handleAdd();
            }} // Reset update mode when adding}
            variant="contained"
            sx={{
              marginBottom: "3vh",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              sx={{ color: "white" }}
              to={`/${category}/add/`}
            >
              Add {category}
            </Link>
          </Button>
        </Box>
      )}
    </>
  );
};

export default GenericTable;
