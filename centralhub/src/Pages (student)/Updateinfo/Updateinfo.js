import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

//TODO-Grab UCID from navbar and set object
//TODO- Allow address edit as well

const BASE_URL = "http://localhost:5000/";

export default function Updateinfo() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [student, setStudent] = useState([]);

  const loadStudent = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/studentinfodefault`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ucid,
        }),
      });

      const student = await response.json();
      setStudent(student);
      console.log(student);
    } catch (error) {
      console.error("Error loading student:", error);
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const handleClick = async () => {
    const password = document.getElementById("password").value;
    const telephone = document.getElementById("phonenumber").value;
    const address = document.getElementById("address").value;

    const response = await fetch(`${BASE_URL}/api/updateinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        telephone,
        address,
      }),
    });

    const data = await response.json();
  };

  return (
    <section className="mainSection">
      <h2 className="m-5">Update Information</h2>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Name"
          defaultValue={student.name}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="Email"
          defaultValue={student.email}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="outlined-read-only-input"
          label="UCID Number"
          defaultValue={student.s_ucid}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          required
          id="phonenumber"
          label="Telephone Number"
          defaultValue={student.PhoneNumber}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          required
          id="address"
          label="Address"
          defaultValue={student.address}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          defaultValue={student.passhash}
        />
      </div>
      <Button className="m-3" variant="contained" onClick={handleClick}>
        Update
      </Button>
    </section>
  );
}
