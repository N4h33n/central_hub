import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//TODO-derive course grade?

export default function Viewcourses() {
  const { studentID } = useParams();

  const courses = [
    { courseno: "CPSC 413", coursename: "Datastructures", currentgrade: "60%" },
    { courseno: "CPSC 413", coursename: "Datastructures", currentgrade: "60%" },
    { courseno: "CPSC 413", coursename: "Datastructures", currentgrade: "60%" },
  ];

  return (
    <section className="mainSection">
      <h2 className="title m-5">ENROLLED COURSES</h2>
      <Coursetable data={courses} />
      <Button variant="contained" size="large" className="m-5">
        Explore Courses ⌕
      </Button>
    </section>
  );
}

function Coursetable({ data }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  const columns = ["courseno", "coursename", "currentgrade", "actions"]; // Added "actions" column

  return (
    <TableContainer component={Paper} id="table" className="p-3">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} align="center">
                {column === "actions" ? null : column}{" "}
                {/* Don't display column name for "actions" */}
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
                  {column === "actions" ? ( // Check if it's the "actions" column
                    <Button variant="outlined">
                      <Link
                        className="link"
                        // to={`/updatecoursecomp/${row["ucid"]}/${row["Coursenumber"]}`}
                      >
                        View Details
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
