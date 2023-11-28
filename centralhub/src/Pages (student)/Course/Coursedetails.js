import React, { Component } from "react";
import Courseinfo from "../Components/Listedinfo";
import Listedinfo from "../Components/Listedinfo";
import { Button } from "@mui/material";

//TODO-add URL param stuff here using CourseID to set the objects appropriately in a fn.
//TODO-add feature that checks if all prereques satisfied and either greys out the button
//gives some sort of remark

const lectureInformation = [
  [
    {
      label: "Lecture no.",
      details: "01",
    },
    {
      label: "Instructor name",
      details: "lorem ipsum smn smn smn",
    },
  ],
  [
    {
      label: "Lecture no.",
      details: "02",
    },
    {
      label: "Instructor name",
      details: "lorem ipsum smn smn smn",
    },
  ],
];
const tutorialInformation = [
  [
    {
      label: "Tutorial no.",
      details: "01",
    },
    {
      label: "TA name",
      details: "lorem ipsum smn smn smn",
    },
  ],
  [
    {
      label: "Tutorial no.",
      details: "02",
    },
    {
      label: "TA name",
      details: "lorem ipsum smn smn smn",
    },
  ],
];

const courseInformation = [
  {
    label: "Introduction to Web Development",
    details: "lorem ipsum smn smn smn",
  },
  {
    label: "Introduction to Web Development",
    details: "lorem ipsum smn smn smn",
  },
];

export default function Coursedetails() {
  return (
    <section className="mainSection">
      <div
        className="d-inline-block mt-5 mx-3"
        style={{ verticalAlign: "top", textAlign: "center" }}
      >
        <Listedinfo information={courseInformation} title={"Course Details"} />
        <span className="d-block" style={{ textAlign: "center" }}>
          <Button className="mt-5" variant="contained">
            Request to Enroll
          </Button>
        </span>
      </div>
      <Complist Comps={lectureInformation} title={"Lectures"} />
      <Complist Comps={tutorialInformation} title={"Tutorials"} />
    </section>
  );
}

export function Complist({ Comps, title }) {
  return (
    <div className="d-inline-block p-5 mx-3" style={{ textAlign: "center" }}>
      <h4>{title}</h4>
      {Comps.map((comp) => {
        return (
          <div style={{ textAlign: "center" }} className="d-block">
            <Listedinfo information={comp} title={""} />
          </div>
        );
      })}
    </div>
  );
}
