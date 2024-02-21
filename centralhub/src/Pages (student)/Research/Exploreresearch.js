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
import GoBack from "../../GoBack";

const BASE_URL = "http://localhost:5000/";

export default function Exploreresearch() {
  const { studentID } = useParams();

  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    researchid: "",
    researchtitle: "",
    field: "",
    researchername: "",
  });
  const loadResearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/exploreresearch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const research = await response.json();
      setData(research);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    loadResearch();
  }, []);

  const filterResearch = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/filterresearch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterValues),
      });

      const filteredResearch = await response.json();
      setData(filteredResearch);
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
      <GoBack text={"🢀 Research Homepage"} link={`/research/${studentID}`} />
      <section className="filtercourse mainSection">
        <h1 className="m-5">EXPLORE RESEARCH</h1>
        <div className="d-inline-block me-5">
          <Coursetable data={data} />
        </div>
        <div
          className="d-inline-block position-fixed"
          style={{ right: "5%", verticalAlign: "top", bottom: "1%" }}
        >
          <div>
            <TextField
              id="researchid"
              label="Research ID"
              variant="filled"
              value={filterValues.researchid}
              onChange={(e) =>
                setFilterValues({ ...filterValues, researchid: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              id="researchname"
              label="Research Name"
              variant="filled"
              value={filterValues.researchname}
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  researchname: e.target.value,
                })
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
              id="researchername"
              label="Researcher"
              variant="filled"
              value={filterValues.researchername}
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  researchername: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div>
              <Button
                className="mt-3"
                variant="contained"
                onClick={filterResearch}
              >
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Coursetable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

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
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column} align={"center"}>
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
