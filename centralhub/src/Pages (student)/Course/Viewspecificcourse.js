import React from "react";
import Listedinfo from "../Components/Listedinfo";
import Placeholdertable from "../Placeholdertable";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//TODO-add URL param stuff here using CourseID to set the objects appropriately

const BASE_URL = "http://localhost:5000/";

export default function Viewspecificcourse() {
  const { studentID, courseID } = useParams();
  const ucid = "30";
  const courseno = "CPSC 471";

  const [courseInformation, setCourseInformation] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [tutorial, setTutorial] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);

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

  useEffect(() => {
    loadCourseInfo();
    loadLecInfo();
    loadAssignments();
    loadTutInfo();
    loadExams();
  }, []);

  return (
    <>
      <section className="mainSection">
        <Listedinfo information={courseInformation} title={"Course Details"} />
        <Listedinfo information={lecture} title={"Lecture Details"} />
        <Listedinfo information={tutorial} title={"Tutorial Details"} />
      </section>
      <section className="mainSection">
        <div className="assEx m-3">
          <h4 className="mb-4">Assignments</h4>
          <Placeholdertable data={assignments} />
        </div>
        <div className="assEx m-3">
          <h4 className="mb-4">Exams</h4>
          <Placeholdertable data={exams} />
        </div>
      </section>
    </>
  );
}
