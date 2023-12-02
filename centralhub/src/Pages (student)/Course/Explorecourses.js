import React from "react";
import Placeholdertable from "../Placeholdertable";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const courses = [
  {
    courseno: "CPSC 413",
    coursename: "Datastructures",
    Field: "Information Security",
    Instructor: "Janet",
    TeachingAssistant: "Asha",
  },
  {
    courseno: "CPSC 413",
    coursename: "Datastructures",
    Field: "Information Security",
    Instructor: "Janet",
    TeachingAssistant: "Asha",
  },
  {
    courseno: "CPSC 413",
    coursename: "Datastructures",
    Field: "Information Security",
    Instructor: "Janet",
    TeachingAssistant: "Asha",
  },

  {
    courseno: "CPSC 417",
    coursename: "Datastructures",
    Field: "Information Security",
    Instructor: "Janet",
    TeachingAssistant: "Asha",
  },
  {
    courseno: "CPSC 417",
    coursename: "Datastructures",
    Field: "Information Security",
    Instructor: "Janet",
    TeachingAssistant: "Asha",
  },
  {
    courseno: "CPSC 417",
    coursename: "Datastructures",
    Field: "Information Security",
    Instructor: "Janet",
    TeachingAssistant: "Asha",
  },
];

export default function Explorecourses() {
  return (
    <section className="filtercourse mainSection">
      <h1 className="m-5">EXPLORE COURSES</h1>
      <div className="d-inline-block">
        <Placeholdertable data={courses} />
      </div>
      <div
        className="d-inline-block"
        style={{ minWidth: "30%", verticalAlign: "top" }}
      >
        <div>
          <TextField id="filled-basic" label="Course Name" variant="filled" />
        </div>
        <div>
          <TextField id="filled-basic" label="Course Number" variant="filled" />
        </div>
        <div>
          <TextField id="filled-basic" label="Field" variant="filled" />
        </div>
        <div>
          <TextField id="filled-basic" label="Instructor" variant="filled" />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Teaching Assistant"
            variant="filled"
          />

          <div>
            <Button className="mt-3" variant="contained">
              Filter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
