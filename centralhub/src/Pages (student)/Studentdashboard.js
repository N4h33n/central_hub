import React from "react";
import Placeholdertable from "./Placeholdertable";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

//TODO-setstudentname
//TODO-sort by date AND THEN by weight?
//TODO-sort by date AND THEN by time?
//TODO-examdate?

const studentname = "Abi";

const assignment = [
  {
    courseno: "CPSC 413",
    assno: "Assignment 01",
    deadline: "01/12/23",
    weight: "70%",
  },
  {
    courseno: "CPSC 413",
    assno: "Assignment 02",
    deadline: "01/12/23",
    weight: "50%",
  },
  {
    courseno: "CPSC 471",
    assno: "Assignment 01",
    deadline: "06/12/23",
    weight: "50%",
  },
];

const exams = [
  {
    courseno: "CPSC 413",
    examno: "Assignment 01",
    date: "01/12/23",
    time: "21:00",
    location: "ENA201",
  },
  {
    courseno: "CPSC 413",
    examno: "Assignment 02",
    date: "01/12/23",
    time: "21:00",
    location: "ENA201",
  },
  {
    courseno: "CPSC 471",
    examno: "Assignment 01",
    date: "06/12/23",
    time: "21:00",
    location: "ENA201",
  },
];

export default function Studentdashboard() {
  const { studentID } = useParams();

  return (
    <section className="mainSection">
      <h1 style={{ fontSize: "700%" }} className="m-4">
        Welcome, {studentname}!
      </h1>
      <div className="d-inline-block">
        <div className="m-4">
          <h4 className="mb-4">Upcoming Assignments</h4>
          <Placeholdertable data={assignment} />
        </div>
        <div className="m-4">
          <h4 className="mb-4">Upcoming Exams</h4>

          <Placeholdertable data={exams} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          verticalAlign: "top",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "25%",
        }}
        className="d-inline-block w-25"
      >
        <Button className="m-3 d-block float-end" variant="contained">
          <Link className="link" to={`/viewcourses/${studentID}`}>
            Courses
          </Link>
        </Button>
        <Button className="m-3 d-block float-end" variant="contained">
          Extracurriculars
        </Button>
        <Button className="m-3 d-block float-end" variant="contained">
          Research
        </Button>
        <Button className="m-3 d-block float-end" variant="contained">
          Update Personal Information
        </Button>
      </div>
    </section>
  );
}
