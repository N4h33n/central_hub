import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Placeholdertable from "../Pages (student)/Placeholdertable";

//TODO-add URL param to update student information being displayed based on ID
//TODO-one column for update course component info and one for remove from course
export default function Updatestudentinfo() {
  return (
    <section className="mainSection">
      <h2 className="mt-5 m-3">Enrolled Courses</h2>
      <Button
        variant="contained"
        className="position-relative float-start m-3 ms-5"
      >
        <Link className="link" to="/adminlogin">
          Update Personal Information
        </Link>
      </Button>
      <Button
        variant="contained"
        className="position-relative float-end m-3 me-5"
      >
        <Link className="link" to="/adminlogin">
          Add to Course
        </Link>
      </Button>
      <Placeholdertable />
    </section>
  );
}
