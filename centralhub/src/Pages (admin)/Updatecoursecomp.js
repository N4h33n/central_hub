import { React, useState, useEffect } from "react";
import Placeholdertable from "../Pages (student)/Placeholdertable";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const BASE_URL = "http://localhost:5000/";

export default function Updatecoursecomp() {
  const { studentID, courseID } = useParams();
  const ucid = studentID;
  const courseno = courseID;

  const [assignments, setAssignments] = useState([]);
  const [assignmentNos, setAssignmentNos] = useState([]);
  const [examNos, setExamNos] = useState([]);
  const [exams, setExams] = useState([]);

  const loadAssignments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/assignmentcomponent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
          courseno,
        }),
      });

      const assignmentsData = await response.json();
      setAssignments(assignmentsData);

      // Extract assignment numbers and set state
      const assignmentNumbers = assignmentsData.map(
        (assignment) => assignment.assignmentno
      );
      setAssignmentNos(assignmentNumbers);

      console.log(assignmentsData);
    } catch (error) {
      console.error("Error loading assignments:", error);
    }
  };

  const loadExams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/examcomponent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
          courseno,
        }),
      });

      const examsData = await response.json();
      setExams(examsData);

      // Extract exam numbers and set state
      const examNumbers = examsData.map((exam) => exam.examno);
      setExamNos(examNumbers);

      console.log(examsData);
      console.log("HELLO", examNos);
    } catch (error) {
      console.error("Error loading exams:", error);
    }
  };

  useEffect(() => {
    console.log(ucid);
    console.log(courseno);
    console.log(assignments);
    loadAssignments();
    loadExams();
    console.log("HELLO", examNos);
  }, []);

  const updateAssignment = async (assNo, grade) => {
    const normalizedGrade = parseFloat(grade) / 100;
    const response = await fetch(`${BASE_URL}/api/updateassignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ucid,
        courseno,
        assNo,
        grade: normalizedGrade,
      }),
    });

    const data = await response.json();
    console.log("Assignment updated:", data);
  };

  const updateExam = async (examNo, grade) => {
    const normalizedGrade = parseFloat(grade) / 100;
    const response = await fetch(`${BASE_URL}/api/updateexam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ucid,
        courseno,
        examNo,
        grade: normalizedGrade,
      }),
    });

    const data = await response.json();
    console.log("Exam updated:", data);
  };

  return (
    <section className="mainSection mt-4">
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Assignments</h3>
        <Placeholdertable data={assignments} />
        <CustomizedDialogs
          title="Update Assignment Grade"
          updateFunction={updateAssignment}
          list={assignmentNos}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Exams</h3>
        <Placeholdertable data={exams} />
        <CustomizedDialogs
          title="Update Exam Grade"
          updateFunction={updateExam}
          list={examNos}
        />
      </div>
    </section>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function CustomizedDialogs({ title, updateFunction, list }) {
  const [open, setOpen] = useState(false);
  const [assNo, setAssNo] = useState("");
  const [grade, setGrade] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    updateFunction(assNo, grade);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" className="m-3" onClick={handleClickOpen}>
        {title}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ></IconButton>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel id="list-select-label">{title} No.</InputLabel>
            <Select
              label="Assignment/Exam No."
              fullWidth
              margin="normal"
              onChange={(e) => setAssNo(e.target.value)}
            >
              {list.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Grade (%)"
            fullWidth
            margin="normal"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleChanges}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
