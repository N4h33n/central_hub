import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const BASE_URL = "http://localhost:5000/";

export default function Studentlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleClick = async () => {
    const shutup = "12345678";

    try {
      const response = await fetch(`${BASE_URL}/api/studentlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      let data = await response.json();
      console.log("Received data:", data);

      if (data.success) {
        window.location.href = `/dashboard/${data.ucid}`;
      } else {
        setEmail("");
        setPassword("");
        setPasswordError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setEmail("");
      setPassword("");
      alert("Login failed! Please check your username and password.");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginInfo">
        <h1 style={{}}>Student Login</h1>
        <TextField
          className="loginput d-block m-5"
          id="outlined-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="loginput d-block m-5"
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          error={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
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
