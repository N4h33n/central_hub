import React from "react";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";

export default function Landing() {
  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5">
        Student Login
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        Admin Login
      </Button>
    </div>
  );
}
