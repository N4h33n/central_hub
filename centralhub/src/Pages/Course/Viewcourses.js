import React, { Component } from "react";
import Placeholdertable from "../Placeholdertable";
import { Button } from "@mui/material";

export default class Viewcourses extends Component {
  render() {
    return (
      <section className="mainSection">
        <h2 className="title m-5">ENROLLED COURSES</h2>
        <Placeholdertable />
        <Button variant="contained" size="large" className="m-5">
          Explore Courses ⌕
        </Button>
      </section>
    );
  }
}
