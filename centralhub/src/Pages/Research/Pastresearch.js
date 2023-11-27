import React from "react";
import { Button } from "@mui/material";
import Placeholdertable from "../Placeholdertable";

//TODO-pastresearchpublished paper- new attribute

export default function Pastresearch() {
  return (
    <section className="mainSection">
      <h2 className="title m-5">PAST RESEARCH</h2>
      <Placeholdertable />
      <Button variant="contained" size="large" className="m-5">
        Explore Research Opportunities ⌕
      </Button>
    </section>
  );
}
