import React, { useState, useEffect } from "react";
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

export default function Explorecourses() {
  const [courses, setCourses] = useState([]);
  const [filterValues, setFilterValues] = useState({
    coursename: "",
    coursenumber: "",
    field: "",
    instructor: "",
    ta: "",
  });

  const loadCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/explorecourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const courses = await response.json();
      setCourses(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const filterCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/filtercourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterValues),
      });

      const filteredCourses = await response.json();
      setCourses(filteredCourses);

      // Reset filterValues after filtering
      setFilterValues({
        coursename: "",
        coursenumber: "",
        field: "",
        instructor: "",
        ta: "",
      });
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <section className="filtercourse mainSection">
      <h1 className="m-5">EXPLORE COURSES</h1>
      <div
        className="d-inline-block float-start ms-2"
        style={{ maxWidth: "75%" }}
      >
        <Coursetable data={courses} />
      </div>
      <div
        className="d-inline-block position-fixed"
        style={{ verticalAlign: "top", right: "5%" }}
      >
        <div>
          <TextField
            id="coursename"
            label="Course Name"
            variant="filled"
            value={filterValues.coursename}
            onChange={(e) =>
              setFilterValues({ ...filterValues, coursename: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            id="coursenumber"
            label="Course Number"
            variant="filled"
            value={filterValues.coursenumber}
            onChange={(e) =>
              setFilterValues({ ...filterValues, coursenumber: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            id="field"
            label="Field"
            variant="filled"
            value={filterValues.field}
            onChange={(e) =>
              setFilterValues({ ...filterValues, field: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            id="instructor"
            label="Instructor"
            variant="filled"
            value={filterValues.instructor}
            onChange={(e) =>
              setFilterValues({ ...filterValues, instructor: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            id="ta"
            label="Teaching Assistant"
            variant="filled"
            value={filterValues.ta}
            onChange={(e) =>
              setFilterValues({ ...filterValues, ta: e.target.value })
            }
          />
          <div>
            <Button
              className="mt-3"
              variant="contained"
              onClick={filterCourses}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Coursetable({ data }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  // Add "Course Details" to the columns array
  const columns = [...Object.keys(data[0]), "Course Details"];

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
                        to={`/courseDetails/${row["courseno"]}`}
                      >
                        Course Details
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
