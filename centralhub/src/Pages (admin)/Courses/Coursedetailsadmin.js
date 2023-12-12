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

const BASE_URL = "http://localhost:5000/";

export default function Coursedetailsadmin() {
  const { courseID } = useParams();
  const courseno = courseID;
  const aucid = "00000001";

  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [tutorials, setTutorials] = useState([]);

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
      console.log(exams);
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
  }, []);

  const addAssignment = async (assNo, assdeadline, assweight) => {
    const response = await fetch(`${BASE_URL}/api/addassignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assNo,
        assdeadline,
        assweight,
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
    const response = await fetch(`${BASE_URL}/api/addexam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        examNo,
        examweight,
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
        <Placeholdertable data={assignments} />
        <CustomizedAssignment
          title="Add Assignment"
          updateFunction={addAssignment}
          courseno={courseno}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Exams</h3>
        <Placeholdertable data={exams} />
        <CustomizedExam
          title="Add Exam"
          updateFunction={addExam}
          courseno={courseno}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Lectures</h3>
        <Placeholdertable data={lectures} />
        <CustomizedLecture
          title="Add Lecture"
          updateFunction={addLecture}
          courseno={courseno}
        />
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Tutorials</h3>
        <Placeholdertable data={tutorials} />
        <CustomizedTutorial
          title="Add Tutorial"
          updateFunction={addTutorial()}
          courseno={courseno}
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

export function CustomizedAssignment({ title, updateFunction, courseno }) {
  const [open, setOpen] = useState(false);

  const [assNo, setAssNo] = useState("");
  const [assdeadline, setAssdeadline] = useState("");
  const [assweight, setAssweight] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    // Perform any desired logic when 'Save changes' is clicked
    // For now, let's just close the dialog
    updateFunction(assNo, assdeadline, assweight);
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
            label="Assignment No."
            fullWidth
            margin="normal"
            onChange={(e) => setAssNo(e.target.value)}
          />
          <TextField
            label="Assignment Deadline"
            fullWidth
            margin="normal"
            onChange={(e) => setAssdeadline(e.target.value)}
          />
          <TextField
            label="Assignment Weight"
            fullWidth
            margin="normal"
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

export function CustomizedExam({ title, updateFunction, courseno }) {
  const [open, setOpen] = useState(false);

  const [examNo, setExamNo] = useState("");
  const [examweight, setExamweight] = useState("");
  const [examdate, setExamDate] = useState("");
  const [examduration, setExamDuration] = useState("");
  const [examlocation, setExamLocation] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    // Perform any desired logic when 'Save changes' is clicked
    // For now, let's just close the dialog
    updateFunction(examNo, examweight, examdate, examduration, examlocation);
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
            label="Exam No."
            fullWidth
            margin="normal"
            onChange={(e) => setExamNo(e.target.value)}
          />
          <TextField
            label="Exam Weight"
            fullWidth
            margin="normal"
            onChange={(e) => setExamweight(e.target.value)}
          />
          <TextField
            label="Exam Date"
            fullWidth
            margin="normal"
            onChange={(e) => setExamDate(e.target.value)}
          />
          <TextField
            label="Exam Duration"
            fullWidth
            margin="normal"
            onChange={(e) => setExamDuration(e.target.value)}
          />
          <TextField
            label="Exam Location"
            fullWidth
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

export function CustomizedLecture({ title, updateFunction, courseno }) {
  const [open, setOpen] = useState(false);

  const [lecno, setLecno] = useState("");
  const [leclocation, setLecLocation] = useState("");
  const [lecdate, setLecDate] = useState("");
  const [instucid, setInstucid] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    // Perform any desired logic when 'Save changes' is clicked
    // For now, let's just close the dialog
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
            onChange={(e) => setLecno(e.target.value)}
          />
          <TextField
            label="Lecture Date"
            fullWidth
            margin="normal"
            onChange={(e) => setLecDate(e.target.value)}
          />
          <TextField
            label="Lecture Location"
            fullWidth
            margin="normal"
            onChange={(e) => setLecLocation(e.target.value)}
          />
          <TextField
            label="Instructor UCID"
            fullWidth
            margin="normal"
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

export function CustomizedTutorial({ title, updateFunction, courseno }) {
  const [open, setOpen] = useState(false);

  const [tutno, setTutno] = useState("");
  const [tutlocation, setTutLocation] = useState("");
  const [tutdate, setTutDate] = useState("");
  const [taucid, setTaucid] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = () => {
    // Perform any desired logic when 'Save changes' is clicked
    // For now, let's just close the dialog
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
            onChange={(e) => setTutno(e.target.value)}
          />
          <TextField
            label="Tutorial Date"
            fullWidth
            margin="normal"
            onChange={(e) => setTutDate(e.target.value)}
          />
          <TextField
            label="Tutorial Location"
            fullWidth
            margin="normal"
            onChange={(e) => setTutLocation(e.target.value)}
          />
          <TextField
            label="Tutorial UCID"
            fullWidth
            margin="normal"
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