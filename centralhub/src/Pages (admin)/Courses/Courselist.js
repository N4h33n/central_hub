import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

//TODO-Change phone to phone#
//TODO-Fix order

const BASE_URL = "http://localhost:5000/";

export default function Courselist() {
  const aucid = "00000001";
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/courselist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const courses = await response.json();
      console.log("courses", courses);
      setData(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleAddCourse = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    loadCourses();
  }, []); // Load students on component mount

  const addCourse = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/addcourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aucid,
        ...formData, // Spread all formData values
      }),
    });

    const responseData = await response.json();
    console.log("Added Course:", responseData); // Log the response from the server
  };

  return (
    <section className="mainSection">
      <section className="m-5">
        {" "}
        <h2 className="mt-5 ">Current Courses</h2>
        <Button
          variant="contained"
          className="position-relative float-end m-3"
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
        <Studentlisttable data={data} />
        <AddCourseModal
          open={modalOpen}
          handleClose={handleModalClose}
          addCourse={addCourse}
        />
      </section>
    </section>
  );
}

function AddCourseModal({ open, handleClose, addCourse }) {
  // Sample values for placeholders
  const sampleValues = {
    courseNumber: "CPSC 481",
    courseName: "Human Computer Interaction",
    courseDescription: "This course focuses on...",
    courseFields: "Humans, Robots, Design",
    nextSemesterOffered: "FALL 2023",
    coursePrerequisites: "CPSC 331, CPSC 471",
  };

  // State for form data
  const [formData, setFormData] = useState({
    courseNumber: "",
    courseName: "",
    courseDescription: "",
    courseFields: "",
    nextSemesterOffered: "",
    coursePrerequisites: "",
  });

  // Function to handle changes in form fields
  const handleFieldChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Function to handle form submission (you can add your logic here)
  const handleSubmit = () => {
    // Pass formData to the addCourse function
    addCourse(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent>
        {Object.keys(formData).map((field) => (
          <TextField
            key={field}
            label={capitalizeFirstLetter(field)}
            fullWidth
            margin="normal"
            placeholder={sampleValues[field]}
            value={formData[field]}
            onChange={(e) => handleFieldChange(e, field)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

function Studentlisttable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <>
      <TableContainer component={Paper} id="table" className="p-3">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} align="center">
                  {capitalizeFirstLetter(column)}
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
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
                    <Link
                      className="link"
                      to={`/coursedetailsadmin/${row.courseno}`}
                      onClick={() => console.log(row)}
                    >
                      More information
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="error"
                    // onClick={() => {
                    //   handleRemoveStudent("row[S_ucid]");
                    //   setSelectedCourse(row);
                    // }}
                  >
                    Remove Course
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
