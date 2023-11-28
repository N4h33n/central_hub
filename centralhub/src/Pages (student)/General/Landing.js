import React from "react";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="loginContainer">
      <Button variant="contained" className="loginButton d-block m-5">
        <Link className="link" to="/studentlogin">
          Student Login
        </Link>
      </Button>
      <Button variant="contained" className="loginButton d-block m-5">
        <Link className="link" to="/adminlogin">
          Admin Login
        </Link>
      </Button>
    </div>
  );
}
