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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//TODO-Change phone to phone#
//TODO-Fix order

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
  }, []);

  return (
    <section className="mainSection">
      <section className="m-3">
        <h2 className="mt-5 m-2">Current Students</h2>
        <Button variant="contained" className="position-relative float-end m-3">
          <Link className="link" to="/addstudent">
            Add Student
          </Link>
        </Button>
        <Studentlisttable data={data} />
      </section>
    </section>
  );
}

function Studentlisttable({ data }) {
  const [selectedStudent, setSelectedStudent] = useState("");

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  const handleRemoveStudent = (ucid) => {
    setSelectedStudent(ucid);
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
  };

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
                    <Link className="link" to={`/studentlist/${row["s_ucid"]}`}>
                      Update
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      handleRemoveStudent(row["s_ucid"]);
                      setSelectedStudent(row);
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedStudent && (
        <AlertDialog
          ucid={selectedStudent}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function AlertDialog({ ucid, handleCloseDialog }) {
  const handleClick = async (ucid) => {
    const response = await fetch(`${BASE_URL}/api/removestudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ucid,
      }),
    });

    const data = await response.json();
  };

  const handleAgree = () => {
    console.log("removed", ucid.s_ucid);
    handleClick(ucid.s_ucid);
    handleCloseDialog();
  };

  return (
    <Dialog
      open={Boolean(ucid)}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to remove from the database?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will remove this student from enrollment in the
          department. The student will have to be added back manually.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
