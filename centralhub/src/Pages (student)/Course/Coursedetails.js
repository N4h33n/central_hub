import { React, useState, useEffect, Component } from "react";
import Courseinfo from "../Components/Listedinfo";
import Listedinfo from "../Components/Listedinfo";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

//TODO-add URL param stuff here using CourseID to set the objects appropriately in a fn.
//TODO-add feature that checks if all prereques satisfied and either greys out the button
//gives some sort of remark

const BASE_URL = "http://localhost:5000/";

export default function Coursedetails() {
  const { courseID } = useParams();
  const courseno = courseID;

  const [courseinfo, setCourseInfo] = useState([]);
  const [lectureinfo, setLectureInfo] = useState([]);
  const [tutorialinfo, setTutorialInfo] = useState([]);

  const loadCourseInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/coursedetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const courseinfo = await response.json();
      setCourseInfo(courseinfo);
    } catch (error) {}
  };

  const loadTutorialInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tutorialdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const tutorialinfo = await response.json();
      setTutorialInfo(tutorialinfo);
    } catch (error) {}
  };

  const loadLectureInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/lecturedetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseno,
        }),
      });

      const lecdetails = await response.json();
      setLectureInfo(lecdetails);
    } catch (error) {}
  };

  useEffect(() => {
    console.log(courseno);
    loadCourseInfo();
    loadLectureInfo();
    loadTutorialInfo();
  }, []);

  return (
    <section className="mainSection">
      <div
        className="d-inline-block mt-5 mx-3"
        style={{ verticalAlign: "top", textAlign: "center" }}
      >
        <Listedinfo information={courseinfo} title={"Course Details"} />
        <span className="d-block" style={{ textAlign: "center" }}>
          <Button className="mt-5" variant="contained">
            Request to Enroll
          </Button>
        </span>
      </div>
      <Listedinfo information={lectureinfo} title={"Lectures"} />
      <Listedinfo information={tutorialinfo} title={"Tutorials"} />
    </section>
  );
}
