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

export default function Pastresearchlist() {
  const aucid = "00000001";
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadResearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/pastresearchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const research = await response.json();
      console.log("research", research);
      setData(research);
    } catch (error) {
      console.error("Error loading research:", error);
    }
  };

  const handleAddResearch = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    loadResearch();
  }, []); // Load students on component mount

  const addResearch = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/addpastresearch`, {
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
    console.log("Added Research:", responseData); // Log the response from the server
  };

  return (
    <section className="mainSection">
      <h2 className="mt-5 m-3">Past Research</h2>
      <Button
        variant="contained"
        className="position-relative float-end m-3"
        onClick={handleAddResearch}
      >
        Add Research
      </Button>
      <Studentlisttable data={data} />
      <AddCourseModal
        open={modalOpen}
        handleClose={handleModalClose}
        addResearch={addResearch}
      />
    </section>
  );
}

function AddCourseModal({ open, handleClose, addResearch }) {
  // State for form data
  const [formData, setFormData] = useState({
    ResearchID: "",
    Title: "",
    Description: "",
    DateCompleted: "",
    ResearchFields: "",
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
    addResearch(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Research</DialogTitle>
      <DialogContent>
        <TextField
          label="Research ID"
          fullWidth
          margin="normal"
          value={formData.ResearchID}
          onChange={(e) => handleFieldChange(e, "ResearchID")}
        />
        <TextField
          label="Research Title"
          fullWidth
          margin="normal"
          value={formData.Title}
          onChange={(e) => handleFieldChange(e, "Title")}
        />
        <TextField
          label="Research Description"
          fullWidth
          margin="normal"
          value={formData.Description}
          onChange={(e) => handleFieldChange(e, "Description")}
        />
        <TextField
          label="Date Completed"
          fullWidth
          margin="normal"
          value={formData.DateCompleted}
          onChange={(e) => handleFieldChange(e, "DateCompleted")}
        />
        <TextField
          label="Research Fields"
          fullWidth
          margin="normal"
          value={formData.ResearchFields}
          onChange={(e) => handleFieldChange(e, "ResearchFields")}
        />
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
                  <Button
                    variant="outlined"
                    color="error"
                    // onClick={() => {
                    //   handleRemoveStudent("row[S_ucid]");
                    //   setSelectedCourse(row);
                    // }}
                  >
                    Remove Research
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
