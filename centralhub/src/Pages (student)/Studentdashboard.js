import React from "react";
import Placeholdertable from "./Placeholdertable";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//TODO-setstudentname
//TODO-sort by date AND THEN by weight?
//TODO-sort by date AND THEN by time?
//TODO-examdate?
//TODO-change weight to %

const BASE_URL = "http://localhost:5000/";

export default function Studentdashboard() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [assignment, setAssignment] = useState([]);
  const [exams, setExams] = useState([]);
  const [name, setName] = useState([]);

  const loadAssignments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/dashboardassignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
        }),
      });

      const assignments = await response.json();
      setAssignment(assignments);
      console.log(assignment);
    } catch (error) {
      console.error("Error loading assignments:", error);
    }
  };

  const loadExams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/dashboardexams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
        }),
      });

      const exams = await response.json();
      setExams(exams);
      console.log(exams);
    } catch (error) {
      console.error("Error loading exams:", error);
    }
  };

  const loadName = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/dashboardname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
        }),
      });

      const nameData = await response.json();

      if (Array.isArray(nameData) && nameData.length > 0) {
        const name = nameData[0].name;
        setName(name);
        console.log(name);
      } else {
        console.error("Error: Unexpected name data format");
      }
    } catch (error) {
      console.error("Error loading name:", error);
    }
  };

  useEffect(() => {
    loadAssignments();
    loadExams();
    loadName();
  }, []);

  return (
    <section className="mainSection">
      <h1 style={{ fontSize: "700%" }} className="m-4">
        Welcome, {name}!
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
          <Link className="link" to={`/enrolledeca/${studentID}`}>
            Extracurriculars
          </Link>
        </Button>
        <Button className="m-3 d-block float-end" variant="contained">
          <Link className="link" to={`/research/${studentID}`}>
            Research
          </Link>
        </Button>
        <Button className="m-3 d-block float-end" variant="contained">
          <Link className="link" to={`/updateinfo/${studentID}`}>
            Update Personal Information
          </Link>
        </Button>
      </div>
    </section>
  );
}
