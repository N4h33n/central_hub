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
import GoBack from "../../GoBack";

const BASE_URL = "http://localhost:5000/";

export default function Clublist() {
  const aucid = "00000001";
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadClubs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/clublist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const clubs = await response.json();
      setData(clubs);
    } catch (error) {}
  };

  const handleaddClub = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    loadClubs();
  }, []);

  const addClub = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/addclub`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aucid,
        ...formData,
      }),
    });

    const responseData = await response.json();
  };

  return (
    <>
      <GoBack text={"🢀 Homepage"} link={`/adminlanding`} />
      <section className="mainSection">
        <section className="m-5">
          <h2 className="mt-5">Active Clubs</h2>
          <Button
            variant="contained"
            className="position-relative float-end m-3"
            onClick={handleaddClub}
          >
            Add Club
          </Button>
          <Studentlisttable data={data} />
          <AddCourseModal
            open={modalOpen}
            handleClose={handleModalClose}
            addClub={addClub}
          />
        </section>
      </section>
    </>
  );
}

function AddCourseModal({ open, handleClose, addClub }) {
  const [formData, setFormData] = useState({
    clubName: "",
    clubDescription: "",
    clubFields: "",
    clubLocation: "",
    clubTime: "",
  });

  const handleFieldChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = () => {
    addClub(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Club</DialogTitle>
      <DialogContent>
        <TextField
          label="Club Name"
          fullWidth
          margin="normal"
          value={formData.clubName}
          onChange={(e) => handleFieldChange(e, "clubName")}
        />
        <TextField
          label="Club Description"
          fullWidth
          margin="normal"
          value={formData.clubDescription}
          onChange={(e) => handleFieldChange(e, "clubDescription")}
        />
        <TextField
          label="Club Fields"
          fullWidth
          margin="normal"
          value={formData.clubFields}
          onChange={(e) => handleFieldChange(e, "clubFields")}
        />
        <TextField
          label="Club Location"
          fullWidth
          margin="normal"
          value={formData.clubLocation}
          onChange={(e) => handleFieldChange(e, "clubLocation")}
        />
        <TextField
          label="Club Date"
          fullWidth
          margin="normal"
          value={formData.clubTime}
          onChange={(e) => handleFieldChange(e, "clubTime")}
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
