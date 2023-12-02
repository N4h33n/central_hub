import React from "react";
import Placeholdertable from "../Pages (student)/Placeholdertable";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

//TODO-url param with student ID and course ID

const Assignments = [
  {
    assno: "Assignment 01",
    grade: "50%",
  },
  {
    assno: "Assignment 02",
    grade: "60%",
  },
  { assno: "Assignment 01", grade: "80%" },
];

const Exams = [
  {
    examno: "Exam 01",
    grade: "50%",
  },
  {
    examno: "Exam 02",
    grade: "60%",
  },
  { examno: "Exam 01", grade: "80%" },
];

export default function Updatecoursecomp() {
  const { studentID, Coursenumber } = useParams();
  return (
    <section className="mainSection mt-4">
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Assignments</h3>
        <Placeholdertable data={Assignments} />
        <Button variant="contained" className="m-3">
          <Link className="link" to="">
            Update Grade
          </Link>
        </Button>
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Exams</h3>
        <Placeholdertable data={Exams} />
        <Button variant="contained" className="m-3">
          <Link className="link" to="">
            Update Grade
          </Link>
        </Button>
      </div>
    </section>
  );
}
