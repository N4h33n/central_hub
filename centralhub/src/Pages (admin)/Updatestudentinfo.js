import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useParams } from "react-router-dom";
import GoBack from "../GoBack";

const BASE_URL = "http://localhost:5000/";

function AddToCourseResearchModal({
  open,
  handleClose,
  title,
  fields,
  handleFieldChange,
  handleSubmit,
  research,
  courses,
  lectures,
  tutorials,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {fields.map((field) =>
          field.stateKey === "courseno" ? (
            <FormControl fullWidth key={field.stateKey}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                autoFocus
                margin="dense"
                label={field.label}
                value={field.value || ""}
                onChange={(event) => handleFieldChange(event, field.stateKey)}
              >
                <MenuItem value="" disabled>
                  Select Course
                </MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : field.stateKey === "lecno" ? (
            <FormControl fullWidth key={field.stateKey}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                autoFocus
                margin="dense"
                label={field.label}
                value={field.value || ""}
                onChange={(event) => handleFieldChange(event, field.stateKey)}
              >
                <MenuItem value="" disabled>
                  Select Lecture
                </MenuItem>
                {lectures.map((lecture) => (
                  <MenuItem key={lecture} value={lecture}>
                    {lecture}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : field.stateKey === "tutno" ? (
            <FormControl fullWidth key={field.stateKey}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                autoFocus
                margin="dense"
                label={field.label}
                value={field.value || ""}
                onChange={(event) => handleFieldChange(event, field.stateKey)}
              >
                <MenuItem value="" disabled>
                  Select Tutorial
                </MenuItem>
                {tutorials.map((tutorial) => (
                  <MenuItem key={tutorial} value={tutorial}>
                    {tutorial}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : field.stateKey === "rid" ? (
            <FormControl fullWidth key={field.stateKey}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                autoFocus
                margin="dense"
                label={field.label}
                value={field.value || ""}
                onChange={(event) => handleFieldChange(event, field.stateKey)}
              >
                <MenuItem value="" disabled>
                  Select ID
                </MenuItem>
                {research.map((researchId) => (
                  <MenuItem key={researchId} value={researchId}>
                    {researchId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              key={field.stateKey}
              autoFocus
              margin="dense"
              label={field.label}
              type="text"
              fullWidth
              placeholder={field.placeholder}
              onChange={(event) => handleFieldChange(event, field.stateKey)}
            />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Updatestudentinfo() {
  const { studentID } = useParams();
  const ucid = studentID;
  const aucid = "00000001";

  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState("");
  const [research, setResearch] = useState(["1001", "1002", "1003"]);
  const [courses, setCourses] = useState(["CPSC 213", "CPSC 331"]);
  const [lectures, setLectures] = useState(["1", "2", "3"]);
  const [tutorials, setTutorials] = useState(["1", "2", "3"]);

  const loadCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/studentinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ucid }),
      });

      const courses = await response.json();
      setData(courses);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleAddToCourse = () => {
    setModalTitle("Add to Course");
    setModalFields([
      {
        label: "Course Number",
        stateKey: "courseno",
        placeholder: "Select Course",
      },
      {
        label: "Lecture Number",
        stateKey: "lecno",
        placeholder: "Select Lecture",
      },
      {
        label: "Tutorial Number",
        stateKey: "tutno",
        placeholder: "Select Tutorial",
      },
    ]);
    setModalOpen(true);
  };

  const handleAddToResearch = () => {
    setModalTitle("Add to Research");
    setModalFields([
      {
        label: "Research ID",
        stateKey: "rid",
        placeholder: "Select ID",
      },
    ]);
    setModalOpen(true);
  };

  const addtoCourse = async () => {
    const response = await fetch(`${BASE_URL}/api/addtocourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ucid,
        aucid,
        ...formData,
      }),
    });

    const data = await response.json();

    if (data === "false") {
      setNotification(
        "Error: The course doesn't exist or there is an issue with the information provided."
      );
    } else {
      setNotification("");
    }
  };

  const addtoResearch = async () => {
    const response = await fetch(`${BASE_URL}/api/addtoresearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ucid,
        aucid,
        ...formData,
      }),
    });

    const data = await response.json();

    if (data === "false") {
      setNotification(
        "Error: There is an issue with the information provided."
      );
    } else {
      setNotification("");
    }
  };

  const handleFieldChange = (event, stateKey) => {
    setFormData({
      ...formData,
      [stateKey]: event.target.value,
    });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <>
      <GoBack text={"🢀 Student List"} link={`/studentlist/`} />
      <section className="mainSection">
        <h2 className="mt-5 m-3">Enrolled Courses</h2>
        <Button
          variant="contained"
          className="position-relative float-start m-3 ms-5"
        >
          <Link className="link" to={`/updatepersonalinfo/${studentID}`}>
            Update Personal Information
          </Link>
        </Button>
        <Button
          variant="contained"
          className="position-relative float-end m-3 me-5"
          onClick={handleAddToCourse}
        >
          Add to Course
        </Button>
        <Button
          variant="contained"
          className="position-relative float-end m-3 me-5"
          onClick={handleAddToResearch}
        >
          Add to Research
        </Button>
        <Studentcoursetable data={data} ucid={studentID} />

        {notification && <p style={{ color: "red" }}>{notification}</p>}

        <AddToCourseResearchModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          title={modalTitle}
          fields={modalFields}
          research={research}
          courses={courses}
          lectures={lectures}
          tutorials={tutorials}
          handleFieldChange={handleFieldChange}
          handleSubmit={() => {
            modalTitle === "Add to Course" ? addtoCourse() : addtoResearch();
            setModalOpen(false);
          }}
        />
      </section>
    </>
  );
}

function Studentcoursetable({ data, ucid }) {
  const removeFromCourse = async (ucid, courseno) => {
    try {
      const response = await fetch(`${BASE_URL}/api/removefromcourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
          courseno,
        }),
      });

      const data = await response.json();
    } catch (error) {}
  };

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = [
    "courseno",
    "coursename",
    "semester",
    "Update Grades",
    "Remove From Course",
  ];

  return (
    <section className="m-5">
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
                  <TableCell key={column} align="center">
                    {column === "Update Grades" ? (
                      <Button variant="outlined">
                        <Link
                          className="link"
                          to={`/updatecoursecomp/${ucid}/${row["courseno"]}`}
                        >
                          Update Component
                        </Link>
                      </Button>
                    ) : column === "Remove From Course" ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeFromCourse(ucid, row["courseno"])}
                      >
                        Remove from Course
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
    </section>
  );
}
