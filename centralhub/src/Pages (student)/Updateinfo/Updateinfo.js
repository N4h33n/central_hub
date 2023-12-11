import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5000/";

export default function Updateinfo() {
  const { studentID } = useParams();
  const ucid = studentID;

  const [student, setStudent] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
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

        const studentData = await response.json();
        setStudent(studentData[0]);
        setName(studentData[0].name);
        setEmail(studentData[0].email);
      } catch (error) {
        console.error("Error loading student:", error);
      }
    };

    loadStudent();
  }, [ucid]);

  const handleChange = (field, value) => {
    // Update the corresponding field in the state
    setStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleClick = async () => {
    const { password, PhoneNumber, address } = student;
    console.log(student);
    const response = await fetch(`${BASE_URL}/api/updateinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        telephone: PhoneNumber,
        address,
        ucid,
      }),
    });

    const data = await response.json();
    // Handle response data as needed
  };

  return (
    <section className="mainSection">
      <h2 className="m-5">Update Information</h2>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="name"
          label="Name"
          value={name}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="email"
          label="Email"
          value={email}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="ucid"
          label="UCID Number"
          defaultValue={ucid}
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
          value={student.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          required
          id="address"
          label="Address"
          value={student.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={student.passhash || ""}
          onChange={(e) => handleChange("passhash", e.target.value)}
        />
      </div>
      <Button className="m-3" variant="contained" onClick={handleClick}>
        Update
      </Button>
    </section>
  );
}
