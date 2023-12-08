import { Button, TextField } from "@mui/material";
import React from "react";

const BASE_URL = "http://localhost:5000/";

export default function Studentlogin() {
  const handleClick = async () => {
    const shutup = "12345678";

    const email = document.getElementById("outlined-email").value;
    const password = document.getElementById("outlined-password").value;

    const response = await fetch(`${BASE_URL}/api/studentlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data = await response.json();
    console.log("Received data:", data);

    if (data.success) {
      // const ucid = data.ucid.toString();
      // console.log("Extracted ucid:", ucid);
      window.location.href = `/dashboard/12345678`;
    } else {
      document.getElementById("outlined-email").value = "";
      document.getElementById("outlined-password").value = "";
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginInfo">
        <h1 style={{ color: "#1976d2" }}>Student Login</h1>
        <TextField
          className="loginput d-block m-5"
          id="outlined-email"
          label="Email"
          variant="outlined"
        />
        <TextField
          className="loginput d-block m-5"
          id="outlined-password"
          label="Password"
          variant="outlined"
        />
        <Button
          onClick={handleClick}
          className="loginput d-block m-auto"
          variant="contained"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
