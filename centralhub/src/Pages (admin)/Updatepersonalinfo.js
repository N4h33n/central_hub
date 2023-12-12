import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5000/";

export default function Updatepersonalinfo() {
  const { studentID } = useParams();
  const olducid = studentID;
  const [student, setStudent] = useState({});

  const loadPersonalInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/loadpersonalinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          olducid,
        }),
      });

      const studentData = await response.json();
      const studentObject = studentData[0] || {}; // Get the first object from the array
      setStudent(studentObject);
      console.log(studentObject);
    } catch (error) {
      console.error("Error loading personal info:", error);
    }
  };

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const handleChange = (field, value) => {
    // Update the corresponding field in the state
    setStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleClick = async () => {
    const { name, email, passhash, phone, address } = student;
    const ucid = document.getElementById("ucid").value;
    console.log(ucid);

    const response = await fetch(`${BASE_URL}/api/updatepersonalinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        olducid,
        name,
        email,
        newucid,
        passhash,
        phone: phone,
        Address: address,
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
          value={student.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="email"
          label="Email"
          value={student.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          id="ucid"
          label="UCID Number"
          value={studentID}
          onChange={(e) => handleChange("ucid", e.target.value)}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
          required
          id="telephone"
          label="Telephone Number"
          value={student.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div className="m-4">
        <TextField
          style={{ width: "20%" }}
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
