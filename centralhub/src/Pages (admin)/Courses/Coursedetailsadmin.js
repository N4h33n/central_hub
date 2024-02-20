import { React, useState, useEffect } from "react";
import Placeholdertable from "../../Pages (student)/Placeholdertable";
import { Link, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = "http://localhost:5000/";

export default function Coursedetailsadmin() {
  const { courseID } = useParams();
  const courseno = courseID;
  const aucid = "00000001";

  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [lastAss, setLastAss] = useState("");
  const [lastExam, setLastExam] = useState("");
  const [lastLecture, setLastLecture] = useState("");
  const [lastTutorial, setLastTutorial] = useState("");
  const [compSum, setCompSum] = useState(80);
  const [compSumUnder, setCompSumUnder] = useState(true);

  const loadAssignments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/adminassignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const assignments = await response.json();
      setAssignments(assignments);
      // setCompSum(compSum + assignments.weightSum);
      // if (compSum >= 100) {
      //   setCompSumUnder(true);
      // }

      // Extract assignment numbers and set state
      const assignmentNumbers = assignments.map(
        (assignment) => assignment.assignmentno
      );
      setLastAss(assignmentNumbers[assignmentNumbers.length - 1]);
      console.log(assignments);
    } catch (error) {
      console.error("Error loading assignments:", error);
    }
  };

  const loadExams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/adminexams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const exams = await response.json();
      setExams(exams);
      // setCompSum(compSum + assignments.weightSum);
      // if (compSum >= 100) {
      //   setCompSumUnder(true);
      // }

      // Extract assignment numbers and set state
      const examNumbers = exams.map((exam) => exam.examno);
      setLastExam(examNumbers[examNumbers.length - 1]);
      console.log(exams);
    } catch (error) {
      console.error("Error loading exams:", error);
    }
  };

  const loadLectures = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/adminlectures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const lectures = await response.json();
      setLectures(lectures);
      const lecNumbers = lectures.map((lecture) => lecture.lectureno);
      setLastLecture(lecNumbers[lecNumbers.length - 1]);
      console.log(lectures);
    } catch (error) {
      console.error("Error loading lectures:", error);
    }
  };

  const loadTutorials = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admintutorials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const tutorials = await response.json();
      setTutorials(tutorials);
      const tutorialNumbers = tutorials.map((tutorial) => tutorial.tutorialno);
      setLastTutorial(tutorialNumbers[tutorialNumbers.length - 1]);
      console.log(tutorials);
    } catch (error) {
      console.error("Error loading tutorials:", error);
    }
  };

  useEffect(() => {
    loadAssignments();
    loadExams();
    loadLectures();
    loadTutorials();
    console.log(assignments);
    console.log(exams);
    console.log(tutorials);
    console.log(lectures);
  }, []);

  const addAssignment = async (assNo, assdeadline, assweight) => {
    const normalizedWeight2 = parseFloat(assweight) / 100;
    assNo = lastAss + 1;
    const response = await fetch(`${BASE_URL}/api/addassignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assNo,
        assdeadline,
        assweight: normalizedWeight2,
        aucid,
        courseno,
      }),
    });
    const data = await response.json();
  };

  const addExam = async (
    examNo,
    examweight,
    examdate,
    examduration,
    examlocation
  ) => {
    const normalizedWeight = parseFloat(examweight) / 100;
    examNo = lastExam + 1;
    const response = await fetch(`${BASE_URL}/api/addexam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        examNo,
        examweight: normalizedWeight,
        examdate,
        examduration,
        examlocation,
        aucid,
        courseno,
      }),
    });
    const data = await response.json();
  };

  const addLecture = async (lecno, leclocation, lecdate, instucid) => {
    lecno = lastLecture + 1;
    const response = await fetch(`${BASE_URL}/api/addlecture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lecno,
        leclocation,
        lecdate,
        instucid,
        aucid,
        courseno,
      }),
    });
    const data = await response.json();
  };

  const addTutorial = async (tutno, tutdate, tutlocation, taucid) => {
    tutno = lastTutorial + 1;
    const response = await fetch(`${BASE_URL}/api/addtutorial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutno,
        tutdate,
        tutlocation,
        taucid,
        aucid,
        courseno,
      }),
    });
    const data = await response.json();
  };

  return (
    <section className="mainSection mt-4">
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Assignments</h3>
        {compSumUnder && (
          <h5 className="sumError">
            Components do not currently add up to 100%!
          </h5>
        )}
        <Placeholdertable data={assignments} />
        <CustomizedAssignment
          title="Add Assignment"
          updateFunction={addAssignment}
          courseno={courseno}
          next={lastAss + 1}
          compSum={compSum}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Exams</h3>
        {compSumUnder && (
          <h5 className="sumError">
            Components do not currently add up to 100%!
          </h5>
        )}
        <Placeholdertable data={exams} />
        <CustomizedExam
          title="Add Exam"
          updateFunction={addExam}
          courseno={courseno}
          next={lastExam + 1}
          compSum={compSum}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Lectures</h3>
        <Placeholdertable data={lectures} />
        <CustomizedLecture
          title="Add Lecture"
          updateFunction={addLecture}
          courseno={courseno}
          next={Number(lastLecture) + 1}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Tutorials</h3>
        <Placeholdertable data={tutorials} />
        <CustomizedTutorial
          title="Add Tutorial"
          updateFunction={addTutorial}
          courseno={courseno}
          next={Number(lastTutorial) + 1}
        />
      </div>
    </section>
  );
}

// function datePicker(){
//   const [selectedDate, setSelectedDate] =
// }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function CustomizedAssignment({
  title,
  updateFunction,
  courseno,
  next,
  compSum,
}) {
  const [open, setOpen] = useState(false);

  const [assNo, setAssNo] = useState("1");
  const [assdeadline, setAssdeadline] = useState("2023-12-31 23:59:59");
  const [assweight, setAssweight] = useState("40");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    if (compSum + Number(assweight) > 100) {
      alert("Sum of component weights exceeds 100! Please reduce the weight.");
    } else {
      updateFunction(assNo, assdeadline, assweight);
      setOpen(false);
    }
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
          <TextField
            label="Assignment No."
            fullWidth
            margin="normal"
            value={next}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Assignment Deadline"
            fullWidth
            margin="normal"
            placeholder={assdeadline}
            onChange={(e) => setAssdeadline(e.target.value)}
          />
          <TextField
            label="Assignment Weight"
            fullWidth
            margin="normal"
            placeholder={assweight}
            onChange={(e) => setAssweight(e.target.value)}
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

export function CustomizedExam({
  title,
  updateFunction,
  courseno,
  next,
  compSum,
}) {
  const [open, setOpen] = useState(false);

  const [examNo, setExamNo] = useState("1");
  const [examweight, setExamweight] = useState("30");
  const [examdate, setExamDate] = useState("2023-12-31 23:59:59");
  const [examduration, setExamDuration] = useState("01:30:00");
  const [examlocation, setExamLocation] = useState("ICT 212");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    if (compSum + Number(examweight) > 100) {
      alert("Sum of component weights exceeds 100! Please reduce the weight.");
    } else {
      updateFunction(examNo, examweight, examdate, examduration, examlocation);
      setOpen(false);
    }
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
          <TextField
            label="Exam No."
            fullWidth
            margin="normal"
            value={next}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Exam Weight"
            fullWidth
            margin="normal"
            placeholder={examweight}
            onChange={(e) => setExamweight(e.target.value)}
          />
          <TextField
            label="Exam Date"
            fullWidth
            margin="normal"
            placeholder={examdate}
            onChange={(e) => setExamDate(e.target.value)}
          />
          <TextField
            label="Exam Duration"
            fullWidth
            margin="normal"
            placeholder={examduration}
            onChange={(e) => setExamDuration(e.target.value)}
          />
          <TextField
            label="Exam Location"
            fullWidth
            placeholder={examlocation}
            margin="normal"
            onChange={(e) => setExamLocation(e.target.value)}
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

export function CustomizedLecture({ title, updateFunction, courseno, next }) {
  const [open, setOpen] = useState(false);

  const [lecno, setLecno] = useState("3");
  const [leclocation, setLecLocation] = useState("MS 160");
  const [lecdate, setLecDate] = useState("MWF 08:15");
  const [instucid, setInstucid] = useState("12345678");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    updateFunction(lecno, leclocation, lecdate, instucid);
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
          <TextField
            label="Lecture No."
            fullWidth
            margin="normal"
            value={next}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Lecture Date and Time"
            fullWidth
            margin="normal"
            placeholder={lecdate}
            onChange={(e) => setLecDate(e.target.value)}
          />
          <TextField
            label="Lecture Location"
            fullWidth
            margin="normal"
            placeholder={leclocation}
            onChange={(e) => setLecLocation(e.target.value)}
          />
          <TextField
            label="Instructor UCID"
            fullWidth
            margin="normal"
            placeholder={instucid}
            onChange={(e) => setInstucid(e.target.value)}
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

export function CustomizedTutorial({ title, updateFunction, courseno, next }) {
  const [open, setOpen] = useState(false);

  const [tutno, setTutno] = useState("3");
  const [tutlocation, setTutLocation] = useState("MS 160");
  const [tutdate, setTutDate] = useState("MWF 08:15");
  const [taucid, setTaucid] = useState("12345678");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    updateFunction(tutno, tutdate, tutlocation, taucid);
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
          <TextField
            label="Tutorial No."
            fullWidth
            margin="normal"
            value={next}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Tutorial Date and Time"
            fullWidth
            margin="normal"
            placeholder={tutdate}
            onChange={(e) => setTutDate(e.target.value)}
          />
          <TextField
            label="Tutorial Location"
            fullWidth
            margin="normal"
            placeholder={tutlocation}
            onChange={(e) => setTutLocation(e.target.value)}
          />
          <TextField
            label="TA UCID"
            fullWidth
            margin="normal"
            placeholder={taucid}
            onChange={(e) => setTaucid(e.target.value)}
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
