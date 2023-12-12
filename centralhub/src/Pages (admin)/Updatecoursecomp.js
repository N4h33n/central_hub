import { React, useState, useEffect } from "react";
import Placeholdertable from "../Pages (student)/Placeholdertable";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";

//TODO-url param with student ID and course ID

const BASE_URL = "http://localhost:5000/";

export default function Updatecoursecomp() {
  const { studentID, courseID } = useParams();
  const ucid = studentID;
  const courseno = courseID;

  const [assignments, setAssignments] = useState([]);
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

      const assignments = await response.json();
      setAssignments(assignments);
      console.log(assignments);
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

      const exams = await response.json();
      setExams(exams);
      console.log(exams);
    } catch (error) {
      console.error("Error loading exams:", error);
    }
  };

  useEffect(() => {
    console.log(ucid);
    console.log(courseno);
    loadAssignments();
    loadExams();
  }, []);

  return (
    <section className="mainSection mt-4">
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Assignments</h3>
        <Placeholdertable data={assignments} />
        <Button variant="contained" className="m-3">
          <Link className="link" to="">
            Update Grade
          </Link>
        </Button>
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Exams</h3>
        <Placeholdertable data={exams} />
        <Button variant="contained" className="m-3">
          <Link className="link" to="">
            Update Grade
          </Link>
        </Button>
      </div>
    </section>
  );
}
