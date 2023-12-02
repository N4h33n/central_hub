import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//TODO-table has one column for 'update info' and one for remove student
//TODO-what happens when 'remove student' is clicked

const BASE_URL = "http://localhost:5000/";

export default function Studentlist() {
  // const loadStudents = async () => {
  //   const response = await fetch(`${BASE_URL}/api/studentlist`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await response.json();
  // };

  // loadStudents();

  const data = [
    {
      ucid: "30134608",
      name: "Abi",
      email: "Abitibebu123@gmail.com",
      phone: "5878346929",
      Address: "Calgary",
    },
    {
      ucid: "30134607",
      name: "Naheen",
      email: "Naheenkabir@gmail.com",
      phone: "5878346929",
      Address: "Calgary",
    },
  ];

  return (
    <section className="mainSection">
      <h2 className="mt-5 m-3">Current Students</h2>
      <Button variant="contained" className="position-relative float-end m-3">
        <Link className="link" to="/addstudent">
          Add Student
        </Link>
      </Button>
      <Studentlisttable data={data} />
    </section>
  );
}

function Studentlisttable({ data }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  const columns = [
    ...Object.keys(data[0]),
    "Update Information",
    "Remove Student",
  ]; // Add "Remove Student" column

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
                  {column === "Update Information" ? (
                    <Button variant="outlined">
                      <Link className="link" to={`/studentlist/${row["ucid"]}`}>
                        Update
                      </Link>
                    </Button>
                  ) : column === "Remove Student" ? (
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
