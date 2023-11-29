import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";

//TODO-dynamically changing chip

export default function Editassignmentgrade() {
  return (
    <section className="mainSection">
      <h2 className="m-5">Update Grade</h2>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Assignment Number"
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Assignment Grade"
          datatype="int"
        />
      </div>
      <Button className="m-3" variant="contained">
        Update
      </Button>
    </section>
  );
}
