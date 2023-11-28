import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

//TODO-Grab UCID from navbar and set object

const student = {
  name: "Abigia Debebe",
  email: "Abigia.debebe@ucalgary.ca",
  UCID: "30134608",
  PhoneNumber: "5878346929",
  Address: "UniCalgary",
  DefaultPassword: "yourmom",
};

export default function Updatepersonalinfo() {
  return (
    <section className="mainSection">
      <h2 className="m-5">Update Information</h2>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Name"
          defaultValue={student.name}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Email"
          defaultValue={student.email}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="UCID Number"
          defaultValue={student.UCID}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          required
          id="outlined-required"
          label="Telephone Number"
          defaultValue={student.PhoneNumber}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Address"
          defaultValue={student.Address}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          defaultValue={student.Password}
        />
      </div>
      <Button className="m-3" variant="contained">
        Update
      </Button>
    </section>
  );
}
