import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";

//TODO-dynamically changing chip

export default function Addtocourse() {
  return (
    <section className="mainSection">
      <h2 className="m-5">Course Information</h2>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Course Number"
        />
      </div>
      <div className="m-3">
        <Chip label="Data Structures and Algorithms" />
      </div>
      <div className="m-3">
        <Chip label="Next Offered: Fall 2024" />
      </div>
      <Button className="m-3" variant="contained">
        Enroll
      </Button>
    </section>
  );
}
