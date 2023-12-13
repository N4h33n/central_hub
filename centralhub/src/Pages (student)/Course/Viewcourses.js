import { React, useState, useEffect, Component } from "react";
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

const BASE_URL = "http://localhost:5000/";

export default function Viewcourses() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledcourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
        }),
      });

      const courses = await response.json();
      setCourses(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <section className="mainSection">
      <section className="m-5">
        <h2 className="title m-5">ENROLLED COURSES</h2>
        <Coursetable data={courses} ucid={ucid} />
        <Button variant="contained" size="large" className="m-5">
          <Link className="link" to={`/explorecourses/${ucid}`}>
            Explore Courses ⌕
          </Link>
        </Button>
      </section>
    </section>
  );
}

function Coursetable({ data, ucid }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  const columns = ["courseno", "coursename", "currentgrade", "actions"];

  return (
    <TableContainer component={Paper} id="table" className="p-3">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} align="center">
                {column === "actions" ? null : column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column} align={"center"}>
                  {column === "currentgrade" ? ( // Check if it's the "currentgrade" column
                    `${Math.round(parseFloat(row[column]) * 100)}%`
                  ) : column === "actions" ? ( // Check if it's the "actions" column
                    <Button variant="outlined">
                      <Link
                        className="link"
                        to={`/enrolledcoursedetails/${ucid}/${row["courseno"]}`}
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
