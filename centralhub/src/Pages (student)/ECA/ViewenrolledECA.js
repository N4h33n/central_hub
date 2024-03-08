import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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

//TODO-Add date joined and other rnship attributes for ECA
//TODO-Change 'ECA' to 'club'
//TODO-Add 'date' to ECA

const BASE_URL = "http://localhost:5000/";

export default function ViewenrolledECA() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [data, setData] = useState([]);

  const loadECAs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledecas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ucid }),
      });

      const ecas = await response.json();
      console.log("ecas", ecas);
      setData(ecas);
    } catch (error) {
      console.error("Error loading ecas:", error);
    }
  };

  useEffect(() => {
    console.log(studentID);
    loadECAs();
  }, []);
  return (
    <>
      <GoBack text={"🢀 Dashboard"} link={`/dashboard/${ucid}`} />
      <section className="mainSection">
        <h2 className=" m-5">ENROLLED CLUBS</h2>
        <ECAtable data={data} ucid={ucid} />
        <Button variant="contained" size="large" className="m-5">
          <Link className="link" to={`/discoverecas/${ucid}`}>
            Explore Clubs ⌕
          </Link>
        </Button>
      </section>
    </>
  );
}

export function ECAtable({ data, ucid }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedClub, setSelectedClub] = useState(null);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  const handleDialogOpen = (club) => {
    setSelectedClub(club);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAgree = async (ucid, clubname) => {
    setDialogOpen(false);
    try {
      const response = await fetch(`${BASE_URL}/api/leaveclub`, {
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
      window.location.reload();
    } catch (error) {
      console.error("Error leaving club:", error);
    }
  };

  return (
    <section className="m-3">
      <TableContainer component={Paper} id="table" className="p-3">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} align="center">
                  {column}
                </TableCell>
              ))}
              {/* Add a new column for "Leave Club" button */}
              <TableCell align="center">Leave Club</TableCell>
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
                    style={{ color: "red", border: "red" }}
                    variant="outlined"
                    onClick={() => handleDialogOpen(row.clubname)}
                  >
                    Leave Club
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render the AlertDialog component */}
      {selectedClub && (
        <AlertDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleAgree={() => handleAgree(ucid, selectedClub)}
          club={selectedClub}
        />
      )}
    </section>
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
        {"Are you sure you want to leave this club?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`You are about to leave the selected club and will have to rejoin if you change your mind.`}
        </DialogContentText>
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
