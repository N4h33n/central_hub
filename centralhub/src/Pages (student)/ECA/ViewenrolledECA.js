import React from "react";
import Placeholdertable from "../Placeholdertable";
import { Button } from "@mui/material";

//TODO-Add date joined and other rnship attributes for ECA

export default function ViewenrolledECA() {
  return (
    <section className="mainSection">
      <h2 className="title m-5">ENROLLED EXTRACURRICULAR ACTIVITIES</h2>
      <Placeholdertable />
      <Button variant="contained" size="large" className="m-5">
        Explore Extracurriculars ⌕
      </Button>
    </section>
  );
}
