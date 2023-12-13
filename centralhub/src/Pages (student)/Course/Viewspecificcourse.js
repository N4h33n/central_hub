import React from "react";
import Listedinfo from "../Components/Listedinfo";
import Placeholdertable from "../Placeholdertable";
import { Button } from "@mui/material";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000/";

export default function Viewspecificcourse() {
  const { studentID, courseID } = useParams();
  const ucid = studentID;
  const courseno = courseID;

  const [courseInformation, setCourseInformation] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [tutorial, setTutorial] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [instructor, setInstructor] = useState("");
  const [ta, setTa] = useState("");

  const navigate = useNavigate();

  const loadCourseInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledcoursedetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
          ucid,
        }),
      });

      const data = await response.json();
      setCourseInformation(data);
    } catch (error) {}
  };

  const loadLecInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledlecturedetails`, {
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
      setLecture(data);
      console.log(instructor);
    } catch (error) {}
  };

  const loadTutInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledtutorialdetails`, {
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
      setTutorial(data);
    } catch (error) {}
  };

  const loadAssignments = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/enrolledassignmentdetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ucid,
            courseno,
          }),
        }
      );

      const data = await response.json();
      setAssignments(data);
    } catch (error) {}
  };

  const loadExams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/enrolledexamdetails`, {
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
      setExams(data);
    } catch (error) {}
  };

  function redirect() {
    window.location.href = `/faculty/${instructor}`;
  }

  function redirect2() {
    window.location.href = `/faculty/${ta}`;
  }

  useEffect(() => {
    loadCourseInfo();
    loadLecInfo();
    loadAssignments();
    loadTutInfo();
    loadExams();
  }, []);

  useEffect(() => {
    // Access instructor info once the lecture state is updated
    if (lecture.length > 0) {
      setInstructor(lecture[0].f_ucid);
    }
  }, [lecture]); // Run whenever lecture state is updated

  useEffect(() => {
    // Access instructor info once the lecture state is updated
    if (tutorial.length > 0) {
      setTa(tutorial[0].f_ucid);
    }
  }, [tutorial]);

  return (
    <>
      <section className="mainSection">
        <div
          className="courseDetails d-inline-block m-4"
          style={{ verticalAlign: "top" }}
        >
          <Listedinfo
            information={courseInformation}
            title={"🏫 Course Details"}
          />
        </div>
        <div className="courseDetails d-inline-block m-4">
          <Listedinfo information={lecture} title={"📓 Lecture Details"} />
          <Button className="d-block" variant="outlined" onClick={redirect}>
            Instructor Details
          </Button>
        </div>
        <div className="courseDetails d-inline-block m-4">
          <Listedinfo information={tutorial} title={"✎ Tutorial Details"} />
          <Button className="d-block" variant="outlined" onClick={redirect2}>
            {" "}
            Teaching Assistant Details
          </Button>
        </div>
      </section>
      <section className="mainSection">
        <div className="m-5">
          <h4 className="mb-4">Assignments</h4>
          <Placeholdertable data={assignments} />
        </div>
        <div className="m-5">
          <h4 className="mb-4">Exams</h4>
          <Placeholdertable data={exams} />
        </div>
      </section>
    </>
  );
}
