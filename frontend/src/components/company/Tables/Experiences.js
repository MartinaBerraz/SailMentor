import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Experiences = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [experiences, setExperiences] = useState([]);
  const [columns, setColumns] = useState([]);

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

  useEffect(() => {
    if (experiences && experiences.length > 0) {
      const newColumns = Object.keys(experiences[0]).map((key) => ({
        headerName: key.toUpperCase(),
        field: key,
        width: 200,
      }));

      setColumns(newColumns);
    }
  }, [experiences]);

  return (
    <DataGrid
      rows={experiences}
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
