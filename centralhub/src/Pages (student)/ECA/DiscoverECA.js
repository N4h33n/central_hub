import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BASE_URL = "http://localhost:5000/";

export default function DiscoverECA() {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    clubname: "",
    field: "",
    meetingday: "",
    meetingtime: "",
    location: "",
  });
  const loadECAS = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/discoverecas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const ecas = await response.json();
      console.log("ecas", ecas);
      setData(ecas);
      console.log(data);
    } catch (error) {
      // console.error("Error loading courses:", error);
    }
  };

  useEffect(() => {
    loadECAS();
  }, []);

  const filterEcas = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/filterecas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterValues),
      });

      const filteredEcas = await response.json();
      setData(filteredEcas);
    } catch (error) {
      // console.error("Error loading courses:", error);
    }
  };

  return (
    <section className="filtercourse mainSection">
      <h1 className="m-5">EXPLORE CLUBS</h1>
      <div className="d-inline-block">
        <ECAtable data={data} />
      </div>
      <div
        className="d-inline-block"
        style={{ minWidth: "30%", verticalAlign: "top" }}
      >
        <div>
          <TextField
            id="filled-basic"
            label="Club Name"
            value={filterValues.clubname}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Club Location"
            value={filterValues.location}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Club Meeting Day"
            value={filterValues.meetingday}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Club Time"
            value={filterValues.meetingtime}
            variant="filled"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Club Field"
            value={filterValues.field}
            variant="filled"
          />

          <div>
            <Button className="mt-3" variant="contained" onClick={filterEcas}>
              Filter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ECAtable({ data }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  // Add "Course Details" to the columns array
  const columns = [...Object.keys(data[0]), "Club Details"];

  return (
    <TableContainer component={Paper} id="table" className="p-3">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index} // Assuming each row has a unique identifier
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column} align={"center"}>
                  {column === "Course Details" ? (
                    <Button variant="outlined">
                      <Link
                        className="link"
                        to={`/viewecas/${row["clubname"]}`}
                      >
                        Club Details
                      </Link>
                    </Button>
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
