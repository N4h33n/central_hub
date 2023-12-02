import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BASE_URL = "http://localhost:5000/";

export default function Studentlist() {
  const [data, setData] = useState([]);

  const loadStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/studentlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const students = await response.json();
      console.log("students", students);
      setData(students);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []); // Load students on component mount

  return (
    <section className="mainSection">
      <h2 className="mt-5 m-3">Current Students</h2>
      <Button variant="contained" className="position-relative float-end m-3">
        <Link className="link" to="/addstudent">
          Add Student
        </Link>
      </Button>
      <Studentlisttable data={data} />
    </section>
  );
}

function Studentlisttable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

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
            <TableCell align="center">Update Information</TableCell>
            <TableCell align="center">Remove Student</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column} align="center">
                  {row[column]}
                </TableCell>
              ))}
              <TableCell align="center">
                <Button variant="outlined">
                  <Link className="link" to={`/studentlist/${row["ucid"]}`}>
                    Update
                  </Link>
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="error"
                  // onClick={() => handleRemoveStudent(row["ucid"])}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
