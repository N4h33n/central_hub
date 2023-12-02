import React from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// TODO: add URL param to update student information being displayed based on ID
// TODO: one column for update course component info and one for remove from course
// TODO: display more information about the course??
//TODO: what does remove from course do?

const StudentID = () => {
  const { studentID } = useParams();
  return studentID;
};

const BASE_URL = "http://localhost:5000/";
const ucid = StudentID;

export default function Updatestudentinfo() {
  const [data, setData] = useState([]);

  const loadCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/studentinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ucid }),
      });

      const courses = await response.json();
      console.log("course", courses);
      setData(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const studentID = StudentID();
  const filteredData = data.filter((course) => course.ucid === studentID);

  return (
    <section className="mainSection">
      <h2 className="mt-5 m-3">Enrolled Courses</h2>
      <Button
        variant="contained"
        className="position-relative float-start m-3 ms-5"
      >
        <Link className="link" to="/adminlogin">
          Update Personal Information
        </Link>
      </Button>
      <Button
        variant="contained"
        className="position-relative float-end m-3 me-5"
      >
        <Link className="link" to="/adminlogin">
          Add to Course
        </Link>
      </Button>
      <Studentcoursetable data={filteredData} />
    </section>
  );
}

function Studentcoursetable({ data }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  const columns = [
    "Coursenumber",
    "Coursename",
    "NextSemesterOffered",
    "Update Grades",
    "Remove From Course",
  ];

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
                  {column === "Update Grades" ? (
                    <Button variant="outlined">
                      <Link
                        className="link"
                        to={`/updatecoursecomp/${row["ucid"]}/${row["Coursenumber"]}`}
                      >
                        Update
                      </Link>
                    </Button>
                  ) : column === "Remove From Course" ? (
                    <Button variant="outlined" color="error">
                      {/* What happens here */}
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
