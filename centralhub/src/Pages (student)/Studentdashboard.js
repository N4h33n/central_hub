import React from "react";
import Placeholdertable from "./Placeholdertable";
import { Button } from "@mui/material";

//TODO-setstudentname

const studentname = "Abi";

export default function Studentdashboard() {
  return (
    <section className="mainSection">
      <h1 style={{ fontSize: "700%" }} className="m-4">
        Welcome, {studentname}!
      </h1>
      <div className="d-inline-block">
        <div className="m-4">
          <h4 className="mb-4">Upcoming Assignments</h4>
          <Placeholdertable />
        </div>
        <div className="m-4">
          <h4 className="mb-4">Upcoming Exams</h4>

          <Placeholdertable />
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
          Courses
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
