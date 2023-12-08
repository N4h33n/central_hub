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
    loadECAs();
  }, []);
  return (
    <section className="mainSection">
      <h2 className="title m-5">ENROLLED EXTRACURRICULAR ACTIVITIES</h2>
      <ECAtable data={data} />
      <Button variant="contained" size="large" className="m-5">
        <Link className="link" to={`/discoverecas`}>
          Explore Extracurriculars ⌕
        </Link>
      </Button>
    </section>
  );
}

function ECAtable({ data }) {
  if (!data || data.length === 0) {
    // Handle case where data is empty or undefined
    return <p>No data available</p>;
  }

  // Add "Course Details" to the columns array
  const columns = [...Object.keys(data[0]), "Club Details"];

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
                        Club Details
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
