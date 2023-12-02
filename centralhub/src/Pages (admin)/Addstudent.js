import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

//TODO-add a_ucid to navbar and retrieve

const BASE_URL = "http://localhost:5000/";

export default function Addstudent() {
  const handleClick = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const ucid = document.getElementById("ucid").value;
    const password = document.getElementById("password").value;
    const telephone = document.getElementById("telephone").value;
    const address = document.getElementById("address").value;
    const a_ucid = "000111";

    const response = await fetch(`${BASE_URL}/api/addstudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        ucid,
        password,
        telephone,
        address,
        a_ucid,
      }),
    });

    const data = await response.json();
  };

  return (
    <section className="mainSection">
      <h2 className="m-5">Add Student</h2>
      <div className="m-4">
        <TextField required style={{ width: "20%" }} id="name" label="Name" />
      </div>
      <div className="m-4">
        <TextField required style={{ width: "20%" }} id="email" label="Email" />
      </div>
      <div className="m-4">
        <TextField
          required
          style={{ width: "20%" }}
          id="ucid"
          label="UCID Number"
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="telephone"
          label="Telephone Number"
        />
      </div>
      <div className="m-4">
        <TextField style={{ width: "20%" }} id="address" label="Address" />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="password"
          label="Default Password"
          type="password"
        />
      </div>
      <Button onClick={handleClick} className="m-3" variant="contained">
        Add
      </Button>
    </section>
  );
}
