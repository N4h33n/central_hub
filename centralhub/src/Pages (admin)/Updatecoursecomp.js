import React from "react";
import Placeholdertable from "../Pages (student)/Placeholdertable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

//TODO-url param with student ID and course ID

export default function Updatecoursecomp() {
  return (
    <section className="mainSection mt-4">
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Assignments</h3>
        <Placeholdertable />
        <Button variant="contained" className="m-3">
          <Link className="link" to="">
            Update Grade
          </Link>
        </Button>
      </div>
      <div className="d-inline-block m-2">
        <h3 className="mb-4">Exams</h3>
        <Placeholdertable />
        <Button variant="contained" className="m-3">
          <Link className="link" to="">
            Update Grade
          </Link>
        </Button>
      </div>
    </section>
  );
}
