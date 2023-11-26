import React from "react";
import Listedinfo from "../Components/Listedinfo";
import Placeholdertable from "../Placeholdertable";

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

const tutLecInformation = [
  {
    label: "Tutorial date",
    details: "Monday, Wednesday, Friday",
  },
  {
    label: "Tutorial time",
    details: "12:00",
  },
];

export default function Viewspecificcourse() {
  return (
    <>
      <section className="mainSection">
        <Listedinfo information={courseInformation} title={"Course Details"} />
        <Listedinfo
          information={tutLecInformation}
          title={"Lecture and Tutorial Details"}
        />
      </section>
      <section className="mainSection">
        <div className="assEx m-3">
          <h4 className="mb-4">Assignments</h4>
          <Placeholdertable />
        </div>
        <div className="assEx m-3">
          <h4 className="mb-4">Exams</h4>
          <Placeholdertable />
        </div>
      </section>
    </>
  );
}
