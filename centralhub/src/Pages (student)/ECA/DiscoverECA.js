import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
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
import GoBack from "../../GoBack";

const BASE_URL = "http://localhost:5000/";

export default function DiscoverECA() {
  const { studentID } = useParams();
  const ucid = studentID;

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
        body: JSON.stringify(filterValues, ucid),
      });

      const filteredEcas = await response.json();
      setData(filteredEcas);
    } catch (error) {}
  };

  const handleFilterChange = (field, value) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [field]: value,
    }));
  };

  return (
    <>
      <GoBack text={"🢀 Enrolled Clubs"} link={`/enrolledeca/${studentID}`} />
      <section className="filtercourse mainSection">
        <h1 className="m-5">EXPLORE CLUBS</h1>
        <div
          className="d-inline-block float-start ms-2"
          style={{ maxWidth: "75%" }}
        >
          <ECAtable data={data} ucid={studentID} />
        </div>
        <div
          className="d-inline-block position-fixed"
          style={{ right: "5%", verticalAlign: "top", bottom: "1%" }}
        >
          <div>
            <TextField
              id="filled-basic"
              label="Club Name"
              value={filterValues.clubname}
              variant="filled"
              onChange={(e) => handleFilterChange("clubname", e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Club Location"
              value={filterValues.location}
              variant="filled"
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Meeting Date and Time"
              value={filterValues.meetingtime}
              variant="filled"
              onChange={(e) =>
                handleFilterChange("meetingtime", e.target.value)
              }
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Club Field"
              value={filterValues.field}
              variant="filled"
              onChange={(e) => handleFilterChange("field", e.target.value)}
            />
            <div>
              <Button className="mt-3" variant="contained" onClick={filterEcas}>
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ECAtable({ data, ucid }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedClub, setSelectedClub] = useState(null);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  const handleDialogOpen = (club, ucid) => {
    setSelectedClub(club);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAgree = async (ucid, clubname) => {
    console.log(ucid);
    console.log("hello");
    console.log(clubname);
    setDialogOpen(false);
    try {
      const response = await fetch(`${BASE_URL}/api/joinclub`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
          clubname,
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error leaving club:", error);
    }
  };

  return (
    <>
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
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={column} align={"center"}>
                    {row[column]}
                  </TableCell>
                ))}
                {/* Add the "Leave Club" button to each row */}
                <TableCell align="center">
                  <Button
                    style={{ color: "green", border: "green" }}
                    variant="outlined"
                    onClick={() => handleDialogOpen(row.clubname, ucid)}
                  >
                    Join Club
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedClub && (
        <AlertDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleAgree={() => handleAgree(ucid, selectedClub)}
          club={selectedClub}
        />
      )}
    </>
  );
}

export function AlertDialog({ open, handleClose, handleAgree, club }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"You are about to join the selected club!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
