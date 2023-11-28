import React from "react";
import Placeholdertable from "../Pages (student)/Placeholdertable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

//TODO-table has one column for 'update info' and one for remove student

export default function Studentlist() {
  return (
    <section className="mainSection">
      <h2 className="mt-5 m-3">Current Students</h2>
      <Button variant="contained" className="position-relative float-end m-3">
        <Link className="link" to="/adminlogin">
          Add Student
        </Link>
      </Button>
      <Placeholdertable />
    </section>
  );
}
