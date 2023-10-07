import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Experiences = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchData(baseUrl + "/experiences/");
  }, []);

  const fetchData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
        console.log(data);
      });
  };

  const rows = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 28 },
    { id: 3, name: "Bob", age: 35 },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
};

export default Experiences;
