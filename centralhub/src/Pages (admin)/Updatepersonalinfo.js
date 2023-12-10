import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

//TODO-Grab UCID from navbar and set object

const BASE_URL = "http://localhost:5000/";

export default function Updatepersonalinfo() {
  const { studentID } = useParams();
  const olducid = studentID;
  const [student, setStudent] = useState([]);

  const loadPersonalInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/loadpersonalinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          olducid,
        }),
      });

      const student = await response.json();
      setStudent(student);
    } catch (error) {}
  };

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const handleClick = async () => {
    const Name = document.getElementById("name").value;
    const Email = document.getElementById("email").value;
    const newucid = document.getElementById("ucid").value;
    const Password = document.getElementById("password").value;
    const PhoneNumber = document.getElementById("telephone").value;
    const Address = document.getElementById("address").value;

    const response = await fetch(`${BASE_URL}/api/updatepersonalinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        olducid,
        Name,
        Email,
        newucid,
        Password,
        PhoneNumber,
        Address,
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
          id="name"
          label="Name"
          defaultValue={student.name}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="email"
          label="Email"
          defaultValue={student.email}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="ucid"
          label="UCID Number"
          defaultValue={studentID}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          required
          id="telephone"
          label="Telephone Number"
          defaultValue={student.PhoneNumber}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="address"
          label="Address"
          defaultValue={student.Address}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          defaultValue={student.Password}
        />
      </div>
      <Button className="m-3" variant="contained" onClick={handleClick}>
        Update
      </Button>
    </section>
  );
}
