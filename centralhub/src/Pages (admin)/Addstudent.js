import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

const BASE_URL = "http://localhost:5000/";

export default function Addstudent() {
  const [validationError, setValidationError] = useState("");

  const validateInputs = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const ucid = document.getElementById("ucid").value;
    const telephone = document.getElementById("telephone").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    // Validation checks
    if (!name.trim()) {
      setValidationError("Name cannot be empty");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError("Email must be a valid email address");
      return false;
    }

    if (!/^\d{8}$/.test(ucid)) {
      setValidationError("UCID must be exactly 8 digits");
      return false;
    }

    if (!/^\d{10}$/.test(telephone)) {
      setValidationError("Telephone must be exactly 10 digits");
      return false;
    }

    if (address.length < 3) {
      setValidationError("Address must be at least 3 characters");
      return false;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return false;
    }

    // All checks passed
    setValidationError("");
    return true;
  };

  const handleClick = async () => {
    if (!validateInputs()) {
      // Validation failed, don't proceed with the fetch
      return;
    }

    // Validation passed, proceed with the fetch
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const ucid = document.getElementById("ucid").value;
    const password = document.getElementById("password").value;
    const telephone = document.getElementById("telephone").value;
    const address = document.getElementById("address").value;
    const a_ucid = "00000001";

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
    // Handle response data as needed
  };

  return (
    <section className="mainSection">
      <h2 className="m-5">Add Student</h2>
      <div className="m-4">
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          required
          style={{ width: "20%", border: "1px solid #ccc" }}
          id="name"
          placeholder="ex: John Doe"
        />
      </div>
      <div className="m-4">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          required
          style={{ width: "20%", border: "1px solid #ccc" }}
          id="email"
          placeholder="ex: john.doe@example.com"
        />
      </div>
      <div className="m-4">
        <InputLabel htmlFor="ucid">UCID Number</InputLabel>
        <Input
          required
          style={{ width: "20%", border: "1px solid #ccc" }}
          id="ucid"
          placeholder="ex: 12345678"
        />
      </div>
      <div className="m-4">
        <InputLabel htmlFor="telephone">Telephone Number</InputLabel>
        <Input
          style={{ width: "20%", border: "1px solid #ccc" }}
          id="telephone"
          placeholder="ex: 1234567890"
        />
      </div>
      <div className="m-4">
        <InputLabel htmlFor="address">Address</InputLabel>
        <Input
          style={{ width: "20%", border: "1px solid #ccc" }}
          id="address"
          placeholder="ex: 123 Main St"
        />
      </div>
      <div className="m-4">
        <InputLabel htmlFor="password">Default Password</InputLabel>
        <Input
          style={{ width: "20%", border: "1px solid #ccc" }}
          id="password"
          type="password"
          placeholder="ex: securePassword"
        />
      </div>
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}
      <Button onClick={handleClick} className="m-3" variant="contained">
        Add
      </Button>
    </section>
  );
}
